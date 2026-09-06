/* Vademécum Clínico Bolivia v0.20.8 · resolución estricta de medicamentos para interacciones */
(function(){
  const N=s=>(s??'').toString().normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
  const uniq=(a,key=x=>N(x))=>{const seen=new Set(),out=[];for(const x of a||[]){const k=key(x);if(k&&!seen.has(k)){seen.add(k);out.push(x)}}return out};
  const split=v=>typeof splitPrinciples==='function'?splitPrinciples(v):(Array.isArray(v)?v:[v]).flatMap(s=>(s||'').toString().split(/\s*\+\s*|\s*;\s*/)).map(s=>s.trim()).filter(Boolean);
  const canon=s=>typeof canonicalIngredient==='function'?canonicalIngredient(s):String(s||'').trim();
  const medPrinciples=x=>typeof principles==='function'?principles(x):(x?.principios?.length?x.principios:[x?.dci]).filter(Boolean);
  const ingredientsOf=x=>uniq(split(medPrinciples(x)).map(canon));
  const signature=x=>ingredientsOf(x).map(N).sort().join('|');
  const knownTerms=()=>{
    const K=window.VCB_INTERACTION_KB||{},out=[];
    Object.values(K.groups||{}).forEach(a=>(a||[]).forEach(x=>out.push(String(x))));
    (K.exact_rules||[]).forEach(r=>{if(r?.a)out.push(String(r.a));if(r?.b)out.push(String(r.b))});
    return uniq(out);
  };
  function exactKnown(v){const n=N(v);return knownTerms().find(x=>N(x)===n)||''}
  function exactBrand(v){const n=N(v);return (allMeds||[]).filter(x=>N(x?.marca)===n)}
  function exactDci(v){const n=N(v);return (allMeds||[]).filter(x=>N(x?.dci)===n)}
  function exactAlias(v){const n=N(v);return (allMeds||[]).filter(x=>(x?.aliases||[]).some(a=>N(a)===n))}
  function exactPrinciple(v){const n=N(v);return (allMeds||[]).some(x=>medPrinciples(x).some(p=>N(p)===n))}
  function fromMatches(label,ms,mode){
    const sigs=uniq(ms.map(x=>({sig:signature(x),x})),o=>o.sig).filter(o=>o.sig);
    if(!sigs.length)return{label,ingredients:[],matches:ms,resolution:'unresolved'};
    if(sigs.length>1)return{label,ingredients:[],matches:ms,resolution:'ambiguous',ambiguous:true};
    return{label,ingredients:ingredientsOf(sigs[0].x),matches:ms,resolution:mode};
  }
  function strictResolve(v){
    const label=String(v||'').trim(),n=N(label);if(!n)return{label,ingredients:[],matches:[],resolution:'empty'};
    const dci=exactDci(label);if(dci.length)return fromMatches(label,dci,'exact_dci');
    if(exactPrinciple(label)&&!/[+;]/.test(label))return{label,ingredients:[canon(label)],matches:[],resolution:'exact_principle'};
    const brand=exactBrand(label);if(brand.length)return fromMatches(label,brand,'exact_brand');
    const alias=exactAlias(label);if(alias.length)return fromMatches(label,alias,'exact_alias');
    const known=exactKnown(label);if(known)return{label,ingredients:[canon(known)],matches:[],resolution:'interaction_kb_term'};

    if(/[+;]/.test(label)){
      const parts=split(label),resolved=parts.map(p=>strictResolve(p));
      if(parts.length>1&&resolved.every(r=>r.ingredients.length&&!r.ambiguous))return{label,ingredients:uniq(resolved.flatMap(r=>r.ingredients)),matches:resolved.flatMap(r=>r.matches||[]),resolution:'explicit_association'};
      return{label,ingredients:[],matches:[],resolution:'ambiguous_association',ambiguous:true};
    }

    if(typeof searchScore==='function'){
      const ranked=(allMeds||[]).map(x=>({x,s:searchScore(x,n)})).filter(o=>o.s>0).sort((a,b)=>b.s-a.s);
      if(ranked.length){
        const top=ranked[0].s;
        if(top>=900){
          const leaders=ranked.filter(o=>o.s===top).map(o=>o.x),sigs=uniq(leaders.map(x=>({sig:signature(x),x})),o=>o.sig).filter(o=>o.sig);
          if(sigs.length===1)return{label,ingredients:ingredientsOf(sigs[0].x),matches:leaders,resolution:'high_confidence_unique'};
        }
      }
    }
    return{label,ingredients:[],matches:[],resolution:'unresolved'};
  }
  window.resolveInput=strictResolve;
  try{resolveInput=strictResolve}catch(_e){}
  window.VCB_INTERACTION_RESOLVER_VERSION='0.20.8';
})();
