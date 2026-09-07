/* Ajuste fino v0.20.11: no generalizar azitromicina como inhibidor CYP3A fuerte de carbamazepina */
(function(){
  const K=window.VCB_INTERACTION_KB;if(!K)return;
  K.groups=K.groups||{};
  K.groups.CARBAMAZEPINE_MACROLIDE_INHIBITORS=['Claritromicina','Eritromicina'];
  const r=(K.class_rules||[]).find(x=>x.id==='NEURO-CBZ-CLARITHRO-02011');
  if(r)r.b='CARBAMAZEPINE_MACROLIDE_INHIBITORS';
  K.meta=K.meta||{};K.meta.azithromycin_not_generalized_as_carbamazepine_cyp3a_inhibitor=true;
})();
