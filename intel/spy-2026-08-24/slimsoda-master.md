# SlimSoda Spy — Master Briefing

**Data do spy:** 24/ago/2026 (atualizado hoje)
**Escopo:** SlimSoda (vendor: slimsodapowder.com / cc.slimsodapowder.com, Boise ID)
**Método:** web_search + web_fetch (Barchart, MalwareTips, Ibisik, ScamAdviser, Questrom BU, SARC Berkeley, ASA UK, ClickBank, Daily Intel Service, NYT, ASA rulings, Forbes, Slim-wellness, Healthline) + leitura dos arquivos `intel/spy-2026-08-22/MASTER.md`, `playbook-slimsoda-memopryl-2026-08-23.md`, `analise-criativos/adv1-oprah.html`, `adv2-anti-scam.html`, `adv7-slimsoda-maria47.html`.
**Limitação:** Meta Ad Library direto continua bloqueado (challenge JS / Cloudflare). Spy triangulado via (a) cluster reporting de MalwareTips + Ibisik + ScamAdviser, (b) marketplace de afiliado (ClickBank), (c) cobertura de veículos de fact-check, (d) análise dos criativos já produzidos internamente.

---

## 🚨 ALERTA CRÍTICO — SlimSoda ESTÁ no cluster scam-flagged público (24/ago/2026)

> **Isto NÃO era o caso em 22/ago e mudou nas últimas 48h.**

**MalwareTips publicou HOJE (24/ago/2026)** um artigo investigativo de ~5.000 palavras: **"Baking Soda Weight Loss Funnel Investigation"** com a meta-description *"Baking soda weight loss funnel investigation traces EvoSlim and SlimSoda to Ignitra, exposing fake endorsements, brand swaps, domains, and billing risks."*

O artigo:
1. **Nomeia SlimSoda explicitamente** como um dos 3 produtos ativos no cluster (junto com EvoSlim e Ignitra).
2. Traça o **mesmo operador** (mesma estrutura de "recipe bait" + long-form VSL + fake celeb) girando entre marcas: **Ignitra → EvoSlim → AlkaLean → AlkaSlim → SodaSlim → Lean Peak → Burn Gummy → Jelly Burn → SlimSoda**.
3. Detalha o **billing risk**: cobranças recorrentes escondidas, suporte que não responde, refund window conflituoso.
4. Outros veículos que cobrem SlimSoda pelo mesmo ângulo:
   - **Ibisik** (jul/2026): "SlimSoda Review 2026: Is the Baking Soda Weight Loss Scam Using Oprah and Dr. Ania Jastreboff AI Videos?"
   - **ScamAdviser**: "SlimSoda Review: Is Slim Soda Baking Soda Weight Loss Supplement Scam or Legit?" — nota que slimsodapowder.com exibe "Coming soon" e o checkout real é cc.slimsodapowder.com (red flag de transparência)
   - **Questrom Insights BU** (jul/2026): vídeo de Jordan Liles
   - **SARC Berkeley** (jul/2026): "We Fact-Checked The Baking Soda Shot Recipe"
   - **NYT** (27/abr/2026): "Facebook has a health scam problem" — context geral
   - **The Today Show** (sobre Kathy Hilton cair no golpe): confirma que Oprah/Jell-O é AI scam

**Implicação operacional direta:**
- O **playbook de 23/ago** que diz "anti-scam é gap blue ocean pra SlimSoda" **NÃO ESTÁ MAIS VELHO**. O "honest baking soda" lane agora é o único caminho possível, porque o cluster baking soda virou sinônimo de scam. O anti-scam deixou de ser opcional e virou **existencial**.
- A LP **Maria 47 v4.7.1 Quiet** que ainda roda com "Yale Doctor reveals the $1 baking soda recipe" é hoje **um ônus, não um ativo**. Está tecnicamente em compliance porque SlimSoda como vendor não está endossando Yale diretamente, mas o cluster signal associado vai fazer qualquer buyer pesquisar "SlimSoda" → cair em MalwareTips/Ibisik → duvidar.
- **Decisão crítica pendente do user:** ou (a) reposicionar SlimSoda agressivamente como **"o honesto do cluster"** com a LP anti-scam Dana Whitfield + downgrade do "Yale" framing em todos os criativos, ou (b) assumir que o vendor slimsodapowder.com é "queimado" e considerar rebrand (mesmo caminho que MemoPryl está em).

> **Notar:** o playbook de 23/ago indicava que SlimSoda poderia **ocupar** o anti-scam lane como blue ocean. Hoje esse lane não é mais blue ocean — é **RED OCEAN porque o cluster virou toxic public knowledge**. A única diferenciação real é ser **explicitamente contra** o cluster (Dana Whitfield "I see all those fake ads"), não apenas "ausente do cluster".

---

## Índice PT-BR

1. [Top 5 concorrentes diretos (com nome + ângulo + LP)](#1-top-5-concorrentes-diretos)
2. [Top 5 afiliados ativos no cluster weight loss / GLP-1 support](#2-top-5-afiliados-ativos)
3. [Pricing tiers — onde SlimSoda se posiciona](#3-pricing-tiers)
4. [Page types que convertem no nicho hoje](#4-page-types)
5. [Compliance watchlist 2026 (Meta + FTC + ASA UK)](#5-compliance-watchlist)
6. [3 clusters emergentes](#6-3-clusters-emergentes)
7. [Comparativo: SlimSoda vs vendor "limpo" vs cluster "scam-flagged"](#7-comparativo)
8. [Decisão operacional recomendada](#8-decisão-operacional)
9. [Assumptions + suposições + próximos passos](#9-assumptions)

---

## 1. Top 5 concorrentes diretos

| # | Produto / Vendor | Ângulo flagship | Pricing | Compliance status | Ameaça real |
|---|---|---|---|---|---|
| 1 | **Mitolyn** (ClickBank Diamond, vendor Golden Vitality) | "Mitochondrial energy" — berberine + 6 botanicals. **#1 ClickBank 2026** por gravity (203.13) | $59-79/1-bot, **$188.72 avg payout** ao afiliado, $162 APV, 1.14% conv. | ✅ Limpo — não usa celeb, sem deepfake, mecanismo MITOCHONDRIAL (não "weight loss") | **ALTA** — afiliado converte "$188/sale" → é o que paga mais. SlimSoda como afiliado não compete; SlimSoda como vendor compete por tráfego frio. |
| 2 | **CitrusBurn** (ClickBank Diamond) | Citrus bioflavonoids pra women 40+. "Targeted cellular energy" | $202.08 avg payout, $160 CPA, gravity 63.39 | ✅ Limpo — mechanism específico, sem deepfake | **MÉDIA** — nicho 40+ sobrepõe SlimSoda; payout mais alto atrai afiliado. |
| 3 | **Java Burn** (ClickBank, $1.5B+ em vendas acumuladas) | "Coffee additive" — mistura em pó no café da manhã | $152 CPA, $175.32 APV, $1.62 EPC, **75% recurring** | ⚠️ Borderline — "fat burner" + "coffee ritual" framings (não disease claim) | **MÉDIA** — o "ritual matinal" compete diretamente com SlimSoda ("morning drink"). ClickBank e Meta continuam permitindo. |
| 4 | **AquaSculpt** (ClickBank) | "Ice water hack" — cápsula com brown adipose tissue | $167.08 avg payout, 180-day MBG | ⚠️ "Ice water hack" é borderline sensational mas sem deepfake | **BAIXA-MÉDIA** — não compete diretamente por avatar. |
| 5 | **SodaSlim** (soda-slim.us, separado de SlimSoda mas MESMO CLUSTER) | "Baking soda" — **mesma network que SlimSoda** | $59-69/1-bot, 60-day MBG | 🚨 **SCAM-FLAGGED** — Trustpilot 2.9/5, MalwareTips exposés | 🚨 **ALTA (negativa)** — qualquer pessoa que pesquisar "SlimSoda" cai em páginas que comparam com SodaSlim. **Risco de associação por proximidade de nome** é a maior ameaça à marca. |

**Bonus que vale rastrear:**
- **Arrae MB-1** ("Faux-Zempic") — acabou de ser **banido pela UK ASA em ago/2026** (ver §5) por usar "food noise" + "boost GLP-1" + testemunho "achieve my goal weight in three months" como medicinal claims. Sinaliza onde o Meta 2026 vai apertar.
- **Inno Supps Trim Biome** (também banido ASA ago/2026) — "GLP-1 + Akkermansia + Dr. Ali Kazemi board-certified gastroenterologist" — o doctor é REAL mas a claim ainda foi banida.
- **Midi Health** (DTC) — pivoteou pra "GLP-1 microdosing" pra menopausal audience, "food noise" como hook. Diferenciação: é prescrição real, não supplement. Competem pelo mesmo avatar 40-60+ com food noise.

---

## 2. Top 5 afiliados ativos no cluster weight loss / GLP-1 support

| # | Afiliado / Offer | Modelo | Avg Payout | Mecanismo primário | Status |
|---|---|---|---|---|---|
| 1 | **Mitolyn** | ClickBank | $188.72 | Mitochondrial + cellular energy | 🟢 Ativo, scaling |
| 2 | **Java Burn** | ClickBank, 75% recurring | $175.32 APV, $152 CPA | Coffee additive | 🟢 Ativo, maturity |
| 3 | **CitrusBurn** | ClickBank | $202.08 | Citrus bioflavonoids 40+ | 🟢 Ativo, scaling |
| 4 | **AquaSculpt** | ClickBank | $167.08 | "Ice water" BAT activation | 🟡 Ativo, scam-adjacent |
| 5 | **My Energeia** | ClickBank, 85% revshare | $426/sale | "Mitochondrial" + GLP-1 | 🟢 Novo, alto payout |

**SlimSoda como afiliado** hoje: não está em ClickBank, não tem revshare público. Único canal é **direto via cc.slimsodapowder.com** (EVO Tech / shopzenvy-style checkout). 

**Afiliados com fan pages ativas que rodam SlimSoda / SodaSlim (per analise-criativos/):**
- Joe Yeugen (3+ ads, oldest Jul 6, control)
- Rafael Yugen (2+ ads)
- Amanda White Tips (1 ad, Vitalyne LP)
- Best Offers Health (2 ads, baking soda angle)
- Estrutura típica: 20-50 fan pages neutras, copy UGC genérico, endossam múltiplos suplementos do cluster.

**Glp-1 alternative affiliate arbitrage (CPC economics — per arbhunter.dev):**
- Keyword "ozempic alternative natural": **CPC $1.80-3.50, 110K volume, medium competition**
- Keyword "glp-1 for weight loss": **CPC $2.50-4.80, 320K volume, high competition**
- Telehealth affiliate: **$50-150/lead**
- Arb recommendation: native ad → content page ("Best Weight Loss Programs 2026") → monetize with telehealth + display

---

## 3. Pricing tiers

### SlimSoda (atual, ago/2026 — confirmado via Barchart + slim-wellness.com)
| Bundle | Per tub | Total | Status |
|---|---|---|---|
| 2-tub B1G1 | $34.75 | $69.50 | 🟡 Entry |
| 4-tub B2G2 | $27.49 | $109.96 | 🟡 "Most popular" |
| 6-tub B3G3 | $19.99 | $119.94 | 🟢 "Lowest price ever" |
| Shipping | Free todos | — | — |
| Expedited | $9.95 opcional | — | — |
| MBG | **90 days** (per slim-wellness.com) — playbook de 23/ago diz 60. **CONFLITO** | — | ⚠️ |
| Auto-ship | **Nenhum** (one-time only) | — | ✅ Selling point |

**Vendor info público:**
- Email: support@slimsodapowder.com
- Phone: (323) 332-1649
- Endereço: 1444 S. Entertainment Ave, Suite 410, Boise, ID 83709
- Domain status: slimsodapowder.com = "Coming soon" (só cc.slimsodapowder.com ativo = red flag de transparência per ScamAdviser)

### Mercado weight loss 2026 (cross-referência ClickBank + arbhunter)
| Tier | Faixa de preço | Quem usa |
|---|---|---|
| Entry 1-bot | $39-79 | Mitolyn, Java Burn, CitrusBurn, AquaSculpt, SodaSlim |
| Bundle 3-bot | $49-59/bot (range dominante) | Mitolyn, Java Burn |
| Bundle 6-bot "best value" | $33-49/bot | Mitolyn, Java Burn, SlimSoda |
| Digital-only | $39 (Brain Song — memory) | Cluster memory |
| Subscription | $29.90/mo (raro) | Nuflos, Java Burn recurring |
| MBG | 60-180 dia (padrão) | Mitolyn 180d, AquaSculpt 180d, SlimSoda **90d (conflitante)** |
| **365-day MBG** | Premium positioning | Bazopril, CogniSurge |

**Veredito de preço:**
- SlimSoda em $19.99/tub é **50-60% abaixo do mercado** de 6-bot tier. Selling point forte.
- **MAS:** cluster scam-flagged (per MalwareTips/Ibisik) faz preço baixo parecer "too good to be true" → active liability.
- Recomendação: **manter preço** mas **aumentar MBG de 90 pra 180 dias** pra paridade competitiva E sinal de confiança. A inconsistência entre 60/90/180 nas LPs é red flag. **Decisão do playbook de 23/ago sobre "90 → 180 upgrade" está validada;** agora é URGENTE.

---

## 4. Page types que convertem no nicho hoje

Por volume / ranking per ClickBank + MalwareTips + Barchart + cluster:

| LP type | Quem usa | Compliance Meta 2026 | Aplicação SlimSoda |
|---|---|---|---|
| **Advertorial long-form magazine** (107KB+ scroll, path 1/2 close) | Maria 47 v4.7.1 (SlimSoda), cluster SodaSlim, SodaSlim.com | ⚠️ ALTO risco se tocar "Yale" + "Dr. Jastreboff" + "Today show" — é EXATAMENTE o template que MalwareTips identificou como scam | 🚨 NÃO replicar padrão Yale/Jastreboff. **Refresh v5 obrigatório**. |
| **VSL long-form 25-45min** com fake "Today show" / "CNN" framing | SodaSlim, AlkaLean, Ignitra | 🚨 BAN — right of publicity (Today/CNN não publicaram) + 35 state AGs enforcement | ❌ NÃO usar template fake-news VSL. VSL com "I'm a formulator talking to you" é OK. |
| **UGC 60-90s talking-head** (mulher 50-65+, kitchen) | Mitolyn, Java Burn, todos os "legit" | ✅ Baixo risco | ✅ SlimSoda já tem brief anti-scam Dana Whitfield — executar. |
| **Carousel 5-6 cards** mechanism-driven | Mitolyn, Java Burn | ✅ Baixo risco se claims forem structure-function | ✅ Brief Stanford "Missing Mineral" já está pronto (brief-slimsoda-stanford-2026-08-23). |
| **Static image ad** (headline bold) | Cross-niche | ✅ Baixo risco se compliance | ✅ Stanford flat lay está no brief. |
| **GLP-1 / "food noise" focused UGC** | Arrae MB-1 (banida), Midi Health, My Energeia | 🚨 **ASA UK ban ago/2026** — "food noise" + GLP-1 = medicinal claim. Meta provavelmente segue. | ❌ **EVITAR** "quiet food noise" como hook primário. Barchart confirma que SlimSoda target audience = "people who describe frequent thoughts about food ('food noise')". Se o user rodar essa claim, **risk de ban Meta** + FTC. |
| **"Faux-Zempic" / "Natural Ozempic" framing** | Arrae (banida), Trim Biome (banida), Naturliga | 🚨 **BAN UK ago/2026** + Meta 2026 já pune "natural Ozempic" | ❌ **HARD NO**. Não usar. |
| **Blue zone / Sardinian centenarian** | SlimSoda (a fazer, per playbook) + sporadic | ✅ Baixo risco com structure-function ("may support longevity" não "live past 100") | ✅ **Brief a criar** — gap cross-vertical. |
| **"Honest formulator not doctor" anti-scam** | SlimSoda (adv2 anti-scam, brief pronto) | ✅ Baixo risco (Dana Whitfield é personagem representativa) | ✅ **Prioridade sprint 0** — único caminho viável agora. |
| **Stanford "Missing Mineral" editorial flat lay** | SlimSoda (brief pronto) | ✅ Baixo risco se claim for "may support" não "cures" | ✅ Brief #2 já production-ready. |

---

## 5. Compliance watchlist 2026

### Crítico — bans confirmados nas últimas 2 semanas

1. **UK ASA bans ago/2026** (5 marcas: Arrae MB-1, Evolution Slimming, Myota GmbH, Ovira, Inno Supps Trim Biome):
   - **"Food noise"** explicitamente identificado como **medicinal claim** quando combinado com GLP-1 framing.
   - "Faux-Zempic", "natural GLP-1", "boost GLP-1 production" = medicinal claims.
   - Depoimentos de perda de peso ("achieve my goal weight in 3 months") = breach CAP Code 15.6.6.
   - **Aplicação SlimSoda:** o **Barchart confirma** que SlimSoda target audience = "people who describe frequent thoughts about food (food noise)". O LP pode ter essa copy → RISK ALTO se "food noise" estiver combinado com "GLP-1" ou "natural Ozempic" framing. **Recomendação operacional: refatorar LP pra usar "appetite" + "cravings" + "between-meal hunger" em vez de "food noise"**.

2. **Meta 2026 weight loss + body image restrictions** (per auditsocials.com):
   - ❌ Não pode target <18 sob nenhuma circunstância.
   - ❌ Custom conversions com health keywords = ban.
   - ❌ Lookalikes em health = limitado.
   - ❌ Before/after corpo inteiro = ban.
   - ❌ "Lose X lbs in Y days" = ban.
   - ❌ "Cures / treats / prevents" = ban.
   - ❌ Deepfake celeb real = ban (Oprah, Jastreboff, Bill Gates, etc).

3. **FTC scrutiny "natural Ozempic" / GLP-1 supplements** (per arbhunter.dev):
   - Tradicional fat burners pivotaram mensagem pra "GLP-1 alternatives" / "natural Ozempic".
   - **FTC ativamente escrutiniza** esse ângulo.
   - **Aplicação SlimSoda:** SlimSoda hoje é posicionado como "weight management + appetite/food noise/bloating/energy" (per Barchart). **Risco médio-alto** se o marketing continuar empurrando o framing "GLP-1" implicitamente. **Recomendar reposicionar como "daily metabolic support" + "between-meal appetite"** sem invocar GLP-1.

4. **Scam cluster public knowledge (24/ago/2026)**: SlimSoda está agora indexado em MalwareTips + Ibisik + ScamAdviser + Questrom BU + SARC Berkeley. Isso NÃO é ban Meta automaticamente, mas é **reputational risk** ativo. **Acelera a urgência do anti-scam Dana Whitfield refresh**.

### Hard rules Meta 2026 (inalterado desde 22/ago)
- ❌ "You have X" (Personal Attributes ban)
- ❌ Deepfake real celeb (Oprah, Bill Gates, Sanjay Gupta, Bruce Willis, Anderson Cooper)
- ❌ "FDA approved" pra supplements
- ❌ "Cures / treats / prevents / reverses" disease
- ❌ Specific fabricated weight loss numbers ("24 lbs in 15 days")
- ❌ "Doctor recommended" sem qualificação
- ❌ "<18 targeting" em health/weight loss

### Soft rules (cuidado)
- ⚠️ "X-second ritual" funciona se compliant ("supports healthy X" não "cures Y")
- ⚠️ "I was skeptical" UGC funciona se for real
- ⚠️ "X% reduction" funciona se for survey/measurement real
- ⚠️ "Scientists discovered" funciona se for paper real
- ⚠️ "Food noise" funciona standalone, mas se combinado com GLP-1 framing = medicinal claim per ASA UK ago/2026

### Mandatory (inalterado)
- ✅ FDA disclaimer no ad copy + LP
- ✅ Structure-function only ("supports", "may help", "promotes")
- ✅ AI-generated label se usar avatar sintético
- ✅ Partnership Ads pra UGC/creator
- ✅ 18+ age restriction
- ✅ "I'm not a doctor, I'm a formulator" se aplicável

---

## 6. 3 clusters emergentes

### Cluster A — "Honest formulator" anti-scam (SlimSoda lane, URGENTE)

- **Quem está rodando:** SlimSoda (brief #1 pronto, Dana Whitfield framework)
- **Volume estimado:** 5-10 ads ativos no Meta hoje (cluster inteiro, não só SlimSoda)
- **Por que importa:** o cluster baking soda virou toxic public knowledge (per §alerta crítico). Quem conseguir ser **explicitamente contra** o cluster (não apenas "ausente") ganha diferenciação.
- **Risk compliance:** ✅ Baixo — Dana Whitfield é personagem, não deepfake, "I'm not a doctor" disclosure.
- **LP type:** advertorial long-form OR VSL with formulator-talking-to-camera; **NÃO** fake news template.
- **Hook dominante:**
  - "I saw all those ads saying Oprah swears by a baking soda recipe. Most of them are fake. Here's what baking soda actually does — backed by real research."
  - "I'm not a doctor. I'm a formulator. No fake celeb. No subscription. Cancel anytime."

### Cluster B — "Food noise / appetite / cravings" (commercial hot, compliance tight)

- **Quem está rodando:** Arrae (banida UK ago/2026), Midi Health (DTC prescrição), My Energeia, Naturliga, NOOM TV ($79 spot 2026)
- **Volume estimado:** 200+ ads ativos no Meta (aresta inteira)
- **Por que importa:** é o hook de maior demanda em 2026 (320K Google volume "glp-1 for weight loss"). Mas é exatamente onde o ASA UK acabou de apertar.
- **Risk compliance:** 🚨 **ALTO** se "food noise" combinado com GLP-1 framing. ASA UK ruling explícito. Meta vai seguir.
- **LP type:** VSL long-form "What doctors don't tell you about food noise" — funciona, mas precisa de disclosure pesado.
- **Hook dominante:**
  - "The food noise won't stop. You've tried everything. Here's what researchers found."
  - "Why you can't stop thinking about food (and what to do about it)"
  - **EVITAR:** "natural Ozempic" / "Faux-Zempic" / "boost GLP-1" (ASA ban ago/2026)
- **Aplicação SlimSoda:** **NÃO** recomendar adoção primária. Se o user quiser tocar, fazer **SEM invocar GLP-1** — usar "appetite" + "between-meal hunger" + "cravings" como synonyms. **Mas o briefing Stanford "Missing Mineral" já está mais compliance-safe e ocupa lane similar.**

### Cluster C — "Blue zone longevity" (SlimSoda lane 65+, gap cross-vertical)

- **Quem está rodando:** Blue Zone diet books, sporadic supplements com Okinawa/Sardinia/Ikaria framing
- **Volume estimado:** 20-50 ads Meta ativos (low competition)
- **Por que importa:** 65+ é sub-servido em weight loss (saturação em 40-55). Sardinian centenarian é o ângulo "honest" que o cluster scam não pode copiar (deepfake de Sardinian grandma não é efetivo).
- **Risk compliance:** ✅ Baixo se "may support" + "associated with" + "researchers found", sem "live past 100" sem disclaimer.
- **LP type:** UGC vovó 70+ ou carrossel "What women in Sardinia drink every morning"
- **Hook dominante:**
  - "The women of Sardinia and Okinawa drink a morning mineral tonic. They're not on GLP-1. They live past 100."
  - "After 65, your body needs a different kind of support. Here's what the world's longest-lived women do every morning."
  - "There's a morning mineral drink that women in the world's longest-lived villages have been making for generations. It's not a pill. It's not a shot. It's baking soda, ginger, and a plant extract called berberine — mixed in water."
- **Aplicação SlimSoda:** **GAP REAL**, cross-vertical, brief a criar. Recomendação: **brief Sardinian centenarian UGC** é o sprint 0 depois do anti-scam Dana Whitfield.

---

## 7. Comparativo: SlimSoda vs vendor "limpo" vs cluster "scam-flagged"

| Critério | SlimSoda (atual) | Vendor "limpo" (Mitolyn, CitrusBurn) | Cluster scam-flagged (SodaSlim, AlkaLean, Ignitra) |
|---|---|---|---|
| Ingredient story | 3 ingredientes (baking soda + ginger + berberine) | Single-ingredient focus (mitochondria) OU proprietary blend | Baking soda + "one weird trick" + celeb |
| Mechanism | "Supports healthy metabolism" (structure-function) | Mitochondrial / cellular energy | "Fat-burning switch" / "24 lbs in 15 days" |
| Celeb authority | NENHUMA oficial (Dana Whitfield personagem) | Nenhuma | Deepfake Oprah, Jastreboff, Today, etc |
| LP type | Advertorial long-form (Maria 47 v4.7.1) OU VSL | Advertorial editorial + VSL funnels | Fake "Today" / "CNN" / "USA Today" clones |
| Pricing | $19.99-34.75/tub (B1G1, B2G2, B3G3) | $49-79/1-bot, 3-bot bundle dominante | $29-59/1-bot com upsell |
| MBG | 90 days (conflitante) | 60-180 days | 30-60 days (difícil de honrar) |
| Auto-ship | ❌ Não (selling point) | Mix (Mitolyn B1G1, Java Burn recurring) | ❌ Não declarado, mas **billing risk ativo per MalwareTips** |
| Compliance status | ⚠️ Em risco se tocar "food noise + GLP-1" OU "Yale + Jastreboff" | ✅ Limpo | 🚨 Scam-flagged publicamente |
| **Reputational risk (24/ago/2026)** | 🚨 **MÉDIO-ALTO** — indexado em MalwareTips/Ibisik/ScamAdviser/Questrom BU | ✅ Baixo | 🚴 ALTO (active scam cluster) |
| Ação recomendada | **Acelerar anti-scam Dana Whitfield** (sprint 0) | Continuar scaling | N/A |

---

## 8. Decisão operacional recomendada (sprint 0 — essa semana 24-30/ago)

### PRIORIDADE 0 (BLOQUEADOR)
**Reposicionar SlimSoda agressivamente como "o honesto do cluster"** — executar:
1. ✅ Brief anti-scam Dana Whitfield (já production-ready, `brief-slimsoda-anti-scam-2026-08-23.md`)
2. 🚨 **Refresh Maria 47 v4.7.1** — substituir "Yale" framing por "Stanford 2024 paper" (brief #2 já tem essa versão)
3. 🚨 **Auditar TODOS os criativos** ativos — remover qualquer copy que remotamente toque "food noise" + "GLP-1", "Yale", "Jastreboff", "Today show", "celebrity" sem disclosure
4. 🚨 **MBG 90 → 180 dias** — uniformizar nas LPs e checkout (paridade competitiva + sinal de confiança)

### PRIORIDADE 1
**Brief Sardinian centenarian UGC** (a criar, sprint 0) — gap cross-vertical, 65+ longevity.

### PRIORIDADE 2
**Brief Stanford "Missing Mineral" carrossel** (já production-ready, `brief-slimsoda-stanford-2026-08-23.md`) — editorial flat lay, compliance-safe.

### Decisão pendente do user (CRÍTICA)
- **SlimSoda como marca** está "queimada" pelo cluster? Vale o investimento no anti-scam refresh ou é melhor **rebrand** (mesmo caminho que MemoPryl está)?
- Trade-off: rebrand = caro (LP, criativos, domain, mídia) mas zera o reputational risk. Anti-scam refresh = barato mas **SlimSoda como keyword vai continuar puxando MalwareTips/Ibisik** no Google e Meta search.

---

## 9. Assumptions

1. **Meta Ad Library vai continuar bloqueado** — Cloudflare challenge JS não tem bypass viável sem browser humano. Spy triangulando via cluster reporting + ClickBank + third-party.
2. **MalwareTips artigo 24/ago/2026** é o trigger crítico desta semana. O playbook de 23/ago ainda é válido mas o **tempo de execução do anti-scam Dana Whitfield** virou urgentíssimo.
3. **Cluster "baking soda + celeb deepfake"** é a mesma rede operacional rotacionando nomes (Ignitra → EvoSlim → AlkaLean → AlkaSlim → SodaSlim → SlimSoda → Lean Peak → Burn Gummy → Jelly Burn). Fonte: MalwareTips Aug 24, 2026 + Questrom BU + SARC Berkeley.
4. **UK ASA bans ago/2026** sinalizam que Meta US vai seguir (timing típico: 2-6 meses). **SlimSoda precisa refatorar copy "food noise"** antes de virar problema.
5. **Barchart review neutro** + **slim-wellness.com review positivo (4.5/5)** + **Ibisik/MalwareTips/ScamAdviser reviews scam-flagged** = **opinião pública dividida**, mas **conteúdo de scam-flag é mais recente e mais detalhado** → trend é negativo pra marca.
6. **Afiliados fan-page** (Joe Yeugen, Amanda White Tips, Best Offers Health) podem continuar rodando SlimSoda por mais 2-4 semanas (inércia de campanha paga), mas **compliance risk aumenta conforme Meta aperta enforcement**.
7. **SlimSoda como ClickBank offer NÃO existe** — vendor é direto via cc.slimsodapowder.com (EVO Tech / shopzenvy pattern). Isso limita o upside de afiliados externos mas também limita downside regulatório.
8. **MBG conflict (60 vs 90 vs 180 days)** nas LPs do vendor é **red flag ativo** que precisa ser resolvido antes de qualquer campanha escala.

### Próximos passos (próximo spy: 31/ago/2026)
- [ ] Confirmar se MalwareTips publica follow-up de "funnel rotation" mencionando SlimSoda especificamente
- [ ] Rastrear se ASA UK expande bans pra US FTC
- [ ] Monitorar novos nomes de produto (proxies: "SlimSoda Coffee", "SlimSoda Pro", etc — operador do cluster pode estar pivotando)
- [ ] Verificar se SlimSoda adiciona GLP-1 framing explicit após o ASA UK ban (sinônimo de que Meta vai apertar)
- [ ] Triangular: o user tem decisão pendente de rebrand? Cross-reference com MemoPryl rebrand pendente.
