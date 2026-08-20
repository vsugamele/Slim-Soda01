# PDP Oficial — MemoFlow® (Next.js)

Product detail page oficial do publisher MemoFlow. Next.js export estático (RSC + tailwind).

## URL live

`https://slim-soda01.vercel.app/references_v5/by-product/memoflow/lps/pdp/`

## Estrutura de arquivos

```
pdp/
├── index.html               # 154KB / 1443 linhas — Next.js SSR
├── favicon.svg              # 1KB
├── og-image.png             # 193KB (Open Graph)
├── _next/
│   └── static/
│       ├── css/             # 2 CSS bundles (5KB + 78KB)
│       └── media/           # 12 woff2 fonts
└── images/
    ├── mastercard.png       # 52KB
    ├── visa.png             # 37KB
    ├── seal-90day.png       # 284KB (selo de garantia)
    ├── memoflow/
    │   ├── 002.png          # 1.6MB (frasco do produto)
    │   ├── banner-tryit-desktop.png  # 393KB
    │   ├── banner-tryit-mobile.png   # 779KB
    │   ├── testimonial-frame-v2.png  # 1.1MB
    │   ├── people/ (8 JPGs) # avatares
    │   └── product/ (4 imgs) # lifestyle shots
    └── og-image.png         # (alternativo, mesma função)
```

## Canon do PDP (fonte da verdade da offer)

### Mecanismo (texto oficial do PDP)

> "Naturally-sourced actives and nothing else: **Ikarian mountain honey extract (anthocyanins) for clearance support**, and **natural lithium orotate for neuroprotective support**, delivered via **Neural MicroLock™**."

### Offer (B2G1)

> - **Buy Two, Get One Free** – MemoFlow® (three bottles for the price of two)
> - Dual-action cognitive support in one 10-second daily ritual
> - 90-Day Money-Back Guarantee — even on empty bottles
> - FREE same-business-day shipping from the USA
> - **Up to 70% OFF**

### Dosagem

> "Two drops under the tongue each morning, held a few seconds, then swallowed."

### Tech patentada

> **Neural MicroLock™** — formato sublingual que entrega os ingredientes sem ficarem presos em cápsula.

### Trust signals

- Rated 4.8/5
- Trusted by 12,000+
- "Not available on Amazon or eBay" (anti-counterfeiting)
- Made in USA, FDA-registered, GMP-certified, batch-tested

### Disclaimer FDA

> "*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.*"

## Comparação VSL standalone vs PDP

| Atributo | VSL standalone | PDP |
|---|---|---|
| **Garantia** | 60-Day | 90-Day |
| **Anchor** | $100/bottle | (não menciona) |
| **Final price** | $19.99/bottle | "up to 70% off" (B2G1) |
| **Oferta kit** | B3G3 (6 bottles) | B2G1 (3 bottles) |
| **Mecanismo** | "Wild Ikaria honey + lithium orotate" | "Neural MicroLock™ + Ikarian extract + lithium orotate" |
| **Tech patentada** | (não menciona) | Neural MicroLock™ |
| **Disclaimer FDA** | (não tem) | Sim |

⚠️ **Inconsistência VSL × PDP.** O PDP é a fonte da verdade (mais novo, mais oficial, mais defensivo juridicamente). A VSL foi provavelmente feita antes do PDP e tem garantia de 60 dias por copy antiga.

## Compliance

- ✅ Disclaimer FDA explícito
- ✅ "Cognitive support" (não "treat", "cure")
- ✅ Trust signals reais (12,000+ users, 4.8/5)
- ✅ Anti-counterfeiting ("Not on Amazon/eBay")
- ⛔ NUNCA remover o disclaimer
- ⛔ NUNCA usar "treat", "cure", "heal" — só "support", "designed to", "may help"

## Próximo passo

- [ ] Auditar o PDP contra Maria 47 v3 (SlimSoda) — comparar estrutura
- [ ] Verificar se checkout flow bate com a offer "B2G1 + 90-day"
- [ ] Confirmar que os 4 product/life imgs (life-1 a life-4) são lifestyle shots (não fake testimonials)
