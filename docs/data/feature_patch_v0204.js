/* Vademécum Clínico Bolivia · compatibilidad acumulativa v0.20.4 → v0.20.7 */
(function(){
  const supplies=window.VCB_SUPPLIES||[];
  if(!supplies.some(x=>x.id==='VCB0204-GELFOAM-PFIZER')) supplies.push({
    id:'VCB0204-GELFOAM-PFIZER',
    tipo_registro:'insumo',grupo_catalogo:'insumo',
    marca:'GELFOAM',
    nombre:'Esponja de gelatina absorbible hemostática',
    fabricante:'Pfizer',
    categoria:'Hemostáticos quirúrgicos / neurocirugía',
    familias:['Hemostáticos tópicos','Gelatina absorbible','Neurocirugía'],
    presentaciones:[
      'Esponja estéril absorbible · Size 50 (80 × 62,5 × 10 mm)',
      'Esponja estéril comprimida · Size 100 (8 × 12,5 cm)',
      'Esponja estéril absorbible · Size 200 (80 × 250 × 10 mm)'
    ],
    aliases:['Gelfoam','Gel Foam','Gealfoam','gelatina hemostática','gelatina hemostatica','gelatina absorbible','esponja hemostática','esponja hemostatica','esponja de gelatina','hemostático absorbible','hemostatico absorbible'],
    verificacion_bolivia:true,visible_publico_bolivia:true,
    disponibilidad_actual:'por_confirmar',
    nivel_evidencia:'uso_clinico_bolivia_mas_ficha_fabricante',
    validacion_agemed:'Pendiente de conciliación individual y disponibilidad comercial actual en Bolivia',
    fuente_bolivia:'https://www.redalyc.org/journal/4456/445674693004/445674693004.pdf',
    fuente:'https://labeling.pfizer.com/ShowLabeling.aspx?format=PDF&id=573',
    fecha_verificacion_bolivia:'2026-09-06',
    estado:'Uso de Gelfoam documentado en Bolivia; disponibilidad comercial y registro sanitario local actual por confirmar.'
  });

  const transverse=document.querySelector('.cat-tab[data-cat="transversales"]');
  if(transverse) transverse.remove();

  const previousRender=window.renderCategories;
  if(typeof previousRender==='function'){
    window.renderCategories=function(tab='especialidades'){
      if(tab==='transversales') tab='especialidades';
      return previousRender(tab);
    };
    try{renderCategories=window.renderCategories}catch(_e){}
    document.querySelectorAll('.cat-tab').forEach(b=>b.onclick=()=>window.renderCategories(b.dataset.cat));
  }

  const aboutP=document.querySelector('#sincronizacion .about-card p');
  if(aboutP)aboutP.innerHTML='<b>Aplicación 0.20.7 · catálogo base 0.19.0 + ampliaciones farmacológicas/insumos 0.20.6 · organización del módulo Insumos 0.20.5 · interacciones 0.20.0 con interfaz clínica simplificada 0.20.7 · filtro público Bolivia activo.</b> Los medicamentos permanecen íntegros en la base y se consultan desde Buscar medicamentos. El módulo Insumos se organiza en Cirugía de columna, Implantes neuroquirúrgicos, Insumos y equipos, Soporte/alquiler y Proveedores Bolivia, con un buscador global que recorre todas las categorías.';

  function load0207(){
    if(document.querySelector('script[data-vcb0207]')) return;
    const s7=document.createElement('script');
    s7.src='./data/interaction_ui_v0207.js?v=0.20.7';
    s7.dataset.vcb0207='1';
    document.body.appendChild(s7);
  }

  function load0206(){
    if(document.querySelector('script[data-vcb0206]')){load0207();return}
    const s6=document.createElement('script');
    s6.src='./data/feature_patch_v0206.js?v=0.20.7';
    s6.dataset.vcb0206='1';
    s6.onload=load0207;
    document.body.appendChild(s6);
  }

  const existing5=document.querySelector('script[data-vcb0205]');
  if(!existing5){
    const s5=document.createElement('script');
    s5.src='./data/feature_patch_v0205.js?v=0.20.7';
    s5.dataset.vcb0205='1';
    s5.onload=load0206;
    document.body.appendChild(s5);
  }else{
    load0206();
  }
  window.VCB_FEATURE_PATCH_VERSION='0.20.7';
})();
