/* Vademécum Clínico Bolivia v0.20.8 · auditoría de interacciones de alto riesgo */
(function(){
  const K=window.VCB_INTERACTION_KB;
  if(!K||!Array.isArray(K.class_rules)||!Array.isArray(K.exact_rules))return;
  K.groups=K.groups||{};
  K.sources=K.sources||{};
  const uniq=a=>[...new Set((a||[]).filter(Boolean))];
  const addGroup=(name,items)=>{K.groups[name]=uniq([...(K.groups[name]||[]),...items])};
  const removeRule=id=>{K.class_rules=K.class_rules.filter(r=>r.id!==id);K.exact_rules=K.exact_rules.filter(r=>r.id!==id)};
  const addClass=r=>{if(!K.class_rules.some(x=>x.id===r.id))K.class_rules.push(r)};
  const addExact=r=>{if(!K.exact_rules.some(x=>x.id===r.id))K.exact_rules.push(r)};

  K.sources.FDA_METOCLOPRAMIDE_2026={title:'FDA 2026 · Reglan (metoclopramida) · interacciones farmacológicas',url:'https://www.accessdata.fda.gov/drugsatfda_docs/label/2026/017854s071lbl.pdf'};
  K.sources.FDA_SINEMET_2026={title:'FDA 2026 · Sinemet (carbidopa/levodopa) · interacciones farmacológicas',url:'https://www.accessdata.fda.gov/drugsatfda_docs/label/2026/017555s076lbl.pdf'};
  K.sources.FDA_APIXABAN_2025={title:'FDA 2025 · Apixabán · fármacos que aumentan el riesgo hemorrágico',url:'https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/220073s000lbl.pdf'};
  K.sources.FDA_OPIOID_SEROTONIN={title:'FDA · opioides y riesgo de síndrome serotoninérgico con fármacos serotoninérgicos',url:'https://www.fda.gov/media/96472/download'};

  addGroup('DOPAMINERGICS',["Levodopa","Apomorfina","Bromocriptina","Cabergolina","Pramipexol","Ropinirol","Rotigotina"]);
  addGroup('D2_ANTAGONISTS',["Haloperidol","Clorpromazina","Levomepromazina","Flufenazina","Trifluoperazina","Risperidona","Olanzapina","Quetiapina","Ziprasidona","Pimozida","Proclorperazina"]);
  addGroup('MCP_CYP2D6_INHIBITORS',["Quinidina","Bupropión","Bupropion","Fluoxetina","Paroxetina"]);
  addGroup('NEUROMUSCULAR_BLOCKERS_PCHE',["Succinilcolina","Succinylcholine","Mivacurio","Mivacurium"]);
  addGroup('IRON_SALTS',["Sulfato ferroso","Fumarato ferroso","Gluconato ferroso","Hierro","Sales de hierro"]);
  addGroup('DOPAMINE_DEPLETING',["Reserpina","Tetrabenazina"]);
  addGroup('MAOB_SELECTIVE',["Selegilina","Rasagilina"]);
  addGroup('SEROTONERGIC_OPIOIDS',["Tramadol","Tapentadol","Fentanilo","Metadona","Meperidina","Petidina"]);
  addGroup('MCP_CNS_DEPRESSANTS',[...(K.groups.OPIOIDS||[]),...(K.groups.BENZOS||[]),...(K.groups.Z_DRUGS||[]),...(K.groups.SEDATING_ANTIHISTAMINES||[])]);

  ['D2-01','LEV-01'].forEach(removeRule);
  const ser4=K.class_rules.find(r=>r.id==='SER-04');if(ser4){ser4.b='SEROTONERGIC_OPIOIDS';ser4.source_key='FDA_OPIOID_SEROTONIN'}
  const ser7=K.class_rules.find(r=>r.id==='SER-07');if(ser7){ser7.b='SEROTONERGIC_OPIOIDS';ser7.source_key='FDA_OPIOID_SEROTONIN'}
  const nsaid=K.class_rules.find(r=>r.id==='NSAID-01');if(nsaid)nsaid.source_key='FDA_NSAID';
  const apixabanRules=['BLEED-01','BLEED-02','BLEED-03','BLEED-05','BLEED-06'];
  K.class_rules.forEach(r=>{if(apixabanRules.includes(r.id))r.source_key='FDA_APIXABAN_2025'});
  ['RATE-01','AED-02','ABS-01','ABS-02','ABS-03','GLU-02','TENDON-01','LITH-02','LITH-03'].forEach(id=>{const r=K.class_rules.find(x=>x.id===id);if(r)r.source_key=''});

  addClass({id:'MCP-DOPA-0208',a:'METOCLOPRAMIDE',b:'DOPAMINERGICS',nivel:'Alta',resumen:'Los efectos dopaminérgicos son opuestos. Puede disminuir el control de la enfermedad de Parkinson y empeorar síntomas parkinsonianos; con levodopa puede reducirse su efectividad clínica.',conducta:'Evitar el uso concomitante cuando exista alternativa. Si ya se administraron, vigilar empeoramiento de rigidez, bradicinesia, temblor u otros síntomas parkinsonianos y reevaluar el antiemético.',mecanismo:'Antagonismo dopaminérgico D2 por metoclopramida frente a levodopa o agonistas dopaminérgicos.',source_key:'FDA_METOCLOPRAMIDE_2026',audit_verified:true});
  addClass({id:'MCP-AP-0208',a:'METOCLOPRAMIDE',b:'ANTIPSYCHOTICS',nivel:'Alta',resumen:'Puede aumentar la frecuencia y gravedad de discinesia tardía, otros síntomas extrapiramidales y síndrome neuroléptico maligno.',conducta:'Evitar el uso concomitante salvo que no exista una alternativa adecuada y exista una justificación clínica explícita.',mecanismo:'Bloqueo dopaminérgico central aditivo.',source_key:'FDA_METOCLOPRAMIDE_2026',audit_verified:true});
  addClass({id:'MCP-MAOI-0208',a:'METOCLOPRAMIDE',b:'MAOIs',nivel:'Alta',resumen:'Puede aumentar el riesgo de hipertensión y otras reacciones adversas importantes.',conducta:'Evitar el uso concomitante.',mecanismo:'Interacción farmacodinámica con inhibición de monoaminooxidasa.',source_key:'FDA_METOCLOPRAMIDE_2026',audit_verified:true});
  addClass({id:'MCP-CYP2D6-0208',a:'METOCLOPRAMIDE',b:'MCP_CYP2D6_INHIBITORS',nivel:'Moderada',resumen:'Puede aumentar la concentración de metoclopramida y el riesgo de síntomas extrapiramidales.',conducta:'Revisar la necesidad de la combinación y considerar reducción de dosis de metoclopramida según ficha técnica; vigilar efectos extrapiramidales.',mecanismo:'Inhibición de CYP2D6 con aumento de exposición a metoclopramida.',source_key:'FDA_METOCLOPRAMIDE_2026',audit_verified:true});
  addClass({id:'MCP-CNS-0208',a:'METOCLOPRAMIDE',b:'MCP_CNS_DEPRESSANTS',nivel:'Moderada/Alta',resumen:'Puede aumentar la depresión del sistema nervioso central, con mayor somnolencia y deterioro psicomotor; el riesgo puede ser mayor con opioides y sedantes.',conducta:'Evitar una de las exposiciones cuando sea posible o utilizar la menor exposición necesaria con vigilancia clínica.',mecanismo:'Efectos depresores del SNC aditivos.',source_key:'FDA_METOCLOPRAMIDE_2026',audit_verified:true});
  addClass({id:'MCP-NMB-0208',a:'METOCLOPRAMIDE',b:'NEUROMUSCULAR_BLOCKERS_PCHE',nivel:'Moderada',resumen:'Puede prolongar el bloqueo neuromuscular con succinilcolina o mivacurio.',conducta:'Monitorizar signos de bloqueo neuromuscular prolongado y recuperación respiratoria.',mecanismo:'Inhibición de la colinesterasa plasmática por metoclopramida.',source_key:'FDA_METOCLOPRAMIDE_2026',audit_verified:true});
  addClass({id:'MCP-DIG-0208',a:'METOCLOPRAMIDE',b:'DIGOXIN',nivel:'Moderada',resumen:'La metoclopramida puede disminuir la absorción de digoxina y reducir su efecto.',conducta:'Monitorizar respuesta clínica y concentraciones de digoxina cuando corresponda.',mecanismo:'Cambio de la motilidad gastrointestinal y de la absorción.',source_key:'FDA_METOCLOPRAMIDE_2026',audit_verified:true});
  addClass({id:'LEV-D2-0208',a:'LEVODOPA',b:'D2_ANTAGONISTS',nivel:'Moderada',resumen:'Los antagonistas dopaminérgicos D2 pueden disminuir el efecto antiparkinsoniano de levodopa y empeorar los síntomas motores.',conducta:'Monitorizar pérdida de respuesta antiparkinsoniana y reevaluar el antagonista dopaminérgico si aparecen síntomas.',mecanismo:'Antagonismo farmacodinámico dopaminérgico.',source_key:'FDA_SINEMET_2026',audit_verified:true});
  addClass({id:'LEV-IRON-0208',a:'LEVODOPA',b:'IRON_SALTS',nivel:'Moderada',resumen:'Las sales de hierro pueden formar quelatos con levodopa/carbidopa y reducir su biodisponibilidad.',conducta:'Administrar con cautela y monitorizar empeoramiento de síntomas; considerar separación de tomas según la ficha del producto.',mecanismo:'Quelación gastrointestinal y reducción de la absorción.',source_key:'FDA_SINEMET_2026',audit_verified:true});
  addClass({id:'LEV-DEPLETE-0208',a:'LEVODOPA',b:'DOPAMINE_DEPLETING',nivel:'Alta',resumen:'Puede disminuir o revertir la respuesta antiparkinsoniana y empeorar los síntomas motores.',conducta:'Evitar la asociación cuando sea posible; la ficha de carbidopa/levodopa no recomienda el uso conjunto con agentes que depletan dopamina.',mecanismo:'Reducción de depósitos monoaminérgicos frente a una terapia dopaminérgica.',source_key:'FDA_SINEMET_2026',audit_verified:true});
  addClass({id:'LEV-MAOI-0208',a:'LEVODOPA',b:'MAOIs',nivel:'Contraindicada',resumen:'Los inhibidores no selectivos de MAO con carbidopa/levodopa pueden causar reacciones graves, incluida hipertensión.',conducta:'No combinar. Respetar el periodo de suspensión indicado en la ficha técnica antes de iniciar carbidopa/levodopa.',mecanismo:'Exceso de actividad monoaminérgica por inhibición no selectiva de MAO.',source_key:'FDA_SINEMET_2026',audit_verified:true});
  addClass({id:'LEV-MAOB-0208',a:'LEVODOPA',b:'MAOB_SELECTIVE',nivel:'Moderada',resumen:'La combinación puede asociarse con hipotensión ortostática importante en algunos pacientes.',conducta:'Monitorizar presión arterial y síntomas ortostáticos; usar las dosis recomendadas del inhibidor selectivo de MAO-B.',mecanismo:'Potenciación dopaminérgica y efectos hemodinámicos.',source_key:'FDA_SINEMET_2026',audit_verified:true});
  addExact({id:'LEV-PHT-0208',a:'Levodopa',b:'Fenitoína',nivel:'Moderada',resumen:'La fenitoína puede reducir o revertir el beneficio terapéutico de levodopa en algunos pacientes.',conducta:'Monitorizar pérdida de respuesta antiparkinsoniana y reevaluar el esquema si ocurre.',mecanismo:'Interacción farmacodinámica que puede reducir la respuesta a levodopa.',source_key:'FDA_SINEMET_2026',audit_verified:true});
  addExact({id:'LEV-ISONIAZID-0208',a:'Levodopa',b:'Isoniazida',nivel:'Moderada',resumen:'La isoniazida puede reducir la efectividad de levodopa.',conducta:'Monitorizar empeoramiento de síntomas parkinsonianos y ajustar la estrategia clínica si es necesario.',mecanismo:'Interferencia con la respuesta dopaminérgica.',source_key:'FDA_SINEMET_2026',audit_verified:true});

  K.version='0.20.8';K.updated_at='2026-09-06';K.meta=K.meta||{};K.meta.audit_version='0.20.8';K.meta.audit_scope='Reglas actuales revisadas con foco en interacciones de alto riesgo y asociaciones por ingredientes; se añadieron reglas auditadas de metoclopramida/levodopa y se redujeron generalizaciones serotoninérgicas.';K.meta.association_ingredient_expansion=true;K.meta.no_safe_claim_on_missing_rule=true;K.meta.audit_regression_cases=[['Metoclopramida','Levodopa','EVITAR'],['Metoclopramida','Pramipexol','EVITAR'],['Metoclopramida','Haloperidol','EVITAR'],['Metoclopramida','Fluoxetina','MONITORIZAR'],['Levodopa + Carbidopa','Sulfato ferroso','MONITORIZAR'],['Levodopa','Fenelzina','NO COMBINAR']];
  window.VCB_INTERACTION_AUDIT_VERSION='0.20.8';
})();
