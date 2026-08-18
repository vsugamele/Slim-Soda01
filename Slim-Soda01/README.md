# Slim-Soda01

**Funil de DR (Direct Response) — top of funnel pra SlimSoda.**

## Arquitetura

```
Slim-Soda01/
├── index.html              ← Article LP (SlimSoda Yale + Baking Soda) [TOP OF FUNNEL]
├── images/                 ← 12 imagens do LP
├── slimtide-vsl/
│   ├── index.html          ← VSL recon (SlimTide TODAY/NBC social proof) [MIDDLE]
│   ├── print-user-view.png
│   └── vsl-assets/         ← cover, poster, thumbnail, main.m3u8, player.js
└── buy-page/               ← Buy page Shopify (B1G1 $29.99) [BOTTOM OF FUNNEL]
    ├── index.html          ← 5 CTAs apontam pro checkout affiliate
    └── images/             ← 17 imagens do produto + brand
```

**Fluxo completo:** user abre `index.html` (LP) → clica em "Click to watch" → vai pra `slimtide-vsl/index.html` (VSL) → após vídeo, clica no CTA → vai pra `buy-page/index.html` (Shopify) → clica "Add To Cart" → abre checkout affiliate (`slimsodapowder.com/cc2/dtc/pay/checkout.php?package=3bottles&affid=aff_6821377`).

## Checkout affiliate (atualizado 18/ago/2026)

Todos os 5 botões CTA da buy-page (`Add To Cart`, `SEND MY 2 TUBS`, `TRY RISK-FREE`, etc) apontam pra:

```
https://slimsodapowder.com/cc2/dtc/pay/checkout.php?package=3bottles&hid=b2lkPW9mZl81MDU4NzI1JmFpZD1hZmZfNjgyMTM3NyZ1aWQ9YmxfMDM4MDIyMg%3D%3D&affid=aff_6821377
```

- **Package:** 3bottles (B1G1 = 2 tubs, 60-day supply)
- **Affiliate ID:** `aff_6821377` (seu)
- **Tracking params:** hid (subscription hash) + uid (user ID)

## Rodar local

```bash
# Python 3
python -m http.server 8000

# OU Node
npx http-server -p 8000
```

Abre http://localhost:8000/ — começa pelo LP.

(precisa de server local porque o VSL tem CORS em alguns assets)

## Stack detectado (publisher original)

- **LP:** HTML estático, Georgia + Inter, sem dependências externas (só Google Fonts)
- **VSL:** Vturb embed (`main.m3u8` + `player.js` + `smartplayer.js`)
- **VSL assets:** cover.jpg, poster.jpg, thumbnail.jpg (3 resoluções diferentes)
- **Buy page:** Shopify (Zenvy) com Funnelish checkout overlay
- **Checkout:** Custom DR affiliate flow (slimsodapowder.com)

## Tracking (já integrado no LP + VSL)

- **Meta Pixel:** `1619587959397761` (no `<head>` do LP)
- **Supabase tracker:** `imphq_clicks` / `imphq_events` / `imphq_leads` tables
- **Visitor UUID:** localStorage (persiste cross-session)
- **Session UUID:** sessionStorage (TTL 30min)
- **UTM capture:** localStorage passthrough entre LP → VSL → Buy page
- **Meta events:** PageView, ViewContent, AddToCart, InitiateCheckout, Lead

## Customizar pra rodar como ads

1. **Trocar o CTA outbound da VSL** (`slimtide-vsl/index.html`) — substituir o link por seu checkout real
2. **Trocar Meta Pixel** — adicionar `<script>` com seu Pixel ID no `<head>` de TODOS os HTMLs (LP, VSL, Buy page)
3. **Adicionar UTMs** nos links do LP pra tracking de campanha
4. **A/B test criativos** — as imagens do LP estão em `images/`, todas são editáveis (webp/png)
5. **Verificar checkout** — todos os 5 botões CTA da buy-page devem apontar pro mesmo checkout URL

## Deploy em produção

Este projeto é **static site puro** (HTML + CSS + JS + imagens). Funciona em qualquer host estático:

- **Vercel:** `vercel deploy` (zero config)
- **Netlify:** drag & drop na dashboard
- **Cloudflare Pages:** connect GitHub repo
- **GitHub Pages:** push to `gh-pages` branch

**Importante:** o VSL e a buy-page usam `path absolute` (`/slimtide-vsl/`, `/images/`) — funciona em qualquer host que serve da raiz. NÃO use subpath.

## Arquivos importantes pra backup

- `index.html` (16.9KB) — LP inteira, copy canônica
- `slimtide-vsl/index.html` (14.5KB) — VSL recon canônica
- `slimtide-vsl/vsl-assets/main.m3u8` — video source
- `slimtide-vsl/print-user-view.png` (392KB) — print original da VSL completa
- `buy-page/index.html` (109KB) — Buy page Shopify canônica
- `buy-page/images/` (17 files) — Product images + brand

## Proveniência

- LP clonada de `slimsoda.corewellnessjournal.com` (article LP top of funnel)
- VSL clonada de `trustedconsumervoice.com/vsl/slimtide/v1` (VSL TODAY/NBC social proof)
- Buy page clonada de `shopzenvylite.com/pages/slimsoda-buy-1-tub-get-1-free` (Shopify + Funnelish)
- Capturadas em 2026-08-16, 100% preservadas (HTML + imagens originais, sem edição)
- Checkout affiliate atualizado em 2026-08-18 (slimsodapowder.com/cc2/dtc/pay)
