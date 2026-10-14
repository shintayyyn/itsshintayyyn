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
    var items = $$('.aexp-item'), exp = $('.about-exp'), stage = $('.about-exp-stage'), list = $('.aexp-list'), label = $('.aexp-label'), intro = $('.about-intro'), fun = $('.about-fun'), dim = $('.about-exp-dim');
    items.forEach(function (it) {
      $('.aexp-head', it).addEventListener('click', function () {
        var open = !it.classList.contains('is-open');
        items.forEach(function (o) { var t = o === it && open; o.classList.toggle('is-open', t); $('.aexp-head', o).setAttribute('aria-expanded', String(t)); });
      });
    });
    function pinBottom(el) { el.style.position = 'sticky'; el.style.top = Math.min(0, innerHeight - el.offsetHeight) + 'px'; }
    function unpin(el) { el.style.position = ''; el.style.top = ''; }
    function setHold(vh, h, k) { fun.style.marginTop = h >= vh ? Math.round(vh * k) + 'px' : ''; }
    function fit() {
      if (mqMob.matches) {
        stage.style.height = ''; label.style.top = '';
        if (RM) { [intro, exp, fun].forEach(unpin); exp.style.minHeight = ''; fun.style.marginTop = ''; return; }
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
      var p = smooth((st.vh - fun.getBoundingClientRect().top) / st.vh);
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

  build(); initIntro(); initPolaroids(); initExperience(); initFun();
  if (window.updateNavContrast) window.updateNavContrast();
})();
