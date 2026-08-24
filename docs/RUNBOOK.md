# DR Operations Runbook

> **Última atualização:** 2026-08-24
> **Propósito:** o que fazer quando algo dá errado. 5 cenários críticos + 1 lista de contatos.

---

## 🚨 Cenário 1: Meta ad foi rejeitado

**Sintoma:** "Ad rejected" no Meta Ads Manager, criativo não roda.

**Ação:**
1. Abra Meta Ads Manager → clique no ad rejeitado → leia o motivo
2. **3 causas mais comuns:**
   - "Personal Attributes" (menciona condição: "you have lymphedema") → troque por "if you experience occasional water retention"
   - "Before/after imagery weight loss" → adicione disclaimer "Individual results vary" + "Compensated for testimonial" visível
   - "Sensational health claims" → remova "cures/treats/prevents/improves", use "may support"
3. Edite o criativo no Canva/Figma
4. Submeta de novo com **Appeal** se discordar
5. Se persistir 3x, troque o ângulo inteiro (não force o criativo)

**Tempo:** 15-30 min
**Dono:** Você (criativo) + Mavis (compliance check)

---

## 🚨 Cenário 2: Checkout vendor caiu (slimsodapowder.com 500)

**Sintoma:** CTA vai pra checkout, user vê "Internal Server Error" ou redirect quebrado.

**Ação:**
1. Teste o checkout no browser: `https://slimsodapowder.com/cc2/dtc/pay/checkout.php?package=3bottles&affid=aff_6821377`
2. Se 200: problema é temporário, espere 5min e re-teste
3. Se 500/404 persistente: **Pause ads AGORA** (Meta Ads Manager → campaign → pause)
4. Contate vendor (ver Cenário 5)
5. Swap pra checkout alternativo (SlimSoda tem 2 paths: slimsodapowder.com + cc.slimsodapowder.com/v2)
6. Atualize LP com novo checkout URL (sed via shell ou edit HTML)
7. Resume ads

**Tempo:** 5-15 min (sem trocar checkout) / 30-60 min (com swap)
**Dono:** Você (decisão de pause) + Mavis (swap HTML + push)

**Comando pra swap checkout em todas as LPs:**
```bash
# (PowerShell)
$oldCk = 'slimsodapowder.com/cc2/dtc/pay/checkout.php?package=3bottles&hid=...'
$newCk = 'cc.slimsodapowder.com/v2/checkout.php?&hid=...'
Get-ChildItem 'C:\...\advertorial-stanford' -Filter 'index.html' |
  ForEach-Object { (Get-Content $_.FullName -Raw) -replace $oldCk, $newCk | Set-Content $_.FullName -NoNewline }
```

---

## 🚨 Cenário 3: Vercel deploy quebrou (build error)

**Sintoma:** Vercel mostra "Build failed" no dashboard, ou LP mostra 500.

**Ação:**
1. Abra https://vercel.com/dashboard → projeto `slim-soda01` → **Deployments**
2. Clique no deploy que falhou → veja o log
3. **3 causas mais comuns:**
   - **Sintaxe HTML quebrada** (unclosed div, missing `</a>`) → rode local pra debug:
     ```bash
     # validador HTML
     npx html-validate references_v5/index.html
     ```
   - **Imagem referenciada não existe** (`<img src="x.webp">` mas arquivo sumiu) → commit a imagem
   - **JS error** → abra DevTools Console, veja stacktrace
4. Fix local → `git add . && git commit -m "fix: ..." && git push`
5. Vercel auto-redeploy em 1-2 min
6. Valide que health check volta ✅

**Tempo:** 10-30 min
**Dono:** Mavis (code fix) + Você (validação)

---

## 🚨 Cenário 4: Compliance red line acionada (UK ASA / FTC / Meta ban)

**Sintoma:** Spy 24/ago detectou novo ban pattern, OU Meta account warning, OU LP flagged.

**Ação:**
1. Leia `intel/spy-2026-08-24/` (3 masters) → identifique qual red line foi tocada
2. **UK ASA pattern** (food noise + GLP-1): refresh Stanford v1.0 → rebrand "Cleveland + natural mineral"
3. **MalwareTips cluster**: refresh Maria 47 v4.7.2 → remove "Yale + Jastreboff + Today"
4. **FTC v. Prevagen**: audite MemoPryl PDP V2 + 5 funis → remove 8 banned phrases verbatim
5. **Meta Personal Attributes**: grep todas as LPs por "you have [condition]" → substitua por "if you experience"
6. Refresh commit + push + validate compliance check volta ✅

**Tempo:** 30-60 min (1 LP) / 2-4h (full audit)
**Dono:** Mavis (grep + refresh) + Você (decisão de rebrand)

**Grep pra banned phrases:**
```powershell
# PowerShell
Select-String -Path 'C:\...\advertorial-*' -Pattern 'you have|clinically shown|improves memory|cures|treats|prevents' -SimpleMatch
```

---

## 🚨 Cenário 5: Vendor / afiliado inacessível

**Sintoma:** Email/WhatsApp do vendor não responde há 24h+.

**Contatos principais (atualizar quando trocar):**
- **SlimSoda vendor** (SlimSoda Labs): ver email em `aff_6821377` dashboard ClickBank
- **MemoPryl vendor** (Memoril Labs): ver email em `aff_6821377` dashboard
- **Cardio Clear vendor** (Cardio Labs): ver email em `aff_6821377` dashboard
- **Linfaflow vendor** (Healthy Legs Daily): ver email em `aff_6821377` dashboard

**Ação:**
1. Email → WhatsApp → Telegram (em ordem)
2. Se 48h sem resposta: pause ads daquele produto, foque nos outros
3. Documente no `intel/` o que aconteceu (incident log)

**Tempo:** varia
**Dono:** Você

---

## ✅ Cenário bônus: Manutenção semanal (15 min)

Todo **segunda-feira 10h BRT**, faça:
1. **Health check** (Hub `/?v=33` → 6 indicadores) → ver se tudo ✅
2. **Compliance watchlist** (revisar 4 red lines)
3. **Decisões pendentes** (marcou tudo?)
4. **Spy** (ver `intel/spy-2026-08-24/` pra updates)
5. **One Page** (`one.html`) → ver decisão do dia
6. **Backup**: `git log --oneline -20` + `git status` → working tree clean?

Se qualquer item falhar, abre uma "decisão pendente" no Hub.

---

## 📞 Contatos de emergência
- **Vercel status**: https://vercel-status.com
- **Meta status**: https://status.meta.com
- **Cloudflare status**: https://www.cloudflarestatus.com
- **GitHub status**: https://www.githubstatus.com
