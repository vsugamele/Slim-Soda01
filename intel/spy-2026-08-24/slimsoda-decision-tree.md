# SlimSoda Spy — Decision Tree (24/ago/2026)

**Pergunta central:** "Tô rodando campanha SlimSoda. Qual ângulo / persona / copy / LP eu uso?"

**Regra #1 (atualizada 24/ago/2026):** Toda campanha SlimSoda **DEVE** declarar posição sobre o cluster scam-flagged (per MalwareTips 24/ago + Ibisik + ScamAdviser). Ou (a) explicitamente contra (Dana Whitfield anti-scam) ou (b) totalmente desassociada (rebrand). **Neutro não é mais opção**.

---

## Árvore de decisão PT-BR

```
START: "Quem é a persona e qual é o contexto?"

│
├── STEP 1: Persona 50-65+, viu Yale/Jastreboff deepfake, cética
│   │
│   └── → Cluster 2: Honest Formulator Anti-Scam
│       ├─ Ângulo: "I saw all those fake ads. Here's what baking soda actually does."
│       ├─ Copy: Dana Whitfield framework (brief-slimsoda-anti-scam-2026-08-23)
│       ├─ Format: UGC 60-90s OR advertorial long-form 80-100KB
│       ├─ LP: Maria 47 v5 refresh (substituir Yale → Stanford) OU nova LP Dana Whitfield
│       ├─ Compliance: ✅ BAIXO — "I'm not a doctor" disclosure + FDA disclaimer
│       └─ CTA: "Watch the 90-second video · No fake celeb · No subscription"
│
├── STEP 1 alt: Persona 60-75+, blue zone longevity, food noise / appetite
│   │
│   └── → Cluster 4: Sardinian / Okinawan Centenarian
│       ├─ Ângulo: "Women in the world's longest-lived villages drink this every morning"
│       ├─ Copy: 3 ingredientes (baking soda + ginger + berberine) como morning ritual
│       ├─ Format: UGC vovó 70+ OR carrossel 5 cards "What they drink every morning"
│       ├─ LP: dedicated blue zone LP (a criar) OR carrossel retargeting
│       ├─ Compliance: ✅ BAIXO com disclaimers ("may support", "researchers found", "associated with longevity")
│       └─ CTA: "See the recipe · 3 ingredients · 1 scoop · No subscription"
│
├── STEP 1 alt: Persona 50-70+, quer transparência de preço, odeia subscription
│   │
│   └── → Cluster 5: No Subscription / Honest Pricing Hero
│       ├─ Ângulo: "The only weight drink that doesn't lock you in"
│       ├─ Copy: comparison table "SlimSoda vs typical weight subscription"
│       ├─ Format: carrossel 2-column + sticky CTA
│       ├─ LP: existing buy-page / checkout com comparison table no topo
│       ├─ Compliance: ✅ BAIXO — factual
│       └─ CTA: "Try one jar — keep it or get every penny back"
│
├── STEP 1 alt: Persona 30-60+, food noise / appetite awareness, sabe de Ozempic
│   │
│   └── → Cluster 3: Food Noise / Between-Meal Hunger (REFATORADO)
│       ├─ Ângulo: "Why you can't stop thinking about food between meals" (NÃO "food noise + GLP-1")
│       ├─ Copy: "appetite" + "between-meal hunger" + "cravings" (NÃO "food noise" + "GLP-1")
│       ├─ Format: UGC 60-90s OR carrossel 5 cards mechanism-driven
│       ├─ LP: existing Maria 47 LP com headline refatorada
│       ├─ Compliance: ⚠️ MÉDIO se "food noise + GLP-1" (ASA UK ban ago/2026)
│       │   ✅ BAIXO se "between-meal hunger" sem GLP-1 framing
│       └─ CTA: "Try one jar · 90-day money-back guarantee"
│       └─ ⚠️ HARD RULE: NEVER mention "Ozempic", "Wegovy", "Mounjaro", "Zepbound", "Faux-Zempic", "natural GLP-1"
│
└── STEP 1 alt: Persona proxy buyer 45-65+ comprando pra mãe 75+
    │
    └── → Cluster 4 (Sardinian) + Cluster 2 (Anti-scam) híbrido
        ├─ Ângulo: "I bought this for my mother. Three months later, she started gardening again."
        ├─ Copy: proxy buyer story + mother transformation
        ├─ Format: advertorial long-form 80-100KB first-person
        ├─ LP: dedicated proxy-buyer advertorial (a criar, gap cross-vertical)
        ├─ Compliance: ✅ BAIXO com structure-function
        └─ CTA: "Read the full story · See the recipe"

```

---

## Por estágio do funil

```
TOP OF FUNNEL (cold, awareness)
├─ Persona: 50-75+, viu cluster scam, quer honesto
├─ Ângulo primário: Cluster 2 (Anti-scam Dana Whitfield) — quebra pattern interrupt
├─ Format: UGC 60-90s Dana Whitfield OR advertorial image with bold headline
├─ CTA: "Watch the 90-second video"
└─ Compliance: ✅ BAIXO

MID FUNNEL (consideration)
├─ Persona: visitou LP, viu preço, quer saber mecanismo
├─ Ângulo primário: Cluster 4 (Sardinian centenarian) OR Cluster 5 (No subscription)
├─ Format: carrossel 5 cards "3 ingredients in that order" OR comparison table
├─ CTA: "See the research · Try one jar"
└─ Compliance: ✅ BAIXO com disclaimers

BOTTOM FUNNEL (decision)
├─ Persona: ready to buy, comparing bundles
├─ Ângulo primário: Cluster 5 (No subscription) + pricing ladder
├─ Format: 3-tier pricing (B1G1 / B2G2 / B3G3) com B3G3 featured
├─ CTA: "Order now · 90-day money-back guarantee"
└─ Compliance: ✅ BAIXO (factual)

RETARGETING (warm)
├─ Persona: visitou LP, não comprou
├─ Ângulo primário: Cluster 4 (Sardinian) + Cluster 2 (anti-scam reminder)
├─ Format: UGC curta 30s + carrossel testimonial
├─ CTA: "Still thinking about it? Here's what you missed."
└─ Compliance: ✅ BAIXO
```

---

## Por compliance risk (alinhado com ASA UK + Meta 2026)

```
SAFE TO RUN ✅
├─ Cluster 2 (Anti-scam Dana Whitfield) — BAIXO
├─ Cluster 4 (Sardinian centenarian) com disclaimers — BAIXO
├─ Cluster 5 (No subscription hero) — BAIXO
└─ Cluster 3 REFATORADO (between-meal hunger, sem GLP-1) — BAIXO

BORDERLINE ⚠️
├─ Maria 47 v4.7.1 (Yale framing) — MÉDIO (refresh URGENTE)
├─ Stanford "Missing Mineral" SEM citar GLP-1 — BAIXO
├─ Cluster 3 com "food noise" sem GLP-1 — BAIXO
└─ Cluster 3 com "food noise + GLP-1" — ALTO (ASA UK ban ago/2026)

DO NOT RUN 🚨
├─ Qualquer criativo com "Yale" + "Jastreboff" + "Today show" — BAN Meta
├─ Qualquer deepfake Oprah / Bill Gates / Anderson Cooper — BAN Meta
├─ Qualquer claim "Lose X lbs in Y days" — BAN Meta
├─ Qualquer "natural Ozempic" / "Faux-Zempic" — BAN UK + Meta
├─ Qualquer "boost GLP-1 production" sem disclosure — BAN UK + Meta
└─ Qualquer "doctor hates this" / "FDA doesn't want you to know" — BAN FTC
```

---

## Por canal de mídia

```
META ADS MANAGER (Feed)
├─ Format preferido: UGC 60-90s OR static image carrossel
├─ Ângulos safe: Cluster 2, 4, 5
├─ Ângulos borderline: Cluster 3 refatorado, Stanford Missing Mineral
├─ Targeting: women 40-75+, US, exclude <18, exclude lookalike health
└─ Compliance: FDA disclaimer obrigatório + structure-function

META ADS MANAGER (Stories / Reels)
├─ Format preferido: 9:16 UGC 30-60s
├─ Ângulos safe: Cluster 2 (Dana Whitfield pointing to camera)
├─ Ângulos borderline: Cluster 3 com "between-meal hunger" (texto overlay)
└─ Compliance: texto overlay precisa structure-function

NATIVE (Taboola / Outbrain / Mgid)
├─ Format preferido: advertorial image with bold headline
├─ Ângulos safe: Cluster 4 (Sardinian longevity)
├─ Ângulos borderline: Cluster 2 (anti-scam)
└─ Compliance: editorial box "ADVERTISEMENT" + FDA disclaimer

YOUTUBE PRE-ROLL
├─ Format preferido: UGC 30-60s non-skippable
├─ Ângulos safe: Cluster 2, 4
└─ Compliance: "advertiser content" disclosure + FDA disclaimer

DIRECT MAIL POSTCARD
├─ Format preferido: 4x6" postcard, "Honest baking soda" + Dana Whitfield photo
├─ Ângulos safe: Cluster 2 + 5 (anti-scam + no subscription)
└─ Compliance: "Mail Advertising" disclosure + FDA disclaimer no verso
```

---

## Por compliance persona (proxy buyer 45-65+)

```
PROXY BUYER (filho comprando pra mãe 75+)
├─ Ângulo: "I bought this for my mother. Here's what happened."
├─ Format: advertorial long-form 100KB+ first-person
├─ LP type: dedicated proxy-buyer LP (a criar)
├─ Compliance: ✅ BAIXO com structure-function ("may support" + "her doctor said")
├─ CTA: "Read the full story · See the recipe"
├─ Cross-sell: MemoPryl (proxy buyer é a mesma persona)
└─ Status: gap cross-vertical, brief a criar

CASAL 60-75+ (couple narrative)
├─ Ângulo: "We started this together. 30 days in, we both felt different."
├─ Format: UGC couple 60-90s OR static image
├─ LP type: existing Maria 47 com couple testimonial section
├─ Compliance: ✅ BAIXO
├─ CTA: "Order for two · No subscription"
├─ Cross-sell: Linfaflow + Cardio Clear (mesma persona)
└─ Status: gap cross-vertical, sub-servido
```

---

## Decisão pendente do user (CRÍTICA)

```
Você precisa decidir:

A) MANTER SlimSoda + EXECUTAR anti-scam Dana Whitfield refresh (RECOMENDADO se vendor tem fôlego de caixa)
   ├─ Custo: 1-2 semanas de produção (storyboard, vídeo, refresh LP)
   ├─ Risco residual: SlimSoda keyword vai continuar puxando MalwareTips/Ibisik no Google
   ├─ Upside: aproveita brand equity + copy já production-ready
   └─ Time: sprint 0 imediato

B) REBRAND SlimSoda → novo nome + domínio + LPs (RECOMENDADO se quer zero associação)
   ├─ Custo: 4-6 semanas, novo domain, novos criativos, nova mídia
   ├─ Risco residual: zero (novo nome não tem cluster exposure)
   ├─ Upside: long-term defensibility
   └─ Time: sprint 1+

C) MANTER SlimSoda + NÃO fazer nada (NÃO RECOMENDADO)
   ├─ Custo: 0 imediato
   ├─ Risco residual: ALTO — MalwareTips/Ibisik 24/ago indicam trending worse
   ├─ Upside: 0
   └─ Time: N/A

D) MANTER SlimSoda + switch produto (NÃO RECOMENDADO a menos que user queira pivot)
   └─ ...

RECOMENDAÇÃO OPERACIONAL: começar (A) imediato (Dana Whitfield sprint 0) + planejar (B) em paralelo se o user decidir que rebrand é inevitável.
```

---

## Red lines do user (per memory + atualizado 24/ago/2026)

**HARD RED LINES (NUNCA):**
1. ❌ Endosso fabricado de pessoa real sem autorização (Oprah, Jastreboff, Today, etc — cluster scam-flagged)
2. ❌ Depoimentos idênticos cross-landing (mesmo testemunho em produtos diferentes)
3. ❌ Capability claims falsos ("cures diabetes", "reverses dementia")
4. ❌ Claims médicos (fake MD/RN/PT authority sem licença real)
5. ❌ "Natural Ozempic" / "Faux-Zempic" / "boost GLP-1" — **NOVO 24/ago/2026** per ASA UK ruling
6. ❌ "Food noise" + GLP-1 framing combinado — **NOVO 24/ago/2026** per ASA UK ruling

**NÃO RED LINES (tom default pesado é OK):**
- "Doctors don't want you to know" (anti-establishment, OK)
- "Big Pharma esconde" (ataca indústria, não marca)
- "The forbidden / buried" (conspiracy leve, OK)
- "I was skeptical" (UGC trust, OK)
- "X-second ritual" (low-friction, OK)
- "Sardinian centenarian" (longevity, OK com disclaimer)

---

## Próximos passos (sprint 0)

1. ✅ **Brief anti-scam Dana Whitfield** — production-ready, executar.
2. 🔴 **Refresh Maria 47 v4.7.1** — substituir "Yale" por "Stanford 2024" (brief #2 já pronto).
3. 🔴 **Brief Sardinian centenarian UGC** — a criar, sprint 0 prioridade 1.
4. 🔴 **Audit criativos ativos** — remover "food noise + GLP-1" + "Yale/Jastreboff".
5. 🔴 **MBG 90 → 180 days** — uniformizar.
6. ⚠️ **Decisão de rebrand** — pendente do user.
