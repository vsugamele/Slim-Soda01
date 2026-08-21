# VSLs Originais (MemoPryl DTC) — Off-Vercel

**Status:** Arquivos NÃO commitados no Vercel (cada MP4 = ~2GB, acima do limite de 100MB).

## Localização local (source of truth)

```
C:\Users\vsuga\Downloads\Produtos Bifi\MEMO\Vsl\
├── [120826] VSL 1 - MemoPryl [DTC].mp4  (1.85 GB, ~60-90min)
└── [130826] VSL 2 - MemoPryl [DTC].mp4  (1.94 GB, ~60-90min)
```

## Especificação técnica

| Atributo | VSL 1 | VSL 2 |
|---|---|---|
| Data produção | 12/08/26 | 13/08/26 |
| Publisher | MemoPryl (MemoFlow) | MemoPryl (MemoFlow) |
| Plataforma destino | DTC (direct response) | DTC (direct response) |
| Provável duração | 45-90 min | 45-90 min |
| Player destino | Vturb (`a69a2e49-...`) | Vturb (`a69a2e49-...`) |

## Por que 2 versões?

Padrão publisher DR: A/B test de **mesma copy com pequenas variações** (B-roll, takes do spokesperson, exemplos diferentes). Quem decide qual escala é o ROAS, não a copy em si.

## Engenharia reversa

Ver `../vsl-standalone-memoflow-v2.html` (já no Vercel) — é a VSL completa com 11 GIFs animados no lugar do vídeo. A copy e estrutura da VSL original **é a mesma** da standalone; só muda o formato de mídia.

Transcrição completa (Whisper) ainda não foi feita. Próximo passo: rodar Whisper em background em ~1h de cada VSL pra mapear:

- 12 blocos E3 (Lead → Raio X → Mecanismo → Tese → Histórias → Apresentação → Future Pacing → 7 Razões → Oferta → Bônus → Cost of Inaction → Close)
- Tom de voz / pacing do spokesperson
- CTA copy exato
- Variações entre VSL 1 e VSL 2

## Como assistir

```powershell
# Abrir direto do Explorer
explorer "C:\Users\vsuga\Downloads\Produtos Bifi\MEMO\Vsl\[120826] VSL 1 - MemoPryl [DTC].mp4"
```

```bash
# Ou via VLC
"C:\Program Files\VideoLAN\VLC\vlc.exe" "C:\Users\vsuga\Downloads\Produtos Bifi\MEMO\Vsl\[120826] VSL 1 - MemoPryl [DTC].mp4"
```
