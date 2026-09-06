/* Vademécum Clínico Bolivia v0.20.4 · simplificación de categorías + Gelfoam */
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

  const about=document.querySelector('#sincronizacion .about-card p b');
  if(about) about.innerHTML=about.innerHTML.replace(/Aplicación\s+0\.20\.\d+/,'Aplicación 0.20.4');
  window.VCB_FEATURE_PATCH_VERSION='0.20.4';
})();
