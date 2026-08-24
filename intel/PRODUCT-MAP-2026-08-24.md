# Product Map — Tudo que Você Roda · 24/ago/2026

> **Última atualização:** 2026-08-24
> **Propósito:** mapa único de **produto → domínio → repo → LP → checkout URL → "é seu ou é do concorrente?"**
> **Onde achar:** `intel/PRODUCT-MAP-2026-08-24.md` (canônico) + cross-link em REPOS.md + one.html

---

## 0. TL;DR — Qual LP / checkout é "meu"?

| Você quer... | Use este link |
|---|---|
| **SlimSoda 2 Tubs B1G1 $29.99** (3bottles package) | `https://slimsodapowder.com/cc2/dtc/pay/checkout.php?package=3bottles&hid=b2lkPW9mZl81MDU4NzI1JmFpZD1hZmZfNjgyMTM3NyZ1aWQ9YmxfMDM4MDIyMg%3D%3D&affid=aff_6821377` |
| **SlimSoda NEW v2** (1 tub / different package) | `https://cc.slimsodapowder.com/v2/checkout.php?&hid=b2lkPW9mZl81MDU4NzI1JmFpZD1hZmZfNjgyMTM3NyZ1aWQ9YmxfMzk5MDY3Mg%3D%3D&affid=aff_6821377` |
| **MemoPryl 6 bottles** (memory) | `https://memopryl.com/cc2/pay/checkout.php?package=6b19&hid=b2lkPW9mZl81ODc3NjgxJmFpZD1hZmZfNjgyMTM3NyZ1aWQ9YmxfNzcyMTg0Mw%3D%3D&affid=aff_6821377` |
| **Cardio Clear 3 bottles** | `https://usecardioclear.com/cc2/pay/checkout.php?package=3bottles&hid=b2lkPW9mZl8xODk3NzAwJmFpZD1hZmZfNjgyMTM3NyZ1aWQ9YmxfNDM1MDUyNQ%3D%3D&affid=aff_6821377` |
| **SlimSoda LP — Stanford v1.0** (4 ingredientes) | `https://slim-soda01.vercel.app/references_v5/by-product/slimsoda/lps/advertorial-stanford/?v=12` |
| **SlimSoda LP — Maria 47 v4.7.2** (3-ingredient method) | `https://slim-soda01.vercel.app/references_v5/by-product/slimsoda/lps/advertorial-maria47-v3/?v=12` |
| **SlimSoda LP — Yale+Baking Soda listicle** | `https://slim-soda01.vercel.app/references_v5/by-product/slimsoda/lps/article-lp/` |
| **SlimSoda PDP (legacy, bypassed now)** | `https://slim-soda01.vercel.app/slimsoda-pdp/?v=3` |
| **SlimSoda Buy page (Shopzenvy Lite)** | `https://slim-soda01.vercel.app/buy-page/` |
| **MemoPryl PDP V2** | `https://slim-soda01.vercel.app/references_v5/by-product/memopryl/lps/pdp/?v=2` |
| **Linfaflow LP (4 botanicals)** | `https://slim-soda01.vercel.app/references_v5/by-product/linfaflow/` |
| **DR Hub v26** (single source of truth) | `https://slim-soda01.vercel.app/references_v5/?v=27` |
| **One Page** (decisão do dia) | `https://slim-soda01.vercel.app/one.html?v=13` |

---

## 1. Inventory de Repos GitHub (com "é meu ou legado?")

| Repo | Local | Branch | Status | Notas |
|---|---|---|---|---|
| **`vsugamele/Slim-Soda01`** ⭐ MAIN | `C:\Users\vsuga\Downloads\SlimSoda\páginas\hub-preview` | `main` | **ATIVO** | Onde DR Hub + LPs (Stanford, Maria 47, article-lp, buy-page, slimtide-vsl, chat-x1, slimsoda-pdp) + tracking + checkout estão. Tudo que fiz até agora foi aqui. |
| `vsugamele/slimsoda` | `C:\Users\vsuga\Downloads\SlimSoda` (root, **separado**) | (verificar) | **LEGADO** | Repo separado com `pdp/` + `imagem/` no root. Provavelmente o deploy original do slimsodapowder.com antes de virar hub. Manter por compatibilidade, mas **não mexer** — usar Slim-Soda01. |
| `vsugamele/healthy-legs-daily` | `C:\Users\vsuga\Downloads\healthy-legs-daily` | (verificar) | **ATIVO** | Linfaflow repo. Deploy de healthy-legs-daily.com (vendor domain). |
| `vsugamele/healthy-legs-daily-publish-clean` | `C:\Users\vsuga\Downloads\healthy-legs-daily-publish-clean` | (verificar) | **LEGADO** | Backup/version anterior do Linfaflow. Não usar ativamente. |
| `vsugamele/memopryl` | `C:\Users\vsuga\Downloads\memopryl` (provavelmente) | (verificar) | **ATIVO** | MemoPryl main repo. PDP V2 + Content Hub + 6 ads + 4 trust + 5 DTC funnels. |
| `vsugamele/memopryl-lps` ⭐ | (duplicado no seu paste — ver qual é real) | (verificar) | **ATIVO** | MemoPryl LPs variants. Você colou 2x — provavelmente um é typo. |
| `vsugamele/cardio-clear` | `C:\Users\vsuga\Downloads\Cardio Clear` | (verificar) | **ATIVO** | Cardio Clear repo. |

**Total:** 6 repos ativos (3-4 efetivamente usados) + 2 legacy. Você colou 7 no Slack mas `memopryl-lps` apareceu 2x (typo).

---

## 2. Custom Domains (vendor)

| Domínio | Produto | Status |
|---|---|---|
| `slimsodapowder.com` | SlimSoda | **Live (200)** — checkout no path `/cc2/dtc/pay/checkout.php` |
| `cc.slimsodapowder.com` | SlimSoda NEW v2 | **Live (200)** — checkout v2 |
| `memopryl.com` | MemoPryl | **Live (200)** — checkout no path `/cc2/pay/checkout.php` |
| `usecardioclear.com` | Cardio Clear | **Live (200)** — checkout no path `/cc2/pay/checkout.php` |
| `slim.purelabss.com` | SlimSoda | **Live (200)** — custom domain, aponta pra Vercel `slim-soda01` |
| `memo.purelabss.com` | MemoPryl | (não testado, mas presumido live) — aponta pra Vercel deploy |
| `healthy-legs-daily.com` | Linfaflow | (provavelmente live) — vendor domain |

**Os 5 checkouts que você colou (todos 200):**

1. `https://memopryl.com/cc2/pay/checkout.php?package=6b19&hid=...` — **MemoPryl** 6 bottles package
2. `https://cc.slimsodapowder.com/v2/checkout.php?&hid=...` — **SlimSoda NEW v2** (subdomain `cc.`)
3. `https://slimsodapowder.com/cc2/dtc/pay/checkout.php?package=3bottles&hid=...` — **SlimSoda 3bottles** (o que usei em Stanford v1.0)
4. `https://usecardioclear.com/cc2/pay/checkout.php?package=3bottles&hid=...` — **Cardio Clear 3bottles** (você colou 2x — typo)
5. (repete do 4)

**`affid=aff_6821377`** é constante em todos — sua tag de afiliado. **Não trocar** (mesma regra do pixel).

---

## 3. LPs por produto (qual é "seu" vs "do concorrente")

### 3.1 SlimSoda

| LP | URL | Status | É seu? |
|---|---|---|---|
| **Stanford v1.0** | `references_v5/by-product/slimsoda/lps/advertorial-stanford/` | Live, 4-ingredient formula | **SEU** (atualizei 23-24/ago) |
| **Maria 47 v4.7.2** | `references_v5/by-product/slimsoda/lps/advertorial-maria47-v3/` | Live, 3-ingredient method (swelling angle) | **SEU** (atualizei 23/ago) |
| **Article-LP (Yale listicle)** | `references_v5/by-product/slimsoda/lps/article-lp/` | Live, 17KB | **SEU** (legacy) |
| **SlimTide VSL (Oprah)** | `references_v5/by-product/slimsoda/lps/vsl/index.html` | Live, 14KB, Oprah modeled | **NÃO É SEU** — modelado do concorrente Oprah Drop 43 lbs |
| **SlimTide VSL (5 variants)** | `references_v5/by-product/slimsoda/lps/_cloned/` | Live | **SEU** — 5 variants (01-original-recipe, 02-reader-warning, 03-two-column, 04-exclusive-report, 05-closet-quiet-weight) |
| **PDP v3** | `slimsoda-pdp/` (root) + `references_v5/.../slimsoda-pdp/` (copy) | Live, 107KB | **SEU** mas **BYPASSED** (CTAs Stanford + Maria 47 vão direto pro checkout agora) |
| **Buy Page (Shopzenvy Lite)** | `buy-page/` | Live, com tracking | **SEU** |
| **Chat-x1** | `chat-x1/` | Live, conversational LP | **SEU** |
| **Quiz** | `quiz-slimsoda.html` + `references_v5/.../quiz/` | Live, 8 steps | **SEU** |

**VSLs em 3 lugares (todos Oprah, mesmo conteúdo):**
- `references_v5/by-product/slimsoda/lps/vsl/index.html` ← o que você está vendo
- `slimtide-vsl/index.html` (root)
- `Slim-Soda01/slimtide-vsl/index.html` (backup)

**Suas 5 VSLs reais** em `references_v5/by-product/slimsoda/lps/_cloned/`:
- `01-original-recipe-healthy-digest.html` — "The Original Recipe"
- `02-reader-warning-healthy-digest.html` — "Important Reader Warning"
- `03-two-column-reset-magazine.html` — "The Two-Column Experiment"
- `04-exclusive-report-reset-magazine.html` — "Exclusive Report"
- `05-closet-quiet-weight.html` — "**The Quiet Weight: For 3 Years, She Got Dressed in the Closet So Her Husband Wouldn't See Her Body**" ← clássico seu

**Recomendação:** trocar link no one.html + Hub de `/vsl/` (Oprah) pra `/_cloned/` (suas 5).

### 3.2 MemoPryl

| LP | URL | Status | É seu? |
|---|---|---|---|
| **PDP V2** | `references_v5/by-product/memopryl/lps/pdp/` | Live | **SEU** |
| **Content Hub** | `references_v5/by-product/memopryl/` | Live | **SEU** |
| **DTC ml05** | `memo.purelabss.com/ml05` | Live | **SEU** (CNN clone) |
| **DTC ml06** | `memo.purelabss.com/ml06` | Live | **SEU** (CNN clone) |
| **VSL index** | `intel/memopryl/vsl-transcripts/INDEX.md` | GitHub only (não deployed) | **SEU** (15 ads VSL catalogados) |

### 3.3 Linfaflow

| LP | URL | Status | É seu? |
|---|---|---|---|
| **Product Hub** | `references_v5/by-product/linfaflow/` | Live | **SEU** |
| **Affiliate network** | `references_v5/by-product/linfaflow/affiliate-network/` | Live | **SEU** |
| **healthy-legs-daily.com** | (vendor domain deploy) | Live | **SEU** (main vendor site) |

### 3.4 Cardio Clear

| LP | URL | Status | É seu? |
|---|---|---|---|
| **PDP** | `references_v5/by-product/cardio-clear/lps/` (provavelmente) | Live | **SEU** |

### 3.5 Linfozen + Haritaki + South Beach (outros)

Mencionados em one.html pipeline. Não testei cada um, mas presumo que estão em `references_v5/by-product/{linfozen|outros/haritaki|outros/south-beach}/`.

---

## 4. LP "é meu ou do concorrente" — Quick Reference

| URL que você vê | É seu? | Como saber |
|---|---|---|
| `references_v5/by-product/slimsoda/lps/vsl/` | **NÃO** | Title "Oprah Drop 43 lbs" — modelado do concorrente |
| `references_v5/by-product/slimsoda/lps/_cloned/` | **SIM** | 5 variants de angle (Original Recipe / Reader Warning / Two-Column / Exclusive Report / Quiet Weight) |
| `references_v5/by-product/slimsoda/lps/advertorial-stanford/` | **SIM** | "Stanford Missing Mineral" — angle de 4-ingredients, pesado/agressivo (autorizado) |
| `references_v5/by-product/slimsoda/lps/advertorial-maria47-v3/` | **SIM** | "I Ate Less Than My Friend" — angle de swelling/edema, 3-ingredient method |
| `references_v5/by-product/slimsoda/lps/article-lp/` | **SIM** | Yale + Baking Soda listicle — legacy |
| `references_v5/by-product/slimsoda/lps/slimsoda-pdp/` | **SIM** | PDP v3 (legacy, bypassed) |
| `references_v5/by-product/slimsoda/lps/_cloned/05-closet-quiet-weight.html` | **SIM** | "For 3 Years, She Got Dressed in the Closet" — clássico seu |
| `references_v5/by-product/memopryl/lps/pdp/` | **SIM** | PDP V2 |
| `references_v5/by-product/linfaflow/` | **SIM** | Product hub |
| `references_v5/by-product/cardio-clear/` | **SIM** | Cardio Clear |
| `references_v5/` | **SIM** | DR Hub v26 (single source of truth) |
| `one.html` | **SIM** | Command center |

---

## 5. VSL — Quais são SUAS vs quais são do CONCORRENTE

### SUAS VSLs (use estas)
- **5 variants em `references_v5/by-product/slimsoda/lps/_cloned/`** (acima)
- **MemoPryl: 15 VSL ads + 2 DTC VSLs em `intel/memopryl/vsl-transcripts/`** (transcrições Whisper de scripts vendor) — use como reference pra criar criativo novo

### NÃO SUAS VSLs (modeladas do concorrente — NÃO use como "sua")
- `references_v5/by-product/slimsoda/lps/vsl/index.html` — **Oprah Drop 43 lbs** (modelada)
- `slimtide-vsl/index.html` (root) — **mesma Oprah** (cópia)
- `Slim-Soda01/slimtide-vsl/index.html` (backup) — **mesma Oprah** (cópia)

### Spy finding (24/ago/2026): o **ângulo "Oprah + Yale + Jastreboff + Today"** é o que MalwareTips nomeou como cluster scam. **Refresh Maria 47 v4.7.2 + retire SlimTide Oprah VSL do ar** são ações urgentes do compliance.

---

## 6. PDP — Quais são SUAS

| Produto | URL PDP | É seu? |
|---|---|---|
| SlimSoda | `https://slim-soda01.vercel.app/slimsoda-pdp/?v=3` | **SIM** (legacy, bypassed agora — CTAs Stanford + Maria 47 vão direto pro checkout) |
| SlimSoda (copy) | `references_v5/by-product/slimsoda/lps/slimsoda-pdp/index.html` | **SIM** (cópia) |
| MemoPryl | `references_v5/by-product/memopryl/lps/pdp/?v=2` | **SIM** (PDP V2) |
| Cardio Clear | (verificar em `references_v5/by-product/cardio-clear/lps/`) | **SIM** (presumido) |

**Atualização 4-ingredient Stanford não foi propagada pra PDP** (PDP v3 ainda tem 3-ingredient). **Ação opcional:** se quiser consistência, refresh PDP. Mas como CTAs Stanford + Maria 47 pulam PDP, isso é backlog.

---

## 7. Pixel IDs por LP (NÃO trocar)

| LP | Pixel ID | Razão |
|---|---|---|
| **Stanford v1.0** | `1619587959397761` | Pixel novo (criei 23/ago), Meta Pixel instalado 23/ago |
| **Maria 47 v4.7.2** | `2211508706308536` | **Pixel próprio histórico, MANTER** (você confirmou 23/ago "deixa os dois pixel") |
| **Buy Page** | `1619587959397761` | Mesmo do Stanford |
| **MemoPryl PDP V2** | (verificar — presumo `2211508706308536` ou outro próprio) | (não trocá-lo se já tiver) |
| **Cardio Clear** | (verificar) | (não trocá-lo se já tiver) |

**Default pra LP novo:** pixel da hub `1619587959397761`. **Default pra LP com pixel próprio:** manter.

---

## 8. Decisões pendentes

1. **Stanford v1.0 compliance** (URGENTE) — tem "food noise" + "GLP-1" framing combinado, exatamente o que UK ASA baniu ago/2026. **Refresh recomendado** (rebrand "Cleveland + natural mineral", remove food noise + GLP-1).
2. **Maria 47 v4.7.2 compliance** (URGENTE) — "Yale + Jastreboff + Today" framing é o que MalwareTips nomeou 24/ago. **Refresh recomendado**.
3. **SlimTide VSL (Oprah) retire do ar** (compliance) — é o padrão scam cluster. Mover para `/_archived/` ou deletar.
4. **Trocar link VSL no one.html + Hub** (5min) — `/vsl/` → `/_cloned/`.
5. **Comprimir 2 imagens Stanford** (10min) — hero-kitchen-woman (6.7MB) + three-ingredients-flat-lay (7.3MB) pra Vercel Hobby 1GB limit.

---

## 9. Como usar este mapa

- **Antes de criar LP novo** → consulta tabela 0 (qual checkout usar) + tabela 1 (qual repo)
- **Antes de linkar VSL** → consulta seção 5 (suas vs concorrentes)
- **Antes de trocar pixel** → consulta seção 7 (deixa o que tá rodando)
- **Antes de commit** → confirma que está no repo certo (Slim-Soda01 pra maioria das coisas, ou `memopryl-lps.git` pra MemoPryl, ou `healthy-legs-daily.git` pra Linfaflow)
- **Quando estiver perdido** → abre este arquivo primeiro

---

**Cross-link:**
- `REPOS.md` (existente, ~30 linhas, focado em deploys) — atualiza com link pra este mapa
- `one.html` — adicionar link "📍 Product Map" no TOP COMMAND BAR
- Hub `references_v5/index.html` — adicionar link "📍 Product Map" no Knowledge Base
