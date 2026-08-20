/* SlimSoda Quiz SSQ — behavioral 4-step modal
 * Loaded deferred on Maria 47 v4.1 advertorial LP.
 * Defines: window.imptrack (trackCtaClick / trackInitiateCheckout) and wires up the modal.
 * Depends on DOM elements with ids: ssqOverlay, ssqCard, ssqClose, ssqSkip, ssqStart,
 *   ssqStepIntro, ssqStepQ, ssqStepLoad, ssqStepRes, ssqProg, ssqStepKicker, ssqQText,
 *   ssqOpts, ssqNext, ssqBack, ssqLoadTitle, ssqResTitle, ssqEstBig, ssqEstLine2, ssqFinal.
 * Depends on global: fbq (Meta Pixel) — gracefully no-ops if not present.
 */
(function() {
  var overlay = document.getElementById('ssqOverlay');
  var card = document.getElementById('ssqCard');
  var closeBtn = document.getElementById('ssqClose');
  var skipBtn = document.getElementById('ssqSkip');
  var startBtn = document.getElementById('ssqStart');
  var stepIntro = document.getElementById('ssqStepIntro');
  var stepQ = document.getElementById('ssqStepQ');
  var stepLoad = document.getElementById('ssqStepLoad');
  var stepRes = document.getElementById('ssqStepRes');
  var prog = document.getElementById('ssqProg');
  var kicker = document.getElementById('ssqStepKicker');
  var qText = document.getElementById('ssqQText');
  var optsBox = document.getElementById('ssqOpts');
  var nextBtn = document.getElementById('ssqNext');
  var backBtn = document.getElementById('ssqBack');

  // Quiz state
  var current = 0;
  var answers = [];

  var questions = [
    {
      q: "How long has the bloat been part of your day?",
      opts: [
        { emo: "🌱", l: "Less than 6 months", v: 0 },
        { emo: "🌿", l: "6 months to 2 years", v: 1 },
        { emo: "🌳", l: "2 to 5 years", v: 2 },
        { emo: "🪵", l: "More than 5 years", v: 3 }
      ]
    },
    {
      q: "What have you already tried that did not stick?",
      opts: [
        { emo: "💧", l: "Water pills", v: 0 },
        { emo: "🍎", l: "Apple cider vinegar alone", v: 1 },
        { emo: "🥄", l: "Baking soda on its own", v: 2 },
        { emo: "🤷", l: "Nothing yet — just starting to look", v: 3 }
      ]
    },
    {
      q: "When does the bloat usually show up?",
      opts: [
        { emo: "🌅", l: "By mid-morning", v: 0 },
        { emo: "🌞", l: "After lunch", v: 1 },
        { emo: "🌙", l: "By evening", v: 2 },
        { emo: "⏰", l: "It does not really leave", v: 3 }
      ]
    },
    {
      q: "If this works, what is the small thing you would notice first?",
      opts: [
        { emo: "💍", l: "My ring fits differently", v: 0 },
        { emo: "👖", l: "My jeans stop fighting me", v: 1 },
        { emo: "🪞", l: "The mirror is less of a fight", v: 2 },
        { emo: "🤷", l: "Honestly, I am just browsing", v: 3 }
      ]
    }
  ];

  // Open quiz on first CTA click
  function openQuiz(e) {
    if (e) e.preventDefault();
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    showStep('intro');
    trackEvent('ss_quiz_opened');
  }
  function closeQuiz() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    trackEvent('ss_quiz_closed', { quiz_step: current + 1, answers_count: answers.filter(function(a){ return a !== null && typeof a !== 'undefined'; }).length });
  }

  function showStep(step) {
    stepIntro.style.display = 'none';
    stepQ.style.display = 'none';
    stepLoad.style.display = 'none';
    stepRes.style.display = 'none';
    if (step === 'intro') stepIntro.style.display = 'block';
    if (step === 'q') { stepQ.style.display = 'block'; renderQ(); }
    if (step === 'load') stepLoad.style.display = 'block';
    if (step === 'res') stepRes.style.display = 'block';
  }

  function renderQ() {
    var q = questions[current];
    kicker.textContent = 'Question ' + (current + 1) + ' of ' + questions.length;
    qText.textContent = q.q;
    prog.style.width = ((current) / questions.length * 100) + '%';
    optsBox.innerHTML = '';
    answers[current] = null;
    nextBtn.disabled = true;
    q.opts.forEach(function(o, i) {
      var btn = document.createElement('button');
      btn.className = 'ssq-opt';
      btn.type = 'button';
      btn.innerHTML = '<span class="ssq-emo">' + o.emo + '</span><span class="ssq-lbl">' + o.l + '</span>';
      btn.addEventListener('click', function() {
        answers[current] = i;
        optsBox.querySelectorAll('.ssq-opt').forEach(function(x){ x.classList.remove('sel'); });
        btn.classList.add('sel');
        nextBtn.disabled = false;
        trackEvent('ss_quiz_answered', {
          quiz_step: current + 1,
          question_text: q.q,
          answer_index: i,
          answer_label: o.l,
          answer_value: o.v
        });
      });
      optsBox.appendChild(btn);
    });
  }

  function next() {
    if (current < questions.length - 1) {
      current++;
      showStep('q');
      trackEvent('ss_quiz_step_viewed', { quiz_step: current + 1, question_text: questions[current].q });
    } else {
      showStep('load');
      trackEvent('ss_quiz_completed', { answers: answers, answers_count: answers.length });
      // Simulate processing
      var loadMessages = [
        'Building your custom protocol...',
        'Matching 200+ women with similar profiles...',
        'Calculating your day-by-day timeline...',
        'Almost done...'
      ];
      var ml = document.getElementById('ssqLoadTitle');
      var i = 0;
      var loadInterval = setInterval(function() {
        i++;
        if (i < loadMessages.length) ml.textContent = loadMessages[i];
      }, 600);
      setTimeout(function() {
        clearInterval(loadInterval);
        // Personalize result based on Q1 (length of bloat) — behavioral, no weight promises
        var lenAnswer = answers[0];
        var messages = {
          0: { title: "Your first signal is likely a quiet morning.", est: "A small morning shift", day6: "less morning puffiness when you wake up", day11: "mid-afternoon bloat stays lighter, longer", day21: "your usual jeans feel different when you put them on" },
          1: { title: "Here is what women with your timeline usually notice first.", est: "A small morning shift", day6: "sock marks start to fade", day11: "food noise gets quieter through the afternoon", day21: "the jeans you stopped reaching for feel possible again" },
          2: { title: "Here is what tends to happen first for you.", est: "A small morning shift", day6: "a noticeable lightness in the face by mid-morning", day11: "the bloat that used to show up by 3pm stays away", day21: "you catch yourself in a mirror and stop looking away" },
          3: { title: "Here is what we hear most often from women at this stage.", est: "A small morning shift", day6: "you sleep through the night without feeling swollen", day11: "you start saying yes to dinners again", day21: "you get in a photo without thinking about the angle" }
        };
        var m = messages[lenAnswer] || messages[1];
        document.getElementById('ssqResTitle').textContent = m.title;
        document.getElementById('ssqEstBig').textContent = m.est;
        document.getElementById('ssqEstLine2').innerHTML = '<strong>Day 6:</strong> ' + m.day6 + ' · <strong>Day 11:</strong> ' + m.day11 + ' · <strong>Day 21:</strong> ' + m.day21 + '.';
        prog.style.width = '100%';
        showStep('res');
        trackEvent('ss_quiz_result_viewed', { profile: lenAnswer, answers: answers });
      }, 2800);
    }
  }

  function back() {
    if (current > 0) { current--; showStep('q'); }
    else { showStep('intro'); current = 0; }
  }

  // Fallback imptrack: the shared /js/slimsoda-journey.js tracker owns this when present.
  window.imptrack = window.imptrack || {
    page: 'maria47-v3',
    trackCtaClick: function(d){
      try {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push(Object.assign({ event: 'ss_cta_clicked', page: this.page }, d || {}));
        if (typeof fbq !== 'undefined') fbq('trackCustom', 'ss_cta_clicked', d || {});
      } catch(e){}
    },
    trackInitiateCheckout: function(d){
      try {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push(Object.assign({ event: 'ss_checkout_clicked', page: this.page }, d || {}));
        if (typeof fbq !== 'undefined') fbq('track', 'InitiateCheckout', {value: d.value || 27.49, currency: 'USD', content_ids: ['slimsoda-3bottles']});
      } catch(e){}
    }
  };

  // Track function (custom events for quiz funnel)
  function trackEvent(name, data) {
    try {
      if (window.SlimSodaJourney && typeof window.SlimSodaJourney.track === 'function') {
        window.SlimSodaJourney.track(name, data || {});
        return;
      }
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(Object.assign({ event: name, page: 'maria47-v3' }, data || {}));
      if (typeof fbq !== 'undefined') fbq('trackCustom', name, data || {});
    } catch (e) {}
  }

  // Wire events
  if (startBtn) startBtn.addEventListener('click', function() { current = 0; showStep('q'); trackEvent('ss_quiz_started', { quiz_step: 1, question_text: questions[0].q }); });
  if (skipBtn) skipBtn.addEventListener('click', closeQuiz);
  if (closeBtn) closeBtn.addEventListener('click', closeQuiz);
  if (nextBtn) nextBtn.addEventListener('click', next);
  if (backBtn) backBtn.addEventListener('click', back);
  if (overlay) overlay.addEventListener('click', function(e) { if (e.target === overlay) closeQuiz(); });

  // Open quiz when any CTA in article body is clicked (NOT in disclosure/footer)
  document.querySelectorAll('a.cta').forEach(function(a) {
    a.addEventListener('click', function(e) {
      // Only intercept the in-article CTAs (not footer / disclosure)
      if (a.closest('.disclosure')) return;
      e.preventDefault();
      openQuiz();
    });
  });

  // Track when user clicks the final "Send My 90-Day SlimSoda Kit" button (after quiz)
  document.addEventListener('click', function(e) {
    var t = e.target;
    if (t && t.id === 'ssqFinal') {
      window.imptrack.trackInitiateCheckout({
        cta_id: 'quiz-final',
        cta_label: (t.textContent || '').trim().slice(0, 60),
        value: 27.49, currency: 'USD',
        href: t.href,
        answers: answers
      });
    }
  });
})();
