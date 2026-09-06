/* Vademécum Clínico Bolivia v0.20.3 · buscador universal de Categorías */
(function(){
  const n=s=>(s??'').toString().normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();

  const supplies=window.VCB_SUPPLIES||[];
  if(!supplies.some(x=>x.id==='VCB0202-PROV-MEGAVIT')) supplies.push({
    id:'VCB0202-PROV-MEGAVIT',tipo_registro:'proveedor',grupo_catalogo:'proveedor',
    marca:'Mega Vit S.R.L.',nombre:'Distribuidor boliviano de Mason Vitamins, Sanitas-Chemo Pharma y Ballena Azul',
    categoria:'Vitaminas, suplementos alimenticios y productos farmacéuticos',
    familias:['Mason Vitamins','Sanitas-Chemo Pharma','Ballena Azul'],
    presentaciones:['Distribución nacional desde Bolivia','Productos con registro sanitario boliviano según información corporativa oficial'],
    aliases:['Megavit','MegaVit','Mega Vit Bolivia','Mason Vitamins Bolivia','vitaminas','suplementos'],
    verificacion_bolivia:true,directorio_visible:true,visible_publico_bolivia:true,
    nivel_evidencia:'catalogo_oficial_distribuidor_bolivia',fuente_bolivia:'https://masonvitamins.com.bo/quienes-somos/',fecha_verificacion_bolivia:'2026-09-06',
    contactos_departamento:[
      {departamento:'Cochabamba',ciudad:'Cochabamba',telefonos:['4221470','67706220'],direccion:'Calle Baptista Nº 386 esq. Mayor Rocha'},
      {departamento:'La Paz',ciudad:'La Paz',telefonos:['2431102','71440061'],direccion:'Av. Arce Nº 2519, Torres del Poeta, Torre B, nivel 4, Of. B-402'},
      {departamento:'Santa Cruz',ciudad:'Santa Cruz de la Sierra',telefonos:['3446299','68938125'],direccion:'Av. Banzer Nº 444, Condominio San Antonio, 2º piso Of. 203'},
      {departamento:'Chuquisaca',ciudad:'Sucre',telefonos:['6451098','71440056'],direccion:'Calle Olañeta Nº 349 entre René Moreno y Destacamento III'},
      {departamento:'Tarija',ciudad:'Tarija',telefonos:[],direccion:'Zona Juan XXIII, calle 6 de Junio Nº 603 esq. Av. Héroes del Chaco'},
      {departamento:'Potosí',ciudad:'Potosí',telefonos:['71440056'],direccion:'Ventas departamentales'},
      {departamento:'Beni',ciudad:'Trinidad / Beni',telefonos:['68938125'],direccion:'Ventas departamentales'},
      {departamento:'Oruro',ciudad:'Oruro',telefonos:['67706220'],direccion:'Ventas departamentales'},
      {departamento:'Pando',ciudad:'Cobija',telefonos:['71440061'],direccion:'Ventas departamentales'}
    ]
  });

  const originalRender=window.renderCategories;
  if(typeof originalRender!=='function') return;

  const transverseDefs={
    'Analgésicos / AINE':['paracetamol','ibuprofeno','diclofenaco','ketorolaco','metamizol','dipirona'],
    'Antibióticos':['amoxicilina','cef','penicilina','azitromicina','metronidazol','clindamicina','meropenem','vancomicina'],
    'Anticonvulsivantes':['levetiracetam','valpro','fenobarbital','fenitoina','carbamazepina','lamotrigina','lacosamida','topiramato'],
    'Anestésicos locales':['lidocaina','bupivacaina'],
    'Corticoides':['dexametasona','betametasona','prednisona','metilprednisolona'],
    'Antidepresivos':['escitalopram','amitriptilina','desvenlafaxina','fluoxetina','paroxetina','duloxetina'],
    'Antivertiginosos':['betahistina','cinarizina','dimenhidrinato']
  };
  const labels={especialidades:'Especialidades',transversales:'Transversales',implantes:'Implantes',miss:'MISS / tubular',abordajes:'ALIF / abordajes',soporte:'Soporte / alquiler',insumos:'Insumos y equipos',proveedores:'Proveedores Bolivia'};

  function flattenText(v){if(v==null)return'';if(Array.isArray(v))return v.map(flattenText).join(' ');if(typeof v==='object')return Object.values(v).map(flattenText).join(' ');return String(v)}
  function textScore(text,q){
    const s=n(text), nq=n(q); if(!nq)return 0;
    if(s===nq)return 1600;if(s.startsWith(nq))return 1400;if(s.includes(nq))return 1100;
    const qt=(typeof semanticTokens==='function'?semanticTokens(q):nq.split(/\s+/)).filter(Boolean);
    const st=(typeof semanticTokens==='function'?semanticTokens(text):s.split(/[^a-z0-9]+/)).filter(Boolean);
    if(!qt.length)return 0;
    const ok=qt.every(t=>st.some(w=>w===t||w.startsWith(t)||(typeof edit1==='function'&&t.length>=5&&w.length>=5&&edit1(t,w))));
    return ok?800:0;
  }
  function medGroups(defs){const out=[];for(const [group,terms] of Object.entries(defs||{})) for(const x of allMeds.filter(m=>matchesTerms(m,terms))) out.push({kind:'medicine',item:x,group});return out}
  function candidates(tab){
    if(tab==='especialidades'){
      const out=medGroups(specialtyDefs),assigned=new Set(out.map(c=>c.item.id));
      for(const x of allMeds)if(!assigned.has(x.id))out.push({kind:'medicine',item:x,group:'Medicina general / otros'});return out;
    }
    if(tab==='transversales')return medGroups(transverseDefs);
    if(tab==='implantes')return boliviaImplants().map(x=>({kind:'supply',item:x,group:x.implant_family||x.categoria||'Implantes'}));
    if(tab==='insumos'){
      const out=boliviaNonImplantSupplies().map(x=>({kind:'supply',item:x,group:x.categoria||'Insumos y equipos'}));
      for(const x of procedureCatalogItems())out.push({kind:'medicine',item:x,group:'Fármacos de procedimiento'});return out;
    }
    if(tab==='proveedores')return boliviaProviders().map(x=>({kind:'supply',item:x,group:'Proveedores Bolivia'}));
    if(tab==='soporte'){
      const out=boliviaServices().map(x=>({kind:'supply',item:x,group:'Servicios / modalidades'}));
      const eq=boliviaNonImplantSupplies().filter(x=>/columna|espinal|quir[oó]fano|imagen intraoperatoria/i.test([x.categoria,x.nombre,(x.aliases||[]).join(' ')].join(' ')));
      out.push(...eq.map(x=>({kind:'supply',item:x,group:'Equipamiento relacionado con columna'})));return out;
    }
    if(tab==='miss')return (window.VCB_SPINE_MISS||[]).map((x,i)=>({kind:'plain',item:x,group:'MISS / tubular',uid:'miss-'+i}));
    if(tab==='abordajes')return (window.VCB_SPINE_APPROACHES||[]).map((x,i)=>({kind:'plain',item:x,group:'ALIF / abordajes',uid:'approach-'+i}));
    return [];
  }
  function candidateScore(c,q){let s=0;if(c.kind==='medicine'&&typeof searchScore==='function')s=searchScore(c.item,q);else if(c.kind==='supply'&&typeof supplySearchScore==='function')s=supplySearchScore(c.item,q);return Math.max(s,textScore(c.group,q),textScore(flattenText(c.item),q))}
  function candidateKey(c){return c.kind+':'+(c.item.id||c.uid||n(flattenText(c.item)).slice(0,80))}
  function supplyRow(x){return `<div class="drug-row" data-supply="${esc(x.id)}"><div><div class="marca">${esc(x.marca||x.nombre||'Insumo')}<span class="supply-badge">BOLIVIA</span></div><div class="dci">${esc(x.nombre||x.categoria||'')}</div></div><div class="dci">${esc(x.categoria||'')}</div><div class="presentation">${esc((x.presentaciones||[]).slice(0,2).join(' · ')||'Detalle en verificación')}</div><div class="lab">${esc(x.proveedor_bolivia||x.fabricante||'Bolivia')}</div><div class="arrow">›</div></div>`}
  function plainCard(c,tab){
    const x=c.item;
    if(tab==='miss')return `<article class="approach-card"><div class="approach-top"><div><b>${esc(x.tecnica||'MISS')}</b><span>${esc(x.nombre||'')}</span></div></div><div class="approach-row"><strong>Sistema / producto</strong><span>${esc((x.sistemas_confirmados||[]).join(' · ')||'Pendiente')}</span></div><div class="approach-row"><strong>Equipo</strong><span>${esc((x.equipos_relacionados||[]).join(' · ')||'Pendiente')}</span></div><div class="approach-row"><strong>Proveedor</strong><span>${esc((x.proveedores||[]).map(p=>p.nombre||p).join(' · ')||'Pendiente')}</span></div>${x.nota?`<div class="approach-note">${esc(x.nota)}</div>`:''}</article>`;
    return `<article class="approach-card"><div class="approach-top"><div><b>${esc(x.abordaje||'Abordaje')}</b><span>${esc(x.nombre||'')}</span></div></div><div class="approach-row"><strong>Implantes</strong><span>${esc((x.implantes_confirmados||[]).join(' · ')||'No verificados todavía')}</span></div><div class="approach-row"><strong>Proveedor</strong><span>${esc((x.proveedores||[]).map(p=>p.nombre||p).join(' · ')||'Pendiente')}</span></div><div class="approach-row"><strong>Equipo / soporte</strong><span>${esc((x.equipos_soporte||[]).join(' · ')||'Pendiente')}</span></div>${x.nota?`<div class="approach-note">${esc(x.nota)}</div>`:''}</article>`;
  }
  function renderHit(c,tab){const body=c.kind==='medicine'?drugRow(c.item,isCombined(c.item)):c.kind==='supply'?supplyRow(c.item):plainCard(c,tab);return `<div class="vcb-category-hit"><div class="vcb-category-hit-group">${esc(c.group||labels[tab]||'Categoría')}</div>${body}</div>`}
  function bindHits(root){root.querySelectorAll('.drug-row[data-id]').forEach(r=>r.onclick=()=>openMedicine(r.dataset.id));root.querySelectorAll('.drug-row[data-supply]').forEach(r=>r.onclick=()=>openSupply(r.dataset.supply))}
  function installSearch(tab){
    const el=document.querySelector('#categoryContent');if(!el)return;
    const base=document.createElement('div');base.className='vcb-category-browse';while(el.firstChild)base.appendChild(el.firstChild);
    const box=document.createElement('div');box.className='vcb-category-search';box.innerHTML=`<span>⌕</span><input id="categoryUniversalSearch" type="search" autocomplete="off" placeholder="Buscar en ${esc(labels[tab]||'esta categoría')}…"><button type="button" aria-label="Limpiar búsqueda">×</button>`;
    const meta=document.createElement('div');meta.className='vcb-category-meta';
    const results=document.createElement('div');results.className='vcb-category-results hidden';el.append(box,meta,base,results);
    const input=box.querySelector('input'),clear=box.querySelector('button'),pool=candidates(tab);
    function run(){
      const q=input.value.trim();
      if(!q){base.classList.remove('hidden');results.classList.add('hidden');results.innerHTML='';meta.textContent=`${pool.length} registros indexados en ${labels[tab]||'esta categoría'}. Puede buscar aunque el grupo no esté abierto.`;return}
      const ranked=pool.map(c=>({c,s:candidateScore(c,q)})).filter(x=>x.s>0).sort((a,b)=>b.s-a.s||n(a.c.group).localeCompare(n(b.c.group),'es'));
      const seen=new Set(),unique=[];for(const r of ranked){const k=candidateKey(r.c);if(seen.has(k))continue;seen.add(k);unique.push(r.c)}
      const shown=unique.slice(0,150);base.classList.add('hidden');results.classList.remove('hidden');
      meta.textContent=`${unique.length} resultado${unique.length===1?'':'s'} para “${q}”${unique.length>150?' · mostrando los primeros 150':''}.`;
      results.innerHTML=shown.length?shown.map(c=>renderHit(c,tab)).join(''):`<div class="empty-state">No se encontraron resultados en ${esc(labels[tab]||'esta categoría')}.</div>`;bindHits(results);
    }
    input.addEventListener('input',run);clear.onclick=()=>{input.value='';run();input.focus()};run();
  }
  window.renderCategories=function(tab='especialidades'){originalRender(tab);installSearch(tab)};
  try{renderCategories=window.renderCategories}catch(_e){}
  document.querySelectorAll('.cat-tab').forEach(b=>b.onclick=()=>window.renderCategories(b.dataset.cat));

  if(!document.querySelector('#vcb0203Styles')){
    const st=document.createElement('style');st.id='vcb0203Styles';st.textContent=`.vcb-category-search{display:flex;align-items:center;gap:10px;background:#fff;border:1px solid #ccd5df;border-radius:14px;padding:10px 12px;margin:0 0 8px;box-shadow:0 5px 18px rgba(16,39,66,.06)}.vcb-category-search span{font-size:22px;color:#102742}.vcb-category-search input{border:0;outline:0;flex:1;min-width:0;font:inherit;font-size:16px;background:transparent;color:#102742}.vcb-category-search button{border:0;background:#eef2f6;color:#102742;width:32px;height:32px;border-radius:50%;font-size:20px;cursor:pointer}.vcb-category-meta{font-size:13px;color:#657487;margin:0 0 16px}.vcb-category-results{width:100%}.vcb-category-hit{margin-bottom:12px}.vcb-category-hit-group{font-size:11px;font-weight:800;letter-spacing:.04em;text-transform:uppercase;color:#846f31;margin:0 0 4px 4px}.empty-state{padding:24px;border:1px dashed #c7d0da;border-radius:14px;background:#fff;color:#667587;text-align:center}.hidden{display:none!important}@media(max-width:720px){.vcb-category-search{position:sticky;top:0;z-index:7}.vcb-category-search input{font-size:16px}.vcb-category-hit-group{margin-left:2px}}`;document.head.appendChild(st);
  }
  const about=document.querySelector('#sincronizacion .about-card p b');if(about)about.innerHTML=about.innerHTML.replace(/Aplicación\s+0\.20\.\d+/,'Aplicación 0.20.3');
  window.VCB_FEATURE_PATCH_VERSION='0.20.3';
})();
