/* Vademécum Clínico Bolivia v0.19.3 · enriquecimiento de catálogo */
(function(){
  const rows=window.VCB_SEED||[];
  const n=s=>(s||'').toString().normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
  for(const x of rows){
    if(x && x.bolivia_verificado===true){
      if(n(x.estado).includes('detalle en verificacion')) x.estado='Producto confirmado en Bolivia · ficha en ampliación';
      x.presentaciones=(x.presentaciones||[]).filter(v=>n(v)!=='detalle en verificacion');
    }
  }
  // Completar duplicados exactos marca + laboratorio cuando otra ficha ya tiene datos más completos.
  const byKey=new Map();
  for(const x of rows){const k=n(x.marca)+'|'+n(x.laboratorio);if(!k||k==='|')continue;const a=byKey.get(k)||[];a.push(x);byKey.set(k,a)}
  for(const a of byKey.values()){
    const donor=a.find(x=>(x.dci||x.principios?.length)&&(x.presentaciones||[]).length);
    if(!donor)continue;
    for(const x of a){if(x===donor)continue;if(!x.dci&&!(x.principios||[]).length){x.dci=donor.dci||'';x.principios=[...(donor.principios||[])];}if(!(x.presentaciones||[]).length)x.presentaciones=[...(donor.presentaciones||[])];}
  }
  const byId=Object.fromEntries(rows.map(x=>[x.id,x]));
  if(byId['BO-CAT-00415']) Object.assign(byId['BO-CAT-00415'],{marca:'Nodolex – Comprimidos',dci:'Paracetamol',principios:['Paracetamol'],categoria:'Analgésicos / Antipiréticos',presentaciones:['500 mg · comprimidos recubiertos · dispenser x 100'],estado:'Catálogo oficial Bagó Bolivia · producto actual',fuente:'https://www.bago.com.bo/product/nodolex-comprimidos/',fecha_fuente:'2026-09-05',detalle_completo:true,aliases:['Nodolex oral','Paracetamol oral','Acetaminofén 500 mg','Paracetamol 500 mg comprimidos']});
  if(byId['BO-CAT-00416']) Object.assign(byId['BO-CAT-00416'],{marca:'Nodolex – Gotas',dci:'Paracetamol',principios:['Paracetamol'],categoria:'Analgésicos / Antipiréticos',presentaciones:['120 mg/mL · gotas · frasco gotero 20 mL'],estado:'Catálogo oficial Bagó Bolivia · producto actual',fuente:'https://www.bago.com.bo/product/nodolex-gotas/',fecha_fuente:'2026-09-05',detalle_completo:true,aliases:['Nodolex gotas','Paracetamol gotas','Acetaminofén gotas','Paracetamol 120 mg/ml']});
  if(byId['BO-CAT-00417']) Object.assign(byId['BO-CAT-00417'],{marca:'Nodolex – Inyectable',dci:'Paracetamol',principios:['Paracetamol'],categoria:'Analgésicos / Antipiréticos',presentaciones:['1.000 mg/100 mL · solución inyectable para perfusión intravenosa · frasco ampolla'],estado:'Catálogo oficial Bagó Bolivia · producto actual',fuente:'https://www.bago.com.bo/product/nodolex-inyectable/',fecha_fuente:'2026-09-05',detalle_completo:true,aliases:['Nodolex EV','Nodolex IV','Paracetamol EV','Paracetamol IV','Paracetamol endovenoso','Paracetamol intravenoso','Acetaminofén intravenoso','Paracetamol 1 g IV','Paracetamol 1000 mg IV']});
  if(!byId['VCB0193-NODOLEX-FORTE-1000']) rows.push({id:'VCB0193-NODOLEX-FORTE-1000',registro:'',marca:'Nodolex Forte',dci:'Paracetamol',principios:['Paracetamol'],laboratorio:'Bagó',categoria:'Analgésicos / Antipiréticos',presentaciones:['1.000 mg · comprimidos recubiertos · caja x 30'],estado:'INFOMERC Bolivia lo lista como descontinuado · disponibilidad actual 2026 por confirmar con Bagó',fuente:'https://www.medicamentos.bo/medicamento/nodolex-forte-comprimidos-recubiertos/prospecto/39647',fecha_fuente:'2026-09-05',bolivia_verificado:true,tipo:'comercial',detalle_completo:true,disponibilidad_actual:'por_confirmar',aliases:['Nodolex 1 g oral','Nodolex 1000 mg','Paracetamol 1 g oral','Paracetamol 1000 mg oral','Acetaminofén 1 g']});
  window.VCB_CATALOG_PATCH_VERSION='0.19.3';
})();
