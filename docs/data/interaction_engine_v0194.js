/* Vademécum Clínico Bolivia v0.19.4
   Comprobador de interacciones orientado a seguridad de la asociación.
   No replica bases propietarias. Usa reglas locales verificables y muestra incertidumbre explícita. */
(function(){
  const N=s=>norm(s||'');
  const uniq=a=>[...new Set(a.filter(Boolean))];
  const eq=(a,b)=>N(a)===N(b);
  const inSet=(x,set)=>set.some(v=>eq(x,v));

  const OPIOIDS=['Tramadol','Morfina','Codeína','Tapentadol','Fentanilo','Oxicodona','Buprenorfina','Metadona'];
  const BENZOS=['Clonazepam','Diazepam','Alprazolam','Lorazepam','Midazolam','Bromazepam','Clotiazepam'];
  const GABAS=['Pregabalina','Gabapentina'];
  const NSAIDS=['Diclofenaco','Ibuprofeno','Ketorolaco','Naproxeno','Ketoprofeno','Meloxicam','Piroxicam','Celecoxib','Etoricoxib','Dexketoprofeno'];
  const ANTICOAGS=['Warfarina','Acenocumarol','Apixabán','Rivaroxabán','Dabigatrán','Edoxabán','Heparina','Enoxaparina'];
  const ANTIPLATE=['Ácido acetilsalicílico','Aspirina','Clopidogrel','Prasugrel','Ticagrelor'];
  const ACEARB=['Enalapril','Lisinopril','Ramipril','Captopril','Losartán','Valsartán','Candesartán','Irbesartán','Telmisartán'];
  const KSPARE=['Espironolactona','Eplerenona','Amilorida','Triamtereno'];
  const SEROTONERGIC=['Sertralina','Fluoxetina','Paroxetina','Citalopram','Escitalopram','Venlafaxina','Duloxetina','Amitriptilina','Clomipramina','Trazodona','Linezolid'];
  const NITRATES=['Nitroglicerina','Dinitrato de isosorbida','Mononitrato de isosorbida','Isosorbida'];
  const PDE5=['Sildenafilo','Tadalafilo','Vardenafilo','Avanafilo'];

  function sevMeta(level){
    const n=N(level);
    if(n.includes('contra')) return {rank:4,key:'contra',label:'CONTRAINDICADA · NO ASOCIAR'};
    if(n.includes('alta')) return {rank:3,key:'high',label:'ALTO RIESGO · EVITAR/REEVALUAR'};
    if(n.includes('moder')) return {rank:2,key:'moderate',label:'PRECAUCIÓN · MONITORIZAR'};
    if(n.includes('baja')) return {rank:1,key:'low',label:'INTERACCIÓN MENOR'};
    return {rank:2,key:'moderate',label:'PRECAUCIÓN'};
  }

  function rule(a,b,level,consequence,action,mechanism='',source=''){
    return {a,b,nivel:level,resumen:consequence,conducta:action,mecanismo:mechanism,fuente:source};
  }

  function classRules(a,b){
    const out=[];
    const both=(A,B)=>(inSet(a,A)&&inSet(b,B))||(inSet(a,B)&&inSet(b,A));
    if(both(OPIOIDS,BENZOS)) out.push(rule(a,b,'Alta','Sedación profunda, depresión respiratoria, coma y muerte.','Evitar cuando sea posible. Si es imprescindible, usar la menor exposición necesaria y vigilancia respiratoria estrecha.','Depresión aditiva del sistema nervioso central.','FDA · opioides y benzodiacepinas'));
    if(both(OPIOIDS,GABAS)) out.push(rule(a,b,'Moderada/Alta','Mayor sedación y riesgo de depresión respiratoria, especialmente en pacientes vulnerables.','Valorar necesidad, dosis y factores de riesgo respiratorio; monitorizar.','Depresión aditiva del SNC.','FDA · gabapentinoides y opioides'));
    if(inSet(a,NSAIDS)&&inSet(b,NSAIDS)) out.push(rule(a,b,'Alta','Aumenta el riesgo gastrointestinal, renal y hemorrágico sin beneficio analgésico proporcional.','Evitar la asociación de dos AINE salvo indicación excepcional y supervisada.','Duplicidad farmacológica de AINE.','Fichas técnicas / seguridad de AINE'));
    if(both(ANTICOAGS,NSAIDS)) out.push(rule(a,b,'Moderada/Alta','Aumenta el riesgo de sangrado, especialmente gastrointestinal.','Evitar si existe alternativa o usar el menor tiempo posible con vigilancia del sangrado y función renal.','Efecto hemostático adverso aditivo.','Fichas técnicas de anticoagulantes y AINE'));
    if(both(ANTICOAGS,ANTIPLATE)) out.push(rule(a,b,'Moderada/Alta','Aumenta el riesgo hemorrágico.','Usar solo cuando exista indicación clara; vigilar signos de sangrado y parámetros pertinentes.','Efectos antitrombóticos aditivos.','Fichas técnicas / guías antitrombóticas'));
    if(both(ACEARB,KSPARE)) out.push(rule(a,b,'Moderada/Alta','Puede causar hiperpotasemia y deterioro de función renal.','Controlar potasio y función renal; ajustar según contexto clínico.','Bloqueo combinado del sistema renina-angiotensina/retención de potasio.','Fichas técnicas'));
    if((eq(a,'Tramadol')&&inSet(b,SEROTONERGIC))||(eq(b,'Tramadol')&&inSet(a,SEROTONERGIC))) out.push(rule(a,b,'Moderada/Alta','Mayor riesgo de síndrome serotoninérgico y convulsiones.','Valorar alternativa; vigilar hiperreflexia, clonus, agitación, fiebre y cambios autonómicos.','Potenciación serotoninérgica y reducción del umbral convulsivo.','Fichas técnicas / advertencias farmacológicas'));
    if(both(NITRATES,PDE5)) out.push(rule(a,b,'Contraindicada','Puede producir hipotensión grave y potencialmente peligrosa.','No asociar nitratos con inhibidores PDE5.','Potenciación de la vía NO–cGMP y vasodilatación.','Información de prescripción de inhibidores PDE5'));
    return out;
  }

  function pairAssessment(ra,rb){
    const rules=[];
    for(const a of ra.ingredients) for(const b of rb.ingredients){
      (checkPair(a,b)||[]).forEach(x=>rules.push({...x}));
      classRules(a,b).forEach(x=>rules.push(x));
    }
    const dup=ra.ingredients.filter(a=>rb.ingredients.some(b=>eq(a,b)));
    if(dup.length) rules.push(rule(ra.label,rb.label,'Alta',`Duplicidad de principio activo: ${uniq(dup).join(' + ')}. Puede aumentar toxicidad o provocar sobredosis acumulativa.`,'Revisar la dosis total y evitar duplicación inadvertida.','Duplicidad del mismo principio activo.','Composición de los productos seleccionados'));
    const seen=new Set();
    return rules.filter(r=>{const k=[N(r.a),N(r.b),N(r.resumen)].sort().join('|');if(seen.has(k))return false;seen.add(k);return true;});
  }

  function card(rule){
    const m=sevMeta(rule.nivel);
    return `<div class="v194-int-card ${m.key}">
      <div class="v194-int-head"><span class="v194-dot"></span><b>${esc(m.label)}</b></div>
      <div class="v194-pair">${esc(rule.a)} <span>+</span> ${esc(rule.b)}</div>
      <div class="v194-grid">
        <div><small>QUÉ PUEDE OCURRIR</small><p>${esc(rule.resumen||'Interacción clínicamente relevante.')}</p></div>
        ${rule.mecanismo?`<div><small>POR QUÉ</small><p>${esc(rule.mecanismo)}</p></div>`:''}
        <div><small>QUÉ HACER</small><p>${esc(rule.conducta||'Valorar el contexto clínico y monitorizar.')}</p></div>
        ${rule.fuente?`<div><small>FUENTE / EVIDENCIA</small><p>${esc(rule.fuente)}</p></div>`:''}
      </div>
    </div>`;
  }

  window.renderInteractionsMulti=function(){
    const vals=$$('.int-med').map(x=>x.value.trim()).filter(Boolean),el=$('#interactionList');
    if(vals.length<2){toast('Agregue al menos dos medicamentos');return}
    const resolved=vals.map(resolveInput);
    const unresolved=resolved.filter(r=>!r.ingredients.length);
    const assessments=[];
    for(let i=0;i<resolved.length;i++) for(let j=i+1;j<resolved.length;j++){
      const rules=pairAssessment(resolved[i],resolved[j]);
      assessments.push({a:resolved[i],b:resolved[j],rules});
    }
    const allRules=assessments.flatMap(x=>x.rules);
    const worst=allRules.reduce((best,r)=>sevMeta(r.nivel).rank>best.rank?sevMeta(r.nivel):best,{rank:0,key:'none',label:''});
    let summary;
    if(unresolved.length) summary={key:'unknown',title:'DATOS INSUFICIENTES',text:'No se pudo identificar con seguridad la composición de uno o más productos. No se puede evaluar la asociación.'};
    else if(worst.rank>=4) summary={key:'contra',title:'NO ASOCIAR',text:'Se detectó al menos una interacción contraindicada.'};
    else if(worst.rank===3) summary={key:'high',title:'ASOCIACIÓN DE ALTO RIESGO',text:'Se detectó una interacción importante. Evitar o reevaluar la combinación salvo indicación justificada.'};
    else if(worst.rank===2) summary={key:'moderate',title:'USAR CON PRECAUCIÓN',text:'La asociación puede requerir ajuste, monitorización o vigilancia clínica.'};
    else if(worst.rank===1) summary={key:'low',title:'INTERACCIÓN MENOR',text:'Se detectó una interacción de baja relevancia clínica en la base actual.'};
    else summary={key:'ok',title:'NO SE IDENTIFICÓ UNA INTERACCIÓN CLÍNICAMENTE RELEVANTE',text:'En la base disponible no se encontró una interacción conocida entre los principios activos identificados. Esto no equivale a garantizar seguridad absoluta.'};

    let html=`<div class="v194-summary ${summary.key}"><small>RESULTADO DE SEGURIDAD DE LA ASOCIACIÓN</small><h3>${esc(summary.title)}</h3><p>${esc(summary.text)}</p></div>`;
    html+=`<details class="v194-resolved"><summary>Ver principios activos identificados</summary>${resolved.map(r=>`<div><b>${esc(r.label)}</b><span>${esc(r.ingredients.join(' + ')||'No identificado')}</span></div>`).join('')}</details>`;
    if(allRules.length) html+=allRules.sort((a,b)=>sevMeta(b.nivel).rank-sevMeta(a.nivel).rank).map(card).join('');
    else if(!unresolved.length) html+=`<div class="v194-no-rule"><b>Sin interacción registrada en la base local para esta asociación.</b><p>La ausencia de una alerta no descarta interacciones raras, dependientes de dosis, función renal/hepática, edad, QT, comorbilidades o medicamentos no incluidos.</p></div>`;
    html+=`<div class="warning-banner interaction-disclaimer"><b>Uso profesional:</b> el comprobador apoya la prescripción, pero no sustituye la ficha técnica, guías institucionales ni el juicio clínico. Una alerta describe riesgo de la <u>asociación</u>; no es una lista general de efectos adversos de cada medicamento.</div>`;
    el.innerHTML=html;
  };

  const style=document.createElement('style');
  style.textContent=`
    .v194-summary{border-radius:18px;padding:18px 20px;margin:18px 0;border:2px solid #a8b3bf;background:#f8fafc}.v194-summary small{font-weight:800;letter-spacing:.08em}.v194-summary h3{margin:6px 0;font-size:1.25rem}.v194-summary p{margin:0}.v194-summary.contra{border-color:#a61b1b;background:#fff2f2}.v194-summary.high{border-color:#c45a13;background:#fff7ed}.v194-summary.moderate{border-color:#bf8b16;background:#fffbea}.v194-summary.ok{border-color:#2f7d4a;background:#f2fbf5}.v194-summary.unknown{border-color:#6b7280;background:#f5f5f5}
    .v194-resolved{margin:12px 0 18px;border:1px solid #d8dee6;border-radius:12px;padding:10px 14px}.v194-resolved summary{cursor:pointer;font-weight:700}.v194-resolved div{display:flex;gap:12px;justify-content:space-between;padding:8px 0;border-top:1px solid #edf0f3}.v194-resolved span{color:#5b6470;text-align:right}
    .v194-int-card{border:1px solid #d7dde4;border-left:7px solid #bf8b16;border-radius:14px;padding:16px;margin:12px 0;background:white}.v194-int-card.contra{border-left-color:#a61b1b}.v194-int-card.high{border-left-color:#c45a13}.v194-int-card.low{border-left-color:#3b82a0}.v194-int-head{display:flex;align-items:center;gap:8px;font-size:.9rem}.v194-dot{width:10px;height:10px;border-radius:50%;background:#bf8b16}.v194-int-card.contra .v194-dot{background:#a61b1b}.v194-int-card.high .v194-dot{background:#c45a13}.v194-pair{font-size:1.1rem;font-weight:800;margin:8px 0 12px}.v194-pair span{color:#8a6a25}.v194-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.v194-grid div{background:#f8fafc;border-radius:10px;padding:10px}.v194-grid small{font-weight:800;color:#53606c}.v194-grid p{margin:4px 0 0}.v194-no-rule{padding:16px;border-radius:14px;background:#f2fbf5;border:1px solid #80b996}.v194-no-rule p{margin:6px 0 0}@media(max-width:650px){.v194-grid{grid-template-columns:1fr}.v194-resolved div{display:block}.v194-resolved span{display:block;text-align:left;margin-top:3px}}
  `;
  document.head.appendChild(style);
})();
