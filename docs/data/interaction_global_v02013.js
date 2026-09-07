/* Vademécum Clínico Bolivia v0.20.13 · ampliación global FDA/openFDA orientada a seguridad */
(function(){
  const K=window.VCB_INTERACTION_KB;
  if(!K||!Array.isArray(K.class_rules)||!Array.isArray(K.exact_rules))return;
  K.groups=K.groups||{};K.sources=K.sources||{};K.meta=K.meta||{};
  const uniq=a=>[...new Set((a||[]).filter(Boolean))];
  const addGroup=(name,items)=>{K.groups[name]=uniq([...(K.groups[name]||[]),...items])};
  const upsertClass=r=>{const i=K.class_rules.findIndex(x=>x.id===r.id);if(i>=0)K.class_rules[i]={...K.class_rules[i],...r};else K.class_rules.push(r)};
  const upsertExact=r=>{const i=K.exact_rules.findIndex(x=>x.id===r.id);if(i>=0)K.exact_rules[i]={...K.exact_rules[i],...r};else K.exact_rules.push(r)};

  K.sources.DM_PSEUDOEPHEDRINE_2026={title:'DailyMed · Pseudoephedrine HCl · MAOI y advertencias cardiovasculares',url:'https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=0a2672f0-4e6f-48c9-8571-2d09f06253d7'};
  K.sources.DM_PSEUDO_COMBO={title:'DailyMed · desloratadina/pseudoefedrina · MAOI, beta-bloqueantes y digitalis',url:'https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=c7230a68-a3ac-4dce-9e72-6e21f0b25f45'};
  K.sources.AHA_HTN_2025={title:'AHA/ACC 2025 · cafeína y descongestionantes como factores que pueden elevar la presión arterial',url:'https://www.ahajournals.org/doi/full/10.1161/CIR.0000000000001356'};
  K.sources.DM_CLOPIDOGREL_2026={title:'DailyMed · Clopidogrel · AINE, opioides, warfarina, ISRS/IRSN',url:'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0d010775-1160-4b2e-a928-563a02edd191'};
  K.sources.DM_TICAGRELOR_2026={title:'DailyMed · Ticagrelor · CYP3A, opioides, estatinas y digoxina',url:'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=40bb0fb0-2275-4df7-e063-6394a90ade2e'};
  K.sources.FDA_IBUPROFEN_ASPIRIN={title:'FDA · ibuprofeno puede interferir con el efecto antiagregante de aspirina',url:'https://www.fda.gov/drugs/safe-use-aspirin/information-about-taking-ibuprofen-and-aspirin-together'};
  K.sources.DM_CIPROFLOXACIN_2026={title:'DailyMed · Ciprofloxacin · cafeína, clozapina, duloxetina, sildenafil, zolpidem y AINE',url:'https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=1057be77-00bb-4839-be3d-c8e11ae531a2&type=display'};
  K.sources.OPENFDA_LABEL_API={title:'openFDA · Drug Product Labeling API · campo drug_interactions',url:'https://open.fda.gov/apis/drug/label/how-to-use-the-endpoint/'};

  addGroup('DOPAMINERGICS',['Carbidopa + Levodopa','Levodopa + Carbidopa','Benserazida + Levodopa','Levodopa + Benserazida']);
  addGroup('CAFFEINE',['Cafeína','Caffeine','Citrato de cafeína','Cafeína anhidra']);
  addGroup('PSEUDOEPHEDRINE',['Pseudoefedrina','Pseudoephedrine','Pseudoefedrina HCl','Pseudoephedrine HCl','Pseudoefedrina sulfato']);
  addGroup('SYSTEMIC_SYMPATHOMIMETICS',['Pseudoefedrina','Pseudoephedrine','Fenilefrina','Phenylephrine','Efedrina','Ephedrine','Anfetamina','Dextroanfetamina','Lisdexanfetamina','Metilfenidato']);
  addGroup('MAOI_ALL',[...(K.groups.MAOIs||[]),...(K.groups.MAOB_SELECTIVE||[]),'Selegilina','Rasagilina','Safinamida']);
  addGroup('ORAL_P2Y12',['Clopidogrel','Prasugrel','Ticagrelor']);
  addGroup('TICAGRELOR',['Ticagrelor']);
  addGroup('CLOPIDOGREL',['Clopidogrel']);
  addGroup('IBUPROFEN_GROUP',['Ibuprofeno','Ibuprofen','Dexibuprofeno']);
  addGroup('CIPROFLOXACIN_GROUP',['Ciprofloxacino','Ciprofloxacin']);
  addGroup('DULOXETINE_GROUP',['Duloxetina','Duloxetine']);
  addGroup('ZOLPIDEM_GROUP',['Zolpidem']);
  addGroup('SILDENAFIL_GROUP',['Sildenafilo','Sildenafil']);
  addGroup('CLOZAPINE',['Clozapina','Clozapine']);
  addGroup('ANTIPLATELETS',['Ticlopidina','Dipiridamol','Cangrelor']);
  addGroup('NSAIDS',['Flurbiprofeno','Etodolaco','Sulindaco','Nabumetona','Ácido mefenámico','Mefenamato','Lornoxicam','Tenoxicam','Dexibuprofeno']);

  /* Asegurar que metoclopramida + tratamiento dopaminérgico se active y conserve la advertencia FDA. */
  upsertClass({id:'MCP-DOPA-0208',a:'METOCLOPRAMIDE',b:'DOPAMINERGICS',nivel:'Alta',resumen:'Metoclopramida antagoniza el efecto de levodopa y agonistas dopaminérgicos. Puede disminuir el control de la enfermedad de Parkinson y empeorar rigidez, bradicinesia, temblor u otros síntomas parkinsonianos.',conducta:'EVITAR el uso concomitante cuando exista alternativa. Preferir un antiemético sin antagonismo dopaminérgico según el contexto clínico y vigilar empeoramiento motor si ya se administró.',mecanismo:'Antagonismo dopaminérgico D2 por metoclopramida frente a levodopa/agonistas dopaminérgicos.',source_key:'FDA_METOCLOPRAMIDE_2026',audit_verified:true});

  upsertClass({id:'GLOBAL-PSEUDO-MAOI-02013',a:'PSEUDOEPHEDRINE',b:'MAOI_ALL',nivel:'Contraindicada',resumen:'Pseudoefedrina con inhibidores de MAO puede potenciar de forma peligrosa los efectos simpaticomiméticos, incluida hipertensión grave.',conducta:'NO COMBINAR. No usar pseudoefedrina durante tratamiento con IMAO ni durante las 2 semanas posteriores a su suspensión.',mecanismo:'Potenciación de catecolaminas y respuesta vascular simpática.',source_key:'DM_PSEUDOEPHEDRINE_2026',audit_verified:true});
  upsertClass({id:'GLOBAL-PSEUDO-CAFFEINE-02013',a:'PSEUDOEPHEDRINE',b:'CAFFEINE',nivel:'Moderada',resumen:'La combinación puede aumentar estimulación adrenérgica: palpitaciones, nerviosismo, temblor, insomnio y elevación de frecuencia cardiaca o presión arterial, especialmente con dosis altas o enfermedad cardiovascular.',conducta:'MONITORIZAR presión arterial, pulso y síntomas; limitar cafeína y evitar la asociación en pacientes con hipertensión grave/no controlada o marcada sensibilidad a estimulantes.',mecanismo:'Efectos estimulantes y cardiovasculares farmacodinámicamente aditivos. Esta alerta es una inferencia de clase respaldada por los efectos cardiovasculares conocidos de cafeína y descongestionantes simpaticomiméticos.',source_key:'AHA_HTN_2025',audit_verified:true,evidence_type:'pharmacodynamic_inference'});
  upsertClass({id:'GLOBAL-PSEUDO-BB-02013',a:'PSEUDOEPHEDRINE',b:'BETA_BLOCKERS',nivel:'Moderada',resumen:'Los simpaticomiméticos como pseudoefedrina pueden reducir el efecto antihipertensivo de beta-bloqueantes y favorecer elevación de presión arterial.',conducta:'Usar con precaución y monitorizar presión arterial y frecuencia cardiaca; considerar un descongestionante alternativo en pacientes de mayor riesgo.',mecanismo:'Vasoconstricción simpaticomimética que puede oponerse al efecto antihipertensivo.',source_key:'DM_PSEUDO_COMBO',audit_verified:true});
  upsertClass({id:'GLOBAL-PSEUDO-DIG-02013',a:'PSEUDOEPHEDRINE',b:'DIGOXIN',nivel:'Moderada',resumen:'Pseudoefedrina con digitalis/digoxina puede aumentar la actividad de marcapasos ectópicos y favorecer arritmias en pacientes susceptibles.',conducta:'Usar con cautela; vigilar palpitaciones, frecuencia cardiaca y ECG si el contexto clínico lo justifica.',mecanismo:'Estimulación adrenérgica sobre un miocardio sensibilizado por digitálicos.',source_key:'DM_PSEUDO_COMBO',audit_verified:true});
  upsertClass({id:'GLOBAL-CAFFEINE-SYMP-02013',a:'CAFFEINE',b:'SYSTEMIC_SYMPATHOMIMETICS',nivel:'Moderada',resumen:'La combinación de cafeína con un simpaticomimético sistémico puede intensificar nerviosismo, insomnio, palpitaciones y aumentos de presión arterial/frecuencia cardiaca.',conducta:'MONITORIZAR y reducir carga estimulante, sobre todo en hipertensión, arritmias, cardiopatía o dosis altas de cafeína.',mecanismo:'Estimulación cardiovascular y del SNC aditiva.',source_key:'AHA_HTN_2025',audit_verified:true,evidence_type:'pharmacodynamic_inference'});

  /* Reforzar antiagregantes + AINE: la regla existía, pero se amplía el grupo y la evidencia. */
  upsertClass({id:'BLEED-04',a:'ANTIPLATELETS',b:'NSAIDS',nivel:'Moderada/Alta',resumen:'Los AINE junto con antiagregantes aumentan el riesgo de sangrado, especialmente gastrointestinal. Con aspirina cardioprotectora, algunos AINE además pueden interferir con su efecto antiagregante.',conducta:'EVITAR AINE sistémico si existe una alternativa razonable; si es necesario, usar la menor dosis/tiempo posible, vigilar sangrado y valorar gastroprotección según riesgo. Revisar específicamente la interacción aspirina–ibuprofeno.',mecanismo:'Lesión gastrointestinal y alteración de hemostasia/función plaquetaria por mecanismos aditivos.',source_key:'DM_CLOPIDOGREL_2026',audit_verified:true});
  upsertExact({id:'GLOBAL-ASA-IBU-02013',a:'Ácido acetilsalicílico',b:'Ibuprofeno',nivel:'Moderada/Alta',resumen:'Ibuprofeno puede interferir con el efecto antiagregante de aspirina a dosis bajas y, además, aumentar el riesgo gastrointestinal/hemorrágico.',conducta:'Si la aspirina se usa para cardioprotección, preferir un analgésico que no interfiera con su efecto cuando sea posible. Si se requiere ibuprofeno, revisar cuidadosamente el horario de administración y el tipo de formulación de aspirina.',mecanismo:'Competencia reversible de ibuprofeno en COX-1 que puede impedir la acetilación irreversible por aspirina, además de toxicidad AINE aditiva.',source_key:'FDA_IBUPROFEN_ASPIRIN',audit_verified:true});
  upsertExact({id:'GLOBAL-ASPIRIN-IBU-02013',a:'Aspirina',b:'Ibuprofeno',nivel:'Moderada/Alta',resumen:'Ibuprofeno puede atenuar el efecto antiagregante de aspirina cardioprotectora y aumentar el riesgo de efectos gastrointestinales.',conducta:'Preferir alternativa cuando sea posible; si deben coexistir, revisar horario/formulación y riesgo hemorrágico.',mecanismo:'Interferencia farmacodinámica sobre COX-1 + toxicidad gastrointestinal aditiva.',source_key:'FDA_IBUPROFEN_ASPIRIN',audit_verified:true});

  upsertClass({id:'GLOBAL-P2Y12-OPIOID-02013',a:'ORAL_P2Y12',b:'OPIOIDS',nivel:'Moderada',resumen:'Los opioides pueden retrasar y reducir la absorción de inhibidores orales P2Y12 como clopidogrel o ticagrelor, lo que puede retrasar el inicio del efecto antiagregante en síndrome coronario agudo.',conducta:'En un contexto coronario agudo que requiera opioides, considerar la relevancia clínica del retraso y, cuando corresponda, una estrategia antiagregante parenteral según protocolo especializado.',mecanismo:'Enlentecimiento del vaciamiento gástrico por opioides y menor exposición temprana al antiagregante oral.',source_key:'DM_CLOPIDOGREL_2026',audit_verified:true});
  upsertClass({id:'GLOBAL-TICA-CYP3A-INH-02013',a:'TICAGRELOR',b:'STRONG_CYP3A_INHIBITORS',nivel:'Alta',resumen:'Los inhibidores potentes de CYP3A aumentan de forma importante la exposición a ticagrelor y pueden aumentar disnea, sangrado y otros efectos adversos.',conducta:'EVITAR la combinación con inhibidores potentes de CYP3A; elegir alternativa cuando sea posible.',mecanismo:'Inhibición del metabolismo CYP3A de ticagrelor.',source_key:'DM_TICAGRELOR_2026',audit_verified:true});
  upsertClass({id:'GLOBAL-TICA-CYP3A-IND-02013',a:'TICAGRELOR',b:'STRONG_CYP3A_INDUCERS',nivel:'Alta',resumen:'Los inductores potentes de CYP3A reducen sustancialmente la exposición a ticagrelor y pueden disminuir su eficacia antiagregante.',conducta:'EVITAR la combinación; seleccionar un fármaco alternativo que no induzca fuertemente CYP3A.',mecanismo:'Inducción del metabolismo CYP3A de ticagrelor.',source_key:'DM_TICAGRELOR_2026',audit_verified:true});
  upsertClass({id:'GLOBAL-TICA-DIG-02013',a:'TICAGRELOR',b:'DIGOXIN',nivel:'Moderada',resumen:'Ticagrelor puede aumentar la exposición a digoxina.',conducta:'Monitorizar niveles y signos de toxicidad por digoxina al iniciar o modificar ticagrelor, especialmente en pacientes vulnerables.',mecanismo:'Inhibición de P-gp y aumento de exposición a digoxina.',source_key:'DM_TICAGRELOR_2026',audit_verified:true});

  upsertClass({id:'GLOBAL-CIPRO-CAFFEINE-02013',a:'CIPROFLOXACIN_GROUP',b:'CAFFEINE',nivel:'Moderada',resumen:'Ciprofloxacino puede reducir el aclaramiento de cafeína y prolongar su semivida, aumentando nerviosismo, temblor, insomnio, palpitaciones u otros efectos de xantinas.',conducta:'Reducir/limitar cafeína durante ciprofloxacino y monitorizar síntomas de exceso de estimulante, especialmente con ingestas altas.',mecanismo:'Inhibición del metabolismo de cafeína con aumento de su exposición.',source_key:'DM_CIPROFLOXACIN_2026',audit_verified:true});
  upsertClass({id:'GLOBAL-CIPRO-CLOZ-02013',a:'CIPROFLOXACIN_GROUP',b:'CLOZAPINE',nivel:'Moderada/Alta',resumen:'Ciprofloxacino puede aumentar la exposición a clozapina y favorecer sedación, hipotensión, convulsiones u otra toxicidad relacionada con niveles elevados.',conducta:'Usar con cautela, monitorizar toxicidad por clozapina y considerar ajuste durante y poco después del tratamiento con ciprofloxacino.',mecanismo:'Inhibición metabólica, principalmente CYP1A2.',source_key:'DM_CIPROFLOXACIN_2026',audit_verified:true});
  upsertClass({id:'GLOBAL-CIPRO-DULOX-02013',a:'CIPROFLOXACIN_GROUP',b:'DULOXETINE_GROUP',nivel:'Alta',resumen:'Ciprofloxacino puede aumentar marcadamente la exposición a duloxetina y su toxicidad.',conducta:'EVITAR la combinación cuando sea posible; si no puede evitarse, requiere vigilancia estrecha de toxicidad.',mecanismo:'Inhibición potente de CYP1A2, vía importante del metabolismo de duloxetina.',source_key:'DM_CIPROFLOXACIN_2026',audit_verified:true});
  upsertClass({id:'GLOBAL-CIPRO-ZOLP-02013',a:'CIPROFLOXACIN_GROUP',b:'ZOLPIDEM_GROUP',nivel:'Alta',resumen:'Ciprofloxacino puede aumentar los niveles de zolpidem y potenciar sedación/deterioro psicomotor.',conducta:'EVITAR el uso concomitante cuando sea posible.',mecanismo:'Aumento de exposición a zolpidem por interacción farmacocinética.',source_key:'DM_CIPROFLOXACIN_2026',audit_verified:true});
  upsertClass({id:'GLOBAL-CIPRO-SILD-02013',a:'CIPROFLOXACIN_GROUP',b:'SILDENAFIL_GROUP',nivel:'Moderada',resumen:'Ciprofloxacino puede aumentar aproximadamente al doble la exposición a sildenafilo, aumentando cefalea, rubor, hipotensión y otros efectos adversos.',conducta:'Monitorizar toxicidad por sildenafilo y usar la menor exposición necesaria según indicación y ficha técnica.',mecanismo:'Aumento de exposición sistémica a sildenafilo.',source_key:'DM_CIPROFLOXACIN_2026',audit_verified:true});
  upsertClass({id:'GLOBAL-CIPRO-NSAID-02013',a:'CIPROFLOXACIN_GROUP',b:'NSAIDS',nivel:'Moderada',resumen:'La ficha de ciprofloxacino recomienda precaución con AINE porque se han descrito efectos proconvulsivantes con quinolonas, especialmente en dosis altas o pacientes predispuestos.',conducta:'Usar con cautela en pacientes con epilepsia, lesión cerebral, insuficiencia renal u otros factores que reduzcan el umbral convulsivo; evitar duplicidad innecesaria de riesgos.',mecanismo:'Potencial disminución del umbral convulsivo.',source_key:'DM_CIPROFLOXACIN_2026',audit_verified:true});

  K.version='0.20.13';
  K.updated_at='2026-09-07';
  K.meta.global_audit_version='0.20.13';
  K.meta.openfda_candidate_source=true;
  K.meta.openfda_auto_publish=false;
  K.meta.openfda_requires_human_review=true;
  K.meta.audit_regression_cases=uniq([...(K.meta.audit_regression_cases||[]),
    'Metoclopramida + Pramipexol = EVITAR',
    'Metoclopramida + Levodopa = EVITAR',
    'Pseudoefedrina + Fenelzina = NO COMBINAR',
    'Pseudoefedrina + Cafeína = MONITORIZAR',
    'Clopidogrel + Diclofenaco = MONITORIZAR/EVITAR SEGÚN RIESGO',
    'Aspirina + Ibuprofeno = MONITORIZAR/EVITAR SEGÚN INDICACIÓN',
    'Ticagrelor + Claritromicina = EVITAR',
    'Ciprofloxacino + Cafeína = MONITORIZAR'
  ]);
  K.meta.class_rule_count=K.class_rules.length;
  K.meta.exact_rule_count=K.exact_rules.length;
  K.meta.group_count=Object.keys(K.groups).length;
  K.meta.source_count=Object.keys(K.sources).length;
  window.VCB_INTERACTION_GLOBAL_VERSION='0.20.13';
})();