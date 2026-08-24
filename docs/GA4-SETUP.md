# Google Analytics 4 (GA4) — Setup Guide

> **Status:** NÃO CONFIGURADO (24/ago/2026)
> **Por que importa:** hoje só temos Meta Pixel. Sem GA4, você não vê tráfego orgânico, não consegue auditar UTMs cross-platform, não tem session-based analytics.

## 🎯 Objetivo
Ter GA4 funcionando em todas as LPs (Stanford v1.0, Maria 47 v4.7.2, Cardio, MemoPryl) com eventos customizados pra funil.

## 📋 Passo a passo (15 min)

### 1. Criar propriedade GA4
1. Acesse https://analytics.google.com
2. **Admin** (engrenagem) → **Criar propriedade** → nome: "DR Hub — SlimSoda + Memopryl + Linfaflow"
3. Fuso: Brasil · Moeda: BRL · Setor: Health & Wellness
4. **Criar stream Web** → URL: `https://slim-soda01.vercel.app`
5. Copie o **Measurement ID** (formato `G-XXXXXXX`)

### 2. Adicionar no Hub
Edite `references_v5/index.html` no `<head>` (antes do CSS), adicione:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXX', { send_page_view: true });
</script>
```

### 3. Adicionar nas LPs (com eventos custom)
Em Stanford v1.0 e Maria 47 v4.7.2, **antes do `</body>`**:

```html
<script>
  // ViewContent já dispara em page load
  // Lead: quando user rolar 50% (mesmo gatilho do Meta AddToCart)
  document.addEventListener('scroll', function() {
    var scrolled = (window.scrollY + window.innerHeight) / document.body.scrollHeight;
    if (scrolled > 0.5 && !window._ga_lead) {
      window._ga_lead = true;
      gtag('event', 'lead', { event_category: 'engagement', event_label: '50pct_scroll' });
    }
  });
  // InitiateCheckout: já existe no Meta, replicar aqui
  document.querySelectorAll('.cta').forEach(function(b) {
    b.addEventListener('click', function() {
      gtag('event', 'begin_checkout', { event_category: 'cta', event_label: location.pathname });
    });
  });
</script>
```

### 4. Validar
- Abra https://slim-soda01.vercel.app/references_v5/
- Em GA4 → **Relatórios** → **Tempo real**, deve aparecer 1 usuário ativo
- Em Stanford v1.0, role até metade, deve aparecer evento "lead"

## 🚨 Compliance
- **LGPD/GDPR**: GA4 anonimiza IP por padrão. Mas adicione banner de consent.
- **AdBlock**: ~30% dos usuários têm. Você não vê eles no GA.
- **Cross-domain**: se quiser trackear entre slim-soda01.vercel.app + slimsodapowder.com, configure linker em `gtag('config', 'G-XXX', { linker: { domains: ['slim-soda01.vercel.app', 'slimsodapowder.com'] } })`

## 📊 Eventos customizados (mapa)
| Evento GA4 | Quando | Categoria |
|---|---|---|
| `page_view` | toda page load | automático |
| `view_content` | LPs Stanford/Maria47 load | engagement |
| `lead` | 50% scroll | engagement |
| `begin_checkout` | click em qualquer CTA | cta |
| `purchase` | thank you page | conversion (TBD) |

## 🔗 Onde adicionar (checklist)
- [ ] Hub `references_v5/index.html` (head)
- [ ] Stanford v1.0 (head + bottom script)
- [ ] Maria 47 v4.7.2 (head + bottom script)
- [ ] Buy-page `buy-page/index.html`
- [ ] MemoPryl PDP V2
- [ ] Cardio Clear LP
- [ ] Linfaflow LP

## 📚 Refs
- https://support.google.com/analytics/answer/9304153 (GA4 setup)
- https://developers.google.com/tag-platform/gtagjs (gtag.js docs)
