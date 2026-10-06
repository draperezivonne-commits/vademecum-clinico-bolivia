/* Vademécum Clínico Bolivia v0.20.15 · corrección NOOPIRAM / piracetam SIGMA */
(function(){
  const rows=window.VCB_SEED||[];
  const n=s=>(s??'').toString().normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
  const uniq=a=>[...new Set((a||[]).filter(Boolean))];

  function upsert(){
    let found=rows.find(x=>n(x?.marca)==='noopiram')||rows.find(x=>x?.id==='VCB02014-NOPIRAM-PENDIENTE');
    const data={
      id:found?.id||'VCB02015-NOOPIRAM-SIGMA',
      marca:'NOOPIRAM',
      dci:'Piracetam',
      principios:['Piracetam'],
      laboratorio:'Sigma Corp',
      distribuidor_bolivia:'Biofarma',
      categoria:'Neurología · nootrópicos',
      accion_terapeutica:'Nootrópico',
      presentaciones:[
        'Comprimidos recubiertos · piracetam 1200 mg · caja x 24 comprimidos',
        'Solución inyectable · piracetam 1 g/5 mL · caja x 6 ampollas de 5 mL',
        'Solución oral · piracetam 20 g/100 mL · frasco 100 mL'
      ],
      formas_farmaceuticas:['Comprimidos recubiertos','Solución inyectable','Solución oral'],
      aliases:[
        'Noopiram','NOOPIRAM','Nopiram','piracetam','piracetam 1200 mg',
        'piracetam 1 g/5 ml','piracetam inyectable','piracetam ampollas',
        'piracetam solucion oral','piracetam solución oral','nootropico','nootrópico'
      ],
      bolivia_verificado:true,
      visible_publico_bolivia:true,
      tipo:'comercial',
      detalle_completo:true,
      fecha_fuente:'2026-10-05',
      nivel_evidencia:'vademecum_farmaceutico_bolivia_mas_registro_agemed_historico',
      fuente:'https://www.medicamentos.bo/medicamento/noopiram-comprimidos-solucion-inyectable-solucion-oral/prospecto/34502',
      fuente_secundaria:'https://bo.ivademecum.com/medicamento-noopiram-cod-F31B98FCB9696453',
      fuente_registro_bolivia:'https://s3.us-east-2.amazonaws.com/cdn.miraquetemiro.org/AGEMED-Registro-de-medicamentos-2017_bc5a7363c3a2cf6667d724cf0e20398f.pdf',
      estado:'NOOPIRAM confirmado en Bolivia: piracetam de Sigma Corp. Presentaciones verificadas: comprimidos 1200 mg, inyectable 1 g/5 mL y solución oral 20 g/100 mL.',
      cotejo_agemed:'Registros históricos bolivianos identificados para comprimidos, solución oral y solución inyectable; verificar vigencia regulatoria actual al momento de dispensación.'
    };
    if(found){
      const keepId=found.id;
      Object.assign(found,data);
      found.id=keepId||data.id;
      found.aliases=uniq([...(found.aliases||[]),...data.aliases]);
      found.presentaciones=uniq(data.presentaciones);
    }else{
      rows.push(data);found=data;
    }
    return found;
  }

  const touched=upsert();

  async function refresh(){
    try{
      if(typeof putMany==='function'&&typeof getAll==='function'&&typeof boliviaMeds==='function'){
        await putMany([touched]);
        allMeds=boliviaMeds(await getAll());
        if(typeof sortCatalog==='function')sortCatalog();
        if(typeof buildLists==='function')buildLists();
        if(typeof search==='function')search();
      }
    }catch(e){console.warn('VCB v0.20.15 NOOPIRAM refresh:',e)}
  }
  refresh();
  window.VCB_CATALOG_PATCH_VERSION='0.20.15';
})();