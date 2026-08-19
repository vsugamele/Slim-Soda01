# Quiz Cardio Clear v5 — Como rodar (live + preview)

## 🔴 ATENÇÃO: por que o quiz não abre direto

O Quiz Cardio Clear v5 usa **OpenRouter (Sonnet 4.5) + ElevenLabs TTS** via um backend Node.js local. Sem o server rodando, o HTML carrega mas as chamadas `/api/respond` e `/api/tts` falham. O **preview estático** (no hub) deixa você navegar a estrutura mas sem respostas geradas.

## ✅ Como rodar o quiz LIVE (com LLM + TTS)

```bash
cd C:\Users\vsuga\Downloads\SlimSoda\páginas\hub-preview\quiz-v5-server
node server.js
```

Abre em: **http://localhost:3000/quiz-cardio-clear-v5.html**

Pré-requisitos (já instalados):
- Node.js 18+
- `.env` com as chaves de OpenRouter + ElevenLabs + Supabase

Verifica se tá rodando:
```bash
Get-NetTCPConnection -LocalPort 3000  # PowerShell
# ou
curl http://localhost:3000/api/health
```

## 📁 Stack do quiz v5

- `quiz-cardio-clear-v5.html` (61KB) — front-end quiz Cardio
- `quiz-slimsoda-v5.html` (60KB) — front-end quiz SlimSoda
- `prompts.js` (26KB) — system prompts separados por product
- `server.js` (18KB) — Express + OpenRouter + ElevenLabs + Supabase
- `quiz-track.js` (9KB) — Meta Pixel + UTM tracking
- `package.json` — dependências (express, cors, dotenv)
- `.env` — chaves (NÃO COMMITAR)

## 🎯 Endpoints disponíveis

- `GET /quiz-cardio-clear-v5.html` — front Cardio
- `GET /quiz-slimsoda-v5.html` — front SlimSoda
- `POST /api/respond` — LLM call (OpenRouter Sonnet 4.5)
- `POST /api/tts` — Text-to-Speech (ElevenLabs)
- `POST /api/track` — Event tracking (Supabase)
- `POST /api/leads` — Lead capture (Supabase)
- `GET /api/dashboard` — Stats (Supabase)
- `GET /api/health` — Health check

## 🧪 Roteiro de teste (4 personas, validated)

1. **Frank M 65-74** (on BP pills 6+ months, Mr. Roberts archetypal) → resultado cascade completo + James M testimonial
2. **Patricia F 65-74** → Patricia R. testimonial + cascade
3. **Maria 50-64** (just started BP pills) → expectation calibration
4. **Mike 50-64** (NO meds) → "talk to your doctor first" + prevention framing

## 🔧 Customização

- **Mudar persona:** edita `prompts.js` no objeto `products.cardioclear.persona`
- **Mudar cores:** edita `prompts.js` no objeto `products.cardioclear.colors` (navy/red/gold/green)
- **Mudar offer:** edita `prompts.js` no objeto `products.cardioclear.offer` ($49/$294/Pay 3 Get 6)
- **Mudar ingredientes:** só os 3 oficiais — Bitter Honey + Cagnulari Grape + Mediterranean Botanical (NÃO Mitoquinol, NÃO Arterial Rust)

## ⚠️ Canon rules (NÃO violar)

- NUNCA "stop your medication" / "cure" / "100% safe" / "guaranteed to"
- SEMPRE "talk to your doctor before changing your routine"
- Apenas canon stats: 96% stabilized (n=240) / 51× more microplastic (n=257) / 43,029+ Americans / 1 in 20 vs 1 in 2
- Apenas canon testimonials: Patricia R., James M., David K.
- Apenas canon 90-day money-back guarantee
- Apenas canon 3 ingredientes (NÃO nomear no quiz, só insinuar)
