// Vercel serverless function for Meta Conversions API (CAPI)
// POST /api/track-capi
// Body: { pixel_id, event_name, event_id, event_data, event_source_url, external_id, fbp, fbc, em (email hash), ph (phone hash) }
// Env: META_ACCESS_TOKEN (from Meta Events Manager > Generate Access Token)
//
// Sends events server-side so Meta sees them even if user has
// ad blockers or iOS 14+ restrictions. event_id deduplicates against
// the client-side fbq call (same UUID used on both).
//
// API version: v19.0 (matches /api/meta-campaigns.js)
//
// Diagnostic endpoints:
//   GET  /api/track-capi          -> health check + env status
//   GET  /api/track-capi?diag=1   -> last 20 events seen in this serverless instance
//   POST /api/track-capi?test=1   -> send a single test event to Meta with test_event_code from env

// In-memory ring buffer for diagnostics (last 20 events per serverless instance)
const RECENT_EVENTS = [];
const RECENT_MAX = 20;

function recordEvent(entry) {
  RECENT_EVENTS.unshift({
    ts: new Date().toISOString(),
    ...entry
  });
  if (RECENT_EVENTS.length > RECENT_MAX) RECENT_EVENTS.length = RECENT_MAX;
}

// SHA-256 hash helper (for emails/phones if provided)
async function sha256(input) {
  if (!input) return null;
  const encoder = new TextEncoder();
  const data = encoder.encode(String(input).trim().toLowerCase());
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  const accessToken = process.env.META_ACCESS_TOKEN;
  const pixelId = req.query.pixel_id || req.body?.pixel_id || process.env.META_PIXEL_ID || "2211508706308536";
  const apiVersion = "v19.0";

  // ---- HEALTH CHECK (GET) ----
  if (req.method === "GET") {
    // Diagnostic mode: return last events
    if (req.query.diag === "1" || req.query.diag === "true") {
      return res.status(200).json({
        ok: true,
        env_configured: !!accessToken,
        pixel_id: pixelId,
        api_version: apiVersion,
        recent_event_count: RECENT_EVENTS.length,
        recent_events: RECENT_EVENTS,
        note: "Last 20 events seen in this serverless instance. Events are per-instance memory and may be evicted on cold start."
      });
    }

    return res.status(200).json({
      ok: true,
      endpoint: "Meta Conversions API relay",
      env_configured: !!accessToken,
      pixel_id: pixelId,
      api_version: apiVersion,
      diagnostics: "Add ?diag=1 to inspect last 20 events in this instance",
      test_mode: "POST with { test: 1, event_name, event_id, event_data } and META_TEST_CODE env var to send a real test event to Meta"
    });
  }

  // ---- POST only ----
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  // ---- TEST MODE (POST ?test=1) ----
  if (req.query.test === "1" || req.body?.test === true) {
    const testCode = process.env.META_TEST_CODE;
    if (!testCode) {
      return res.status(400).json({
        ok: false,
        error: "META_TEST_CODE env var not set. Add it in Vercel project settings to use test mode."
      });
    }
    if (!accessToken) {
      return res.status(400).json({ ok: false, error: "META_ACCESS_TOKEN not set" });
    }

    const body = req.body || {};
    const testEid = body.event_id || `test-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const testName = body.event_name || "PageView";

    const testPayload = {
      data: [{
        event_name: testName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: testEid,
        event_source_url: body.event_source_url || "https://slim-soda01.vercel.app/",
        action_source: "website",
        user_data: {
          client_ip: (req.headers["x-forwarded-for"] || "").split(",")[0].trim(),
          client_user_agent: req.headers["user-agent"] || ""
        },
        custom_data: body.event_data || {}
      }],
      access_token: accessToken,
      test_event_code: testCode
    };

    try {
      const r = await fetch(`https://graph.facebook.com/${apiVersion}/${pixelId}/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testPayload)
      });
      const responseText = await r.text();
      let j = {};
      try { j = JSON.parse(responseText); } catch (e) { }

      recordEvent({
        kind: "test",
        event_name: testName,
        event_id: testEid,
        meta_status: r.status,
        events_received: j.events_received,
        fbtrace_id: j.fbtrace_id,
        messages: j.messages
      });

      return res.status(r.ok ? 200 : 502).json({
        ok: r.ok,
        meta_status: r.status,
        sent_event_id: testEid,
        sent_event_name: testName,
        events_received: j.events_received,
        fbtrace_id: j.fbtrace_id,
        messages: j.messages,
        note: "Check Meta Events Manager > Test Events to see this event land in real-time."
      });
    } catch (e) {
      return res.status(500).json({ ok: false, error: e.message });
    }
  }

  // ---- NORMAL MODE ----
  const {
    pixel_id,
    event_name,
    event_id,
    event_data,
    event_source_url,
    action_source,
    external_id,
    fbp,
    fbc,
    em,  // email (will be hashed)
    ph   // phone (will be hashed)
  } = req.body || {};

  // Strict validation: event_id is REQUIRED for dedup
  if (!pixel_id || !event_name) {
    return res.status(400).json({ ok: false, error: "Missing required fields (pixel_id, event_name)" });
  }
  if (!event_id) {
    recordEvent({ kind: "rejected", event_name, reason: "missing event_id (would cause Meta dedup warning)" });
    return res.status(400).json({
      ok: false,
      error: "Missing event_id. Every CAPI call MUST include event_id matching the client fbq eventID for proper dedup."
    });
  }

  if (!accessToken) {
    // Gracefully skip if not configured
    recordEvent({ kind: "skipped", event_name, event_id, reason: "no META_ACCESS_TOKEN env var" });
    return res.status(200).json({ ok: false, reason: "no_access_token" });
  }

  // Hash email/phone if provided (improves match quality)
  const emHash = em ? await sha256(em) : null;
  const phHash = ph ? await sha256(ph) : null;

  // Build Meta Conversions API payload (v19 spec)
  const payload = {
    data: [
      {
        event_name,
        event_time: Math.floor(Date.now() / 1000),
        event_id, // Primary dedup key (must match client-side fbq eventID)
        event_source_url: event_source_url || req.headers.referer || "https://slim-soda01.vercel.app",
        action_source: action_source || "website",
        user_data: {
          client_ip: (req.headers["x-forwarded-for"] || "").split(",")[0].trim(),
          client_user_agent: req.headers["user-agent"] || "",
          // fbp/fbc cookies (Meta sets these client-side; we should pass them through for matching)
          ...(fbp ? { fbp } : {}),
          ...(fbc ? { fbc } : {}),
          // external_id is a stable user identifier (visitor_id is great for this)
          ...(external_id ? { external_id: String(external_id) } : {}),
          // Hashed email/phone for advanced matching
          ...(emHash ? { em: [emHash] } : {}),
          ...(phHash ? { ph: [phHash] } : {})
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
    const r = await fetch(`https://graph.facebook.com/${apiVersion}/${pixel_id}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const responseText = await r.text();
    let j = {};
    try { j = JSON.parse(responseText); } catch (e) { }

    const entry = {
      kind: "sent",
      event_name,
      event_id,
      pixel_id,
      meta_status: r.status,
      events_received: j.events_received,
      fbtrace_id: j.fbtrace_id,
      messages: j.messages,
      has_external_id: !!external_id,
      has_fbp: !!fbp,
      has_email_hash: !!emHash
    };
    recordEvent(entry);

    if (!r.ok) {
      console.error("CAPI error", r.status, responseText);
      return res.status(200).json({ ok: false, reason: "meta_error", status: r.status, ...entry });
    }

    return res.status(200).json({
      ok: true,
      events_received: j.events_received,
      fbtrace_id: j.fbtrace_id,
      event_id,
      event_name
    });
  } catch (e) {
    recordEvent({ kind: "exception", event_name, event_id, error: e.message });
    console.error("CAPI function error", e);
    return res.status(200).json({ ok: false, reason: "exception", error: e.message });
  }
}
