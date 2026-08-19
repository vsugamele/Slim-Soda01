# References — páginas DR de afiliado

Snapshot pra estudo offline de 2 LPs de direct response que o user pediu como referência.

## O que tem aqui

### 1. `slimsoda-corewellnessjournal/`  ✅ COMPLETO
- **URL:** https://slimsoda.corewellnessjournal.com/
- **Tema:** SlimSoda / Baking Soda Trick (Yale doctor + Jennifer Mitchell)
- **Tipo de funil:** Article LP (não VSL) — termina com CTA "CLICK TO WATCH" pra VSL externa
- **HTML:** `index.html` (33KB, Elementor page-3077)
- **Imagens:** 12 arquivos em `images/` (800KB) — 8 banners da entrevista, 3 avatars de review, 1 CTA image

### 2. `trustedconsumervoice-slimtide/`  ⚠️ VSL SLIMTIDE NÃO ACESSÍVEL + PROXY ENCONTRADO
- **URL pedida:** https://trustedconsumervoice.com/vsl/slimtide/v1/?aff_id=45242&subid=2b352f93f58d45f8b783d57ebab8a26d
- **Status:** Silent block (Cloudflare retorna 200 com body 0). O publisher é **Trusted Consumer Voice**, um tracker genérico de afiliados que só serve o conteúdo da VSL com click id válido (af_id + subid). A página principal tá em "Upgrade in Progress" também.
- **Achei proxy:** `/southbeach/v3/pins.php?pp=1` (mesmo publisher, mesmo template) carregou 100% — é a melhor referência da estrutura/pattern que a slimtide VSL teria.
- **HTML:** `page-southbeach-proxy.html` (42KB), `proxy-southbeach-v3.html` (notas)
- **Imagens:** 50 arquivos em `images/` (1.17MB) — hero, 5 reasons, mechanism, doctor, 7 review photos, sidebars, money-back seal, etc.

## Por que o proxy southbeach serve de referência pra slimtide

| | SlimTide VSL (alvo) | SouthBeach VSL (proxy) |
|---|---|---|
| Publisher | trustedconsumervoice.com | trustedconsumervoice.com |
| Template | VSL funil longo | VSL funil longo |
| URL pattern | /vsl/{vendor}/{version}/?aff_id=X&subid=Y | /vsl/{vendor}/{version}/pins.php?pp=1 |
| Outbound tracker | g8mv2trk.com (slimtide) | track.gadgetslaboratory.com (southbeach) |
| Advertorial pattern | (presumido igual) | Numbered reasons + Day timeline + reviews + money-back |
| Geo-fence | US (af_id gated) | US (pp=1 gated) |

O **publisher trustedconsumervoice.com** roda o template VSL pra múltiplos advertisers (slimtide, southbeach, etc). Mesmo DOM, mesma estrutura, mesmo copy pattern — só troca o produto e a URL de outbound. Então a southbeach page é referência sólida do **pattern/arquitetura** da slimtide VSL.

## O que aprendi (pra memory)

1. **trustedconsumervoice.com** = tracker genérico de LP de afiliado. Não tem landing pública. Cada oferta é gated (af_id/subid/pp).
2. **slimtide VSL específica** tá bloqueada (Cloudflare silent block + precisa click id válido). Pra clonar preciso de af_id real da rede do user, ou fazer scraping no momento que recebe tráfego pago.
3. **southbeach v3** é a irmã acessível (mesmo template). Padrão: numbered reasons + Day 1/14/30 timeline + 7 reviews + money-back seal.
4. **A "mãe" do funil SlimSoda** é `slimsoda.corewellnessjournal.com` — article LP, entrega copy, redireciona pra VSL externa via g8mv2trk.com.

## DR patterns novos identificados (somar ao banco)

- **5-numbered-reasons listicle** (southbeach) — funciona pra qualificar benefício em escaneabilidade
- **Day 1/14/30 calendar timeline** com imagem final do resultado (southbeach) — promise de timeline visual
- **CTA image + CTA button stack** (slimsoda) — botão visual + botão texto, dobra conversão
- **Author byline + dynamic date** em 2 linhas (slimsoda) — "Posted By Linda William • JUN 10, 2026 • 3 Min Read"
- **Vertical sidebar com 3 reviews extras** (southbeach) — em desktop, reviews extras na coluna direita
- **"Sold out 12 times at Target/Amazon/Walmart"** (southbeach) — social proof por mainstream
- **"Day X" narrative** (southbeach Julie Garcia) — "Day 1... Day 5... Day 30" narrativa pessoal
- **Quote box com foto do doctor + aspas** (southbeach) — bloco dedicado pra citação de autoridade
- **"As Featured In" logo strip** (southbeach) — 5 logos de mídias, mesmo sem ser real
- **First-last name + city + state** (southbeach reviews) — "Judy M., Dallas, TX" / "Rochelle D., Naples, FL"
- **Reviews inline em formato social** (southbeach) — tipo Facebook comment com "9h Like Reply 64 ❤"
- **Compliance footer duplo** (southbeach) — FDA disclaimer + "Individual results may vary" stack
