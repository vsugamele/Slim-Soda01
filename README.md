# SlimSoda + Cardio Clear DR Project

**Knowledge base + entregáveis pra 2 produtos DR (Direct Response) do publisher Linfaflow.**

## Produtos

- **Cardio Clear** (Sanjay Gupta, MD · NEJM peer-reviewed) — supplement cardiovascular, "Arterial Cement" mechanism, 3 Sardinian Blue Zone ingredients, 90-Day MB
- **SlimSoda** (Dana Whitfield, Formulator) — weight management, "Wake → Protect → Flip" 3-ingredient switch (baking soda + ginger + berberine), 60-Day Empty-Tub MB

## Estrutura

```
hub-preview/
├── _canonical-copy-cardio-clear.md    (19KB — canon oficial Cardio)
├── _canonical-copy-slimsoda.md        (15KB — canon oficial SlimSoda)
├── _banco-padroes-dr.md               (10 mecânicas DR de 3 advertisers)
├── _briefing-cardio-cleare-slimsoda-style.md
├── _brief-visual-slimsoda.md
├── _transcricao-B1H2-enfermeira-ER.md
│
├── quiz-v5-server/                    (Node + Express + OpenRouter + ElevenLabs)
│   ├── server.js
│   ├── prompts.js
│   ├── quiz-track.js                  (CRM frontend)
│   ├── quiz-slimsoda-v5.html          (15 steps, LLM 3 moments)
│   ├── quiz-cardio-clear-v5.html      (15 steps, Sanjay Gupta persona)
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
├── cardio-clear/                      (3 HTML clones)
│   ├── cbs-breaking-news.html         (VSL clone 24KB)
│   ├── index.html                     (PDP clone 30KB)
│   └── advertorial-cbs.html           (advertorial escrito do zero 25KB)
│
├── slimtide-vsl-recon/                (recon VSL TODAY/NBC)
├── southbeach-vsl-proxy/              (proxy sister template)
├── shopzenvylite-buy1get1/            (SlimSoda buy page 100% clone 110KB)
├── funnelish-checkout/                (checkout customizado)
├── quiz-auraly-soulmate/              (Auraly quiz pattern + SlimSoda MVP)
│
└── references_v5/                     (HUB NAVEGÁVEL v10)
    ├── index.html                     (hub 11 cards, sidebar 7 pages)
    ├── funnel.html                    (mapa end-to-end SVG)
    ├── patterns.html                  (36+ patterns com filtros)
    ├── README.md
    └── pages/
        ├── slimsoda-article-lp/       (1)
        ├── slimtide-vsl-recon/        (2)
        ├── southbeach-vsl-proxy/      (3)
        ├── shopzenvylite-buy1get1/    (4)
        ├── funnelish-checkout/        (5)
        ├── quiz-auraly-soulmate/      (6)
        ├── haritaki-spy/              (7 — Peptiques® pineal decalcification)
        ├── estrutura-cbo-bifi/        (8 — @gbifi curso CBO)
        ├── dtc-affiliate-black/       (9 — @gbifi DTC image ads)
        ├── slimsoda-native-ads/       (10 — 5 criativos nativos WhatsApp)
        └── amanda-rebuild/            (11 — Método Amanda N3 + 2 ads black)
```

## Quick start

### Rodar quiz server
```bash
cd quiz-v5-server
cp .env.example .env       # colocar OPENROUTER_API_KEY + ELEVENLABS_API_KEY
npm install
npm start
# abre http://localhost:3000/quiz-slimsoda-v5.html
# ou http://localhost:3000/quiz-cardio-clear-v5.html
```

### Abrir hub navegável
```bash
# deploy local: python -m http.server 8000 --directory references_v5
# abre http://localhost:8000/
```

## Hub deployed

**https://z94zbtshpymju.space.minimax.io** (v10, 11 referências, 135 files, 14.7MB)

## Documentação adicional

- **Memory index:** ver topic memory `slimsoda-cardio-clear-project` na knowledge base do agente
- **Patterns bank:** `references_v5/patterns.html` (36 mecânicas DR extraídas)
- **Funil end-to-end:** `references_v5/funnel.html` (mapa SVG com tracking stack)
- **Canon copy:** `_canonical-copy-cardio-clear.md` + `_canonical-copy-slimsoda.md`
- **Banco DR patterns:** `_banco-padroes-dr.md`

## Hard rules do projeto

- **NÃO inventar prova** (sem estudo, médico, paciente, número, depoimento, antes/depois, escassez, garantia fabricada)
- **NÃO instalar afirmação médica falsa** ("stop your medication", "100% safe", "cure")
- **Sempre "talk to your doctor"** no CTA Cardio Clear
- **Sempre disclaimer "dietary supplement"** no CTA SlimSoda
- **Persona canon overrides expert invention** — sempre extrair do HTML oficial

## Stack de tráfego (Bifi)

- P1 Primary Text (ABO 1-5-3) → P2 Imagem (ABO 1-5-10) → P3 Escala (CBO bidcap 60% CPA) → P4 Cemitério (CBO 1-1-10 cost cap 70% CPA)
- Régua IC: ≤$5 QUALIFICADO · $6-9 MAIS TEXTOS · >$9 MORTO
- Dia-3 P2: ≥15 vendas ESCALA · 10-15 REFINAR · <10 VOLTA P1
- Teto da conta: 10 ângulos
