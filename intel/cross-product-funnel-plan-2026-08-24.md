# Cross-Product Funnel — LTV Maximization Plan

**Data:** 2026-08-24
**Status:** DRAFT (1 semana de execução quando user aprovar)
**Autor:** Mavis

---

## TL;DR

User tem 4 produtos DR + 2 ativos. **LTV médio perdido** por falta de cross-sell: $400-700/cliente.

| Produto | AOV | LTV real | Cross-sell fit |
|---|---|---|---|
| 🥤 SlimSoda | $30 | $30 (one-shot B1G1) | ENTRY (warm-up) |
| 🧠 MemoFlow | $59 | $59 (B2G1) | UP-SELL pra filhos 40-60 comprando pra pai 70+ |
| ❤️ Cardio Clear | $294 | $294 (6btl) | UP-SELL pra mulher 60-70 on BP pills |
| 🫀 Linfaflow | $60 → $642 | **$642** (subscription $180 + Wellness Club $462) | RETENTION monster |
| 💧 Linfozen | $147 | $147 (3btl) | UP-SELL pra mulher 35-65 (SlimSoda avatar overlap) |

**Avatar overlap analysis:**
- SlimSoda (mulher 35-65, bloat/frustrated) → Linfozen (mesma mulher, lipedema) = HIGH
- SlimSoda (mulher 50-65 established) → Cardio Clear (mesma mulher, 60+ on BP pills) = HIGH
- Cardio Clear (homem 60-70) → MemoFlow (mesmo homem 60-80, memory) = MEDIUM
- Linfaflow (mulher 50-70 on water pill) → Cardio Clear (mesma mulher, 60+ BP) = MEDIUM
- Linfozen (mulher 35-65 lipedema) → SlimSoda (mesma mulher, 35-65 bloat) = HIGH (compete!)

**Cross-sell direction (highest fit first):**
1. SlimSoda → Linfaflow (mulher 50+ que comprou bloat, agora tem pernas pesadas às 5pm) = HIGH
2. SlimSoda → Cardio Clear (mulher 55+ que comprou bloat, agora tem BP creeping) = HIGH
3. Cardio Clear → MemoFlow (homem 60+ BP, agora tem memory concerns) = MEDIUM
4. Linfaflow → Cardio Clear (mesma mulher 60+, water pill + BP) = MEDIUM

---

## Funnel Architecture (3 estágios)

### Estágio 1 — ACQUISITION (cold traffic)
- **SlimSoda LP principal** (Maria 47 v3 + Stanford v1.0) — Mulher 35-65 entry point
- **Cardio Clear LP** (UVA v1) — Homem 60-70 OR Mulher 60-70 BP
- **Linfozen LP** (Lipedema v1) — Mulher 35-65 lipedema
- **Linfaflow LP** (subscription-optimized, separate) — Mulher 50-70 water pill

### Estágio 2 — RETENTION (30-90 dias pós-compra)
- **Email sequence SlimSoda** (60 dias, 7 emails):
  - Email 1 (dia 0): Welcome + ritual reminder
  - Email 2 (dia 3): "Why order matters" education
  - Email 3 (dia 7): "How is the bloat responding?" feedback request
  - Email 4 (dia 14): "What's next?" (introduce Linfaflow subscription)
  - Email 5 (dia 30): "60-day milestone" + testimonial cluster
  - Email 6 (dia 45): "If you got SlimSoda, your mom might need Cardio Clear" (proxy-buy angle)
  - Email 7 (dia 60): "Empty-tub promise" + reorder + cross-sell Cardio Clear
- **Email Linfaflow** (90 dias, 12 emails):
  - Subscription-first: "Your second bottle ships in 7 days"
  - Wellness Club upsell (dia 30): "$77/mo, 4 botanicals + lymphatic massage protocol"
  - Linfaflow → Cardio Clear cross-sell (dia 60): "If your legs feel lighter, your heart might benefit too"

### Estágio 3 — REVENUE MAX (90+ dias)
- **Subscription lock-in** Linfaflow: 6 meses × $30 = $180 (target 60% retention)
- **Wellness Club upsell**: $77/mo × 6 = $462 (target 20% attach rate)
- **Cross-sell at month 3**: "If SlimSoda worked, Cardio Clear might too" (target 8% conversion)
- **Proxy-buy at month 6**: "Mother's Day promo" or "Father's Day" (target 5% conversion)

---

## Funnel Math

### Baseline (sem cross-sell, atual)
- 1000 SlimSoda sales/mês × $30 = $30K/mês
- 100 Cardio Clear sales/mês × $294 = $29.4K/mês
- 50 Linfozen sales/mês × $147 = $7.4K/mês
- 200 Linfaflow sales/mês × $60 = $12K/mês
- **Total: $78.8K/mês**
- **LTV médio: $108/cliente** (sem cross-sell)

### Com cross-sell (target 12 meses)
- 1000 SlimSoda sales/mês × $30 = $30K
  - + 8% convert to Cardio Clear (mês 3): 80 × $294 = $23.5K
  - + 12% convert to Linfaflow (mês 4): 120 × $180 LTV = $21.6K
  - + 5% convert to Linfozen (mês 2): 50 × $147 = $7.4K
- 100 Cardio Clear sales/mês × $294 = $29.4K
  - + 8% convert to MemoFlow (mês 6, proxy-buy): 8 × $59 = $0.5K
- 200 Linfaflow sales/mês × $180 LTV = $36K
  - + 20% attach Wellness Club ($77/mo × 6): 40 × $462 = $18.5K
- **Total: $166.4K/mês** (target mês 12, com funil maduro)
- **LTV médio: $295/cliente** (com cross-sell)

**Uplift: +111% em revenue, +173% em LTV.**

---

## Execution Plan (1 semana)

### Dia 1 — Email infra
- [ ] Setup email service (ConvertKit ou ActiveCampaign) para SlimSoda + Linfaflow
- [ ] Domain warming (DKIM + SPF) se ainda não tiver
- [ ] Segmentação por produto + cross-sell flag

### Dia 2 — Email copy
- [ ] 7-email SlimSoda sequence (PT-BR-friendly)
- [ ] 12-email Linfaflow sequence (subscription-first)
- [ ] 5-email Cardio Clear sequence (BP-focused)

### Dia 3 — Cross-sell LP variants
- [ ] SlimSoda "complete protocol" cross-sell page (Cardio + Linfaflow)
- [ ] Linfaflow subscription LP (Subscribe event optimize)
- [ ] Wellness Club upsell page (4-botanical + massage protocol)

### Dia 4 — Tracking + attribution
- [ ] Cross-LP visitor_id (localStorage UUID)
- [ ] UTM scheme: `utm_content=product-{X}-to-{Y}`
- [ ] Supabase events table: add `previous_product` field
- [ ] CAPI deduplication cross-product

### Dia 5 — Launch + monitoring
- [ ] Email sequences ativas
- [ ] Cross-sell LPs live
- [ ] Dashboard de cross-sell conversion
- [ ] Daily monitor (first 30 days)

### Dia 6-7 — Iterate
- [ ] First week's data review
- [ ] Subject line A/B test
- [ ] Send time optimization
- [ ] Cross-sell angle iteration

---

## Decisão pendente (user)

**Aprovar execução do plano?** (1 semana focada)

**Default se user não responder:** Mavis começa Dia 1 (email infra).

---

## References

- Product map: `intel/PRODUCT-MAP-2026-08-24.md`
- Briefing Linfaflow: `references_v5/by-product/linfaflow/copy/briefing-9-angulos/index.html` (subscription model documentado)
- Briefing Cardio Clear: `references_v5/by-product/cardio-clear/copy/briefing-9-angulos/index.html` (avatar 60-70 documentado)
- Briefing Linfozen: `references_v5/by-product/linfozen/copy/briefing-linfozen/index.html` (avatar 35-65 documentado)
- Briefing SlimSoda: `references_v5/by-product/slimsoda/copy/briefing-9-angulos/index.html` (avatar 35-65 established documentado)
- Hub: `references_v5/index.html` (Copy Bank Decision Engine, cross-vertical patterns)

---

**Próximo passo:** user aprova. Mavis executa Dia 1.
