// HUB v26 — Shared Client
// Theme toggle (dark/light), global search, nav highlighting, live data injection

(function(){
  // ========== THEME ==========
  function getTheme(){
    return localStorage.getItem("hub_theme") ||
      (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  }
  function setTheme(t){
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem("hub_theme", t);
    var btn = document.querySelector(".theme-toggle");
    if(btn) btn.textContent = t === "dark" ? "☀️" : "🌙";
  }
  setTheme(getTheme());

  document.addEventListener("DOMContentLoaded", function(){
    // Theme toggle
    var btn = document.querySelector(".theme-toggle");
    if(btn){
      btn.addEventListener("click", function(){
        setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark");
      });
    }

    // Global search
    var searchInput = document.querySelector(".global-search input");
    if(searchInput){
      searchInput.addEventListener("focus", function(){ openSearch(); });
      searchInput.addEventListener("input", function(e){ runSearch(e.target.value); });
      searchInput.addEventListener("keydown", function(e){
        if(e.key === "Escape"){ closeSearch(); searchInput.blur(); }
        if(e.key === "Enter" && window._hubSearchResults && window._hubSearchResults.length){
          window.location.href = window._hubSearchResults[0].url;
        }
      });
      document.addEventListener("click", function(e){
        if(!e.target.closest(".global-search")) closeSearch();
      });
    }

    // Highlight active nav
    var path = window.location.pathname;
    document.querySelectorAll(".global-nav a").forEach(function(a){
      var href = a.getAttribute("href");
      if(!href) return;
      if(path.indexOf(href) > -1 || (href === "/" && path === "/")) a.classList.add("active");
    });

    // Auto-inject "last updated" timestamps if element exists
    document.querySelectorAll("[data-last-updated]").forEach(function(el){
      el.textContent = new Date().toISOString().split("T")[0];
    });
  });

  // ========== SEARCH ==========
  // Page registry — each page registers itself with a title and tags
  // Pages that don't auto-register are still searchable via a fallback fetch
  var REGISTRY = [
    // HUB root
    { url: "/references_v5/index.html", title: "HUB v25 — DR Funnel Hub", tags: ["hub","index","home","main","v25","v26"] },
    // Produtos
    { url: "/references_v5/by-product/slimsoda/index.html", title: "SlimSoda · Baking Soda", tags: ["slimsoda","baking","soda","slim","weight","dana"] },
    { url: "/references_v5/by-product/linfaflow/index.html", title: "Linfaflow · Lymphatic Health", tags: ["linfaflow","lymph","lymphatic","cardio"] },
    { url: "/references_v5/by-product/cardio-clear/index.html", title: "Cardio Clear · Heart Health", tags: ["cardio","clear","heart","cardio clear"] },
    { url: "/references_v5/by-product/linfozen/index.html", title: "Linfozen · Lipedema", tags: ["linfozen","lipedema","lipo"] },
    // Briefings
    { url: "/references_v5/by-product/slimsoda/copy/briefing-affiliate/index.html", title: "SlimSoda Affiliate Brief", tags: ["brief","affiliate","slimsoda"] },
    { url: "/references_v5/by-product/slimsoda/copy/chat-x1-briefing/index.html", title: "SlimSoda Chat-x1 Brief", tags: ["chat","x1","conversational","brief"] },
    { url: "/references_v5/by-product/linfaflow/copy/briefing-linfaflow/index.html", title: "Linfaflow Brief", tags: ["brief","linfaflow"] },
    { url: "/references_v5/by-product/cardio-clear/copy/briefing-cardio/index.html", title: "Cardio Clear Brief", tags: ["brief","cardio"] },
    { url: "/references_v5/by-product/linfozen/copy/briefing-linfozen/index.html", title: "Linfozen Brief", tags: ["brief","linfozen"] },
    // Methodology
    { url: "/references_v5/methodology/skills-index/index.html", title: "Skills DR Arsenal", tags: ["skills","arsenal","index"] },
    { url: "/references_v5/methodology/cortex-ads/index.html", title: "CORTEX ADS (9 steps + Big 4)", tags: ["cortex","ads","9 steps","big 4","bifi"] },
    { url: "/references_v5/methodology/dtc-videos/index.html", title: "DTC Vídeo (P1-P4 + 3 metrics)", tags: ["dtc","video","p1","p2","p3","p4","hook rate","hold rate"] },
    { url: "/references_v5/methodology/dtc-black-bifi/index.html", title: "DTC Black (P1-P4)", tags: ["dtc","black","p1","p4"] },
    { url: "/references_v5/methodology/dtc-control/index.html", title: "DTC Control (8 alavancas Khayat)", tags: ["dtc","control","khayat","8 alavancas"] },
    { url: "/references_v5/methodology/proof-elements/index.html", title: "Proof Elements (22+ tipos)", tags: ["proof","elements","22","credibility"] },
    { url: "/references_v5/methodology/niche-research/index.html", title: "Niche Research (4 blocos)", tags: ["niche","research","4 blocos"] },
    { url: "/references_v5/methodology/cbo-bifi/index.html", title: "CBO Bifi (4 fases)", tags: ["cbo","bifi","4 fases"] },
    { url: "/references_v5/methodology/amanda-motor/index.html", title: "Motor Amanda N3", tags: ["amanda","n3","motor"] },
    { url: "/references_v5/methodology/ad-library-spy/index.html", title: "Ad Library Spy (legacy)", tags: ["ad library","spy","legacy"] },
    { url: "/references_v5/methodology/competitive-spy/index.html", title: "Competitive Spy 2026-08", tags: ["competitive","spy","2026","live","ad library","affiliate"] },
    { url: "/references_v5/methodology/analise-criativos/index.html", title: "Análise de Criativos (45+ ads)", tags: ["analise","criativos","45 ads","spy"] },
    // Tracking + P1P2
    { url: "/references_v5/tracking/index.html", title: "Tracking Dashboard (Supabase live)", tags: ["tracking","dashboard","supabase","leads","vendas"] },
    { url: "/references_v5/tracking/meta/index.html", title: "Meta Real-time Dashboard", tags: ["meta","dashboard","real-time","campaigns"] },
    { url: "/references_v5/p1p2/index.html", title: "P1/P2 Test Planner", tags: ["p1","p2","test","planner","bifi"] },
    // Páginas operacionais
    { url: "/references_v5/one.html", title: "The One Page (decisão)", tags: ["one","page","decisao","hoje","ação"] },
    { url: "/references_v5/funnel.html", title: "Funnel (VSL → LP → Checkout)", tags: ["funnel","vsl","lp","checkout"] },
    { url: "/references_v5/patterns.html", title: "Patterns (hooks, provas, red lines)", tags: ["patterns","hooks","provas","red lines"] }
  ];

  function openSearch(){
    var r = document.querySelector(".search-results");
    if(r){ r.classList.add("open"); runSearch(document.querySelector(".global-search input").value || ""); }
  }
  function closeSearch(){
    var r = document.querySelector(".search-results");
    if(r) r.classList.remove("open");
  }
  function runSearch(q){
    var r = document.querySelector(".search-results");
    if(!r) return;
    q = (q || "").trim().toLowerCase();
    if(!q){ r.classList.remove("open"); return; }
    var hits = [];
    REGISTRY.forEach(function(p){
      var score = 0;
      if(p.title.toLowerCase().indexOf(q) > -1) score += 10;
      p.tags.forEach(function(t){
        if(t.indexOf(q) > -1) score += 5;
      });
      if(score > 0) hits.push({ url: p.url, title: p.title, path: p.url.replace("/references_v5/", ""), score: score });
    });
    hits.sort(function(a,b){ return b.score - a.score; });
    hits = hits.slice(0, 8);
    window._hubSearchResults = hits;
    if(!hits.length){
      r.innerHTML = '<div style="padding:12px;color:var(--text-faint);font-size:13px">Nenhum match. Tente "slimsoda", "cortex", "brief"...</div>';
    } else {
      r.innerHTML = hits.map(function(h){
        var t = h.title.replace(new RegExp("("+q+")", "gi"), '<span class="search-result-match">$1</span>');
        return '<a href="'+h.url+'" class="search-result-item"><div class="search-result-title">'+t+'</div><div class="search-result-path">'+h.path+'</div></a>';
      }).join("");
    }
    r.classList.add("open");
  }
})();
