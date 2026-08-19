// Vercel cron: daily decision snapshot
// Schedule: every day 8am (UTC) — "0 8 * * *"
// Protected by CRON_SECRET env var
//
// What it does:
// 1. Calls the same logic as /api/decision
// 2. Saves the daily recommendation to Supabase (imphq_decision_history)
// 3. The One Page reads from this table to show "today's decision"
// 4. Optional: sends email via Resend if RESEND_API_KEY is set

const SB_URL = "https://tkbivipqiewkfnhktmqq.supabase.co";
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrYml2aXBxaWV3a2ZuaGt0bXFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg0NzY4NDgsImV4cCI6MjA1NDA1Mjg0OH0.2TnLj4lriG7eoPQWDo0mV8u8YHor6bd5ItZCHYhkym0";

async function sbPost(path, body) {
  const r = await fetch(SB_URL + "/rest/v1/" + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SB_KEY,
      "Authorization": "Bearer " + SB_KEY,
      "Prefer": "return=minimal"
    },
    body: JSON.stringify(body)
  });
  return r.ok;
}

async function sbGet(path) {
  const r = await fetch(SB_URL + "/rest/v1/" + path, {
    headers: { "apikey": SB_KEY, "Authorization": "Bearer " + SB_KEY }
  });
  if (!r.ok) return null;
  return await r.json();
}

async function getDecision() {
  // Reuse the same logic as /api/decision
  // (in production, would refactor to shared module)
  const since7d = new Date(Date.now() - 7 * 86400000).toISOString();
  const events = await sbGet(`imphq_events?select=event_name,visitor_id&created_at=gte.${since7d}&limit=5000`) || [];
  const products = ["slimsoda", "linfaflow", "linfozen"];
  const productStats = {};
  for (const p of products) {
    const pv = events.filter(e => e.event_name === "PageView").length;
    const atc = events.filter(e => e.event_name === "AddToCart").length;
    productStats[p] = { pageviews_7d: pv, add_to_cart_7d: atc, status: pv > 500 ? "active" : (pv > 50 ? "low_volume" : "stalled") };
  }

  const leads = await sbGet(`imphq_leads?select=id&created_at=gte.${since7d}&limit=2000`) || [];
  for (const p of products) {
    productStats[p].leads_7d = leads.length;
  }

  // Determine today's action
  const slimsoda = productStats.slimsoda;
  let todayAction;
  if (slimsoda.status === "stalled" || slimsoda.pageviews_7d < 50) {
    todayAction = { product: "slimsoda", angle: "B2H2: 'Invalidar Ozempic'", reason: "Volume baixo, testar angulo novo" };
  } else {
    todayAction = { product: "any", angle: "Escalar budget no que funciona", reason: "Pipeline estavel" };
  }

  return { products: productStats, today_action: todayAction, generated_at: new Date().toISOString() };
}

async function sendEmail(decision) {
  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.DECISION_EMAIL_TO;
  if (!resendKey || !toEmail) return { ok: false, reason: "RESEND_API_KEY or DECISION_EMAIL_TO not set" };

  const html = `
    <h2>🎯 The One Page · ${new Date().toLocaleDateString("pt-BR")}</h2>
    <h3>${decision.today_action.product.toUpperCase()} → ${decision.today_action.angle}</h3>
    <p>${decision.today_action.reason}</p>
    <hr>
    <h4>Status por produto (7d):</h4>
    <ul>
      ${Object.entries(decision.products).map(([k, v]) => `<li>${k}: ${v.pageviews_7d} PV · ${v.add_to_cart_7d} ATC · ${v.leads_7d} leads · <strong>${v.status}</strong></li>`).join("")}
    </ul>
    <p><a href="https://slim-soda01.vercel.app/references_v5/one.html">Ver The One Page →</a></p>
  `;

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + resendKey
      },
      body: JSON.stringify({
        from: "DR Hub <hub@slim-soda01.vercel.app>",
        to: toEmail,
        subject: "🎯 " + decision.today_action.product.toUpperCase() + " → " + decision.today_action.angle,
        html
      })
    });
    return { ok: r.ok, status: r.status };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

export default async function handler(req, res) {
  const expectedSecret = process.env.CRON_SECRET;
  const authHeader = req.headers.authorization || "";
  const providedSecret = authHeader.replace("Bearer ", "").trim();

  if (expectedSecret && providedSecret !== expectedSecret) {
    return res.status(401).json({ ok: false, error: "Invalid CRON_SECRET" });
  }

  const result = {
    ok: true,
    cron: "daily-decision",
    ran_at: new Date().toISOString(),
    actions: []
  };

  // 1. Generate decision
  let decision;
  try {
    decision = await getDecision();
    result.actions.push({ step: "generate_decision", ok: true, decision });
  } catch (e) {
    result.actions.push({ step: "generate_decision", ok: false, error: e.message });
    return res.status(500).json(result);
  }

  // 2. Save to Supabase (imphq_decision_history)
  try {
    const ok = await sbPost("imphq_decision_history", {
      id: "decision-" + Date.now(),
      decision_date: new Date().toISOString().split("T")[0],
      product: decision.today_action.product,
      angle: decision.today_action.angle,
      reason: decision.today_action.reason,
      product_stats: decision.products,
      full_decision: decision
    });
    result.actions.push({ step: "save_to_supabase", ok });
  } catch (e) {
    result.actions.push({ step: "save_to_supabase", ok: false, error: e.message });
  }

  // 3. Send email if configured
  try {
    const emailResult = await sendEmail(decision);
    result.actions.push({ step: "send_email", ...emailResult });
  } catch (e) {
    result.actions.push({ step: "send_email", ok: false, error: e.message });
  }

  return res.status(200).json(result);
}
