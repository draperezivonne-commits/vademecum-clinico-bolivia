/* Vademécum Clínico Bolivia v0.20.12 · seguridad de presentación de interacciones */
(function(){
  const previous=window.renderInteractionsMulti;
  if(typeof previous!=='function')return;
  function render(){
    previous();
    const el=document.querySelector('#interactionList');
    if(!el)return;
    const result=el.querySelector('.v207-result');
    if(result&&result.classList.contains('ok')){
      const h=result.querySelector('h3');if(h)h.textContent='SIN INTERACCIÓN RELEVANTE DETECTADA';
      const strong=result.querySelector('strong');if(strong)strong.textContent='Base actual: no se encontró una alerta para esta combinación';
      const p=result.querySelector('p');if(p)p.textContent='No se encontró una interacción clínicamente relevante en las reglas actualmente verificadas. Esto no equivale a declarar que la combinación sea segura en todos los pacientes.';
    }
    const note=el.querySelector('.v207-note');
    if(note)note.innerHTML='<b>Importante:</b> el resultado se refiere únicamente a los medicamentos escritos. Los productos asociados se evalúan por cada ingrediente identificado. La base v0.20.12 amplía reglas por clases farmacológicas, pero si no existe una regla verificada se informa “sin interacción detectada”, nunca “seguro”. Pueden influir dosis, edad, embarazo, función renal/hepática, QT, electrolitos y otras condiciones clínicas. Las fuentes científicas de las alertas detectadas pueden abrirse en el desplegable inferior.';
  }
  window.renderInteractionsMulti=render;
  const btn=document.querySelector('#btnInteraccion');if(btn)btn.onclick=render;
  const panel=document.querySelector('#interacciones');
  if(panel){
    const head=panel.querySelector('.page-head');
    if(head)head.innerHTML='<div class="eyebrow dark">COMPROBADOR</div><h2>¿Se pueden usar juntos?</h2><p>Introduzca de 2 a 10 medicamentos o marcas. El sistema evalúa únicamente los fármacos seleccionados y, en productos combinados, revisa cada ingrediente. El resultado será: No combinar, Evitar, Monitorizar o Sin interacción relevante detectada.</p>';
    const banner=panel.querySelector('.warning-banner');
    if(banner)banner.innerHTML='<b>Resultado clínico directo:</b> NO COMBINAR · EVITAR · MONITORIZAR · SIN INTERACCIÓN RELEVANTE DETECTADA. La ausencia de una regla no se presenta como “seguro”. Las alertas detectadas incluyen acceso a su fuente científica.';
  }
  const about=document.querySelector('#sincronizacion .about-card p b');
  if(about)about.innerHTML=about.innerHTML.replace(/Aplicación\s+0\.20\.\d+/,'Aplicación 0.20.12');
  window.VCB_INTERACTION_UI_VERSION='0.20.12';
})();
