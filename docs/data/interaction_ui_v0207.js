/* Vademécum Clínico Bolivia v0.20.7 · resultado de interacciones simplificado */
(function(){
  const oldRender=window.renderInteractionsMulti;
  const E=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const N=s=>String(s??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
  const uniq=a=>{const seen=new Set(),out=[];for(const x of a||[]){const v=String(x||'').trim(),k=N(v);if(v&&!seen.has(k)){seen.add(k);out.push(v)}}return out};

  function valueForLabel(root,label){
    const wanted=N(label);
    for(const small of root.querySelectorAll('small')){
      if(N(small.textContent)===wanted){const p=small.parentElement?.querySelector('p');if(p?.textContent.trim())return p.textContent.trim()}
    }
    return '';
  }

  function extract(root){
    const cards=[...root.querySelectorAll('.v200-int-card')];
    const effects=[],actions=[],sources=[];
    cards.forEach(c=>{
      const effect=valueForLabel(c,'QUÉ PUEDE OCURRIR');
      const action=valueForLabel(c,'QUÉ HACER');
      if(effect)effects.push(effect);
      if(action)actions.push(action);
      c.querySelectorAll('a[href]').forEach(a=>sources.push({title:a.textContent.trim()||a.href,url:a.href}));
    });
    root.querySelectorAll('.interaction').forEach(c=>{
      const ps=[...c.querySelectorAll('p')].map(p=>p.textContent.trim()).filter(Boolean);
      if(ps[0])effects.push(ps[0]);
      const orient=ps.find(x=>N(x).startsWith('orientacion:'));
      if(orient)actions.push(orient.replace(/^Orientación:\s*/i,''));
    });
    return {effects:uniq(effects),actions:uniq(actions),sources:uniq(sources.map(s=>s.url)).map(url=>sources.find(s=>s.url===url))};
  }

  function classify(root){
    const s=root.querySelector('.v200-summary');
    if(s){
      if(s.classList.contains('unknown'))return{key:'unknown',label:'NO SE PUEDE EVALUAR COMPLETAMENTE',tone:'Revisar los nombres ingresados',text:'Uno o más medicamentos no pudieron identificarse con suficiente certeza.'};
      if(s.classList.contains('contra'))return{key:'contra',label:'NO COMBINAR',tone:'Combinación no recomendada',text:'Se detectó una interacción contraindicada entre los medicamentos seleccionados.'};
      if(s.classList.contains('high'))return{key:'high',label:'EVITAR',tone:'Interacción importante',text:'Se detectó una interacción de alto riesgo. Conviene evitar o reevaluar la combinación salvo una indicación clínica justificada.'};
      if(s.classList.contains('moderate'))return{key:'moderate',label:'MONITORIZAR',tone:'Puede requerir vigilancia o ajuste',text:'La combinación puede utilizarse en situaciones seleccionadas, pero requiere vigilancia clínica, ajuste o control según la interacción detectada.'};
      if(s.classList.contains('low'))return{key:'low',label:'PRECAUCIÓN',tone:'Interacción menor',text:'Se detectó una interacción de baja relevancia clínica que amerita precaución.'};
      if(s.classList.contains('ok'))return{key:'ok',label:'COMPATIBLE SEGÚN LA BASE ACTUAL',tone:'Sin interacción relevante detectada',text:'No se detectó una interacción clínicamente relevante entre los medicamentos escritos en la base actual.'};
    }
    if(root.querySelector('.interaction.contra'))return{key:'contra',label:'NO COMBINAR',tone:'Combinación no recomendada',text:'Se detectó una interacción contraindicada entre los medicamentos seleccionados.'};
    if(root.querySelector('.interaction.high'))return{key:'high',label:'EVITAR',tone:'Interacción importante',text:'Se detectó una interacción de alto riesgo.'};
    return{key:'ok',label:'COMPATIBLE SEGÚN LA BASE ACTUAL',tone:'Sin interacción relevante detectada',text:'No se detectó una interacción clínicamente relevante entre los medicamentos escritos en la base actual.'};
  }

  function bulletSection(title,items,empty=''){
    if(!items.length&&!empty)return'';
    const body=items.length?`<ul>${items.map(x=>`<li>${E(x)}</li>`).join('')}</ul>`:`<p>${E(empty)}</p>`;
    return `<section class="v207-block"><h4>${E(title)}</h4>${body}</section>`;
  }

  function simplifiedRender(){
    if(typeof oldRender!=='function')return;
    oldRender();
    const el=document.querySelector('#interactionList');
    const vals=[...document.querySelectorAll('.int-med')].map(x=>x.value.trim()).filter(Boolean);
    if(!el||vals.length<2)return;

    const snapshot=el.cloneNode(true);
    const state=classify(snapshot);
    const data=extract(snapshot);
    const selected=uniq(vals);

    let effects=data.effects;
    let actions=data.actions;
    if(state.key==='ok'){
      effects=[];
      actions=[];
    }

    const selectedHtml=selected.map(x=>`<span>${E(x)}</span>`).join('');
    const effectsEmpty=state.key==='ok'?'No se detectó un efecto clínicamente relevante atribuible a una interacción entre los medicamentos seleccionados en la base actual.':'';
    const actionsEmpty=state.key==='ok'?'No se requiere una medida específica por una interacción detectada; mantenga la valoración clínica habitual, dosis apropiadas y contraindicaciones individuales.':'';
    const sources=data.sources.length?`<details class="v207-sources"><summary>Fuentes de las interacciones detectadas</summary>${data.sources.map(s=>`<a href="${E(s.url)}" target="_blank" rel="noopener">${E(s.title||s.url)}</a>`).join('')}</details>`:'';

    el.innerHTML=`
      <div class="v207-result ${state.key}">
        <div class="v207-kicker">RESULTADO DE LA COMBINACIÓN</div>
        <h3>${E(state.label)}</h3>
        <strong>${E(state.tone)}</strong>
        <p>${E(state.text)}</p>
      </div>
      <div class="v207-selected"><b>Medicamentos evaluados</b><div>${selectedHtml}</div></div>
      ${bulletSection('¿Qué podría pasar?',effects,effectsEmpty)}
      ${bulletSection('¿Qué hacer?',actions,actionsEmpty)}
      ${sources}
      <div class="v207-note"><b>Importante:</b> el resultado se refiere únicamente a los medicamentos escritos arriba. No se muestran combinaciones con otros fármacos no seleccionados. La ausencia de una interacción detectada no garantiza seguridad absoluta en todos los pacientes; pueden influir dosis, edad, embarazo, función renal/hepática, QT, electrolitos y otras condiciones clínicas.</div>`;
  }

  window.renderInteractionsMulti=simplifiedRender;

  function install(){
    const panel=document.querySelector('#interacciones');
    if(panel){
      const head=panel.querySelector('.page-head');
      if(head)head.innerHTML='<div class="eyebrow dark">COMPROBADOR</div><h2>¿Se pueden usar juntos?</h2><p>Introduzca de 2 a 10 medicamentos o marcas. El resultado mostrará únicamente los fármacos seleccionados: si pueden combinarse según la base actual, si requieren monitorización, si conviene evitarlos o si no deben combinarse, y qué podría causar la interacción.</p>';
      const banner=panel.querySelector('.warning-banner');
      if(banner)banner.innerHTML='<b>Resultado directo:</b> Compatible · Monitorizar · Evitar · No combinar. Debajo se muestra qué podría pasar y qué conducta considerar.';
    }
    const btn=document.querySelector('#btnInteraccion');
    if(btn)btn.onclick=window.renderInteractionsMulti;
    const about=document.querySelector('#sincronizacion .about-card p b');
    if(about)about.innerHTML=about.innerHTML.replace(/Aplicación\s+0\.20\.\d+/,'Aplicación 0.20.7');
  }

  if(!document.querySelector('#vcb0207InteractionStyle')){
    const st=document.createElement('style');st.id='vcb0207InteractionStyle';st.textContent=`
      .v207-result{margin:18px 0 12px;padding:20px;border:2px solid #9aa7b5;border-radius:18px;background:#f7f9fb}.v207-result .v207-kicker{font-size:.75rem;font-weight:800;letter-spacing:.09em}.v207-result h3{margin:6px 0 3px;font-size:1.45rem}.v207-result strong{display:block;margin-bottom:7px}.v207-result p{margin:0}.v207-result.ok{border-color:#2f7d4a;background:#f2fbf5}.v207-result.moderate,.v207-result.low{border-color:#b88716;background:#fffbea}.v207-result.high{border-color:#c45a13;background:#fff7ed}.v207-result.contra{border-color:#a61b1b;background:#fff2f2}.v207-result.unknown{border-color:#6b7280;background:#f5f5f5}
      .v207-selected{margin:12px 0 16px;padding:13px 15px;border:1px solid #d8dee6;border-radius:13px;background:#fff}.v207-selected>b{display:block;margin-bottom:8px}.v207-selected>div{display:flex;flex-wrap:wrap;gap:7px}.v207-selected span{padding:6px 10px;border-radius:999px;background:#eef3f8;font-weight:700;color:#18324f}
      .v207-block{margin:12px 0;padding:16px;border:1px solid #d8dee6;border-radius:14px;background:#fff}.v207-block h4{margin:0 0 8px;color:#102742}.v207-block ul{margin:0;padding-left:20px}.v207-block li+li{margin-top:7px}.v207-block p{margin:0}.v207-sources{margin:12px 0;padding:12px 14px;border:1px solid #d8dee6;border-radius:12px}.v207-sources summary{cursor:pointer;font-weight:700}.v207-sources a{display:block;margin-top:7px;overflow-wrap:anywhere}.v207-note{margin-top:14px;padding:12px 14px;border-radius:12px;background:#f4f6f8;color:#4c5967;font-size:.9rem;line-height:1.45}
      @media(max-width:720px){.v207-result{padding:16px}.v207-result h3{font-size:1.25rem}.v207-block{padding:14px}}
    `;document.head.appendChild(st)
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
  window.VCB_INTERACTION_UI_VERSION='0.20.7';
})();
