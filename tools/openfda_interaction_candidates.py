#!/usr/bin/env python3
"""Extrae candidatos de interacciones desde etiquetas públicas openFDA.

NO publica reglas automáticamente. Su salida es para revisión farmacológica humana antes
de incorporar una interacción a Vademécum Clínico Bolivia.
"""
from __future__ import annotations

import argparse
import json
import os
import sys
import urllib.parse
import urllib.request

BASE = "https://api.fda.gov/drug/label.json"
FIELDS = (
    "drug_interactions",
    "drug_interactions_table",
    "contraindications",
    "warnings_and_precautions",
    "warnings",
)


def query_label(drug: str, limit: int = 5) -> dict:
    # Se busca por nombre genérico o marca. openFDA puede devolver varias etiquetas del mismo fármaco.
    q = f'(openfda.generic_name:"{drug}" OR openfda.brand_name:"{drug}")'
    params = {"search": q, "limit": str(limit)}
    key = os.environ.get("OPENFDA_API_KEY")
    if key:
        params["api_key"] = key
    url = BASE + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": "VCB-openFDA-audit/1.0"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r)


def normalize_record(rec: dict) -> dict:
    ofda = rec.get("openfda") or {}
    out = {
        "id": rec.get("id"),
        "effective_time": rec.get("effective_time"),
        "generic_name": ofda.get("generic_name", []),
        "brand_name": ofda.get("brand_name", []),
        "manufacturer_name": ofda.get("manufacturer_name", []),
        "set_id": rec.get("set_id"),
        "sections": {},
    }
    for field in FIELDS:
        value = rec.get(field)
        if value:
            out["sections"][field] = value
    return out


def main() -> int:
    ap = argparse.ArgumentParser(description="Extrae texto candidato de interacciones desde openFDA")
    ap.add_argument("drug", nargs="+", help="Principio activo o marca a revisar")
    ap.add_argument("--limit", type=int, default=5, help="Etiquetas máximas por fármaco (1-20)")
    ap.add_argument("--output", help="Archivo JSON de salida; por defecto stdout")
    args = ap.parse_args()
    limit = min(max(args.limit, 1), 20)

    result = {
        "source": "openFDA Drug Product Labeling API",
        "source_url": "https://open.fda.gov/apis/drug/label/",
        "warning": "Candidatos para revisión humana; no publicar automáticamente como regla clínica.",
        "drugs": [],
    }

    for drug in args.drug:
        entry = {"query": drug, "records": [], "error": None}
        try:
            payload = query_label(drug, limit=limit)
            entry["records"] = [normalize_record(x) for x in payload.get("results", [])]
        except Exception as e:  # la auditoría no debe detenerse por un fármaco
            entry["error"] = str(e)
        result["drugs"].append(entry)

    text = json.dumps(result, ensure_ascii=False, indent=2)
    if args.output:
        with open(args.output, "w", encoding="utf-8") as f:
            f.write(text + "\n")
    else:
        sys.stdout.write(text + "\n")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
