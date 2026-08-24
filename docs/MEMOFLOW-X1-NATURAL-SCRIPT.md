# MemoFlow X1 Natural Sales Script

Data: 2026-08-24
Status: working draft for Imperio implementation
Goal: vender MemoFlow via conversa natural em Direct/Messenger/chat, sem parecer quiz.

## Core idea

The user should feel they are talking to a real specialist/concierge, not filling a funnel.

The system still follows a script internally:

1. Open from the ad/VSL context.
2. Identify the personal reason behind the click.
3. Mirror the pain in the user's own words.
4. Introduce the clean mechanism.
5. Handle trust/safety skepticism.
6. Raise buying temperature.
7. Capture CRM data progressively when it helps the conversation.
8. Present the offer only when there is intent.
9. Send checkout, safe pause, or automated follow-up.

No visible quick replies as the main interaction. The user writes naturally. The AI classifies the message and chooses the next scripted move.

## Conversation controller

Every incoming message is processed in this order:

```text
1. Detect intent
2. Detect risk
3. Detect current stage
4. Answer naturally
5. Bridge back to the script
6. Advance, hold, checkout, safe pause, or follow up
```

### Hidden lead state

```json
{
  "product": "memoflow",
  "funnel": "memoflow_x1",
  "stage": "open|why_clicked|mirror|mechanism|proof|safety|offer|checkout|followup",
  "entry_angle": "lithium|ikaria|anti_scam|caregiver|research|unknown",
  "buyer": "self|parent|spouse|research|unknown",
  "pain": "word_recall|repeating|misplacing|brain_fog|aging_worry|caregiver_worry|unknown",
  "medical_flag": "none|medication|diagnosis|alzheimers_dementia|unsure",
  "temperature": "cold|curious|warm|hot",
  "objection": "price|trust|safety|proof|scam|spouse|timing|none",
  "crm": {
    "first_name": null,
    "email": null,
    "phone": null,
    "channel_id": null,
    "consent": "implicit_channel|explicit_email|explicit_sms|none",
    "capture_stage": "none|soft_identity|checkout_recovery|followup"
  },
  "script_anchor": "next_best_stage",
  "checkout_sent": false,
  "auto_resolution": "continue|safe_pause|checkout|followup"
}
```

## Stage map

### 1. Open

Objective: make the message feel contextual, not automated.

Trigger examples:

- User came from lithium ad.
- User came from Ikaria/honey ad.
- User came from anti-scam ad.
- User asks "is this real?"

Primary copy:

```text
Vi que você veio pelo vídeo sobre memória. Antes de eu te mandar qualquer link, me fala uma coisa: o que mais te pegou ali?
Foi a parte de esquecer palavras, a preocupação com alguém da família, ou a dúvida se isso é real mesmo?
```

If English flow:

```text
I saw you came from the memory video. Before I send any link, what part made you stop?
Forgetting words, concern about someone in the family, or wanting to know if this is actually real?
```

Return rule:

If the user answers anything unrelated, reply to it briefly and ask one soft diagnostic question.

### 2. Why clicked

Objective: get the emotional reason, not just demographic data.

Good AI behavior:

- Do not interrogate.
- Ask one question at a time.
- Reflect the user's words.

Copy examples:

```text
Entendi. Esse tipo de coisa incomoda porque não parece "grave" no começo, mas fica martelando na cabeça.
Quando você percebe isso mais: nomes/palavras, entrar num cômodo e esquecer o motivo, ou repetir a mesma coisa sem notar?
```

```text
Faz sentido você querer olhar isso com calma. Quando é para pai ou mãe, a dúvida normalmente vem com medo de esperar demais.
O que você percebeu primeiro?
```

### 3. Mirror

Objective: make the lead feel understood before explaining product.

Copy formula:

```text
Então não é só "memória".
É aquela sensação de que algo mudou no dia a dia e você quer entender se ainda dá para apoiar isso antes de virar uma preocupação maior.
```

For caregiver:

```text
Então o ponto não é só comprar um suplemento.
É você tentar ajudar sem assustar a pessoa, e sem cair em promessa exagerada de internet.
```

Bridge:

```text
É por isso que a explicação limpa do MemoFlow começa pelo mecanismo, não pelo pote.
```

### 4. Mechanism

Objective: introduce differentiated mechanism in simple language.

Allowed mechanism:

- Ikarian honey angle as provenance/story.
- Lithium orotate as trace mineral angle.
- Neural MicroLock as sublingual delivery angle.
- Memory support and healthy cognitive aging only.

Core copy:

```text
A ideia do MemoFlow é um ritual sublingual diário para suporte de memória.
O argumento dele combina três coisas: compostos ligados ao mel de Ikaria, uma dose traço de lithium orotate, e a entrega sublingual chamada Neural MicroLock.

O ponto importante: isso não é tratamento e não é promessa de curar nada. A venda limpa é suporte de função de memória e envelhecimento cognitivo saudável.
```

Short version:

```text
Em português simples: não é "pílula milagrosa".
É um ritual de suporte de memória que tenta entregar os ativos pela via sublingual, em vez de depender só da digestão.
```

### 5. Proof and trust

Objective: reduce scam fear without overclaiming.

Copy examples:

```text
Sua desconfiança é correta. Esse nicho tem muito anúncio ruim.
Eu olharia três coisas antes de decidir: mecanismo faz sentido, ingredientes estão claros, e existe garantia real no checkout.
```

```text
Eu não usaria celebridade, doutor falso ou frase tipo "reverte Alzheimer" para vender isso.
Se alguém precisa desse tipo de promessa, para mim já é sinal vermelho.
```

Bridge back:

```text
Se esses três pontos estiverem ok para você, aí a pergunta vira outra: faz sentido testar por 90 dias ou não?
```

### 6. Safety

Objective: protect the account and avoid medical claims without killing conversion.

Trigger words:

- Alzheimer
- dementia
- diagnosis
- medication
- prescription
- doctor
- Parkinson
- stroke
- pregnant
- nursing

Mandatory response:

```text
Nesse caso eu preciso ser direto: se existe diagnóstico, remédio ou acompanhamento médico, o certo é tratar isso como informação e conferir a lista de ingredientes com um médico ou farmacêutico antes de usar.

Posso te explicar o produto, mas não vou te vender como tratamento.
```

Return bridge:

```text
Dentro desse limite, a pergunta prática é: você quer entender os ingredientes ou a garantia primeiro?
```

### 7. Temperature raise

Objective: determine if the lead is ready for offer.

Natural copy:

```text
Pelo que você me contou, parece que você está em uma dessas duas situações:
ou quer entender mais para se sentir seguro, ou já quer ver se o teste de 90 dias faz sentido.
Qual das duas é mais verdade agora?
```

Hot lead shortcut:

```text
Sim, eu posso te mandar o link certo.
Antes: você quer pegar a opção de 3 frascos com garantia de 90 dias ou prefere olhar a página primeiro com calma?
```

### 8. CRM capture

Objective: capture useful CRM data without making the conversation feel like a form.

Principle: collect the minimum contact data needed for the next commercial action. If the conversation happens inside Instagram/Messenger, the platform channel ID is already the first CRM identifier. Do not ask for email/phone too early.

#### CRM capture moments

Soft identity after pain/mirror:

```text
Para eu nao te responder de forma generica: como posso te chamar?
```

Checkout recovery after intent:

```text
Se o checkout travar ou voce sair da pagina, quer que eu te mande o resumo e o link por email tambem?
```

SMS/WhatsApp only after explicit usefulness:

```text
Se preferir, posso te mandar o link por SMS/WhatsApp para voce nao perder. Qual numero devo usar?
```

Caregiver forwarding:

```text
Quer que eu monte um resumo curto para voce encaminhar para sua mae/pai ou para alguem da familia?
```

#### CRM fields to collect

```json
{
  "first_name": "optional, conversational",
  "email": "only if user agrees to receive summary/link",
  "phone": "only if user asks for SMS/WhatsApp or agrees explicitly",
  "channel_id": "instagram_id|messenger_psid|site_session_id",
  "buyer": "self|parent|spouse|research",
  "pain": "main concern",
  "entry_angle": "ad/VSL angle",
  "objection": "latest objection",
  "temperature": "cold|curious|warm|hot",
  "consent_source": "chat message text + timestamp",
  "last_script_stage": "current stage"
}
```

#### Bad CRM behavior

Do not ask:

```text
Digite seu nome, email e telefone para continuar.
```

Do not block mechanism or offer behind a lead form. The capture should feel like help, not access control.

#### Good CRM behavior

```text
Te mando sim. E para eu nao perder o contexto se voce voltar depois, posso salvar isso como "memoria para minha mae"?
```

```text
Perfeito, Ana. Entao vou deixar anotado: e para sua mae, a maior preocupacao e repeticao de conversas, e voce quer olhar sem promessa exagerada.
```

### 9. Offer

Objective: sell the next step, not overexplain.

Copy:

```text
O caminho mais lógico é o teste de 90 dias, porque memória e rotina não são coisas que você avalia em dois dias.

A opção principal é o kit de 3 frascos. Ele faz mais sentido porque cobre esse período de teste e fica dentro da garantia do checkout.
```

Checkout push:

```text
Vou te mandar o checkout seguro.
Olha principalmente três pontos: kit escolhido, garantia e dados de envio. Se alguma coisa ficar confusa, me chama aqui antes de pagar.
```

### 10. Objection handling

Price:

```text
Justo. Eu não tentaria convencer você no preço sozinho.
A comparação correta é: faz sentido testar por 90 dias com garantia, ou você prefere continuar só observando e voltar nisso depois?
```

Scam:

```text
Eu também teria esse pé atrás.
Por isso eu separaria duas coisas: anúncio exagerado de internet e a oferta real com ingredientes, garantia e checkout. O que você deve julgar é a oferta real.
```

Spouse/family:

```text
Faz sentido falar com a família.
Se quiser, eu te mando uma explicação curta para você encaminhar sem parecer propaganda.
```

Safety:

```text
Se existe remédio ou diagnóstico, não compra no impulso.
Confere com médico/farmacêutico. Se estiver tudo ok, aí você volta e decide pelo teste.
```

### 11. Follow-up

Objective: recover leads who did not click or did not buy.

15 minutes:

```text
Conseguiu abrir o checkout? Só confere se apareceu o kit com garantia de 90 dias.
```

4 hours:

```text
Passei só para não te deixar perdido: sua dúvida maior era segurança, preço ou entender se faz sentido para o seu caso?
```

24 hours:

```text
Ontem você tinha comentado sobre memória e rotina. Quer que eu te mande um resumo simples do mecanismo antes de decidir?
```

## AI guardrails

The AI must never:

- Say it cures, treats, reverses, prevents or diagnoses disease.
- Say it improves Alzheimer's, dementia, Parkinson's or stroke.
- Invent studies, doctors, testimonials or FDA approval.
- Use celebrity endorsement.
- Push purchase after medication/diagnosis without professional check.
- Send checkout repeatedly after clear refusal.

The AI should:

- Use short messages.
- Ask one question at a time.
- Match the user's language.
- Sound like a person, not a landing page.
- Always answer the user's actual question.
- Bridge back to the nearest script stage after answering.
- Use automated recovery when the user is hot, angry, confused, or medically sensitive.

## Imperio events

Recommended invisible event map:

```text
ChatView
LeadIntentDetected
PainIdentified
BuyerIdentified
CRMSoftIdentityCaptured
CRMContactCaptured
ConsentCaptured
MechanismDelivered
ProofDelivered
SafetyFlagged
ObjectionDetected
OfferReady
CheckoutSent
AutoResolutionTriggered
FollowupScheduled
OptOut
```

## Fully automated resolution rules

There is no human takeover in this system. When a conversation would normally go to a person, the AI must use one of four automated modes:

```text
continue - answer and keep selling through the nearest script stage.
safe_pause - do not sell now; recommend doctor/pharmacist check or official support path.
checkout - send the checkout with practical instructions.
followup - stop pushing and schedule a recovery message.
```

### Safe pause triggers

Use `safe_pause` when:

- user mentions diagnosis, medication, Alzheimer's, dementia or any medical follow-up and still wants to buy now;
- user asks for medical dosage, drug interaction or disease treatment advice;
- user is angry, reports a refund/order issue, or asks for support after purchase;
- user is confused by product identity MemoPryl vs MemoFlow and needs clarification before checkout.

Safe pause copy:

```text
Nesse ponto eu nao quero te empurrar para compra. Se tem diagnostico, remedio ou duvida medica, confere a lista de ingredientes com medico ou farmaceutico primeiro.

Se depois disso fizer sentido, voce volta aqui e eu te mando o caminho certo do teste de 90 dias.
```

### Automated close limit

If checkout was already sent and the user does not click/buy:

1. Try one clarification close.
2. Try one objection close.
3. Stop pushing and move to follow-up.

Never send the checkout more than twice in the same conversation unless the user explicitly asks for it again.

## Implementation note

The public chat should keep no visible quick replies. Internally, Imperio should maintain an AI decision panel:

- current stage;
- next script move;
- detected objection;
- safe checkout, safe pause, or follow-up action.

This gives a natural user experience while preserving a controlled sales script.

## Conversion architecture v2

This is the higher-standard script layer. The objective is not to "chat"; the objective is to convert every qualified lead who truly has product fit, while filtering unsafe medical cases.

The AI must always decide four things before answering:

```text
1. What pain is driving this person?
2. Which angle brought them here?
3. Which mechanism will make the purchase feel logical?
4. What is the next conversion move?
```

### Core sales thesis

```text
If the lead is worried about memory but skeptical of miracle claims, the clean path is not a stronger promise.
The clean path is a believable 90-day support ritual with a specific mechanism, clear ingredients, and low-risk guarantee.
```

### Core mechanism

MemoFlow should not be sold as "a memory supplement." That is too generic.

It should be sold as:

```text
A sublingual memory-support ritual built around a trace mineral + Ikarian honey provenance + Neural MicroLock delivery.
```

Short persuasive version:

```text
O ponto nao e engolir mais uma capsula generica para memoria.
O ponto e usar um ritual sublingual que tenta entregar suporte de memoria por uma rota mais direta, com ingredientes claros e uma garantia que permite testar sem comprar no escuro.
```

### Pain ladder

The AI should route the lead by pain intensity:

| Pain level | What the lead says | Real emotion | Script move | Do not do |
|---|---|---|---|---|
| Level 1 | "I forget names sometimes" | Annoyance, aging worry | Normalize + mechanism | Do not over-medicalize |
| Level 2 | "I repeat myself / misplace things" | Loss of confidence | Mirror + consequence | Do not say disease/prevention |
| Level 3 | "My mom/dad is changing" | Fear, responsibility | Caregiver empathy + safe mechanism | Do not scare or diagnose |
| Level 4 | "Doctor/Alzheimer/dementia/meds" | Medical risk | Safe pause + education only | Do not push checkout |
| Level 5 | "Is this fake/scam?" | Distrust | Anti-scam angle + proof filter | Do not defend aggressively |

### Angle router

Use the entry angle if known from UTM/ad ID. If not known, infer from first user message.

| Entry signal | Best angle | First conversion job | Mechanism frame | Offer bridge |
|---|---|---|---|---|
| "lithium", "mineral", "Harvard", "research" | Missing brain mineral | Make it feel specific and scientific | Trace mineral support + sublingual ritual | "The 90-day test makes sense if the mechanism feels logical." |
| "Ikaria", "honey", "Greek island", "blue zone" | Blue zone provenance | Make it feel natural and memorable | Ikarian honey provenance + daily ritual | "The offer is the practical version of that ritual." |
| "fake", "scam", "Bill Gates", "Dr Oz" | Honest anti-scam | Build trust by rejecting hype | No celebrities, clear ingredients, guarantee | "Judge the real offer, not the bad ads." |
| "mom", "dad", "family", "caregiver" | Proxy buyer | Make the buyer feel responsible but not panicked | Safe support, not treatment | "A low-pressure trial is easier than debating it forever." |
| "stress", "brain fog", "cortisol" | Stress-memory axis | Reframe aging worry as everyday stress support | Supports natural stress response + memory routine | "Start with a routine before assuming it is just aging." |

### Qualified lead definition

A lead is qualified when at least three are true:

- They identify a memory-related concern.
- They are buying for self or a close family member.
- They ask about mechanism, safety, proof, price, guarantee, or link.
- They have no unresolved medication/diagnosis risk.
- They accept that this is support, not a cure/treatment.

Qualified lead close:

```text
Pelo que voce me contou, voce nao esta procurando promessa milagrosa. Voce quer uma forma simples de apoiar memoria sem cair em golpe.

Nesse caso, o mais logico e olhar o teste de 90 dias: ingredientes claros, rotina simples e garantia no checkout.
```

### Disqualified or paused lead

Pause when the user wants medical treatment, has active diagnosis/medication concerns, is seeking emergency advice, or is angry about an order/refund.

Safe pause:

```text
Nesse caso eu nao vou te empurrar para compra. Se existe diagnostico, remedio ou acompanhamento medico, o correto e conferir a lista de ingredientes com medico ou farmaceutico primeiro.

O produto pode ser entendido como suporte de memoria, nao como tratamento.
```

### Stage-by-stage conversion moves

| Stage | Conversion goal | Required output | Example |
|---|---|---|---|
| Open | Create relevance | Mention ad/VSL context + ask one diagnostic question | "O que mais te pegou no video?" |
| Pain | Identify emotional driver | Mirror exact concern | "Entao o medo nao e esquecer uma palavra, e sentir que isso esta ficando mais frequente." |
| Mechanism | Make purchase rational | Explain why this product is different | "Nao e capsula generica; e ritual sublingual com mecanismo especifico." |
| Proof | Reduce scam anxiety | Give a proof filter, not hype | "Eu olharia ingredientes, garantia e se a promessa e limpa." |
| CRM | Preserve recovery path | Ask only when useful | "Como posso te chamar para nao perder o contexto?" |
| Offer | Make next step obvious | Frame 90-day test | "Memoria e rotina nao se avaliam em dois dias." |
| Checkout | Reduce payment anxiety | Send link + what to check | "Confere kit, garantia e dados de envio." |
| Follow-up | Recover non-buyers | Ask objection-specific question | "Sua duvida ficou em preco, seguranca ou se faz sentido para seu caso?" |

### Objection matrix

| Objection | What it really means | Bad answer | Better answer | Return to script |
|---|---|---|---|---|
| "Is this a scam?" | "Can I trust you?" | "No, it is legit." | "Eu tambem desconfiaria. Eu separo anuncio exagerado de oferta real: ingredientes claros, garantia e checkout." | Proof -> mechanism |
| "Does it work?" | "Will I regret buying?" | "Yes, it works." | "O jeito honesto de olhar e como teste de suporte por 90 dias, nao promessa imediata." | Offer |
| "Too expensive" | "I am not convinced of value" | Discount begging | "A pergunta certa e se vale testar com garantia ou continuar observando sem fazer nada." | Value close |
| "I need to ask family" | "I need social permission" | "Ok, let me know" | "Te mando um resumo curto para encaminhar sem parecer propaganda." | CRM/forwarding |
| "I take meds" | "I may be at risk" | "It is natural" | "Confere com medico/farmaceutico antes. Posso te explicar os ingredientes, mas nao vender como tratamento." | Safe pause |
| "Send link" | "I am hot" | Overexplain | "Te mando. Confere kit, garantia e dados de envio antes de finalizar." | Checkout |

### Close library

Use only one close at a time. Short messages convert better in chat.

Soft close:

```text
Quer que eu te mande o checkout certo para voce olhar com calma?
```

Logic close:

```text
Se o mecanismo fez sentido para voce, o teste de 90 dias e o proximo passo mais logico.
```

Caregiver close:

```text
Para pai/mae, eu olharia como um teste simples e seguro de rotina, sem prometer tratamento. Quer que eu te mande o link e um resumo para familia?
```

Anti-scam close:

```text
Eu nao compraria por causa de anuncio. Eu compraria se a oferta real tiver ingredientes claros, garantia e checkout transparente. Quer olhar essa parte?
```

Price close:

```text
Se o preco for o unico ponto, a garantia e justamente o que reduz o risco. Voce testa por 90 dias e decide com base na rotina, nao na promessa.
```

Final non-pushy close:

```text
Se nao for o momento, tudo bem. Mas se voce quer testar sem ficar mais semanas na duvida, eu te mando o checkout certo agora.
```

### Failure recovery

If the lead does not buy after checkout:

```text
Vi que talvez voce nao tenha finalizado. Foi preco, seguranca ou duvida se faz sentido para o seu caso?
```

If price:

```text
Entendo. Nesse caso eu olharia pelo periodo: o kit de 3 frascos faz mais sentido porque cobre o teste de 90 dias e fica dentro da garantia.
```

If safety:

```text
Seguranca vem primeiro. Se tem remedio ou diagnostico, confere com medico/farmaceutico. Se nao tem, olha a pagina com calma e verifica ingredientes + garantia.
```

If forgot/lost link:

```text
Sem problema. Quer que eu te mande de novo por aqui ou prefere receber o resumo por email para nao perder?
```

### Prompt contract for the AI

Every AI answer must follow this internal structure:

```text
ACKNOWLEDGE - respond to the exact user concern.
DIAGNOSE - update pain/angle/objection/temperature.
BRIDGE - connect back to the nearest script stage.
MOVE - ask one question, send proof, capture CRM, close, checkout, safe_pause, or followup.
```

Example:

```text
Entendo seu pe atras. Esse nicho tem muito anuncio ruim.

Eu separaria duas coisas: promessa exagerada e oferta real. A oferta real precisa ter ingredientes claros, garantia e checkout transparente.

No seu caso, a duvida maior e confiar na marca ou entender se o mecanismo faz sentido?
```

## Copy bank v1

Use these as message components. The AI can adapt wording, but it must preserve the strategic job of each message.

### Opening copy by angle

Lithium / research:

```text
Vi que voce veio pela parte do mineral ligado a memoria. Antes de eu te mandar qualquer link, quero entender uma coisa: voce esta olhando isso por curiosidade ou porque ja percebeu alguma mudanca na memoria?
```

```text
A parte do lithium chama atencao porque parece estranho no comeco. Mas a pergunta principal e: isso conectou com alguma coisa que voce esta vivendo hoje?
```

Ikaria / honey:

```text
Voce veio pela historia de Ikaria e do mel, certo? O que mais te chamou atencao: a parte da ilha, a memoria depois dos 60, ou a ideia de um ritual diario?
```

```text
Essa historia de Ikaria so importa se ela conecta com uma preocupacao real. No seu caso, e para voce ou para alguem da familia?
```

Anti-scam:

```text
Se voce veio desconfiado, eu entendo. Esse nicho tem anuncio demais prometendo coisa que nao deveria prometer.
Antes de falar de MemoFlow: sua maior duvida e se e real, se e seguro, ou se faz sentido para o seu caso?
```

Caregiver:

```text
Quando alguem olha isso para pai ou mae, normalmente nao e por curiosidade. E porque percebeu alguma mudanca e nao quer esperar piorar.
O que voce percebeu primeiro?
```

Unknown source:

```text
Antes de eu te mandar qualquer link, me fala uma coisa: o que fez voce parar aqui?
Esquecimento seu, preocupacao com alguem da familia, ou duvida se esse produto e real?
```

### Pain mirror copy

Names/words:

```text
Entendi. Esquecer uma palavra de vez em quando parece pequeno, mas incomoda porque da a sensacao de que voce perdeu controle de algo que antes era automatico.
```

```text
O ponto nao e a palavra em si. E aquele segundo de branco que faz voce pensar: "por que isso esta acontecendo comigo?"
```

Repeating:

```text
Repetir uma historia ou pergunta mexe com a pessoa porque normalmente alguem de fora percebe antes. E isso deixa a preocupacao mais real.
```

Misplacing:

```text
Perder chave, carteira ou oculos uma vez e normal. O que assusta e quando vira padrao e voce comeca a desconfiar da propria rotina.
```

Caregiver:

```text
Quando e pai ou mae, a dor e dupla: voce quer ajudar, mas tambem nao quer transformar uma preocupacao em susto ou briga.
```

Skeptic:

```text
Seu pe atras e saudavel. Eu tambem nao confiaria em anuncio que precisa de celebridade falsa ou promessa de cura para vender.
```

### Mechanism copy

Simple mechanism:

```text
O jeito simples de entender o MemoFlow e este: nao e uma capsula generica de memoria.
E um ritual sublingual de suporte de memoria, feito para combinar ingredientes claros com uma entrega mais direta pela boca.
```

Lithium mechanism:

```text
O lithium aqui nao deve ser entendido como remedio psiquiatrico. A conversa limpa e sobre dose traco de mineral dentro de uma formula de suporte, nao tratamento medico.
```

Ikaria mechanism:

```text
A parte de Ikaria funciona como uma pista de origem: uma historia de longevidade que virou ponte para uma formula de suporte cognitivo.
Nao e "mel cura memoria". E uma formula que usa esse angulo dentro de um ritual diario.
```

Sublingual mechanism:

```text
A diferenca da entrega sublingual e que a pessoa usa embaixo da lingua, como ritual. Isso torna a rotina simples e reduz aquela sensacao de "mais uma capsula no armario".
```

Anti-generic mechanism:

```text
Se fosse so "mais um suplemento para memoria", eu nem insistiria. O que torna a conversa diferente e o conjunto: mecanismo especifico, rotina sublingual, garantia e promessa limpa.
```

### Proof and trust copy

Proof filter:

```text
Eu julgaria por tres coisas: ingredientes claros, promessa limpa e garantia real.
Se um desses pontos falha, eu nao compraria.
```

No hype:

```text
Eu nao vou te vender isso como cura, tratamento ou reversao de nada. A conversa honesta e suporte de memoria e envelhecimento cognitivo saudavel.
```

Scam reframing:

```text
Tem muito anuncio ruim nesse mercado. Por isso eu separo anuncio de oferta.
Anuncio pode exagerar. A oferta real precisa mostrar ingredientes, garantia e checkout transparente.
```

Guarantee proof:

```text
A garantia importa porque tira a decisao do campo da promessa. Em vez de acreditar em frase bonita, voce testa a rotina por um periodo real.
```

### CRM capture copy

First name:

```text
Para eu nao te responder de forma generica: como posso te chamar?
```

Context save:

```text
Perfeito, {first_name}. Vou deixar anotado: e para {buyer_context}, a preocupacao principal e {pain_context}, e voce quer olhar isso sem cair em promessa exagerada.
```

Email after checkout interest:

```text
Se o checkout travar ou voce sair da pagina, quer que eu te mande o resumo e o link por email tambem?
```

Phone only with reason:

```text
Se for mais facil, posso te mandar o link por SMS/WhatsApp para voce nao perder. Qual numero devo usar?
```

Forwarding to family:

```text
Posso montar uma mensagem curta para voce encaminhar para sua familia sem parecer propaganda.
```

Family summary:

```text
Resumo para familia: estou olhando o MemoFlow como um teste de suporte de memoria, nao tratamento. A ideia e um ritual sublingual, ingredientes claros e garantia no checkout.
```

### Offer copy

Offer frame:

```text
Pelo que voce me contou, o caminho mais logico nao e comprar no impulso. E olhar como um teste de 90 dias.
```

3-bottle logic:

```text
O kit de 3 frascos faz mais sentido porque memoria e rotina nao se avaliam em uma semana. Ele cobre melhor o periodo de teste e fica alinhado com a garantia.
```

Low-pressure offer:

```text
Eu prefiro que voce olhe a pagina com calma do que comprar pressionado. Mas se a duvida e "qual e o proximo passo?", e ver o checkout certo.
```

Checkout send:

```text
Te mando o checkout certo agora. Quando abrir, confere tres coisas: kit selecionado, garantia e dados de envio.
```

### Close copy by temperature

Curious:

```text
Faz sentido eu te explicar o mecanismo em 30 segundos antes de mandar o link?
```

Warm:

```text
Pelo que voce falou, voce ja entendeu a logica. A duvida agora e mais seguranca, preco ou se serve para o seu caso?
```

Hot:

```text
Te mando. Olha o checkout e confere se aparece o kit com garantia. Se estiver tudo certo, esse e o caminho.
```

Almost lost:

```text
Se nao for o momento, tudo bem. Mas se voce quer parar de ficar voltando nessa duvida, eu te mando o link certo agora.
```

### Objection copy

Price:

```text
Entendo. Eu nao tentaria justificar so pelo preco.
A comparacao correta e: continuar observando sem fazer nada ou testar uma rotina por 90 dias com garantia.
```

Safety:

```text
Seguranca vem primeiro. Se existe remedio, diagnostico ou acompanhamento medico, confere com medico/farmaceutico antes.
Se nao existe isso, olha ingredientes e garantia com calma antes de decidir.
```

Proof:

```text
Justo pedir prova. Nesse nicho, eu nao confiaria em promessa solta. Eu olharia se o mecanismo e claro, se os ingredientes fazem sentido e se a garantia reduz seu risco.
```

Scam:

```text
Eu tambem desconfiaria. A maioria dos anuncios ruins tenta vender por choque.
Aqui a decisao tem que ser pela oferta real: ingredientes, rotina, garantia e checkout.
```

Family:

```text
Faz sentido falar com alguem. Quer que eu te mande um resumo curto para encaminhar?
```

Medication:

```text
Nesse caso eu pauso a venda. Se tem remedio ou diagnostico, o certo e conferir a lista de ingredientes com medico ou farmaceutico primeiro.
```

### Follow-up copy

15 minutes:

```text
Conseguiu abrir o checkout? Confere se apareceu o kit com garantia antes de finalizar.
```

4 hours:

```text
Sua duvida ficou mais em preco, seguranca ou se isso faz sentido para o seu caso?
```

24 hours:

```text
Ontem voce estava olhando isso por causa de {pain_context}. Quer que eu te mande o resumo simples do mecanismo antes de decidir?
```

72 hours:

```text
Se nao for o momento, tudo bem. Quer que eu encerre por aqui ou ainda quer guardar o link/resumo?
```

Lost checkout:

```text
Se voce perdeu a pagina, eu te mando de novo. Prefere por aqui ou por email para nao sumir?
```

### Safe pause copy

Diagnosis:

```text
Se ja existe diagnostico, eu nao vou tratar isso como venda. MemoFlow pode ser entendido como suporte, nao tratamento. Confere com medico/farmaceutico antes de qualquer decisao.
```

Medication:

```text
Como tem remedio envolvido, o passo certo e verificar a lista de ingredientes com um profissional. Depois disso, se fizer sentido, voce volta e olha o teste de 90 dias.
```

Angry/support:

```text
Se sua duvida e sobre pedido, cobranca ou reembolso, o caminho certo e suporte oficial do checkout. Por aqui eu consigo explicar produto e mecanismo, mas nao devo inventar status de pedido.
```

### AI selection rule

The AI should not paste long blocks. It should choose one message component, personalize it with the detected state, then ask one next-step question or send one action.

Bad:

```text
Long explanation + multiple questions + checkout link + CRM ask.
```

Good:

```text
Entendi. O ponto nao e a palavra esquecida; e a sensacao de que isso esta ficando mais frequente.
Isso e para voce ou para alguem da familia?
```

## Next script improvements

### 1. Entry-angle matching

The first message should change based on the ad/VSL angle:

```text
lithium - "Voce veio pela parte do mineral ligado a memoria?"
ikaria - "Voce veio pela historia da ilha grega/Ikaria?"
anti_scam - "Voce veio porque queria saber se isso e real?"
caregiver - "Voce esta vendo isso para voce ou para alguem da familia?"
```

This avoids a generic opening and increases message match.

### 2. Objection-first paths

Some leads will arrive already skeptical. If the first message contains "scam", "fake", "price", "Alzheimer", "doctor", or "does it work", the AI should not force the opening stage. It should answer that objection first and then return to the script.

### 3. Stronger pre-close

Before sending checkout, the AI should summarize the buying logic in one compact message:

```text
Pelo que voce me contou, faz sentido olhar como um teste de 90 dias: voce quer suporte de memoria, nao quer promessa milagrosa, e quer algo com ingredientes claros e garantia.
```

Then ask or send:

```text
Quer que eu te mande o checkout certo?
```

If the user already asked for the link, skip the question and send checkout.

### 4. Automated follow-up ladder

The system needs timed recovery after checkout:

```text
15 min - "Conseguiu abrir o checkout?"
4 h - "Sua duvida maior ficou em preco, seguranca ou se faz sentido para seu caso?"
24 h - "Quer que eu te mande o resumo simples do mecanismo antes de decidir?"
72 h - "Se nao for o momento, tudo bem. Quer que eu encerre por aqui?"
```

If email/phone was not captured before checkout, ask once after the first failed checkout attempt:

```text
Se voce quiser, eu posso te mandar o link e o resumo por email para nao perder. Qual email e melhor?
```

If the user ignores or refuses, continue only inside the original channel.

### 5. Lead scoring

Score should update invisibly:

```text
+2 identified personal/family pain
+2 asked for price/link
+1 asked mechanism/proof question
+1 gave first name
+2 gave email or phone with consent
-2 medical risk without professional check
-2 clear refusal
-3 angry/support/refund issue
```

Use score to decide `checkout`, `continue`, `safe_pause`, or `followup`.

### 6. Compliance-safe product identity

The AI should clearly separate clean MemoFlow from contaminated MemoPryl/NeuroCinn angles when the user asks:

```text
Aqui eu estou falando do fluxo limpo do MemoFlow: suporte de memoria, ritual sublingual, ingredientes claros e sem promessa de curar doenca.
```

### 7. Checkout page preparation

After sending the link, the AI should reduce checkout anxiety:

```text
Quando abrir, confere tres coisas: kit selecionado, garantia e endereco. Se aparecer qualquer coisa diferente disso, nao finaliza no impulso.
```
