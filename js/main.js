/* ==================================================================
   main.js
   محرّك الحركة كله بالجافاسكربت (حلقة rAF واحدة) — يعمل على كل
   المتصفحات بلا اعتماد على animation-timeline.
   ================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;
  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }
  function ease(t) { return t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }

  /* ═══ 1. i18n ═══ */
  var KEY = 'mq.lang';
  var lang = 'ar';
  try { lang = localStorage.getItem(KEY) || 'ar'; } catch (e) {}

  function t(o) { return o ? (o[lang] || o.en) : ''; }
  var AR_D = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
  function num(v) {
    var s = String(v);
    return lang === 'ar' ? s.replace(/[0-9]/g, function (d) { return AR_D[+d]; }) : s;
  }
  function dur(sec) {
    var m = Math.floor(sec / 60), s = Math.round(sec % 60);
    if (s === 60) { m++; s = 0; }
    return num(m) + ':' + num(s < 10 ? '0' + s : s);
  }

  var L = {
    watch:  { en: 'Watch full', ar: 'شاهد كاملاً' },
    works:  { en: 'works',      ar: 'عملاً' },
    mins:   { en: 'minutes',    ar: 'دقيقة' },
    posts:  { en: 'roles',      ar: 'أدوار مهنية' },
    skills: { en: 'skills',     ar: 'تخصصاً' },
    vert:   { en: 'Vertical 9:16',   ar: 'عمودي ٩:١٦' },
    wide:   { en: 'Widescreen 16:9', ar: 'أفقي ١٦:٩' },
    nosound:{ en: 'No sound',        ar: 'بلا صوت' }
  };

  function applyLang(next) {
    lang = next;
    try { localStorage.setItem(KEY, lang); } catch (e) {}
    root.setAttribute('lang', lang);
    root.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.title = t(PROFILE.name) + ' — ' + t(PROFILE.roles);

    var n = document.querySelectorAll('[data-en][data-ar]');
    for (var i = 0; i < n.length; i++) {
      n[i].textContent = n[i].getAttribute('data-' + lang);
    }
    document.getElementById('langTxt').textContent = lang === 'ar' ? 'EN' : 'ع';
    document.getElementById('yr').textContent = num(new Date().getFullYear());

    renderProfile();
    renderDeck();
    renderRail();
    renderBts();
    renderStats();
    renderSkills();
    renderExperience();
    renderWords();
    renderMarquee();
    if (lbIdx > -1) fillLb(lbIdx);
    measure();
  }
  document.getElementById('langBtn').addEventListener('click', function () {
    applyLang(lang === 'ar' ? 'en' : 'ar');
  });

  var HUES = ['#3A5490','#8A4A7A','#2F7A6B','#A45A2E','#4A5FA8','#7A4A9A','#2E6E8E'];

  /* ═══ 2. VIDEO HELPERS ═══ */

  function makeVideo(w, mode) {
    var v = document.createElement('video');
    v.muted = true; v.loop = true; v.playsInline = true;
    v.setAttribute('muted', ''); v.setAttribute('playsinline', '');
    v.setAttribute('disablepictureinpicture', '');
    v.preload = mode === 'live' ? 'auto' : (mode === 'frame' ? 'metadata' : 'none');
    if (mode !== 'idle') {
      v.src = w.src;
      v.addEventListener('loadedmetadata', function () {
        if (v.dataset.live === '1') return;
        try { v.currentTime = Math.min(1, (v.duration || 2) * .12); } catch (e) {}
      });
    }
    return v;
  }
  function safePlay(v) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }

  /* ═══ 3. FAN DECK ═══ */

  var deck = document.getElementById('deck');
  var VERT = WORKS.filter(function (w) { return w.ar < 1; });
  var idx = 0;

  function renderDeck() {
    if (idx >= VERT.length) idx = 0;
    deck.innerHTML = '';
    VERT.forEach(function (w, i) {
      var real = WORKS.indexOf(w);
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'card';
      b.setAttribute('aria-label', t(w.title) + ' — ' + dur(w.dur));

      /* لا شيء يُحمَّل قبل اقتراب القسم من الشاشة */
      b.appendChild(makeVideo(w, deckVisible && Math.abs(i - idx) <= 2 ? 'frame' : 'idle'));

      var veil = document.createElement('span'); veil.className = 'card__veil';
      var meta = document.createElement('span'); meta.className = 'card__meta';
      var tt = document.createElement('span'); tt.className = 'card__t'; tt.textContent = t(w.title);
      var dd = document.createElement('span'); dd.className = 'card__d'; dd.textContent = dur(w.dur);
      meta.appendChild(tt); meta.appendChild(dd);
      var play = document.createElement('i'); play.className = 'card__play';
      play.setAttribute('aria-hidden', 'true'); play.textContent = '▶';
      b.appendChild(veil); b.appendChild(meta); b.appendChild(play);

      b.addEventListener('click', function () {
        if (i === idx) openLb(real); else { idx = i; place(); }
      });
      deck.appendChild(b);
    });
    place();
  }

  function place() {
    var n = VERT.length, cards = deck.children;
    for (var i = 0; i < n; i++) {
      var off = i - idx;
      if (off > n / 2) off -= n;
      if (off < -n / 2) off += n;
      var c = cards[i], a = Math.abs(off), v = c.querySelector('video'), w = VERT[i];
      c.dataset.pos = a <= 2 ? String(off) : 'off';
      c.tabIndex = off === 0 ? 0 : -1;

      if (off === 0 && deckVisible) {
        if (!v.src) { v.preload = 'auto'; v.src = w.src; }
        v.dataset.live = '1'; v.preload = 'auto';
        safePlay(v);
      } else {
        v.dataset.live = '0';
        if (!v.paused) v.pause();
        if (deckVisible && a <= 2 && !v.src) { v.preload = 'metadata'; v.src = w.src; }
      }
    }
    root.style.setProperty('--hue', HUES[idx % HUES.length]);
    document.getElementById('deckNow').textContent = num(n ? idx + 1 : 0);
    document.getElementById('deckAll').textContent = num(n);
    document.getElementById('deckDur').textContent = VERT[idx] ? dur(VERT[idx].dur) : '';
    document.getElementById('deckFill').style.width = (n ? ((idx + 1) / n) * 100 : 0) + '%';
  }

  function move(d) {
    var n = VERT.length; if (!n) return;
    idx = (idx + d + n) % n; place();
  }
  document.getElementById('prevBtn').addEventListener('click', function () { move(-1); });
  document.getElementById('nextBtn').addEventListener('click', function () { move(1); });
  document.getElementById('openBtn').addEventListener('click', function () { openLb(WORKS.indexOf(VERT[idx])); });

  deck.addEventListener('keydown', function (e) {
    var rtl = root.getAttribute('dir') === 'rtl';
    if (e.key === 'ArrowRight') { e.preventDefault(); move(rtl ? -1 : 1); focusCenter(); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); move(rtl ? 1 : -1); focusCenter(); }
  });
  function focusCenter() { var c = deck.querySelector('.card[data-pos="0"]'); if (c) c.focus(); }

  (function swipe() {
    var x0 = null;
    deck.addEventListener('pointerdown', function (e) { x0 = e.clientX; });
    deck.addEventListener('pointerup', function (e) {
      if (x0 === null) return;
      var dx = e.clientX - x0; x0 = null;
      if (Math.abs(dx) > 46) move(dx < 0 ? 1 : -1);
    });
    deck.addEventListener('pointercancel', function () { x0 = null; });
  })();

  /* ═══ 4. RAIL — كل الأعمال في صف أفقي ═══ */

  var railEl    = document.getElementById('rail');
  var railTrack = document.getElementById('railTrack');
  var railSec   = document.getElementById('reel');
  var railFill  = document.getElementById('railFill');
  var railCards = [];
  var railTravel = 0, railSpan = 1;

  function renderRail() {
    railTrack.innerHTML = '';
    railCards = [];
    WORKS.forEach(function (w, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'rcard';
      b.setAttribute('data-rv', 'img');
      b.style.setProperty('--ar', w.ar);
      b.setAttribute('aria-label', t(w.title) + ' — ' + dur(w.dur));

      var v = makeVideo(w, 'frame');
      b.appendChild(v);

      var veil = document.createElement('span'); veil.className = 'rcard__veil';
      var meta = document.createElement('span'); meta.className = 'rcard__meta';
      var tt = document.createElement('span'); tt.className = 'rcard__t'; tt.textContent = t(w.title);
      var dd = document.createElement('span'); dd.className = 'rcard__d';
      dd.textContent = dur(w.dur) + '  ·  ' + (w.ar > 1 ? L.wide[lang] : L.vert[lang]);
      meta.appendChild(tt); meta.appendChild(dd);

      var ix = document.createElement('span'); ix.className = 'rcard__ix';
      ix.textContent = num(i + 1 < 10 ? '0' + (i + 1) : i + 1);
      var play = document.createElement('i'); play.className = 'rcard__play';
      play.setAttribute('aria-hidden', 'true'); play.textContent = '▶';

      b.appendChild(veil); b.appendChild(meta); b.appendChild(ix); b.appendChild(play);
      b.addEventListener('click', function () { openLb(i); });

      railTrack.appendChild(b);
      railCards.push({ el: b, video: v, work: w });
    });
    watchRail();
    sizeRail();
  }

  /* مسافة الرحلة الأفقية، ثم ارتفاع القسم الذي يقودها.
     نحدّه بـ 2.2 شاشة حتى لا يطول القسم كما كان سابقاً. */
  function sizeRail() {
    if (REDUCED) { root.classList.add('no-pin'); return; }
    railTravel = Math.max(0, railTrack.scrollWidth - railEl.clientWidth);
    railSpan = Math.max(1, Math.min(railTravel, window.innerHeight * 2.2));
    railSec.style.height = (window.innerHeight + railSpan) + 'px';
  }

  /* البطاقة الظاهرة في الصف تشتغل، والباقي يتوقّف — توفير للباندويث */
  var railIO = null;
  function watchRail() {
    if (!('IntersectionObserver' in window)) return;
    if (railIO) railIO.disconnect();
    railIO = new IntersectionObserver(function (en) {
      en.forEach(function (e) {
        var v = e.target.querySelector('video');
        if (!v) return;
        if (e.isIntersecting) {
          if (!v.src) { v.preload = 'auto'; v.src = e.target._src; }
          v.preload = 'auto';
          v.dataset.live = '1';
          if (lb.hidden && !REDUCED) safePlay(v);
        } else {
          v.dataset.live = '0';
          v.pause();
        }
      });
    }, { root: railEl, threshold: .55 });
    railCards.forEach(function (c) { c.el._src = c.work.src; railIO.observe(c.el); });
  }


  /* ═══ 4b. كواليس — حائط لقطات ═══ */

  var btsWall = document.getElementById('btsTrack');
  var btsSec  = document.getElementById('bts');
  var btsCards = [];

  function renderBts() {
    if (!btsWall) return;
    btsWall.innerHTML = '';
    btsCards = [];

    BTS.forEach(function (w, i) {
      var wrap = document.createElement('div');
      wrap.className = 'bwrap';
      wrap.setAttribute('data-rv', 'card');   /* الكشف على الغلاف */

      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'bcard';
      b.style.setProperty('--ar', w.ar);
      b.setAttribute('aria-label', t(w.title) + ' — ' + dur(w.dur) + ' — ' + L.nosound[lang]);

      b.appendChild(makeVideo(w, 'frame'));   /* makeVideo يكتم دائماً */

      var veil = document.createElement('span'); veil.className = 'bcard__veil';
      var d = document.createElement('span'); d.className = 'bcard__d'; d.textContent = dur(w.dur);
      var m = document.createElement('i'); m.className = 'bcard__mute';
      m.setAttribute('aria-hidden', 'true'); m.textContent = 'MUTE';

      b.appendChild(veil); b.appendChild(d); b.appendChild(m);
      b.addEventListener('click', function () { openLb(i, BTS); });

      wrap.appendChild(b);
      btsWall.appendChild(wrap);

      /* زاوية ثابتة لكل بطاقة وسرعة انزلاق مختلفة — يعطي الحائط
         إحساس صور مرمية لا شبكة منتظمة */
      /* لكل بطاقة زاوية وإزاحة وسرعة خاصة — تُستخدم في حالة التبعثر */
      btsCards.push({
        el: b,
        rot:   [-11, 8, -5, 13, -9, 6, -14, 10][i % 8],
        dx:    [-26, 18, -12, 30, -20, 14, -32, 22][i % 8],
        dy:    [34, -22, 40, -16, 28, -34, 20, -26][i % 8],
        speed: [26, 46, 14, 38, 20, 50, 30, 42][i % 8]
      });
    });
    watchBts();
  }

  /* المقطع الظاهر يعمل، والباقي يتوقّف */
  var btsIO = null;
  function watchBts() {
    if (!('IntersectionObserver' in window) || !btsWall) return;
    if (btsIO) btsIO.disconnect();
    btsIO = new IntersectionObserver(function (en) {
      en.forEach(function (e) {
        var v = e.target.querySelector('video');
        if (!v) return;
        if (e.isIntersecting) {
          v.preload = 'auto'; v.dataset.live = '1';
          if (lb.hidden && !REDUCED) safePlay(v);
        } else { v.dataset.live = '0'; v.pause(); }
      });
    }, { threshold: .35 });
    for (var i = 0; i < btsWall.children.length; i++) btsIO.observe(btsWall.children[i]);
  }

  /* ═══ 6. STATS / STEPS / WORDS / MARQUEE ═══ */

  function renderStats() {
    var el = document.getElementById('stats');
    var total = 0;
    for (var i = 0; i < WORKS.length; i++) total += WORKS[i].dur;
    var rows = [
      [num(WORKS.length),           L.works[lang]],
      [num(EXPERIENCE.length),      L.posts[lang]],
      [num(SKILLS.length),          L.skills[lang]],
      [num(Math.round(total / 60)), L.mins[lang]]
    ];
    el.innerHTML = '';
    rows.forEach(function (r) {
      var li = document.createElement('li');
      li.setAttribute('data-rv', 'scale');
      var n = document.createElement('span'); n.className = 'stat__n'; n.textContent = r[0];
      var l = document.createElement('span'); l.className = 'stat__l'; l.textContent = r[1];
      li.appendChild(n); li.appendChild(l);
      el.appendChild(li);
    });
  }

  function setText(id, txt) { var el = document.getElementById(id); if (el) el.textContent = txt; }

  function renderProfile() {
    setText('brandName',  t(PROFILE.name));
    setText('brandRole',  t(PROFILE.role));
    setText('heroName',   t(PROFILE.name));
    setText('heroRole',   t(PROFILE.role));
    setText('heroCity',   t(PROFILE.city));
    setText('heroLede',   t(PROFILE.lede));
    setText('footName',   t(PROFILE.name));
    setText('contactArea', t(PROFILE.area));

    var ph = document.getElementById('phoneLink');
    if (ph) {
      ph.textContent = num(PROFILE.phone);
      ph.setAttribute('href', 'tel:' + PROFILE.phoneIntl);
    }
  }

  function renderSkills() {
    var el = document.getElementById('skills');
    if (!el) return;
    el.innerHTML = '';
    SKILLS.forEach(function (sk, i) {
      var li = document.createElement('li');
      li.setAttribute('data-rv', 'text');
      var n = document.createElement('span'); n.className = 'skill__n';
      n.textContent = num(i + 1 < 10 ? '0' + (i + 1) : i + 1);
      var a = document.createElement('span'); a.className = 'skill__t'; a.textContent = t(sk);
      var b = document.createElement('span'); b.className = 'skill__tag';
      b.textContent = sk.tag || '';
      li.appendChild(n); li.appendChild(a); li.appendChild(b);
      el.appendChild(li);
    });
  }

  function renderExperience() {
    var el = document.getElementById('exp');
    if (!el) return;
    el.innerHTML = '';

    var spine = document.createElement('i');
    spine.className = 'exp__spine';
    spine.setAttribute('aria-hidden', 'true');
    spine.appendChild(document.createElement('b'));
    el.appendChild(spine);
    EXPERIENCE.forEach(function (x, i) {
      var li = document.createElement('li');
      li.className = 'exp__row';
      li.setAttribute('data-rv', 'card');

      var head = document.createElement('div');
      head.className = 'exp__head';
      var n = document.createElement('span'); n.className = 'exp__n';
      n.textContent = num(i + 1 < 10 ? '0' + (i + 1) : i + 1);
      var r = document.createElement('h3'); r.className = 'exp__role'; r.textContent = t(x.role);
      var o = document.createElement('p'); o.className = 'exp__org';
      o.textContent = t(x.org) + (t(x.time) ? '  ·  ' + t(x.time) : '');
      head.appendChild(n); head.appendChild(r); head.appendChild(o);

      var ul = document.createElement('ul');
      ul.className = 'exp__items';
      x.items.forEach(function (it) {
        var b = document.createElement('li');
        b.textContent = t(it);
        ul.appendChild(b);
      });

      li.appendChild(head); li.appendChild(ul);
      el.appendChild(li);
    });
  }

  var wordEls = [];
  function renderWords() {
    var el = document.getElementById('aboutWords');
    var txt = t(PROFILE.about) || '';
    el.innerHTML = '';
    wordEls = [];
    txt.split(/\s+/).forEach(function (w) {
      if (!w) return;
      var b = document.createElement('b');
      b.textContent = w + ' ';
      el.appendChild(b);
      wordEls.push(b);
    });
  }

  var marqRow = document.getElementById('marquee');
  function renderMarquee() {
    marqRow.innerHTML = '';
    var name = t(PROFILE.name);
    var word = t(PROFILE.role);
    if (lang === 'en') { name = name.toUpperCase(); word = word.toUpperCase(); }
    for (var k = 0; k < 4; k++) {
      var s = document.createElement('span');
      s.innerHTML = '<span></span><i>◆</i><span></span><i>◆</i>';
      s.children[0].textContent = name;
      s.children[2].textContent = word;
      marqRow.appendChild(s);
    }
  }

  /* ═══ 7. PLAYER ═══ */

  var lb = document.getElementById('lb');
  var lbStage = document.getElementById('lbStage');
  var lbTitle = document.getElementById('lbTitle');
  var lbNote  = document.getElementById('lbNote');
  var lbMeta  = document.getElementById('lbMeta');
  var lbCount = document.getElementById('lbCount');
  var lbIdx = -1, lastFocus = null;
  var lbSet = WORKS;        /* القائمة النشطة في المشغّل */

  function fillLb(i) {
    var w = lbSet[i]; if (!w) return;
    lbStage.innerHTML = '';
    var v = document.createElement('video');
    v.controls = true; v.playsInline = true; v.setAttribute('playsinline', '');
    v.preload = 'auto'; v.src = w.src; v.autoplay = true;
    if (w.mute) {
      /* الكواليس بلا صوت: نكتمها ونعيد كتمها إن حاول أحد رفعه */
      v.muted = true; v.setAttribute('muted', '');
      v.addEventListener('volumechange', function () { if (!v.muted) v.muted = true; });
    }
    lbStage.appendChild(v); safePlay(v);

    lbTitle.textContent = t(w.title);
    lbNote.textContent  = t(w.note);
    lbMeta.textContent  = dur(w.dur) + '  ·  ' + num(w.mb) + ' MB  ·  ' +
                          (w.ar > 1 ? L.wide[lang] : L.vert[lang]) +
                          (w.mute ? '  ·  ' + L.nosound[lang] : '');
    lbCount.textContent = num(i + 1) + ' / ' + num(lbSet.length);
    lbIdx = i;
  }

  function pauseAll() {
    var vs = document.querySelectorAll('.deck video, .rcard video, .bcard video');
    for (var i = 0; i < vs.length; i++) if (!vs[i].paused) vs[i].pause();
  }

  function openLb(i, set) {
    lbSet = set || WORKS;
    lastFocus = document.activeElement;
    pauseAll();
    fillLb(i);
    lb.hidden = false;
    requestAnimationFrame(function () {
      lb.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      document.getElementById('lbNext').focus();
    });
  }
  function closeLb() {
    lb.classList.remove('is-open');
    document.body.style.overflow = '';
    var done = function () {
      lb.hidden = true; lbStage.innerHTML = ''; lbIdx = -1; lbSet = WORKS;
      if (lastFocus && lastFocus.focus) lastFocus.focus();
      place(); onScroll();
    };
    REDUCED ? done() : setTimeout(done, 280);
  }
  function lbMove(d) { var n = lbSet.length; fillLb((lbIdx + d + n) % n); }

  document.getElementById('lbPrev').addEventListener('click', function () { lbMove(-1); });
  document.getElementById('lbNext').addEventListener('click', function () { lbMove(1); });
  var closers = lb.querySelectorAll('[data-close]');
  for (var ci = 0; ci < closers.length; ci++) closers[ci].addEventListener('click', closeLb);

  document.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    var rtl = root.getAttribute('dir') === 'rtl';
    if (e.key === 'Escape')     { closeLb(); return; }
    if (e.key === 'ArrowRight') { lbMove(rtl ? -1 : 1); return; }
    if (e.key === 'ArrowLeft')  { lbMove(rtl ? 1 : -1); return; }
    if (e.key === 'Tab') {
      var f = lb.querySelectorAll('button');
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ══════════════════════════════════════════════════════════════
     8. محرّك الحركة — حلقة rAF واحدة تقرأ موضع السكرول وتكتب
        transform فقط. يعمل على كل المتصفحات بلا استثناء.
     ══════════════════════════════════════════════════════════════ */

  var heroTop  = document.getElementById('heroTop');
  var showSec  = document.getElementById('showcase');
  var progEl   = document.getElementById('progFill');
  var navEl    = document.getElementById('nav');
  var hintEl   = document.querySelector('.scroll-hint');
  var statsEl  = document.getElementById('stats');
  var statSweep = document.getElementById('statSweep');
  var expEl    = document.getElementById('exp');
  var skillsEl = document.getElementById('skills');
  var navLinks = document.querySelectorAll('.nav__links a');
  var deckVisible = false;
  var vh = window.innerHeight;
  var docH = 1;
  var revealEls = [];
  var firstPaint = true;

  function measure() {
    vh = window.innerHeight;
    sizeRail();
    docH = Math.max(1, document.documentElement.scrollHeight - vh);
    revealEls = [].slice.call(document.querySelectorAll('[data-rv]'));
  }

  /* ── القيم: هدف (يتبع السكرول فوراً) وحاليّ (يلحق به بتخميد) ──
     التخميد هو ما يمنح الإحساس بالثقل والسلاسة بدل الالتصاق ١:١
     بالسكرول. كلما صغر EASE_K كانت الحركة أبطأ وأكثر انسيابية. */
  var EASE_K = 0.085;
  var T = { hero: 0, fan: 0, tilt: 0, rail: 0, marq: 0 };
  var C = { hero: 0, fan: 0, tilt: 0, rail: 0, marq: 0 };
  var KEYS = ['hero', 'fan', 'tilt', 'rail', 'marq'];

  function readTargets() {
    var y = window.pageYOffset || document.documentElement.scrollTop;
    T.hero = ease(clamp(y / (vh * .9), 0, 1));
    T.marq = y * .12;

    if (showSec) {
      var sr = showSec.getBoundingClientRect();
      /* مدى أطول = انفتاح أهدأ وأطول نفَساً */
      T.fan  = ease(clamp((vh * 1.02 - sr.top) / (vh * 1.05), 0, 1));
      T.tilt = ease(clamp(-sr.top / (sr.height || vh), 0, 1));
    }
    if (railTravel > 0) {
      T.rail = clamp(-railSec.getBoundingClientRect().top / railSpan, 0, 1);
    }
    return y;
  }

  function paint(y) {
    progEl.style.transform = 'scaleX(' + clamp(y / docH, 0, 1).toFixed(4) + ')';
    navEl.classList.toggle('is-stuck', y > 8);

    if (REDUCED) return;

    heroTop.style.transform = 'translate3d(0,' + (-52 * C.hero).toFixed(1) + 'px,0)';
    heroTop.style.opacity = (1 - .58 * C.hero).toFixed(3);
    if (hintEl) hintEl.style.opacity = (1 - clamp(C.hero * 2.4, 0, 1)).toFixed(3);

    root.style.setProperty('--fan', (0.06 + 0.94 * C.fan).toFixed(4));
    deck.style.transform = 'perspective(1500px) rotateX(' + (6.5 * C.tilt).toFixed(2) + 'deg) translate3d(0,' +
                           (-28 * C.tilt).toFixed(1) + 'px,0) scale(' + (1 - .045 * C.tilt).toFixed(4) + ')';

    if (railTravel > 0) {
      var rtl = root.getAttribute('dir') === 'rtl';
      railTrack.style.transform = 'translate3d(' + ((rtl ? 1 : -1) * railTravel * C.rail).toFixed(1) + 'px,0,0)';
      railFill.style.width = (C.rail * 100).toFixed(1) + '%';
    }

    var unit = marqRow.scrollWidth / 4 || 1;
    marqRow.style.transform = 'translate3d(' + (-(C.marq % unit)).toFixed(1) + 'px,0,0)';

    /* النبذة تضيء كلمةً كلمة */
    if (wordEls.length) {
      var wr = wordEls[0].parentNode.getBoundingClientRect();
      var wp = clamp((vh * .82 - wr.top) / (wr.height + vh * .4), 0, 1);
      var lit = Math.round(wp * wordEls.length);
      for (var k = 0; k < wordEls.length; k++) {
        var on = k < lit;
        if (on !== (wordEls[k].className === 'lit')) wordEls[k].className = on ? 'lit' : '';
      }
    }

    /* الكشف السينمائي: ما دخل الشاشة يحدّ ويصعد، بتدرّج بين المتجاورين.
       وما كان ظاهراً أصلاً عند أول رسم يُثبَّت فوراً بلا حركة. */
    var shown = 0;
    for (var j = 0; j < revealEls.length; j++) {
      var el = revealEls[j];
      if (el.classList.contains('rv-in')) continue;
      var rb = el.getBoundingClientRect();
      if (rb.top < vh - 80) {                       /* offset مثل الموقع المرجع */
        if (firstPaint) el.classList.add('rv-now'); /* بلا انتقال */
        else el.style.transitionDelay = (Math.min(shown++, 6) * 90) + 'ms';
        el.classList.add('rv-in');
      }
    }
    firstPaint = false;

    /* الخبرات: العمود الزمني يمتلئ، والدور المقابل لمنتصف الشاشة يتوهّج */
    if (expEl) {
      var er = expEl.getBoundingClientRect();
      var fill = expEl.querySelector('.exp__spine b');
      if (fill) {
        var ep = clamp((vh * .58 - er.top) / (er.height || 1), 0, 1);
        fill.style.transform = 'scaleY(' + ep.toFixed(4) + ')';
      }
      var rows = expEl.querySelectorAll('.exp__row');
      for (var e = 0; e < rows.length; e++) {
        var rb = rows[e].getBoundingClientRect();
        var on = rb.top < vh * .62 && rb.bottom > vh * .28;
        rows[e].classList.toggle('on', on);
      }
    }

    /* المهارات: السطر داخل نطاق التركيز تمتلئ حروفه — والحركة قابلة
       للعكس، ترجع للأعلى فيرجع السطر مفرَّغاً. */
    if (skillsEl) {
      var sk = skillsEl.children;
      for (var q2 = 0; q2 < sk.length; q2++) {
        var kb = sk[q2].getBoundingClientRect();
        var mid = kb.top + kb.height / 2;
        sk[q2].classList.toggle('on', mid > vh * .18 && mid < vh * .82);
      }
    }

    /* حائط الكواليس: الصور مبعثرة ومائلة عند طرفَي القسم، وتنتظم
       وتستوي تماماً حين يبلغ القسم منتصف الشاشة. الحركة قابلة للعكس. */
    if (btsCards.length && btsSec) {
      var bb = btsSec.getBoundingClientRect();
      if (bb.bottom > -300 && bb.top < vh + 300) {
        var bp = clamp((vh - bb.top) / (vh + bb.height), 0, 1) - .5;   /* -0.5 .. 0.5 */
        var scatter = ease(clamp(Math.abs(bp) * 2, 0, 1));             /* 0 بالمنتصف، 1 بالأطراف */
        for (var bi2 = 0; bi2 < btsCards.length; bi2++) {
          var bc = btsCards[bi2];
          var tx = bc.dx * scatter;
          var ty = bc.dy * scatter - bp * bc.speed;
          var rz = bc.rot * scatter;
          var sc = 1 - .07 * scatter;
          bc.el.style.transform = 'translate3d(' + tx.toFixed(1) + 'px,' + ty.toFixed(1) +
                                  'px,0) rotate(' + rz.toFixed(2) + 'deg) scale(' + sc.toFixed(3) + ')';
        }
      }
    }

    /* شريط الأرقام: خط ذهبي يمسح عرضه بمقدار مرورك عليه */
    if (statSweep && statsEl) {
      var nr = statsEl.getBoundingClientRect();
      var np = clamp((vh * .95 - nr.top) / (nr.height + vh * .35), 0, 1);
      statSweep.style.transform = 'scaleX(' + np.toFixed(4) + ')';
    }

    /* الأرقام تعدّ تصاعدياً عند ظهورها */
    if (statsEl && !statsEl.dataset.counted && statsEl.getBoundingClientRect().top < vh * .85) {
      statsEl.dataset.counted = '1';
      countUp();
    }

    /* تمييز رابط القسم الحالي */
    var secs = ['showcase', 'reel', 'about', 'contact'], cur = '';
    for (var q = 0; q < secs.length; q++) {
      var node = document.getElementById(secs[q]);
      if (node && node.getBoundingClientRect().top <= vh * .4) cur = secs[q];
    }
    for (var m = 0; m < navLinks.length; m++) {
      navLinks[m].classList.toggle('on', navLinks[m].getAttribute('href') === '#' + cur);
    }
  }

  /* الحلقة تظل تعمل ما دامت القيم لم تستقرّ، ثم تتوقّف تماماً */
  var looping = false;
  function frame() {
    var y = readTargets();
    var moving = false;
    for (var i = 0; i < KEYS.length; i++) {
      var k = KEYS[i], d = T[k] - C[k];
      if (Math.abs(d) > 0.0004) { C[k] += d * EASE_K; moving = true; }
      else C[k] = T[k];
    }
    paint(y);
    if (moving) requestAnimationFrame(frame);
    else looping = false;
  }
  function onScroll() { if (!looping) { looping = true; requestAnimationFrame(frame); } }

  /* عدّاد تصاعدي للأرقام */
  function countUp() {
    var nodes = statsEl.querySelectorAll('.stat__n');
    for (var i = 0; i < nodes.length; i++) {
      (function (el) {
        var target = parseInt(String(el.textContent).replace(/[^0-9]/g, ''), 10) || 0;
        if (!target) return;
        var t0 = null, dur = 1100;
        function step(ts) {
          if (t0 === null) t0 = ts;
          var p = clamp((ts - t0) / dur, 0, 1);
          el.textContent = num(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      })(nodes[i]);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () { measure(); onScroll(); }, { passive: true });

  /* المروحة تتوقّف حين تخرج من الشاشة */
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (en) {
      en.forEach(function (e) {
        deckVisible = e.isIntersecting;
        if (!deckVisible) {
          var vs = deck.querySelectorAll('video');
          for (var i = 0; i < vs.length; i++) vs[i].pause();
        } else if (lb.hidden) place();
      });
    }, { rootMargin: '300px 0px', threshold: 0 }).observe(deck);
  } else {
    deckVisible = true;
    place();
  }

  /* ═══ 9. MOBILE MENU ═══ */

  (function menu() {
    var burger = document.getElementById('burger');
    var panel  = document.getElementById('navPanel');
    var open = false;

    function set(v) {
      open = v;
      navEl.classList.toggle('menu-open', open);
      burger.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
      if (open) {
        var first = panel.querySelector('a');
        if (first) setTimeout(function () { first.focus(); }, 200);
      } else {
        burger.focus();
      }
    }

    burger.addEventListener('click', function () { set(!open); });

    /* الضغط على أي رابط يغلق القائمة قبل القفز للقسم */
    panel.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('a') : null;
      if (a && open) set(false);
    });

    document.addEventListener('keydown', function (e) {
      if (!open) return;
      if (e.key === 'Escape') { set(false); return; }
      if (e.key === 'Tab') {                       /* حصر التركيز داخل اللوح */
        var f = panel.querySelectorAll('a[href], button');
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });

    /* عند تكبير الشاشة تعود القائمة لشريط عادي */
    window.addEventListener('resize', function () {
      if (open && window.innerWidth > 860) set(false);
    }, { passive: true });
  })();

  /* ═══ BOOT ═══ */
  applyLang(lang);
  if (REDUCED) {
    root.style.setProperty('--fan', '1');      /* بلا حركة: المروحة مفتوحة أصلاً */
    var r = document.querySelectorAll('[data-rv]');
    for (var i = 0; i < r.length; i++) r[i].classList.add('rv-in', 'rv-now');
  }
  window.addEventListener('load', function () { measure(); onScroll(); });
  measure();
  readTargets();
  for (var kk = 0; kk < KEYS.length; kk++) C[KEYS[kk]] = T[KEYS[kk]];   /* بلا قفزة أولى */
  onScroll();
})();
