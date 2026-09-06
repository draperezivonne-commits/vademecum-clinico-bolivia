/* Vademécum Clínico Bolivia v0.20.0
   Motor ampliado de interacciones: reglas exactas + farmacológicas por clase + polifarmacia.
   No afirma "seguro" por ausencia de alerta. */
(function(){
  const KB=window.VCB_INTERACTION_KB||{groups:{},class_rules:[],exact_rules:[],sources:{},meta:{}};
  const N=s=>norm(s||'');
  const C=s=>N(s).replace(/[^a-z0-9]+/g,' ').replace(/\s+/g,' ').trim();
  const uniq=a=>[...new Set((a||[]).filter(Boolean))];

  function termMatch(drug,term){
    const d=C(drug),t=C(term);
    if(!d||!t)return false;
    return d===t || d.startsWith(t+' ') || d.endsWith(' '+t) || d.includes(' '+t+' ') ||
           t.startsWith(d+' ') || t.endsWith(' '+d) || t.includes(' '+d+' ');
  }
  function groupHas(drug,name){return (KB.groups[name]||[]).some(x=>termMatch(drug,x))}
  function groupItems(ingredients,name){return uniq((ingredients||[]).filter(x=>groupHas(x,name)))}

  function sevMeta(level){
    const n=N(level);
    if(n.includes('contra'))return{rank:5,key:'contra',label:'CONTRAINDICADA · NO ASOCIAR'};
    if(n.includes('alta'))return{rank:4,key:'high',label:'ALTO RIESGO · EVITAR/REEVALUAR'};
    if(n.includes('moder'))return{rank:3,key:'moderate',label:'PRECAUCIÓN · MONITORIZAR'};
    if(n.includes('baja')||n.includes('menor'))return{rank:2,key:'low',label:'INTERACCIÓN MENOR'};
    return{rank:1,key:'info',label:'REVISAR'};
  }

  function sourceFor(r){
    if(r.source_key&&KB.sources[r.source_key])return KB.sources[r.source_key];
    if(r.source_url||r.fuente)return{title:r.source_title||r.fuente||'Fuente de interacción',url:r.source_url||''};
    return null;
  }
  function rule(a,b,level,effect,action,mechanism='',source_key='',id=''){
    return{id,a,b,nivel:level,resumen:effect,conducta:action,mecanismo:mechanism,source_key};
  }
  function exactRules(a,b){
    return (KB.exact_rules||[]).filter(r=>(termMatch(a,r.a)&&termMatch(b,r.b))||(termMatch(a,r.b)&&termMatch(b,r.a))).map(r=>({...r,a:r.a,b:r.b}));
  }
  function classRules(a,b){
    const out=[];
    for(const r of (KB.class_rules||[])){
      let ok=false;
      if(r.same_group)ok=groupHas(a,r.a)&&groupHas(b,r.a)&&C(a)!==C(b);
      else ok=(groupHas(a,r.a)&&groupHas(b,r.b))||(groupHas(a,r.b)&&groupHas(b,r.a));
      if(ok)out.push({...r,a,b});
    }
    return out;
  }
  function legacyRules(a,b){
    try{return(checkPair(a,b)||[]).map((r,i)=>({...r,id:'legacy-'+i,a:r.a||a,b:r.b||b}))}catch{return[]}
  }
  function dedupeRules(rows){
    const seen=new Set(),out=[];
    for(const r of rows){
      const pair=[C(r.a),C(r.b)].sort().join('|');
      const effect=C(r.resumen||r.conducta||r.id);
      const k=pair+'|'+effect;
      if(seen.has(k))continue;
      seen.add(k);out.push(r);
    }
    return out;
  }
  function pairAssessment(ra,rb){
    const rows=[];
    for(const a of ra.ingredients)for(const b of rb.ingredients)rows.push(...exactRules(a,b),...legacyRules(a,b),...classRules(a,b));
    const dup=ra.ingredients.filter(a=>rb.ingredients.some(b=>C(a)===C(b)));
    if(dup.length)rows.push(rule(ra.label,rb.label,'Alta',`Duplicidad de principio activo: ${uniq(dup).join(' + ')}. Puede aumentar toxicidad o provocar sobredosis acumulativa.`,'Revisar la dosis total diaria y evitar duplicación inadvertida.','El mismo principio activo está presente en más de un producto.','','DUPLICATE'));
    return dedupeRules(rows);
  }

  function multiRules(resolved){
    const all=uniq(resolved.flatMap(r=>r.ingredients));
    const has=g=>groupItems(all,g),out=[];
    const ras=has('RAS_BLOCKERS'),diu=has('DIURETICS'),nsaid=has('NSAIDS');
    if(ras.length&&diu.length&&nsaid.length)out.push(rule('Bloqueador SRAA + diurético + AINE','Polifarmacia','Alta','La combinación puede aumentar de forma importante el riesgo de lesión renal aguda, hipotensión y alteraciones electrolíticas.','Evitar el AINE si existe alternativa; si se requiere, evaluar volumen, creatinina y electrolitos y vigilar estrechamente.','Reducción de perfusión renal por mecanismos hemodinámicos convergentes.','FDA_NSAID','MULTI-RENAL'));
    const op=has('OPIOIDS'),bz=has('BENZOS'),ga=has('GABAPENTINOIDS');
    if(op.length&&bz.length&&ga.length)out.push(rule('Opioide + benzodiacepina + gabapentinoide','Polifarmacia','Alta','Riesgo acumulado de sedación profunda y depresión respiratoria.','Evitar la triple asociación cuando sea posible; si es imprescindible, dosis mínimas y vigilancia respiratoria estrecha.','Depresión aditiva del sistema nervioso central.','FDA_OPIOID_BENZO','MULTI-CNS'));
    const ac=has('ANTICOAGS'),ap=has('ANTIPLATELETS');
    if(ac.length&&ap.length&&nsaid.length)out.push(rule('Anticoagulante + antiagregante + AINE','Polifarmacia','Alta','Riesgo hemorrágico elevado por múltiples mecanismos.','Reevaluar la necesidad de cada fármaco; evitar el AINE si es posible y vigilar sangrado.','Anticoagulación, inhibición plaquetaria y toxicidad gastrointestinal aditivas.','FDA_ELIQUIS','MULTI-BLEED'));
    const qt=has('QT_HIGH');
    if(qt.length>=3)out.push(rule(qt.slice(0,4).join(' + '),'Múltiples fármacos QT','Alta','Tres o más fármacos con potencial de prolongar QT aumentan el riesgo de arritmia ventricular en pacientes susceptibles.','Revisar necesidad, QTc, potasio, magnesio, función renal/hepática y alternativas.','Carga acumulada sobre la repolarización ventricular.','FDA_CITALOPRAM','MULTI-QT'));
    const ser=has('SEROTONERGICS');
    if(ser.length>=3)out.push(rule(ser.slice(0,4).join(' + '),'Carga serotoninérgica','Alta','La combinación de múltiples fármacos serotoninérgicos aumenta el riesgo de síndrome serotoninérgico.','Reducir carga serotoninérgica cuando sea posible y vigilar clonus, hiperreflexia, agitación, fiebre y disautonomía.','Potenciación serotoninérgica acumulativa.','FDA_SEROTONERGIC','MULTI-SER'));
    const ks=has('K_SPARING'),kp=has('POTASSIUM');
    if(ras.length&&ks.length&&kp.length)out.push(rule('Bloqueador SRAA + ahorrador de K + suplemento de K','Polifarmacia','Alta','Riesgo elevado de hiperpotasemia, especialmente con insuficiencia renal.','Evitar suplementación innecesaria y monitorizar potasio y función renal estrechamente.','Retención de potasio por múltiples mecanismos.','FDA_ENTRESTO','MULTI-K'));
    const ss=uniq([...has('SSRIs'),...has('SNRIs')]);
    if(ac.length&&nsaid.length&&ss.length)out.push(rule('Anticoagulante + AINE + SSRI/SNRI','Polifarmacia','Alta','Riesgo hemorrágico aumentado por anticoagulación, lesión gastrointestinal y alteración plaquetaria.','Reevaluar el AINE y monitorizar signos de sangrado; considerar medidas de protección según riesgo.','Mecanismos hemorrágicos aditivos.','FDA_NSAID','MULTI-BLEED2'));
    return dedupeRules(out);
  }

  function sourceHtml(r){
    const s=sourceFor(r); if(!s)return'';
    if(s.url&&/^https:\/\//i.test(s.url))return `<div><small>FUENTE / EVIDENCIA</small><p><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.title||s.url)}</a></p></div>`;
    return `<div><small>FUENTE / EVIDENCIA</small><p>${esc(s.title||'Fuente clínica')}</p></div>`;
  }
  function card(r){
    const m=sevMeta(r.nivel);
    return `<div class="v200-int-card ${m.key}"><div class="v200-int-head"><span class="v200-dot"></span><b>${esc(m.label)}</b></div><div class="v200-pair">${esc(r.a)} <span>+</span> ${esc(r.b)}</div><div class="v200-grid"><div><small>QUÉ PUEDE OCURRIR</small><p>${esc(r.resumen||'Interacción clínicamente relevante.')}</p></div>${r.mecanismo?`<div><small>POR QUÉ</small><p>${esc(r.mecanismo)}</p></div>`:''}<div><small>QUÉ HACER</small><p>${esc(r.conducta||'Valorar el contexto clínico y monitorizar.')}</p></div>${sourceHtml(r)}</div></div>`;
  }
  function pairRow(x){
    const w=x.rules.reduce((best,r)=>sevMeta(r.nivel).rank>best.rank?sevMeta(r.nivel):best,{rank:0,key:'ok',label:'SIN ALERTA REGISTRADA'});
    return `<div class="v200-pair-row ${w.key}"><b>${esc(x.a.label)} + ${esc(x.b.label)}</b><span>${esc(w.rank?w.label:'SIN INTERACCIÓN RELEVANTE IDENTIFICADA')}</span></div>`;
  }

  window.renderInteractionsMulti=function(){
    const vals=$$('.int-med').map(x=>x.value.trim()).filter(Boolean),el=$('#interactionList');
    if(vals.length<2){toast('Agregue al menos dos medicamentos');return}
    const resolved=vals.map(resolveInput),unresolved=resolved.filter(r=>!r.ingredients.length),assessments=[];
    for(let i=0;i<resolved.length;i++)for(let j=i+1;j<resolved.length;j++)assessments.push({a:resolved[i],b:resolved[j],rules:pairAssessment(resolved[i],resolved[j])});
    const multi=unresolved.length?[]:multiRules(resolved),allRules=dedupeRules([...assessments.flatMap(x=>x.rules),...multi]);
    const worst=allRules.reduce((best,r)=>sevMeta(r.nivel).rank>best.rank?sevMeta(r.nivel):best,{rank:0,key:'none',label:''});
    let summary;
    if(unresolved.length)summary={key:'unknown',title:'DATOS INSUFICIENTES',text:'No se pudo identificar con seguridad uno o más medicamentos. Se muestran las alertas detectadas en los fármacos resueltos, pero no puede considerarse completa la evaluación.'};
    else if(worst.rank>=5)summary={key:'contra',title:'NO ASOCIAR',text:'Se detectó al menos una interacción contraindicada.'};
    else if(worst.rank===4)summary={key:'high',title:'ASOCIACIÓN DE ALTO RIESGO',text:'Se detectó al menos una interacción importante. Evitar o reevaluar la combinación salvo indicación justificada.'};
    else if(worst.rank===3)summary={key:'moderate',title:'USAR CON PRECAUCIÓN',text:'La asociación puede requerir ajuste, separación de tomas, monitorización o vigilancia clínica.'};
    else if(worst.rank===2)summary={key:'low',title:'INTERACCIÓN MENOR',text:'Se detectó una interacción de baja relevancia clínica en la base actual.'};
    else summary={key:'ok',title:'NO SE IDENTIFICÓ UNA INTERACCIÓN CLÍNICAMENTE RELEVANTE',text:'No se encontró una alerta conocida en la base local para los principios activos identificados. Esto NO equivale a garantizar que la asociación sea segura en todos los pacientes.'};

    let html=`<div class="v200-summary ${summary.key}"><small>RESULTADO DE SEGURIDAD DE LA ASOCIACIÓN</small><h3>${esc(summary.title)}</h3><p>${esc(summary.text)}</p></div>`;
    html+=`<details class="v200-resolved"><summary>Ver principios activos identificados</summary>${resolved.map(r=>`<div><b>${esc(r.label)}</b><span>${esc(r.ingredients.join(' + ')||'No identificado')}</span></div>`).join('')}</details>`;
    html+=`<details class="v200-matrix"><summary>Ver evaluación por pares (${assessments.length})</summary>${assessments.map(pairRow).join('')}</details>`;
    if(allRules.length)html+=allRules.sort((a,b)=>sevMeta(b.nivel).rank-sevMeta(a.nivel).rank).map(card).join('');
    else if(!unresolved.length)html+=`<div class="v200-no-rule"><b>No se identificó una interacción relevante en la base local.</b><p>La ausencia de una alerta no descarta interacciones raras, dependientes de dosis, función renal/hepática, edad, electrolitos, QT, embarazo u otras comorbilidades.</p></div>`;
    const m=KB.meta||{};
    html+=`<div class="warning-banner interaction-disclaimer"><b>Base de interacciones v${esc(KB.version||'0.20.0')}:</b> ${m.exact_rule_count||0} reglas exactas + ${m.class_rule_count||0} reglas por clase, con alertas adicionales de polifarmacia. La cobertura se centra en interacciones clínicamente relevantes y de seguridad; ninguna base estática puede garantizar exhaustividad absoluta. Verifique ficha técnica y criterio clínico.</div>`;
    el.innerHTML=html;
  };

  const style=document.createElement('style');
  style.textContent=`.v200-summary{border-radius:18px;padding:18px 20px;margin:18px 0;border:2px solid #a8b3bf;background:#f8fafc}.v200-summary small{font-weight:800;letter-spacing:.08em}.v200-summary h3{margin:6px 0;font-size:1.25rem}.v200-summary p{margin:0}.v200-summary.contra{border-color:#a61b1b;background:#fff2f2}.v200-summary.high{border-color:#c45a13;background:#fff7ed}.v200-summary.moderate{border-color:#bf8b16;background:#fffbea}.v200-summary.low{border-color:#3b82a0;background:#f1f8fb}.v200-summary.ok{border-color:#2f7d4a;background:#f2fbf5}.v200-summary.unknown{border-color:#6b7280;background:#f5f5f5}.v200-resolved,.v200-matrix{margin:12px 0 18px;border:1px solid #d8dee6;border-radius:12px;padding:10px 14px}.v200-resolved summary,.v200-matrix summary{cursor:pointer;font-weight:700}.v200-resolved div{display:flex;gap:12px;justify-content:space-between;padding:8px 0;border-top:1px solid #edf0f3}.v200-resolved span{color:#5b6470;text-align:right}.v200-pair-row{display:flex;justify-content:space-between;gap:12px;padding:8px 0;border-top:1px solid #edf0f3}.v200-pair-row span{font-size:.82rem;font-weight:800;text-align:right}.v200-pair-row.contra span{color:#a61b1b}.v200-pair-row.high span{color:#b6490b}.v200-pair-row.moderate span{color:#8a6410}.v200-pair-row.ok span{color:#2f7d4a}.v200-int-card{border:1px solid #d7dde4;border-left:7px solid #bf8b16;border-radius:14px;padding:16px;margin:12px 0;background:white}.v200-int-card.contra{border-left-color:#a61b1b}.v200-int-card.high{border-left-color:#c45a13}.v200-int-card.low{border-left-color:#3b82a0}.v200-int-head{display:flex;align-items:center;gap:8px;font-size:.9rem}.v200-dot{width:10px;height:10px;border-radius:50%;background:#bf8b16}.v200-int-card.contra .v200-dot{background:#a61b1b}.v200-int-card.high .v200-dot{background:#c45a13}.v200-int-card.low .v200-dot{background:#3b82a0}.v200-pair{font-size:1.08rem;font-weight:800;margin:8px 0 12px}.v200-pair span{color:#8a6a25}.v200-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.v200-grid div{background:#f8fafc;border-radius:10px;padding:10px}.v200-grid small{font-weight:800;color:#53606c}.v200-grid p{margin:4px 0 0}.v200-grid a{overflow-wrap:anywhere}.v200-no-rule{padding:16px;border-radius:14px;background:#f2fbf5;border:1px solid #80b996}.v200-no-rule p{margin:6px 0 0}@media(max-width:650px){.v200-grid{grid-template-columns:1fr}.v200-resolved div,.v200-pair-row{display:block}.v200-resolved span,.v200-pair-row span{display:block;text-align:left;margin-top:3px}}`;
  document.head.appendChild(style);
})();
