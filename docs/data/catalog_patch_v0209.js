/* Vademécum Clínico Bolivia v0.20.9 · ampliación migraña + corrección Tolestan */
(function(){
  const rows=window.VCB_SEED||[];
  const n=s=>(s??'').toString().normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
  const uniq=a=>[...new Set((a||[]).filter(Boolean))];
  function upsert(brand,lab,data){
    const found=rows.find(x=>n(x?.marca)===n(brand)&&(!lab||n(x?.laboratorio).includes(n(lab))))||rows.find(x=>n(x?.marca)===n(brand));
    if(found){
      const keepId=found.id;
      Object.assign(found,data);
      found.id=keepId||data.id;
      found.aliases=uniq([...(found.aliases||[]),...(data.aliases||[])]);
      return found;
    }
    const row=Object.assign({id:data.id,marca:brand,laboratorio:lab||'',bolivia_verificado:true,tipo:'comercial'},data);
    row.aliases=uniq(row.aliases||[]);
    rows.push(row);
    return row;
  }
  const common={bolivia_verificado:true,tipo:'comercial',detalle_completo:true,fecha_fuente:'2026-09-06',nivel_evidencia:'catalogo_farmaceutico_bolivia',cotejo_agemed:'pendiente de conciliación individual'};
  const src={
    tolestan:'https://megalabs.com.bo/producto/tolestan/',
    tolestan2:'https://www.medicamentos.bo/medicamento/tolestan-comprimidos-recubiertos/prospecto/33118',
    sumigran:'https://www.medicamentos.bo/medicamento/sumigran-capsulas/prospecto/34426',
    sumax:'https://www.medicamentos.bo/medicamento/sumax-tabletas-recubiertas/prospecto/32262',
    mitigar:'https://www.medicamentos.bo/medicamento/mitigar-comprimidos/prospecto/36390',
    migradorixina:'https://www.medicamentos.bo/medicamento/migradorixina-comprimidos-recubiertos/prospecto/33106',
    migradol:'https://medicamentos.bo/medicamento/migradol-comprimidos-recubiertos/prospecto/34005',
    migradolalgial:'https://www.medicamentos.bo/medicamento/migra-dolalgial-comprimidos-recubiertos/prospecto/33158',
    cofargot:'https://www.medicamentos.bo/medicamento/cofargot-comprimidos/prospecto/32991',
    cofargotforte:'https://www.medicamentos.bo/medicamento/cofargot-forte-comprimidos-recubiertos/prospecto/32992',
    galmigra:'https://www.medicamentos.bo/medicamento/galmigra-comprimidos/prospecto/39193',
    ergotcaf:'https://www.medicamentos.bo/medicamento/ergotamina-cafeina-comprimidos/prospecto/33970',
    topictal:'https://www.medicamentos.bo/medicamento/topictal-comprimidos-recubiertos/prospecto/32701',
    fluxus:'https://www.medicamentos.bo/medicamento/fluxus-comprimidos/prospecto/32663',
    sigestina:'https://www.medicamentos.bo/medicamento/sigestina-comprimidos-recubiertos/prospecto/35327',
    calmitol:'https://www.medicamentos.bo/medicamento/calmitol-n-comprimidos/prospecto/35994',
    proxen:'https://www.medicamentos.bo/medicamento/proxen-comprimidos-recubiertos/prospecto/42113',
    naproxenoSF:'https://www.medicamentos.bo/medicamento/naproxeno-comprimidos/prospecto/39392'
  };

  upsert('Tolestan','Megalabs',Object.assign({},common,{id:'VCB0209-TOLESTAN',dci:'Sumatriptán + Naproxeno sódico',principios:['Sumatriptán','Naproxeno sódico'],categoria:'Migraña / Antimigrañosos',accion_terapeutica:'Tratamiento agudo de la migraña con o sin aura',presentaciones:['Sumatriptán 85 mg + Naproxeno sódico 500 mg · comprimidos recubiertos · caja x 10'],estado:'Producto confirmado en Bolivia · composición corregida y verificada',fuente:src.tolestan,fuente_secundaria:src.tolestan2,migraine_role:'crisis_aguda',aliases:['Tolestan','sumatriptan naproxeno','sumatriptán naproxeno','naproxeno sumatriptan','naproxeno sumatriptán','sumatriptan 85 mg naproxeno 500 mg','migraña','migrana','antimigrañoso','crisis de migraña']}));
  upsert('Sumigran','Pharmatech Boliviana',Object.assign({},common,{id:'VCB0209-SUMIGRAN',dci:'Sumatriptán + Naproxeno sódico',principios:['Sumatriptán','Naproxeno sódico'],categoria:'Migraña / Antimigrañosos',accion_terapeutica:'Tratamiento agudo de la migraña',presentaciones:['Sumatriptán 85 mg + Naproxeno sódico 500 mg · cápsulas · caja x 2'],estado:'Producto listado en Vademécum Farmacéutico Bolivia',fuente:src.sumigran,migraine_role:'crisis_aguda',aliases:['Sumigran','sumatriptan naproxeno','sumatriptán naproxeno','migraña','migrana','antimigrañoso']}));
  upsert('Sumax','Droguería INTI',Object.assign({},common,{id:'VCB0209-SUMAX',dci:'Sumatriptán',principios:['Sumatriptán'],categoria:'Migraña / Triptanes',accion_terapeutica:'Antimigrañoso selectivo',presentaciones:['Sumatriptán succinato equivalente a Sumatriptán 50 mg · tabletas recubiertas · caja x 2'],estado:'Producto listado en Vademécum Farmacéutico Bolivia',fuente:src.sumax,migraine_role:'crisis_aguda',aliases:['Sumax','sumatriptan 50 mg','sumatriptán 50 mg','triptan','triptán','migraña','migrana','antimigrañoso']}));
  upsert('Mitigar','SAE',Object.assign({},common,{id:'VCB0209-MITIGAR',dci:'Rizatriptán',principios:['Rizatriptán'],laboratorio:'Pacific Pharma Group / SAE',categoria:'Migraña / Triptanes',accion_terapeutica:'Antimigrañoso',presentaciones:['Rizatriptán 10 mg · comprimidos · caja x 4'],estado:'Producto listado en Vademécum Farmacéutico Bolivia',fuente:src.mitigar,migraine_role:'crisis_aguda',aliases:['Mitigar','rizatriptan','rizatriptán','rizatriptan 10 mg','triptan','triptán','migraña','migrana','antimigrañoso']}));
  upsert('Migradorixina','Megalabs',Object.assign({},common,{id:'VCB0209-MIGRADORIXINA',dci:'Clonixinato de lisina + Ergotamina',principios:['Clonixinato de lisina','Ergotamina'],categoria:'Migraña / Antimigrañosos',accion_terapeutica:'Antimigrañoso',presentaciones:['Clonixinato de lisina 125 mg + Ergotamina tartrato 1 mg · comprimidos recubiertos · cajas x 10 y x 20'],estado:'Producto listado en Vademécum Farmacéutico Bolivia',fuente:src.migradorixina,migraine_role:'crisis_aguda',aliases:['Migradorixina','clonixinato de lisina ergotamina','ergotamina clonixinato','migraña','migrana','antimigrañoso']}));
  upsert('Migradol','Delta',Object.assign({},common,{id:'VCB0209-MIGRADOL',dci:'Clonixinato de lisina + Ergotamina',principios:['Clonixinato de lisina','Ergotamina'],categoria:'Migraña / Antimigrañosos',accion_terapeutica:'Antimigrañoso',presentaciones:['Clonixinato de lisina 125 mg + Ergotamina tartrato 1 mg · comprimidos recubiertos · caja x 20'],estado:'Producto listado en Vademécum Farmacéutico Bolivia',fuente:src.migradol,migraine_role:'crisis_aguda',aliases:['Migradol','clonixinato de lisina ergotamina','ergotamina clonixinato','migraña','migrana','antimigrañoso']}));
  upsert('Migra Dolalgial','Megalabs',Object.assign({},common,{id:'VCB0209-MIGRA-DOLALGIAL',dci:'Clonixinato de lisina + Ergotamina',principios:['Clonixinato de lisina','Ergotamina'],categoria:'Migraña / Antimigrañosos',accion_terapeutica:'Antimigrañoso',presentaciones:['Clonixinato de lisina 125 mg + Ergotamina tartrato 1 mg · comprimidos recubiertos · caja x 10'],estado:'Producto listado en Vademécum Farmacéutico Bolivia',fuente:src.migradolalgial,migraine_role:'crisis_aguda',aliases:['Migra Dolalgial','MigraDolalgial','clonixinato de lisina ergotamina','migraña','migrana','antimigrañoso']}));
  upsert('Cofargot','Cofar',Object.assign({},common,{id:'VCB0209-COFARGOT',dci:'Ergotamina + Cafeína',principios:['Ergotamina','Cafeína'],laboratorio:'Breskot Pharma / Cofar',categoria:'Migraña / Ergotamínicos',accion_terapeutica:'Antimigrañoso',presentaciones:['Ergotamina tartrato 1 mg + Cafeína 100 mg · comprimidos · caja x 120'],estado:'Producto listado en Vademécum Farmacéutico Bolivia',fuente:src.cofargot,migraine_role:'crisis_aguda',aliases:['Cofargot','ergotamina cafeina','ergotamina cafeína','migraña','migrana','antimigrañoso']}));
  upsert('Cofargot Forte','Cofar',Object.assign({},common,{id:'VCB0209-COFARGOT-FORTE',dci:'Ergotamina + Paracetamol + Cafeína',principios:['Ergotamina','Paracetamol','Cafeína'],laboratorio:'Breskot Pharma / Cofar',categoria:'Migraña / Ergotamínicos',accion_terapeutica:'Antimigrañoso',presentaciones:['Ergotamina tartrato 1 mg + Paracetamol 650 mg + Cafeína 100 mg · comprimidos recubiertos · caja x 100'],estado:'Producto listado en Vademécum Farmacéutico Bolivia',fuente:src.cofargotforte,migraine_role:'crisis_aguda',aliases:['Cofargot Forte','ergotamina paracetamol cafeina','ergotamina paracetamol cafeína','migraña','migrana','antimigrañoso']}));
  upsert('Galmigra','Laqfagal',Object.assign({},common,{id:'VCB0209-GALMIGRA',dci:'Ergotamina + Cafeína',principios:['Ergotamina','Cafeína'],laboratorio:'Vardhman Exports / Laqfagal',categoria:'Migraña / Ergotamínicos',accion_terapeutica:'Antimigrañoso',presentaciones:['Ergotamina tartrato 1 mg + Cafeína 100 mg · comprimidos · caja x 100'],estado:'Producto listado en Vademécum Farmacéutico Bolivia',fuente:src.galmigra,migraine_role:'crisis_aguda',aliases:['Galmigra','ergotamina cafeina','ergotamina cafeína','migraña','migrana','antimigrañoso']}));
  upsert('Ergotamina + Cafeína','Delta',Object.assign({},common,{id:'VCB0209-ERGOTAMINA-CAFEINA-DELTA',dci:'Ergotamina + Cafeína',principios:['Ergotamina','Cafeína'],categoria:'Migraña / Ergotamínicos',accion_terapeutica:'Antimigrañoso',presentaciones:['Ergotamina tartrato 1 mg + Cafeína 100 mg · comprimidos · caja x 50'],estado:'Producto listado en Vademécum Farmacéutico Bolivia',fuente:src.ergotcaf,migraine_role:'crisis_aguda',aliases:['ergotamina cafeina','ergotamina cafeína','ergotamina 1 mg cafeina 100 mg','migraña','migrana','antimigrañoso']}));

  upsert('Topictal','Tecnofarma',Object.assign({},common,{id:'VCB0209-TOPICTAL',dci:'Topiramato',principios:['Topiramato'],categoria:'Migraña / Profilaxis',accion_terapeutica:'Antiepiléptico, anticonvulsivante y antimigrañoso',presentaciones:['Topiramato 25 mg · comprimidos recubiertos · caja x 28','Topiramato 50 mg · comprimidos recubiertos · caja x 28','Topiramato 100 mg · comprimidos recubiertos · caja x 28'],estado:'Producto listado en Vademécum Farmacéutico Bolivia',fuente:src.topictal,migraine_role:'profilaxis',aliases:['Topictal','topiramato migraña','topiramato migrana','profilaxis migraña','prevención migraña','prevencion migrana','antimigrañoso']}));
  upsert('Fluxus','Tecnofarma',Object.assign({},common,{id:'VCB0209-FLUXUS',dci:'Flunarizina',principios:['Flunarizina'],categoria:'Migraña / Profilaxis',accion_terapeutica:'Flunarizina · vasodilatador periférico y cerebral; utilizada en profilaxis de migraña según contexto clínico',presentaciones:['Flunarizina 10 mg · comprimidos ranurados · caja x 60'],estado:'Producto listado en Vademécum Farmacéutico Bolivia',fuente:src.fluxus,migraine_role:'profilaxis',aliases:['Fluxus','flunarizina 10 mg','flunarizina migraña','flunarizina migrana','profilaxis migraña','prevención migraña','prevencion migrana']}));
  upsert('Sigestina','Lafar',Object.assign({},common,{id:'VCB0209-SIGESTINA',dci:'Flunarizina',principios:['Flunarizina'],categoria:'Migraña / Profilaxis',accion_terapeutica:'Flunarizina · vasodilatador cerebral; utilizada en profilaxis de migraña según contexto clínico',presentaciones:['Flunarizina 10 mg · comprimidos recubiertos · caja x 30'],estado:'Producto listado en Vademécum Farmacéutico Bolivia',fuente:src.sigestina,migraine_role:'profilaxis',aliases:['Sigestina','flunarizina 10 mg','flunarizina migraña','flunarizina migrana','profilaxis migraña','prevención migraña','prevencion migrana']}));

  upsert('Calmitol N','Vita',Object.assign({},common,{id:'VCB0209-CALMITOL-N',dci:'Naproxeno sódico',principios:['Naproxeno sódico'],categoria:'Analgésicos / AINE',accion_terapeutica:'Analgésico antiinflamatorio',presentaciones:['Naproxeno sódico 550 mg · comprimidos · caja x 10','Naproxeno sódico 550 mg · comprimidos · caja x 100'],estado:'Producto listado en Vademécum Farmacéutico Bolivia',fuente:src.calmitol,migraine_role:'analgesico_crisis',aliases:['Calmitol N','naproxeno','naproxeno sodico','naproxeno sódico','naproxeno 550 mg','AINE migraña','analgésico migraña']}));
  upsert('Proxen','CAMSA',Object.assign({},common,{id:'VCB0209-PROXEN',dci:'Naproxeno sódico',principios:['Naproxeno sódico'],categoria:'Analgésicos / AINE',accion_terapeutica:'Analgésico antiinflamatorio',presentaciones:['Naproxeno sódico 550 mg · comprimidos recubiertos · caja x 10'],estado:'Producto listado en Vademécum Farmacéutico Bolivia',fuente:src.proxen,migraine_role:'analgesico_crisis',aliases:['Proxen','naproxeno','naproxeno sodico','naproxeno sódico','naproxeno 550 mg','AINE migraña','analgésico migraña']}));
  upsert('Naproxeno','San Fernando',Object.assign({},common,{id:'VCB0209-NAPROXENO-SAN-FERNANDO',dci:'Naproxeno sódico',principios:['Naproxeno sódico'],categoria:'Analgésicos / AINE',accion_terapeutica:'Analgésico antiinflamatorio',presentaciones:['Naproxeno 550 mg · comprimidos ranurados · caja x 100'],estado:'Producto listado en Vademécum Farmacéutico Bolivia',fuente:src.naproxenoSF,migraine_role:'analgesico_crisis',aliases:['Naproxeno San Fernando','naproxeno','naproxeno sodico','naproxeno sódico','naproxeno 550 mg','AINE migraña','analgésico migraña']}));

  for(const x of rows){
    const p=(x.principios||[]).map(n);const d=n(x.dci);
    if(p.some(v=>v==='naproxeno'||v==='naproxeno sodico')||d==='naproxeno'||d==='naproxeno sodico') x.aliases=uniq([...(x.aliases||[]),'naproxeno','naproxeno sódico']);
    if(p.some(v=>v==='sumatriptan')||d.includes('sumatriptan')) x.aliases=uniq([...(x.aliases||[]),'sumatriptán','sumatriptan','triptán','triptan']);
    if(p.some(v=>v==='rizatriptan')||d.includes('rizatriptan')) x.aliases=uniq([...(x.aliases||[]),'rizatriptán','rizatriptan','triptán','triptan']);
  }
  window.VCB_MIGRAINE_PATCH_VERSION='0.20.9';
})();
