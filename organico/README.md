# 🌿 Organico — SlimSoda + Linfaflow

Sistema de produção de conteúdo orgânico replicado do board **DTC Affiliate Pro - Orgânico** (Felipe Prado) e adaptado pra SlimSoda/Linfaflow.

> **Live:** https://slim-soda01.vercel.app/organico/
> **Status:** Em construção (19/08/2026)
> **Inspiração:** Whimsical board `dtc-affiliate-pro-organico-LZZzFBqE3xzNPmDEf1Z6e6`

---

## 🎯 Objetivo

Replicar e adaptar a estrutura de produção de orgânico do Felipe Prado (Sonnus Sleep Gummies) pra SlimSoda/Linfaflow:

| Original (Sonnus) | Adaptação (SlimSoda) |
|-------------------|----------------------|
| Médico azul autoridade | Maria 47 (mãe established) + 3 avatares secundários |
| Sonnus Sleep Gummies (sleep) | SlimSoda powder (bloat/weight) |
| 4 takes "IF YOUR FEET" | 4-8 takes ângulos bloat/ACV/3-ingredient |
| Room scenes (kitchen) | Room scenes (home/kitchen/dining) |
| LP clone (1 template) | LP clone (5 templates Maria 47) |

---

## 📁 Estrutura

```
organico/
├── index.html              ← HUB principal (entrada)
├── README.md               ← Este arquivo
├── 01-brief/               ← Templates de brief orgânico
│   └── index.html          (brief canon: produto, avatar, ângulo, formato, CTA)
├── 02-ugc/                 ← Biblioteca de takes/scripts UGC
│   ├── index.html          (catálogo: hook, body, cta, performance)
│   └── scripts/            (txt files: script completo cada take)
├── 03-assets/              ← Library visual (character/room/product)
│   └── index.html          (catalog: poses, rooms, products, thumbnails)
└── 04-pipeline/            ← Workflow visual de produção
    └── index.html          (6-8 estágios: discovery → brief → gravação → edição → QA → post)
```

---

## 🔗 Cross-reference

- **Maria 47 canônica:** `references_v5/methodology/reverse-engineering/`
- **4 avatares SlimSoda:** `references_v5/methodology/reverse-engineering/` (Maria 35/47/55/62)
- **6 briefs brechas:** `references_v5/methodology/reverse-engineering/` (seção 6 briefs)
- **Advertorial Maria 47:** `references_v5/by-product/slimsoda/lps/advertorial-maria47/`
- **28 criativos catalogados:** `slimsoda-creatives.html`
- **Banco padrões DR:** `references_v5/_banco-padroes-dr.md`
- **Story Engine v1:** `references_v5/methodology/story-engine/`
- **DTC Control (8 alavancas):** `references_v5/methodology/dtc-control/`

---

## 🛠️ Workflow de produção orgânico (resumo)

1. **Discovery** — Spy de UGC validado (Meta Ad Library, TikTok Creative Center, biblioteca interna)
2. **Brief** — Definição de produto + avatar + ângulo + formato + CTA (template em `01-brief/`)
3. **Script** — Hook + Aterrissagem + Body (3-ingredient method) + CTA (template em `02-ugc/scripts/`)
4. **Gravação** — 4-8 takes por ângulo, character poses + room scenes
5. **Edição** — Captions, jump-cuts, sound design, thumbnail
6. **QA** — Meta-safe check, brand-safety, compliance FDA
7. **Postagem** — Distribuição (IG/TikTok/Facebook orgânico)

---

## 📊 Métricas-alvo (orgânico)

| Métrica | Meta | Por quê |
|---------|------|---------|
| Hook rate (3s) | ≥40% | Pattern interrupt em 1.5s |
| Hold rate (30s) | ≥60% | Story + aterrissagem funcionando |
| Save/Share rate | ≥2% | Value = "save for later" |
| Comment rate | ≥0.5% | Trigger emotional reply |
| Follower conversion | ≥1% | Conteúdo converte, não só diverte |

---

## 🚧 Status (19/08/2026)

- [x] Estrutura de pastas criada
- [x] HUB `index.html` (entrada)
- [x] 4 sub-páginas (brief, ugc, assets, pipeline)
- [ ] Biblioteca de scripts UGC (ainda vazio)
- [ ] Library de character/room/product (ainda vazio)
- [ ] VSL transcrita (Whisper rodando em background)
- [ ] Pipeline visual completo com 6-8 nós detalhados
- [ ] Auditoria do advertorial Maria 47 contra canon
- [ ] Brief Maria 47 expandido (métricas VSL + 3 avatares)

---

**Cross-project rule:** toda estrutura aqui é replicável pra outros produtos DTC (Linfaflow, Cardio Clear, Haritaki, Linfozen). Trocar `Maria 47` por outro avatar canônico + ajustar ângulos.
