// /api/health — server-side health check (Vercel serverless function)
// Endpoint que faz HEAD requests a partir do servidor Vercel (sem CORS issue)
// Bate em: Vercel hub, 4 checkouts vendor, 2 Meta Pixels (via fb.com/tr)
//
// Retorno: { checks: { name: { ok, status, ms, label } }, timestamp, total_ms }
//
// Pode ser chamado de qualquer LP via:
//   fetch('/api/health').then(r => r.json()).then(...)
//
// Deploy: Vercel detecta api/*.js como serverless function automaticamente.

const CHECKS = [
  { key: 'vercel',         url: 'https://slim-soda01.vercel.app/references_v5/?v=hc', label: 'Vercel Hub 200' },
  { key: 'pixel-stanford', url: 'https://www.facebook.com/tr/?id=1619587959397761', label: 'Pixel 161... OK' },
  { key: 'pixel-maria',    url: 'https://www.facebook.com/tr/?id=2211508706308536', label: 'Pixel 221... OK' },
  { key: 'ck-slim',        url: 'https://slimsodapowder.com/cc2/dtc/pay/checkout.php?package=3bottles&affid=aff_6821377', label: 'SlimSoda 3bottles' },
  { key: 'ck-slim-v2',     url: 'https://cc.slimsodapowder.com/v2/checkout.php?affid=aff_6821377', label: 'SlimSoda v2' },
  { key: 'ck-memo',        url: 'https://memopryl.com/cc2/pay/checkout.php?package=6b19&affid=aff_6821377', label: 'MemoPryl 6b19' },
  { key: 'ck-cardio',      url: 'https://usecardioclear.com/cc2/pay/checkout.php?package=3bottles&affid=aff_6821377', label: 'Cardio 3bottles' }
];

async function checkOne(c) {
  const t0 = Date.now();
  try {
    const r = await fetch(c.url, { method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(8000) });
    return { ok: r.ok, status: r.status, ms: Date.now() - t0, label: c.label, key: c.key };
  } catch (e) {
    return { ok: false, status: 0, ms: Date.now() - t0, label: c.label, key: c.key, error: String(e.message || e).slice(0, 60) };
  }
}

export default async function handler(req, res) {
  // CORS: permite qualquer origem (lê-only health, sem dados sensíveis)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=15, s-maxage=15');

  const t0 = Date.now();
  const results = await Promise.all(CHECKS.map(checkOne));
  const out = {
    checks: results,
    timestamp: new Date().toISOString(),
    total_ms: Date.now() - t0
  };
  res.status(200).json(out);
}
