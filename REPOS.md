# Repos & Deploys — Índice central

> **Última atualização:** 2026-08-22
> **Workspace:** `C:\Users\vsuga\Downloads\SlimSoda\páginas\`

Índice único de todos os repos GitHub + deploys Vercel que a operação roda. Se for criar um novo repo, **adiciona aqui primeiro** pra não perder o controle.

---

## Repos ativos (GitHub)

### 1. `vsugamele/Slim-Soda01` — MAIN HUB

- **Local:** `páginas/hub-preview/`
- **Remote:** `https://github.com/vsugamele/Slim-Soda01.git`
- **Branch:** `main`
- **Vercel project:** `slim-soda01`
- **URLs deployadas:**
  - `https://slim-soda01.vercel.app` → redirect → `/references_v5/` (DR Hub)
  - `https://slim-soda01.vercel.app/references_v5/` (DR Hub v26 — 6 produtos + metodologia + tracking + spy + one page)
  - `https://slim-soda01.vercel.app/references_v5/by-product/{slimsoda|linfaflow|linfozen|cardio-clear|memopryl}/` (5 product hubs)
  - `https://slim-soda01.vercel.app/buy-page/` (SlimSoda buy page)
  - `https://slim-soda01.vercel.app/slimtide-vsl/` (SlimSoda VSL recon)
  - `https://slim-soda01.vercel.app/chat-x1/` (SlimSoda chat experience)
  - `https://slim-soda01.vercel.app/slimsoda-pdp/` (SlimSoda PDP)
  - `https://slim-soda01.vercel.app/quiz-slimsoda.html` (SlimSoda quiz)
  - `https://slim-soda01.vercel.app/api/{track-capi|decision|spy|etc}` (API endpoints)
- **Custom domains:** nenhum configurado
- **Conteúdo:**
  - DR Hub v26 (live)
  - 5 product hubs (SlimSoda, Linfaflow, Linfozen, Cardio Clear, MemoPryl)
  - SlimSoda: Maria 47 v3 + PDP + listicle + buy-page + VSL + chat-x1 + quiz
  - MemoPryl: PDP V2 + content hub + 6 criativos + 10 LP images + 4 trust seals + 2 VSLs + 5 DTC funnels
  - API stack: Supabase + Meta CAPI + cron jobs
- **Pasta de intel:** `hub-preview/intel/` (spy reports, decisões de método)
- **Tamanho deploy:** ~200MB (com .vercelignore excluindo MP4s/WAVs)

### 2. `vsugamele/memopryl-lps` — STANDALONE MEMOPRYL LPs

- **Local:** `páginas/deploy-memopryl-v2/`
- **Remote:** `https://github.com/vsugamele/memopryl-lps.git`
- **Branch:** `main`
- **Vercel project:** `memopryl-ayc5`
- **URLs deployadas:**
  - `https://memopryl-ayc5.vercel.app` → auto-redirect → `/ml05` (apex abre ml05)
  - `https://memopryl-ayc5.vercel.app/ml05` (DTC funnel 1, CNN Health clone)
  - `https://memopryl-ayc5.vercel.app/ml06` (DTC funnel 2, CNN Health clone)
- **Custom domain:** `memo.purelabss.com` (apex → `/ml05`, subdomain `ml05.purelabss.com` → `/ml05`, `ml06.purelabss.com` → `/ml06`)
- **Conteúdo:** 2 LPs CNN Health clone pra MemoPryl DTC (publisher Vturb player, embed script JS)
- **Tamanho deploy:** ~200MB
- **Por que repo separado:** cloaking-friendly (subdomain-per-LP), independente do Vercel project principal, escalável isoladamente

---

## Pastas locais (não-versionadas, manter pra referência)

| Pasta | Status | Ação |
|---|---|---|
| `páginas/hub-preview/` | ativo, versionado em `Slim-Soda01` | manter |
| `páginas/deploy-memopryl-v2/` | ativo, versionado em `memopryl-lps` | manter |
| `páginas/deploy-memopryl/` | **OBSOLETO** (estrutura antiga `/ml05/cc/pv4/dtc/ml05/`), mesmo remote que v2 | deletar (limpar workspace) |
| `páginas/SlimSoda/` | root, contém Maria 47 v2 standalone | revisar se ainda serve |

---

## Pastas de intel & methodology (versionadas, não-deploy)

| Pasta | Conteúdo | Local |
|---|---|---|
| `páginas/hub-preview/intel/spy-2026-08-22/` | Master spy briefing + 4 per-vertical reports (SlimSoda, Linfaflow+Linfozen, MemoPryl, Cardio Clear) | dentro do repo `Slim-Soda01` (versionado) |
| `páginas/hub-preview/analise-criativos/` | Hub de análises criativas (top performers quebrados em copy/foto/layout/mecanismo, evolução compliance-safe cross-vertical) | dentro do repo `Slim-Soda01` (versionado) |
| `páginas/hub-preview/briefs/` | Briefs criativos production-ready (PT-BR + EN, storyboard, compliance, métricas esperadas) | dentro do repo `Slim-Soda01` (versionado) |
| `páginas/hub-preview/REPOS.md` | este arquivo | dentro do repo `Slim-Soda01` (versionado) |

### Briefs production-ready (`briefs/`)

Pasta de **briefs criativos prontos pra produção**. Cada brief tem 10 seções: visão geral, persona, mecanismo, copy completa, storyboard, compliance, variações, métricas esperadas, cross-reference, próximos passos. **5 briefs cross-vertical** (23/ago/2026) prontos pra sprint paralelo.

- `briefs/brief-slimsoda-anti-scam-2026-08-23.md` — SlimSoda "Anti-scam Honest Baking Soda" (UGC 60-90s, Dana Whitfield, framework **anti-claim**)
- `briefs/brief-slimsoda-stanford-2026-08-23.md` — SlimSoda "Stanford Missing Mineral" (editorial flat lay, 3 ingredients in that order, framework **Scientists found X**)
- `briefs/brief-memopryl-lithium-2026-08-23.md` — MemoPryl "Harvard Lithium Microdose" (editorial flat lay + carrossel 5 cards, Nature 2025, framework **Scientists found X**)
- `briefs/brief-cardioclear-uva-2026-08-23.md` — Cardio Clear "UVA Real Driver" (editorial flat lay + talking-head, 4 named ingredients, Dr. Sanjay Gupta autorizado, framework **Scientists found X**)
- `briefs/brief-linfaflow-stanford-2026-08-23.md` — Linfaflow "Stanford Lymphatic Memory" (editorial flat lay, 4 named herbs, metaphor lymphatic memory, framework **Scientists found X**)

### Análise criativa (`analise-criativos/`)

Pasta de **análise estrutural de top performers** (não swipe file). Cada análise quebra um criativo em:
1. Mockup visual
2. Copy em 4 blocos estruturais (set-up → revelação → autoridade → CTA)
3. Foto com anatomia (persona, enquadramento, iluminação, eye contact)
4. Layout/formato comparando 5 opções
5. Mecanismo psicológico dos 6 levers que fazem converter
6. Comparação #1 vs #2
7. Brief de produção (formato, persona, hook, body, CTA, compliance)

- `analise-criativos/index.html` — hub (lista de publicadas + fila)
- `analise-criativos/adv1-oprah.html` — "Oprah-style" Top Performer (saturado, framework universal)
- `analise-criativos/adv2-anti-scam.html` — "Anti-scam Honest Baking Soda" (SlimSoda, gap real)
- Fila: #3 MemoPryl Honey Trick · #4 Linfaflow 5pm ankle · #5 Cardio Clear 4-in-1 · #6 Linfozen Fibrotic · #7 SlimSoda Maria 47 v4.7.1 · #8 MemoPryl Lithium

---

## Vercel projects (resumo)

| Project | Production URL | Repo | Build command | Notas |
|---|---|---|---|---|
| `slim-soda01` | `slim-soda01.vercel.app` | `vsugamele/Slim-Soda01` | n/a (static) | DR Hub + 5 product hubs + SlimSoda LPs |
| `memopryl-ayc5` | `memopryl-ayc5.vercel.app` + `memo.purelabss.com` | `vsugamele/memopryl-lps` | n/a (static) | 2 standalone CNN Health LPs |

---

## Próximos repos / deployments a considerar

| Ideia | Repositório proposto | Justificativa |
|---|---|---|
| Standalone Linfaflow LPs (ml07/ml08 pattern) | `vsugamele/linfaflow-lps` | mesmo modelo do memo.purelabss.com, cloaking-friendly |
| Standalone Cardio Clear LP | `vsugamele/cardio-clear-lp` | Dr. Sanjay Gupta anti-scam positioning isolado |
| Standalone SlimSoda LP (anti-baking-soda-scam angle) | `vsugamele/slimsoda-lp` | quando brief novo sair do spy 2026-08-22 |
| Spy + methodology hub | `vsugamele/dr-intel` | se quiser isolar o `intel/` num repo separado pra compartilhamento |

---

## Como usar este arquivo

1. **Antes de criar um novo repo:** adicionar linha na seção "Próximos repos a considerar"
2. **Antes de deletar um repo/pasta local:** confirmar que não tá mais na lista de ativos
3. **Antes de deployar:** confirmar que URL de produção tá em "URLs deployadas"
4. **Setup novo ambiente:** clonar `Slim-Soda01` (main) + `memopryl-lps` (standalones), mais intel/ já incluso
