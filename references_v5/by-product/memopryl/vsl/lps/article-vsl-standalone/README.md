# Article-VSL Standalone — MemoFlow v2 (71KB)

VSL standalone do MemoFlow, entregue como **article LP + GIFs animados** (não vídeo). É a versão "scrollable" da VSL original em vídeo (2GB cada).

## URL live

`https://slim-soda01.vercel.app/references_v5/by-product/memoflow/lps/article-vsl-standalone/`

## Estrutura do arquivo

```
article-vsl-standalone/
├── MemoFlow-v2.html         # 71KB / 776 linhas — VSL completa
├── gifs/                    # 11 GIFs animados S01 → S11
│   ├── S01_filho-e-pai_bloqueio-receptor_1.gif
│   ├── S02_diario-e-remedios_1.gif
│   ├── S03_estudo-1h-da-manha_1.gif
│   ├── ... (S04-S11)
│   └── S11_ugc-idosos-produto_1.gif
└── images/                  # 12 assets editoriais (ícones + reviews)
    ├── icon-*.png (5 way icons)
    ├── image1.png (garantia)
    ├── image8.png (hero)
    ├── image9.png (price comparison)
    └── image11/13/16/17.jpg (3 reviews fotográficas)
```

## Stack técnico

- **HTML standalone** (sem React, sem Next.js)
- **CSS inline** (~9KB, sem dependências externas além de Google Fonts Bitter + Poppins)
- **JS inline** (quiz popup + UTM transfer)
- **Quiz modelo 1** (avaliação clínica, 4 questões, navy color)
- **Modal popup** (`.mfq-overlay`) que abre automaticamente após scroll

## Estrutura narrativa (12 blocos E3 do Filemón)

| # | Bloco | Headline (resumo) | GIF |
|---|---|---|---|
| 1 | **Lead** | "The Honey Trick Is Real. But Everyone's Doing It Wrong." | (hero) |
| 2 | **Raio X** | "I Was the Son With the Sharp Memory. I Told My Father It Was Just Age." | S01 |
| 3 | **Diário 2-semanas** | "What I Found Made My Blood Run Cold." | S02 |
| 4 | **Estudo 1h-manhã** | "I Found the Study That Explained What Was Happening to My Father" | S03 |
| 5 | **Mecanismo** | "Your Brain Is Losing Access to the Fuel It Needs to Remember" (insulin receptor + cádmio) | S04 |
| 6 | **4 caminhos** | "There Are Only Four Ways to Fix This. Three of Them Will Fail You" | S05 |
| 7 | **Origem (1 ano)** | "Knowing the Protocol Wasn't Enough. It Took Me Almost a Year" | S06 |
| 8 | **Prova pessoal** | "I Watched My Father Come Back to Us" (Markus + pai) | S07, S08 |
| 9 | **Apresentação** | "So I Made the Real Formula. I Called It MemoFlow" (cor azul característica) | S09 |
| 10 | **Prova social** | "Real People. Changes Their Families Noticed" (Margaret, Robert, Susan) | S10 |
| 11 | **Oferta** | "Celebrity Capsules Cost $300. Today, You Can Get MemoFlow for $19.99" + B3G3 | — |
| 12 | **Garantia + Cost of Inaction** | "60-Day Money-Back" + "Six Months From Now, You'll Either Trust Your Mind Again..." | S11 |

## Comparação com VSL original (vídeo)

- **Standalone (esta):** texto scroll + 11 GIFs + quiz popup
- **Original (vídeo):** Vturb player 60-90min, mesma copy estrutural

A copy é praticamente idêntica. Os GIFs foram criados como **substitutos visuais** dos takes de vídeo do spokesperson. Próximo passo: rodar Whisper na VSL original pra mapear exatamente o pacing e tom de voz.

## Compliance

- ✅ "Markus Davenport, Researcher and Formulator" — avatar, não médico real
- ✅ "Bill Gates" só aparece no header da LP maxlead (ml05/ml06), não aqui
- ✅ Mecanismo explicado com "may help", "designed to", "support"
- ✅ Disclaimer FDA no footer ("These statements have not been evaluated...")
- ⛔ NÃO usar "cure Alzheimer" — só "cognitive support"
- ⛔ NÃO usar foto real de Bill Gates

## Próximo passo

- [ ] Transcrição Whisper da VSL original (`copy/vsl-script/vsl-video-original/`)
- [ ] Mapear os takes de cada GIF (qual cena do vídeo cada GIF representa)
- [ ] Identificar o spokesperson (é ator? é IA? voz clonada?)
