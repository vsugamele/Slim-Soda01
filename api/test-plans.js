// /api/test-plans.js
// Vercel serverless function — CRUD para P1/P2 test plans
// Uses in-memory store (resets on cold start) + optional Supabase persistence

// In-memory store (default — no setup needed)
let store = {
  plans: [
    {
      id: 'demo-p1-slimsoda-2026-08-12',
      product: 'SlimSoda',
      stage: 'P2', // P1 / P2 / P3 / P4
      angles: [
        { id: 'a1', name: '40 anos de saúde / Wake up', hooks: [
          { id: 'h1', name: 'I was wrong about baking soda for 20 years', text: 'Eu estava errado sobre bicarbonato por 20 anos.', status: 'QUALIFICADO' },
          { id: 'h2', name: '3 ingredients, 1 ritual', text: '3 ingredientes, 1 ritual de 10 segundos.', status: 'MORTO' },
          { id: 'h3', name: 'My skinny friend ate MORE', text: 'Minha amiga magra comia MAIS.', status: 'QUALIFICADO' }
        ], best_hook_id: 'h3', winner_count: 2 },
        { id: 'a2', name: 'Conspiração / Big Pharma', hooks: [
          { id: 'h1', name: 'Big Pharma has been hiding this', text: 'A Big Pharma esconde isso há 30 anos.', status: 'MAIS TEXTOS' },
          { id: 'h2', name: 'Ozempic ruined your metabolism', text: 'Ozempic arruinou seu metabolismo.', status: 'MORTO' },
          { id: 'h3', name: 'The celebrity capsule scam', text: 'O golpe da cápsula da celebridade.', status: 'QUALIFICADO' }
        ], best_hook_id: 'h3', winner_count: 1 },
        { id: 'a3', name: 'Anti-médico / Doctors wrong', hooks: [
          { id: 'h1', name: 'Your doctor got it wrong', text: 'Seu médico errou.', status: 'MORTO' },
          { id: 'h2', name: 'I fired my doctor', text: 'Eu demiti meu médico.', status: 'MAIS TEXTOS' },
          { id: 'h3', name: 'Stop blaming your thyroid', text: 'Pare de culpar sua tireoide.', status: 'QUALIFICADO' }
        ], best_hook_id: 'h3', winner_count: 1 }
      ],
      metrics: {
        spend: 287.45,
        ic: 18,
        purchases: 8,
        cpa: 35.93,
        cpa_target: 40,
        roas: 0.83,
        hook_rate: 47.2,
        hold_rate: 38.4,
        ctr: 0.876,
        cpm: 2.02,
        frequency: 1.59
      },
      dates: { start: '2026-08-12', end: '2026-08-15', day_in_stage: 2 },
      verdict: 'PROCEED_TO_P2', // PROCEED_TO_P2, REFINE, KILL, P3_ESCALATE, P4_CEMETERY
      notes: '2 angles qualificados, 1 com mais de 1 hook. Avançar pra P2 com 6 ads winners.'
    },
    {
      id: 'demo-p2-linfaflow-2026-08-10',
      product: 'Linfaflow',
      stage: 'P3',
      angles: [
        { id: 'a1', name: 'Margaret sister 62 / loss', hooks: [
          { id: 'h1', name: 'My older sister had a procedure', text: 'Minha irmã mais velha fez um procedimento.', status: 'QUALIFICADO' },
          { id: 'h2', name: 'She died of a blood clot', text: 'Ela morreu de um coágulo.', status: 'QUALIFICADO' },
          { id: 'h3', name: '30-second ritual that saved my legs', text: 'Ritual de 30 segundos que salvou minhas pernas.', status: 'QUALIFICADO' }
        ], best_hook_id: 'h1', winner_count: 3 }
      ],
      metrics: {
        spend: 1843.20,
        ic: 96,
        purchases: 47,
        cpa: 39.22,
        cpa_target: 40,
        roas: 0.89,
        hook_rate: 52.1,
        hold_rate: 41.8,
        ctr: 0.640,
        cpm: 3.79,
        frequency: 2.46
      },
      dates: { start: '2026-07-28', end: '2026-08-15', day_in_stage: 18 },
      verdict: 'P3_ESCALATE',
      notes: '47 vendas em 7d. CPA $39.22 (target $40). Escalando pra $300/dia.'
    },
    {
      id: 'demo-p1-linfozen-2026-08-15',
      product: 'Linfozen',
      stage: 'P1',
      angles: [
        { id: 'a1', name: '40 anos / autoridade médica', hooks: [
          { id: 'h1', name: 'I have spent 40 years studying health', text: 'Passei 40 anos estudando saúde.', status: 'QUALIFICADO' },
          { id: 'h2', name: 'Lipedema can be easily controlled', text: 'Lipedema pode ser facilmente controlado.', status: 'MAIS TEXTOS' },
          { id: 'h3', name: 'Your leg looks like this', text: 'Sua perna se parece com isto.', status: 'QUALIFICADO' }
        ], best_hook_id: 'h1', winner_count: 1 }
      ],
      metrics: {
        spend: 98.40,
        ic: 5,
        purchases: 1,
        cpa: 98.40,
        cpa_target: 50,
        roas: 0.28,
        hook_rate: 44.1,
        hold_rate: 33.5,
        ctr: 0.760,
        cpm: 2.40,
        frequency: 1.46
      },
      dates: { start: '2026-08-15', end: '2026-08-17', day_in_stage: 2 },
      verdict: 'CONTINUE_P1',
      notes: '1 venda a $98. Hook rate 44% (acima de 40%). Esperando 1-2 dias pra mais dados.'
    }
  ]
};

// Apply Bifi methodology decisions
function computeVerdict(plan) {
  if (plan.stage === 'P1') {
    const allHooks = plan.angles.flatMap(a => a.hooks);
    const qualified = allHooks.filter(h => h.status === 'QUALIFICADO').length;
    const dead = allHooks.filter(h => h.status === 'MORTO').length;
    if (qualified >= 3) return { verdict: 'PROCEED_TO_P2', note: `${qualified} hooks qualificados. Avançar pra P2.` };
    if (dead >= 5) return { verdict: 'KILL_ANGLE', note: `${dead} hooks mortos. Re-avaliar ângulos.` };
    if (plan.metrics.ic === 0) return { verdict: 'KILL_ANGLE', note: 'Zero IC. Provavelmente ângulo morto.' };
    return { verdict: 'CONTINUE_P1', note: `${qualified} qualificados. Esperando mais dados.` };
  }
  if (plan.stage === 'P2') {
    const { purchases, cpa_target, cpa, spend } = plan.metrics;
    if (purchases >= 15 && cpa <= cpa_target) return { verdict: 'P3_ESCALATE', note: `${purchases} vendas. CPA $${cpa.toFixed(0)} ≤ $${cpa_target}. ESCALA.` };
    if (purchases >= 10 && purchases < 15) return { verdict: 'REFINE', note: `${purchases} vendas (10-15). Refinar + 3 dias.` };
    if (purchases < 10) {
      const dayInStage = plan.dates?.day_in_stage || 0;
      if (dayInStage <= 3) return { verdict: 'REFINE', note: `${purchases} vendas. Última tentativa P1 (1 troca de hook).` };
      return { verdict: 'KILL_ANGLE', note: `${purchases} vendas. Tentativa extra usada. Matar.` };
    }
  }
  if (plan.stage === 'P3') {
    const { cpa, cpa_target } = plan.metrics;
    if (cpa > cpa_target * 1.4) return { verdict: 'DOWNSCALE', note: `CPA $${cpa.toFixed(0)} > $${(cpa_target*1.4).toFixed(0)} (limite 40%). Reduzir.` };
    return { verdict: 'P3_CONTINUE', note: `Escalando. CPA $${cpa.toFixed(0)}.` };
  }
  if (plan.stage === 'P4') {
    return { verdict: 'P4_CEMETERY', note: 'Estoque. Volta pra P3 se 3 dias no CPA.' };
  }
  return { verdict: 'UNKNOWN', note: 'Estado não reconhecido' };
}

function isValidPlan(plan) {
  return plan.product && plan.stage && ['P1', 'P2', 'P3', 'P4'].includes(plan.stage);
}

function genId() {
  return 'plan-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6);
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  // GET — list or single
  if (req.method === 'GET') {
    const id = req.query.id;
    if (id) {
      const plan = store.plans.find(p => p.id === id);
      if (!plan) return res.status(404).json({ error: 'not_found' });
      return res.status(200).json(plan);
    }
    const product = req.query.product;
    let plans = store.plans;
    if (product) plans = plans.filter(p => p.product === product);
    return res.status(200).json({
      count: plans.length,
      plans: plans.sort((a, b) => new Date(b.dates.start) - new Date(a.dates.start))
    });
  }

  // POST — create
  if (req.method === 'POST') {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    if (!isValidPlan(body)) return res.status(400).json({ error: 'invalid_plan', hint: 'product + stage (P1/P2/P3/P4) required' });
    const newPlan = {
      id: genId(),
      product: body.product,
      stage: body.stage,
      angles: body.angles || [],
      metrics: body.metrics || { spend: 0, ic: 0, purchases: 0, cpa: 0, cpa_target: 40, roas: 0, hook_rate: 0, hold_rate: 0, ctr: 0, cpm: 0, frequency: 0 },
      dates: body.dates || { start: new Date().toISOString().split('T')[0], end: null, day_in_stage: 0 },
      verdict: 'CONTINUE_P1',
      notes: body.notes || ''
    };
    newPlan.verdict = computeVerdict(newPlan).verdict;
    store.plans.push(newPlan);
    return res.status(201).json(newPlan);
  }

  // PATCH — update (metrics, stage, angles, hooks)
  if (req.method === 'PATCH') {
    const id = req.query.id;
    if (!id) return res.status(400).json({ error: 'id_required' });
    const idx = store.plans.findIndex(p => p.id === id);
    if (idx === -1) return res.status(404).json({ error: 'not_found' });
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    store.plans[idx] = { ...store.plans[idx], ...body };
    const verdictResult = computeVerdict(store.plans[idx]);
    store.plans[idx].verdict = verdictResult.verdict;
    store.plans[idx].notes = body.notes || store.plans[idx].notes;
    return res.status(200).json(store.plans[idx]);
  }

  // DELETE
  if (req.method === 'DELETE') {
    const id = req.query.id;
    if (!id) return res.status(400).json({ error: 'id_required' });
    const idx = store.plans.findIndex(p => p.id === id);
    if (idx === -1) return res.status(404).json({ error: 'not_found' });
    const removed = store.plans.splice(idx, 1)[0];
    return res.status(200).json({ removed: removed.id });
  }

  return res.status(405).json({ error: 'method_not_allowed' });
}
