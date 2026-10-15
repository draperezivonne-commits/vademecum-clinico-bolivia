/* Vademécum Clínico Bolivia v0.20.16 · ALERTEX / modafinilo */
(function(){
  const rows=window.VCB_SEED||[];
  const n=s=>(s??'').toString().normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
  const uniq=a=>[...new Set((a||[]).filter(Boolean))];
  const touched=[];

  function upsert(brand,lab,data){
    let found=rows.find(x=>n(x?.marca)===n(brand)&&(!lab||n(x?.laboratorio).includes(n(lab))))||rows.find(x=>n(x?.marca)===n(brand));
    if(found){
      const keepId=found.id;
      Object.assign(found,data);
      found.id=keepId||data.id;
      found.aliases=uniq([...(found.aliases||[]),...(data.aliases||[])]);
      found.presentaciones=uniq([...(found.presentaciones||[]),...(data.presentaciones||[])]);
      touched.push(found);return found;
    }
    const row=Object.assign({id:data.id,marca:brand,laboratorio:lab||'',tipo:'comercial'},data);
    row.aliases=uniq(row.aliases||[]);row.presentaciones=uniq(row.presentaciones||[]);
    rows.push(row);touched.push(row);return row;
  }

  upsert('ALERTEX','Saval',{
    id:'VCB02016-ALERTEX-SAVAL',
    dci:'Modafinilo',
    principios:['Modafinilo'],
    laboratorio:'Saval',
    distribuidor_bolivia:'Farmaval',
    categoria:'Neurología / medicina del sueño · promotor de vigilia',
    accion_terapeutica:'Promotor de la vigilia',
    presentaciones:[
      'ALERTEX 100 · modafinilo 100 mg · comprimidos · envase x30',
      'ALERTEX 200 · modafinilo 200 mg · comprimidos · envase x30'
    ],
    formas_farmaceuticas:['Comprimidos'],
    aliases:[
      'Alertex','ALERTEX','modafinilo','modafinil','Alertex 100','Alertex 200',
      'modafinilo 100 mg','modafinilo 200 mg','promotor de vigilia','narcolepsia'
    ],
    bolivia_verificado:true,
    visible_publico_bolivia:true,
    detalle_completo:true,
    fecha_fuente:'2026-10-15',
    nivel_evidencia:'fabricante_oficial_mas_vademecum_farmaceutico_bolivia',
    fuente:'https://www.medicamentos.bo/medicamento/alertex-comprimidos/prospecto/33685',
    fuente_fabricante:'https://www.savalcorp.com/es/productos/ALERTEX.html?c=1',
    estado:'ALERTEX confirmado en Bolivia: modafinilo 100 mg y 200 mg, envases x30 comprimidos; laboratorio Saval, distribuido por Farmaval.',
    cotejo_agemed:'Vigencia regulatoria individual pendiente de conciliación con listado AGEMED actual.'
  });

  async function refresh(){
    try{
      if(typeof putMany==='function'&&typeof getAll==='function'&&typeof boliviaMeds==='function'){
        await putMany(touched);
        allMeds=boliviaMeds(await getAll());
        if(typeof sortCatalog==='function')sortCatalog();
        if(typeof buildLists==='function')buildLists();
        if(typeof search==='function')search();
      }
    }catch(e){console.warn('VCB v0.20.16 ALERTEX refresh:',e)}
  }
  refresh();
  window.VCB_CATALOG_PATCH_VERSION='0.20.16';
})();