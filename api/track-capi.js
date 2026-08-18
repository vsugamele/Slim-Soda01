// Vercel serverless function for Meta Conversions API (CAPI)
// POST /api/track-capi
// Body: { pixel_id, event_name, event_id, event_data, event_source_url }
// Env: META_ACCESS_TOKEN (from Meta Events Manager > Generate Access Token)
//
// This sends events server-side so Meta sees them even if user has
// ad blockers or iOS 14+ restrictions. event_id deduplicates against
// the client-side fbq call (same UUID used on both).

export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });

  const { pixel_id, event_name, event_id, event_data, event_source_url, action_source } = req.body || {};

  if (!pixel_id || !event_name || !event_id) {
    return res.status(400).json({ ok: false, error: "Missing required fields (pixel_id, event_name, event_id)" });
  }

  const accessToken = process.env.META_ACCESS_TOKEN;
  if (!accessToken) {
    // Gracefully skip if not configured (no error to client)
    return res.status(200).json({ ok: false, reason: "no_access_token" });
  }

  // Build Meta Conversions API payload
  const payload = {
    data: [
      {
        event_name,
        event_time: Math.floor(Date.now() / 1000),
        event_id, // Same UUID as client fbq — Meta dedups
        event_source_url: event_source_url || req.headers.referer || "https://slim-soda01.vercel.app",
        action_source: action_source || "website",
        user_data: {
          client_ip: (req.headers["x-forwarded-for"] || "").split(",")[0].trim(),
          client_user_agent: req.headers["user-agent"] || "",
          // For better match quality, hash email/phone if available
          // fbp/fbc cookies would go here if we had them
        },
        custom_data: event_data || {}
      }
    ],
    // Optional: test_event_code for Meta Events Manager testing
    access_token: accessToken
  };

  // Allow test event code via env or query
  if (req.query.test_code || process.env.META_TEST_CODE) {
    payload.test_event_code = req.query.test_code || process.env.META_TEST_CODE;
  }

  try {
    const r = await fetch(`https://graph.facebook.com/v18.0/${pixel_id}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const responseText = await r.text();
    if (!r.ok) {
      console.error("CAPI error", r.status, responseText);
      return res.status(200).json({ ok: false, reason: "meta_error", status: r.status });
    }

    let j = {};
    try { j = JSON.parse(responseText); } catch(e){}
    return res.status(200).json({ ok: true, events_received: j.events_received, fbtrace_id: j.fbtrace_id });
  } catch (e) {
    console.error("CAPI function error", e);
    return res.status(200).json({ ok: false, reason: "exception" });
  }
}
