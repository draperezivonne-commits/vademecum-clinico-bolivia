/* Vademécum Clínico Bolivia · enriquecimiento acumulativo v0.20.2 */
(function(){
  const rows=window.VCB_SEED||[];
  const n=s=>(s||'').toString().normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
  for(const x of rows){
    if(x && x.bolivia_verificado===true){
      if(n(x.estado).includes('detalle en verificacion')) x.estado='Producto confirmado en Bolivia · ficha en ampliación';
      x.presentaciones=(x.presentaciones||[]).filter(v=>n(v)!=='detalle en verificacion');
    }
  }
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

  function upsertByBrand(brand,lab,data){
    const found=rows.find(x=>n(x.marca)===n(brand)&&(!lab||n(x.laboratorio).includes(n(lab))));
    if(found){const keepId=found.id;Object.assign(found,data);found.id=keepId;return found}
    const row=Object.assign({id:data.id,marca:brand,laboratorio:lab||'',bolivia_verificado:true,tipo:'comercial'},data);
    rows.push(row);return row;
  }
  const commonHerbal={categoria:'Sedantes naturales / fitoterapia',bolivia_verificado:true,tipo:'comercial',fecha_fuente:'2026-09-06',cotejo_agemed:'pendiente de conciliación individual'};
  upsertByBrand('Armonyl Día','Maver',Object.assign({},commonHerbal,{id:'VCB0202-ARMONYL-DIA',dci:'Valeriana + Passiflora + Crataegus',principios:['Valeriana','Passiflora','Crataegus oxyacantha'],accion_terapeutica:'Sedante suave del sistema nervioso',presentaciones:['Valeriana 100 mg + Passiflora 36 mg + Crataegus 28 mg · caja x 20 comprimidos recubiertos'],estado:'Presencia comercial reportada en Bolivia; INFOMERC lo marca descontinuado · disponibilidad actual por confirmar',fuente:'https://farmaciaecofarma.com.bo/public/subcategorias/100',fuente_secundaria:'https://www.armonyl.cl/Armonyldia.php',disponibilidad_actual:'por_confirmar',aliases:['Armonyl','Armonyl dia','Valeriana Passiflora Crataegus','sedante natural','tranquilizante natural']}));
  upsertByBrand('Armonyl Noche','Maver',Object.assign({},commonHerbal,{id:'VCB0202-ARMONYL-NOCHE',dci:'Valeriana + Passiflora + Matricaria chamomilla',principios:['Valeriana','Passiflora','Matricaria chamomilla'],accion_terapeutica:'Inductor del sueño / sedante natural',presentaciones:['Valeriana 200 mg + Passiflora 50 mg + Matricaria chamomilla 50 mg · caja x 20 comprimidos recubiertos'],estado:'Presencia comercial reportada en Bolivia; INFOMERC lo marca descontinuado · disponibilidad actual por confirmar',fuente:'https://www.medicamentos.bo/medicamento/armonyl-noche-comprimidos/prospecto/33252',fuente_secundaria:'https://www.armonyl.cl/Armonylnoche.php',disponibilidad_actual:'por_confirmar',aliases:['Armonyl noche','Valeriana Passiflora Manzanilla','sedante natural','inductor del sueño natural']}));

  const herbalSimilar=[
    {id:'VCB0202-SEDATIVOL-TAB',marca:'Sedativol',dci:'Valeriana + Passiflora + Matricaria chamomilla',principios:['Valeriana','Passiflora','Matricaria chamomilla'],laboratorio:'Hahnemann',accion_terapeutica:'Sedante',presentaciones:['Valeriana 50 mg + Passiflora 50 mg + Chamomilla 50 mg · caja x 40 comprimidos recubiertos'],fuente:'https://www.medicamentos.bo/medicamento/sedativol-comprimidos/prospecto/36097',aliases:['sedante natural','valeriana passiflora manzanilla']},
    {id:'VCB0202-SEDATIVOL-FORTE',marca:'Sedativol Forte',dci:'Valeriana + Passiflora + Matricaria chamomilla',principios:['Valeriana','Passiflora','Matricaria chamomilla'],laboratorio:'Hahnemann',accion_terapeutica:'Sedante',presentaciones:['Valeriana 100 mg + Passiflora 100 mg + Chamomilla 100 mg · caja x 20 comprimidos recubiertos'],fuente:'https://www.medicamentos.bo/medicamento/sedativol-forte-comprimidos/prospecto/36098',aliases:['sedante natural','valeriana passiflora manzanilla']},
    {id:'VCB0202-SEDATIVOL-ULTRA',marca:'Sedativol Ultra',dci:'Valeriana + Passiflora + Matricaria chamomilla',principios:['Valeriana','Passiflora','Matricaria chamomilla'],laboratorio:'Hahnemann',accion_terapeutica:'Tranquilizante natural',presentaciones:['Valeriana 250 mg + Passiflora 200 mg + Chamomilla 100 mg · caja x 30 comprimidos recubiertos'],fuente:'https://www.medicamentos.bo/medicamento/sedativol-ultra-comprimidos-recubiertos/prospecto/40408',aliases:['tranquilizante natural','sedante natural','valeriana passiflora manzanilla']},
    {id:'VCB0202-SEDATIVOL-GOTAS',marca:'Sedativol Gotas',dci:'Valeriana + Passiflora + Matricaria chamomilla',principios:['Valeriana officinalis','Passiflora incarnata','Matricaria chamomilla'],laboratorio:'Hahnemann',accion_terapeutica:'Sedante',presentaciones:['Tinturas madre 0,333 mL + 0,333 mL + 0,333 mL por mL · frasco gotero 30 mL','Tinturas madre 0,333 mL + 0,333 mL + 0,333 mL por mL · frasco gotero 60 mL'],fuente:'https://www.medicamentos.bo/medicamento/sedativol-gotas/prospecto/36096',aliases:['sedante natural gotas','valeriana passiflora manzanilla gotas']}
  ];
  for(const r of herbalSimilar) upsertByBrand(r.marca,r.laboratorio,Object.assign({},commonHerbal,r,{estado:'Producto listado en Vademécum Farmacéutico Bolivia · ficha incorporada',detalle_completo:true}));

  const megaSource='https://masonvitamins.com.bo/shop/';
  const megaProducts=[
    ['ADVANCED COLON CLEANSER WITH PROBIOTIC','Suplementos digestivos',['Probióticos'],['limpiador de colon','probiotico']],
    ['ALOE VERA & VITAMIN E BODY CREAM','Cosméticos',['Aloe vera','Vitamina E'],['crema aloe vera','vitamina e crema']],
    ['ASHWAGANDHA','Suplementos naturales',['Ashwagandha'],['ginseng de la india']],
    ['AVOCADO CREAM','Cosméticos',['Aguacate'],['crema de palta','avocado cream']],
    ['B-COMPLEX','Multivitaminas',['Vitaminas del complejo B'],['complejo b','vitaminas b']],
    ['Ballena Azul – 200ml','Suplementos naturales',[],['ballena azul 200 ml']],
    ['Ballena Azul – 450ml','Suplementos naturales',[],['ballena azul 450 ml']],
    ['BIOTIN 10000 MCG PLUS KERATIN 100 Mg','Vitaminas',['Biotina','Keratina'],['biotina 10000 mcg','keratina 100 mg']],
    ['BIOTIN 800 MCG','Vitaminas',['Biotina'],['biotina 800 mcg']],
    ['BLOOD SUGAR TRIO','Suplementos para balance de azúcar',['Ácido alfa lipoico','Fenogreco','Cromo'],['trio azucar sangre','blood sugar']],
    ['BODY, HAIR, SKIN & NAILS','Multivitaminas',[],['cuerpo pelo piel uñas','hair skin nails']],
    ['BREWER’S YEAST 680 mg','Suplementos naturales',['Levadura de cerveza'],['levadura de cerveza 680 mg']],
    ['CALCIUM 600MG +D3 PLUS MINERALS','Minerales',['Calcio','Vitamina D3','Magnesio','Zinc','Cobre','Manganeso','Boro'],['calcio 600 d3 minerales']],
    ['CALCIUM 600MG WITH VITAMIN D3','Minerales',['Calcio','Vitamina D3'],['calcio 600 vitamina d3']],
    ['CALCIUM MAGNESIUM & ZINC','Minerales',['Calcio','Magnesio','Zinc'],['calcio magnesio zinc']],
    ['CHRONIUM PICOLINATE 200 mcg','Minerales',['Cromo'],['picolinato de cromo 200 mcg','chromium']],
    ['COD LIVER OIL WITH VITAMINS A, C & D','Multivitaminas',['Aceite de hígado de bacalao','Vitamina A','Vitamina C','Vitamina D'],['aceite higado bacalao']],
    ['COLLAGEN 1500 WITH VITAMIN C','Articulaciones',['Colágeno','Vitamina C'],['colageno 1500 vitamina c']],
    ['COLLAGEN PREMIUM SKIN CREAM','Cosméticos',['Colágeno'],['crema colageno premium']],
    ['CRANBERRY CONCENTRATE','Suplementos naturales',['Arándano'],['cranberry','arandano concentrado']],
    ['CRANBERRY WITH PROBIOTIC','Suplementos digestivos',['Arándano','Probióticos'],['cranberry probiotic','arandano probiotico']],
    ['E- OIL 30000 IU 2,5 OZ','Cosméticos',['Vitamina E'],['vitamina e aceite 30000 iu']],
    ['Fenugreek 500 mg','Suplementos naturales',['Fenogreco'],['fenogreco 500 mg']],
    ['FISH OIL 1000MG- OMEGA 3 (300MG)','Suplementos naturales',['Aceite de pescado','Omega-3'],['fish oil 1000','omega 3 300']],
    ['GARLIC 1000 mg','Suplementos naturales',['Ajo'],['ajo 1000 mg']],
    ['GINGER BURST','Suplementos naturales',['Jengibre'],['jengibre masticable']],
    ['GINKGO BILOBA','Suplementos naturales',['Ginkgo biloba'],['ginkgo']],
    ['GLUCOSAMINE CHONDROITIN 1500/1200','Articulaciones',['Glucosamina','Condroitina'],['glucosamina condroitina 1500 1200']],
    ['GLUCOSAMINE CHONDROITIN WITH COLLAGEN & HYALURONIC ACID','Articulaciones',['Glucosamina','Condroitina','Colágeno','Ácido hialurónico'],['glucosamina condroitina colageno acido hialuronico']],
    ['HEALTHY KIDS MULTIVITAMIN (OVERALL HEALTH)','Multivitaminas',[],['multivitaminico niños','healthy kids']],
    ['HYALURONIC ACID 100 mg','Articulaciones',['Ácido hialurónico'],['acido hialuronico 100 mg']],
    ['L-ARGENINE 500 MG','Aminoácidos',['L-Arginina'],['l arginina 500 mg','l argenine']],
    ['LECITHIN 1200MG','Suplementos naturales',['Lecitina de soya'],['lecitina 1200 mg']],
    ['MAGNESIUM GLUCONATE 550MG','Minerales',['Magnesio'],['gluconato de magnesio 550 mg']],
    ['MENOPAUSE TRIO','Suplementos naturales',['Cohosh negro','Linaza','Soya'],['trio menopausia','menopause trio']],
    ['MILK THISTLE (SILYMARIN)','Suplementos naturales',['Silimarina','Cardo mariano'],['cardo mariano silimarina']],
    ['MILK THISTLE & CRANBERRY LIVER & KIDNEY CLEANSER','Suplementos naturales',['Cardo mariano','Arándano'],['limpiador higado riñon','milk thistle cranberry']],
    ['POTASSIUM GLUCONATE 595MG','Minerales',['Potasio'],['gluconato de potasio 595 mg']],
    ['PROBIOTIC SUGAR FREE','Suplementos digestivos',['Probióticos'],['probiotico sin azucar']],
    ['PROSTATE FORMULA','Suplementos naturales',[],['formula prostatica','prostate formula']],
    ['PRUNE SENNA CONCENTRATE','Suplementos digestivos',['Ciruela','Sen'],['ciruela sen','prune senna']],
    ['TURMERIC WITH GINGER','Suplementos naturales',['Cúrcuma','Jengibre'],['curcuma jengibre']],
    ['VISION VITAMINS PLUS LUTEIN','Multivitaminas',['Luteína'],['vitamina vista luteina']],
    ['VITAMIN A-10000','Vitaminas',['Vitamina A'],['vitamina a 10000 ui']],
    ['VITAMIN C 1000MG','Vitaminas',['Vitamina C'],['vitamina c 1000 mg','acido ascorbico 1000']],
    ['VITAMIN D3 125 MCG (5,000 IU)','Vitaminas',['Vitamina D3'],['vitamina d3 5000 ui','colecalciferol 125 mcg']],
    ['VITAMIN E-180 MG (400UI)','Vitaminas',['Vitamina E'],['vitamina e 400 ui']],
    ['VITAMIN K2 100 MCG PLUS VITAMIN D3','Vitaminas',['Vitamina K2','Vitamina D3'],['vitamina k2 d3']],
    ['VITAMINA E 450mg (1000UI)','Vitaminas',['Vitamina E'],['vitamina e 1000 ui']],
    ['VITATRUM Complete Multivitamin','Multivitaminas',['Multivitaminas y minerales'],['vitatrum','multivitaminico completo']],
    ['VITRUM 50+ ADULT MULTI IRON FREE','Multivitaminas',['Multivitaminas y minerales'],['vitrum 50','adult multi sin hierro']],
    ['ZINC 100MG','Minerales',['Zinc'],['zinc 100 mg']],
    ['ZINC 50MG','Minerales',['Zinc'],['zinc 50 mg']],
    ['ZINC SULFATE 50MG','Minerales',['Zinc'],['sulfato de zinc 50 mg']]
  ];
  megaProducts.forEach((p,i)=>{
    const [marca,categoria,principios,aliases]=p;
    const exists=rows.find(x=>n(x.marca)===n(marca)&&(/mega\s*vit|mason/.test(n(x.laboratorio))));
    const data={id:'VCB0202-MEGAVIT-'+String(i+1).padStart(3,'0'),marca,dci:principios.length?principios.join(' + '):'Suplemento / producto de bienestar',principios,laboratorio:'Mega Vit S.R.L. / Mason Vitamins',categoria:'Mega Vit · '+categoria,presentaciones:['Catálogo oficial Mega Vit / Mason Vitamins Bolivia · presentación según ficha del producto'],estado:'Producto confirmado en catálogo oficial de Mega Vit S.R.L. Bolivia · ficha en ampliación',fuente:megaSource,fecha_fuente:'2026-09-06',bolivia_verificado:true,tipo:'comercial',detalle_completo:false,cotejo_agemed:'registro individual no transcrito en esta ficha',aliases:[...(aliases||[]),'Mega Vit','Megavit','Mason Vitamins']};
    if(exists) Object.assign(exists,data,{id:exists.id}); else rows.push(data);
  });
  window.VCB_CATALOG_PATCH_VERSION='0.20.2';
})();
