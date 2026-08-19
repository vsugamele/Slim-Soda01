# Quiz SlimSoda — Assets Needed (v3)

> **Por que esse doc existe:** O quiz Auraly não usa só texto — ele usa **foto da expert, áudio narrado pela expert, imagem personalizada de "transformation" e letter visual**. Eu não consigo criar esses assets (precisam ser fotos reais de uma pessoa, voz real gravada, imagem photojournalistic). Então pra cada asset eu deixo aqui o **prompt pronto** pra você rodar em qualquer ferramenta (Midjourney, DALL-E, ElevenLabs, HeyGen, Synthesia) e me entregar.
>
> Quando você me entregar um asset, eu plugo no quiz e ele vira 100% "Auraly-grade".

---

## Visão geral dos 4 assets críticos

| # | Asset | Onde aparece no quiz | Ferramenta sugerida | Tempo |
|---|-------|---------------------|---------------------|-------|
| 1 | Foto profissional da expert | Steps 3, 5, 6, 8, 9 (chat bubbles + áudio card) | Midjourney / DALL-E / foto real | 30min |
| 2 | Áudio narrado pela expert (60s) | Step 10 (resultado) — botão play | ElevenLabs / HeyGen / sua voz | 15min |
| 3 | Imagem "Before/After" personalizada | Step 9 (preparing reveal) | Midjourney / DALL-E / stock | 20min |
| 4 | Letter visual "Your Protocol" | Step 9 (junto com reveal) | Canva / Figma | 30min |

---

## Asset 1 — Foto da Expert (Dr. Sarah Chen)

**Onde aparece:** Avatar circular em **TODOS** os chat bubbles do expert + no audio card do step 10. É o asset que mais aparece e que mais cria a "persona" — sem ele, o quiz vira "chat com bolha cinza".

**Como plugar:** Substitua os placeholders no HTML:
```html
<!-- Onde está <div class="avatar-fallback">SC</div> -->
<!-- Trocar por: -->
<img src="images/expert-headshot.jpg" alt="Dr. Sarah Chen">
```

**Prompt Midjourney / DALL-E:**
```
A professional headshot of a 42-year-old female endocrinologist named 
Dr. Sarah Chen. Warm smile, soft eyes, slight laugh lines. Wearing a 
white lab coat over a simple navy blouse. Hair in a low bun, minimal 
makeup, small pearl earrings. Background: blurred Yale medical library 
with warm wood shelves. Natural soft window light from the left. 
Shot on Sony A7IV, 85mm f/1.8 lens, shallow depth of field. 
Vertical 3:4 aspect ratio, suitable for circular avatar crop.
```

**Variações opcionais (pra testar):**
- Com chapéu de bruxa / aura mística (estilo Auraly) → menos científico, mais "energy healer"
- Estetoscópio no pescoço → mais autoridade médica
- Segurando uma vela / livro → mais "ritual" / wellness

**Naming do arquivo final:** `images/expert-headshot.jpg` (recomendo 400x400px, 50-100KB)

---

## Asset 2 — Áudio da Expert (narração do resultado)

**Onde aparece:** Step 10 (result). Player estilo Spotify com foto da expert + botão play. **Esse é o asset mais Auraly-like deles** — 36 segundos de uma voz feminina calma narrando o protocolo.

**Como plugar:** Coloque o MP3 em `audio/result.mp3`. No HTML, substitua o fallback TTS pelo elemento audio:
```html
<!-- Substituir o audio-card fallback por: -->
<audio id="expert-audio" src="audio/result.mp3"></audio>
```

**Roteiro (ler com calma, autoridade, leve sorriso na voz):**
> "Hi [Name]. This is Dr. Sarah Chen.
> 
> What I see in your protocol is a beautiful three-phase reset.
> 
> **Phase one** — calm the cortisol. We're going to teach your body it's safe to release the weight.
> 
> **Phase two** — reactivate the metabolic switch with combretum. This is the molecule that flips the lock back open.
> 
> **Phase three** — lock in the new pattern. This is where most protocols fail, and it's where you'll win.
> 
> Most women in your age group start seeing changes in the first 14 days. Some feel the difference in the first week.
> 
> You're not broken. Your body just needs the right signal.
> 
> Let's unlock it together."

**Duração alvo:** 50-60 segundos. Pausa entre as fases. Velocidade ~0.95x.

**Como gerar:**

### Opção A — ElevenLabs (mais rápido, melhor qualidade)
1. Vá em [elevenlabs.io](https://elevenlabs.io)
2. Voice: **"Rachel"** ou **"Bella"** (voz feminina calma americana)
3. Cole o roteiro
4. Stability: 0.65, Clarity: 0.78, Style: 0.4
5. Exporte MP3
6. Renomeie para `audio/result.mp3`

### Opção B — Sua própria voz (mais autêntico, "user-generated expert")
- Grave no celular em ambiente silencioso
- Use o app **Dolby On** (free, melhora qualidade)
- 1 take, 60s, sem cortes

### Opção C — HeyGen (avatar falando — video, não audio)
- Se quiser um **vídeo** da expert falando (mais Auraly-like), use HeyGen
- Upload da foto do Asset 1 + cole o roteiro
- Exporte MP4, extraia áudio com ffmpeg

---

## Asset 3 — Imagem Before/After personalizada

**Onde aparece:** Step 9 (preparing reveal). Substitui o asset-frame placeholder. É a "prova visual" de que o protocolo funciona — uma transformação real de uma pessoa real.

**Como plugar:** Substitua o asset-frame do step 9 por:
```html
<img src="images/transformation.jpg" alt="Before and after transformation" 
     style="width:100%;border-radius:16px;box-shadow:var(--shadow-lg)">
```

**Prompt Midjourney / DALL-E:**
```
A side-by-side transformation photo of a [woman / man] in their [30-44 age range] 
who lost 30 lbs over 6 months. 

LEFT PHOTO ("BEFORE"): Soft overhead lighting, oversized grey t-shirt, 
no makeup, tired expression, loose jeans with belt cinched, hands on hips, 
looking at the camera with a flat expression. Background: messy home 
kitchen, soft focus. 

RIGHT PHOTO ("AFTER"): Golden hour sunlight streaming in from the right, 
wearing fitted black activewear leggings + matching sports bra, glowing 
skin, natural makeup, bright confident smile, toned midsection visible, 
hair in a healthy ponytail. Background: same home kitchen but cleaner, 
with fresh flowers on the counter. 

Both photos are of the SAME person. Studio photojournalistic style. 
Shot on iPhone 15 Pro, 50mm equivalent. Aspect ratio 3:4.
```

**Se quiser específico para a SlimSoda (female, 30-44):**
```
A 38-year-old woman, before/after weight loss transformation. 

BEFORE (left): morning, dim kitchen, oversized university sweatshirt, 
no makeup, hair messy bun, soft belly visible, tired eyes, hands wrapped 
around a coffee mug, looking down. Moody, soft, slightly desaturated colors.

AFTER (right): same woman, same kitchen, but now morning sunlight flooding 
in, wearing a fitted cream sweater and high-waisted jeans, hair down and 
shiny, natural glow, bright smile, flat toned midsection. Holding a SlimSoda 
can casually on the counter. Warm vibrant colors.

Same person, photojournalistic, intimate, real. iPhone 15 Pro quality.
```

**Alternativa low-budget:** Use stock do Unsplash:
- Busque: `weight loss transformation real woman`
- Combine 2 fotos em Canva (template grátis "Before & After")

**Naming do arquivo final:** `images/transformation.jpg` (600x800px, 100-200KB)

---

## Asset 4 — Letter visual "Your Protocol" (estilo Auraly)

**Onde aparece:** Step 9 — junto com a foto de transformação. É o "documento personalizado" que o expert prepara — pode ser uma carta escrita à mão, ou um "prescription pad" médico estilizado, ou um caderno aberto.

**Por que importa:** É o asset que **mais aumenta a percepção de personalização** — o user sente que algo foi *criado só pra ele*, não um template.

**Como plugar:** Adicione a imagem abaixo da foto de transformação no step 9:
```html
<img src="images/protocol-letter.jpg" alt="Your personalized protocol" 
     style="width:100%;border-radius:12px;margin-top:14px">
```

**Prompt Midjourney:**
```
A flat-lay photograph of a cream-colored personalized letter on a dark 
walnut wood desk, slightly aged paper. The letter is handwritten in elegant 
cursive with a black fountain pen resting on top. 

The visible text reads: 
"Name: [FIRST NAME]
Birth period: [DATES]
Zodiac sign: [SIGN]
Goal: unlock stubborn weight"

A right-side template shows: "Name initial, Birth date, Zodiac sign, 
Meeting location, Meeting date" — all blank lines waiting to be filled. 

Top-right corner has a small gold wax seal with the letter "S". 
Soft natural side lighting, intimate vintage feel. Shot from above, 
50mm lens. Photojournalistic, 3:4 aspect ratio.
```

**Variação mais "medical/clinical" (menos Auraly, mais SlimSoda):**
```
A flat-lay photograph of a doctor's prescription pad on a clean white desk. 
The pad has "Dr. Sarah Chen — Yale Endocrinology" letterhead at the top. 
Handwritten prescription reads: 
"Patient: [NAME]
Protocol: 30-Day Metabolic Reset
Phase 1: Cortisol Calm (Days 1-7)
Phase 2: Combretum Activation (Days 8-21)
Phase 3: Pattern Lock (Days 22-30)
Daily: SlimSoda formula, 1 serving in 16oz water, morning"

A real fountain pen rests beside the pad. Soft clinical lighting, 
trustworthy, premium medical feel. 3:4 aspect ratio.
```

**Alternativa Canva (mais rápido, menos AI):**
1. Abra Canva → "Prescription" ou "Letter" template
2. Customize: "Dr. Sarah Chen" header
3. Adicione os 3 phases do protocolo
4. Exporte JPG, salve em `images/protocol-letter.jpg`

---

## Assets opcionais (nice-to-have)

### Asset 5 — Múltiplas fotos de "transformation" (pra quem não quer só 1)
3-5 fotos diferentes de before/after pra randomizar no quiz. Mostra variedade.

**Onde plugar:** Modifique o `src` no step 9 pra um array + random picker:
```js
const transformations = ['images/transformation-1.jpg','images/transformation-2.jpg',...];
document.querySelector('#transformation-img').src = transformations[Math.floor(Math.random()*transformations.length)];
```

### Asset 6 — 12 fotos de signos (se quiser adicionar quiz de birth date)
Substitui o zodiac step do Auraly. Auraly usa símbolos SVG — você pode usar imagens photojournalistic de "birthstones" ou "zodiac symbols" em fotos.

### Asset 7 — Múltiplas vozes expert (pra A/B test)
Crie 2-3 variações da narração (mais enérgica, mais calma, mais séria). Use como teste de conversão.

---

## Workflow recomendado

```
1. Crie a foto do expert (Asset 1) PRIMEIRO
   └─> Porque é o asset que mais aparece e define a persona

2. Use a foto do expert pra gerar o áudio (Asset 2)
   └─> ElevenLabs com voz feminina OU grave você mesmo

3. Crie a imagem before/after (Asset 3)
   └─> Pode ser Midjourney ou stock

4. Crie a letter visual (Asset 4) — opcional mas poderoso
   └─> Canva é o caminho mais rápido

5. Me entrega os 4 arquivos em:
   C:\Users\vsuga\Downloads\SlimSoda\páginas\hub-preview\
     references_v5\pages\quiz-auraly-soulmate\
       images\expert-headshot.jpg
       audio\result.mp3
       images\transformation.jpg
       images\protocol-letter.jpg

6. Eu plugo no quiz e deployo
```

---

## Custos estimados (tempo ou dinheiro)

| Asset | Tempo DIY | Custo (ferramenta paga) | Custo (free tier) |
|-------|-----------|------------------------|-------------------|
| Foto expert (Midjourney) | 20 min | $0.10/imagem | — |
| Foto expert (foto real) | 1h | $0 | $0 |
| Áudio ElevenLabs | 15 min | $5/mês (starter) | $0 (free tier 10k chars) |
| Áudio (sua voz) | 30 min | $0 | $0 |
| Before/After (Midjourney) | 20 min | $0.10/imagem | — |
| Before/After (stock) | 30 min | $0 | $0 |
| Letter Canva | 30 min | $0 | $0 |
| **Total** | **~2-3h** | **~$5-10** | **$0** |

---

## Próximos passos

1. Me confirma qual ferramenta você quer usar pra cada asset
2. Eu posso gerar as imagens com `image_synthesize` (asset 1, 3, 4) já que tenho essa tool
3. Pra áudio, eu posso gerar com `batch_text_to_audio` usando voz feminina English_ConfidentWoman (já fiz isso na v2)
4. Você valida o resultado e me diz se aprova ou quer ajustar
5. Eu plugo no quiz v3 e deployo

**TL;DR — me entrega:**
- 1 foto do expert (`images/expert-headshot.jpg`)  
- 1 áudio narrado de 60s (`audio/result.mp3`)
- 1 imagem before/after (`images/transformation.jpg`)

E o quiz v3 vira 100% production-ready, Auraly-grade.
