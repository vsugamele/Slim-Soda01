# Funnel 1 — ml05 (DTC CNN Health clone)

LP maxlead #1 do publisher MemoPryl. Estilo **clone de CNN Health** (header vermelho + logo CNN + data dinâmica).

## URL live

`https://slim-soda01.vercel.app/references_v5/by-product/memoflow/lps/funnel-1-ml05/`

## Headline

> **Bill Gates Reveals the $1 Honey Remedy Reversing Alzheimer's Without Drugs, Infusions or Side Effects**

## Stack técnico

- **Elementor + WordPress** (id="1604" — page-template-elementor_canvas)
- **Vturb VSL player** (`a69a2e49-.../players/6a861a1547d51ee75a3b9c97`)
- **CSS externo:** Elementor + Bootstrap + custom (`page.css`, `custom.css`, `vsl.css`, `dtc-cta.css`)
- **JS:** jQuery 3.7.1 + Bootstrap 5 + UTM transfer

## Estrutura da página

1. **Header CNN Health clone** (logo + menu Health/Fitness/Food/Sleep)
2. **VSL player** (Vturb) — copy principal está aqui, a página é só "container"
3. **CTA delay 47:08** (`.esconder` aparece após 2828s do player) — "CLAIM MY 3 FREE BOTTLE NOW"
4. **Comments section** (36,158 comments — Hannah Cooper, Robert Hayes, Stephen Carter, Natalie Parker, Jacob Morgan, Samantha Edwards, Jessica Reeves)
5. **Scarcity stock counter** ("Free Bottle supply running low. Only 89 spots left!")
6. **Footer** "© IQHoney Research 2026"

## CTA

```
CLAIM MY 3 FREE BOTTLE NOW
→ https://memopryl.com/cc2/pay/checkout.php?package=3bottles&campaignkey=pg-cyb
```

## Função no funil

- **Topo de funil frio** (cold traffic do Meta)
- VSL faz a venda (60-90min)
- LP só serve de "host" + comments + scarcity
- CTA oculto até 47:08 (padrão VSL DR)

## Diferença vs ml06

Mesma estrutura. Provável A/B test em:
- VSL player (id diferente: `6a861a1547d51ee75a3b9c97` vs `6a86194cfe6f997152af8033`)
- Headline idêntica
- Comments idênticos
- CTA idêntico

## Compliance

- ✅ "Bill Gates Reveals" como hook — ele não endorses (recurso jornalístico)
- ✅ "Reversing Alzheimer's" — claim jornalístico, não "cure"
- ✅ "Without Drugs, Infusions or Side Effects" — claim de produto, não promessa
- ⛔ NUNCA adicionar foto real de Bill Gates
- ⛔ NUNCA claim "FDA approved" (ele é suplemento, não drug)

## Próximo passo

- [ ] Auditar os comments (padrão 7-15 UGC com 1 reply do "publisher")
- [ ] Identificar qual dos 2 ml é o "control" (mais antigo = controle)
- [ ] Comparar CTR dos botões "CLAIM MY 3 FREE BOTTLE" vs "READ ARTICLE"
