/* Vademécum Clínico Bolivia v0.20.14 · Nopiram + citicolina + DMO Sistema de Columna M10 */
(function(){
  const rows=window.VCB_SEED||[];
  const supplies=window.VCB_SUPPLIES||[];
  const n=s=>(s??'').toString().normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
  const uniq=a=>[...new Set((a||[]).filter(Boolean))];
  const touched=[];

  function upsertMed(brand,lab,data){
    let found=rows.find(x=>n(x?.marca)===n(brand)&&(!lab||n(x?.laboratorio).includes(n(lab))))||rows.find(x=>n(x?.marca)===n(brand));
    if(found){
      const keepId=found.id;
      Object.assign(found,data);
      found.id=keepId||data.id;
      found.aliases=uniq([...(found.aliases||[]),...(data.aliases||[])]);
      found.presentaciones=uniq([...(found.presentaciones||[]),...(data.presentaciones||[])]);
      touched.push(found);
      return found;
    }
    const row=Object.assign({id:data.id,marca:brand,laboratorio:lab||'',tipo:'comercial'},data);
    row.aliases=uniq(row.aliases||[]);
    row.presentaciones=uniq(row.presentaciones||[]);
    rows.push(row);touched.push(row);return row;
  }

  function upsertSupply(data){
    const i=supplies.findIndex(x=>x?.id===data.id||n(x?.marca)===n(data.marca));
    if(i>=0){
      const old=supplies[i];
      supplies[i]=Object.assign({},old,data,{
        aliases:uniq([...(old.aliases||[]),...(data.aliases||[])]),
        presentaciones:uniq([...(old.presentaciones||[]),...(data.presentaciones||[])])
      });
      return supplies[i];
    }
    supplies.push(data);return data;
  }

  const verifiedCommon={
    bolivia_verificado:true,
    visible_publico_bolivia:true,
    tipo:'comercial',
    detalle_completo:true,
    fecha_fuente:'2026-10-05',
    nivel_evidencia:'catalogo_farmaceutico_bolivia',
    cotejo_agemed:'pendiente de conciliación individual'
  };

  /* Nopiram: marca solicitada y reportada por la usuaria. No se inventa composición/presentación. */
  upsertMed('Nopiram','', {
    id:'VCB02014-NOPIRAM-PENDIENTE',
    dci:'Composición pendiente de verificación documental',
    principios:[],
    laboratorio:'Por confirmar',
    categoria:'Neurología · detalle en verificación',
    accion_terapeutica:'Pendiente de confirmar',
    presentaciones:['Presentaciones comerciales reportadas por la usuaria · concentraciones y forma farmacéutica pendientes de respaldo documental'],
    aliases:['Nopiram','nopiram'],
    bolivia_verificado:true,
    visible_publico_bolivia:true,
    detalle_completo:false,
    fecha_fuente:'2026-10-05',
    nivel_evidencia:'aporte_usuario_pendiente_documental',
    estado:'Marca reportada en Bolivia por la usuaria del proyecto. No se publica un principio activo, laboratorio o dosis no verificados.',
    cotejo_agemed:'pendiente de identificar principio activo, fabricante y registros'
  });

  /* Citicolina genérica y presentaciones bolivianas verificadas. */
  upsertMed('Citicolina','',Object.assign({},verifiedCommon,{
    id:'VCB02014-CITICOLINA-GENERICA',
    dci:'Citicolina',
    principios:['Citicolina'],
    laboratorio:'Genérico / múltiples laboratorios Bolivia',
    categoria:'Neurología · nootrópicos / neuroactivadores',
    accion_terapeutica:'Neuroactivador metabólico',
    presentaciones:[
      '250 mg · comprimidos recubiertos',
      '500 mg · comprimidos recubiertos',
      '100 mg/mL · solución oral · frasco 30 mL',
      '1000 mg/10 mL · solución oral en sachet',
      '1000 mg/4 mL · solución inyectable',
      '1000 mg/5 mL · solución inyectable'
    ],
    fuente:'https://www.medicamentos.bo/medicamento/principioactivo/Citicolina/5235/Ferrer/653',
    aliases:['citicolina','citicolina sodica','citicolina sódica','CDP-colina','CDP colina']
  }));

  upsertMed('Fortinil','Quimfa',Object.assign({},verifiedCommon,{
    id:'VCB02014-FORTINIL-CITICOLINA',
    dci:'Citicolina',
    principios:['Citicolina'],
    laboratorio:'Quimfa Bolivia',
    categoria:'Neurología · citicolina',
    accion_terapeutica:'Neuroactivador metabólico',
    presentaciones:[
      'Fortinil 250 · citicolina 250 mg · comprimidos recubiertos · envase x20',
      'Fortinil 500 · citicolina 500 mg · comprimidos recubiertos · envase x30',
      'Fortinil 1000 S.O. · citicolina 1000 mg/10 mL · caja x10 sachets bebibles',
      'Fortinil 1000 Iny. · citicolina 1000 mg/5 mL · 1 ampolla de 5 mL'
    ],
    fuente:'https://quimfabolivia.com/catalogo.html',
    fuente_secundaria:'https://www.medicamentos.bo/medicamento/fortinil-comprimidos-recubiertos/prospecto/36153',
    aliases:['Fortinil 250','Fortinil 500','Fortinil 1000','Fortinil 1000 SO','Fortinil 1000 Iny','citicolina quimfa']
  }));

  upsertMed('Somazina','Ferrer',Object.assign({},verifiedCommon,{
    id:'VCB02014-SOMAZINA-CITICOLINA',
    dci:'Citicolina',
    principios:['Citicolina'],
    laboratorio:'Ferrer · distribuido por Engels, Merkel y Cia',
    categoria:'Neurología · citicolina',
    accion_terapeutica:'Neuroactivador metabólico',
    presentaciones:[
      'Somazina 500 mg · comprimidos recubiertos · caja x10',
      'Somazina solución oral · citicolina 100 mg/mL · frasco 30 mL + gotero',
      'Somazina 1000 solución oral · citicolina 1000 mg/10 mL · caja x6 sobres',
      'Somazina inyectable · citicolina 1000 mg/4 mL · caja x5 ampollas'
    ],
    fuente:'https://www.medicamentos.bo/medicamento/somazina-comprimidos-recubiertos-solucion-oral/prospecto/34234',
    fuente_secundaria:'https://www.medicamentos.bo/medicamento/somazina-solucion-inyectable/prospecto/34235',
    aliases:['Somazina','Somazina 500','Somazina 1000','citicolina ferrer']
  }));

  upsertMed('Recelne','Lafar',Object.assign({},verifiedCommon,{
    id:'VCB02014-RECELNE-CITICOLINA',
    dci:'Citicolina',
    principios:['Citicolina'],
    laboratorio:'Lafar',
    categoria:'Neurología · citicolina',
    accion_terapeutica:'Neuroactivador metabólico',
    presentaciones:[
      'Recelne 500 mg · comprimidos recubiertos · caja x30',
      'Recelne solución · citicolina sódica 100 mg/mL · frasco 30 mL'
    ],
    fuente:'https://medicamentos.bo/medicamento/recelne-comprimidos-recubiertos/prospecto/40201',
    fuente_secundaria:'https://www.medicamentos.bo/medicamento/recelne-solucion/prospecto/33530',
    aliases:['Recelne','Recelne 500','citicolina lafar']
  }));

  /* DMO S.R.L. y Sistema de Columna M10. */
  upsertSupply({
    id:'bol-v02014-proveedor-dmo-srl',
    tipo_registro:'proveedor',
    grupo_catalogo:'proveedor',
    marca:'DMO S.R.L.',
    nombre:'Distribuidor de Material Médico y Ortopédico · Bolivia',
    fabricante:'Representaciones múltiples',
    categoria:'Proveedor Bolivia · columna / traumatología / maxilofacial',
    presentaciones:['Sistema de Columna M10','Dispositivos médicos para columna, traumatología y cirugía maxilofacial'],
    aliases:['DMO','D.M.O.','DMO SRL','DMO Bolivia','distribuidor material médico ortopédico','Waston Bolivia','sistema M10'],
    telefonos:['+591 68303130'],
    whatsapp:'+591 68303130',
    fuente_bolivia:'https://dmo-srl.com/',
    fuente:'https://dmo-srl.com/categoria-producto/columna/',
    nivel_evidencia:'proveedor_bolivia_oficial',
    verificacion_bolivia:true,
    visible_publico_bolivia:true,
    estado_bolivia:'DMO S.R.L. publica oficialmente distribución de dispositivos médicos en Bolivia y un catálogo de columna. El WhatsApp corresponde al enlace de cotización del Sistema de Columna M10.',
    fecha_verificacion_bolivia:'2026-10-05'
  });

  upsertSupply({
    id:'bol-v02014-dmo-waston-m10',
    tipo_registro:'implante',
    grupo_catalogo:'implante',
    marca:'Sistema de Columna M10',
    nombre:'Sistema espinal M10 (Master 10) para fijación interna vertebral',
    fabricante:'Changzhou Waston Medical Appliance Co., Ltd.',
    categoria:'Cirugía de columna · instrumentación posterior / fijación interna',
    presentaciones:[
      'Sistema espinal M10 (Master 10) · modelos 11469–11472',
      'Componentes M10 con tornillos y varilla de fijación Ø6,0 mm según configuración del fabricante',
      'Instrumental específico de sistema espinal M10'
    ],
    aliases:['M10','Master 10','Sistema M10','Sistema de columna M10','Waston M10','Waston Master 10','tornillos pediculares','instrumentación columna','sistema espinal'],
    proveedor_id:'bol-v02014-proveedor-dmo-srl',
    proveedor_bolivia:'DMO S.R.L.',
    telefonos:['+591 68303130'],
    whatsapp:'+591 68303130',
    fuente_bolivia:'https://dmo-srl.com/categoria-producto/columna/',
    fuente:'https://helena.anmat.gob.ar/uploads/pdfs/crt_49117_30709768359_5294.pdf',
    nivel_evidencia:'catalogo_proveedor_bolivia_mas_registro_fabricante',
    verificacion_bolivia:true,
    visible_publico_bolivia:true,
    estado_bolivia:'DMO S.R.L. publica el Sistema de Columna M10 en su catálogo Bolivia. La identificación Waston Medical Appliance M10/Master 10 y modelos 11469–11472 está respaldada por documentación regulatoria externa; confirmar configuración exacta y stock con DMO antes de compra.',
    validacion_agemed:'Registro DI boliviano específico pendiente de conciliación individual.',
    fecha_verificacion_bolivia:'2026-10-05'
  });

  async function refreshLiveCatalog(){
    try{
      if(typeof putMany==='function'&&typeof getAll==='function'&&typeof boliviaMeds==='function'){
        await putMany(uniq(touched));
        allMeds=boliviaMeds(await getAll());
        if(typeof sortCatalog==='function')sortCatalog();
        if(typeof buildLists==='function')buildLists();
        if(typeof search==='function')search();
      }
      if(typeof window.renderCategories==='function')window.renderCategories('columna');
    }catch(e){console.warn('VCB v0.20.14 refresh:',e)}
  }
  refreshLiveCatalog();
  window.VCB_CATALOG_PATCH_VERSION='0.20.14';
})();