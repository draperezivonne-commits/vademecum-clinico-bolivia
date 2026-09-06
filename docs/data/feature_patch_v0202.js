/* Vademécum Clínico Bolivia v0.20.2 · buscador de insumos + directorio Mega Vit */
(function(){
  const n=s=>(s||'').toString().normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
  const supplies=window.VCB_SUPPLIES||[];
  if(!supplies.some(x=>x.id==='VCB0202-PROV-MEGAVIT')) supplies.push({
    id:'VCB0202-PROV-MEGAVIT',
    tipo_registro:'proveedor',grupo_catalogo:'proveedor',
    marca:'Mega Vit S.R.L.',
    nombre:'Distribuidor boliviano de Mason Vitamins, Sanitas-Chemo Pharma y Ballena Azul',
    categoria:'Vitaminas, suplementos alimenticios y productos farmacéuticos',
    familias:['Mason Vitamins','Sanitas-Chemo Pharma','Ballena Azul'],
    presentaciones:['Distribución nacional desde Bolivia','Productos con registro sanitario boliviano según información corporativa oficial'],
    aliases:['Megavit','MegaVit','Mega Vit Bolivia','Mason Vitamins Bolivia','vitaminas','suplementos'],
    verificacion_bolivia:true,directorio_visible:true,visible_publico_bolivia:true,
    nivel_evidencia:'catalogo_oficial_distribuidor_bolivia',
    fuente_bolivia:'https://masonvitamins.com.bo/quienes-somos/',
    fecha_verificacion_bolivia:'2026-09-06',
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
  function supplyRow(o){
    if(o.kind==='medicine') return drugRow(o.item,isCombined(o.item));
    const x=o.item;
    return `<div class="drug-row" data-supply="${esc(x.id)}"><div><div class="marca">${esc(x.marca)}<span class="supply-badge">BOLIVIA</span></div><div class="dci">${esc(x.nombre)}</div></div><div class="dci">${esc(x.categoria)}</div><div class="presentation">${esc((x.presentaciones||[]).slice(0,2).join(' · ')||'Detalle en verificación')}</div><div class="lab">${esc(x.proveedor_bolivia||x.fabricante||'Bolivia')}</div><div class="arrow">›</div></div>`;
  }
  function bindRows(){
    $$('.drug-row[data-supply]').forEach(r=>r.onclick=()=>openSupply(r.dataset.supply));
    $$('.drug-row[data-id]').forEach(r=>r.onclick=()=>openMedicine(r.dataset.id));
  }
  function renderInsumos(){
    currentCategoryTab='insumos';
    $$('.cat-tab').forEach(b=>b.classList.toggle('active',b.dataset.cat==='insumos'));
    const el=$('#categoryContent');
    let groups={};
    boliviaNonImplantSupplies().forEach(x=>(groups[x.categoria]??=[]).push({kind:'supply',item:x}));
    const proc=procedureCatalogItems();if(proc.length)groups['Fármacos de procedimiento']=proc.map(x=>({kind:'medicine',item:x}));
    const entries=Object.entries(groups).filter(([,v])=>v.length).sort((a,b)=>a[0].localeCompare(b[0],'es'));
    const all=entries.flatMap(([,v])=>v);
    el.innerHTML=`<div class="provider-directory-head"><b>Insumos y equipos · Bolivia</b><span>Busque por nombre, marca, categoría, fabricante, proveedor o presentación.</span></div><div class="vcb-supply-search"><span>⌕</span><input id="supplyCategorySearch" type="search" autocomplete="off" placeholder="Buscar insumo, equipo, fabricante o proveedor…"><button id="supplyCategoryClear" aria-label="Limpiar">×</button></div><div id="supplySearchMeta" class="vcb-supply-meta">${all.length} registros disponibles</div><div id="supplyCategoryBody"></div>`;
    const body=$('#supplyCategoryBody'),input=$('#supplyCategorySearch'),meta=$('#supplySearchMeta');
    function showGroup(k){
      const a=groups[k]||[];
      body.innerHTML=`<div class="category-grid"><div class="category-menu">${entries.map(([g,v])=>`<button class="cat-menu-btn ${g===k?'active':''}" data-group="${esc(g)}">${esc(g)} <span>${v.length}</span></button>`).join('')}</div><div class="category-items"><h3>${esc(k)}</h3><div class="drug-list">${a.map(supplyRow).join('')}</div></div></div>`;
      $$('.cat-menu-btn').forEach(b=>b.onclick=()=>showGroup(b.dataset.group));bindRows();
    }
    function doSearch(){
      const q=n(input.value);
      if(!q){meta.textContent=`${all.length} registros disponibles`;if(entries[0])showGroup(entries[0][0]);else body.innerHTML='<div class="empty-state">No hay insumos cargados.</div>';return}
      const hits=all.filter(o=>o.kind==='supply'?supplySearchScore(o.item,q)>0:searchScore(o.item,q)>0).sort((a,b)=>{
        const sa=a.kind==='supply'?supplySearchScore(a.item,q):searchScore(a.item,q),sb=b.kind==='supply'?supplySearchScore(b.item,q):searchScore(b.item,q);return sb-sa||n(a.item.marca||a.item.dci).localeCompare(n(b.item.marca||b.item.dci),'es')
      });
      meta.textContent=`${hits.length} resultado${hits.length===1?'':'s'} para “${input.value.trim()}”`;
      body.innerHTML=hits.length?`<div class="category-items vcb-supply-results"><div class="drug-list">${hits.map(supplyRow).join('')}</div></div>`:`<div class="empty-state">No se encontraron insumos o equipos con ese término.</div>`;
      bindRows();
    }
    input.addEventListener('input',doSearch);$('#supplyCategoryClear').onclick=()=>{input.value='';doSearch();input.focus()};doSearch();
  }
  window.renderCategories=function(tab='especialidades'){if(tab==='insumos')return renderInsumos();return originalRender(tab)};

  if(!document.querySelector('#vcb0202Styles')){
    const st=document.createElement('style');st.id='vcb0202Styles';st.textContent=`.vcb-supply-search{display:flex;align-items:center;gap:10px;background:#fff;border:1px solid #ccd5df;border-radius:14px;padding:10px 12px;margin:0 0 8px;box-shadow:0 5px 18px rgba(16,39,66,.06)}.vcb-supply-search span{font-size:22px;color:#102742}.vcb-supply-search input{border:0;outline:0;flex:1;min-width:0;font:inherit;font-size:16px;background:transparent;color:#102742}.vcb-supply-search button{border:0;background:#eef2f6;color:#102742;width:32px;height:32px;border-radius:50%;font-size:20px;cursor:pointer}.vcb-supply-meta{font-size:13px;color:#657487;margin:0 0 16px}.vcb-supply-results{width:100%}.empty-state{padding:24px;border:1px dashed #c7d0da;border-radius:14px;background:#fff;color:#667587;text-align:center}@media(max-width:720px){.vcb-supply-search{position:sticky;top:0;z-index:5}.vcb-supply-search input{font-size:16px}}`;
    document.head.appendChild(st);
  }
  const about=document.querySelector('#sincronizacion .about-card p b');if(about)about.innerHTML=about.innerHTML.replace('Aplicación 0.20.1','Aplicación 0.20.2');
  window.VCB_FEATURE_PATCH_VERSION='0.20.2';
})();
