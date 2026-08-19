// Vercel serverless function: intelligence layer for HUB v26
// GET /api/insights?days=7&product=slimsoda
// Returns auto-generated insights from Supabase data

const SB_URL = "https://tkbivipqiewkfnhktmqq.supabase.co";
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrYml2aXBxaWV3a2ZuaGt0bXFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg0NzY4NDgsImV4cCI6MjA1NDA1Mjg0OH0.2TnLj4lriG7eoPQWDo0mV8u8YHor6bd5ItZCHYhkym0";

async function sbGet(path) {
  const r = await fetch(SB_URL + "/rest/v1/" + path, {
    headers: {
      "apikey": SB_KEY,
      "Authorization": "Bearer " + SB_KEY
    }
  });
  if (!r.ok) return null;
  return await r.json();
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "public, max-age=60, s-maxage=60");
  if (req.method !== "GET") return res.status(405).json({ ok: false, error: "Method not allowed" });

  const days = parseInt(req.query.days || "7", 10);
  const product = (req.query.product || "all").toLowerCase();
  const sinceISO = new Date(Date.now() - days * 86400000).toISOString();

  try {
    // 1. Volume by event
    const events = await sbGet(`imphq_events?select=event_name,visitor_id&created_at=gte.${sinceISO}`);
    const byEvent = {};
    const uniqueByEvent = {};
    (events || []).forEach(e => {
      byEvent[e.event_name] = (byEvent[e.event_name] || 0) + 1;
    });
    // Get unique visitors per event
    const visitorsByEvent = {};
    (events || []).forEach(e => {
      if (!visitorsByEvent[e.event_name]) visitorsByEvent[e.event_name] = new Set();
      visitorsByEvent[e.event_name].add(e.visitor_id);
    });
    Object.keys(visitorsByEvent).forEach(k => {
      uniqueByEvent[k] = visitorsByEvent[k].size;
    });

    // 2. Funnel calculation
    const funnel = {
      pageview: uniqueByEvent.PageView || 0,
      add_to_cart: uniqueByEvent.AddToCart || 0,
      initiate_checkout: uniqueByEvent.InitiateCheckout || 0,
      lead: uniqueByEvent.Lead || 0
    };
    const cvr = (stage, prev) => prev > 0 ? Math.round((stage / prev) * 1000) / 10 : 0;
    const funnel_with_cvr = {
      pageview: { count: funnel.pageview },
      add_to_cart: { count: funnel.add_to_cart, cvr_from_prev: cvr(funnel.add_to_cart, funnel.pageview) + "%" },
      initiate_checkout: { count: funnel.initiate_checkout, cvr_from_prev: cvr(funnel.initiate_checkout, funnel.add_to_cart) + "%" },
      lead: { count: funnel.lead, cvr_from_prev: cvr(funnel.lead, funnel.initiate_checkout) + "%" }
    };

    // 3. Volume by UTM source
    const clicks = await sbGet(`imphq_clicks?select=utm_source,utm_campaign,coupon&created_at=gte.${sinceISO}&limit=2000`);
    const bySource = {};
    const byCampaign = {};
    const byCoupon = {};
    (clicks || []).forEach(c => {
      const s = c.utm_source || "direct";
      bySource[s] = (bySource[s] || 0) + 1;
      if (c.utm_campaign) byCampaign[c.utm_campaign] = (byCampaign[c.utm_campaign] || 0) + 1;
      if (c.coupon) byCoupon[c.coupon] = (byCoupon[c.coupon] || 0) + 1;
    });
    const topSources = Object.entries(bySource).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const topCampaigns = Object.entries(byCampaign).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const topCoupons = Object.entries(byCoupon).sort((a, b) => b[1] - a[1]).slice(0, 5);

    // 4. Leads + vendas
    const leads = await sbGet(`imphq_leads?select=id,plataforma,status&created_at=gte.${sinceISO}&limit=2000`);
    const vendas = await sbGet(`imphq_vendas?select=id,valor,plataforma&created_at=gte.${sinceISO}&limit=2000`);
    const totalLeadValue = (vendas || []).reduce((s, v) => s + (parseFloat(v.valor) || 0), 0);

    // 5. Auto-generated insights
    const insights = generateInsights(funnel, topSources, topCampaigns, topCoupons, leads, vendas);

    return res.status(200).json({
      ok: true,
      generated_at: new Date().toISOString(),
      window: { days, since: sinceISO },
      volume: {
        total_events: (events || []).length,
        by_event: byEvent,
        unique_by_event: uniqueByEvent
      },
      funnel: funnel_with_cvr,
      traffic: {
        top_sources: topSources.map(([k, v]) => ({ source: k, clicks: v })),
        top_campaigns: topCampaigns.map(([k, v]) => ({ campaign: k, clicks: v })),
        top_coupons: topCoupons.map(([k, v]) => ({ coupon: k, clicks: v }))
      },
      leads_vendas: {
        total_leads: (leads || []).length,
        total_vendas: (vendas || []).length,
        total_revenue_usd: Math.round(totalLeadValue * 100) / 100
      },
      insights: insights,
      note: !events ? "Supabase data not available (env or table not configured). Showing empty funnel." : null
    });
  } catch (e) {
    return res.status(200).json({ ok: false, error: e.message });
  }
}

function generateInsights(funnel, topSources, topCampaigns, topCoupons, leads, vendas) {
  const out = [];
  // Funnel analysis
  if (funnel.pageview > 100) {
    if (funnel.add_to_cart / funnel.pageview < 0.02) {
      out.push({
        level: "danger",
        title: "AddToCart conversion baixa",
        detail: "Só " + (funnel.add_to_cart / funnel.pageview * 100).toFixed(2) + "% dos visitors chegam a AddToCart. Meta DR típico: 1.5-3%. Otimizar LP/quiz ou copy."
      });
    } else if (funnel.add_to_cart / funnel.pageview > 0.04) {
      out.push({
        level: "success",
        title: "AddToCart acima do baseline",
        detail: (funnel.add_to_cart / funnel.pageview * 100).toFixed(2) + "% dos visitors viram AddToCart. Acima do 1.5-3% típico. Escalar budget."
      });
    }
    if (funnel.lead / funnel.initiate_checkout < 0.3) {
      out.push({
        level: "warn",
        title: "Drop entre checkout e lead",
        detail: "Só " + (funnel.lead / Math.max(funnel.initiate_checkout, 1) * 100).toFixed(1) + "% dos que iniciam checkout viram lead. Formulário pode estar pedindo demais ou fricção alta."
      });
    }
  } else {
    out.push({
      level: "info",
      title: "Volume baixo",
      detail: "Menos de 100 pageviews na janela. Coletar mais dados antes de otimizar."
    });
  }

  // Traffic source mix
  if (topSources.length > 0) {
    const total = topSources.reduce((s, [k, v]) => s + v, 0);
    const fbPct = (topSources.find(([k]) => k === "fb")?.[1] || 0) / total * 100;
    if (fbPct > 80) {
      out.push({
        level: "warn",
        title: "Concentração alta no Meta",
        detail: fbPct.toFixed(0) + "% do tráfego vem de Meta. Diversificar pra reduzir dependência (Google, native, email)."
      });
    }
  }

  // Coupon performance
  if (topCoupons.length > 0 && topCoupons[0][1] > 0) {
    out.push({
      level: "info",
      title: "Top coupon: " + topCoupons[0][0],
      detail: topCoupons[0][1] + " cliques com esse cupom. Se CVR for maior que sem cupom, escalar."
    });
  }

  // No leads
  if ((leads || []).length === 0 && (vendas || []).length === 0) {
    out.push({
      level: "info",
      title: "Sem leads/vendas na janela",
      detail: "Verificar se formulário está conectado e Meta CAPI está mandando event_id corretamente."
    });
  }

  return out;
}
