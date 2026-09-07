/* Vademécum Clínico Bolivia v0.20.13 · ajuste fino MAO-B/simpaticomiméticos */
(function(){
  const K=window.VCB_INTERACTION_KB;if(!K)return;
  K.groups=K.groups||{};K.sources=K.sources||{};K.class_rules=K.class_rules||[];K.meta=K.meta||{};
  const uniq=a=>[...new Set((a||[]).filter(Boolean))];
  const upsert=r=>{const i=K.class_rules.findIndex(x=>x.id===r.id);if(i>=0)K.class_rules[i]={...K.class_rules[i],...r};else K.class_rules.push(r)};

  K.sources.DM_RASAGILINE_2026={title:'DailyMed · Rasagiline · simpaticomiméticos y CYP1A2',url:'https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=7d070521-ea04-4483-bdb9-54a8859700df'};
  K.sources.DM_SAFINAMIDE={title:'DailyMed · Xadago (safinamida) · simpaticomiméticos y antagonistas dopaminérgicos',url:'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c4d65f28-983f-42b4-bb23-023ae0fe81b2'};
  K.sources.DM_SELEGILINE={title:'DailyMed · Emsam (selegilina) · simpaticomiméticos y pseudoefedrina',url:'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b891bd9f-fdb8-4862-89c5-ecdd700398a3'};

  K.groups.NONSELECTIVE_MAOI_FOR_PSEUDO=uniq(K.groups.MAOIs||[]);
  K.groups.MAOB_SELECTIVE_ALL=uniq([...(K.groups.MAOB_SELECTIVE||[]),'Selegilina','Rasagilina','Safinamida']);
  /* Pseudoefedrina ya tiene regla específica con cafeína; se excluye de la regla genérica para no duplicar alertas. */
  K.groups.SYSTEMIC_SYMPATHOMIMETICS=['Fenilefrina','Phenylephrine','Efedrina','Ephedrine','Anfetamina','Dextroanfetamina','Lisdexanfetamina','Metilfenidato'];

  const pseudoMai=K.class_rules.find(r=>r.id==='GLOBAL-PSEUDO-MAOI-02013');
  if(pseudoMai)pseudoMai.b='NONSELECTIVE_MAOI_FOR_PSEUDO';

  upsert({id:'GLOBAL-PSEUDO-MAOB-02013',a:'PSEUDOEPHEDRINE',b:'MAOB_SELECTIVE_ALL',nivel:'Moderada/Alta',resumen:'Los inhibidores selectivos de MAO-B pueden potenciar la respuesta a simpaticomiméticos. Se han descrito elevaciones importantes de presión arterial y crisis hipertensivas con algunos agentes de esta clase.',conducta:'Usar con mucha precaución o preferir un descongestionante alternativo. Si se combinan, monitorizar presión arterial y síntomas adrenérgicos; revisar la ficha del MAO-B específico.',mecanismo:'Potenciación farmacodinámica de catecolaminas. El grado de riesgo varía según el inhibidor MAO-B y la dosis.',source_key:'DM_RASAGILINE_2026',audit_verified:true});
  upsert({id:'GLOBAL-MCP-SAFINAMIDE-02013',a:'METOCLOPRAMIDE',b:'MAOB_SELECTIVE_ALL',nivel:'Alta',resumen:'Los antagonistas dopaminérgicos como metoclopramida pueden disminuir la eficacia de tratamientos antiparkinsonianos que aumentan la señal dopaminérgica; la ficha de safinamida advierte específicamente que pueden exacerbar síntomas de Parkinson.',conducta:'EVITAR metoclopramida cuando exista una alternativa antiemética apropiada; si se administró, vigilar empeoramiento motor y reevaluar el tratamiento.',mecanismo:'Antagonismo dopaminérgico central frente a tratamiento antiparkinsoniano.',source_key:'DM_SAFINAMIDE',audit_verified:true});

  K.meta.maob_sympathomimetic_nuance=true;
  K.meta.pseudo_caffeine_duplicate_removed=true;
  K.meta.class_rule_count=K.class_rules.length;
})();