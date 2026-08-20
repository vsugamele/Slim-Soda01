/* SlimSoda journey tracking.
 * Sends consistent anonymous funnel events to dataLayer, Meta Pixel, Clarity,
 * and the existing /api/track-capi relay when available.
 */
(function () {
  var PIXEL_ID = "2211508706308536";
  var PROJECT = "slimsoda";
  var DEBUG = /(?:^|[?&])debug_tracking=1(?:&|$)/.test(window.location.search);
  var STORAGE_KEYS = {
    visitor: "ss_visitor_id",
    session: "ss_session",
    attribution: "ss_attribution"
  };
  var startedAt = Date.now();
  var scrollMarks = [25, 50, 75, 90];
  var firedScroll = {};

  function uuid() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return "ss-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 10);
  }

  function getJson(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function setJson(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
  }

  function getVisitorId() {
    try {
      var id = localStorage.getItem(STORAGE_KEYS.visitor);
      if (!id) {
        id = uuid();
        localStorage.setItem(STORAGE_KEYS.visitor, id);
      }
      return id;
    } catch (e) {
      return uuid();
    }
  }

  function getSession() {
    var now = Date.now();
    var session = getJson(STORAGE_KEYS.session, null);
    if (!session || !session.id || !session.last_seen || now - session.last_seen > 30 * 60 * 1000) {
      session = { id: uuid(), started_at: new Date(now).toISOString(), landing_page: window.location.href };
    }
    session.last_seen = now;
    setJson(STORAGE_KEYS.session, session);
    return session;
  }

  function cookie(name) {
    var match = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "=([^;]*)"));
    return match ? decodeURIComponent(match[1]) : "";
  }

  function paramsToObject() {
    var params = new URLSearchParams(window.location.search);
    var keys = [
      "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term",
      "fbclid", "gclid", "msclkid", "ttclid", "click_id", "sub1", "sub2", "sub3",
      "xc", "affid"
    ];
    var out = {};
    keys.forEach(function (key) {
      var value = params.get(key);
      if (value) out[key] = value;
    });
    return out;
  }

  function getAttribution() {
    var fresh = paramsToObject();
    var saved = getJson(STORAGE_KEYS.attribution, {});
    var merged = Object.assign({}, saved, fresh);
    if (!merged.first_referrer && document.referrer) merged.first_referrer = document.referrer;
    if (!merged.first_landing_page) merged.first_landing_page = window.location.href;
    merged.last_landing_page = window.location.href;
    merged.updated_at = new Date().toISOString();
    setJson(STORAGE_KEYS.attribution, merged);
    return merged;
  }

  function pageType() {
    var path = window.location.pathname;
    if (path.indexOf("/slimsoda-pdp") !== -1) return "pdp";
    if (path.indexOf("/advertorial-maria47-v3") !== -1) return "advertorial";
    if (path.indexOf("/buy-page") !== -1) return "buy_page";
    return "site";
  }

  function baseProperties() {
    var session = getSession();
    var attribution = getAttribution();
    return {
      project: PROJECT,
      visitor_id: getVisitorId(),
      session_id: session.id,
      page_type: pageType(),
      page_path: window.location.pathname,
      page_url: window.location.href,
      page_title: document.title,
      referrer: document.referrer || "",
      viewport_width: window.innerWidth,
      viewport_height: window.innerHeight,
      seconds_on_page: Math.round((Date.now() - startedAt) / 1000),
      attribution: attribution
    };
  }

  function eventId(name) {
    return PROJECT + "-" + name + "-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);
  }

  function capiPayload(name, props, id) {
    return {
      pixel_id: PIXEL_ID,
      event_name: name,
      event_id: id,
      event_data: props,
      event_source_url: window.location.href,
      action_source: "website",
      external_id: props.visitor_id,
      fbp: cookie("_fbp"),
      fbc: cookie("_fbc")
    };
  }

  function sendBeacon(payload) {
    try {
      var body = JSON.stringify(payload);
      if (navigator.sendBeacon) {
        var blob = new Blob([body], { type: "application/json" });
        navigator.sendBeacon("/api/track-capi", blob);
        return;
      }
      fetch("/api/track-capi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body,
        keepalive: true
      }).catch(function () {});
    } catch (e) {}
  }

  function track(name, data, options) {
    var props = Object.assign(baseProperties(), data || {});
    var id = props.event_id || eventId(name);
    props.event_id = id;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event: name }, props));

    try {
      if (typeof window.clarity === "function") {
        window.clarity("event", name);
        window.clarity("set", "ss_visitor_id", props.visitor_id);
        window.clarity("set", "ss_session_id", props.session_id);
        window.clarity("set", "ss_page_type", props.page_type);
      }
    } catch (e) {}

    try {
      if (typeof window.fbq === "function") {
        var metaName = name;
        var standard = options && options.meta_standard;
        if (standard) window.fbq("track", standard, props, { eventID: id });
        else window.fbq("trackCustom", metaName, props, { eventID: id });
      }
    } catch (e) {}

    sendBeacon(capiPayload(name, props, id));
    if (DEBUG && window.console) console.log("[SlimSoda tracking]", name, props);
    return id;
  }

  function label(el) {
    return (el.getAttribute("data-track-label") || el.textContent || el.getAttribute("aria-label") || "").trim().replace(/\s+/g, " ").slice(0, 120);
  }

  function ctaLocation(el) {
    if (el.id) return el.id;
    if (el.closest(".header")) return "header";
    if (el.closest(".banner")) return "hero";
    if (el.closest(".sticky-cta")) return "sticky";
    if (el.closest(".comments")) return "comments";
    if (el.closest(".guarantee")) return "guarantee";
    if (el.closest("#ssqOverlay")) return "quiz";
    return el.getBoundingClientRect().top > window.innerHeight ? "below_fold" : "above_fold";
  }

  function appendAttribution(url) {
    try {
      var parsed = new URL(url, window.location.origin);
      var attribution = getAttribution();
      ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "gclid", "msclkid", "ttclid", "click_id", "sub1", "sub2", "sub3", "xc", "affid"].forEach(function (key) {
        if (attribution[key] && !parsed.searchParams.get(key)) parsed.searchParams.set(key, attribution[key]);
      });
      parsed.searchParams.set("ss_vid", getVisitorId());
      parsed.searchParams.set("ss_sid", getSession().id);
      return parsed.toString();
    } catch (e) {
      return url;
    }
  }

  function wireLinks() {
    document.querySelectorAll("a[href]").forEach(function (a, index) {
      if (a.dataset.ssTrackingWired === "1") return;
      a.dataset.ssTrackingWired = "1";
      var href = a.href || "";
      var opensQuiz = pageType() === "advertorial" && a.classList.contains("cta") && !!document.getElementById("ssqOverlay");
      var isCheckout = !opensQuiz && /checkout\.php|slimsodapowder\.com\/cc2|cc\.slimsodapowder\.com/i.test(href);
      var isPdp = /\/slimsoda-pdp/i.test(href);
      if ((isCheckout || isPdp) && href.indexOf("#") !== 0) a.href = appendAttribution(href);
      if (isCheckout || isPdp || a.classList.contains("cta") || a.classList.contains("ssq-cta") || a.classList.contains("v3btn") || a.classList.contains("bnrbtn") || a.classList.contains("hdrbtn")) {
        a.addEventListener("click", function () {
          var data = {
            cta_index: index,
            cta_id: a.id || "",
            cta_class: a.className || "",
            cta_label: label(a),
            cta_location: ctaLocation(a),
            destination_url: a.href,
            destination_type: opensQuiz ? "quiz" : (isCheckout ? "checkout" : (isPdp ? "pdp" : "internal"))
          };
          track("ss_cta_clicked", data);
          if (isPdp) track("ss_pdp_click", data);
          if (isCheckout) track("ss_checkout_clicked", data, { meta_standard: "InitiateCheckout" });
        });
      }
    });
  }

  function wireScroll() {
    function onScroll() {
      var doc = document.documentElement;
      var max = Math.max(1, doc.scrollHeight - window.innerHeight);
      var pct = Math.round((window.scrollY / max) * 100);
      scrollMarks.forEach(function (mark) {
        if (pct >= mark && !firedScroll[mark]) {
          firedScroll[mark] = true;
          track("ss_scroll_depth", { scroll_percent: mark });
        }
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  window.SlimSodaJourney = {
    track: track,
    appendAttribution: appendAttribution,
    visitorId: getVisitorId,
    sessionId: function () { return getSession().id; }
  };

  window.imptrack = window.imptrack || {};
  window.imptrack.trackCtaClick = function (data) { return track("ss_cta_clicked", data || {}); };
  window.imptrack.trackInitiateCheckout = function (data) { return track("ss_checkout_clicked", data || {}, { meta_standard: "InitiateCheckout" }); };

  function init() {
    track("ss_page_view", {}, { meta_standard: pageType() === "pdp" ? "ViewContent" : null });
    wireLinks();
    wireScroll();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
