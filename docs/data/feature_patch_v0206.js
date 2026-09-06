/* Vademécum Clínico Bolivia v0.20.6 · fluoresceína neuroquirúrgica + Premier Internacional */
(function(){
  const supplies=window.VCB_SUPPLIES||[];

  if(!supplies.some(x=>x.id==='VCB0206-FLUORESCEINA-NEURO-PREMIER')) supplies.push({
    id:'VCB0206-FLUORESCEINA-NEURO-PREMIER',
    tipo_registro:'insumo',
    grupo_catalogo:'insumo',
    marca:'Fluoresceína sódica · uso neuroquirúrgico',
    nombre:'Fluoróforo para cirugía guiada por fluorescencia en tumores cerebrales',
    fabricante:'Pendiente de confirmar con proveedor',
    categoria:'Neurocirugía tumoral · Fluoróforos quirúrgicos',
    familias:['Neurocirugía tumoral','Fluoróforos','Cirugía guiada por fluorescencia','Glioma'],
    presentaciones:[
      'Presentación inyectable para uso neuroquirúrgico: marca, concentración y volumen pendientes de confirmación documental con el proveedor',
      'No confundir con BIO FLUORO: el producto publicado en la web de Premier es una tira oftálmica de fluoresceína sódica 1 mg y no corresponde a la presentación intravenosa neuroquirúrgica'
    ],
    aliases:['fluoresceina','fluoresceína','fluoresceina sodica','fluoresceína sódica','fluorescein sodium','sodium fluorescein','fluoroforo','fluoróforo','fluorescencia tumor cerebral','tumor cerebral fluorescencia','glioma fluoresceina','glioma fluoresceína','cirugia guiada por fluorescencia','cirugía guiada por fluorescencia'],
    proveedor_bolivia:'Premier Internacional',
    telefonos:['+591 79790820'],
    direccion:'Cochabamba, Bolivia',
    contactos_departamento:[
      {departamento:'Cochabamba',ciudad:'Cochabamba',telefonos:['+591 79790820'],contacto:'Contacto directo para fluoresceína · confirmar vigencia al solicitar'}
    ],
    reportado_usuario:true,
    visible_publico_bolivia:true,
    nivel_evidencia:'aporte_usuario_pendiente_documental',
    fuente_bolivia:'https://premier-internacional.com/',
    fuente:'https://pubmed.ncbi.nlm.nih.gov/26956810/',
    fecha_verificacion_bolivia:'2026-09-06',
    validacion_agemed:'Presentación, fabricante, registro sanitario y disponibilidad actual pendientes de confirmación documental individual',
    estado_bolivia:'Proveedor en Bolivia confirmado; disponibilidad de fluoresceína para neurocirugía reportada. Confirmar marca, concentración, presentación, registro y stock antes de adquirir.'
  });

  if(!supplies.some(x=>x.id==='VCB0206-PROV-PREMIER-INTERNACIONAL')) supplies.push({
    id:'VCB0206-PROV-PREMIER-INTERNACIONAL',
    tipo_registro:'proveedor',
    grupo_catalogo:'proveedor',
    marca:'Premier Internacional',
    nombre:'Directorio Bolivia · equipos e insumos médicos',
    fabricante:'Representaciones internacionales',
    categoria:'Proveedores Bolivia · Equipos e insumos médicos',
    presentaciones:[
      'Óptica, oftalmología, contactología, neumología, otorrinolaringología, cardiología y otras especialidades según catálogo oficial',
      'Fluoresceína para uso neuroquirúrgico: disponibilidad reportada por contacto directo; presentación exacta pendiente de respaldo documental'
    ],
    familias:['oftalmología','equipos médicos','insumos médicos','fluoresceína','neurocirugía tumoral','fluoróforos'],
    aliases:['Premier Internacional','premier-internacional.com','premier bolivia','premier cochabamba','fluoresceina premier','fluoresceína premier','proveedor fluoresceina','proveedor fluoresceína'],
    proveedor_bolivia:'Premier Internacional',
    telefonos:['+591 79790820','+591 4 4797000','+591 4 4115850','+591 4 4032702'],
    whatsapp:'+591 70708241',
    direccion:'Cochabamba, Bolivia',
    contactos_departamento:[
      {departamento:'Cochabamba',ciudad:'Cochabamba',telefonos:['+591 79790820'],contacto:'Contacto directo para fluoresceína · confirmar vigencia'},
      {departamento:'Cochabamba',ciudad:'Cochabamba · Central',telefonos:['+591 4 4797000','+591 4 4115850'],whatsapp:'+591 70708241',direccion:'C. Pedro Borda #917 esq. J. C. Carrillo, Edif. Conseso, Piso 3'},
      {departamento:'Cochabamba',ciudad:'Cochabamba · Sucursal',telefonos:['+591 4 4032702'],whatsapp:'+591 61678153',direccion:'Av. Heroínas #480 esq. Av. San Martín, Edif. Torre Golden, Piso 2, Of. 2D'},
      {departamento:'La Paz',ciudad:'La Paz',telefonos:['+591 2 2118029','+591 2 2117833'],whatsapp:'+591 61678154',direccion:'C. Socabaya #240 esq. Av. Mariscal, Edif. Handal, PentHouse Of. PH-4'},
      {departamento:'Santa Cruz',ciudad:'Santa Cruz de la Sierra',telefonos:['+591 3 3145873','+591 3 3122093'],whatsapp:'+591 61678157',direccion:'C. Arenales #146 casi esq. C. Beni, Edif. Comercial Santiago, Piso 2, Of. 304-305-314'}
    ],
    fuente_bolivia:'https://premier-internacional.com/',
    fuente_contacto_bolivia:'https://premier-internacional.com/',
    verificacion_bolivia:true,
    directorio_visible:true,
    visible_publico_bolivia:true,
    nivel_evidencia:'directorio_local_mas_antecedente_publico',
    fecha_verificacion_bolivia:'2026-09-06',
    estado_bolivia:'Empresa y oficinas en Bolivia verificadas en su sitio oficial. El contacto 79790820 para fluoresceína fue aportado como contacto directo y debe confirmarse al solicitar.'
  });

  const about=document.querySelector('#sincronizacion .about-card p b');
  if(about) about.innerHTML=about.innerHTML.replace(/Aplicación\s+0\.20\.\d+/,'Aplicación 0.20.6');

  // Re-renderiza el módulo Insumos ya reorganizado por v0.20.5 para incluir los nuevos registros.
  try{
    if(typeof window.renderCategories==='function') window.renderCategories('insumos');
  }catch(_e){}

  window.VCB_FEATURE_PATCH_VERSION='0.20.6';
})();
