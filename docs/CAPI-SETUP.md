# Meta Conversions API (CAPI) — Token Setup

> **Status:** CÓDIGO PRONTO, FALTA TOKEN (24/ago/2026)
> **Impacto:** sem CAPI, Meta perde ~30% de conversões (iOS 14.5+, adblock, ITP). Server-side tracking resolve.

## 🎯 O que é CAPI
Meta Conversions API envia eventos do **seu servidor** pro Meta, em paralelo ao Pixel. O Meta deduplica via `event_id` (que precisa ser igual no Pixel + CAPI).

## 📋 Passo a passo (10 min)

### 1. Gerar Access Token
1. Acesse https://business.facebook.com/events-manager
2. Selecione o Pixel correto:
   - **Stanford v1.0** → Pixel `1619587959397761`
   - **Maria 47 v4.7.2** → Pixel `2211508706308536`
3. **Settings** → **Conversions API** → **Generate access token**
4. Copie o token (formato `EAAxxxxxxx`)

### 2. Adicionar como env var no Vercel
1. Acesse https://vercel.com/dashboard
2. Selecione o projeto `slim-soda01`
3. **Settings** → **Environment Variables**
4. Adicione:
   - **Key:** `META_ACCESS_TOKEN_STANFORD`
   - **Value:** o token gerado acima
   - **Environment:** Production
5. Repita pra Maria 47:
   - **Key:** `META_ACCESS_TOKEN_MARIA`
   - **Value:** o token respectivo

### 3. Verificar que CAPI tá funcionando
- Abra https://slim-soda01.vercel.app/references_v5/by-product/slimsoda/lps/advertorial-stanford/
- Abra DevTools → Network → filter "track-capi"
- Deve aparecer POST `/api/track-capi` com payload
- Em Meta Events Manager → **Test Events** → faça um scroll na LP
- Deve aparecer evento "PageView" + "ViewContent" chegando **2x** (1 Pixel + 1 CAPI, deduped)

### 4. Validar dedup
- Se aparecer **2 eventos** sem dedup → problema, ajustar `event_id`
- Se aparecer **1 evento "deduplicated"** → OK ✅

## 🔧 Código atual
O endpoint `/api/track-capi` já existe em `api/track-capi.js` (9.3KB) e já envia:
- PageView
- ViewContent (com `value=29.99`, `currency=USD`)
- AddToCart (50% scroll)
- InitiateCheckout (em todo CTA click)
- Purchase (thank you page — TBD)

Falta só o token pra autorizar o POST pro Meta.

## 🚨 Compliance
- **LGPD/GDPR**: CAPI envia PII (email, phone, fbc, fbp). Server-side, mas Meta é processador. Privacy policy deve mencionar.
- **iOS 14.5+**: CAPI é a **única forma** confiável de tracking mobile. Sem ele, Meta não sabe quem converteu.

## 📊 Comparação Pixel-only vs CAPI
| Métrica | Pixel-only | Pixel + CAPI |
|---|---|---|
| Tracking iOS 14.5+ | ~30% perdido | ~95% |
| AdBlock resistance | 0% | 100% (server-side) |
| Match quality | 6.0/10 | 8.5/10 |
| Cost per conversion | +20-30% | baseline |
| Attribution window | 7d click / 1d view | 7d click / 1d view |

## 🔗 Onde configurar (checklist)
- [ ] Token Stanford gerado
- [ ] Token Maria 47 gerado
- [ ] `META_ACCESS_TOKEN_STANFORD` em Vercel env
- [ ] `META_ACCESS_TOKEN_MARIA` em Vercel env
- [ ] Test em Events Manager → Test Events
- [ ] Verificar dedup (event_id match)

## 📚 Refs
- https://developers.facebook.com/docs/marketing-api/conversions-api (oficial)
- https://www.facebook.com/business/help/455546602521947 (Events Manager UI)
