/* Vademécum Clínico Bolivia v0.20.5 · módulo Insumos reorganizado */
(function(){
  const n=s=>(s??'').toString().normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
  const flat=v=>v==null?'':Array.isArray(v)?v.map(flat).join(' '):(typeof v==='object'?Object.values(v).map(flat).join(' '):String(v));
  const esc2=s=>typeof esc==='function'?esc(s):String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));

  function spineText(x){return n(flat([
    x?.marca,x?.nombre,x?.categoria,x?.fabricante,x?.proveedor_bolivia,x?.implant_family,x?.grupo_catalogo,
    x?.familias,x?.aliases,x?.presentaciones,x?.tipo_registro,x?.tecnica,x?.abordaje,x?.nota,
    x?.sistemas_confirmados,x?.implantes_confirmados,x?.equipos_relacionados,x?.equipos_soporte,x?.proveedores
  ]))}
  function isSpineItem(x){
    const s=spineText(x);
    const strong=[
      'columna','espinal','spine','cervical','lumbar','lumbosac','toracolum','toracica','torácica',
      'pedicular','pediculo','pedículo','transpedicular','intersomatic','intersomatico','intersomático','interbody',
      'cage','caja intersomatica','caja intersomática','artrodes','fusion vertebral','fusión vertebral','corpectom',
      'tlif','plif','alif','olif','llif','xlif','acdf','adr cervical','disco cervical','disco lumbar','masa lateral',
      'laminoplast','deformidad vertebral','escoliosis','vertebral','sacropelv','sacroiliac'
    ];
    return strong.some(t=>s.includes(n(t)));
  }

  function bindRows(root=document){
    root.querySelectorAll('.drug-row[data-supply]').forEach(r=>r.onclick=()=>openSupply(r.dataset.supply));
    root.querySelectorAll('.drug-row[data-id]').forEach(r=>r.onclick=()=>openMedicine(r.dataset.id));
  }
  function supplyRow(x,badge='BOLIVIA'){
    return `<div class="drug-row" data-supply="${esc2(x.id)}"><div><div class="marca">${esc2(x.marca||x.nombre||'Insumo')}<span class="supply-badge">${esc2(badge)}</span></div><div class="dci">${esc2(x.nombre||x.categoria||'')}</div></div><div class="dci">${esc2(x.categoria||'')}</div><div class="presentation">${esc2((x.presentaciones||[]).slice(0,2).join(' · ')||'Detalle en verificación')}</div><div class="lab">${esc2(x.proveedor_bolivia||x.fabricante||'Bolivia')}</div><div class="arrow">›</div></div>`;
  }
  function approachCard(x,kind){
    if(kind==='miss') return `<article class="approach-card"><div class="approach-top"><div><b>${esc2(x.tecnica||'MISS / tubular')}</b><span>${esc2(x.nombre||'')}</span></div></div><div class="approach-row"><strong>Sistema / producto</strong><span>${esc2((x.sistemas_confirmados||[]).join(' · ')||'Pendiente')}</span></div><div class="approach-row"><strong>Equipo relacionado</strong><span>${esc2((x.equipos_relacionados||[]).join(' · ')||'Pendiente')}</span></div><div class="approach-row"><strong>Proveedor</strong><span>${esc2((x.proveedores||[]).map(p=>p.nombre||p).join(' · ')||'Pendiente')}</span></div>${x.nota?`<div class="approach-note">${esc2(x.nota)}</div>`:''}</article>`;
    return `<article class="approach-card"><div class="approach-top"><div><b>${esc2(x.abordaje||'Abordaje intersomático')}</b><span>${esc2(x.nombre||'')}</span></div></div><div class="approach-row"><strong>Implantes</strong><span>${esc2((x.implantes_confirmados||[]).join(' · ')||'No verificados todavía')}</span></div><div class="approach-row"><strong>Proveedor</strong><span>${esc2((x.proveedores||[]).map(p=>p.nombre||p).join(' · ')||'Pendiente')}</span></div><div class="approach-row"><strong>Equipo / soporte</strong><span>${esc2((x.equipos_soporte||[]).join(' · ')||'Pendiente')}</span></div>${x.nota?`<div class="approach-note">${esc2(x.nota)}</div>`:''}</article>`;
  }

  function buildPools(){
    const implants=(typeof boliviaImplants==='function'?boliviaImplants():[]);
    const supplies=(typeof boliviaNonImplantSupplies==='function'?boliviaNonImplantSupplies():[]);
    const services=(typeof boliviaServices==='function'?boliviaServices():[]);
    const providers=(typeof boliviaProviders==='function'?boliviaProviders():[]);
    const spineImplants=implants.filter(isSpineItem);
    const neuroImplants=implants.filter(x=>!isSpineItem(x));
    const spineSupplies=supplies.filter(isSpineItem);
    const generalSupplies=supplies.filter(x=>!isSpineItem(x));
    const spineServices=services.filter(isSpineItem);
    const generalServices=services.filter(x=>!isSpineItem(x));
    const miss=(window.VCB_SPINE_MISS||[]);
    const approaches=(window.VCB_SPINE_APPROACHES||[]);
    return {implants,supplies,services,providers,spineImplants,neuroImplants,spineSupplies,generalSupplies,spineServices,generalServices,miss,approaches};
  }

  const tabs=[
    {id:'columna',label:'Cirugía de columna',aliases:['columna','cirugia de columna','cirugía de columna','alif','olif','llif','tlif','plif','miss','tubular','implantes de columna','cervical','lumbar']},
    {id:'neuroimplantes',label:'Implantes neuroquirúrgicos',aliases:['implantes neuroquirurgicos','implantes neuroquirúrgicos','craneal','dvp','dve','malla craneal','duramadre','neurocirugia','neurocirugía']},
    {id:'insumos',label:'Insumos y equipos',aliases:['insumos','equipos','hemostaticos','hemostáticos','gelfoam','surgicel','agujas']},
    {id:'soporte',label:'Soporte / alquiler',aliases:['soporte','alquiler','consignacion','consignación','equipamiento']},
    {id:'proveedores',label:'Proveedores Bolivia',aliases:['proveedores','proveedor','bolivia','distribuidores','empresas']}
  ];

  function tabLabel(id){return tabs.find(t=>t.id===id)?.label||id}
  function categoryEntries(pool){
    const out=[];
    pool.spineImplants.forEach(x=>out.push({tab:'columna',group:'Implantes de columna',kind:'supply',item:x}));
    pool.spineSupplies.forEach(x=>out.push({tab:'columna',group:'Equipos e insumos de columna',kind:'supply',item:x}));
    pool.spineServices.forEach(x=>out.push({tab:'columna',group:'Soporte de columna',kind:'supply',item:x}));
    pool.miss.forEach((x,i)=>out.push({tab:'columna',group:'MISS / tubular',kind:'miss',item:x,uid:'miss-'+i}));
    pool.approaches.forEach((x,i)=>out.push({tab:'columna',group:'ALIF / OLIF / LLIF / TLIF y abordajes',kind:'approach',item:x,uid:'approach-'+i}));
    pool.neuroImplants.forEach(x=>out.push({tab:'neuroimplantes',group:'Implantes neuroquirúrgicos',kind:'supply',item:x}));
    pool.generalSupplies.forEach(x=>out.push({tab:'insumos',group:x.categoria||'Insumos y equipos',kind:'supply',item:x}));
    pool.generalServices.forEach(x=>out.push({tab:'soporte',group:'Soporte / alquiler',kind:'supply',item:x}));
    pool.providers.forEach(x=>out.push({tab:'proveedores',group:'Proveedores Bolivia',kind:'supply',item:x}));
    return out;
  }

  function renderEntries(list,tab){
    if(!list.length)return `<div class="empty-state">No hay registros visibles en ${esc2(tabLabel(tab))}.</div>`;
    const groups={};for(const e of list)(groups[e.group]??=[]).push(e);
    return Object.entries(groups).map(([g,rows])=>`<section class="vcb-insumo-group"><h3>${esc2(g)} <small>${rows.length}</small></h3>${rows.some(r=>r.kind==='miss'||r.kind==='approach')?`<div class="approach-grid">${rows.filter(r=>r.kind==='miss'||r.kind==='approach').map(r=>approachCard(r.item,r.kind)).join('')}</div>`:''}${rows.some(r=>r.kind==='supply')?`<div class="drug-list">${rows.filter(r=>r.kind==='supply').map(r=>supplyRow(r.item,tab==='columna'?'COLUMNA':tab==='neuroimplantes'?'NEURO':'BOLIVIA')).join('')}</div>`:''}</section>`).join('');
  }

  function scoreEntry(e,q){
    const nq=n(q);if(!nq)return 0;
    const tab=tabs.find(t=>t.id===e.tab);const catText=n([tab?.label,...(tab?.aliases||[]),e.group].join(' '));
    const itemText=n(flat(e.item));
    if(catText===nq)return 5000;
    if(catText.includes(nq))return 4200;
    if(itemText.includes(nq))return 3600;
    const tokens=nq.split(/[^a-z0-9]+/).filter(Boolean);
    if(tokens.length&&tokens.every(t=>(catText+' '+itemText).split(/[^a-z0-9]+/).some(w=>w===t||w.startsWith(t))))return 2600;
    return 0;
  }

  let currentTab='columna';
  function renderModule(tab=currentTab){
    const panel=document.querySelector('#categorias');if(!panel)return;
    currentTab=tab;
    const pool=buildPools(),entries=categoryEntries(pool);
    const content=document.querySelector('#categoryContent');
    if(!content)return;
    document.querySelectorAll('.cat-tab').forEach(b=>b.classList.toggle('active',b.dataset.cat===tab));
    const list=entries.filter(e=>e.tab===tab);
    content.innerHTML=renderEntries(list,tab);bindRows(content);
    const meta=document.querySelector('#insumosGlobalMeta');if(meta)meta.textContent=`${entries.length} registros indexados en todo el módulo · ${list.length} en ${tabLabel(tab)}.`;
  }

  function installModule(){
    const nav=document.querySelector('.navbtn[data-panel="categorias"]');if(nav)nav.innerHTML='<span>▦</span>Insumos';
    const panel=document.querySelector('#categorias');if(!panel)return;
    const head=panel.querySelector('.page-head');if(head)head.innerHTML='<div class="eyebrow dark">CATÁLOGO LOCAL</div><h2>Insumos</h2><p>Busque insumos, implantes, cirugía de columna, equipos, soporte y proveedores de Bolivia. Los medicamentos permanecen en “Buscar medicamentos”.</p>';
    const tabbar=panel.querySelector('.category-tabs');if(tabbar)tabbar.innerHTML=tabs.map((t,i)=>`<button class="cat-tab ${i===0?'active':''}" data-cat="${t.id}">${t.id==='columna'?'↔':t.id==='neuroimplantes'?'◆':t.id==='insumos'?'◇':t.id==='soporte'?'🧰':'☎'} ${esc2(t.label)}</button>`).join('');
    let global=panel.querySelector('#insumosGlobalSearchWrap');
    if(!global){global=document.createElement('div');global.id='insumosGlobalSearchWrap';global.innerHTML='<div class="vcb-category-search vcb-insumos-global"><span>⌕</span><input id="insumosGlobalSearch" type="search" autocomplete="off" placeholder="Buscar en todos los insumos y categorías…"><button type="button" id="insumosGlobalClear" aria-label="Limpiar búsqueda">×</button></div><div id="insumosGlobalMeta" class="vcb-category-meta"></div><div id="insumosGlobalResults" class="vcb-category-results hidden"></div>';tabbar.insertAdjacentElement('afterend',global)}
    const input=global.querySelector('#insumosGlobalSearch'),clear=global.querySelector('#insumosGlobalClear'),results=global.querySelector('#insumosGlobalResults'),content=panel.querySelector('#categoryContent');
    function runSearch(){
      const q=input.value.trim();const pool=buildPools(),entries=categoryEntries(pool);const meta=global.querySelector('#insumosGlobalMeta');
      if(!q){results.classList.add('hidden');results.innerHTML='';content.classList.remove('hidden');renderModule(currentTab);return}
      const ranked=entries.map(e=>({e,s:scoreEntry(e,q)})).filter(x=>x.s>0).sort((a,b)=>b.s-a.s||n(a.e.group).localeCompare(n(b.e.group),'es'));
      const seen=new Set(),uniq=[];for(const r of ranked){const key=r.e.kind+':'+(r.e.item?.id||r.e.uid||n(flat(r.e.item)).slice(0,100))+':'+r.e.tab;if(seen.has(key))continue;seen.add(key);uniq.push(r.e)}
      content.classList.add('hidden');results.classList.remove('hidden');meta.textContent=`${uniq.length} resultado${uniq.length===1?'':'s'} para “${q}” en todo el módulo Insumos.`;
      results.innerHTML=uniq.length?uniq.slice(0,200).map(e=>`<div class="vcb-category-hit"><div class="vcb-category-hit-group">${esc2(tabLabel(e.tab))} · ${esc2(e.group)}</div>${e.kind==='supply'?supplyRow(e.item,e.tab==='columna'?'COLUMNA':e.tab==='neuroimplantes'?'NEURO':'BOLIVIA'):approachCard(e.item,e.kind)}</div>`).join(''):'<div class="empty-state">No se encontraron coincidencias en ninguna categoría de Insumos.</div>';
      bindRows(results);
    }
    input.addEventListener('input',runSearch);clear.onclick=()=>{input.value='';runSearch();input.focus()};
    tabbar.querySelectorAll('.cat-tab').forEach(b=>b.onclick=()=>{currentTab=b.dataset.cat;input.value='';runSearch();renderModule(currentTab)});
    window.renderCategories=function(tab='columna'){if(!tabs.some(t=>t.id===tab))tab='columna';currentTab=tab;renderModule(tab)};
    try{renderCategories=window.renderCategories}catch(_e){}
    runSearch();renderModule('columna');
  }

  if(!document.querySelector('#vcb0205Styles')){
    const st=document.createElement('style');st.id='vcb0205Styles';st.textContent=`.vcb-insumos-global{margin-top:14px}.vcb-insumo-group{margin:0 0 22px}.vcb-insumo-group h3{display:flex;align-items:center;gap:8px;margin:0 0 10px;color:#102742}.vcb-insumo-group h3 small{font-size:11px;background:#eef2f6;border-radius:999px;padding:3px 7px;color:#667587}@media(max-width:720px){#insumosGlobalSearchWrap{position:sticky;top:0;z-index:8;background:#f6f8fb;padding-top:4px}}`;document.head.appendChild(st)
  }

  installModule();
  const about=document.querySelector('#sincronizacion .about-card p b');if(about)about.innerHTML=about.innerHTML.replace(/Aplicación\s+0\.20\.\d+/,'Aplicación 0.20.5');
  window.VCB_FEATURE_PATCH_VERSION='0.20.5';
})();
