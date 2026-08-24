# MemoFlow X1 -> Imperio Integration

This is the implementation bridge between the DR repo and Imperio.

## Current layer

Created in this repo:

- `/chat-x1-memoflow/` - public X1 chat page prototype.
- `/api/chat-llm-memoflow` - optional OpenRouter intervention for free-text questions.
- `/docs/MEMOFLOW-X1-NATURAL-SCRIPT.md` - final natural X1 sales script.
- `/references_v5/by-product/memopryl/estrategia/playbook-x1/index.html` - visual flow for review.

Important: the current public chat page is a prototype. The final Imperio version should not depend on visible quick replies as the main UX. It should look like a natural Direct/Messenger conversation, while the AI follows the script invisibly.

The page already sends anonymous attribution events to the existing Supabase tables used by the DR stack:

- `imphq_clicks`
- `imphq_events`

It preserves:

- `visitor_id`
- `session_id`
- `utm_*`
- `fbclid`
- `gclid`
- `gbraid`
- `wbraid`
- `xcod`
- `creative_id`

## Imperio phase

Create a dedicated Imperio project/tag:

- `project`: `memoflow`
- `funnel`: `memoflow_x1`
- `tag`: `memoflow_x1`

Recommended lead data:

```json
{
  "product": "memoflow",
  "funnel": "memoflow_x1",
  "preferred_channel": "chat_x1|instagram|messenger",
  "entry_angle": "lithium|ikaria|anti_scam|caregiver|research",
  "creative_id": "...",
  "x1_stage": "opening|triage|mechanism|proof|temperature|objection|close|followup",
  "x1_score": 0,
  "memory_concern": "...",
  "buyer": "self|parent|spouse|research",
  "first_name": null,
  "email": null,
  "phone": null,
  "channel_id": "instagram_id|messenger_psid|site_session_id",
  "consent": "implicit_channel|explicit_email|explicit_sms|none",
  "medical_flag": "none|medication|diagnosis|unsure",
  "auto_resolution": "continue|safe_pause|checkout|followup",
  "checkout_sent_at": null,
  "last_objection": null
}
```

Recommended funnel events:

- `ChatView`
- `LeadIntentDetected`
- `BuyerIdentified`
- `PainIdentified`
- `CRMSoftIdentityCaptured`
- `CRMContactCaptured`
- `ConsentCaptured`
- `ChatFreeText`
- `MechanismDelivered`
- `ProofDelivered`
- `SafetyFlagged`
- `ObjectionDetected`
- `OfferReady`
- `OfferView`
- `CheckoutSent`
- `InitiateCheckout`
- `AutoResolutionTriggered`
- `FollowupScheduled`
- `OptOut`

## Natural X1 rule

The lead should type freely. Imperio can still show internal suggestions to the AI/operator:

- current stage;
- detected pain;
- detected objection;
- next scripted move;
- safe answer;
- checkout, safe pause, or follow-up recommendation.

The AI should answer the user's actual message first, then bridge back to the nearest script stage. This keeps the conversation real while preserving the sales path.

There is no human handoff in this version. Cases that would normally require a person should resolve through `safe_pause`, official support instructions, or automated follow-up.

## CRM capture rule

CRM collection must be progressive:

- platform channel ID first, captured invisibly when available;
- first name after the first meaningful pain/mirror moment;
- email only when useful for summary, checkout recovery, or follow-up;
- phone only when user asks for SMS/WhatsApp or explicitly accepts it;
- consent text and timestamp must be stored with the contact field.

Never block the script behind a form. The AI should phrase CRM capture as continuity:

```text
Para eu nao perder o contexto se voce voltar depois, como posso te chamar?
```

```text
Se o checkout travar, quer que eu te mande o link e o resumo por email tambem?
```

## Checkout rule

The current page uses a configurable checkout:

```text
/chat-x1-memoflow/?checkout_url=https%3A%2F%2F...
```

The default checkout currently follows the existing MemoPryl checkout used in this repo. Replace it with a clean MemoFlow checkout when the vendor/offer is confirmed.

## Compliance rule

The X1 must not use:

- celebrity names as endorsements;
- fake doctors;
- "reverse Alzheimer's";
- "cure dementia";
- "prevents memory loss";
- "clinically proven to improve memory";
- "FDA approved."

Use:

- "supports memory function";
- "may support healthy cognitive aging";
- "not a cure, not a treatment";
- "consult a doctor/pharmacist if medication or diagnosis is involved."
