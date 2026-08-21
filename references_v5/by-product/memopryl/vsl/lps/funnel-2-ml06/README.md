# Funnel 2 — ml06 (DTC CNN Health clone, VSL variante)

LP maxlead #2 do publisher MemoPryl. **Estrutura idêntica ao ml05** mas com Vturb player diferente (variante do VSL).

## URL live

`https://slim-soda01.vercel.app/references_v5/by-product/memoflow/lps/funnel-2-ml06/`

## Headline

> **Bill Gates Reveals the $1 Honey Remedy Reversing Alzheimer's Without Drugs, Infusions or Side Effects**

(mesma do ml05)

## Vturb player ID

- ml05: `6a861a1547d51ee75a3b9c97` (assets em `assets/pages/pv4/dtc/ml05/`)
- **ml06: `6a86194cfe6f997152af8033`** (assets em `assets/pages/pv4/dtc/ml05/` — mesma pasta, só o ID do player muda)

## Diferença vs ml05

Praticamente nenhuma. É a **mesma página com VSL diferente**. Padrão A/B test publisher:
- 1 LP
- 2 VSLs
- Identifica qual VSL converte melhor em 7-14 dias
- Mata o pior

## Stack técnico

Igual ao ml05 (Elementor + Vturb + jQuery + Bootstrap).

## Próximo passo

- [ ] Identificar timestamps de início de cada VSL pra confirmar que são takes diferentes
- [ ] Acessar `https://memopryl.com/cc2/pay/checkout.php?package=3bottles&campaignkey=pg-cyb` e checar qual campaign key ta ativo
- [ ] Comparar pixels do Meta entre ml05 e ml06 (UTM tracking)
