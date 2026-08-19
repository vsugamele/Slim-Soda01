# Quiz SlimSoda v3 — Estrutura completa

> **Mudança principal (v2 → v3):** A v2 era "qualify-then-sell" (10 steps, todos form/cards). A v3 replica o padrão Auraly: **expert persona (Dr. Sarah Chen) + chat UX conversacional + progressive consciousness + desire amplification + personalized reveal com assets visuais**.

---

## Visão rápida

| | v2 | v3 |
|---|---|---|
| Steps | 10 | 11 (0-10) |
| UX | Form/cards | Chat UX + cards combinados |
| Expert | Nenhum | Dr. Sarah Chen (Yale) aparece em 5+ steps |
| Áudio | TTS genérico | Audio card com foto expert + narração TTS fallback |
| Imagem personalizada | Não | "Preparing your transformation" reveal com asset frame |
| Personalização | Só nome | Adapta copy com base em gender + age + struggle + when + desires |
| Methodology tooltips | ✅ | ✅ |
| Total size | 48KB | 50KB |

---

## Estrutura detalhada (11 steps)

### Step 0 — Hero (Pattern Interrupt)
- Bottle SVG animado + sparkles + 3 stat chips
- H1: "Why your body is **holding onto weight** — even when you do everything right"
- Sub: "Take this 90-second assessment with Dr. Sarah Chen, Yale endocrinologist"
- CTA: "Let's Begin →"
- **Method tag:** Pattern Interrupt + Authority Anchor (Cialdini)

### Step 1 — Gender (Micro-Commitment)
- 2 emoji cards (👩 / 👨) com sub-text
- H2: "First — who am I talking to?"
- CTA auto-advance após select
- **Method tag:** Cialdini's Consistency Principle

### Step 2 — Age (Identity Lock)
- 4 range cards (🌱 18-29, 🌿 30-44 [MOST POPULAR badge], 🍂 45-54, 🌳 55+)
- H2: "What's your age range?"
- **Method tag:** Identity Lock + Choice Architecture (Thaler & Sunstein)

### Step 3 — Expert Intro (Chat UX — KEYSTONE)
- 3 chat bubbles da expert com foto + status dot
- "Hi [name] 👋 I'm **Dr. Sarah Chen** — Yale-trained endocrinologist..."
- "What I'm about to show you, **9 in 10 doctors won't tell you**"
- "Let's keep going — I need to understand your body a little better"
- CTA: "Yes, I'm ready ✨"
- **Method tag:** Expert Persona + Conversational Trust

### Step 4 — Struggle (Loss Aversion)
- 4 cards viscerais (😩 belly, 😴 exhausted, 🍫 cravings, 😞 nothing works)
- H2: "Which one hurts the **most** right now?"
- **Method tag:** Kahneman's Loss Aversion

### Step 5 — Expert Reveal 1 (Progressive Consciousness)
- 3 chat bubbles da expert **usando o nome do user + a struggle escolhida**
- "I hear you, [name] 💜 **The stubborn belly that won't move** is not a willpower problem. It's a hormonal cascade."
- "When your **cortisol stays elevated**, your body locks the fat in."
- "The fix isn't another diet. It's **one molecule** that flips the switch back. **Two more questions.**"
- CTA: "Show me the research →"
- **Method tag:** Progressive Consciousness + Curiosity Gap (Loewenstein)

### Step 6 — When Started (Story Anchoring)
- 4 cards (👶 pregnancy, ⏰ 35-hormones, 💼 stress, 🤷‍♀️ can't pinpoint)
- H2: "When did the **stubborn weight** start showing up?"
- **Method tag:** Story Anchoring + Loewenstein's Gap

### Step 7 — Multi-Select Desires (Desire Amplification)
- 4 multi-select cards (👗 lose 15-40, ⚡ energy, 🍃 cravings-gone, 🪞 confidence)
- H2: "What outcomes are you **committing to**?"
- Counter: "0 outcomes selected" → atualiza ao vivo
- CTA: "Continue →" só destrava com ≥1 selected
- **Method tag:** Multi-Select Desire Amplification (Auraly core)

### Step 8 — Name Input (Reciprocity)
- Chat bubble da expert + input
- "Almost there 💜 Tell me — **what should I call you?**"
- CTA: "Begin my reading ✨" (destrava com 2+ chars)
- **Method tag:** Regan's Gift Exchange + Identity Lock

### Step 9 — Preparing (Open Loop + Personalized Reveal)
- Chat bubble: "Based on everything you shared with me, I'm preparing a personalized transformation roadmap for [name]... starting right now 👇🔮"
- **ASSET FRAME:** placeholder pra before/after image (com prompt pronto)
- Reveal card com 4 itens **personalizados** baseados nas respostas anteriores
  - "A 3-phase protocol to **melt 15-40 lbs without dieting**" (se desires inclui lose-weight)
  - "Daily habit to **kill the cravings at the root**" (se desires inclui cravings-gone)
  - etc
- CTA: "Reveal my protocol ✨"
- **Method tag:** Open Loop + Personalized Reveal (Auraly core)

### Step 10 — Result + Offer (Convergência)
- Check circle pop + H2: "Your protocol is ready, [name]"
- **Mechanism box** (dark): "🔬 THE MECHANISM (Yale 2024 Research) — The Cortisol Lock"
- **ASSET FRAME:** placeholder pra áudio da expert (com prompt + roteiro de 60s)
- **Audio card:** foto da expert + play + waveform + 0:00 / 0:36
  - Toca via Web Speech API (fallback) OU `audio/result.mp3` (quando você criar)
- **Offer card:**
  - "YOUR PROTOCOL IN A BOTTLE"
  - "SlimSoda 30-Day Metabolic Reset"
  - Anchor: ~~$297~~ → **$29.99** (−90% badge)
  - 4 includes (supply + protocol PDF + WhatsApp + meal plan)
- **Urgency banner:** "⏰ This protocol is reserved for you for 24 hours"
- **Countdown:** 23:59:47 → 00:00:00 (real-time)
- CTA: "Claim My Protocol Now →"
- Disclaimer: "🔒 Secure checkout · 60-day money-back guarantee"
- **Method tag:** 9 técnicas convergem (Sunk Cost + Personalization + Authority + Risk Reversal + Anchoring + Scarcity + Urgency + Reciprocity + Curiosity close)

---

## As 22 técnicas DR aplicadas (mapa)

| # | Step | Técnica | Author/Source |
|---|------|---------|---------------|
| 1 | 0 | Specificity Bias (7 in 10 women) | Kahneman |
| 2 | 0, 3, 10 | Authority Anchor (Yale) | Cialdini |
| 3 | 0 | Pattern Interrupt (90s promise) | Binet & Field |
| 4 | 1 | Micro-Commitment Ladder | Cialdini |
| 5 | 2 | Identity Lock (MOST POPULAR) | Thaler & Sunstein |
| 6 | 3, 5, 6, 8, 9, 10 | **Expert Persona** | Reeves & Nass |
| 7 | 4 | Loss Aversion | Kahneman & Tversky |
| 8 | 4 | Visceral Description | Heath |
| 9 | 5, 9 | **Progressive Consciousness** | Loewenstein |
| 10 | 7 | **Desire Amplification** (multi-select) | Auraly core |
| 11 | 6 | Story Anchoring | Pennebaker |
| 12 | 8, 9 | Reciprocity (name → personalized) | Regan |
| 13 | 9 | Open Loop (preparing) | Loewenstein |
| 14 | 5, 9, 10 | Personalization (adaptative copy) | Auraly core |
| 15 | 10 | Sunk Cost (3-4 min invested) | Thaler |
| 16 | 10 | Risk Reversal (60-day MB) | Cialdini |
| 17 | 10 | Anchoring High ($297 vs $29.99) | Tversky & Kahneman |
| 18 | 10 | Scarcity (24h reserved) | Cialdini |
| 19 | 10 | Urgency (countdown 23:59:47) | Binet & Field |
| 20 | 3, 5, 6, 8, 9 | Conversational UX (chat vs form) | Auraly pattern |
| 21 | 5 | Curiosity Gap (one molecule) | Loewenstein |
| 22 | 1, 2, 4, 6, 7 | Friction Reduction (auto-advance) | UX best practice |

---

## Visual & UX patterns

- **Color:** Purple gradient (#6B2FB3 → #A78BFA) + accent green (#10B981)
- **Chat UX:** iMessage-style — expert (left, white bubble) + user (right, purple bubble)
- **Method tags:** Yellow gradient chip with `?` icon → tooltip on hover
- **Asset frames:** Striped purple bg + dashed purple border + label "ASSET NEEDED" + prompt block
- **Auto-advance:** Card-style steps advance on click (no Continue button)
- **Animations:** float (bottle), pulse-dot (expert online), bubbleIn (chats), pop (check), spin (loader), fadeIn (steps), sparkle (decorative)
- **Responsive:** max-width 480px (mobile-first), full-width on desktop with shadow

---

## O que cada asset substitui quando você plugar

| Placeholder | Asset real (criar com) | Arquivo |
|-------------|----------------------|---------|
| `avatar-fallback` "SC" | Foto real da expert | `images/expert-headshot.jpg` |
| Audio card TTS | Áudio MP3 narrado | `audio/result.mp3` |
| Asset-frame "Personalized Before/After" | Foto side-by-side | `images/transformation.jpg` |
| (opcional) Asset-frame "Letter" | Letter/prescription visual | `images/protocol-letter.jpg` |

Ver `quiz-assets-needed.md` para os prompts prontos de cada asset.

---

## Métricas alvo (vs v2)

| Métrica | v2 | v3 esperado |
|---------|-----|-------------|
| Completion rate | 60% | 70% (chat UX reduz bounce) |
| Time to complete | 90s | 120s (chat UX é mais imersivo) |
| Quiz → checkout conversion | baseline | **+40-60%** (personalization + expert persona) |
| Offer take rate | baseline | **+18%** (multi-select desires) |

---

## Próximas evoluções (v4+)

- IP geolocation ("Your protocol will be personalized for **São Paulo, Atibaia**")
- Multi-day re-engagement (email se user sai)
- A/B test persona (Dr. Sarah Chen Yale vs Maria Luz Brazilian nutróloga)
- Voice cloning (a expert fala o NOME do user no áudio)
- Personalized video (HeyGen com expert olhando pra câmera)
- Branching (se user marca "nothing works" → step extra de garantia)
