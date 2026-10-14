/* ==========================================================================
   ABOUT — intro + draggable polaroids · experience accordion (pinned) · fun-fact cards
   ========================================================================== */
(function () {
  var S = window.SITE, A = window.ABOUT, B = window.POSTS, F = A.fun || {};
  var $ = U.$, $$ = U.$$, esc = U.esc, clamp = U.clamp, smooth = U.smooth, RM = U.RM;
  var mqMob = matchMedia('(max-width:1100px)');

  /* ---------- original artwork ---------- */
  function sunClouds() {
    var stripes = ''; for (var i = -14; i < 16; i++) stripes += '<rect x="' + (1340 + i * 26) + '" y="-40" width="15" height="420" fill="#FFDA3F" transform="rotate(45 1340 160)"/>';
    return '<svg class="ai-sun-clouds" viewBox="0 0 2091 421" aria-hidden="true"><defs><clipPath id="aisun"><circle cx="1340" cy="160" r="170"/></clipPath></defs>' +
      '<g clip-path="url(#aisun)">' + stripes + '</g>' +
      '<path class="cl1" fill="#e9e2cf" d="M0 421 C30 300 190 250 330 290 C420 170 640 150 760 250 C900 110 1220 90 1420 240 C1560 300 1720 330 1820 421 Z"/>' +
      '<path class="cl2" fill="#ddd7c6" d="M1080 421 C1110 340 1240 320 1330 350 C1400 290 1560 270 1660 330 C1780 290 1960 300 2091 421 Z"/></svg>';
  }
  function land() {
    var crest = 'M0 264 L0 150 C180 70 330 60 480 92 C640 125 760 165 960 120 C1140 80 1290 60 1480 110 C1640 150 1780 150 1920 90 L1920 264 Z';
    var sprig = function (x, y, s) {
      var leaves = ''; for (var i = 0; i < 6; i++) { var yy = -18 - i * 12; leaves += '<path d="M0 ' + yy + ' q-14 -6 -20 -16 q12 2 20 12Z M0 ' + (yy - 4) + ' q14 -6 20 -16 q-12 2 -20 12Z" fill="#f0bfa5"/>'; }
      return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><path d="M0 0 C-2 -30 2 -60 0 -92" stroke="#e9ab8c" stroke-width="2.4" fill="none"/>' + leaves +
        '<g transform="translate(36 6)"><path d="M0 0 C-2 -26 2 -50 0 -76" stroke="#e9ab8c" stroke-width="2.4" fill="none"/>' + leaves.replace(/-1[0-9]/g, function (m) { return m; }) + '</g>' +
        '<ellipse cx="18" cy="4" rx="34" ry="7" fill="#b7bcbd"/></g>';
    };
    return '<svg class="ai-land" viewBox="0 0 1920 264" aria-hidden="true"><defs><linearGradient id="landg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6ead7"/><stop offset=".55" stop-color="var(--bg-base)"/></linearGradient></defs>' +
      '<path class="land-fill" d="' + crest + '" style="fill:url(#landg)"/>' + sprig(250, 96, 1) + sprig(760, 160, 1.15) + sprig(1300, 76, .95) + sprig(1700, 140, 1.05) + '</svg>';
  }
  function sunset() {   // Cebu sunset over the mountains — original illustration
    var birds = [[700, 520, 1.6], [430, 400, .6], [520, 360, .5], [1180, 300, .45]].map(function (b) {
      return '<path d="M' + b[0] + ' ' + b[1] + ' q' + (14 * b[2]) + ' ' + (-12 * b[2]) + ' ' + (30 * b[2]) + ' 0 q' + (16 * b[2]) + ' ' + (-14 * b[2]) + ' ' + (32 * b[2]) + ' 2" stroke="#1d1b26" stroke-width="' + (3 * b[2]) + '" fill="none" stroke-linecap="round"/>'; }).join('');
    return '<svg viewBox="0 0 1440 1088" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs>' +
      '<linearGradient id="ssky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fbde3"/><stop offset=".42" stop-color="#bcd3e4"/><stop offset=".62" stop-color="#f1d4a9"/><stop offset=".78" stop-color="#f6b65e"/><stop offset=".9" stop-color="#e7894e"/><stop offset="1" stop-color="#6c5a7a"/></linearGradient>' +
      '<filter id="sblur"><feGaussianBlur stdDeviation="6"/></filter></defs>' +
      '<rect width="1440" height="1088" fill="url(#ssky)"/>' +
      '<g filter="url(#sblur)" opacity=".55" fill="#fff4e2"><ellipse cx="300" cy="610" rx="420" ry="10"/><ellipse cx="980" cy="650" rx="520" ry="9"/><ellipse cx="640" cy="700" rx="600" ry="8" fill="#ffd9a6"/><ellipse cx="1200" cy="560" rx="300" ry="6"/></g>' +
      '<circle cx="1040" cy="860" r="70" fill="#ffe2a8" opacity=".85"/>' +
      '<path d="M0 900 L120 860 L220 880 L330 820 L460 870 L560 840 L700 880 L820 830 L930 870 L1060 815 L1180 860 L1300 830 L1440 870 L1440 1088 L0 1088Z" fill="#4a4566" opacity=".85"/>' +
      '<path d="M0 950 C200 920 360 960 560 940 S960 910 1160 940 S1360 930 1440 925 L1440 1088 L0 1088Z" fill="#2b2838"/>' +
      '<path d="M1180 1088 L1180 900 L1200 900 L1200 870 L1260 870 L1260 1088Z M1270 1088 L1270 930 L1310 930 L1310 1088Z" fill="#1d1b26"/>' + birds + '</svg>';
  }
  function mountains(seed) {   // tiny hike snapshots
    var pals = [['#9fd0f5', '#5d7a9c', '#2f4a63', '#ffe2a8'], ['#f6c37a', '#8b6a7f', '#4d3d58', '#fff1cc'], ['#bfe3d3', '#5c8f78', '#2f5a48', '#ffffff']][seed % 3];
    return '<svg viewBox="0 0 211 253" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="211" height="253" fill="' + pals[0] + '"/><circle cx="' + (60 + seed * 40) + '" cy="70" r="22" fill="' + pals[3] + '"/>' +
      '<path d="M0 190 L60 110 L95 150 L140 80 L211 170 L211 253 L0 253Z" fill="' + pals[1] + '"/><path d="M0 220 L70 170 L120 205 L170 160 L211 190 L211 253 L0 253Z" fill="' + pals[2] + '"/>' +
      '<path d="M140 80 L128 96 L140 92 L152 98Z" fill="#fff" opacity=".8"/></svg>';
  }
  function photo(p, i) { return p.image ? '<img src="' + esc(p.image) + '" alt="' + esc(p.alt) + '" draggable="false">' : window.coverArt({ palette: p.palette, motif: p.motif }, i + 2, 212, 299); }

  /* ---------- build ---------- */
  function build() {
    // intro
    $('.ai-scene').innerHTML = sunClouds() +
      '<div class="ai-content"><div class="ai-copy"><h1 class="ai-heading">' + esc(A.heading) + '</h1><div class="ai-body">' + A.bio.map(function (p) { return '<p>' + p + '</p>'; }).join('') + '</div></div>' +
      '<div class="ai-photos" aria-label="Photos — drag to move">' + A.polaroids.map(function (p, i) {
        return '<figure class="ai-polaroid p' + (i + 1) + '"><span class="ai-card"><span class="ai-photo" role="img" aria-label="' + esc(p.alt) + '">' + photo(p, i) + '</span></span></figure>'; }).join('') +
      '<span class="ai-photo-hint">Drag the photos</span>' +
      '<button type="button" class="ai-photos-reset" aria-label="Reset photo positions" title="Reset photos"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg></button></div></div>';
    // experience
    $('.about-exp').insertAdjacentHTML('afterbegin', land() + '<div class="about-exp-dim"></div>');
    $('.aexp-list').innerHTML = '<div class="aexp-divider"></div>' + A.jobs.map(function (j, i) {
      return '<div class="aexp-item' + (i === 0 && !mqMob.matches ? ' is-open' : '') + '"><button class="aexp-head" type="button" aria-expanded="' + (i === 0 && !mqMob.matches) + '">' +
        '<span class="aexp-company"><span class="aexp-name">' + esc(j.name) + '</span><span class="aexp-role">' + esc(j.role) + '</span></span>' +
        '<span class="aexp-meta"><span class="aexp-date">' + esc(j.date) + '</span><span class="aexp-toggle" aria-hidden="true"></span></span></button>' +
        '<div class="aexp-panel"><div class="aexp-panel-inner">' + (j.summary ? '<p>' + esc(j.summary) + '</p>' : '') +
        '<ul class="aexp-bullets">' + (j.bullets || []).map(function (b) { return '<li>' + esc(b) + '</li>'; }).join('') + '</ul></div></div></div><div class="aexp-divider"></div>';
    }).join('');
    // fun facts
    $('.aff-bg').innerHTML = sunset();
    var post = B[0], todo = F.todo || {}, song = F.song || {}, q = F.quote || {}, coded = F.coded || {};
    var cover = function (it) { return window.coverArt(it, 3, 300, 190); };
    var len = song.length || 213, fmt = function (s) { s = Math.max(0, Math.round(s)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };
    $('.about-fun-stage').innerHTML =
      '<div class="ff-card b1 pos-lt ff-hikes" tabindex="0" aria-label="' + esc((F.hikes || {}).label + ' ' + (F.hikes || {}).year) + '"><div class="ff-hikes-label"><span class="k">' + esc((F.hikes || {}).label) + '</span><span class="y">' + esc((F.hikes || {}).year) + '</span></div>' +
        '<div class="ff-photo h1">' + mountains(1) + '</div><div class="ff-photo h2">' + mountains(2) + '</div><div class="ff-photo h3">' + mountains(0) + '</div></div>' +
      '<div class="ff-card b1 pos-ct ff-wk" tabindex="0" aria-label="' + esc(todo.title) + '"><span class="ff-wk-day">' + esc(todo.day) + '</span><span class="ff-wk-dots"><i></i><i></i><i></i></span>' +
        '<div class="ff-wk-panel"><div class="ff-wk-inner"><p class="ff-wk-title">' + esc(todo.title) + '</p><div class="ff-wk-list">' +
        (todo.items || []).map(function (t) { return '<div class="r"><span class="cb"></span><span class="t">' + esc(t) + '</span></div>'; }).join('') + '</div></div></div></div>' +
      '<a class="ff-card pos-rt ff-song" href="' + esc(S.spotify || '#') + '" target="_blank" rel="noopener" aria-label="Open my playlist on Spotify">' +
        '<div class="ff-media">' + window.coverArt({ palette: ['#1b1b2f', '#1DB954', '#3a2d5c'], motif: 'orbit' }, 5, 305, 300) + '</div><div class="ff-song-grad"></div>' +
        '<div class="ff-song-pill"><span class="ff-vinyl"></span><span class="meta"><span class="a">' + esc(song.line) + ' <em>' + esc(song.em) + '</em></span><span class="b">' + esc(song.by) + '</span></span></div>' +
        '<div class="ff-song-player"><div class="ff-song-prog"><div class="ff-song-time"><span>0:00</span><span>-' + fmt(len) + '</span></div><div class="ff-song-bar"><span></span></div></div>' +
        '<div class="ff-song-ctrls" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M18 6v12l-8.5-6L18 6zM8 6v12H6V6h2z"/></svg><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7L8 5z"/></svg><svg viewBox="0 0 24 24"><path d="M6 6v12l8.5-6L6 6zM16 6h2v12h-2V6z"/></svg></div></div></a>' +
      '<div class="ff-card b1 pos-lb ff-quote" tabindex="0" aria-label="Quote: ' + esc(q.a + q.b + q.c) + '"><div class="ff-quote-grid"></div>' +
        '<svg class="ff-quote-mark" viewBox="0 0 96 96" aria-hidden="true"><path fill="#FFDA3F" d="M74.5 72h-21l8-16H52V24h32v29zM34.5 72h-21l8-16H12V24h32v29z"/></svg>' +
        '<p class="ff-quote-text"><span class="a">' + esc(q.a) + '</span><span class="b">' + esc(q.b) + '</span><span class="c">' + esc(q.c) + '</span></p><p class="ff-quote-cite">' + esc(q.cite) + '</p>' +
        '<div class="ff-quote-spine" aria-hidden="true"><i>1</i><i>2</i><i>3</i><i>4</i><i>5</i><i>6</i><i>7</i></div></div>' +
      (post ? '<a class="ff-card b1 pos-cb ff-blog" href="blog-' + post.slug + '.html" aria-label="Read the blog post: ' + esc(post.title) + '"><div class="ff-blog-img">' + cover(post) + '</div>' +
        '<p class="ff-blog-title">' + esc(post.title) + '</p><div class="ff-blog-foot"><span class="rl">Read Blog</span><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M7 4h9v9M16 4 5 15"/></svg></div><span class="ff-bookmark" aria-hidden="true"></span></a>' : '') +
      '<a class="ff-card pos-rb ff-coded" href="' + esc(coded.url) + '" target="_blank" rel="noopener" aria-label="' + esc(coded.kicker + ': ' + coded.title) + '">' +
        '<div class="ff-media"><img src="assets/img/og.png" alt="" draggable="false"></div>' +
        '<div class="ff-coded-panel"><span class="k">' + esc(coded.kicker) + '</span><span class="t">' + esc(coded.title) + '</span><div class="ff-coded-row"><div class="ff-avatars">' +
        [['#fc9073', 'H'], ['#5788b3', 'C'], ['#2f5d3a', 'J']].map(function (a) { return '<span class="av" style="background:' + a[0] + '">' + a[1] + '</span>'; }).join('') + '<span class="plus">' + esc(coded.plus) + '</span></div>' +
        '<span class="ff-play-btn"><span>' + esc(coded.cta) + '</span><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M7 4h9v9M16 4 5 15"/></svg></span></div></div></a>';
  }

  /* ---------- intro: fit 1440×1024 frame to the viewport + shrink on scroll ---------- */
  function initIntro() {
    var intro = $('.about-intro'), content = $('.ai-content'), scene = $('.ai-scene');
    function fit() {
      intro.style.setProperty('--pol-scale', Math.min(1, (innerWidth - 48) / 516).toFixed(4));
      var vh = innerHeight, s = Math.min(1, vh / 1024, innerWidth / 1440);
      intro.style.setProperty('--intro-scale', s.toFixed(4));
      var cTop = content.offsetTop, cH = content.offsetHeight, off = vh / 2 - (cTop + cH / 2) * s;
      intro.style.setProperty('--intro-offset', Math.max(0, Math.min(off, vh - 1024 * s)).toFixed(1) + 'px');
    }
    fit(); addEventListener('resize', fit); if (document.fonts) document.fonts.ready.then(fit);
    var last = null;
    Scroll.add(function (st) {
      if (mqMob.matches) return;
      var p = clamp(st.y / ((intro.offsetHeight || 1) * .8), 0, 1), e = 1 - Math.pow(1 - p, 3), sc = (1 - e * .12).toFixed(4);
      if (sc !== last) { scene.style.setProperty('--intro-scroll', sc); last = sc; }
    });
  }

  /* ---------- draggable polaroids ---------- */
  function initPolaroids() {
    var stage = $('.ai-photos'), cards = $$('.ai-polaroid', stage), reset = $('.ai-photos-reset', stage);
    var topZ = 5, pos = new Map(cards.map(function (c) { return [c, { x: 0, y: 0 }]; }));
    var BOUND = { left: 130, right: 130, top: 80, bottom: 120 };
    function paint(c, x, y, s) { c.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0) scale(' + s + ')'; }
    function clampBox(c, x, y) {
      var w = stage.clientWidth, h = stage.clientHeight;
      var minX = -BOUND.left - c.offsetLeft, maxX = w + BOUND.right - c.offsetLeft - c.offsetWidth, minY = -BOUND.top - c.offsetTop, maxY = h + BOUND.bottom - c.offsetTop - c.offsetHeight;
      return { x: clamp(x, Math.min(minX, maxX), Math.max(minX, maxX)), y: clamp(y, Math.min(minY, maxY), Math.max(minY, maxY)) };
    }
    cards.forEach(function (c) {
      var sx, sy, ox, oy, drag = false, pid = null;
      c.addEventListener('pointerdown', function (e) {
        if (e.button != null && e.button !== 0) return;
        drag = true; pid = e.pointerId; var p = pos.get(c); ox = p.x; oy = p.y; sx = e.clientX; sy = e.clientY;
        c.classList.remove('is-settling', 'is-dropping'); c.classList.add('is-dragging'); c.style.zIndex = ++topZ;
        paint(c, p.x, p.y, 1.04); c.setPointerCapture(pid); stage.classList.add('has-moved'); e.preventDefault();
      });
      c.addEventListener('pointermove', function (e) {
        if (!drag || e.pointerId !== pid) return;
        var s = stage.getBoundingClientRect().width / (stage.offsetWidth || 1) || 1;
        var q = clampBox(c, ox + (e.clientX - sx) / s, oy + (e.clientY - sy) / s); pos.set(c, q); paint(c, q.x, q.y, 1.04);
      });
      function end(e) {
        if (!drag || (e && e.pointerId !== pid)) return; drag = false;
        c.classList.remove('is-dragging'); c.classList.add('is-dropping'); var p = pos.get(c); paint(c, p.x, p.y, 1);
        c.addEventListener('transitionend', function () { c.classList.remove('is-dropping'); }, { once: true });
        if (pid != null && c.hasPointerCapture(pid)) c.releasePointerCapture(pid); pid = null;
      }
      c.addEventListener('pointerup', end); c.addEventListener('pointercancel', end);
    });
    reset.addEventListener('click', function () {
      cards.forEach(function (c) { c.classList.remove('is-dropping'); c.classList.add('is-settling'); paint(c, 0, 0, 1); pos.set(c, { x: 0, y: 0 }); });
      stage.classList.remove('has-moved');
      setTimeout(function () { cards.forEach(function (c) { c.classList.remove('is-settling'); }); }, 760);
    });
  }

  /* ---------- experience: single-open accordion, bottom pin + hold, recede dim ---------- */
  function initExperience() {
    var items = $$('.aexp-item'), exp = $('.about-exp'), stage = $('.about-exp-stage'), list = $('.aexp-list'), label = $('.aexp-label'), intro = $('.about-intro'), fun = $('.about-fun'), next = $('.about-edu') || fun, dim = $('.about-exp-dim');
    items.forEach(function (it) {
      $('.aexp-head', it).addEventListener('click', function () {
        var open = !it.classList.contains('is-open');
        items.forEach(function (o) { var t = o === it && open; o.classList.toggle('is-open', t); $('.aexp-head', o).setAttribute('aria-expanded', String(t)); });
      });
    });
    function pinBottom(el) { el.style.position = 'sticky'; el.style.top = Math.min(0, innerHeight - el.offsetHeight) + 'px'; }
    function unpin(el) { el.style.position = ''; el.style.top = ''; }
    function setHold(vh, h, k) { next.style.marginTop = h >= vh ? Math.round(vh * k) + 'px' : ''; }
    function fit() {
      if (mqMob.matches) {
        stage.style.height = ''; label.style.top = '';
        if (RM) { [intro, exp, fun].forEach(unpin); exp.style.minHeight = ''; next.style.marginTop = ''; return; }
        exp.style.minHeight = innerHeight + 'px'; pinBottom(intro); pinBottom(exp); setHold(innerHeight, exp.offsetHeight, .6); pinBottom(fun);
        return;
      }
      unpin(intro); unpin(fun); exp.style.position = ''; exp.style.minHeight = '';
      var vh = innerHeight, H = Math.max(vh, list.offsetTop + list.offsetHeight + 180);
      stage.style.height = H + 'px'; exp.style.top = Math.min(0, vh - H) + 'px'; setHold(vh, H, .9);
      var first = $('.aexp-item', list); label.style.top = (list.offsetTop + first.offsetTop + label.offsetWidth / 2) + 'px';
    }
    fit(); addEventListener('resize', fit); if (document.fonts) document.fonts.ready.then(fit);
    list.addEventListener('transitionend', function (e) { if (e.propertyName === 'max-height') fit(); });
    Scroll.add(function (st) {
      if (RM || mqMob.matches) { dim.style.opacity = 0; return; }
      var p = smooth((st.vh - next.getBoundingClientRect().top) / st.vh);
      dim.style.opacity = (.42 * p).toFixed(3);
    });
  }

  /* ---------- fun facts: stacked deck → grid, scaled to fit ---------- */
  function initFun() {
    var section = $('.about-fun'), stage = $('.about-fun-stage'), cards = $$('.ff-card', stage), flowTop = 0, last = null;
    function fit() {
      if (mqMob.matches) return;
      var minL = 1e9, minT = 1e9, maxR = -1e9, maxB = -1e9;
      cards.forEach(function (c) { var hw = c.offsetWidth / 2; minL = Math.min(minL, c.offsetLeft - hw); maxR = Math.max(maxR, c.offsetLeft + hw); minT = Math.min(minT, c.offsetTop); maxB = Math.max(maxB, c.offsetTop + c.offsetHeight); });
      var s = Math.max(.1, Math.min(1, (innerWidth - 40) / ((maxR - minL) || 1440), (innerHeight - 110) / ((maxB - minT) || 1088)));
      stage.style.setProperty('--ff-fit', s.toFixed(4));
    }
    function layout() {
      var cx = stage.offsetWidth / 2, cy = stage.offsetHeight / 2;
      cards.forEach(function (c, i) {
        c.style.setProperty('--dx', (cx - c.offsetLeft).toFixed(1) + 'px');
        c.style.setProperty('--dy', (cy - (c.offsetTop + c.offsetHeight / 2)).toFixed(1) + 'px');
        c.style.setProperty('--rot', ((i % 2 ? 1 : -1) * (2 + i)) + 'deg');
      });
    }
    fit(); layout();
    addEventListener('resize', function () { fit(); layout(); Scroll.kick(); });
    Scroll.add(function (st) {
      var o;
      if (RM || mqMob.matches) o = 1;
      else {
        var r = section.getBoundingClientRect();
        if (r.top > .5) flowTop = st.y + r.top; else if (!flowTop) flowTop = section.offsetTop;
        var start = flowTop - st.vh * .3, end = flowTop + st.vh * .7;
        o = smooth((st.y - start) / (end - start));
      }
      o = o.toFixed(4); if (o !== last) { stage.style.setProperty('--ff-open', o); last = o; }
    });
    // song card: sweep the progress bar once per hover
    var song = $('.ff-song');
    if (song && !RM) {
      var fill = $('.ff-song-bar span', song), times = $$('.ff-song-time span', song), TOTAL = (F.song || {}).length || 213, playing = false;
      var fmt = function (s) { s = Math.max(0, Math.round(s)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };
      var set = function (p) { fill.style.width = (p * 100) + '%'; times[0].textContent = fmt(p * TOTAL); times[1].textContent = '-' + fmt(TOTAL - p * TOTAL); };
      song.addEventListener('mouseenter', function () {
        if (playing) return; playing = true; var t0 = 0;
        requestAnimationFrame(function fr(t) { if (!t0) t0 = t; var p = Math.min(1, (t - t0) / 1500); set(p); if (p < 1) requestAnimationFrame(fr); else { playing = false; setTimeout(function () { set(0); }, 550); } });
      });
    }
  }


  /* ======================= EDUCATION — journey map ======================= */
  var EDU = window.EDUCATION || [];
  /* --- the little you: 3D-cartoon style (big eyes, soft shading), feet at (0,0) --- */
  var HAIR = '#6b4228', HAIR_HI = '#8f5d3b', SKIN_SH = '#e7ac88';
  function backHair(cy, o) {
    var out = '';
    if (o.longHair) out += '<path d="M-17 ' + (cy - 4) + ' C-22 ' + (cy + 14) + ' -20 ' + (cy + 34) + ' -14 ' + (cy + 44) + ' L14 ' + (cy + 44) + ' C20 ' + (cy + 34) + ' 22 ' + (cy + 14) + ' 17 ' + (cy - 4) + ' Z" fill="url(#eduHair)"/>' +
      '<path d="M-17 ' + (cy + 20) + ' q-3 8 1 14 M17 ' + (cy + 20) + ' q3 8 -1 14" stroke="' + HAIR_HI + '" stroke-width="2" fill="none" opacity=".7"/>';
    if (o.pony) out += '<path d="M10 ' + (cy - 12) + ' C26 ' + (cy - 14) + ' 28 ' + (cy + 6) + ' 20 ' + (cy + 18) + ' C24 ' + (cy + 4) + ' 20 ' + (cy - 6) + ' 9 ' + (cy - 6) + 'Z" fill="url(#eduHair)"/>';
    return out;
  }
  function face(cy, o) {   // head centred at (0, cy), radius 16 (front layer)
    var r = 16, out = '';
    if (o.buns) out += '<circle cx="-13" cy="' + (cy - 14) + '" r="8" fill="url(#eduHair)"/><circle cx="13" cy="' + (cy - 14) + '" r="8" fill="url(#eduHair)"/>' +
      '<circle cx="-8" cy="' + (cy - 19) + '" r="2.6" fill="#e9dcc0" stroke="#c9b48a" stroke-width=".6"/><circle cx="8" cy="' + (cy - 19) + '" r="2.6" fill="#e9dcc0" stroke="#c9b48a" stroke-width=".6"/>';
    out += '<circle cx="-15.5" cy="' + (cy + 2) + '" r="3.4" fill="' + SKIN_SH + '"/><circle cx="15.5" cy="' + (cy + 2) + '" r="3.4" fill="' + SKIN_SH + '"/>' +
      '<circle cx="0" cy="' + cy + '" r="' + r + '" fill="url(#eduSkin)"/>' +
      // fringe: side-swept bangs
      '<path d="M-16 ' + (cy - 1) + ' C-17 ' + (cy - 16) + ' -6 ' + (cy - 20) + ' 2 ' + (cy - 18) + ' C12 ' + (cy - 17) + ' 18 ' + (cy - 9) + ' 16 ' + (cy - 1) + ' C11 ' + (cy - 9) + ' 4 ' + (cy - 10) + ' -2 ' + (cy - 8) + ' C-7 ' + (cy - 6) + ' -12 ' + (cy - 5) + ' -16 ' + (cy - 1) + 'Z" fill="url(#eduHair)"/>' +
      '<path d="M-6 ' + (cy - 16) + ' q6 -3 12 0" stroke="' + HAIR_HI + '" stroke-width="1.6" fill="none" opacity=".8"/>' +
      // brows + big eyes
      '<path d="M-10 ' + (cy - 3) + ' q4 -2.5 7 -.5 M3 ' + (cy - 3.5) + ' q3.5 -2 7 .5" stroke="#5a3a24" stroke-width="1.3" fill="none" stroke-linecap="round"/>' +
      [-6, 6].map(function (x) { return '<ellipse cx="' + x + '" cy="' + (cy + 2.5) + '" rx="3.6" ry="4.3" fill="#fff"/><circle cx="' + x + '" cy="' + (cy + 3) + '" r="2.9" fill="#7a4b2a"/><circle cx="' + x + '" cy="' + (cy + 3) + '" r="1.5" fill="#2a1a10"/><circle cx="' + (x + 1.1) + '" cy="' + (cy + 1.8) + '" r=".9" fill="#fff"/><path d="M' + (x - 3.8) + ' ' + (cy + .2) + ' q3.8 -3 7.6 0" stroke="#2a1a10" stroke-width="1.1" fill="none"/>'; }).join('') +
      '<path d="M0 ' + (cy + 5) + ' q-1 2 .8 2.4" stroke="' + SKIN_SH + '" stroke-width="1" fill="none"/>' +
      '<path d="M-3.4 ' + (cy + 9.2) + ' q3.4 2.6 6.8 0" stroke="#b5584a" stroke-width="1.3" fill="#e98b7b" stroke-linecap="round"/>' +
      '<ellipse cx="-10.5" cy="' + (cy + 7.5) + '" rx="3" ry="1.9" fill="#f29a8c" opacity=".55"/><ellipse cx="10.5" cy="' + (cy + 7.5) + '" rx="3" ry="1.9" fill="#f29a8c" opacity=".55"/>';
    if (o.glasses) out += '<g fill="none" stroke="#2b2420" stroke-width="1.3"><circle cx="-6" cy="' + (cy + 2.6) + '" r="5.2"/><circle cx="6" cy="' + (cy + 2.6) + '" r="5.2"/><path d="M-.8 ' + (cy + 2) + ' h1.6 M-11.2 ' + (cy + 1.6) + ' l-4.2 -1 M11.2 ' + (cy + 1.6) + ' l4.2 -1"/></g>';
    if (o.cap) out += '<path d="M-20 ' + (cy - 14) + ' L0 ' + (cy - 22) + ' L20 ' + (cy - 14) + ' L0 ' + (cy - 6) + 'Z" fill="#26243a"/><path d="M-11 ' + (cy - 11) + ' v4 q11 5 22 0 v-4" fill="#1d1b2c"/><path d="M14 ' + (cy - 12) + ' v12" stroke="#ffda3f" stroke-width="1.8"/><circle cx="14" cy="' + cy + '" r="2.2" fill="#ffda3f"/>';
    return out;
  }
  function legs(len, color, sock, shoe, wide) {
    var w = wide ? 8 : 7;
    function leg(x, cls) { return '<g class="leg ' + cls + '"><rect x="' + x + '" y="' + (-len) + '" width="' + w + '" height="' + len + '" rx="3.5" fill="' + color + '"/>' + (sock ? '<rect x="' + x + '" y="-11" width="' + w + '" height="6" fill="' + sock + '"/>' : '') +
      '<path d="M' + (x - 2) + ' -5 h' + (w + 5) + ' q2 0 2 2.5 v1.5 h-' + (w + 7) + 'z" fill="' + shoe + '"/><path d="M' + (x - 2) + ' -.8 h' + (w + 7) + '" stroke="#f3ead2" stroke-width="1.2"/></g>'; }
    return leg(-8.5, 'l') + leg(1.5, 'r');
  }
  var LOOKS = {
    // Elementary — buns, yellow coat, mint scarf, backpack, teal leggings, brown boots
    child: function () {
      var t = -18; return '<rect x="-17" y="' + (t - 22) + '" width="11" height="20" rx="4" fill="#c9a56f"/>' + legs(18, '#5fb6a8', null, '#9a6232', true) +
        '<path d="M-13 ' + (t - 24) + ' h26 l3 ' + 26 + ' h-32z" fill="url(#eduCoat)"/><path d="M0 ' + (t - 24) + ' v24" stroke="#d9a536" stroke-width="1"/>' +
        '<rect x="-10" y="' + (t - 10) + '" width="7" height="5" rx="1.5" fill="#e5b33e" stroke="#c9952e" stroke-width=".6"/><rect x="3" y="' + (t - 10) + '" width="7" height="5" rx="1.5" fill="#e5b33e" stroke="#c9952e" stroke-width=".6"/>' +
        '<rect x="-19" y="' + (t - 22) + '" width="6" height="17" rx="3" fill="url(#eduCoat)" transform="rotate(8 -16 ' + (t - 22) + ')"/><rect x="13" y="' + (t - 22) + '" width="6" height="17" rx="3" fill="url(#eduCoat)" transform="rotate(-8 16 ' + (t - 22) + ')"/>' +
        '<path d="M-11 ' + (t - 26) + ' q11 7 22 0 q1 4 -2 6 q-9 4 -18 0 q-3 -2 -2 -6z" fill="#9fdcc8"/><path d="M5 ' + (t - 22) + ' l3 9 l-5 1z" fill="#8ccfb9"/>' +
        face(t - 42, { buns: true });
    },
    // Junior High — ponytail, white blouse, navy ribbon tie, navy skirt, socks, backpack
    teen: function () {
      var t = -24; return backHair(t - 38, { pony: true }) + '<rect x="-17" y="' + (t - 22) + '" width="11" height="20" rx="4" fill="#1f3b6d"/>' + legs(24, '#f2c6a5', '#ffffff', '#2b2420') +
        '<path d="M-13 ' + (t + 2) + ' h26 l4 9 h-34z" fill="#1f3b6d"/><rect x="-12" y="' + (t - 22) + '" width="24" height="25" rx="8" fill="#fbfbf8"/>' +
        '<path d="M-4 ' + (t - 21) + ' l4 4 l4 -4 l-1 9 l-3 -2 l-3 2z" fill="#1f3b6d"/>' +
        '<rect x="-17" y="' + (t - 20) + '" width="6" height="18" rx="3" fill="#fbfbf8"/><rect x="11" y="' + (t - 20) + '" width="6" height="18" rx="3" fill="#fbfbf8"/>' +
        '<circle cx="-14" cy="' + (t - 1) + '" r="3" fill="#f2c6a5"/><circle cx="14" cy="' + (t - 1) + '" r="3" fill="#f2c6a5"/>' + face(t - 38, { pony: true });
    },
    // Senior High — half-up hair, mustard cardigan over white, jeans, holding books
    shs: function () {
      var t = -25; return backHair(t - 40, { longHair: true }) + legs(25, '#5b7fae', null, '#f3ead2') +
        '<rect x="-12" y="' + (t - 24) + '" width="24" height="27" rx="8" fill="#e3a83a"/><path d="M-4 ' + (t - 24) + ' l4 10 l4 -10z" fill="#fbfbf8"/><path d="M0 ' + (t - 14) + ' v17" stroke="#c98d24" stroke-width="1"/>' +
        '<rect x="-17" y="' + (t - 22) + '" width="6" height="19" rx="3" fill="#e3a83a"/><rect x="11" y="' + (t - 22) + '" width="6" height="15" rx="3" fill="#e3a83a"/>' +
        '<g transform="translate(9 ' + (t - 12) + ') rotate(-8)"><rect x="0" y="0" width="16" height="5" rx="1" fill="#5788b3"/><rect x="1" y="-5" width="15" height="5" rx="1" fill="#fc9073"/><rect x="0" y="-10" width="14" height="5" rx="1" fill="#9cbf52"/></g>' +
        '<circle cx="-14" cy="' + (t - 2) + '" r="3" fill="#f2c6a5"/>' + face(t - 40, { longHair: true });
    },
    // College — graduation cap & gown with a gold stole, diploma
    grad: function () {
      var t = -24; return backHair(t - 40, { longHair: true, cap: true }) + legs(24, '#2b2420', null, '#2b2420') +
        '<path d="M-14 ' + (t - 24) + ' h28 l6 ' + 40 + ' h-40z" fill="url(#eduGown)"/><path d="M-6 ' + (t - 24) + ' l-3 34 h5 l4 -30z M6 ' + (t - 24) + ' l3 34 h-5 l-4 -30z" fill="#ffda3f"/>' +
        '<path d="M-17 ' + (t - 22) + ' l-4 22 h7 l3 -20z" fill="#26243a"/><path d="M17 ' + (t - 22) + ' l2 14 h-6 l-1 -12z" fill="#26243a"/>' +
        '<rect x="12" y="' + (t - 10) + '" width="17" height="6" rx="3" fill="#fbf5e8" stroke="#c9b48a" stroke-width=".7"/><rect x="19" y="' + (t - 10) + '" width="3" height="6" fill="#e8402e"/>' + face(t - 40, { longHair: true, cap: true });
    },
    // Now — long wavy hair, round glasses, grey blazer over white top, arms crossed, watch
    now: function () {
      var t = -26; return backHair(t - 42, { longHair: true, glasses: true }) + legs(26, '#3a3d45', null, '#2b2420') +
        '<rect x="-13" y="' + (t - 26) + '" width="26" height="29" rx="8" fill="url(#eduBlazer)"/><path d="M-5 ' + (t - 26) + ' l5 13 l5 -13z" fill="#f4f1ec"/>' +
        '<path d="M-6 ' + (t - 26) + ' l6 14 l-3 2z M6 ' + (t - 26) + ' l-6 14 l3 2z" fill="#5d6068"/><rect x="-12" y="' + (t + 1) + '" width="24" height="3" fill="#2b2420"/>' +
        '<path d="M-16 ' + (t - 22) + ' q-4 12 4 16 h22 q4 -1 2 -5 h-18 q-3 -2 -2 -11z" fill="url(#eduBlazer)"/><path d="M16 ' + (t - 22) + ' q4 10 -2 14 h-18 q-4 0 -2 -5 h14 q2 -2 1 -9z" fill="#6d7079"/>' +
        '<circle cx="-11" cy="' + (t - 7) + '" r="2.6" fill="#f2c6a5"/><circle cx="12" cy="' + (t - 11) + '" r="2.6" fill="#f2c6a5"/><rect x="5" y="' + (t - 12.5) + '" width="3" height="3.4" rx=".8" fill="#c9b48a" stroke="#2b2420" stroke-width=".5"/>' +
        face(t - 42, { longHair: true, glasses: true });
    }
  };
  function person(k) { return (LOOKS[k] || LOOKS.now)(); }
  function tree(x, y, s) { return '<g transform="translate(' + x + ' ' + y + ') scale(' + (s || 1) + ')"><rect x="-2.5" y="-6" width="5" height="14" fill="#8a6a4f"/><circle cx="0" cy="-16" r="14" fill="#9cbf52"/><circle cx="-8" cy="-10" r="9" fill="#7fa65a"/></g>'; }
  function palm(x, y) { return '<g transform="translate(' + x + ' ' + y + ')"><path d="M0 0 q-3 -22 3 -44" stroke="#8a6a4f" stroke-width="4" fill="none"/><g fill="#5c8f3a"><path d="M3 -44 q-20 -6 -30 6 q16 -4 30 -6z"/><path d="M3 -44 q20 -8 30 4 q-16 -4 -30 -4z"/><path d="M3 -44 q-6 -18 -22 -20 q12 8 22 20z"/><path d="M3 -44 q10 -18 26 -16 q-14 4 -26 16z"/></g></g>'; }
  var LANDMARKS = [
    function (x, y) { return '<g transform="translate(' + x + ' ' + y + ')"><rect x="-26" y="-34" width="52" height="34" fill="#fff9f1" stroke="#2b2b2b" stroke-width="2"/><path d="M-32 -32 L0 -56 L32 -32Z" fill="#fc9073" stroke="#2b2b2b" stroke-width="2"/><rect x="-6" y="-18" width="12" height="18" fill="#5788b3"/><circle cx="0" cy="-42" r="4" fill="#ffda3f"/><path d="M30 -34 v-34" stroke="#2b2b2b" stroke-width="2"/><path d="M30 -68 h16 l-4 6 l4 6 h-16z" fill="#e8402e"/></g>'; },
    function (x, y) { return '<g transform="translate(' + x + ' ' + y + ')"><rect x="-34" y="-52" width="68" height="52" fill="#fff9f1" stroke="#2b2b2b" stroke-width="2"/><rect x="-38" y="-58" width="76" height="8" fill="#1f3b6d"/>' + [-24, -8, 8, 24].map(function (wx) { return '<rect x="' + (wx - 5) + '" y="-44" width="10" height="9" fill="#9fd0f5"/><rect x="' + (wx - 5) + '" y="-26" width="10" height="9" fill="#9fd0f5"/>'; }).join('') + '<rect x="-6" y="-14" width="12" height="14" fill="#1f3b6d"/></g>'; },
    function (x, y) { return '<g transform="translate(' + x + ' ' + y + ')"><rect x="-30" y="-40" width="60" height="40" rx="4" fill="#fff9f1" stroke="#2b2b2b" stroke-width="2"/><rect x="-30" y="-46" width="60" height="8" rx="3" fill="#fc9073"/><g transform="translate(18 -6)"><rect x="-14" y="-8" width="28" height="7" fill="#5788b3"/><rect x="-12" y="-15" width="24" height="7" fill="#ffda3f"/><rect x="-10" y="-22" width="20" height="7" fill="#9cbf52"/></g><rect x="-22" y="-30" width="16" height="12" fill="#9fd0f5"/></g>'; },
    function (x, y) { return '<g transform="translate(' + x + ' ' + y + ')"><rect x="-44" y="-38" width="88" height="38" fill="#fff9f1" stroke="#2b2b2b" stroke-width="2"/><path d="M-50 -38 h100 l-50 -16z" fill="#eee8d2" stroke="#2b2b2b" stroke-width="2"/><path d="M-16 -54 a16 16 0 0 1 32 0z" fill="#ffda3f" stroke="#2b2b2b" stroke-width="2"/>' + [-32, -16, 0, 16, 32].map(function (cx) { return '<rect x="' + (cx - 3) + '" y="-34" width="6" height="30" fill="#e7dfcd"/>'; }).join('') + '</g>' + palm(x + 60, y) + palm(x - 58, y + 2); },
    function (x, y) { return '<g transform="translate(' + x + ' ' + y + ')"><rect x="-34" y="-20" width="68" height="6" rx="2" fill="#8a6a4f"/><rect x="-30" y="-14" width="5" height="14" fill="#8a6a4f"/><rect x="25" y="-14" width="5" height="14" fill="#8a6a4f"/><rect x="-16" y="-40" width="30" height="20" rx="2" fill="#3b3f4a"/><rect x="-14" y="-38" width="26" height="16" rx="1" fill="#71b7f4"/><rect x="18" y="-30" width="8" height="10" rx="2" fill="#fff9f1" stroke="#2b2b2b"/><path d="M-26 -20 q-2 -16 6 -22" stroke="#5c8f3a" stroke-width="3" fill="none"/><circle cx="-20" cy="-42" r="5" fill="#9cbf52"/></g>'; }
  ];
  function eduMapSVG() {
    var road = 'M95 560 C200 560 230 470 300 450 C390 425 420 520 520 500 C640 476 610 370 530 330 C455 292 470 212 560 190 C660 166 720 262 800 232 C870 206 860 128 905 100';
    var grid = ''; for (var gx = 0; gx <= 1000; gx += 40) grid += '<path d="M' + gx + ' 0V640" stroke="#efe4cd" stroke-width="1"/>'; for (var gy = 0; gy <= 640; gy += 40) grid += '<path d="M0 ' + gy + 'H1000" stroke="#efe4cd" stroke-width="1"/>';
    return '<svg viewBox="0 0 1000 640" role="img" aria-label="Map of my education journey"><defs><linearGradient id="edusea" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9fd0f5"/><stop offset="1" stop-color="#5aa9e6"/></linearGradient>' +
      '<radialGradient id="eduSkin" cx=".4" cy=".35" r=".75"><stop offset="0" stop-color="#fbdcc4"/><stop offset=".7" stop-color="#f2c6a5"/><stop offset="1" stop-color="#e3a985"/></radialGradient>' +
      '<linearGradient id="eduHair" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8f5d3b"/><stop offset="1" stop-color="#5a361f"/></linearGradient>' +
      '<linearGradient id="eduCoat" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffd76a"/><stop offset="1" stop-color="#e8ae35"/></linearGradient>' +
      '<linearGradient id="eduBlazer" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8a8d95"/><stop offset="1" stop-color="#5b5e66"/></linearGradient>' +
      '<linearGradient id="eduGown" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3a3852"/><stop offset=".5" stop-color="#26243a"/><stop offset="1" stop-color="#1b1a2a"/></linearGradient></defs>' +
      '<rect width="1000" height="640" fill="#fbf5e8"/>' + grid +
      '<path d="M1000 300 C930 330 900 420 940 470 C980 520 950 600 1000 640Z" fill="url(#edusea)"/><path d="M948 380 q10 -6 20 0 M958 470 q10 -6 20 0 M944 560 q10 -6 20 0" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round"/>' +
      '<path d="M40 210 L110 120 L150 170 L200 100 L270 210Z" fill="#cfd8b8"/><path d="M200 100 l-14 18 l14 -4 l14 6z" fill="#fff"/>' +
      '<g transform="translate(70 70)"><circle r="26" fill="#fff9f1" stroke="#2b2b2b" stroke-width="1.5"/><path d="M0 -22 L6 0 L0 22 L-6 0Z" fill="#fc9073"/><path d="M-22 0 L0 -5 L22 0 L0 5Z" fill="#e7dfcd"/><text y="-30" text-anchor="middle" font-size="12" font-family="Space Grotesk" fill="#2b2b2b">N</text></g>' +
      [[150, 420], [400, 600], [690, 560], [620, 120], [360, 260], [760, 380], [240, 330], [470, 90], [860, 600]].map(function (t, i) { return tree(t[0], t[1], .8 + (i % 3) * .15); }).join('') +
      '<text x="955" y="430" font-family="JetBrains Mono" font-size="12" fill="#2f6f9c" transform="rotate(-70 955 430)">CEBU STRAIT</text>' +
      '<path class="edu-road-base" d="' + road + '"/><path class="edu-road-trail" d="' + road + '"/><path class="edu-road-done" id="edu-road-done" d="' + road + '"/>' +
      '<path id="edu-road" d="' + road + '" fill="none" stroke="none"/><g class="edu-landmarks"></g><g class="edu-pins"></g>' +
      '<g class="edu-avatar"><g class="pos"><g class="flip"><ellipse class="shadow" cx="0" cy="2" rx="16" ry="4"/><g class="bob">' +
      Object.keys(LOOKS).map(function (k) { return '<g class="look look-' + k + '">' + person(k) + '</g>'; }).join('') + '</g></g></g></g></svg>';
  }
  function eduCardHTML(e, i, n) {
    return '<p class="edu-k">' + String(i + 1).padStart(2, '0') + ' · ' + esc(e.level) + '</p><h3 class="edu-school">' + esc(e.school) + '</h3><p class="edu-meta">' + esc(e.years) + ' · ' + esc(e.place) + '</p>' +
      '<p class="edu-note">' + esc(e.note) + '</p><div class="edu-tags">' + (e.tags || []).map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</div>';
  }
  function initEducation() {
    var sec = $('.about-edu'); if (!sec || !EDU.length) return;
    var n = EDU.length;
    sec.innerHTML = '<svg class="edu-crest" viewBox="0 0 1440 72" preserveAspectRatio="none" aria-hidden="true"><path d="M0 72 L0 34 Q90 10 180 34 T360 34 T540 34 T720 34 T900 34 T1080 34 T1260 34 T1440 34 L1440 72Z"/></svg>' +
      '<div class="edu-stage"><div class="edu-side"><p class="edu-eyebrow">Education</p><h2 class="edu-title">The road that shaped me</h2>' +
      '<div class="edu-card" aria-live="polite"><div class="edu-card-inner"></div></div>' +
      '<div class="edu-steps-wrap"><ol class="edu-steps">' + EDU.map(function (e, i) { return '<li><button type="button" class="edu-step" data-i="' + i + '"><span class="n">' + (i + 1) + '</span><span>' + esc(e.level) + '</span><span class="y">' + esc(e.years) + '</span></button></li>'; }).join('') + '</ol></div></div>' +
      '<div class="edu-map-wrap"><div class="edu-map">' + eduMapSVG() + '</div><span class="edu-hint">Scroll or tap a pin</span></div>' +
      '<div class="edu-list">' + EDU.map(function (e, i) { return '<article class="edu-card" data-i="' + i + '"><div class="edu-card-inner">' + eduCardHTML(e, i, n) + '</div></article>'; }).join('') + '</div></div>';
    var road = $('#edu-road', sec), done = $('#edu-road-done', sec), L = road.getTotalLength();
    done.style.strokeDasharray = L; done.style.strokeDashoffset = L;
    var pinLen = EDU.map(function (_, i) { return L * i / (n - 1); });
    var pins = pinLen.map(function (l) { return road.getPointAtLength(l); });
    // landmarks beside each pin, then the numbered pins
    $('.edu-landmarks', sec).innerHTML = pins.map(function (p, i) { var side = i % 2 ? -1 : 1; return (LANDMARKS[i] || LANDMARKS[LANDMARKS.length - 1])(p.x + side * 78, p.y - 18); }).join('');
    $('.edu-pins', sec).innerHTML = pins.map(function (p, i) {
      var w = EDU[i].level.length * 8 + 22;
      return '<g class="edu-pin" data-i="' + i + '" tabindex="0" role="button" aria-label="' + esc(EDU[i].level + ', ' + EDU[i].years) + '" transform="translate(' + p.x.toFixed(1) + ' ' + p.y.toFixed(1) + ')">' +
        '<circle class="pulse" r="15"/><circle class="dot" r="14"/><text>' + (i + 1) + '</text>' +
        '<g class="tag"><rect x="' + (-w / 2) + '" y="-50" width="' + w + '" height="26" rx="13"/><text y="-37">' + esc(EDU[i].level) + '</text></g></g>'; }).join('');
    var av = $('.edu-avatar', sec), pos = $('.pos', av), flip = $('.flip', av), looks = $$('.look', av);
    var card = $('.edu-side .edu-card', sec), cardIn = $('.edu-side .edu-card-inner', sec), steps = $$('.edu-step', sec), pinEls = $$('.edu-pin', sec), listCards = $$('.edu-list .edu-card', sec);
    var cur = -1, len = 0, facing = 1, walkT = null;
    function place(l) {
      l = clamp(l, 0, L); var p = road.getPointAtLength(l), q = road.getPointAtLength(Math.min(L, l + 2)), b = road.getPointAtLength(Math.max(0, l - 2));
      var dx = q.x - b.x; if (Math.abs(dx) > .3) facing = dx < 0 ? -1 : 1;
      pos.setAttribute('transform', 'translate(' + p.x.toFixed(1) + ' ' + (p.y - 4).toFixed(1) + ') scale(1.55)'); flip.setAttribute('transform', 'scale(' + facing + ' 1)');
      done.style.strokeDashoffset = (L - l).toFixed(1);
      if (Math.abs(l - len) > .5) { av.classList.add('walking'); clearTimeout(walkT); walkT = setTimeout(function () { av.classList.remove('walking'); }, 160); }
      len = l;
    }
    function setActive(i) {
      if (i === cur) return; cur = i; var e = EDU[i];
      looks.forEach(function (g) { g.classList.toggle('on', g.classList.contains('look-' + (e.look || 'now'))); });
      pinEls.forEach(function (g, k) { g.classList.toggle('active', k === i); g.classList.toggle('done', k < i); });
      steps.forEach(function (s2, k) { if (k === i) s2.setAttribute('aria-current', 'step'); else s2.removeAttribute('aria-current'); s2.classList.toggle('done', k < i); });
      listCards.forEach(function (c, k) { c.classList.toggle('active', k === i); });
      card.classList.add('swap'); setTimeout(function () { cardIn.innerHTML = eduCardHTML(e, i, n); card.classList.remove('swap'); }, cur === i && cardIn.innerHTML ? 180 : 0);
    }
    var tween = null;
    function walkTo(i) {
      setActive(i); cancelAnimationFrame(tween);
      var from = len, to = pinLen[i], t0 = 0, D = RM ? 0 : Math.min(1400, 300 + Math.abs(to - from) * 1.6);
      if (!D) { place(to); return; }
      tween = requestAnimationFrame(function fr(t) { if (!t0) t0 = t; var k = Math.min(1, (t - t0) / D), e2 = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; place(from + (to - from) * e2); if (k < 1) tween = requestAnimationFrame(fr); });
    }
    // desktop: progress through the section's scroll runway drives the walk; section bottom-pins so fun facts slides over it
    var side = $('.edu-side', sec), mapWrap = $('.edu-map-wrap', sec), stageEl = $('.edu-stage', sec);
    function fit() {
      side.style.transform = ''; mapWrap.style.maxWidth = '';
      if (mqMob.matches) { sec.style.position = ''; sec.style.top = ''; return; }
      sec.style.position = 'sticky'; sec.style.top = Math.min(0, innerHeight - sec.offsetHeight) + 'px';
      // keep everything (incl. the last "Now" step) inside the viewport on short screens
      var cs = getComputedStyle(stageEl), avail = innerHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
      var h = side.scrollHeight; if (h > avail) { side.style.transformOrigin = 'left center'; side.style.transform = 'scale(' + (avail / h).toFixed(3) + ')'; }
      mapWrap.style.maxWidth = Math.max(320, avail * 1000 / 640) + 'px';
    }
    fit(); addEventListener('resize', fit); if (document.fonts) document.fonts.ready.then(fit);
    // natural (un-pinned) document top: everything before it in <main> + its hold margin
    function natTop() {
      var m = sec.parentElement, y = m.getBoundingClientRect().top + scrollY + (parseFloat(getComputedStyle(sec).marginTop) || 0);
      for (var el = m.firstElementChild; el && el !== sec; el = el.nextElementSibling) y += el.offsetHeight;
      return y;
    }
    var flowTop = 0;
    Scroll.add(function (st) {
      if (mqMob.matches) return;
      flowTop = natTop();
      var run = sec.offsetHeight - st.vh, p = clamp((st.y - flowTop) / (run * .9), 0, 1);
      cancelAnimationFrame(tween); place(p * L); setActive(Math.round(p * (n - 1)));
    });
    function jump(i) {
      if (mqMob.matches) { walkTo(i); var c = listCards[i]; if (c) c.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'center' }); return; }
      var top = natTop(), run = sec.offsetHeight - innerHeight;
      scrollTo({ top: top + run * .9 * (i / (n - 1)) + 2, behavior: RM ? 'auto' : 'smooth' });
    }
    steps.forEach(function (b) { b.addEventListener('click', function () { jump(+b.dataset.i); }); });
    pinEls.forEach(function (g) {
      g.addEventListener('click', function () { jump(+g.dataset.i); });
      g.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); jump(+g.dataset.i); } });
    });
    // mobile: the card in view decides where the little you walks
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) { if (!mqMob.matches) return; es.forEach(function (en) { if (en.isIntersecting) walkTo(+en.target.dataset.i); }); }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
      listCards.forEach(function (c) { io.observe(c); });
    }
    place(0); setActive(0);
  }

  build(); initEducation(); initIntro(); initPolaroids(); initExperience(); initFun();
  if (window.updateNavContrast) window.updateNavContrast();
})();
