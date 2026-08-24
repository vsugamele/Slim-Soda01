// Vercel serverless function for MemoFlow chat-x1 LLM intervention.
// POST /api/chat-llm-memoflow

const MEMOFLOW_FACTS = `
PRODUCT:
- MemoFlow is a memory-support supplement positioned as a daily sublingual ritual.
- Clean offer framing: 3-bottle bundle, $59, 90-day money-back guarantee according to checkout terms.
- Core mechanism angles available in this repo: Ikarian honey extract, lithium orotate, Neural MicroLock sublingual delivery.
- Use "supports memory function" and "may support healthy cognitive aging."
- If medication, diagnosis, pregnancy, nursing, or a medical condition is mentioned, tell the user to check the ingredient list with a doctor or pharmacist before starting.

POSITIONING:
- This is the clean MemoFlow lane, not the risky MemoPryl/NeuroCinn/deepfake lane.
- No Bill Gates, Dr. Oz, celebrity, fake doctor, fake endorsement, or Alzheimer's reversal framing.
- Be transparent: "not a cure, not a treatment, not medical advice."

ABSOLUTE RED LINES:
- Never say cure, treat, reverse, prevent, heal, stop Alzheimer's, reverse dementia, clinically proven to improve memory, guaranteed memory improvement, FDA approved, doctor recommended unless explicitly provided by verified source.
- Never invent studies, doctors, testimonials, checkout URLs, discounts, ingredients, or guarantees.
- Never tell a user to stop medication or avoid medical care.
`.trim();

const RESPONSE_STYLE = `
You are Mira, a calm X1 guide for MemoFlow.
Reply in 1-3 short sentences.
Reference the user's specific concern when useful.
End with one small next step: ask a clarifying question, suggest reading the ingredient list, or ask if they want the offer.
Use direct-response clarity, but keep health compliance conservative.
If the user asks for diagnosis, safety with medication, Alzheimer's, dementia, or urgent symptoms, keep it educational and recommend professional guidance.
`.trim();

function systemPrompt(state = {}) {
  return `
${MEMOFLOW_FACTS}

${RESPONSE_STYLE}

CURRENT LEAD STATE:
- Buyer: ${state.buyer || "unknown"}
- Concern: ${state.concern || "unknown"}
- Timeline: ${state.timeline || "unknown"}
- Medical flag: ${state.medical || "unknown"}
- Temperature: ${state.temperature || "unknown"}
- Objection: ${state.objection || "unknown"}
- Current node: ${state.node || "unknown"}
- Step: ${state.step || "unknown"}
`.trim();
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { state, user_text } = req.body || {};
  if (!user_text || typeof user_text !== "string") {
    return res.status(400).json({ reply: null, error: "Missing user_text" });
  }

  const ip = req.headers["x-forwarded-for"] || req.headers["x-real-ip"] || "unknown";
  if (!globalThis.__memoflowRateLimit) globalThis.__memoflowRateLimit = {};
  const now = Date.now();
  globalThis.__memoflowRateLimit[ip] = (globalThis.__memoflowRateLimit[ip] || []).filter((t) => now - t < 60000);
  if (globalThis.__memoflowRateLimit[ip].length >= 6) {
    return res.status(429).json({ reply: null, error: "Rate limit exceeded" });
  }
  globalThis.__memoflowRateLimit[ip].push(now);

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    console.warn("OPENROUTER_API_KEY not set, falling back to null reply");
    return res.status(200).json({ reply: null });
  }

  const model = process.env.OPENROUTER_MODEL_MEMOFLOW || process.env.OPENROUTER_MODEL || "nvidia/nemotron-3-super-120b-a12b:free";

  try {
    const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": "https://slim-soda01.vercel.app",
        "X-Title": "MemoFlow Chat-x1"
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemPrompt(state || {}) },
          { role: "user", content: user_text }
        ],
        max_tokens: 220,
        temperature: 0.55
      })
    });

    if (!r.ok) {
      const errText = await r.text();
      console.error("OpenRouter error", r.status, errText);
      return res.status(200).json({ reply: null });
    }

    const j = await r.json();
    let reply = j.choices?.[0]?.message?.content?.trim() || null;
    if (reply) {
      reply = reply.replace(/<think>[\s\S]*?<\/think>/g, "").trim();
      reply = reply.replace(/```[\s\S]*?```/g, "").trim();
      if (reply.length > 460) reply = reply.substring(0, 457) + "...";
    }

    return res.status(200).json({ reply });
  } catch (e) {
    console.error("MemoFlow LLM function error", e);
    return res.status(200).json({ reply: null });
  }
}
