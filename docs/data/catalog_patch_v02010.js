/* Vademécum Clínico Bolivia v0.20.10 · diclofenaco potásico + aclaración naproxeno */
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
      touched.push(found);
      return found;
    }
    const row=Object.assign({id:data.id,marca:brand,laboratorio:lab||'',bolivia_verificado:true,tipo:'comercial'},data);
    row.aliases=uniq(row.aliases||[]);
    rows.push(row);touched.push(row);return row;
  }
  const general='https://www.medicamentos.bo/principioactivo/medicamento?iid=4728&ingrediente=Diclofenaco+pot%C3%A1sico';
  const common={bolivia_verificado:true,tipo:'comercial',detalle_completo:true,fecha_fuente:'2026-09-06',nivel_evidencia:'catalogo_farmaceutico_bolivia',cotejo_agemed:'pendiente de conciliación individual',categoria:'Analgésicos / AINE',accion_terapeutica:'Analgésico antiinflamatorio no esteroideo'};
  upsert('Diclofenaco potásico','',Object.assign({},common,{id:'VCB02010-DICLOFENACO-POTASICO-GENERICO',dci:'Diclofenaco potásico',principios:['Diclofenaco potásico'],laboratorio:'Genérico / múltiples laboratorios Bolivia',presentaciones:['Presentaciones orales, inyectables y tópicas según fabricante'],estado:'Principio activo confirmado en múltiples productos comercializados en Bolivia',fuente:general,aliases:['diclofenaco potasico','diclofenaco potásico','diclofenac potasico','diclofenac potassium','AINE diclofenaco','antiinflamatorio diclofenaco']}));
  upsert('Neoflogiatrin 100','Megalabs',Object.assign({},common,{id:'VCB02010-NEOFLOGIATRIN-100',dci:'Diclofenaco potásico',principios:['Diclofenaco potásico'],presentaciones:['Diclofenaco potásico 100 mg · comprimidos recubiertos · caja x 20'],estado:'Producto y concentración verificados en Vademécum Farmacéutico Bolivia',fuente:'https://www.medicamentos.bo/medicamento/neoflogiatrin-100-comprimidos-recubiertos/prospecto/40052',aliases:['Neoflogiatrin 100','diclofenaco potasico 100 mg','diclofenaco potásico 100 mg']}));
  upsert('Neoflogiatrin 75','Megalabs',Object.assign({},common,{id:'VCB02010-NEOFLOGIATRIN-75',dci:'Diclofenaco potásico',principios:['Diclofenaco potásico'],presentaciones:['Diclofenaco potásico 75 mg · comprimidos recubiertos de liberación sostenida · caja x 20'],estado:'Producto y concentración verificados en Vademécum Farmacéutico Bolivia',fuente:'https://www.medicamentos.bo/medicamento/neoflogiatrin-75-comprimidos-recubiertos-de-liberacion-sostenida/prospecto/40051',aliases:['Neoflogiatrin 75','diclofenaco potasico 75 mg','diclofenaco potásico 75 mg','diclofenaco liberacion sostenida']}));
  upsert('Cloflam 100','San Fernando',Object.assign({},common,{id:'VCB02010-CLOFLAM-100',dci:'Diclofenaco potásico',principios:['Diclofenaco potásico'],laboratorio:'XL Laboratories / San Fernando',presentaciones:['Diclofenaco potásico 100 mg · tabletas recubiertas · dispensador 10 cajas x 10'],estado:'Producto y concentración verificados en Vademécum Farmacéutico Bolivia',fuente:'https://www.medicamentos.bo/medicamento/cloflam-100-tabletas-recubiertas/prospecto/34147',aliases:['Cloflam 100','diclofenaco potasico 100 mg','diclofenaco potásico 100 mg']}));
  upsert('Diclosan Potásico','Sanat Pharma',Object.assign({},common,{id:'VCB02010-DICLOSAN-POTASICO',dci:'Diclofenaco potásico',principios:['Diclofenaco potásico'],presentaciones:['Diclofenaco potásico 100 mg · cápsulas · caja x 100'],estado:'Producto y concentración verificados en Vademécum Farmacéutico Bolivia',fuente:'https://www.medicamentos.bo/medicamento/diclosan-potasico-capsulas/prospecto/39485',aliases:['Diclosan','Diclosan Potasico','Diclosan Potásico','diclofenaco potasico 100 mg']}));
  [
    ['Flamirex','Quimfa Bolivia','Gel'],
    ['Flogene','Tecnofarma','Ampollas'],
    ['Flogene Retard','Tecnofarma','Comprimidos'],
    ['Flogene S.R.','Tecnofarma','Comprimidos de liberación prolongada'],
    ['Vinil','Imfar','Comprimidos']
  ].forEach((r,i)=>upsert(r[0],r[1],Object.assign({},common,{id:'VCB02010-DICLO-K-'+(i+1),dci:'Diclofenaco potásico',principios:['Diclofenaco potásico'],presentaciones:[r[2]],estado:'Producto listado en Bolivia; concentración/presentación detallada en ampliación',fuente:general,detalle_completo:false,aliases:[r[0],'diclofenaco potasico','diclofenaco potásico']})));
  const comboCommon=Object.assign({},common,{categoria:'Analgésicos / AINE combinados'});
  upsert('Neoflogiatrin Plus','Megalabs',Object.assign({},comboCommon,{id:'VCB02010-NEOFLOGIATRIN-PLUS',dci:'Codeína + Diclofenaco potásico',principios:['Codeína','Diclofenaco potásico'],presentaciones:['Comprimidos recubiertos'],estado:'Asociación confirmada en Vademécum Farmacéutico Bolivia; dosis en ampliación',fuente:general,detalle_completo:false,aliases:['Neoflogiatrin Plus','codeina diclofenaco','codeína diclofenaco']}));
  upsert('Flogene Relax','Tecnofarma',Object.assign({},comboCommon,{id:'VCB02010-FLOGENE-RELAX',dci:'Carisoprodol + Diclofenaco potásico',principios:['Carisoprodol','Diclofenaco potásico'],presentaciones:['Comprimidos recubiertos'],estado:'Asociación confirmada en Vademécum Farmacéutico Bolivia; dosis en ampliación',fuente:general,detalle_completo:false,aliases:['Flogene Relax','carisoprodol diclofenaco']}));
  upsert('Relaxsan','Sanat Pharma',Object.assign({},comboCommon,{id:'VCB02010-RELAXSAN',dci:'Carisoprodol + Diclofenaco potásico',principios:['Carisoprodol','Diclofenaco potásico'],presentaciones:['Cápsulas'],estado:'Asociación confirmada en Vademécum Farmacéutico Bolivia; dosis en ampliación',fuente:general,detalle_completo:false,aliases:['Relaxsan','carisoprodol diclofenaco']}));
  upsert('Neurodol D','San Fernando',Object.assign({},comboCommon,{id:'VCB02010-NEURODOL-D',dci:'Vitaminas B + Diclofenaco potásico',principios:['Tiamina (vitamina B1)','Piridoxina (vitamina B6)','Cianocobalamina (vitamina B12)','Diclofenaco potásico'],presentaciones:['Comprimidos recubiertos'],estado:'Producto combinado listado en Bolivia; dosis individuales en ampliación',fuente:general,detalle_completo:false,aliases:['Neurodol D','diclofenaco B1 B6 B12','diclofenaco vitaminas B']}));

  // "Naproxeno potásico" no se registra como medicamento porque no fue verificado en Bolivia.
  // Se usa como alias de búsqueda para dirigir al usuario hacia el naproxeno sódico real y mostrar una advertencia explícita.
  rows.filter(x=>n(x?.dci).includes('naproxeno sodico')||(x?.principios||[]).some(p=>n(p).includes('naproxeno sodico'))).forEach(x=>{
    x.aliases=uniq([...(x.aliases||[]),'naproxeno potasico','naproxeno potásico']);
    touched.push(x);
  });

  if(typeof search==='function'&&!window.__VCB_NAPROXENO_POTASICO_NOTICE){
    const previousSearch=search;
    search=function(){
      previousSearch();
      const input=document.querySelector('#q');
      const q=n(input?.value||'');
      if(q==='naproxeno potasico'){
        const box=document.querySelector('#resultados');
        if(box&&!box.querySelector('[data-naproxeno-potasico-note]')) box.insertAdjacentHTML('afterbegin','<div class="warning-banner" data-naproxeno-potasico-note><b>Aclaración:</b> no se verificó una presentación comercial de <b>naproxeno potásico</b> en Bolivia. La base muestra <b>naproxeno sódico</b>, que sí está documentado. No deben considerarse sales equivalentes por nombre sin confirmar la ficha del producto.</div>');
      }
    };
    window.__VCB_NAPROXENO_POTASICO_NOTICE=true;
  }

  async function refreshLiveCatalog(){
    try{
      if(typeof putMany==='function'&&typeof getAll==='function'&&typeof boliviaMeds==='function'){
        await putMany(uniq(touched));
        allMeds=boliviaMeds(await getAll());
        if(typeof sortCatalog==='function')sortCatalog();
        if(typeof buildLists==='function')buildLists();
        if(typeof search==='function')search();
      }
    }catch(e){console.warn('VCB v0.20.10 refresh:',e)}
  }
  refreshLiveCatalog();
  window.VCB_CATALOG_PATCH_VERSION='0.20.10';
})();
