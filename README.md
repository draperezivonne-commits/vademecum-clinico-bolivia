# Vademécum Clínico Bolivia

Aplicación web/PWA del **Vademécum Clínico Bolivia · Neurocápsulas**.

Sitio público: `https://vademecum.neurocapsulas.com`

## Estado actual

- Aplicación: **v0.20.0**
- Catálogo farmacológico base: **v0.19.0**, con enriquecimiento de búsqueda v0.19.3
- Medicamentos, insumos, implantes y proveedores orientados a Bolivia
- PWA instalable y funcionamiento local/offline mediante Service Worker
- Comprobador de interacciones de 2 a 10 medicamentos

## Interacciones v0.20.0

El comprobador evalúa la **seguridad de la asociación**, no la composición como resultado principal. La composición se utiliza internamente para reconocer marcas comerciales y resolver sus principios activos.

La base v0.20.0 incorpora:

- **64 reglas de pares exactos**
- **59 reglas por familias farmacológicas**
- **65 grupos de fármacos**
- aproximadamente **2.115 pares potenciales** cubiertos por reglas de clase, además de las reglas exactas
- alertas adicionales de **polifarmacia** (riesgo renal, hemorrágico, depresores del SNC, QT, carga serotoninérgica e hiperpotasemia)
- **19 fuentes regulatorias/de ficha técnica** documentadas en `docs/data/interaction_sources_v0200.json`

Archivos principales:

- `docs/data/interaction_kb_v0200.js` — base estructurada de reglas y grupos
- `docs/data/interaction_engine_v0200.js` — motor de evaluación y presentación clínica
- `docs/data/interaction_sources_v0200.json` — inventario de fuentes
- `docs/data/interactions.js` — reglas heredadas que siguen disponibles como capa adicional

Los resultados se clasifican como contraindicado, alto riesgo, precaución/monitorización, interacción menor o sin interacción clínicamente relevante identificada. **La ausencia de una alerta no se presenta como garantía de seguridad absoluta.** El módulo es una ayuda profesional y no sustituye ficha técnica, guías institucionales ni juicio clínico.
