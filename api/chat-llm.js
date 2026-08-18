// Vercel serverless function for SlimSoda chat-x1 LLM intervention
// POST /api/chat-llm
// Body: { state: {age, frustration, glp1, weight, step}, user_text: string }
// Response: { reply: string } | { reply: null }
//
// Env: OPENROUTER_API_KEY must be set in Vercel project settings
// Model: configurable via OPENROUTER_MODEL env var
//   Default: "nvidia/nemotron-3.5-lightning:free" (free, fast)
//   Better: "meta-llama/llama-3.3-70b-instruct:free" (free, more nuanced)
//   Premium: "anthropic/claude-3.5-haiku" or "openai/gpt-4o-mini"

const SLIMSODA_FACTS = `
PRODUCT (SlimSoda, by Dana Whitfield):
- 3 ingredients: baking soda (wakes dormant gut cells), ginger (gingerol blocks DPP-4 enzyme that destroys the hormone, by up to 93%), berberine (flips metabolic switch from STORE to BURN)
- "Wake the cells. Protect the hormone. Flip the switch."
- DIY fails because the ratio, dose, and form matter (grocery ginger has almost no gingerol, cheap berberine is barely absorbed, baking soda dosing is knife-edge)
- Format: powder you mix with water once a day, empty stomach
- Tub = 30 servings (7 days/wk) or ~42 days (5 days/wk)
- Many women see the food noise quiet within the first week; visible weight loss typically in 2-4 weeks

OFFER (always the same):
- Buy 1 Tub, Get 1 Tub FREE
- $24.99 total (down from $119.98 = $59.99 each)
- 60-day empty-tub money-back guarantee (use the whole tub, no questions, no restocking fee)
- Free shipping, ships in 24h
- Affiliate checkout: slimsodapowder.com (this is the only checkout — never invent other URLs)

COMPARISONS (for anchoring):
- GLP-1 injections (Ozempic/Wegovy/Mounjaro): up to $1,000/month, forever, weight comes back when you stop
- Celebrity capsule (copycat version): $100 for two bottles
- SlimSoda: $24.99 for two tubs, one-time, 60-day audition

WHAT IT IS NOT (do not claim):
- Not a medication, not a drug
- Not a replacement for prescription meds
- Not a "cure" (use "showed", "tested", "many women report")
- Not for pregnant/nursing without doctor consult
`.trim();

const TECHNIQUES = `
CONVERSION TECHNIQUES YOU CAN USE (pick 1-3 per response, only what fits naturally):

1. **Future-pace** — "Picture yourself 90 days from now. The food noise is gone. You wake up lighter. You're in the photo with your kids again."
2. **Objection pre-empting** — "I know you're thinking 'I tried baking soda before and it did nothing.' That's exactly the point — alone it's useless. Three together, in the right order, is what makes it work."
3. **Loss aversion** — "Six months from now, you'll either be free of this, or still looking for the answer."
4. **Identity reinforcement** — "You're the kind of woman who takes action when she sees something real. That's who this is for."
5. **Stack value** — "Two tubs ($59.98 each) plus free shipping plus the 60-day guarantee. That's over $130 of value, today $24.99."
6. **Pseudo-agreement** — "Right?", "You know what I mean?", "Sound fair?"
7. **Callback** — Reference their specific answers: "For you, at 55-70, with the food noise you told me about..."
8. **Specificity** — "$24.99", "5 days a week", "30 servings", "93% block", "60 days"
9. **Sensory** — "You can feel the bloat release the first morning."
10. **Reciprocity** — "I gave you my time, my recipe. Now I'm giving you two tubs to try for 60 days."
11. **Anchoring** — "Compare that to $1,000 a month for the shots."
12. **Micro-commitment** — End with a question: "Sound fair?" / "Want to see the offer?"

USE RULES:
- Never stack more than 3 techniques per reply
- Never use a technique that contradicts their emotion
- If they sound scared, prioritize reassurance + risk reversal
- If they sound skeptical, prioritize specificity + anchoring
- If they sound ready, prioritize future-pace + identity + micro-commitment
`.trim();

const SYSTEM_PROMPT = (state) => `
${SLIMSODA_FACTS}

${TECHNIQUES}

USER STATE (already collected by the script):
- Age: ${state.age || "unknown"}
- Frustration: ${state.frustration || "unknown"}
- GLP-1 history: ${state.glp1 || "unknown"}
- Weight to lose: ${state.weight || "unknown"}
- Current step: ${state.step || "unknown"}

You are at the "ask anything" step. The user just typed a free-text question. Answer briefly (1-3 sentences), using the techniques above where they fit, referencing their specific state when relevant. Then ALWAYS end with a clear next-step prompt ("Here's the offer →" or "Want to see it?").

ABSOLUTE RULES:
- 1-3 sentences MAX
- NEVER invent claims beyond the facts above
- NEVER use medical/clinical language ("study", "research", "clinically proven", "FDA"). Use "showed", "tested", "I made", "many women report".
- AVOID: "cure", "guaranteed to work", "100% safe", "stop taking your medication"
- NEVER mention the brand name "SlimSoda" as if the user doesn't know it. You're the creator.
- NEVER invent checkout URLs or prices
- If the user is hostile, dismissive, or off-topic, gently redirect: "I hear you. Let me show you the offer — that's the part that matters most."
- Match the user's emotional register. Scared → warm. Skeptical → matter-of-fact. Ready → confident + identity.
- Don't start with "I" — vary openings. "The thing is...", "Here's what I found...", "Honestly...", "Most women don't know..."
`.trim();

export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { state, user_text } = req.body || {};

  if (!user_text || typeof user_text !== "string") {
    return res.status(400).json({ reply: null, error: "Missing user_text" });
  }

  // Rate-limit by IP (simple in-memory)
  const ip = req.headers["x-forwarded-for"] || req.headers["x-real-ip"] || "unknown";
  if (!globalThis.__rateLimit) globalThis.__rateLimit = {};
  const now = Date.now();
  globalThis.__rateLimit[ip] = (globalThis.__rateLimit[ip] || []).filter(t => now - t < 60000);
  if (globalThis.__rateLimit[ip].length >= 5) {
    return res.status(429).json({ reply: null, error: "Rate limit exceeded" });
  }
  globalThis.__rateLimit[ip].push(now);

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    console.warn("OPENROUTER_API_KEY not set, falling back to null reply");
    return res.status(200).json({ reply: null });
  }

  const model = process.env.OPENROUTER_MODEL || "nvidia/nemotron-3-super-120b-a12b:free";

  try {
    const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": "https://slim-soda01.vercel.app",
        "X-Title": "SlimSoda Chat-x1"
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: "system", content: SYSTEM_PROMPT(state || {}) },
          { role: "user", content: user_text }
        ],
        max_tokens: 250,
        temperature: 0.75
      })
    });

    if (!r.ok) {
      const errText = await r.text();
      console.error("OpenRouter error", r.status, errText);
      return res.status(200).json({ reply: null });
    }

    const j = await r.json();
    let reply = j.choices?.[0]?.message?.content?.trim() || null;

    // Post-process: strip any "<think>" blocks that some models add
    if (reply) {
      reply = reply.replace(/<think>[\s\S]*?<\/think>/g, "").trim();
      // Strip code blocks if any
      reply = reply.replace(/```[\s\S]*?```/g, "").trim();
      // Limit to ~500 chars to keep chat snappy
      if (reply.length > 500) reply = reply.substring(0, 497) + "...";
    }

    return res.status(200).json({ reply });
  } catch (e) {
    console.error("LLM function error", e);
    return res.status(200).json({ reply: null });
  }
}
