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
| `páginas/hub-preview/REPOS.md` | este arquivo | dentro do repo `Slim-Soda01` (versionado) |

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
