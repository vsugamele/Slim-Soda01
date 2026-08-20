# Ângulos Validados — MemoFlow (3 variantes)

O publisher MemoPryl está rodando **3 ângulos principais** em paralelo. Cada um representa uma entry point diferente pra mesma offer (MemoFlow, B2G1, 90-day guarantee, $59/bottle final).

## Ângulo #1: BILL GATES REVEALS (maxlead cold traffic)

**LP:** `lps/funnel-1-ml05/` e `lps/funnel-2-ml06/`
**Headline:** "Bill Gates Reveals the $1 Honey Remedy Reversing Alzheimer's Without Drugs, Infusions or Side Effects"
**Mecanismo do hook:** celebrity-anchor + dollar-anchor ("$1") + disease-anchor ("Alzheimer's") + negativo-list ("Without Drugs, Infusions or Side Effects")
**Tom:** jornalismo investigativo, clickbait responsável
**VSL:** Vturb player, 60-90min
**CTA:** "CLAIM MY 3 FREE BOTTLE NOW" (delay 47:08)
**Compliance Meta:** ⚠️ **"Reversing Alzheimer's" é medical claim disfarçado** — esse ângulo NÃO roda em Meta ads, só em native/taboola/outbrain. Em Meta substituir por "researchers found" ou "study shows".

### Por que funciona em native mas não em Meta

| Plataforma | Razão |
|---|---|
| Native/Outbrain/Taboola | Tráfego é opt-in (user já tá no site de conteúdo), review mais leve |
| Meta Ads | Tráfego é interruptivo, review de medical claim é automático. "Reversing Alzheimer's" = flag instantâneo |

## Ângulo #2: HONEY TRICK DOING WRONG (VSL standalone)

**LP:** `lps/article-vsl-standalone/`
**Headline:** "The 'Honey Trick' Is Real. But Everyone's Doing It Wrong. I Know Because I'm the One Who Created."
**Mecanismo do hook:** contrarian + autoridade ("I'm the one who created") + correção de erro comum
**Tom:** first-person confession, journalistic investigation
**Mecanismo explicado:** 2 ingredientes (Ikaria honey anthocyanins + lithium orotate) em ordem específica. "Not honey alone."
**Oferta:** B3G3 (6 bottles) @ $19.99/bottle = $59 total
**Compliance Meta:** ✅ **OK** — "honey trick" é descritivo, mecanismo é "may help support", tem disclaimer FDA inline.

### Por que funciona como standalone

A VSL standalone (com GIFs) é "scrollable" — funciona em mobile low-end e onde vídeo não carrega. É o backup do vídeo principal.

## Ângulo #3: $1 HONEY REMEDY (PDP brand)

**LP:** `lps/pdp/`
**Headline:** "MemoFlow® — Buy Two, Get One Free"
**Mecanismo do hook:** direct-response product page, sem hook emocional
**Tom:** institucional, FAQ-heavy, trust signals (12,000+ users, 4.8/5)
**Tech patentada:** Neural MicroLock™
**Compliance Meta:** ✅ **OK** — direct product, sem claim médico.

### Função no funil

Bottom-of-funnel / branded traffic. Quem chega no PDP já viu o VSL ou clicou de um retargeting. O PDP **confirma** o que o VSL prometeu, sem sensationalismo.

## Comparação dos 3 ângulos

| Atributo | Bill Gates | Honey Trick | PDP |
|---|---|---|---|
| **Topo de funil** | ✅ cold | ✅ cold | ❌ retargeting |
| **Tom** | Jornalismo investigativo | First-person confession | Institucional |
| **Mecanismo** | Implícito | Explícito (2 ingredientes) | Brand + tech |
| **Compliance Meta** | ⚠️ reformular headline | ✅ OK | ✅ OK |
| **Duração** | 60-90min VSL | 5-10min scroll | 2-3min scroll |
| **Tipo de criativo Meta** | (não roda) | UGC, before/after (cuidado), educational | (não roda direto, só retargeting) |

## Próximo passo

- [ ] Engenharia reversa da VSL original (Whisper transcription) pra mapear os 12 blocos E3
- [ ] Identificar qual dos 2 ml (05 vs 06) é o "control" (mais antigo = controle)
- [ ] A/B test ângulo Meta-safe "researchers found" vs "study confirms" vs "new finding" para o angle Bill Gates
