# Slim-Soda01

**Funil de DR (Direct Response) — top of funnel pra SlimSoda.**

## Arquitetura

```
Slim-Soda01/                          ← repo raiz
├── index.html              ← Article LP (SlimSoda Yale + Baking Soda)
├── images/                 ← 12 imagens do LP
├── slimtide-vsl/
│   ├── index.html          ← VSL recon (SlimTide TODAY/NBC social proof)
│   ├── print-user-view.png
│   └── vsl-assets/         ← cover, poster, thumbnail, main.m3u8, player.js
├── .gitignore              ← whitelist: só esses arquivos vão pro deploy
└── README.md               ← este arquivo
```

**Fluxo:** user abre `index.html` (LP) → clica em qualquer "Click to watch" (2 botões) → vai pra `./slimtide-vsl/index.html` (VSL recon com cover TODAY/NBC + video player) → clica CTA "Watch The Free Video Now" → checkout canônico `cc.slimsodapowder.com/v2/checkout.php`.

**Tracking stack (live):**
- Meta Pixel 1619587959397761 disparando PageView em LP+VSL
- Supabase `imphq_clicks` registra cada visita com UTMs
- Supabase `imphq_events` registra PageView, ViewContent, AddToCart, InitiateCheckout, Lead
- UTM passthrough dinâmico: LP → VSL → Checkout
- Visitor UUID em localStorage (persiste cross-sessão) + Session UUID 30min TTL

## Rodar local

```bash
# Python 3
python -m http.server 8000

# OU Node
npx http-server -p 8000

# Abre http://localhost:8000/
```

(precisa de server local porque o VSL tem CORS em alguns assets)

## Deploy

**Estrutura pronta pra Vercel/Netlify/Cloudflare Pages/GitHub Pages.** O `index.html` tá na raiz, então qualquer host serve direto.

- **Vercel:** importar repo → deploy automático (Framework Preset: Other)
- **Netlify:** drag & drop da pasta do repo OU conectar via GitHub
- **Cloudflare Pages:** conectar via GitHub → Build command: (vazio) → Output: `/`
- **GitHub Pages:** Settings → Pages → Source: `main` branch

## Customizar pra rodar como ads

1. **Pixel ID:** já tá em `<meta name="imp-pixel-id" content="1619587959397761">` no `<head>` de ambos HTMLs
2. **UTM:** adicionar `?utm_source=...&utm_medium=...&utm_campaign=...` na URL do LP — eles fluem automaticamente
3. **Capturar lead no próximo step:**
   ```javascript
   window.imptrack.trackLead({ email: "user@example.com", nome: "Nome" });
   ```
4. **Trocar checkout URL (se mudar de afiliado):** editar `BASE_CHECKOUT` no script helper do final do `slimtide-vsl/index.html`

## Arquivos importantes pra backup

- `index.html` (23KB) — LP inteiro, copy canônica, Meta Pixel + Supabase tracker inlined
- `slimtide-vsl/index.html` (15KB) — VSL recon canônica, Meta Pixel + Supabase tracker inlined
- `slimtide-vsl/vsl-assets/main.m3u8` — video source
- `slimtide-vsl/print-user-view.png` (392KB) — print original da VSL completa

## Proveniência

- LP clonada de `slimsoda.corewellnessjournal.com` (article LP top of funnel)
- VSL clonada de `trustedconsumervoice.com/vsl/slimtide/v1` (VSL TODAY/NBC social proof)
- Capturadas em 2026-08-16, 100% preservadas (HTML + imagens originais, sem edição)
- Tracker Supabase + checkout `cc.slimsodapowder.com` integrados em 2026-08-17
