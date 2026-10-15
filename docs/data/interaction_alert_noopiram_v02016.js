/* Vademécum Clínico Bolivia v0.20.16 · ALERTEX/modafinilo + NOOPIRAM/piracetam */
(function(){
  const K=window.VCB_INTERACTION_KB;
  if(!K||!Array.isArray(K.class_rules)||!Array.isArray(K.exact_rules))return;
  K.groups=K.groups||{};K.sources=K.sources||{};K.meta=K.meta||{};
  const uniq=a=>[...new Set((a||[]).filter(Boolean))];
  const addGroup=(name,items)=>{K.groups[name]=uniq([...(K.groups[name]||[]),...items])};
  const upsertClass=r=>{const i=K.class_rules.findIndex(x=>x.id===r.id);if(i>=0)K.class_rules[i]={...K.class_rules[i],...r};else K.class_rules.push(r)};
  const upsertExact=r=>{const i=K.exact_rules.findIndex(x=>x.id===r.id);if(i>=0)K.exact_rules[i]={...K.exact_rules[i],...r};else K.exact_rules.push(r)};

  K.sources.DM_MODAFINIL_2026={
    title:'DailyMed · Modafinil · interacciones CYP3A4/5, CYP2C19, warfarina y precauciones cardiovasculares',
    url:'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=9f3b0bd2-72a3-411f-aeec-b533373f1a97'
  };
  K.sources.SAVAL_ALERTEX={
    title:'Saval · ALERTEX (modafinilo 100/200 mg)',
    url:'https://www.savalcorp.com/es/productos/ALERTEX.html?c=1'
  };
  K.sources.PIRACETAM_SPC={
    title:'Nootropil / piracetam SmPC · antiagregación, anticoagulantes, antiepilépticos y hormonas tiroideas',
    url:'https://www.medicines.org.uk/emc/product/101129/smpc'
  };
  K.sources.DM_HALOPERIDOL_2026={
    title:'DailyMed · Haloperidol · sustrato CYP3A4/CYP2D6 e inductores enzimáticos',
    url:'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=e702b2f0-d464-41c3-977a-d37bb22c0ab0'
  };
  K.sources.PUBMED_PIRACETAM_NEUROLEPTICS={
    title:'PubMed · Piracetam interactions with neuroleptics in psychopharmacological tests',
    url:'https://pubmed.ncbi.nlm.nih.gov/2884593/'
  };

  addGroup('MODAFINIL',['Modafinilo','Modafinil']);
  addGroup('PIRACETAM',['Piracetam']);
  addGroup('PIRACETAM_AEDS_STUDIED',[
    'Carbamazepina','Fenitoína','Fenitoina','Fenobarbital','Fenobarbitona',
    'Ácido valproico','Acido valproico','Valproato','Valproato de sodio','Divalproato'
  ]);
  addGroup('MODAFINIL_AEDS_NO_SPECIFIC',[
    'Ácido valproico','Acido valproico','Valproato','Valproato de sodio','Divalproato',
    'Levetiracetam','Lacosamida','Lamotrigina','Topiramato','Gabapentina','Pregabalina'
  ]);
  addGroup('THYROID_HORMONES',[
    'Levotiroxina','Liotironina','T3','T4','Triyodotironina','Tiroxina'
  ]);
  addGroup('MODAFINIL_ANTIHYPERTENSIVES',[
    'Captopril','Enalapril','Lisinopril','Ramipril','Perindopril',
    'Losartán','Losartan','Valsartán','Valsartan','Candesartán','Irbesartán','Telmisartán','Olmesartán',
    'Amlodipino','Nifedipino','Felodipino','Verapamilo','Diltiazem',
    'Metoprolol','Carvedilol','Bisoprolol','Atenolol','Nebivolol','Labetalol',
    'Hidroclorotiazida','Clortalidona','Indapamida','Furosemida','Torasemida','Espironolactona','Eplerenona',
    'Doxazosina','Prazosina','Hidralazina','Metildopa','Clonidina'
  ]);
  addGroup('MODAFINIL_STIMULANTS',[
    'Cafeína','Caffeine','Pseudoefedrina','Fenilefrina','Efedrina',
    'Metilfenidato','Dextroanfetamina','Anfetamina','Lisdexanfetamina'
  ]);
  addGroup('MODAFINIL_MAOI',['Fenelzina','Tranilcipromina','Isocarboxazida','Selegilina','Rasagilina','Safinamida']);

  /* ALERTEX / modafinilo */
  upsertClass({
    id:'ALERTEX-NOOPIRAM-02016',a:'MODAFINIL',b:'PIRACETAM',nivel:'Baja',
    resumen:'No se ha establecido una interacción farmacocinética directa entre modafinilo y piracetam. Sin embargo, ambos actúan sobre el SNC y pueden coincidir en nerviosismo, agitación, cefalea o insomnio; modafinilo además puede aumentar frecuencia cardiaca o presión arterial.',
    conducta:'Pueden requerir vigilancia clínica si se usan juntos. Controlar sueño, ansiedad/agitación, cefalea, presión arterial y frecuencia cardiaca; reevaluar si aparecen síntomas nuevos.',
    mecanismo:'No hay una interacción metabólica demostrada entre ambos; la precaución se basa en efectos adversos del SNC potencialmente superpuestos.',
    source_key:'DM_MODAFINIL_2026',audit_verified:true,evidence_type:'no_direct_pk_interaction_with_pharmacodynamic_monitoring'
  });
  upsertClass({
    id:'ALERTEX-BP-02016',a:'MODAFINIL',b:'MODAFINIL_ANTIHYPERTENSIVES',nivel:'Moderada',
    resumen:'Modafinilo puede dificultar el control de la presión arterial en algunos pacientes. En ensayos, una mayor proporción de pacientes con modafinilo necesitó iniciar o aumentar tratamiento antihipertensivo.',
    conducta:'MONITORIZAR presión arterial y frecuencia cardiaca al iniciar o cambiar la dosis. Ajustar el antihipertensivo solo según respuesta clínica.',
    mecanismo:'Efecto activador del SNC y posible aumento de tono simpático; no implica una interacción metabólica uniforme con todos los antihipertensivos.',
    source_key:'DM_MODAFINIL_2026',audit_verified:true
  });
  upsertClass({
    id:'ALERTEX-STIMULANTS-02016',a:'MODAFINIL',b:'MODAFINIL_STIMULANTS',nivel:'Moderada',
    resumen:'La combinación puede aumentar nerviosismo, ansiedad, insomnio, palpitaciones, taquicardia o elevación de presión arterial.',
    conducta:'Limitar otros estimulantes cuando sea posible y monitorizar presión arterial, frecuencia cardiaca, sueño y síntomas neuropsiquiátricos.',
    mecanismo:'Carga estimulante/adrenergica aditiva.',
    source_key:'DM_MODAFINIL_2026',audit_verified:true,evidence_type:'pharmacodynamic_inference'
  });
  upsertClass({
    id:'ALERTEX-MAOI-02016',a:'MODAFINIL',b:'MODAFINIL_MAOI',nivel:'Moderada/Alta',
    resumen:'La ficha de modafinilo recomienda precaución con inhibidores de MAO por potencial de respuestas monoaminérgicas/adrenérgicas impredecibles.',
    conducta:'Evitar la combinación no supervisada. Si existe una indicación excepcional, requiere control estrecho de presión arterial, frecuencia cardiaca y síntomas neuropsiquiátricos.',
    mecanismo:'Potenciación de vías monoaminérgicas; la magnitud de la interacción no está bien cuantificada.',
    source_key:'DM_MODAFINIL_2026',audit_verified:true
  });
  upsertClass({
    id:'ALERTEX-CONTRACEPTIVE-02016',a:'MODAFINIL',b:'ESTROGEN_CONTRACEPTIVES',nivel:'Moderada',
    resumen:'Modafinilo puede reducir la exposición y la eficacia de anticonceptivos esteroideos.',
    conducta:'Usar un método anticonceptivo alternativo o adicional durante modafinilo y durante 1 mes después de suspenderlo.',
    mecanismo:'Inducción de CYP3A4/5 y aumento del aclaramiento de esteroides anticonceptivos.',
    source_key:'DM_MODAFINIL_2026',audit_verified:true
  });
  upsertClass({
    id:'ALERTEX-AED-NOSPECIFIC-02016',a:'MODAFINIL',b:'MODAFINIL_AEDS_NO_SPECIFIC',nivel:'Baja',
    resumen:'No se identifica en la ficha oficial de modafinilo una interacción farmacocinética específica con este antiepiléptico. Esto no demuestra ausencia absoluta de interacción.',
    conducta:'Mantener vigilancia clínica habitual del control de crisis y de efectos del SNC; revisar nuevamente si se modifican dosis o se añaden inductores/inhibidores enzimáticos.',
    mecanismo:'Sin interacción específica bien establecida en la información oficial revisada.',
    source_key:'DM_MODAFINIL_2026',audit_verified:true,evidence_type:'label_no_specific_interaction'
  });

  upsertExact({
    id:'ALERTEX-PHENYTOIN-02016',a:'Modafinilo',b:'Fenitoína',nivel:'Moderada/Alta',
    resumen:'Modafinilo puede aumentar la exposición a fenitoína por inhibición de CYP2C19 y posiblemente CYP2C9, elevando el riesgo de nistagmo, diplopía, ataxia, somnolencia u otra toxicidad.',
    conducta:'Monitorizar clínica y concentraciones plasmáticas de fenitoína cuando corresponda; considerar ajuste de dosis si aparecen niveles elevados o toxicidad.',
    mecanismo:'Inhibición reversible de CYP2C19 y posible efecto sobre CYP2C9.',
    source_key:'DM_MODAFINIL_2026',audit_verified:true
  });
  upsertExact({
    id:'ALERTEX-CARBAMAZEPINE-02016',a:'Modafinilo',b:'Carbamazepina',nivel:'Moderada',
    resumen:'Carbamazepina, como potente inductor de CYP3A4/5, puede reducir las concentraciones de modafinilo y disminuir su efecto promotor de vigilia.',
    conducta:'Monitorizar eficacia clínica de modafinilo; no aumentar dosis automáticamente. Reevaluar tratamiento si cambia la carbamazepina.',
    mecanismo:'Inducción de CYP3A4/5, vía que participa parcialmente en el metabolismo de modafinilo.',
    source_key:'DM_MODAFINIL_2026',audit_verified:true
  });
  upsertExact({
    id:'ALERTEX-PHENOBARBITAL-02016',a:'Modafinilo',b:'Fenobarbital',nivel:'Moderada',
    resumen:'Fenobarbital puede reducir las concentraciones de modafinilo y disminuir su efecto clínico.',
    conducta:'Monitorizar respuesta de vigilia y evitar ajustes empíricos sin reevaluación clínica.',
    mecanismo:'Inducción potente de CYP3A4/5.',
    source_key:'DM_MODAFINIL_2026',audit_verified:true
  });
  upsertExact({
    id:'ALERTEX-DIAZEPAM-02016',a:'Modafinilo',b:'Diazepam',nivel:'Moderada',
    resumen:'Modafinilo puede aumentar la exposición a diazepam y prolongar sedación, deterioro psicomotor o ataxia.',
    conducta:'Monitorizar sedación y respuesta; considerar reducción de dosis de diazepam si clínicamente necesario.',
    mecanismo:'Inhibición de CYP2C19 por modafinilo.',
    source_key:'DM_MODAFINIL_2026',audit_verified:true
  });
  upsertExact({
    id:'ALERTEX-PROPRANOLOL-02016',a:'Modafinilo',b:'Propranolol',nivel:'Moderada',
    resumen:'Modafinilo puede aumentar la exposición a propranolol; al mismo tiempo, modafinilo puede favorecer elevación de presión arterial o frecuencia cardiaca, por lo que la respuesta clínica puede ser variable.',
    conducta:'Monitorizar presión arterial y frecuencia cardiaca; ajustar propranolol según respuesta, no de forma automática.',
    mecanismo:'Inhibición de CYP2C19 puede prolongar la eliminación de propranolol.',
    source_key:'DM_MODAFINIL_2026',audit_verified:true
  });
  upsertExact({
    id:'ALERTEX-OMEPRAZOLE-02016',a:'Modafinilo',b:'Omeprazol',nivel:'Baja',
    resumen:'Modafinilo puede aumentar la exposición a omeprazol; con armodafinilo se observó un aumento aproximado del 40% en exposición.',
    conducta:'Generalmente basta vigilancia clínica; considerar ajuste si existen efectos adversos o tratamiento prolongado de alta dosis.',
    mecanismo:'Inhibición de CYP2C19.',
    source_key:'DM_MODAFINIL_2026',audit_verified:true
  });
  upsertExact({
    id:'ALERTEX-CLOMIPRAMINE-02016',a:'Modafinilo',b:'Clomipramina',nivel:'Moderada',
    resumen:'Modafinilo puede aumentar concentraciones de clomipramina en algunos pacientes, especialmente metabolizadores lentos CYP2D6, favoreciendo toxicidad anticolinérgica, cardiovascular o del SNC.',
    conducta:'Monitorizar efectos adversos y respuesta; considerar niveles/ajuste cuando el contexto clínico lo justifique.',
    mecanismo:'Inhibición de CYP2C19, vía alternativa relevante en algunos pacientes.',
    source_key:'DM_MODAFINIL_2026',audit_verified:true
  });
  upsertExact({
    id:'ALERTEX-WARFARIN-02016',a:'Modafinilo',b:'Warfarina',nivel:'Moderada',
    resumen:'No se demostró un cambio farmacocinético importante con una dosis única de warfarina, pero la ficha no descarta interacción y recomienda control más frecuente del TP/INR.',
    conducta:'Controlar INR con mayor frecuencia al iniciar, suspender o cambiar dosis de modafinilo.',
    mecanismo:'Posible modulación de CYP2C9; evidencia clínica limitada.',
    source_key:'DM_MODAFINIL_2026',audit_verified:true
  });
  upsertExact({
    id:'ALERTEX-CYCLOSPORINE-02016',a:'Modafinilo',b:'Ciclosporina',nivel:'Moderada/Alta',
    resumen:'Modafinilo puede reducir de forma importante las concentraciones de ciclosporina; se ha descrito una disminución cercana al 50% en un caso.',
    conducta:'Monitorizar niveles de ciclosporina y ajustar según concentraciones y situación clínica.',
    mecanismo:'Inducción de CYP3A4 y aumento del metabolismo de ciclosporina.',
    source_key:'DM_MODAFINIL_2026',audit_verified:true
  });
  upsertExact({
    id:'ALERTEX-MIDAZOLAM-02016',a:'Modafinilo',b:'Midazolam',nivel:'Moderada',
    resumen:'Modafinilo/armodafinilo puede reducir la exposición a midazolam y disminuir o acortar su efecto sedante.',
    conducta:'Monitorizar efecto clínico; en sedación/anestesia ajustar únicamente con monitorización apropiada.',
    mecanismo:'Inducción de CYP3A4/5.',
    source_key:'DM_MODAFINIL_2026',audit_verified:true
  });
  upsertExact({
    id:'ALERTEX-TRIAZOLAM-02016',a:'Modafinilo',b:'Triazolam',nivel:'Moderada',
    resumen:'Modafinilo puede reducir marcadamente la exposición a triazolam y disminuir su efecto hipnótico.',
    conducta:'Monitorizar eficacia; considerar alternativa o ajuste individual si fuera necesario.',
    mecanismo:'Inducción de CYP3A4/5.',
    source_key:'DM_MODAFINIL_2026',audit_verified:true
  });
  upsertExact({
    id:'ALERTEX-QUETIAPINE-02016',a:'Modafinilo',b:'Quetiapina',nivel:'Moderada',
    resumen:'La inducción de CYP3A puede reducir la exposición a quetiapina; con armodafinilo se observó una reducción media aproximada del 29%.',
    conducta:'Monitorizar control psiquiátrico y signos de pérdida de eficacia; ajustar solo con seguimiento clínico.',
    mecanismo:'Inducción de CYP3A4.',
    source_key:'DM_MODAFINIL_2026',audit_verified:true
  });
  upsertExact({
    id:'ALERTEX-HALOPERIDOL-02016',a:'Modafinilo',b:'Haloperidol',nivel:'Moderada',
    resumen:'Modafinilo es un inductor débil de CYP3A y haloperidol es sustrato de CYP3A4; existe posibilidad de reducción de exposición a haloperidol y pérdida de eficacia. La magnitud clínica específica de esta pareja no está bien cuantificada.',
    conducta:'MONITORIZAR control de agitación/psicosis y aparición de activación, insomnio o síntomas psiquiátricos. No ajustar haloperidol automáticamente; reevaluar si cambia la respuesta.',
    mecanismo:'Interacción farmacocinética plausible por inducción CYP3A4, sumada a efectos centrales potencialmente opuestos.',
    source_key:'DM_HALOPERIDOL_2026',audit_verified:true,evidence_type:'mechanistic_inference'
  });
  upsertExact({
    id:'ALERTEX-CLOPIDOGREL-02016',a:'Modafinilo',b:'Clopidogrel',nivel:'Moderada',
    resumen:'Modafinilo inhibe CYP2C19 y clopidogrel necesita CYP2C19 para formar parte de su metabolito activo. Existe riesgo teórico/clinicamente plausible de menor efecto antiagregante de clopidogrel.',
    conducta:'En pacientes con alto riesgo trombótico, revisar la necesidad de la combinación y monitorizar eficacia clínica; considerar una alternativa que no interfiera con CYP2C19 cuando sea apropiado.',
    mecanismo:'Menor bioactivación de clopidogrel por inhibición de CYP2C19.',
    source_key:'DM_MODAFINIL_2026',audit_verified:true,evidence_type:'mechanistic_inference'
  });

  /* NOOPIRAM / piracetam */
  upsertClass({
    id:'NOOPIRAM-ANTIPLATELET-02016',a:'PIRACETAM',b:'ANTIPLATELETS',nivel:'Moderada/Alta',
    resumen:'Piracetam disminuye la agregación plaquetaria y puede prolongar el tiempo de sangrado. Con aspirina, clopidogrel, ticagrelor, prasugrel u otros antiagregantes puede aumentar el riesgo hemorrágico.',
    conducta:'Valorar indicación y riesgo de sangrado. Vigilar equimosis, epistaxis, hemorragia gastrointestinal u otros signos; extremar precaución antes de cirugía.',
    mecanismo:'Efecto de piracetam sobre función plaquetaria sumado a inhibición farmacológica de la agregación.',
    source_key:'PIRACETAM_SPC',audit_verified:true
  });
  upsertClass({
    id:'NOOPIRAM-ANTICOAG-02016',a:'PIRACETAM',b:'ANTICOAGS',nivel:'Moderada/Alta',
    resumen:'Piracetam puede aumentar el riesgo de sangrado al combinarse con anticoagulantes. Con acenocumarol se observaron cambios adicionales en agregación plaquetaria y parámetros hemostáticos aun sin cambiar la dosis necesaria para el INR.',
    conducta:'Monitorizar signos de sangrado y el parámetro anticoagulante apropiado (por ejemplo INR con warfarina/acenocumarol). Reevaluar antes de procedimientos invasivos.',
    mecanismo:'Efecto hemorreológico y antiagregante de piracetam añadido a la anticoagulación.',
    source_key:'PIRACETAM_SPC',audit_verified:true
  });
  upsertClass({
    id:'NOOPIRAM-NSAID-02016',a:'PIRACETAM',b:'NSAIDS',nivel:'Moderada',
    resumen:'Piracetam reduce la agregación plaquetaria; asociarlo con AINE puede aumentar el riesgo de sangrado, especialmente gastrointestinal, aunque la magnitud exacta de esta interacción no está bien cuantificada.',
    conducta:'Usar el AINE a la menor dosis/tiempo necesarios, vigilar sangrado y evitar duplicidad de factores hemorrágicos cuando sea posible.',
    mecanismo:'Alteración plaquetaria por piracetam + toxicidad gastrointestinal/plaquetaria de AINE.',
    source_key:'PIRACETAM_SPC',audit_verified:true,evidence_type:'pharmacodynamic_inference'
  });
  upsertClass({
    id:'NOOPIRAM-AED-02016',a:'PIRACETAM',b:'PIRACETAM_AEDS_STUDIED',nivel:'Baja',
    resumen:'En pacientes epilépticos con dosis estables, piracetam 20 g/día durante 4 semanas no modificó los niveles máximos ni mínimos de carbamazepina, fenitoína, fenobarbital o valproato.',
    conducta:'No se espera un ajuste automático por interacción farmacocinética. Mantener la monitorización clínica habitual de crisis y toxicidad del antiepiléptico.',
    mecanismo:'Piracetam se elimina principalmente sin cambios por vía renal y tiene bajo potencial de interacción metabólica.',
    source_key:'PIRACETAM_SPC',audit_verified:true
  });
  upsertClass({
    id:'NOOPIRAM-THYROID-02016',a:'PIRACETAM',b:'THYROID_HORMONES',nivel:'Moderada',
    resumen:'Se han comunicado confusión, irritabilidad y trastornos del sueño durante el tratamiento concomitante de piracetam con hormonas tiroideas T3/T4.',
    conducta:'Monitorizar cambios conductuales, confusión, irritabilidad e insomnio; reevaluar la combinación si aparecen.',
    mecanismo:'Interacción farmacodinámica descrita; mecanismo exacto no establecido.',
    source_key:'PIRACETAM_SPC',audit_verified:true
  });
  upsertExact({
    id:'NOOPIRAM-HALOPERIDOL-02016',a:'Piracetam',b:'Haloperidol',nivel:'Baja',
    resumen:'Existen datos experimentales antiguos que sugieren que piracetam puede potenciar algunos efectos de neurolépticos como haloperidol, pero la relevancia clínica en humanos no está bien establecida.',
    conducta:'Si se usan juntos, monitorizar rigidez, temblor, acatisia, somnolencia u otros efectos extrapiramidales; interpretar esta alerta como evidencia limitada, no como contraindicación.',
    mecanismo:'Posible modulación de la transmisión dopaminérgica; evidencia principalmente experimental.',
    source_key:'PUBMED_PIRACETAM_NEUROLEPTICS',audit_verified:true,evidence_type:'limited_preclinical_evidence'
  });

  K.version='0.20.16';
  K.updated_at='2026-10-15';
  K.meta.alert_noopiram_audit_version='0.20.16';
  K.meta.modafinil_added=true;
  K.meta.piracetam_interactions_expanded=true;
  K.meta.modafinil_interactions_expanded=true;
  K.meta.noopiram_aed_levels_checked=true;
  K.meta.noopiram_bleeding_risk_checked=true;
  K.meta.alertex_haloperidol_checked=true;
  K.meta.alertex_noopiram_checked=true;
  K.meta.alertex_antihypertensive_monitoring=true;
  K.meta.audit_regression_cases=uniq([...(K.meta.audit_regression_cases||[]),
    'ALERTEX/Modafinilo + Fenitoína = MONITORIZAR niveles/toxicidad',
    'ALERTEX/Modafinilo + Carbamazepina = MONITORIZAR posible menor modafinilo',
    'ALERTEX/Modafinilo + Haloperidol = MONITORIZAR eficacia/activación',
    'ALERTEX/Modafinilo + Clopidogrel = MONITORIZAR posible menor bioactivación',
    'ALERTEX/Modafinilo + NOOPIRAM/Piracetam = PRECAUCIÓN, sin interacción PK directa demostrada',
    'NOOPIRAM/Piracetam + antiagregante = MONITORIZAR sangrado',
    'NOOPIRAM/Piracetam + anticoagulante = MONITORIZAR sangrado',
    'NOOPIRAM/Piracetam + Carbamazepina/Fenitoína/Fenobarbital/Valproato = sin cambio de niveles descrito'
  ]);
  K.meta.class_rule_count=K.class_rules.length;
  K.meta.exact_rule_count=K.exact_rules.length;
  K.meta.group_count=Object.keys(K.groups).length;
  K.meta.source_count=Object.keys(K.sources).length;
  window.VCB_INTERACTION_ALERT_NOOPIRAM_VERSION='0.20.16';
})();