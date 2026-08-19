// /api/meta-campaigns.js
// Vercel serverless function — fetches real Meta Marketing API data
// Reads META_ACCESS_TOKEN + META_AD_ACCOUNT_ID from env
// Returns campaigns with insights (spend, impressions, CTR, ROAS, hook_rate)

const META_API_VERSION = 'v19.0';
const META_API_BASE = `https://graph.facebook.com/${META_API_VERSION}`;

// Demo data fallback when env vars missing
const DEMO_CAMPAIGNS = [
  {
    id: 'demo-1',
    name: 'P1 · SlimSoda · 40-65 women · AB-Test',
    status: 'ACTIVE',
    objective: 'OUTCOME_SALES',
    daily_budget: 4000,
    lifetime_budget: 0,
    spend_7d: 287.45,
    spend_today: 41.20,
    impressions_7d: 142000,
    clicks_7d: 1245,
    ctr_7d: 0.876,
    cpc_7d: 0.231,
    cpm_7d: 2.02,
    reach_7d: 89000,
    frequency_7d: 1.59,
    purchases_7d: 8,
    revenue_7d: 239.92,
    roas_7d: 0.83,
    hook_rate_7d: 47.2,
    hold_rate_7d: 38.4,
    ic_7d: 18,
    cost_per_ic: 15.97,
    start_date: '2026-08-12'
  },
  {
    id: 'demo-2',
    name: 'P2 · SlimSoda · Margaret story · 5 hooks',
    status: 'PAUSED',
    objective: 'OUTCOME_SALES',
    daily_budget: 5000,
    lifetime_budget: 0,
    spend_7d: 156.30,
    spend_today: 0,
    impressions_7d: 78000,
    clicks_7d: 645,
    ctr_7d: 0.827,
    cpc_7d: 0.242,
    cpm_7d: 2.00,
    reach_7d: 51000,
    frequency_7d: 1.53,
    purchases_7d: 4,
    revenue_7d: 119.96,
    roas_7d: 0.77,
    hook_rate_7d: 38.7,
    hold_rate_7d: 31.2,
    ic_7d: 7,
    cost_per_ic: 22.33,
    start_date: '2026-08-10'
  },
  {
    id: 'demo-3',
    name: 'P3 · Linfaflow · Margaret ritual · ESCALA',
    status: 'ACTIVE',
    objective: 'OUTCOME_SALES',
    daily_budget: 12000,
    lifetime_budget: 0,
    spend_7d: 1843.20,
    spend_today: 263.45,
    impressions_7d: 487000,
    clicks_7d: 3120,
    ctr_7d: 0.640,
    cpc_7d: 0.591,
    cpm_7d: 3.79,
    reach_7d: 198000,
    frequency_7d: 2.46,
    purchases_7d: 47,
    revenue_7d: 1640.45,
    roas_7d: 0.89,
    hook_rate_7d: 52.1,
    hold_rate_7d: 41.8,
    ic_7d: 96,
    cost_per_ic: 19.20,
    start_date: '2026-07-28'
  },
  {
    id: 'demo-4',
    name: 'P3 · Cardio Clear · Mr. Roberts 6-bot',
    status: 'ACTIVE',
    objective: 'OUTCOME_SALES',
    daily_budget: 18000,
    lifetime_budget: 0,
    spend_7d: 2407.65,
    spend_today: 348.10,
    impressions_7d: 612000,
    clicks_7d: 3890,
    ctr_7d: 0.636,
    cpc_7d: 0.619,
    cpm_7d: 3.94,
    reach_7d: 234000,
    frequency_7d: 2.62,
    purchases_7d: 38,
    revenue_7d: 2280.00,
    roas_7d: 0.95,
    hook_rate_7d: 49.3,
    hold_rate_7d: 36.7,
    ic_7d: 78,
    cost_per_ic: 30.87,
    start_date: '2026-07-15'
  },
  {
    id: 'demo-5',
    name: 'P1 · Linfozen · 17s lipedema · AB-Test',
    status: 'ACTIVE',
    objective: 'OUTCOME_SALES',
    daily_budget: 3000,
    lifetime_budget: 0,
    spend_7d: 98.40,
    spend_today: 14.20,
    impressions_7d: 41000,
    clicks_7d: 312,
    ctr_7d: 0.760,
    cpc_7d: 0.315,
    cpm_7d: 2.40,
    reach_7d: 28000,
    frequency_7d: 1.46,
    purchases_7d: 1,
    revenue_7d: 27.49,
    roas_7d: 0.28,
    hook_rate_7d: 44.1,
    hold_rate_7d: 33.5,
    ic_7d: 5,
    cost_per_ic: 19.68,
    start_date: '2026-08-15'
  }
];

// Date range helpers
function getDateRange(range) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let start;
  switch (range) {
    case 'today':
      start = today;
      break;
    case '1d':
      start = new Date(today.getTime() - 86400000);
      break;
    case '7d':
      start = new Date(today.getTime() - 7 * 86400000);
      break;
    case '30d':
      start = new Date(today.getTime() - 30 * 86400000);
      break;
    case '14d':
      start = new Date(today.getTime() - 14 * 86400000);
      break;
    default:
      start = new Date(today.getTime() - 7 * 86400000);
  }
  return {
    since: start.toISOString().split('T')[0],
    until: today.toISOString().split('T')[0]
  };
}

// Fetch from real Meta API
async function fetchMetaCampaigns(accessToken, adAccountId, dateRange) {
  const { since, until } = getDateRange(dateRange);
  const fields = [
    'id', 'name', 'status', 'objective', 'daily_budget', 'lifetime_budget',
    'spend', 'impressions', 'clicks', 'ctr', 'cpc', 'cpm',
    'reach', 'frequency', 'actions', 'cost_per_action_type',
    'video_p25_watched_actions', 'video_p50_watched_actions',
    'video_p75_watched_actions', 'video_p100_watched_actions',
    'video_thruplay_watched_actions', 'start_time', 'stop_time'
  ].join(',');

  const url = `${META_API_BASE}/act_${adAccountId}/insights?fields=${fields}&time_increment=1&time_range={"since":"${since}","until":"${until}"}&level=campaign&limit=50&access_token=${accessToken}`;

  const res = await fetch(url);
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Meta API ${res.status}: ${txt.slice(0, 200)}`);
  }
  return res.json();
}

// Normalize Meta API response
function normalizeCampaign(c) {
  const actions = c.actions || [];
  const purchases = actions.find(a => a.action_type === 'purchase' || a.action_type === 'offsite_conversion.fb_pixel_purchase')?.value || 0;
  const initiateCheckout = actions.find(a => a.action_type === 'initiate_checkout' || a.action_type === 'offsite_conversion.fb_pixel_initiate_checkout')?.value || 0;
  const video25 = c.video_p25_watched_actions?.[0]?.value || 0;
  const video50 = c.video_p50_watched_actions?.[0]?.value || 0;
  const video100 = c.video_p100_watched_actions?.[0]?.value || 0;
  const thruplay = c.video_thruplay_watched_actions?.[0]?.value || 0;
  const hookRate = c.impressions > 0 ? (video25 / c.impressions * 100) : 0;
  const holdRate = thruplay > 0 ? (thruplay / video25 * 100) : 0;
  return {
    id: c.id,
    name: c.name,
    status: c.status,
    objective: c.objective,
    daily_budget: parseFloat(c.daily_budget || 0) / 100,
    lifetime_budget: parseFloat(c.lifetime_budget || 0) / 100,
    spend_7d: parseFloat(c.spend || 0),
    spend_today: 0, // would need separate query
    impressions_7d: parseInt(c.impressions || 0),
    clicks_7d: parseInt(c.clicks || 0),
    ctr_7d: parseFloat(c.ctr || 0),
    cpc_7d: parseFloat(c.cpc || 0),
    cpm_7d: parseFloat(c.cpm || 0),
    reach_7d: parseInt(c.reach || 0),
    frequency_7d: parseFloat(c.frequency || 0),
    purchases_7d: parseInt(purchases),
    revenue_7d: parseInt(purchases) * 35, // estimate, will be from purchase action value
    roas_7d: c.spend > 0 ? (parseInt(purchases) * 35 / c.spend) : 0,
    hook_rate_7d: parseFloat(hookRate.toFixed(1)),
    hold_rate_7d: parseFloat(holdRate.toFixed(1)),
    ic_7d: parseInt(initiateCheckout),
    cost_per_ic: initiateCheckout > 0 ? c.spend / initiateCheckout : 0,
    start_date: c.start_time ? c.start_time.split('T')[0] : null
  };
}

// Aggregate summary
function aggregateSummary(campaigns) {
  return campaigns.reduce((acc, c) => {
    acc.spend += c.spend_7d;
    acc.impressions += c.impressions_7d;
    acc.clicks += c.clicks_7d;
    acc.purchases += c.purchases_7d;
    acc.revenue += c.revenue_7d;
    acc.ic += c.ic_7d;
    return acc;
  }, { spend: 0, impressions: 0, clicks: 0, purchases: 0, revenue: 0, ic: 0 });
}

// Main handler
export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const range = req.query.range || '7d';
  const status = req.query.status || null; // ACTIVE, PAUSED, etc
  const search = (req.query.q || '').toLowerCase();

  let campaigns;
  let source = 'live';

  const accessToken = process.env.META_ACCESS_TOKEN;
  const adAccountId = process.env.META_AD_ACCOUNT_ID;

  if (accessToken && adAccountId) {
    try {
      const data = await fetchMetaCampaigns(accessToken, adAccountId, range);
      campaigns = (data.data || []).map(normalizeCampaign);
    } catch (err) {
      console.error('Meta API error:', err.message);
      return res.status(502).json({
        error: 'meta_api_failed',
        message: err.message,
        hint: 'Verifique META_ACCESS_TOKEN e META_AD_ACCOUNT_ID nas env vars do Vercel'
      });
    }
  } else {
    // Fallback: demo data
    source = 'demo';
    campaigns = DEMO_CAMPAIGNS;
  }

  // Filters
  if (status) {
    campaigns = campaigns.filter(c => c.status === status);
  }
  if (search) {
    campaigns = campaigns.filter(c => c.name.toLowerCase().includes(search));
  }

  // Sort by spend desc
  campaigns.sort((a, b) => b.spend_7d - a.spend_7d);

  const summary = aggregateSummary(campaigns);

  return res.status(200).json({
    source,
    range,
    count: campaigns.length,
    summary: {
      ...summary,
      avg_cpa: summary.purchases > 0 ? summary.spend / summary.purchases : 0,
      avg_cpm: summary.impressions > 0 ? summary.spend / summary.impressions * 1000 : 0,
      avg_ctr: summary.impressions > 0 ? summary.clicks / summary.impressions * 100 : 0,
      avg_roas: summary.spend > 0 ? summary.revenue / summary.spend : 0,
      avg_cost_per_ic: summary.ic > 0 ? summary.spend / summary.ic : 0
    },
    campaigns,
    meta: {
      fetched_at: new Date().toISOString(),
      range_label: range,
      demo: source === 'demo'
    }
  });
}
