/* Vademécum Clínico Bolivia v0.20.9 · seguridad de interacciones antimigrañosas */
(function(){
  const K=window.VCB_INTERACTION_KB;if(!K||!Array.isArray(K.class_rules))return;
  K.groups=K.groups||{};K.sources=K.sources||{};
  const uniq=a=>[...new Set((a||[]).filter(Boolean))];
  const addGroup=(name,items)=>{K.groups[name]=uniq([...(K.groups[name]||[]),...items])};
  const addClass=r=>{if(!K.class_rules.some(x=>x.id===r.id))K.class_rules.push(r)};
  K.sources.FDA_TREXIMET_2024={title:'FDA 2024 · TREXIMET (sumatriptán/naproxeno) · contraindicaciones e interacciones',url:'https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/021926s019lbl.pdf'};
  addGroup('TRIPTANS',['Sumatriptán','Rizatriptán','Zolmitriptán','Eletriptán','Naratriptán','Almotriptán','Frovatriptán']);
  addGroup('ERGOT_MIGRAINE',['Ergotamina','Dihidroergotamina','Methysergide','Metisergida']);
  addGroup('NSAIDS',['Naproxeno sódico']);
  addClass({id:'MIG-TRIPTAN-ERGOT-0209',a:'TRIPTANS',b:'ERGOT_MIGRAINE',nivel:'Contraindicada',resumen:'Los triptanes y los derivados ergotamínicos pueden producir efectos vasoespásticos aditivos.',conducta:'No administrar dentro de las 24 horas uno del otro. Revisar el intervalo exacto y las contraindicaciones cardiovasculares del producto.',mecanismo:'Vasoconstricción/vasoespasmo aditivo por agonismo serotoninérgico vascular.',source_key:'FDA_TREXIMET_2024',audit_verified:true});
  addClass({id:'MIG-TRIPTAN-TRIPTAN-0209',a:'TRIPTANS',b:'TRIPTANS',nivel:'Contraindicada',resumen:'El uso de dos agonistas 5-HT1 (triptanes) dentro de 24 horas puede producir efectos vasoespásticos aditivos.',conducta:'No combinar dos triptanes dentro de las 24 horas.',mecanismo:'Efectos vasoconstrictores aditivos de agonistas 5-HT1.',source_key:'FDA_TREXIMET_2024',same_group:true,audit_verified:true});
  K.version='0.20.9';K.updated_at='2026-09-06';K.meta=K.meta||{};K.meta.migraine_rules_version='0.20.9';K.meta.migraine_catalog_ingredient_safety=true;
  window.VCB_INTERACTION_MIGRAINE_VERSION='0.20.9';
})();
