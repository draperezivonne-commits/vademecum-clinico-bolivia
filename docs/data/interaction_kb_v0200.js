/* Vademécum Clínico Bolivia · Base de interacciones v0.20.0 */
window.VCB_INTERACTION_KB = {
  "version": "0.20.0",
  "updated_at": "2026-09-05",
  "scope": "Interacciones farmacológicas clínicamente relevantes para prescripción; reglas exactas y por clase. No sustituye una base regulatoria completa ni el juicio clínico.",
  "sources": {
    "FDA_OPIOID_BENZO": {"title": "FDA: opioides + benzodiacepinas / depresores del SNC", "url": "https://www.fda.gov/drugs/drug-safety-communications/fda-updates-prescribing-information-all-opioid-pain-medicines-provide-additional-guidance-safe-use"},
    "FDA_GABAPENTINOID": {"title": "FDA: gabapentina/pregabalina y riesgo de depresión respiratoria", "url": "https://www.fda.gov/safety/medical-product-safety-information/neurontin-gralise-horizant-gabapentin-and-lyrica-lyrica-cr-pregabalin-drug-safety-communication"},
    "FDA_SILDENAFIL": {"title": "FDA: sildenafilo, nitratos y otras interacciones", "url": "https://www.accessdata.fda.gov/drugsatfda_docs/label/2015/020895s045lbl.pdf"},
    "FDA_TIZANIDINE": {"title": "FDA: tizanidina (Zanaflex) interacciones", "url": "https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/020397s028lbl.pdf"},
    "FDA_LINEZOLID": {"title": "FDA: linezolid e interacción serotoninérgica", "url": "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/206473s011lbl.pdf"},
    "FDA_ELIQUIS": {"title": "FDA: apixabán, inductores y riesgo hemorrágico", "url": "https://www.accessdata.fda.gov/drugsatfda_docs/nda/2012/202155Orig1s000Lbl_ini.pdf"},
    "FDA_ENTRESTO": {"title": "FDA: sacubitrilo/valsartán y ACEI", "url": "https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/218591Orig1s000%2C207620Orig1s025lbl.pdf"},
    "FDA_MEROPENEM": {"title": "FDA: meropenem y ácido valproico", "url": "https://www.accessdata.fda.gov/drugsatfda_docs/label/2020/202106s007lbl.pdf"},
    "FDA_CLARITHRO": {"title": "FDA: claritromicina y múltiples interacciones", "url": "https://www.accessdata.fda.gov/drugsatfda_docs/label/2017/050757s021lbl.pdf"},
    "FDA_CLOPIDOGREL": {"title": "FDA: clopidogrel y omeprazol/esomeprazol", "url": "https://www.accessdata.fda.gov/drugsatfda_docs/label/2017/020839s068lbl.pdf"},
    "FDA_ALLOPURINOL": {"title": "FDA: allopurinol y azatioprina/mercaptopurina", "url": "https://www.accessdata.fda.gov/drugsatfda_docs/label/2022/020298s012lbl.pdf"},
    "FDA_CITALOPRAM": {"title": "FDA: citalopram, MAOI y QT", "url": "https://www.accessdata.fda.gov/drugsatfda_docs/label/2023/215428s002lbl.pdf"},
    "FDA_SEROTONERGIC": {"title": "FDA: antidepresivos y síndrome serotoninérgico", "url": "https://www.accessdata.fda.gov/drugsatfda_docs/label/2021/022567s022lbl.pdf"},
    "FDA_NSAID": {"title": "FDA: naproxeno/NSAID, litio y metotrexato", "url": "https://www.accessdata.fda.gov/drugsatfda_docs/label/2019/021926s016lbl.pdf"},
    "FDA_LEVOTHYROXINE": {"title": "FDA: levotiroxina con calcio/hierro", "url": "https://www.accessdata.fda.gov/drugsatfda_docs/label/2017/021402s024s028lbl.pdf"},
    "FDA_METFORMIN": {"title": "FDA: metformina y topiramato/inhibidores de anhidrasa carbónica", "url": "https://www.accessdata.fda.gov/drugsatfda_docs/label/2017/021178s016s017lbl.pdf"},
    "FDA_DIGOXIN": {"title": "FDA: digoxina, P-gp y trastornos electrolíticos", "url": "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/021648s013lbl.pdf"},
    "FDA_TMP_SMX": {"title": "FDA: trimetoprim/sulfametoxazol e hiperpotasemia", "url": "https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/018598s055lbl.pdf"},
    "FDA_TACROLIMUS": {"title": "FDA: tacrolimus e inhibidores/inductores CYP3A", "url": "https://www.accessdata.fda.gov/drugsatfda_docs/label/2019/204096s007lbl.pdf"}
  },
  "groups": {
    "OPIOIDS": ["Tramadol","Morfina","Codeína","Tapentadol","Fentanilo","Oxicodona","Hidrocodona","Buprenorfina","Metadona","Meperidina","Petidina"],
    "BENZOS": ["Clonazepam","Diazepam","Alprazolam","Lorazepam","Midazolam","Bromazepam","Clotiazepam","Clobazam","Nitrazepam","Temazepam"],
    "GABAPENTINOIDS": ["Pregabalina","Gabapentina"],
    "Z_DRUGS": ["Zolpidem","Zopiclona","Eszopiclona"],
    "SEDATING_ANTIHISTAMINES": ["Difenhidramina","Hidroxicina","Prometazina","Clorfeniramina"],
    "ANTIPSYCHOTICS": ["Haloperidol","Risperidona","Olanzapina","Quetiapina","Clozapina","Clorpromazina","Levomepromazina","Ziprasidona","Pimozida","Aripiprazol"],
    "NSAIDS": ["Diclofenaco","Ibuprofeno","Ketorolaco","Naproxeno","Ketoprofeno","Meloxicam","Piroxicam","Celecoxib","Etoricoxib","Dexketoprofeno","Indometacina","Aceclofenaco"],
    "ANTICOAGS": ["Warfarina","Acenocumarol","Apixabán","Rivaroxabán","Dabigatrán","Edoxabán","Heparina","Enoxaparina","Dalteparina","Fondaparinux"],
    "DOACS": ["Apixabán","Rivaroxabán","Dabigatrán","Edoxabán"],
    "ANTIPLATELETS": ["Ácido acetilsalicílico","Aspirina","Clopidogrel","Prasugrel","Ticagrelor","Cilostazol"],
    "SSRIs": ["Sertralina","Fluoxetina","Paroxetina","Citalopram","Escitalopram","Fluvoxamina"],
    "SNRIs": ["Venlafaxina","Desvenlafaxina","Duloxetina"],
    "TCAs": ["Amitriptilina","Clomipramina","Imipramina","Nortriptilina"],
    "MAOIs": ["Fenelzina","Tranilcipromina","Isocarboxazida"],
    "SEROTONERGICS": ["Sertralina","Fluoxetina","Paroxetina","Citalopram","Escitalopram","Fluvoxamina","Venlafaxina","Desvenlafaxina","Duloxetina","Amitriptilina","Clomipramina","Imipramina","Nortriptilina","Tramadol","Fentanilo","Metadona","Meperidina","Petidina","Buspirona","Litio","Sumatriptán","Rizatriptán","Zolmitriptán","Dextrometorfano"],
    "QT_HIGH": ["Amiodarona","Sotalol","Quinidina","Procainamida","Haloperidol","Ziprasidona","Pimozida","Citalopram","Escitalopram","Metadona","Ondansetrón","Droperidol","Azitromicina","Claritromicina","Eritromicina","Levofloxacino","Moxifloxacino","Fluconazol"],
    "ACEI": ["Captopril","Enalapril","Lisinopril","Ramipril","Perindopril"],
    "ARB": ["Losartán","Valsartán","Candesartán","Irbesartán","Telmisartán","Olmesartán"],
    "ARNI": ["Sacubitrilo + Valsartán","Sacubitril + Valsartán","Sacubitrilo","Sacubitril"],
    "RAS_BLOCKERS": ["Captopril","Enalapril","Lisinopril","Ramipril","Perindopril","Losartán","Valsartán","Candesartán","Irbesartán","Telmisartán","Olmesartán","Sacubitrilo","Sacubitril"],
    "K_SPARING": ["Espironolactona","Eplerenona","Amilorida","Triamtereno"],
    "POTASSIUM": ["Cloruro de potasio","Citrato de potasio","Gluconato de potasio"],
    "DIURETICS": ["Furosemida","Bumetanida","Torasemida","Hidroclorotiazida","Clortalidona","Indapamida","Espironolactona","Eplerenona"],
    "THIAZIDES": ["Hidroclorotiazida","Clortalidona","Indapamida"],
    "NITRATES": ["Nitroglicerina","Dinitrato de isosorbida","Mononitrato de isosorbida","Isosorbida"],
    "PDE5": ["Sildenafilo","Tadalafilo","Vardenafilo","Avanafilo"],
    "ALPHA_BLOCKERS": ["Tamsulosina","Doxazosina","Terazosina","Prazosina"],
    "BETA_BLOCKERS": ["Propranolol","Metoprolol","Carvedilol","Bisoprolol","Atenolol","Nebivolol","Labetalol"],
    "NON_DHP_CCB": ["Verapamilo","Diltiazem"],
    "STATIN_CYP3A": ["Simvastatina","Lovastatina","Atorvastatina"],
    "STRONG_CYP3A_INHIBITORS": ["Claritromicina","Itraconazol","Ketoconazol","Posaconazol","Ritonavir","Cobicistat"],
    "STRONG_CYP3A_INDUCERS": ["Rifampicina","Rifampin","Carbamazepina","Fenitoína","Fenobarbital","Primidona"],
    "CARBAPENEMS": ["Meropenem","Imipenem","Ertapenem","Doripenem"],
    "VALPROATES": ["Ácido valproico","Valproato de sodio","Valproato","Divalproato"],
    "ENZYME_INDUCER_AEDS": ["Carbamazepina","Fenitoína","Fenobarbital","Primidona","Oxcarbazepina"],
    "ESTROGEN_CONTRACEPTIVES": ["Etinilestradiol","Estradiol"],
    "SULFONYLUREAS": ["Glibenclamida","Glimepirida","Gliclazida","Glipizida"],
    "INSULINS": ["Insulina regular","Insulina NPH","Insulina glargina","Insulina lispro","Insulina aspart","Insulina degludec","Insulina"],
    "CATIONS": ["Carbonato de calcio","Citrato de calcio","Gluconato de calcio","Cloruro de calcio","Sulfato ferroso","Fumarato ferroso","Gluconato ferroso","Hidróxido de magnesio","Óxido de magnesio","Hidróxido de aluminio","Carbonato de magnesio"],
    "FLUOROQUINOLONES": ["Ciprofloxacino","Levofloxacino","Moxifloxacino","Norfloxacino"],
    "TETRACYCLINES": ["Doxiciclina","Tetraciclina","Minociclina"],
    "BISPHOSPHONATES": ["Alendronato","Risedronato","Ibandronato"],
    "CNIs": ["Tacrolimus","Ciclosporina"],
    "AZOLES": ["Fluconazol","Itraconazol","Voriconazol","Ketoconazol","Posaconazol"],
    "MACROLIDES": ["Claritromicina","Eritromicina","Azitromicina"],
    "SYSTEMIC_STEROIDS": ["Prednisona","Prednisolona","Dexametasona","Metilprednisolona"],
    "PPI_CYP2C19": ["Omeprazol","Esomeprazol"],
    "TMP": ["Trimetoprim","Trimetoprima"],
    "LOOP_DIURETICS": ["Furosemida","Bumetanida","Torasemida"],
    "LINEZOLID": ["Linezolid"],
    "TRAMADOL": ["Tramadol"],
    "ANTIDEP_SEROTONERGICS": ["Sertralina","Fluoxetina","Paroxetina","Citalopram","Escitalopram","Fluvoxamina","Venlafaxina","Desvenlafaxina","Duloxetina","Amitriptilina","Clomipramina","Imipramina","Nortriptilina"],
    "LITHIUM": ["Litio","Carbonato de litio"],
    "METHOTREXATE": ["Metotrexato"],
    "COLCHICINE": ["Colchicina"],
    "DIGOXIN": ["Digoxina"],
    "METOCLOPRAMIDE": ["Metoclopramida"],
    "LEVODOPA": ["Levodopa","Levodopa + Carbidopa","Levodopa + Benserazida"],
    "LEVOTHYROXINE": ["Levotiroxina"],
    "CLOZAPINE": ["Clozapina"],
    "MIDAZOLAM": ["Midazolam"],
    "TMP_SMX_COMPONENTS": ["Trimetoprim","Trimetoprima","Sulfametoxazol"],
    "HYPOK_DIURETICS": ["Furosemida","Bumetanida","Torasemida","Hidroclorotiazida","Clortalidona","Indapamida"],
    "METFORMIN": ["Metformina"],
    "TOPIRAMATE": ["Topiramato"]
  },
  "class_rules": [],
  "exact_rules": [],
  "meta": {"source_count":19,"group_count":65,"class_rule_count":59,"exact_rule_count":64,"estimated_class_pair_coverage":2115,"design":"reglas exactas + familias farmacológicas + alertas de polifarmacia"}
};
(function(K){
const R=K.class_rules,E=K.exact_rules;
const c=(id,a,b,nivel,resumen,conducta,mecanismo,source_key,same_group=false)=>R.push({id,a,b,nivel,resumen,conducta,mecanismo,source_key,...(same_group?{same_group:true}:{})});
const e=(id,a,b,nivel,resumen,conducta,mecanismo,source_key)=>E.push({id,a,b,nivel,resumen,conducta,mecanismo,source_key});
c('CNS-01','OPIOIDS','BENZOS','Alta','Sedación profunda, depresión respiratoria, coma y muerte.','Evitar cuando sea posible; si la asociación es imprescindible, usar las dosis mínimas efectivas y vigilancia respiratoria estrecha.','Depresión aditiva del sistema nervioso central.','FDA_OPIOID_BENZO');
c('CNS-02','OPIOIDS','GABAPENTINOIDS','Moderada/Alta','Aumenta la sedación y el riesgo de depresión respiratoria, sobre todo en pacientes con factores de riesgo.','Valorar necesidad, iniciar con dosis bajas y monitorizar sedación y respiración.','Depresión aditiva del SNC.','FDA_GABAPENTINOID');
c('CNS-03','OPIOIDS','Z_DRUGS','Moderada/Alta','Puede aumentar sedación, deterioro psicomotor y depresión respiratoria.','Evitar o minimizar la asociación y monitorizar estrechamente.','Depresión aditiva del SNC.','FDA_OPIOID_BENZO');
c('CNS-04','OPIOIDS','SEDATING_ANTIHISTAMINES','Moderada','Puede aumentar sedación y depresión del SNC.','Usar con precaución; evitar actividades de riesgo y vigilar somnolencia/respiración.','Depresión aditiva del SNC.','FDA_OPIOID_BENZO');
c('CNS-05','OPIOIDS','ANTIPSYCHOTICS','Moderada/Alta','Puede aumentar sedación, hipotensión y depresión respiratoria.','Usar solo con indicación clara y monitorizar estado mental, presión arterial y respiración.','Depresión aditiva del SNC.','FDA_OPIOID_BENZO');
c('CNS-06','BENZOS','Z_DRUGS','Moderada/Alta','Sedación y deterioro psicomotor aditivos; puede aumentar el riesgo de caídas y depresión respiratoria.','Evitar duplicidad de hipnóticos/sedantes si no es imprescindible.','Depresión aditiva del SNC.','FDA_OPIOID_BENZO');
c('NSAID-01','NSAIDS','NSAIDS','Alta','Duplicidad de AINE: aumenta el riesgo gastrointestinal, renal y hemorrágico sin beneficio analgésico proporcional.','Evitar la asociación de dos AINE salvo indicación excepcional y supervisada.','Duplicidad farmacológica.','FDA_ELIQUIS',true);
c('BLEED-01','ANTICOAGS','NSAIDS','Moderada/Alta','Aumenta el riesgo de sangrado, especialmente gastrointestinal.','Evitar si existe alternativa o usar el menor tiempo posible con vigilancia de sangrado y función renal.','Efectos sobre hemostasia y mucosa gastrointestinal aditivos.','FDA_ELIQUIS');
c('BLEED-02','ANTICOAGS','ANTIPLATELETS','Moderada/Alta','Aumenta el riesgo de sangrado mayor.','Usar solo cuando exista una indicación antitrombótica clara; monitorizar signos de sangrado.','Efectos antitrombóticos aditivos.','FDA_ELIQUIS');
c('BLEED-03','ANTICOAGS','ANTICOAGS','Alta','Duplicidad anticoagulante con riesgo elevado de hemorragia.','Evitar salvo transición, puente u otra estrategia protocolizada y supervisada.','Anticoagulación aditiva.','FDA_ELIQUIS',true);
c('BLEED-04','ANTIPLATELETS','NSAIDS','Moderada/Alta','Aumenta el riesgo de sangrado gastrointestinal y otros sangrados.','Evitar si es posible; si se requiere, valorar gastroprotección y vigilar sangrado.','Hemostasia alterada + lesión gastrointestinal.','FDA_CLOPIDOGREL');
c('BLEED-05','ANTICOAGS','SSRIs','Moderada','Puede aumentar el riesgo de sangrado por efecto plaquetario serotoninérgico sumado a la anticoagulación.','Vigilar signos de sangrado, especialmente al iniciar o cambiar dosis.','Alteración de la agregación plaquetaria + anticoagulación.','FDA_SEROTONERGIC');
c('BLEED-06','ANTICOAGS','SNRIs','Moderada','Puede aumentar el riesgo de sangrado.','Vigilar signos de sangrado, especialmente al iniciar o cambiar dosis.','Alteración de la agregación plaquetaria + anticoagulación.','FDA_SEROTONERGIC');
c('BLEED-07','ANTIPLATELETS','SSRIs','Moderada','Puede aumentar el riesgo de sangrado.','Vigilar sangrado, hematomas y tolerancia gastrointestinal.','Efecto antiplaquetario funcional aditivo.','FDA_SEROTONERGIC');
c('BLEED-08','ANTIPLATELETS','SNRIs','Moderada','Puede aumentar el riesgo de sangrado.','Vigilar sangrado, hematomas y tolerancia gastrointestinal.','Efecto antiplaquetario funcional aditivo.','FDA_SEROTONERGIC');
c('SER-01','MAOIs','SSRIs','Contraindicada','Riesgo de síndrome serotoninérgico potencialmente mortal.','No asociar; respetar los periodos de lavado indicados por las fichas técnicas.','Exceso de actividad serotoninérgica.','FDA_SEROTONERGIC');
c('SER-02','MAOIs','SNRIs','Contraindicada','Riesgo de síndrome serotoninérgico potencialmente mortal.','No asociar; respetar periodos de lavado.','Exceso de actividad serotoninérgica.','FDA_SEROTONERGIC');
c('SER-03','MAOIs','TCAs','Contraindicada','Riesgo de toxicidad grave, síndrome serotoninérgico y crisis hipertensiva.','No asociar; respetar periodos de lavado.','Inhibición de monoaminooxidasa + aumento de monoaminas.','FDA_SEROTONERGIC');
c('SER-04','MAOIs','OPIOIDS','Alta','Algunos opioides serotoninérgicos pueden precipitar síndrome serotoninérgico o excitación grave.','Evitar; confirmar específicamente el opioide y el intervalo de lavado.','Interacción monoaminérgica/serotoninérgica.','FDA_SEROTONERGIC');
c('SER-05','SEROTONERGICS','SEROTONERGICS','Moderada','Dos fármacos serotoninérgicos pueden aumentar el riesgo de síndrome serotoninérgico; el riesgo varía mucho según los agentes y dosis.','No asumir contraindicación automática: revisar la pareja concreta, dosis y síntomas de alarma.','Potenciación serotoninérgica.','FDA_SEROTONERGIC',true);
c('SER-06','LINEZOLID','ANTIDEP_SEROTONERGICS','Alta','Riesgo de síndrome serotoninérgico, potencialmente grave.','Evitar salvo necesidad urgente; si no hay alternativa, seguir la estrategia de suspensión y monitorización de la ficha técnica.','Linezolid tiene actividad inhibidora de MAO.','FDA_LINEZOLID');
c('SER-07','LINEZOLID','OPIOIDS','Moderada/Alta','Algunos opioides serotoninérgicos pueden aumentar el riesgo de síndrome serotoninérgico con linezolid.','Revisar el opioide concreto; evitar los de mayor actividad serotoninérgica cuando sea posible y monitorizar.','Actividad MAO de linezolid + potencial serotoninérgico.','FDA_LINEZOLID');
c('SER-08','TRAMADOL','ANTIDEP_SEROTONERGICS','Moderada/Alta','Aumenta el riesgo de síndrome serotoninérgico y convulsiones.','Valorar alternativa y vigilar clonus, hiperreflexia, agitación, fiebre y síntomas autonómicos.','Potenciación serotoninérgica y reducción del umbral convulsivo.','FDA_SEROTONERGIC');
c('QT-01','QT_HIGH','QT_HIGH','Moderada/Alta','Puede aumentar el riesgo de prolongación del QT y arritmia ventricular, especialmente con otros factores predisponentes.','Revisar QTc, electrolitos, dosis y factores de riesgo; evitar múltiples fármacos de alto riesgo cuando sea posible.','Efectos electrofisiológicos aditivos sobre repolarización.','FDA_CITALOPRAM',true);
c('RAS-01','ACEI','ARB','Alta','El bloqueo dual del sistema renina-angiotensina aumenta riesgo de hipotensión, hiperpotasemia y deterioro renal.','Evitar de rutina salvo indicación especializada y monitorización estricta.','Bloqueo dual del sistema renina-angiotensina.','FDA_ENTRESTO');
c('RAS-02','RAS_BLOCKERS','K_SPARING','Moderada/Alta','Puede causar hiperpotasemia y deterioro de función renal.','Controlar potasio y función renal; ajustar según contexto clínico.','Reducción de aldosterona + retención de potasio.','FDA_ENTRESTO');
c('RAS-03','RAS_BLOCKERS','POTASSIUM','Moderada/Alta','Puede producir hiperpotasemia clínicamente importante.','Evitar suplementación innecesaria y monitorizar potasio/función renal.','Aumento del potasio por mecanismos aditivos.','FDA_ENTRESTO');
c('PDE-01','NITRATES','PDE5','Contraindicada','Puede producir hipotensión grave y potencialmente peligrosa.','No asociar nitratos con inhibidores PDE5.','Potenciación de la vía NO–cGMP y vasodilatación.','FDA_SILDENAFIL');
c('PDE-02','PDE5','ALPHA_BLOCKERS','Moderada','Puede producir hipotensión sintomática.','Asegurar estabilidad hemodinámica y usar dosis iniciales bajas; monitorizar presión arterial.','Vasodilatación aditiva.','FDA_SILDENAFIL');
c('RATE-01','BETA_BLOCKERS','NON_DHP_CCB','Moderada/Alta','Riesgo de bradicardia, bloqueo AV, hipotensión y deterioro de función ventricular.','Usar con vigilancia de frecuencia, ECG y presión arterial; evitar en trastornos de conducción no controlados.','Efectos cronotrópicos e inotrópicos negativos aditivos.','FDA_ENTRESTO');
c('DOAC-01','DOACS','STRONG_CYP3A_INDUCERS','Alta','Puede disminuir la exposición al anticoagulante y aumentar el riesgo trombótico.','Evitar la asociación cuando corresponda a la ficha del DOAC; elegir alternativa.','Inducción de CYP3A4/P-gp y reducción de exposición.','FDA_ELIQUIS');
c('DOAC-02','DOACS','STRONG_CYP3A_INHIBITORS','Moderada/Alta','Puede aumentar la exposición de algunos DOAC y el riesgo de sangrado.','Revisar la ficha del DOAC específico para reducción de dosis o evitación.','Inhibición CYP3A4/P-gp.','FDA_ELIQUIS');
c('STATIN-01','STATIN_CYP3A','STRONG_CYP3A_INHIBITORS','Alta','Puede elevar concentraciones de estatinas metabolizadas por CYP3A y aumentar riesgo de miopatía/rabdomiólisis.','Evitar simvastatina/lovastatina con inhibidores potentes; considerar suspender o elegir estatina alternativa según agente.','Inhibición del metabolismo CYP3A.','FDA_CLARITHRO');
c('AED-01','CARBAPENEMS','VALPROATES','Alta','Los carbapenémicos pueden reducir marcadamente los niveles de valproato y precipitar convulsiones.','Evitar la asociación; aumentar valproato puede no corregir la interacción. Considerar otro antibiótico o anticonvulsivante adicional.','Reducción marcada de exposición a valproato.','FDA_MEROPENEM');
c('AED-02','ENZYME_INDUCER_AEDS','ESTROGEN_CONTRACEPTIVES','Moderada/Alta','Puede reducir la eficacia anticonceptiva hormonal.','Usar un método anticonceptivo alternativo o adicional y revisar la ficha del anticonvulsivante.','Inducción enzimática que aumenta el metabolismo hormonal.','FDA_ELIQUIS');
c('ABS-01','FLUOROQUINOLONES','CATIONS','Moderada','Calcio, hierro, magnesio o aluminio pueden reducir la absorción oral de fluoroquinolonas.','Separar las tomas según la ficha del antibiótico y del suplemento/antiácido.','Quelación gastrointestinal.','FDA_TIZANIDINE');
c('ABS-02','TETRACYCLINES','CATIONS','Moderada','Calcio, hierro, magnesio o aluminio pueden reducir la absorción oral de tetraciclinas.','Separar las tomas según ficha técnica.','Quelación gastrointestinal.','FDA_TIZANIDINE');
c('ABS-03','BISPHOSPHONATES','CATIONS','Moderada','Los cationes disminuyen de forma importante la absorción oral del bisfosfonato.','Administrar el bisfosfonato en ayunas y separar de calcio/hierro/antiácidos según ficha técnica.','Complejación/absorción gastrointestinal reducida.','FDA_TIZANIDINE');
c('ABS-04','LEVOTHYROXINE','CATIONS','Moderada','Calcio, hierro, magnesio o aluminio pueden disminuir la absorción de levotiroxina.','Separar la administración según ficha técnica y monitorizar TSH cuando proceda.','Complejación/adsorción gastrointestinal.','FDA_LEVOTHYROXINE');
c('GLU-01','SULFONYLUREAS','MACROLIDES','Moderada','Algunos macrólidos, especialmente claritromicina, pueden aumentar el riesgo de hipoglucemia con sulfonilureas.','Monitorizar glucemia y síntomas de hipoglucemia; ajustar según agente.','Inhibición metabólica y aumento de exposición.','FDA_CLARITHRO');
c('GLU-02','INSULINS','BETA_BLOCKERS','Moderada','Los beta-bloqueantes pueden enmascarar síntomas adrenérgicos de hipoglucemia y prolongar episodios en algunos pacientes.','Reforzar monitorización glucémica y educación sobre síntomas no adrenérgicos.','Bloqueo beta de respuesta autonómica.','FDA_CLARITHRO');
c('GLU-03','SULFONYLUREAS','AZOLES','Moderada/Alta','Algunos azoles, especialmente fluconazol, pueden aumentar la exposición a sulfonilureas y causar hipoglucemia.','Monitorizar glucemia y ajustar según el fármaco concreto.','Inhibición metabólica.','FDA_CLARITHRO');
c('TENDON-01','FLUOROQUINOLONES','SYSTEMIC_STEROIDS','Moderada/Alta','Aumenta el riesgo de tendinopatía y rotura tendinosa, especialmente en mayores y pacientes con otros factores de riesgo.','Evitar si existe alternativa en pacientes de alto riesgo; advertir dolor/inflamación tendinosa.','Toxicidad tendinosa aditiva/riesgo predisponente.','FDA_TIZANIDINE');
c('LITH-01','LITHIUM','NSAIDS','Moderada/Alta','Los AINE pueden elevar niveles de litio y causar toxicidad.','Evitar cambios no supervisados; controlar nivel de litio, función renal y síntomas tras iniciar/suspender AINE.','Reducción del aclaramiento renal de litio.','FDA_NSAID');
c('LITH-02','LITHIUM','RAS_BLOCKERS','Moderada/Alta','ACEI/ARA-II pueden aumentar niveles de litio y riesgo de toxicidad.','Monitorizar litio y función renal; considerar ajuste o alternativa.','Cambios en hemodinámica renal y aclaramiento de litio.','FDA_NSAID');
c('LITH-03','LITHIUM','THIAZIDES','Alta','Las tiazidas pueden aumentar de forma importante niveles de litio.','Evitar si es posible o reducir/monitorizar litio estrechamente.','Aumento de reabsorción tubular de litio.','FDA_NSAID');
c('MTX-01','METHOTREXATE','NSAIDS','Moderada/Alta','Los AINE pueden aumentar la exposición/toxicidad de metotrexato, especialmente a dosis altas o con deterioro renal.','Evitar automedicación; monitorizar función renal, hemograma y toxicidad según dosis/contexto.','Reducción del aclaramiento renal de metotrexato.','FDA_NSAID');
c('COL-01','COLCHICINE','STRONG_CYP3A_INHIBITORS','Alta','Puede aumentar marcadamente la exposición a colchicina y causar toxicidad grave.','Evitar o ajustar según ficha; en insuficiencia renal/hepática algunas combinaciones están contraindicadas.','Inhibición de CYP3A4/P-gp.','FDA_CLARITHRO');
c('DIG-01','DIGOXIN','NON_DHP_CCB','Moderada/Alta','Puede aumentar niveles de digoxina y bradicardia/bloqueo AV.','Monitorizar frecuencia, ECG y niveles de digoxina cuando corresponda.','Efectos nodales aditivos y posible inhibición de P-gp.','FDA_DIGOXIN');
c('DIG-02','DIGOXIN','HYPOK_DIURETICS','Moderada','La hipopotasemia inducida por diuréticos puede aumentar la toxicidad de digoxina.','Monitorizar potasio, magnesio, función renal y signos de toxicidad digitálica.','Sensibilización miocárdica a digoxina por trastornos electrolíticos.','FDA_DIGOXIN');
c('D2-01','METOCLOPRAMIDE','ANTIPSYCHOTICS','Moderada/Alta','Aumenta el riesgo de reacciones extrapiramidales, discinesia y síndrome neuroléptico maligno.','Evitar duplicidad de bloqueo dopaminérgico cuando sea posible; vigilar síntomas neurológicos.','Bloqueo dopaminérgico D2 aditivo.','FDA_CITALOPRAM');
c('LEV-01','LEVODOPA','ANTIPSYCHOTICS','Moderada','Muchos antagonistas dopaminérgicos pueden reducir el efecto antiparkinsoniano de levodopa.','Revisar necesidad y elegir antipsicótico con menor antagonismo dopaminérgico cuando proceda.','Antagonismo farmacodinámico dopaminérgico.','FDA_CITALOPRAM');
c('IMM-01','CNIs','AZOLES','Alta','Azoles pueden aumentar niveles de tacrolimus/ciclosporina y nefrotoxicidad.','Requiere ajuste y monitorización de niveles, función renal y toxicidad; considerar alternativa.','Inhibición CYP3A/P-gp.','FDA_TACROLIMUS');
c('IMM-02','CNIs','MACROLIDES','Moderada/Alta','Claritromicina/eritromicina pueden elevar niveles de tacrolimus/ciclosporina.','Evitar macrólidos inhibidores cuando sea posible o monitorizar niveles y función renal.','Inhibición CYP3A/P-gp.','FDA_TACROLIMUS');
c('K-01','RAS_BLOCKERS','TMP_SMX_COMPONENTS','Moderada/Alta','Trimetoprim puede aumentar el riesgo de hiperpotasemia, especialmente con bloqueo del sistema renina-angiotensina.','Monitorizar potasio y función renal; considerar antibiótico alternativo en pacientes de alto riesgo.','Efecto tipo amilorida de trimetoprim + reducción de aldosterona.','FDA_TMP_SMX');
c('K-02','K_SPARING','TMP_SMX_COMPONENTS','Alta','Puede producir hiperpotasemia grave, especialmente en pacientes con insuficiencia renal o edad avanzada.','Evitar si existe alternativa o monitorizar potasio y función renal muy estrechamente.','Retención de potasio por mecanismos aditivos.','FDA_TMP_SMX');
c('GI-01','SYSTEMIC_STEROIDS','NSAIDS','Moderada','Puede aumentar el riesgo de úlcera y sangrado gastrointestinal.','Valorar necesidad, duración, factores de riesgo y gastroprotección cuando esté indicada.','Toxicidad gastrointestinal aditiva.','FDA_NSAID');
c('CYP-01','MIDAZOLAM','STRONG_CYP3A_INHIBITORS','Alta','Puede aumentar marcadamente la exposición a midazolam, con sedación profunda y depresión respiratoria.','Evitar determinadas formulaciones/combinaciones según ficha; si se usa, monitorización estrecha y ajuste.','Inhibición CYP3A4.','FDA_CLARITHRO');
c('ACID-01','METFORMIN','TOPIRAMATE','Moderada','Ambos pueden favorecer acidosis metabólica en pacientes predispuestos.','Vigilar bicarbonato, función renal y síntomas; reevaluar en pacientes de alto riesgo.','Efectos aditivos sobre equilibrio ácido-base.','FDA_METFORMIN');
[
['EX-001','Ciprofloxacino','Tizanidina','Contraindicada','Aumento marcado de tizanidina con hipotensión, somnolencia y deterioro psicomotor.','No asociar.','Ciprofloxacino inhibe CYP1A2 y eleva la exposición a tizanidina.','FDA_TIZANIDINE'],
['EX-002','Fluvoxamina','Tizanidina','Contraindicada','Aumento marcado de tizanidina con hipotensión y sedación.','No asociar.','Inhibición potente de CYP1A2.','FDA_TIZANIDINE'],
['EX-003','Ciprofloxacino','Teofilina','Alta','Puede elevar niveles de teofilina y causar toxicidad, incluida arritmia o convulsiones.','Evitar si es posible; si se usa, monitorizar niveles y toxicidad.','Disminución del aclaramiento de teofilina.','FDA_TIZANIDINE'],
['EX-004','Warfarina','Metronidazol','Alta','Puede aumentar el efecto anticoagulante y el riesgo de sangrado.','Monitorizar INR estrechamente y ajustar warfarina; considerar alternativa cuando corresponda.','Potenciación de la anticoagulación.','FDA_CLARITHRO'],
['EX-005','Warfarina','Trimetoprim','Alta','Puede aumentar el efecto anticoagulante y el riesgo de sangrado.','Monitorizar INR estrechamente y ajustar warfarina.','Potenciación de la anticoagulación.','FDA_TMP_SMX'],
['EX-006','Warfarina','Sulfametoxazol','Alta','Puede aumentar el efecto anticoagulante y el riesgo de sangrado.','Monitorizar INR estrechamente y ajustar warfarina.','Potenciación de la anticoagulación.','FDA_TMP_SMX'],
['EX-007','Warfarina','Fluconazol','Alta','Puede aumentar el efecto anticoagulante y el riesgo de sangrado.','Monitorizar INR estrechamente y ajustar warfarina.','Inhibición metabólica.','FDA_CLARITHRO'],
['EX-008','Warfarina','Amiodarona','Alta','Puede aumentar el efecto anticoagulante y el riesgo de sangrado.','Monitorizar INR estrechamente y ajustar warfarina.','Inhibición metabólica.','FDA_CLARITHRO'],
['EX-009','Warfarina','Claritromicina','Alta','Puede aumentar INR y riesgo hemorrágico.','Monitorizar INR estrechamente.','Interacción farmacocinética/farmacodinámica.','FDA_CLARITHRO'],
['EX-010','Warfarina','Rifampicina','Alta','Puede reducir el efecto de warfarina y aumentar el riesgo trombótico.','Monitorizar INR estrechamente y ajustar durante y después de rifampicina.','Inducción enzimática.','FDA_ELIQUIS'],
['EX-011','Digoxina','Amiodarona','Alta','Puede aumentar niveles de digoxina y riesgo de bradicardia/toxicidad.','Revisar dosis de digoxina, monitorizar niveles, frecuencia y signos de toxicidad.','Interacción farmacocinética y nodal.','FDA_DIGOXIN'],
['EX-012','Digoxina','Verapamilo','Moderada/Alta','Puede elevar niveles de digoxina y aumentar bradicardia/bloqueo AV.','Monitorizar niveles y frecuencia cardiaca; ajustar dosis si corresponde.','P-gp + efectos nodales.','FDA_DIGOXIN'],
['EX-013','Digoxina','Claritromicina','Moderada/Alta','Puede aumentar exposición a digoxina y riesgo de toxicidad.','Vigilar clínica y considerar niveles de digoxina.','Inhibición de P-gp.','FDA_DIGOXIN'],
['EX-014','Simvastatina','Claritromicina','Contraindicada','Aumenta significativamente el riesgo de miopatía y rabdomiólisis.','Suspender simvastatina durante claritromicina o elegir alternativa.','Inhibición potente de CYP3A4.','FDA_CLARITHRO'],
['EX-015','Lovastatina','Claritromicina','Contraindicada','Aumenta significativamente el riesgo de miopatía y rabdomiólisis.','Suspender lovastatina durante claritromicina o elegir alternativa.','Inhibición potente de CYP3A4.','FDA_CLARITHRO'],
['EX-016','Simvastatina','Itraconazol','Alta','Puede aumentar marcadamente simvastatina y riesgo de rabdomiólisis.','Evitar; elegir alternativa o suspender temporalmente.','Inhibición CYP3A4.','FDA_CLARITHRO'],
['EX-017','Simvastatina','Ketoconazol','Alta','Puede aumentar marcadamente simvastatina y riesgo de rabdomiólisis.','Evitar.','Inhibición CYP3A4.','FDA_CLARITHRO'],
['EX-018','Simvastatina','Posaconazol','Alta','Puede aumentar marcadamente simvastatina y riesgo de rabdomiólisis.','Evitar.','Inhibición CYP3A4.','FDA_CLARITHRO'],
['EX-019','Clopidogrel','Omeprazol','Moderada/Alta','Puede disminuir la activación y el efecto antiplaquetario de clopidogrel.','Evitar; preferir un PPI con menor efecto sobre CYP2C19 cuando esté indicado.','Inhibición de CYP2C19.','FDA_CLOPIDOGREL'],
['EX-020','Clopidogrel','Esomeprazol','Moderada/Alta','Puede disminuir la activación y el efecto antiplaquetario de clopidogrel.','Evitar; considerar otro PPI.','Inhibición de CYP2C19.','FDA_CLOPIDOGREL'],
['EX-021','Allopurinol','Azatioprina','Alta','Aumenta mucho la exposición a azatioprina y riesgo de mielosupresión grave.','Reducir sustancialmente la dosis según ficha y monitorizar hemograma, o usar alternativa.','Inhibición de xantina oxidasa.','FDA_ALLOPURINOL'],
['EX-022','Allopurinol','Mercaptopurina','Alta','Aumenta mucho la exposición a mercaptopurina y riesgo de mielosupresión grave.','Reducir sustancialmente la dosis según ficha y monitorizar hemograma, o usar alternativa.','Inhibición de xantina oxidasa.','FDA_ALLOPURINOL'],
['EX-023','Claritromicina','Colchicina','Alta','Puede producir toxicidad grave por colchicina; mayor riesgo con insuficiencia renal/hepática.','Evitar; en insuficiencia renal/hepática puede estar contraindicada.','Inhibición CYP3A4/P-gp.','FDA_CLARITHRO'],
['EX-024','Claritromicina','Carbamazepina','Moderada/Alta','Puede elevar concentraciones de carbamazepina y causar toxicidad neurológica.','Monitorizar niveles y signos de toxicidad; considerar alternativa.','Inhibición CYP3A.','FDA_CLARITHRO'],
['EX-025','Ácido valproico','Lamotrigina','Alta','Valproato aumenta la exposición a lamotrigina y el riesgo de erupción cutánea grave.','Usar esquema de titulación específico y vigilar rash.','Inhibición del metabolismo de lamotrigina.','FDA_SEROTONERGIC'],
['EX-026','Valproato','Lamotrigina','Alta','Valproato aumenta la exposición a lamotrigina y el riesgo de erupción cutánea grave.','Usar esquema de titulación específico y vigilar rash.','Inhibición del metabolismo de lamotrigina.','FDA_SEROTONERGIC'],
['EX-027','Valproato','Topiramato','Alta','Puede causar hiperamonemia y encefalopatía.','Vigilar cambios de estado mental y amonio cuando esté indicado.','Interacción metabólica asociada a hiperamonemia.','FDA_SEROTONERGIC'],
['EX-028','Citalopram','Pimozida','Contraindicada','Aumenta el riesgo de prolongación de QT y arritmias ventriculares.','No asociar.','Efectos sobre QT.','FDA_CITALOPRAM'],
['EX-029','Claritromicina','Pimozida','Contraindicada','Riesgo elevado de prolongación de QT y arritmias graves.','No asociar.','Inhibición CYP3A + QT.','FDA_CLARITHRO'],
['EX-030','Linezolid','Sertralina','Alta','Riesgo de síndrome serotoninérgico.','Evitar salvo necesidad urgente con estrategia de suspensión/monitorización según ficha.','Actividad inhibidora de MAO + serotonérgico.','FDA_LINEZOLID'],
['EX-031','Linezolid','Fluoxetina','Alta','Riesgo de síndrome serotoninérgico; fluoxetina tiene vida media prolongada.','Evitar salvo necesidad urgente y seguir intervalos/monitorización de ficha.','Actividad MAO + serotonérgico.','FDA_LINEZOLID'],
['EX-032','Linezolid','Tramadol','Alta','Riesgo de síndrome serotoninérgico y toxicidad neurológica.','Evitar si existe alternativa; si es imprescindible, monitorización estrecha.','Actividad MAO + efecto serotoninérgico.','FDA_LINEZOLID'],
['EX-033','Sacubitrilo + Valsartán','Enalapril','Contraindicada','Aumenta el riesgo de angioedema con uso concomitante o sin periodo de lavado.','No asociar. Mantener al menos 36 horas entre un ACEI y sacubitrilo/valsartán.','Neprilisina + ACE.','FDA_ENTRESTO'],
['EX-034','Sacubitril + Valsartán','Enalapril','Contraindicada','Aumenta el riesgo de angioedema con uso concomitante o sin periodo de lavado.','No asociar. Mantener al menos 36 horas entre un ACEI y sacubitrilo/valsartán.','Neprilisina + ACE.','FDA_ENTRESTO'],
['EX-035','Metotrexato','Trimetoprim','Alta','Aumenta el riesgo de mielosupresión, mucositis y toxicidad antifolato.','Evitar cuando sea posible; si se usa, monitorización hematológica y renal estricta.','Efectos antifolato aditivos.','FDA_NSAID'],
['EX-036','Metotrexato','Sulfametoxazol','Alta','Aumenta el riesgo de mielosupresión y toxicidad antifolato.','Evitar cuando sea posible; monitorizar hemograma y función renal.','Efectos antifolato aditivos.','FDA_NSAID'],
['EX-037','Metoclopramida','Haloperidol','Moderada/Alta','Aumenta el riesgo de síntomas extrapiramidales y síndrome neuroléptico maligno.','Evitar si existe alternativa; vigilar rigidez, fiebre, alteración mental y movimientos anormales.','Bloqueo dopaminérgico aditivo.','FDA_CITALOPRAM'],
['EX-038','Metoclopramida','Risperidona','Moderada/Alta','Aumenta el riesgo de reacciones extrapiramidales.','Evitar o vigilar estrechamente.','Bloqueo dopaminérgico aditivo.','FDA_CITALOPRAM'],
['EX-039','Clozapina','Carbamazepina','Alta','Aumenta el riesgo de toxicidad hematológica y puede disminuir niveles de clozapina por inducción.','Evitar cuando sea posible; control hematológico especializado.','Riesgo hematológico + inducción enzimática.','FDA_CLARITHRO'],
['EX-040','Clozapina','Fluvoxamina','Alta','Puede aumentar marcadamente concentraciones de clozapina y toxicidad.','Evitar o reducir dosis con monitorización especializada.','Inhibición CYP1A2.','FDA_TIZANIDINE'],
['EX-041','Lamotrigina','Etinilestradiol','Moderada/Alta','Los anticonceptivos con estrógeno pueden reducir concentraciones de lamotrigina; al suspender estrógeno los niveles pueden subir.','Ajustar y monitorizar lamotrigina al iniciar/suspender anticonceptivo.','Inducción de glucuronidación.','FDA_SEROTONERGIC'],
['EX-042','Levotiroxina','Carbonato de calcio','Moderada','Disminuye la absorción de levotiroxina.','Separar al menos 4 horas según ficha.','Quelación gastrointestinal.','FDA_LEVOTHYROXINE'],
['EX-043','Levotiroxina','Sulfato ferroso','Moderada','Disminuye la absorción de levotiroxina.','Separar al menos 4 horas según ficha.','Complejación gastrointestinal.','FDA_LEVOTHYROXINE'],
['EX-044','Amiodarona','Warfarina','Alta','Puede potenciar la anticoagulación y aumentar INR y sangrado.','Monitorizar INR estrechamente y ajustar warfarina.','Inhibición metabólica.','FDA_CLARITHRO'],
['EX-045','Amiodarona','Digoxina','Alta','Puede aumentar niveles de digoxina y favorecer bradicardia/bloqueo.','Revisar dosis, niveles y frecuencia cardiaca.','Interacción farmacocinética + nodal.','FDA_DIGOXIN'],
['EX-046','Rifampicina','Apixabán','Alta','Disminuye la exposición a apixabán y puede aumentar riesgo tromboembólico.','Evitar.','Inducción CYP3A4/P-gp.','FDA_ELIQUIS'],
['EX-047','Carbamazepina','Apixabán','Alta','Disminuye la exposición a apixabán y puede aumentar riesgo tromboembólico.','Evitar.','Inducción CYP3A4/P-gp.','FDA_ELIQUIS'],
['EX-048','Fenitoína','Apixabán','Alta','Disminuye la exposición a apixabán y puede aumentar riesgo tromboembólico.','Evitar.','Inducción CYP3A4/P-gp.','FDA_ELIQUIS'],
['EX-049','Rifampicina','Rivaroxabán','Alta','Puede reducir la exposición al anticoagulante y comprometer eficacia.','Evitar.','Inducción CYP3A4/P-gp.','FDA_ELIQUIS'],
['EX-050','Carbamazepina','Rivaroxabán','Alta','Puede reducir la exposición al anticoagulante y comprometer eficacia.','Evitar.','Inducción CYP3A4/P-gp.','FDA_ELIQUIS'],
['EX-051','Fenitoína','Rivaroxabán','Alta','Puede reducir la exposición al anticoagulante y comprometer eficacia.','Evitar.','Inducción CYP3A4/P-gp.','FDA_ELIQUIS'],
['EX-052','Fluconazol','Fenitoína','Moderada/Alta','Puede aumentar niveles de fenitoína y toxicidad neurológica.','Monitorizar niveles y signos de toxicidad; ajustar si procede.','Inhibición metabólica.','FDA_CLARITHRO'],
['EX-053','Claritromicina','Quetiapina','Moderada/Alta','Puede aumentar exposición a quetiapina con sedación, hipotensión y QT.','Revisar reducción de dosis o alternativa y monitorizar.','Inhibición CYP3A4.','FDA_CLARITHRO'],
['EX-054','Claritromicina','Midazolam','Alta','Puede aumentar notablemente la sedación y depresión respiratoria por midazolam.','Evitar formulaciones orales cuando esté contraindicado y monitorizar estrechamente si se administra por otra vía.','Inhibición CYP3A4.','FDA_CLARITHRO'],
['EX-055','Eritromicina','Simvastatina','Alta','Aumenta el riesgo de miopatía y rabdomiólisis.','Evitar o suspender temporalmente simvastatina durante el macrólido.','Inhibición CYP3A4.','FDA_CLARITHRO'],
['EX-056','Azitromicina','Amiodarona','Moderada/Alta','Puede aumentar el riesgo de prolongación de QT y arritmia ventricular.','Evitar si existe alternativa en pacientes de alto riesgo; controlar ECG/electrolitos.','Efecto aditivo sobre repolarización.','FDA_CITALOPRAM'],
['EX-057','Ondansetrón','Amiodarona','Moderada/Alta','Puede aumentar el riesgo de prolongación de QT y torsades de pointes.','Controlar QTc y electrolitos; evitar múltiples fármacos de alto riesgo.','Efecto aditivo sobre repolarización.','FDA_CITALOPRAM'],
['EX-058','Citalopram','Amiodarona','Moderada/Alta','Puede aumentar el riesgo de prolongación de QT y arritmias.','Evitar o monitorizar ECG/electrolitos según riesgo.','Efecto aditivo sobre QT.','FDA_CITALOPRAM'],
['EX-059','Tramadol','Bupropión','Moderada/Alta','Aumenta el riesgo de convulsiones y puede alterar el efecto analgésico del tramadol.','Valorar alternativa y factores de riesgo convulsivo.','Reducción del umbral convulsivo + CYP2D6.','FDA_SEROTONERGIC'],
['EX-060','Bupropión','Fenelzina','Contraindicada','Riesgo de crisis hipertensiva y toxicidad neurológica.','No asociar; respetar periodo de lavado.','Interacción con MAO.','FDA_SEROTONERGIC'],
['EX-061','Sertralina','Fenelzina','Contraindicada','Riesgo de síndrome serotoninérgico grave.','No asociar; respetar periodos de lavado.','Exceso serotoninérgico.','FDA_SEROTONERGIC'],
['EX-062','Fluoxetina','Fenelzina','Contraindicada','Riesgo de síndrome serotoninérgico grave; fluoxetina requiere lavado prolongado.','No asociar; respetar intervalo específico.','Exceso serotoninérgico.','FDA_SEROTONERGIC'],
['EX-063','Ácido valproico','Meropenem','Alta','Meropenem puede reducir rápidamente niveles de valproato y precipitar crisis.','Evitar; considerar antibiótico alternativo o anticonvulsivante adicional.','Interacción farmacocinética intensa.','FDA_MEROPENEM'],
['EX-064','Valproato de sodio','Meropenem','Alta','Meropenem puede reducir rápidamente niveles de valproato y precipitar crisis.','Evitar; considerar alternativa.','Interacción farmacocinética intensa.','FDA_MEROPENEM']
].forEach(x=>e(...x));
})(window.VCB_INTERACTION_KB);
