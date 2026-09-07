/* Vademécum Clínico Bolivia v0.20.11 · ampliación neurofarmacológica basada en fichas oficiales */
(function(){
  const K=window.VCB_INTERACTION_KB;
  if(!K||!Array.isArray(K.class_rules)||!Array.isArray(K.exact_rules))return;
  K.groups=K.groups||{};K.sources=K.sources||{};K.meta=K.meta||{};
  const uniq=a=>[...new Set((a||[]).filter(Boolean))];
  const addGroup=(name,items)=>{K.groups[name]=uniq([...(K.groups[name]||[]),...items])};
  const addClass=r=>{if(!K.class_rules.some(x=>x.id===r.id))K.class_rules.push(r)};
  const addExact=r=>{if(!K.exact_rules.some(x=>x.id===r.id))K.exact_rules.push(r)};

  K.sources.DM_PHENYTOIN_2026={title:'DailyMed · Phenytoin Sodium · Drug Interactions',url:'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=df0bf42b-ce9a-42c3-8c24-46f1ea3bd214'};
  K.sources.DM_CARBAMAZEPINE_2026={title:'DailyMed · Carbamazepine · Drug Interactions',url:'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=9471b7fb-29d3-4009-9d0f-f20c27351db5'};
  K.sources.DM_CARBAMAZEPINE_XR={title:'DailyMed · Carbamazepine ER · Drug Interactions',url:'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=572ef850-a13c-436a-8a29-5afd4cf737c7'};
  K.sources.DM_AMIODARONE_2025={title:'DailyMed · Amiodarone Hydrochloride · Drug Interactions',url:'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=5520f11d-968d-4f4f-bf57-d14369c0d746'};
  K.sources.DM_LAMOTRIGINE_2025={title:'DailyMed · Lamotrigine · Drug Interactions',url:'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=4ca9d713-ab63-48bf-9386-29301a842e60'};
  K.sources.DM_DIVALPROEX_2026={title:'DailyMed · Divalproex Sodium · Drug Interactions',url:'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=dbd47222-14f1-4588-a009-9b81b55ca60d'};
  K.sources.DM_DEPAKOTE_DETAIL={title:'DailyMed · Depakote · efectos sobre fenitoína, carbamazepina, fenobarbital y lamotrigina',url:'https://dailymed.nlm.nih.gov/dailymed/getFile.cfm?name=08a65cf4-7749-4ceb-6895-8f4805e2b01f&setid=08a65cf4-7749-4ceb-6895-8f4805e2b01f'};
  K.sources.DM_TOPIRAMATE_2026={title:'DailyMed · Topiramate · Drug Interactions',url:'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=164cb1f7-1a41-675f-e063-6294a90ae0dd'};
  K.sources.DM_CLARITHROMYCIN={title:'DailyMed · Clarithromycin · carbamazepine interaction',url:'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=5186e031-e930-4987-9e53-0daf4050eded'};

  addGroup('PHENYTOIN_AED',['Fenitoína','Fosphenytoína','Fosfenitoína']);
  addGroup('CARBAMAZEPINE_AED',['Carbamazepina']);
  addGroup('LAMOTRIGINE_AED',['Lamotrigina']);
  addGroup('TOPIRAMATE_AED',['Topiramato']);
  addGroup('BARBITURATE_AEDS',['Fenobarbital','Primidona']);
  addGroup('AMIODARONE_GROUP',['Amiodarona']);
  addGroup('PHENYTOIN_LEVEL_INCREASERS',['Fluconazol','Itraconazol','Ketoconazol','Voriconazol','Fluoxetina','Fluvoxamina','Sertralina','Omeprazol','Isoniazida','Trimetoprim','Trimetoprima','Sulfametoxazol']);
  addGroup('CARBAMAZEPINE_CYP3A_INHIBITORS',['Claritromicina','Eritromicina','Itraconazol','Ketoconazol','Fluconazol','Verapamilo','Diltiazem']);
  addGroup('VALPROATE_CLEARANCE_INDUCERS',['Carbamazepina','Fenobarbital','Primidona','Rifampicina','Rifampin']);
  addGroup('OTHER_CARBONIC_ANHYDRASE_INHIBITORS',['Zonisamida','Acetazolamida']);
  addGroup('WARFARIN_GROUP',['Warfarina']);
  addGroup('TRICYCLIC_AMITRIPTYLINE',['Amitriptilina','Nortriptilina']);
  addGroup('CLONAZEPAM_GROUP',['Clonazepam']);
  addGroup('DIAZEPAM_GROUP',['Diazepam']);

  addClass({id:'NEURO-PHT-CBZ-02011',a:'PHENYTOIN_AED',b:'CARBAMAZEPINE_AED',nivel:'Moderada',resumen:'Interacción farmacocinética bidireccional e impredecible. Fenitoína puede reducir las concentraciones de carbamazepina; carbamazepina puede aumentar o disminuir las concentraciones de fenitoína. Puede aparecer pérdida de control de crisis o neurotoxicidad.',conducta:'Monitorizar respuesta clínica y concentraciones plasmáticas de ambos antiepilépticos al iniciar, ajustar o retirar uno de ellos. Considerar TDM y ajuste individual de dosis.',mecanismo:'Inducción enzimática y cambios complejos del metabolismo de ambos fármacos; la dirección del cambio de fenitoína puede ser variable.',source_key:'DM_CARBAMAZEPINE_XR',audit_verified:true});

  addClass({id:'NEURO-PHT-AMIO-02011',a:'PHENYTOIN_AED',b:'AMIODARONE_GROUP',nivel:'Alta',resumen:'Amiodarona puede aumentar las concentraciones estables de fenitoína, con riesgo de nistagmo, ataxia, diplopía, somnolencia o encefalopatía. Fenitoína puede disminuir la exposición a amiodarona y comprometer el control arrítmico.',conducta:'Evitar una combinación no imprescindible. Si es necesaria, medir niveles de fenitoína, vigilar signos de neurotoxicidad y controlar clínicamente/ECG la respuesta antiarrítmica; ajustar dosis según evolución.',mecanismo:'Amiodarona inhibe vías metabólicas de fenitoína; fenitoína induce metabolismo y puede reducir concentraciones de amiodarona.',source_key:'DM_AMIODARONE_2025',audit_verified:true});

  addClass({id:'NEURO-PHT-INHIB-02011',a:'PHENYTOIN_AED',b:'PHENYTOIN_LEVEL_INCREASERS',nivel:'Moderada',resumen:'El segundo fármaco puede aumentar las concentraciones de fenitoína y favorecer neurotoxicidad.',conducta:'Monitorizar clínica y niveles de fenitoína después de iniciar, suspender o modificar la dosis del fármaco concomitante. Ajustar fenitoína si corresponde.',mecanismo:'Inhibición del metabolismo de fenitoína y/o alteración de su exposición.',source_key:'DM_PHENYTOIN_2026',audit_verified:true});

  addClass({id:'NEURO-CBZ-CYP3A-02011',a:'CARBAMAZEPINE_AED',b:'CARBAMAZEPINE_CYP3A_INHIBITORS',nivel:'Moderada',resumen:'Puede aumentar la concentración de carbamazepina y precipitar mareo, diplopía, ataxia, somnolencia u otros signos de toxicidad.',conducta:'Preferir alternativa cuando sea posible. Si se combinan, vigilar toxicidad y considerar nivel plasmático de carbamazepina y ajuste de dosis.',mecanismo:'Inhibición de CYP3A4, principal vía metabólica de carbamazepina.',source_key:'DM_CARBAMAZEPINE_2026',audit_verified:true});

  addClass({id:'NEURO-CBZ-CLARITHRO-02011',a:'CARBAMAZEPINE_AED',b:'MACROLIDES',nivel:'Moderada',resumen:'Especialmente con claritromicina o eritromicina pueden aumentar las concentraciones de carbamazepina y aparecer toxicidad neurológica.',conducta:'Con claritromicina/eritromicina, considerar alternativa; si se usan, monitorizar nivel de carbamazepina y síntomas de toxicidad.',mecanismo:'Inhibición CYP3A por macrólidos; azitromicina tiene menor potencial de esta interacción y debe interpretarse por separado.',source_key:'DM_CLARITHROMYCIN',audit_verified:true});

  addClass({id:'NEURO-VAL-LTG-02011',a:'VALPROATES',b:'LAMOTRIGINE_AED',nivel:'Alta',resumen:'Valproato aumenta la exposición a lamotrigina más de dos veces y prolonga marcadamente su semivida. Aumenta el riesgo de reacciones cutáneas graves, incluidas síndrome de Stevens-Johnson y necrólisis epidérmica tóxica.',conducta:'Usar únicamente con el esquema de inicio y titulación reducido recomendado para lamotrigina con valproato. Vigilar estrechamente rash y síntomas sistémicos; una erupción nueva requiere evaluación inmediata.',mecanismo:'Valproato inhibe la glucuronidación y el aclaramiento de lamotrigina.',source_key:'DM_LAMOTRIGINE_2025',audit_verified:true});

  addClass({id:'NEURO-LTG-INDUCER-02011',a:'LAMOTRIGINE_AED',b:'ENZYME_INDUCER_AEDS',nivel:'Moderada',resumen:'Carbamazepina, fenitoína, fenobarbital y primidona pueden reducir las concentraciones de lamotrigina aproximadamente 40%, con riesgo de pérdida de eficacia.',conducta:'Monitorizar control de crisis/estado clínico y ajustar lamotrigina según esquema de ficha técnica al iniciar o retirar el inductor.',mecanismo:'Inducción de glucuronidación y aumento del aclaramiento de lamotrigina.',source_key:'DM_LAMOTRIGINE_2025',audit_verified:true});

  addClass({id:'NEURO-LTG-ESTROGEN-02011',a:'LAMOTRIGINE_AED',b:'ESTROGEN_CONTRACEPTIVES',nivel:'Moderada',resumen:'Los anticonceptivos con estrógeno pueden reducir la concentración de lamotrigina alrededor de 50%; lamotrigina puede disminuir modestamente levonorgestrel. Puede alterarse el control de crisis y cambiar la exposición durante semana activa/libre.',conducta:'Revisar dosis de lamotrigina al iniciar, suspender o cambiar anticoncepción hormonal; monitorizar respuesta clínica y considerar métodos anticonceptivos apropiados.',mecanismo:'Inducción de glucuronidación de lamotrigina por estrógenos.',source_key:'DM_LAMOTRIGINE_2025',audit_verified:true});

  addClass({id:'NEURO-VAL-TOP-02011',a:'VALPROATES',b:'TOPIRAMATE_AED',nivel:'Alta',resumen:'Puede producir hiperammonemia con o sin encefalopatía y también hipotermia, incluso en pacientes que toleraban cada fármaco por separado.',conducta:'Reevaluar la combinación si aparece letargia, vómitos, alteración cognitiva, disminución del nivel de conciencia o hipotermia. Medir amonio cuando exista sospecha y considerar suspensión de uno de los fármacos.',mecanismo:'Interacción farmacodinámica/metabólica asociada a alteración del manejo del amonio; no depende de una simple interacción CYP.',source_key:'DM_TOPIRAMATE_2026',audit_verified:true});

  addClass({id:'NEURO-PHT-TOP-02011',a:'PHENYTOIN_AED',b:'TOPIRAMATE_AED',nivel:'Moderada',resumen:'Fenitoína puede reducir la concentración plasmática de topiramato aproximadamente 48%, con posible pérdida de eficacia.',conducta:'Monitorizar control de crisis/migraña y considerar ajuste de topiramato al iniciar o retirar fenitoína.',mecanismo:'Inducción del metabolismo/aclaramiento de topiramato por fenitoína.',source_key:'DM_TOPIRAMATE_2026',audit_verified:true});

  addClass({id:'NEURO-CBZ-TOP-02011',a:'CARBAMAZEPINE_AED',b:'TOPIRAMATE_AED',nivel:'Moderada',resumen:'Carbamazepina puede reducir la concentración plasmática de topiramato aproximadamente 40%, con posible pérdida de eficacia.',conducta:'Monitorizar respuesta clínica y considerar ajuste de topiramato al iniciar o retirar carbamazepina.',mecanismo:'Inducción del aclaramiento de topiramato por carbamazepina.',source_key:'DM_TOPIRAMATE_2026',audit_verified:true});

  addClass({id:'NEURO-TOP-CAI-02011',a:'TOPIRAMATE_AED',b:'OTHER_CARBONIC_ANHYDRASE_INHIBITORS',nivel:'Moderada',resumen:'Puede aumentar la gravedad de la acidosis metabólica y el riesgo de litiasis renal.',conducta:'Monitorizar bicarbonato, síntomas de acidosis y riesgo de cálculos; asegurar hidratación adecuada y reevaluar la asociación si aparecen alteraciones.',mecanismo:'Inhibición aditiva de anhidrasa carbónica.',source_key:'DM_TOPIRAMATE_2026',audit_verified:true});

  addClass({id:'NEURO-VAL-PHT-02011',a:'VALPROATES',b:'PHENYTOIN_AED',nivel:'Moderada',resumen:'Valproato desplaza fenitoína de la albúmina e inhibe su metabolismo; la fracción libre de fenitoína puede aumentar aunque el nivel total no parezca elevado. Fenitoína, a su vez, puede aumentar el aclaramiento de valproato.',conducta:'Monitorizar clínica y, cuando sea posible, fenitoína libre además de nivel total; controlar también valproato al iniciar o retirar la combinación y ajustar según respuesta.',mecanismo:'Desplazamiento de unión a proteínas + inhibición metabólica de fenitoína, junto con inducción del aclaramiento de valproato.',source_key:'DM_DEPAKOTE_DETAIL',audit_verified:true});

  addClass({id:'NEURO-VAL-CBZ-02011',a:'VALPROATES',b:'CARBAMAZEPINE_AED',nivel:'Moderada',resumen:'Carbamazepina puede aumentar el aclaramiento de valproato; valproato puede reducir carbamazepina total pero aumentar su metabolito activo carbamazepina-10,11-epóxido. Puede coexistir pérdida de eficacia y neurotoxicidad.',conducta:'Monitorizar control de crisis, signos de toxicidad y concentraciones cuando estén disponibles; considerar medición del epóxido si existe toxicidad con carbamazepina total normal/baja.',mecanismo:'Inducción del aclaramiento de valproato e inhibición del metabolismo del epóxido de carbamazepina.',source_key:'DM_DEPAKOTE_DETAIL',audit_verified:true});

  addClass({id:'NEURO-VAL-BARB-02011',a:'VALPROATES',b:'BARBITURATE_AEDS',nivel:'Moderada',resumen:'Valproato puede prolongar la semivida y reducir el aclaramiento de fenobarbital; se ha descrito depresión grave del SNC. Fenobarbital/primidona además pueden aumentar el aclaramiento de valproato.',conducta:'Monitorizar estrechamente sedación y toxicidad neurológica; medir concentraciones de barbitúrico/valproato cuando sea posible y reducir el barbitúrico si corresponde.',mecanismo:'Inhibición del metabolismo de fenobarbital por valproato más inducción enzimática en sentido inverso.',source_key:'DM_DEPAKOTE_DETAIL',audit_verified:true});

  addClass({id:'NEURO-VAL-TCA-02011',a:'VALPROATES',b:'TRICYCLIC_AMITRIPTYLINE',nivel:'Moderada',resumen:'Valproato puede aumentar la exposición a amitriptilina/nortriptilina y favorecer toxicidad anticolinérgica, sedación o efectos cardiovasculares.',conducta:'Considerar reducción de dosis y monitorización clínica; medir niveles de tricíclico si está disponible y hay sospecha de toxicidad.',mecanismo:'Reducción del aclaramiento de amitriptilina/nortriptilina por valproato.',source_key:'DM_DEPAKOTE_DETAIL',audit_verified:true});

  addClass({id:'NEURO-VAL-CLONAZ-02011',a:'VALPROATES',b:'CLONAZEPAM_GROUP',nivel:'Moderada',resumen:'En pacientes con antecedentes de crisis de ausencia, la combinación puede precipitar estado de ausencia.',conducta:'Usar con especial cautela en epilepsia de ausencias y monitorizar cambios en frecuencia/duración de episodios o alteración persistente del sensorio.',mecanismo:'Interacción farmacodinámica descrita con valproato y clonazepam en pacientes susceptibles.',source_key:'DM_DEPAKOTE_DETAIL',audit_verified:true});

  addClass({id:'NEURO-VAL-DIAZ-02011',a:'VALPROATES',b:'DIAZEPAM_GROUP',nivel:'Moderada',resumen:'Valproato puede aumentar de forma importante la fracción libre de diazepam y favorecer sedación o deterioro psicomotor.',conducta:'Vigilar sedación, respiración y desempeño psicomotor; usar dosis mínimas necesarias y ajustar según respuesta.',mecanismo:'Desplazamiento de diazepam de la albúmina e inhibición de su metabolismo.',source_key:'DM_DEPAKOTE_DETAIL',audit_verified:true});

  addClass({id:'NEURO-CBZ-WARFARIN-02011',a:'CARBAMAZEPINE_AED',b:'WARFARIN_GROUP',nivel:'Moderada',resumen:'Carbamazepina puede reducir el efecto anticoagulante de warfarina y aumentar el riesgo de anticoagulación subterapéutica/trombosis.',conducta:'Controlar INR con mayor frecuencia al iniciar, ajustar o retirar carbamazepina y reajustar warfarina según INR.',mecanismo:'Inducción enzimática del metabolismo de warfarina por carbamazepina.',source_key:'DM_CARBAMAZEPINE_XR',audit_verified:true});

  addClass({id:'NEURO-CBZ-ESTROGEN-02011',a:'CARBAMAZEPINE_AED',b:'ESTROGEN_CONTRACEPTIVES',nivel:'Moderada',resumen:'Carbamazepina puede reducir la concentración de hormonas anticonceptivas; se han descrito sangrado intermenstrual y embarazos no planificados.',conducta:'No confiar en anticoncepción hormonal susceptible a inducción sin una estrategia adicional/alternativa adecuada. Revisar el método anticonceptivo con la paciente.',mecanismo:'Inducción enzimática del metabolismo de hormonas anticonceptivas.',source_key:'DM_CARBAMAZEPINE_XR',audit_verified:true});

  K.version='0.20.11';K.updated_at='2026-09-07';
  K.meta.neuro_interaction_audit_version='0.20.11';
  K.meta.neuro_interaction_sources=['DM_PHENYTOIN_2026','DM_CARBAMAZEPINE_2026','DM_CARBAMAZEPINE_XR','DM_AMIODARONE_2025','DM_LAMOTRIGINE_2025','DM_DIVALPROEX_2026','DM_DEPAKOTE_DETAIL','DM_TOPIRAMATE_2026','DM_CLARITHROMYCIN'];
  K.meta.exact_rule_count=(K.exact_rules||[]).length;K.meta.class_rule_count=(K.class_rules||[]).length;K.meta.source_count=Object.keys(K.sources||{}).length;
  K.meta.regression_cases=[...(K.meta.regression_cases||[]),['Fenitoína','Carbamazepina','MONITORIZAR'],['Fenitoína','Amiodarona','EVITAR'],['Valproato','Lamotrigina','EVITAR'],['Valproato','Topiramato','EVITAR'],['Carbamazepina','Warfarina','MONITORIZAR'],['Lamotrigina','Etinilestradiol','MONITORIZAR']];
  window.VCB_INTERACTION_NEURO_VERSION='0.20.11';
})();
