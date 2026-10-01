/* Império tracker v1 — rastreamento compartilhado para páginas sem o bloco inline.
 * Uso: <meta name="imp-project-id" content="slimsoda"> + <script src="/js/imperio-tracker.v1.js"></script> no <head>.
 * Faz o mesmo que o bloco da buy page: visitante/sessão (mesmas chaves imp_*), PageView e Click em imphq_events
 * com project_id, e repassa UTM/fbclid/anúncio aos links de checkout sem mexer em hid/affid/package.
 * Não carrega nem altera pixel da Meta: cada página mantém o seu.
 * Arquivo versionado: /js/* tem cache imutável de 1 ano; mudança de comportamento = novo arquivo (v2). */
(function(){
  var SB_URL = "https://tkbivipqiewkfnhktmqq.supabase.co";
  var SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrYml2aXBxaWV3a2ZuaGt0bXFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg0NzY4NDgsImV4cCI6MjA1NDA1Mjg0OH0.2TnLj4lriG7eoPQWDo0mV8u8YHor6bd5ItZCHYhkym0";
  var meta = document.querySelector('meta[name="imp-project-id"]');
  var PROJECT_ID = meta ? meta.getAttribute("content") : null;
  window.impProjectId = PROJECT_ID;

  function store(k, v){ try { localStorage.setItem(k, v); } catch(e){} }
  function read(k){ try { return localStorage.getItem(k); } catch(e){ return null; } }
  function uuid(){ return (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2); }

  var visitorId = read("imp_visitor_id");
  if(!visitorId){ visitorId = uuid(); store("imp_visitor_id", visitorId); }
  var sessionId = null, now = Date.now();
  try {
    sessionId = sessionStorage.getItem("imp_session_id");
    var last = parseInt(sessionStorage.getItem("imp_last_activity") || "0", 10);
    if(!sessionId || (now - last) > 1800000){ sessionId = uuid(); sessionStorage.setItem("imp_session_id", sessionId); }
    sessionStorage.setItem("imp_last_activity", String(now));
  } catch(e){ sessionId = sessionId || uuid(); }

  var params = new URLSearchParams(window.location.search);
  var ATTR = ["utm_source","utm_medium","utm_campaign","utm_content","utm_term","utm_id","fbclid","gclid","ad_id","adset","adset_id","campaign_id","placement","sub1","sub2","sub3","sub4","sub5","coupon"];
  var attrs = {};
  ATTR.forEach(function(k){
    var v = params.get(k);
    if(v){ attrs[k] = v; store("imp_"+k, v); }
    else { var s = read("imp_"+k); if(s) attrs[k] = s; }
  });
  if(!read("imp_landing")) store("imp_landing", window.location.href);

  function post(data, keepalive){
    try {
      return fetch(SB_URL + "/rest/v1/imphq_events", {
        method: "POST",
        headers: { "Content-Type": "application/json", "apikey": SB_KEY, "Authorization": "Bearer " + SB_KEY, "Prefer": "return=minimal" },
        body: JSON.stringify(data),
        keepalive: !!keepalive
      }).catch(function(){});
    } catch(e){}
  }
  function track(name, data, keepalive){
    return post({
      id: uuid(), visitor_id: visitorId, session_id: sessionId, event_name: name, event_data: data || {},
      page_url: window.location.href, referrer: document.referrer || null,
      utm_source: attrs.utm_source || null, utm_medium: attrs.utm_medium || null, utm_campaign: attrs.utm_campaign || null,
      utm_content: attrs.utm_content || null, utm_term: attrs.utm_term || null,
      project_id: PROJECT_ID, user_agent: navigator.userAgent
    }, keepalive);
  }

  var CHECKOUT = ["utm_source","utm_medium","utm_campaign","utm_content","utm_term","utm_id","fbclid","ad_id","adset","adset_id","campaign_id","placement","sub1","sub2","sub3","sub4","sub5"];
  window.impCheckoutUrl = function(base){
    try {
      var u = new URL(base, window.location.href);
      CHECKOUT.forEach(function(k){ if(!u.searchParams.get(k) && attrs[k]) u.searchParams.set(k, attrs[k]); });
      return u.toString();
    } catch(e){ return base; }
  };
  function isCheckout(href){ return /checkout\.php/i.test(href || ""); }

  document.addEventListener("DOMContentLoaded", function(){
    var links = document.querySelectorAll("a[href]");
    for(var i = 0; i < links.length; i++){
      var a = links[i];
      if(isCheckout(a.getAttribute("href"))) a.href = window.impCheckoutUrl(a.getAttribute("href"));
    }
  });
  document.addEventListener("click", function(e){
    var a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
    if(a && isCheckout(a.getAttribute("href"))) track("InitiateCheckout", { event_source: "cta_click", href_label: (a.textContent || "").trim().slice(0, 80) }, true);
  }, true);

  if(Object.keys(attrs).length) track("Click", { link_id: params.get("imp_link_id") || null, fbclid: attrs.fbclid || null, gclid: attrs.gclid || null, ad_id: attrs.ad_id || null, coupon: attrs.coupon || null });
  track("PageView", { title: document.title });

  window.imptrack = window.imptrack || { trackEvent: track, getUtms: function(){ return attrs; }, getVisitorId: function(){ return visitorId; }, getSessionId: function(){ return sessionId; } };
})();
