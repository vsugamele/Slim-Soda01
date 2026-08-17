# Slim-Soda01

**Funil de DR (Direct Response) — top of funnel pra SlimSoda.**

## Arquitetura

```
Slim-Soda01/
├── index.html              ← Article LP (SlimSoda Yale + Baking Soda)
├── images/                 ← 12 imagens do LP
└── slimtide-vsl/
    ├── index.html          ← VSL recon (SlimTide TODAY/NBC social proof)
    ├── print-user-view.png
    └── vsl-assets/         ← cover, poster, thumbnail, main.m3u8, player.js
```

**Fluxo:** user abre `index.html` (LP) → clica em qualquer "Click to watch" (4 botões ao longo do LP) → vai pra `./slimtide-vsl/index.html` (VSL recon com cover TODAY/NBC + video player).

## Rodar local

```bash
# Python 3
python -m http.server 8000

# OU Node
npx http-server -p 8000

# Abre http://localhost:8000/
```

(precisa de server local porque o VSL tem CORS em alguns assets)

## Customizar pra rodar como ads

1. **Trocar o CTA outbound da VSL** (slimtide-vsl/index.html) — substituir o link de `trustedconsumervoice.com` pelo seu checkout real (shopify, funnelish, etc)
2. **Trocar Meta Pixel** — adicionar `<script>` com seu Pixel ID no `<head>` de ambos os HTMLs
3. **Adicionar UTMs** nos links do LP pra tracking de campanha
4. **A/B test criativos** — as imagens do LP estão em `images/`, todas são editáveis (webp/png)

## Stack detectado (publisher original)

- LP: HTML estático, Georgia + Inter, sem dependências externas (só Google Fonts)
- VSL: Vturb embed (`main.m3u8` + `player.js` + `smartplayer.js`)
- VSL assets: cover.jpg, poster.jpg, thumbnail.jpg (3 resoluções diferentes)

## Arquivos importantes pra backup

- `index.html` (16.9KB) — LP inteiro, copy canônica
- `slimtide-vsl/index.html` (14.5KB) — VSL recon canônica
- `slimtide-vsl/vsl-assets/main.m3u8` — video source
- `slimtide-vsl/print-user-view.png` (392KB) — print original da VSL completa

## Proveniência

- LP clonada de `slimsoda.corewellnessjournal.com` (article LP top of funnel)
- VSL clonada de `trustedconsumervoice.com/vsl/slimtide/v1` (VSL TODAY/NBC social proof)
- Capturadas em 2026-08-16, 100% preservadas (HTML + imagens originais, sem edição)
