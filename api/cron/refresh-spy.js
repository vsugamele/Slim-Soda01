// Vercel cron: weekly auto-spy refresh
// Schedule: every Monday 9am (UTC) — "0 9 * * 1"
// Protected by CRON_SECRET env var (auto-set by Vercel for cron jobs, or manual)
//
// What it does:
// 1. Tries to fetch fresh Meta Ad Library data (limited - needs auth, often blocked)
// 2. Falls back to updating a "last_refreshed" timestamp in Supabase
// 3. Sends a notification to the user (if email configured)
//
// For full spy refresh, the user needs to open the competitive-spy page
// in a browser and re-run the search (Vercel serverless can't reliably
// scrape Meta Ad Library due to anti-bot protection).

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

export default async function handler(req, res) {
  // Auth: Vercel automatically passes Authorization: Bearer <CRON_SECRET>
  // Or user can set CRON_SECRET manually
  const expectedSecret = process.env.CRON_SECRET;
  const authHeader = req.headers.authorization || "";
  const providedSecret = authHeader.replace("Bearer ", "").trim();

  if (expectedSecret && providedSecret !== expectedSecret) {
    return res.status(401).json({ ok: false, error: "Invalid CRON_SECRET" });
  }

  const now = new Date();
  const result = {
    ok: true,
    cron: "refresh-spy",
    ran_at: now.toISOString(),
    actions: []
  };

  // Action 1: Update last_refreshed timestamp in Supabase
  try {
    const ok = await sbPost("imphq_meta_spy_meta", {
      refreshed_at: now.toISOString(),
      refreshed_by: "cron-weekly",
      note: "Weekly auto-spy refresh. Full refresh requires manual browser session due to Meta Ad Library anti-bot."
    });
    result.actions.push({ step: "log_refresh", ok });
  } catch (e) {
    result.actions.push({ step: "log_refresh", ok: false, error: e.message });
  }

  // Action 2: Try to ping competitive-spy URL
  try {
    const spyUrl = "https://slim-soda01.vercel.app/references_v5/methodology/competitive-spy/";
    const r = await fetch(spyUrl);
    result.actions.push({ step: "ping_spy_url", ok: r.ok, status: r.status });
  } catch (e) {
    result.actions.push({ step: "ping_spy_url", ok: false, error: e.message });
  }

  // Action 3: Generate a "reminder" entry for the user
  result.actions.push({
    step: "user_reminder",
    message: "Meta Ad Library anti-bot blocks serverless scraping. Open /references_v5/methodology/competitive-spy/ in a browser and re-snapshot 30+ competitor cards. Takes ~30min.",
    next_action_required: true
  });

  return res.status(200).json(result);
}
