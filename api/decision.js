// Vercel serverless function: Decision Engine
// GET /api/decision — returns "what to test next" recommendations
// Based on: Supabase data + competitive spy intel + playbook methodology

const SB_URL = "https://tkbivipqiewkfnhktmqq.supabase.co";
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrYml2aXBxaWV3a2ZuaGt0bXFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg0NzY4NDgsImV4cCI6MjA1NDA1Mjg0OH0.2TnLj4lriG7eoPQWDo0mV8u8YHor6bd5ItZCHYhkym0";

async function sbGet(path) {
  const r = await fetch(SB_URL + "/rest/v1/" + path, {
    headers: { "apikey": SB_KEY, "Authorization": "Bearer " + SB_KEY }
  });
  if (!r.ok) return null;
  return await r.json();
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "public, max-age=300, s-maxage=300");
  if (req.method !== "GET") return res.status(405).json({ ok: false });

  try {
    // 1. Pega status de cada produto
    const products = ["slimsoda", "linfaflow", "linfozen"];
    const decision = {
      generated_at: new Date().toISOString(),
      products: {},
      today_action: null,
      quick_wins: [],
      trending_angles: [],
      alerts: []
    };

    // 2. Para cada produto, checa volume + última atividade
    for (const p of products) {
      const since7d = new Date(Date.now() - 7 * 86400000).toISOString();
      const events = await sbGet(`imphq_events?select=event_name,visitor_id&created_at=gte.${since7d}&limit=5000`);
      const eventsByProduct = (events || []).filter(e => (e.event_data?.product || e.event_data?.src || "").includes(p) || true);
      const pv = (events || []).filter(e => e.event_name === "PageView").length;
      const atc = (events || []).filter(e => e.event_name === "AddToCart").length;
      const leads = await sbGet(`imphq_leads?select=id&created_at=gte.${since7d}&limit=2000`);
      decision.products[p] = {
        pageviews_7d: pv,
        add_to_cart_7d: atc,
        leads_7d: (leads || []).length,
        status: pv > 500 ? "active" : (pv > 50 ? "low_volume" : "stalled")
      };
    }

    // 3. Recomenda "today_action" baseado no estado
    const slimsoda = decision.products.slimsoda;
    const linfaflow = decision.products.linfaflow;
    const lipozen = decision.products.linfozen;

    if (slimsoda.status === "stalled" || slimsoda.pageviews_7d < 50) {
      decision.today_action = {
        product: "slimsoda",
        angle: "B2H2: 'Invalidar Ozempic' (do brief Linfozen, B2H2)",
        reason: "Volume baixo. Ângulo novo, não está sendo testado por 3 afiliados dominantes (Joe/Rafael/Mike).",
        source: "briefing-linfozen",
        estimated_effort: "2-3h pra LP, 1h pra 3 criativos"
      };
    } else if (slimsoda.add_to_cart_7d / Math.max(slimsoda.pageviews_7d, 1) < 0.015) {
      decision.today_action = {
        product: "slimsoda",
        angle: "Otimizar copy do step 3 do quiz (high drop esperado)",
        reason: "CVR AddToCart < 1.5%. Copy está usando 'skinny sister' saturado. Testar ângulo B2H3 do brief Linfozen.",
        source: "briefing-linfozen"
      };
    } else if (lipozen.status === "active" && lipozen.leads_7d < 10) {
      decision.today_action = {
        product: "linfozen",
        angle: "Cross-sell test: ofertar SlimSoda como bônus na LP do Linfozen",
        reason: "Linfozen tem tráfego mas conversão baixa. Brand oficial já cross-sell CardioClear. Testar adicionar SlimSoda como second offer."
      };
    } else {
      decision.today_action = {
        product: "any",
        angle: "Escalar budget no que está funcionando",
        reason: "Pipeline estável. Aumentar budget 20-30% na campanha com melhor ROAS dos últimos 7 dias."
      };
    }

    // 4. Quick wins (top 3)
    decision.quick_wins = [
      {
        title: "Adicionar external_id (visitor_id) em todos os eventos CAPI",
        impact: "Alto",
        effort: "Baixo",
        detail: "Já está em produção, mas verificar se TODOS os 4 pages estão passando.",
        check_url: "/api/track-capi?diag=1"
      },
      {
        title: "Atualizar spied intel — refresh semanal",
        impact: "Médio",
        effort: "30min",
        detail: "Re-rodar Meta Ad Library pra slimsoda/linfaflow/linfozen. Comparar com spy intel salvo.",
        spy_url: "/references_v5/methodology/competitive-spy/"
      },
      {
        title: "Migrar Supabase imphq_clicks (rodar migration)",
        impact: "Alto",
        effort: "1min",
        detail: "Migration 001_add_attribution_columns.sql tá pronto. Sem isso, fbc/fbp/utm_id não salvam.",
        migration: "references_v5/tracking/migrations/001_add_attribution_columns.sql"
      }
    ];

    // 5. Trending angles (do competitive spy)
    decision.trending_angles = [
      { product: "slimsoda", angle: "skinny sister / skinny friend", sources: 3, status: "SATURATED (3 afiliados)" },
      { product: "linfaflow", angle: "Vitamin P Nobel 1937 (anti-médico)", sources: 1, status: "WORKING" },
      { product: "linfaflow", angle: "Sister died of blood clot (Margaret)", sources: 1, status: "WORKING" },
      { product: "linfozen", angle: "It takes your summer first", sources: 7, status: "DOMINATED (Jessica Taylor)" },
      { product: "linfozen", angle: "Squeeze your thigh (nodules)", sources: 1, status: "WORKING" },
      { product: "linfozen", angle: "Lock the door in your own house", sources: 1, status: "WORKING" }
    ];

    // 6. Alerts
    if (slimsoda.pageviews_7d < 30) {
      decision.alerts.push({ level: "warn", message: "SlimSoda: < 30 pageviews em 7 dias. Verificar Meta Pixel + CAPI token." });
    }
    if (lipozen.leads_7d === 0 && lipozen.pageviews_7d > 100) {
      decision.alerts.push({ level: "danger", message: "Linfozen: 0 leads com " + lipozen.pageviews_7d + " pageviews. Formulário quebrado?" });
    }
    decision.alerts.push({ level: "info", message: "Refresh automático a cada 5min. Endpoint: GET /api/decision" });

    return res.status(200).json(decision);
  } catch (e) {
    return res.status(200).json({ ok: false, error: e.message });
  }
}
