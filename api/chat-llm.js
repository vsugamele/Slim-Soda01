// Vercel serverless function for SlimSoda chat-x1 LLM intervention
// POST /api/chat-llm
// Body: { state: {age, frustration, glp1, weight, step}, user_text: string }
// Response: { reply: string } | { reply: null }
//
// Env: OPENAI_API_KEY must be set in Vercel project settings
// Model: gpt-4o-mini (cheap, fast, ~$0.15/1M input tokens)

const SLIMSODA_FACTS = `
PRODUCT (SlimSoda, by Dana Whitfield):
- 3 ingredients: baking soda, ginger, berberine
- "Wake the cells. Protect the hormone. Flip the switch."
- Mechanism: an acidic gut makes hormone-producing cells go dormant; berberine flips the metabolic switch from STORE to BURN
- DIY fails because the ratio/dose/form matters
- Format: powder you mix with water once a day, empty stomach
- Tub lasts 30 days at 7x/week, ~42 days at 5x/week

OFFER (always the same):
- Buy 1 Tub, Get 1 Tub FREE
- $29.99 total (down from $119.98)
- 60-day empty-tub money-back guarantee
- Free shipping, ships in 24h
- Affiliate checkout: slimsodapowder.com

RULES:
- Stay in character as Dana: warm, sister-figure, late 50s, formulator
- 1-3 sentences MAX. Brief, conversational, not corporate.
- ALWAYS end with a "next step" suggestion: either "Show me the offer" or "Continue →"
- NEVER invent claims beyond the facts above. If unsure, say "I don't know — let me show you the offer."
- NEVER use medical/clinical language ("study", "research", "clinically proven", "FDA"). Use "showed", "found", "I tested", "I made".
- NEVER mention the brand name "SlimSoda" as if the user doesn't know it. You're the creator.
- AVOID: "cure", "guaranteed to work", "100% safe", "stop taking your medication"
- ALLOWED: "showed", "tested", "many women report", "I made this for women like you"
- If the user is hostile, dismissive, or asks something off-topic, gently redirect: "I hear you. Let me show you the offer — that's the part that matters most."
- Match the user's emotional register. If they sound scared, be warm. If skeptical, be matter-of-fact.
`;

const SYSTEM_PROMPT = (state) => `
${SLIMSODA_FACTS}

USER STATE (already collected):
- Age: ${state.age || "unknown"}
- Frustration: ${state.frustration || "unknown"}
- GLP-1 history: ${state.glp1 || "unknown"}
- Weight to lose: ${state.weight || "unknown"}
- Current step: ${state.step || "unknown"}

You are at the "ask anything" step. The user just typed a free-text question. Answer it briefly (1-3 sentences), referencing their specific state if relevant. Then end with a clear next-step prompt.

NEVER end your reply without a "next step" suggestion. If the user is ready to buy, just say "Here's the offer →" or similar.
`.trim();

export default async function handler(req, res) {
  // CORS for same-origin and known origins
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { state, user_text } = req.body || {};

  if (!user_text || typeof user_text !== "string") {
    return res.status(400).json({ reply: null, error: "Missing user_text" });
  }

  // Rate-limit by IP (simple in-memory, will reset on cold start)
  // For production, use Vercel KV or Upstash
  const ip = req.headers["x-forwarded-for"] || req.headers["x-real-ip"] || "unknown";
  if (!globalThis.__rateLimit) globalThis.__rateLimit = {};
  const now = Date.now();
  globalThis.__rateLimit[ip] = (globalThis.__rateLimit[ip] || []).filter(t => now - t < 60000);
  if (globalThis.__rateLimit[ip].length >= 5) {
    return res.status(429).json({ reply: null, error: "Rate limit exceeded" });
  }
  globalThis.__rateLimit[ip].push(now);

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.warn("OPENAI_API_KEY not set, falling back to null reply");
    return res.status(200).json({ reply: null });
  }

  try {
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT(state || {}) },
          { role: "user", content: user_text }
        ],
        max_tokens: 200,
        temperature: 0.7
      })
    });

    if (!r.ok) {
      console.error("OpenAI error", r.status, await r.text());
      return res.status(200).json({ reply: null });
    }

    const j = await r.json();
    const reply = j.choices?.[0]?.message?.content?.trim() || null;
    return res.status(200).json({ reply });
  } catch (e) {
    console.error("LLM function error", e);
    return res.status(200).json({ reply: null });
  }
}
