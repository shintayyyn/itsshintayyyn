/* ==========================================================================
   HOME — nav · theme · cursor · hero · intro · work + plane · testimonials · footer garden
   ========================================================================== */
(function () {
  var S = window.SITE, P = window.PROJECTS, T = window.TESTIMONIALS, A = window.ART;
  var $ = U.$, $$ = U.$$, esc = U.esc, clamp = U.clamp, smooth = U.smooth, RM = U.RM;
  var FINE = matchMedia('(hover:hover) and (pointer:fine)').matches;
  var mqDesk = matchMedia('(min-width:1101px)'), mqMob = matchMedia('(max-width:640px)');
  var isNight = function () { return document.body.classList.contains('night'); };

  /* ======================= NAV ======================= */
  var SUN_IC = '<svg class="sun-ic" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" fill="#f5a623"/>' +
    [0, 1, 2, 3, 4, 5, 6, 7].map(function (i) { var a = i * Math.PI / 4; return '<circle cx="' + (12 + Math.cos(a) * 8.4).toFixed(2) + '" cy="' + (12 + Math.sin(a) * 8.4).toFixed(2) + '" r="1.15" fill="#f5a623"/>'; }).join('') + '</svg>';
  var MOON_IC = '<svg class="moon-ic" viewBox="0 0 24 24" aria-hidden="true"><path fill="#f2ead6" d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/></svg>';
  var WAVE_D = (function () { var d = 'M-20 20'; for (var x = -20; x < 60; x += 10) d += ' Q' + (x + 5) + ' ' + (x % 20 === 0 ? 11.1 : 28.9) + ' ' + (x + 10) + ' 20'; return d; })();
  function navHTML() {
    return '<nav id="nav" class="nav-on-dark" aria-label="Main">' +
      '<div class="nav-side"><img class="pin" src="assets/img/pin.svg" width="14" height="20" alt=""><span class="nav-loc">' + esc(S.location) + '</span><span class="nav-meta" aria-live="off"><span class="nav-time"></span><span class="wx"></span></span></div>' +
      '<div class="nav-pill" id="nav-pill">' +
      '<div class="nav-id"><a class="nav-avatar" href="#top" data-no-curtain aria-label="Back to top"><img src="assets/img/avatar.svg" alt=""></a></div>' +
      '<div class="avail-tag"><span class="avail-text">Available for work</span></div><span class="avail-dot"></span>' +
      '<div class="nav-links" id="nav-links-group">' +
      '<a href="#work" class="nav-link" data-spy="work">Work</a>' +
      '<a href="projects.html" class="nav-link">Projects</a>' +
      '<a href="blog.html" class="nav-link">Blogs</a>' +
      '<a href="about.html" class="nav-link">About</a>' +
      '<a href="#contact" class="nav-cta" data-contact-open><img src="assets/img/email.svg" width="24" height="24" alt="">Work with me</a>' +
      '<button class="nav-burger" type="button" aria-expanded="false" aria-controls="menu-overlay" aria-label="Open menu"><span></span><span></span></button>' +
      '</div></div>' +
      '<div class="nav-side right">' +
      '<button class="nav-wave" id="nav-wave" type="button" aria-label="Play music" aria-pressed="false"><svg viewBox="0 0 40 40"><defs><clipPath id="wclip"><circle cx="20" cy="20" r="14.5"/></clipPath></defs><g clip-path="url(#wclip)"><g class="travel"><path d="' + WAVE_D + '"/></g></g></svg></button>' +
      '<button class="day-toggle" id="theme-toggle" type="button" aria-label="Toggle night mode" aria-pressed="false">' + SUN_IC + MOON_IC + '</button>' +
      '</div></nav>' +
      '<div class="menu-overlay" id="menu-overlay" aria-hidden="true"><ul class="menu-links">' +
      [['#work', 'Work'], ['projects.html', 'Projects'], ['blog.html', 'Blogs'], ['about.html', 'About'], ['#contact', 'Contact']].map(function (l, i) {
        return '<li><a class="menu-link" href="' + l[0] + '"' + (l[1] === 'Contact' ? ' data-contact-open' : '') + '><span class="num">0' + (i + 1) + '</span><span class="word">' + l[1] + '</span></a></li>';
      }).join('') + '</ul><p class="menu-footer">' + esc(S.location) + '</p></div>';
  }
  function initNav() {
    var wrap = document.createElement('div'); wrap.innerHTML = navHTML();
    while (wrap.firstChild) document.body.insertBefore(wrap.firstChild, document.body.firstChild.nextSibling);
    var nav = $('#nav'), pill = $('#nav-pill'), burger = $('.nav-burger'), menu = $('#menu-overlay');
    // compact pill
    var lastY = 0;
    Scroll.add(function (s) {
      if (s.y > 50 && s.y > lastY) pill.classList.add('compact');
      else if (s.y < lastY) pill.classList.remove('compact');
      lastY = s.y;
    });
    $('.nav-avatar').addEventListener('click', function (e) { e.preventDefault(); scrollTo({ top: 0, behavior: 'smooth' }); });
    // burger + menu
    function setMenu(open) {
      menu.classList.toggle('open', open); nav.classList.toggle('menu-open', open); menu.setAttribute('aria-hidden', String(!open));
      burger.setAttribute('aria-expanded', String(open)); burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.style.overflow = open ? 'hidden' : '';
      burger.focus({ preventScroll: true });
    }
    burger.addEventListener('click', function () { setMenu(burger.getAttribute('aria-expanded') !== 'true'); });
    $$('.menu-link', menu).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menu.classList.contains('open')) setMenu(false); });
    // scroll-spy
    var work = $('#work'), workLink = $('[data-spy="work"]');
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { es.forEach(function (en) { workLink.classList.toggle('active', en.isIntersecting); }); }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 }).observe(work);
    // local time + temperature beside the location
    var nt = $('.nav-time'), wx = $('.nav-meta .wx');
    var tick = function () { nt.textContent = '· ' + localTime(); }; tick(); setInterval(tick, 30000);
    function weather() { getWeather().then(function (w) { wx.innerHTML = weatherIcon(w.code) + '<span>' + w.temp + '°C</span>'; wx.classList.add('in'); wx.title = 'Now in ' + S.city; }).catch(function () {}); }
    weather(); setInterval(function () { try { sessionStorage.removeItem('wx'); } catch (e) {} weather(); }, 9e5);
    initNavContrast(nav);
    initTheme();
  }

  /* backdrop-contrast: sample what is painted behind the bar */
  function lum(r, g, b) { var f = function (c) { c /= 255; return c <= .03928 ? c / 12.92 : Math.pow((c + .055) / 1.055, 2.4); }; return .2126 * f(r) + .7152 * f(g) + .0722 * f(b); }
  function parseColors(str) { var out = [], re = /rgba?\(([^)]+)\)/g, m; while ((m = re.exec(str))) { var p = m[1].split(/[ ,/]+/).filter(Boolean).map(parseFloat); out.push({ r: p[0], g: p[1], b: p[2], a: p[3] == null ? 1 : p[3] }); } return out; }
  function sampleAt(x, y, nav) {
    var stack = document.elementsFromPoint(x, y);
    for (var i = 0; i < stack.length; i++) {
      var el = stack[i]; if (nav.contains(el) || el.id === 'route-curtain' || el.closest('#route-curtain')) continue;
      var hint = el.closest && el.closest('[data-nav]'), dn = hint && hint.getAttribute('data-nav');
      if (dn === 'dark') return 0; if (dn === 'light') return 1;
      var cs = getComputedStyle(el), bg = parseColors(cs.backgroundColor)[0];
      if (bg && bg.a >= .5) return lum(bg.r, bg.g, bg.b);
      if (cs.backgroundImage && cs.backgroundImage.indexOf('gradient') > -1) {
        var cols = parseColors(cs.backgroundImage); if (cols.length) return cols.reduce(function (s, c) { return s + lum(c.r, c.g, c.b); }, 0) / cols.length;
      }
    }
    return 1;
  }
  function initNavContrast(nav) {
    var last = 0;
    function run() {
      var r = nav.getBoundingClientRect(), y = r.top + 24 + 28;
      var L = (sampleAt(r.left + 70, y, nav) + sampleAt(r.left + r.width / 2, y, nav) + sampleAt(r.right - 70, y, nav)) / 3;
      nav.classList.toggle('nav-on-dark', L < .5); nav.classList.toggle('nav-on-light', L >= .5);
    }
    Scroll.addRead(function () { var t = performance.now(); if (t - last > 60) { last = t; run(); } });
    window.updateNavContrast = function () { setTimeout(run, 0); setTimeout(run, 90); setTimeout(run, 320); setTimeout(run, 650); };
    addEventListener('hashchange', function () { setTimeout(run, 60); });
    window.updateNavContrast();
  }

  /* day / night */
  function initTheme() {
    var btn = $('#theme-toggle');
    btn.setAttribute('aria-pressed', String(isNight()));
    btn.addEventListener('click', function () {
      var night = !isNight();
      var swap = function () {
        document.body.classList.toggle('night', night);
        try { localStorage.setItem('theme', night ? 'night' : 'day'); } catch (e) {}
        btn.setAttribute('aria-pressed', String(night));
        document.dispatchEvent(new CustomEvent('theme:change', { detail: night }));
      };
      if (document.startViewTransition && !RM && !document.hidden) { var vt = document.startViewTransition(swap); vt.ready.catch(function () {}); vt.finished.catch(function () {}); }
      else { document.body.classList.add('theme-fading'); swap(); setTimeout(function () { document.body.classList.remove('theme-fading'); }, 500); }
      window.updateNavContrast();
    });
  }

  /* ======================= DOT CURSOR ======================= */
  function initCursor() {
    if (!FINE) return;
    document.documentElement.classList.add('dot-cursor-on');
    var c = document.createElement('div'); c.className = 'dot-cursor'; c.innerHTML = '<span></span>'; document.body.appendChild(c);
    var lab = c.firstChild, x = -100, y = -100, q = false;
    var HOT = 'a, button, [role=button], input, textarea, select, label, summary, [data-cursor=hot]';
    function paint() { q = false; c.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)'; }
    addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse') return;
      x = e.clientX; y = e.clientY; c.classList.add('on');
      var t = e.target, labelled = t.closest && t.closest('[data-cursor-label]');
      c.classList.toggle('labelled', !!labelled);
      if (labelled) lab.textContent = labelled.getAttribute('data-cursor-label');
      c.classList.toggle('hot', !labelled && !!(t.closest && t.closest(HOT)));
      if (!q) { q = true; requestAnimationFrame(paint); }
    }, { passive: true });
    addEventListener('pointerdown', function () { c.classList.add('down'); });
    addEventListener('pointerup', function () { c.classList.remove('down'); });
    document.addEventListener('mouseleave', function () { c.classList.remove('on'); });
    document.addEventListener('mouseenter', function () { c.classList.add('on'); });
  }

  /* ======================= HERO ======================= */
  function splitLetters(el, text) {
    el.innerHTML = '';
    text.split('').forEach(function (ch) {
      var s = document.createElement('span');
      if (ch === ' ') { s.className = 'h-space'; s.innerHTML = '&nbsp;'; } else { s.className = 'h-letter'; s.textContent = ch; }
      el.appendChild(s);
    });
  }
  function initHero() {
    var hero = $('.hero');
    $('.hero-eyebrow span').textContent = S.eyebrow;
    $('.hero-vertical').textContent = S.vertical;
    $('.hero h1 .sr-only').textContent = S.heroLine + ' ' + S.heroWords.join(', ');
    splitLetters($('.h-line.multidisciplinary'), S.heroLine);
    // cirrus wisps (screen-blended, day)
    $('.hero-sky').innerHTML = '<svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice"><defs><filter id="wb" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="9"/></filter></defs><g fill="#fff6e6" filter="url(#wb)">' +
      [[180, 160, 260, 16], [520, 110, 200, 10], [880, 210, 300, 14], [1220, 140, 220, 12], [340, 330, 180, 9], [1040, 380, 240, 11], [660, 290, 140, 8]].map(function (w) {
        return '<ellipse cx="' + w[0] + '" cy="' + w[1] + '" rx="' + w[2] + '" ry="' + w[3] + '" transform="rotate(-6 ' + w[0] + ' ' + w[1] + ')"/>'; }).join('') + '</g></svg>';
    // starfield tile
    var cv = document.createElement('canvas'); cv.width = cv.height = 700; var cx = cv.getContext('2d');
    for (var i = 0; i < 260; i++) {
      var sx = Math.random() * 700, sy = Math.random() * 700, sr = Math.random() < .08 ? 1.6 : Math.random() * .9 + .3;
      var gr = cx.createRadialGradient(sx, sy, 0, sx, sy, sr * 4);
      gr.addColorStop(0, '#fffbff'); gr.addColorStop(.3, 'rgba(214,235,255,.8)'); gr.addColorStop(1, 'rgba(165,202,246,0)');
      cx.fillStyle = gr; cx.beginPath(); cx.arc(sx, sy, sr * 4, 0, 7); cx.fill();
    }
    $('.hero-stars').style.backgroundImage = 'url(' + cv.toDataURL() + ')';
    initRoll();
    initRecorder();
    initMeteor(hero);
    document.addEventListener('theme:change', function (e) {
      if (!e.detail && !RM) { var sky = $('.hero-sky'); sky.classList.remove('gust'); void sky.offsetWidth; sky.classList.add('gust'); }
    });
    // pinned hero shrinks
    var content = $('#hero-content');
    Scroll.add(function (s) {
      var h = hero.offsetHeight, p = clamp(s.y / (h * .8), 0, 1), e = 1 - Math.pow(1 - p, 3);
      var base = mqMob.matches ? 1 : Math.min(s.vw > 1100 ? 1 : clamp((s.vw - 96) / 911, .6, 1), clamp((s.vh - 64) / 836, .5, 1));   // fit width AND height (short windows / DevTools)
      content.style.transform = 'scale(' + (base * (1 - e * .12)).toFixed(4) + ')';
    });
  }
  function initRoll() {
    var line = $('#scramble'), words = S.heroWords, idx = 0;
    var roll = document.createElement('span'); roll.className = 'roll'; line.innerHTML = ''; line.appendChild(roll);
    function word(w) { var s = document.createElement('span'); splitLetters(s, w); return s; }
    roll.appendChild(word(words[0]));
    if (RM || words.length < 2) return;
    var HOLD = 1500, DUR = 760, EASE = 'cubic-bezier(.76,0,.24,1)';
    function step() {
      idx = (idx + 1) % words.length;
      roll.appendChild(word(words[idx]));
      line.classList.add('rolling');
      var h = roll.firstChild.offsetHeight;
      roll.style.transition = 'transform ' + DUR + 'ms ' + EASE; roll.style.transform = 'translateY(' + (-h) + 'px)';
      var done = false;
      function end() {
        if (done) return; done = true;
        roll.style.transition = 'none'; roll.style.transform = 'none'; roll.removeChild(roll.firstChild); line.classList.remove('rolling');
        setTimeout(step, HOLD);
      }
      roll.addEventListener('transitionend', end, { once: true }); setTimeout(end, DUR + 80);
    }
    setTimeout(step, HOLD);
  }
  function fmt(t) { t = Math.max(0, Math.floor(t || 0)); return Math.floor(t / 60) + ':' + String(t % 60).padStart(2, '0'); }
  function initRecorder() {
    var rec = $('.recorder'), btn = $('.play-circle'), slider = $('.play-slider'), knob = $('.slider-knob'), fill = $('.slider-fill');
    var disks = $$('.disk, .radio-knob'), ts = $$('.timestamps span'), wave = $('#nav-wave'), notes = $('.radio-notes'), noteT = null;
    $('.rec-title').textContent = S.recorderTitle;
    var playing = false, total = S.demoLength || 120, source = 'demo', demoT = 0, demoTimer = null, spotify = null, audio = null, trayT = null;
    ts[1].textContent = fmt(total);
    function paint(pct) {
      pct = clamp(pct || 0, 0, 1); var kw = knob.offsetWidth || 23.45, pad = rec.classList.contains('radio') ? 10 : 0, w = slider.clientWidth - kw - pad * 2, kx = pad + pct * w;
      knob.style.left = kx + 'px'; fill.style.width = (kx + kw / 2) + 'px';
      slider.setAttribute('aria-valuenow', Math.round(pct * 100));
      ts[0].textContent = fmt(pct * total);
    }
    function setPlaying(on) {
      if (on === playing) return; playing = on;
      disks.forEach(function (d) { d.classList.toggle('spinning', on); });
      btn.classList.toggle('playing', on); btn.setAttribute('aria-label', on ? 'Pause' : 'Play');
      wave.classList.toggle('playing', on); wave.setAttribute('aria-pressed', String(on));
      rec.classList.toggle('playing', on);
      clearInterval(noteT);
      if (on && notes && !RM) noteT = setInterval(function () {
        var n = document.createElement('span'); n.className = 'radio-note'; n.textContent = ['♪', '♫', '♩', '♬'][Math.floor(Math.random() * 4)];
        n.style.setProperty('--nx', (Math.random() * 80 - 60) + 'px'); n.style.setProperty('--nr', (Math.random() * 50 - 25) + 'deg');
        notes.appendChild(n); setTimeout(function () { n.remove(); }, 2500);
      }, 650);
    }

    /* --- Source 1: Spotify playlist via Spotify's official embed + IFrame API --- */
    function spotifyUri(u) { var m = String(u || '').match(/(playlist|album|track|show|episode|artist)[/:]([A-Za-z0-9]+)/); return m ? 'spotify:' + m[1] + ':' + m[2] : null; }
    var uri = spotifyUri(S.spotify);
    if (uri) {
      source = 'spotify-loading';
      var box = document.createElement('div'); box.className = 'radio-spotify'; box.setAttribute('aria-label', 'Spotify player');
      box.innerHTML = '<div class="radio-tray-screen"><div id="spotify-embed"></div></div><span class="radio-tray-grip" aria-hidden="true"></span>';
      ($('.radio-tilt') || rec).appendChild(box);          // the player lives in a tray that slides out of the radio
      window.onSpotifyIframeApiReady = function (IFrameAPI) {
        IFrameAPI.createController($('#spotify-embed'), { uri: uri, width: '100%', height: 80 }, function (ctrl) {
          spotify = ctrl; source = 'spotify';
          ctrl.addListener('playback_update', function (e) {
            var d = e.data || {}; if (d.duration) { total = d.duration / 1000; ts[1].textContent = fmt(total); }
            if (!slider.classList.contains('scrubbing') && d.duration) paint(d.position / d.duration);
            setPlaying(!d.isPaused);
            clearTimeout(trayT);
            if (d.isPaused) trayT = setTimeout(function () { if (!playing) rec.classList.remove('spotify-on'); }, 2500); else rec.classList.add('spotify-on');
          });
        });
      };
      var sc = document.createElement('script'); sc.src = 'https://open.spotify.com/embed/iframe-api/v1'; sc.async = true;
      sc.onerror = function () { source = 'audio'; box.remove(); };
      document.head.appendChild(sc);
      setTimeout(function () { if (source === 'spotify-loading') source = 'audio'; }, 8000);   // blocked / offline → fall back
    }
    /* --- Source 2: a local mp3 (S.audio) · Source 3: silent demo so the UI still works --- */
    function localAudio() {
      if (audio) return audio;
      audio = new Audio(S.audio); audio.preload = 'metadata';
      audio.addEventListener('loadedmetadata', function () { if (isFinite(audio.duration)) { total = audio.duration; ts[1].textContent = fmt(total); } });
      audio.addEventListener('timeupdate', function () { if (!slider.classList.contains('scrubbing')) paint(audio.currentTime / (total || 1)); });
      audio.addEventListener('ended', function () { setPlaying(false); });
      audio.addEventListener('error', function () { if (source === 'audio') { source = 'demo'; if (playing) startDemo(); } });
      return audio;
    }
    function startDemo() { clearInterval(demoTimer); demoTimer = setInterval(function () { demoT += .25; if (demoT >= total) demoT = 0; paint(demoT / total); }, 250); }
    function toggle() {
      if (source === 'spotify' && spotify) {
        rec.classList.add('spotify-on');
        spotify.togglePlay(); setPlaying(!playing);     // optimistic; playback_update confirms the real state
        return;
      }
      if (source === 'spotify-loading') { rec.classList.add('spotify-on'); return; }   // API still loading: reveal the player so a tap works there
      if (source === 'audio') {
        var a2 = localAudio();
        if (playing) { a2.pause(); setPlaying(false); }
        else { setPlaying(true); var pr = a2.play(); if (pr && pr.catch) pr.catch(function () { source = 'demo'; startDemo(); }); }
        return;
      }
      if (playing) { clearInterval(demoTimer); setPlaying(false); } else { setPlaying(true); startDemo(); }
    }
    if (!uri) source = 'audio';
    rec.addEventListener('click', function (e) { if (!e.target.closest('.play-slider, .radio-spotify')) toggle(); });
    wave.addEventListener('click', toggle);
    slider.addEventListener('pointerdown', function (e) {
      e.stopPropagation(); slider.setPointerCapture(e.pointerId); slider.classList.add('scrubbing'); seek(e, false);
    });
    slider.addEventListener('pointermove', function (e) { if (slider.classList.contains('scrubbing')) seek(e, false); });
    slider.addEventListener('pointerup', function (e) { slider.classList.remove('scrubbing'); seek(e, true); });
    function seek(e, commit) {
      var r = slider.getBoundingClientRect(), kw = knob.offsetWidth || 23.45, pad = rec.classList.contains('radio') ? 10 : 0, pct = clamp((e.clientX - r.left - pad - kw / 2) / (r.width - kw - pad * 2), 0, 1);
      paint(pct);
      if (source === 'spotify' && spotify) { if (commit) spotify.seek(Math.floor(pct * total)); }
      else if (source === 'audio' && audio && isFinite(audio.duration)) audio.currentTime = pct * audio.duration;
      else demoT = pct * total;
    }
    paint(0);
    // 3D tilt follows the pointer across the hero
    var tilt = $('.radio-tilt'), hero = $('.hero');
    if (tilt && FINE && !RM) {
      hero.addEventListener('pointermove', function (e) {
        var r = rec.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        var nx = clamp((e.clientX - cx) / (innerWidth / 2), -1, 1), ny = clamp((e.clientY - cy) / (innerHeight / 2), -1, 1);
        tilt.style.setProperty('--ry', (-16 + nx * 22).toFixed(2) + 'deg'); tilt.style.setProperty('--rx', (8 - ny * 14).toFixed(2) + 'deg');
      });
      hero.addEventListener('pointerleave', function () { tilt.style.removeProperty('--ry'); tilt.style.removeProperty('--rx'); });
    }
  }
  function initMeteor(hero) {
    if (RM) return;
    var m = $('.hero-meteor'), timer;
    function pass() {
      clearTimeout(timer);
      if (!isNight() || Scroll.y() > hero.offsetHeight * .9) { timer = setTimeout(pass, 4000); return; }
      var r = function (a, b) { return a + Math.random() * (b - a); };
      m.style.setProperty('--m-top', r(5, 28) + '%'); m.style.setProperty('--m-len', r(130, 260) + 'px');
      m.style.setProperty('--m-angle', r(7, 13) + 'deg'); m.style.setProperty('--m-travel', (hero.offsetWidth * 1.15 + 260) + 'px');
      var dur = r(1.1, 1.8); m.style.setProperty('--m-dur', dur + 's');
      m.classList.remove('fly'); void m.offsetWidth; m.classList.add('fly');
      timer = setTimeout(pass, dur * 1000 + r(5200, 13000));
    }
    timer = setTimeout(pass, 1400);
    document.addEventListener('theme:change', function (e) { if (e.detail) { clearTimeout(timer); timer = setTimeout(pass, 600); } });
  }

  /* ======================= INTRO ======================= */
  function initIntro() {
    $('.sky-band').innerHTML = '<svg viewBox="0 0 1440 471" preserveAspectRatio="none" aria-hidden="true"><path class="sb-back" d="' + A.sky_back + '"/><path class="sb-wisp" d="' + A.sky_wisps + '"/><path class="sb-front" d="' + A.sky_front + '"/></svg>';
    var paras = [$('.intro-type[data-k="intro"]'), $('.intro-type[data-k="manifesto"]')];
    paras[0].textContent = S.intro; paras[1].textContent = S.manifesto;
    var copy = $('.intro-copy'), lines = [];
    function build() {
      lines = [];
      paras.forEach(function (p) {
        var text = p.getAttribute('data-text') || p.textContent; p.setAttribute('data-text', text);
        p.innerHTML = text.split(/\s+/).map(function (w) { return '<span class="tw-w">' + esc(w) + '</span>'; }).join(' ');
        var groups = [], top = null;
        $$('.tw-w', p).forEach(function (w) { if (w.offsetTop !== top) { groups.push([]); top = w.offsetTop; } groups[groups.length - 1].push(w.textContent); });
        p.innerHTML = groups.map(function (g) { return '<span class="tw-line">' + esc(g.join(' ')) + '</span>'; }).join('');
        lines = lines.concat($$('.tw-line', p));
      });
      Scroll.kick();
    }
    build();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(build);
    var rt; addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(build, 200); });
    Scroll.add(function (s) {
      var top = copy.getBoundingClientRect().top, p = RM ? 1 : clamp((s.vh * .88 - top) / (s.vh * .88 - s.vh * .32), 0, 1), n = lines.length;
      lines.forEach(function (l, i) { l.classList.toggle('is-in', p >= (i + 1) / (n + 1)); });
    });
  }

  /* ======================= WORK ======================= */
  function tileHTML(p, cls, i) {
    var bg = p.image ? '<img src="' + esc(p.image) + '" alt="" loading="lazy">' : window.coverArt(p, i + 3, cls === 'tile-wide' ? 860 : 560, 595);
    var media = p.preview ? bg + window.deviceHTML(p.preview, true)          // device with auto-scrolling screenshot / looping video
      : p.video ? '<video muted loop playsinline preload="none" data-src="' + esc(p.video) + '"></video>' : bg;
    return '<a class="project-tile ' + cls + '" href="project-' + p.slug + '.html" data-cursor-label="View project">' +
      '<div class="tile-mock"><div class="tile-zoom">' + media + '</div></div>' +
      '<div class="tile-overlay"><p class="tile-overlay-title">' + esc(p.title) + '</p><p class="tile-overlay-subtitle">' + esc(p.pitch[0]) + '<br class="tile-break"> ' + esc(p.pitch[1]) + '</p></div></a>';
  }
  function initWork() {
    $('.featured-heading').textContent = S.workHeading;
    var logos = S.clients.map(function (c, i) { return '<span class="client-logo lg-' + (i % 5 + 1) + '">' + esc(c) + '</span>'; }).join('');
    var dup = S.clients.map(function (c, i) { return '<span class="client-logo lg-' + (i % 5 + 1) + '" aria-hidden="true">' + esc(c) + '</span>'; }).join('');
    var wrap = $('.logo-marquee-wrap');
    wrap.innerHTML = '<div class="logo-marquee-inner">' + logos + dup + '</div>' +
      '<div class="logo-marquee-mobile" aria-hidden="true"><div class="logo-marquee-inner mrow mrow-a">' + dup + dup + '</div><div class="logo-marquee-inner mrow mrow-b">' + dup + dup + '</div></div>';
    if ('IntersectionObserver' in window) {
      var lio = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { wrap.classList.add('logos-in'); lio.disconnect(); } }, { rootMargin: '0px 0px -12% 0px', threshold: .2 });
      lio.observe(wrap);
    } else wrap.classList.add('logos-in');
    // tiles: rows of (wide, narrow) then (narrow, wide)
    var tiles = $('.project-tiles'), list = P.slice(0, 4), html = '';
    for (var r = 0; r < list.length; r += 2) {
      var a = list[r], b = list[r + 1], odd = (r / 2) % 2;
      html += '<div class="tiles-row">' + tileHTML(a, odd ? 'tile-narrow' : 'tile-wide', r) + (b ? tileHTML(b, odd ? 'tile-wide' : 'tile-narrow', r + 1) : '') + '</div>';
    }
    tiles.innerHTML = html;
    initScrollShots(tiles);
    var rows = $$('.tiles-row'), tileEls = $$('.project-tile');
    Scroll.add(function (s) {
      if (mqMob.matches) {
        tileEls.forEach(function (t) { var top = t.getBoundingClientRect().top; t.style.setProperty('--reveal', RM ? 1 : smooth((s.vh * .95 - top) / (s.vh * .95 - s.vh * .68)).toFixed(4)); });
      } else {
        rows.forEach(function (row) { var top = row.getBoundingClientRect().top; row.style.setProperty('--reveal', RM ? 1 : smooth((s.vh * .95 - top) / (s.vh * .95 - s.vh * .45)).toFixed(4)); });
      }
    });
    // lazy videos
    var vids = $$('.project-tile video');
    if (vids.length && 'IntersectionObserver' in window) {
      var vio = new IntersectionObserver(function (es) { es.forEach(function (en) { var v = en.target;
        if (en.isIntersecting) { if (!v.src) { v.src = v.dataset.src; v.load(); } v.play().catch(function () {}); } else v.pause(); }); }, { rootMargin: '260px 0px' });
      vids.forEach(function (v) { vio.observe(v); });
    }
  }

  /* paper plane + tail pin + testimonials hold */
  function initPlaneAndPins() {
    var fw = $('#work'), story = $('#story'), testi = $('#testimonials'), dim = $('.fw-dim');
    var fly = $('.plane-fly'), svg = $('.plane-trail'), motion = $('#planeMotionPath'), trail = $('#planeTrailPath'), mask = $('#planeTrailMaskPath'), sprite = $('.plane-sprite');
    var sky = $('.sky-band'), blurbEl = $('.intro-copy');
    // My sprite's nose points ~25° down-right when un-rotated; subtract that so it follows the path.
    var PLANE_OFFSET = -25;
    // Segment 1: a FIXED-SIZE opening arc (px), pinned by its end to just above-left of the intro text.
    var ARC = { start: [210, 110], curves: [[[110, 200], [70, 325], [88, 410]], [[103, 488], [192, 528], [255, 555]]], end: [255, 555] };
    // Segments 2 & 3, in a 1440-wide design frame, anchored + scaled to the intro text block
    // (seg 2 ends beside "Work featured on"; seg 3 winds down through the tiles to the bottom).
    var FBLURB = { x: 220.55078, y: 309.10114, w: 998.8994 };
    var FSEGS = [
      { start: [1225.129, 513.643], curves: [[[1400.529, 571.048], [1408.849, 837.583], [1177.289, 928.232]]] },
      { start: [526.523, 944.189], curves: [
        [[343.309, 950.485], [-12.056, 1108.034], [114.406, 1503.226]],
        [[181.773, 1632.295], [428.301, 1799.056], [685.184, 1627.938]],
        [[1049.722, 1385.108], [1402.934, 1429.163], [1402.934, 1762.044]],
        [[1402.934, 2099.399], [1089.394, 2154.919], [826.844, 2073.699]],
        [[564.300, 1992.479], [279.257, 1966.169], [203.537, 2255.019]],
        [[123.170, 2561.609], [552.967, 2708.339], [800.401, 2549.679]],
        [[1047.835, 2391.019], [1393.484, 2589.339], [1253.714, 2887.779]]] }
    ];
    var SEGS = [], motionLen = 0, pathTopY = 0, pathBotY = 0, ready = false, lastMd = null, lastAppear = null, lastFade = 1;
    function fwDocTop() { return story.offsetTop + story.offsetHeight; }
    function norm(v) { var m = Math.hypot(v[0], v[1]) || 1; return [v[0] / m, v[1] / m]; }
    function makeSeg(pts) {
      var f = function (p) { return p[0].toFixed(1) + ' ' + p[1].toFixed(1); }, d = 'M ' + f(pts.start);
      pts.curves.forEach(function (c) { d += ' C ' + f(c[0]) + ' ' + f(c[1]) + ' ' + f(c[2]); });
      var last = pts.curves[pts.curves.length - 1];
      return { start: pts.start, end: last[2], d: d,
        startTan: norm([pts.curves[0][0][0] - pts.start[0], pts.curves[0][0][1] - pts.start[1]]),
        endTan: norm([last[2][0] - last[1][0], last[2][1] - last[1][1]]) };
    }
    function measure() {
      ready = false; lastMd = lastAppear = null;
      if (!mqDesk.matches || !fw.offsetHeight) return;
      var skyDoc = sky.getBoundingClientRect().top + scrollY, fwTop = fwDocTop(), fwH = fw.offsetHeight;
      var bl = blurbEl.getBoundingClientRect(), blTop = bl.top + scrollY - skyDoc;       // overlay space: origin = sky-band top
      var W = fly.clientWidth || document.documentElement.clientWidth, H = fwTop + fwH - skyDoc;
      fly.style.top = (skyDoc - fwTop) + 'px'; fly.style.height = H + 'px';
      svg.setAttribute('width', W); svg.setAttribute('height', H); svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
      var dx = (bl.left + 26) - ARC.end[0], dy = (blTop - 33) - ARC.end[1];
      var A = function (p) { return [p[0] + dx, p[1] + dy]; };
      var sc = bl.width / FBLURB.w;
      var F = function (p) { return [bl.left + (p[0] - FBLURB.x) * sc, blTop + (p[1] - FBLURB.y) * sc]; };
      var segs = [makeSeg({ start: A(ARC.start), curves: ARC.curves.map(function (c) { return c.map(A); }) })];
      FSEGS.forEach(function (fs) { segs.push(makeSeg({ start: F(fs.start), curves: fs.curves.map(function (c) { return c.map(F); }) })); });
      // visible trail: separate subpaths → real gaps over the text / between segments
      trail.setAttribute('d', segs.map(function (g) { return g.d; }).join(' '));
      // continuous motion path: seg + invisible tangent bridge + seg + …
      var motionD = segs[0].d; motion.setAttribute('d', motionD);
      segs[0].mStart = 0; segs[0].mEnd = motion.getTotalLength();
      for (var i = 1; i < segs.length; i++) {
        var pv = segs[i - 1], cur = segs[i], span = Math.hypot(cur.start[0] - pv.end[0], cur.start[1] - pv.end[1]) * .4;
        var b1 = [pv.end[0] + pv.endTan[0] * span, pv.end[1] + pv.endTan[1] * span], b2 = [cur.start[0] - cur.startTan[0] * span, cur.start[1] - cur.startTan[1] * span];
        var bridge = ' C ' + b1[0].toFixed(1) + ' ' + b1[1].toFixed(1) + ' ' + b2[0].toFixed(1) + ' ' + b2[1].toFixed(1) + ' ' + cur.start[0].toFixed(1) + ' ' + cur.start[1].toFixed(1);
        motion.setAttribute('d', motionD + bridge); var afterBridge = motion.getTotalLength();
        motionD += bridge + cur.d.replace(/^M[^C]*/, ''); motion.setAttribute('d', motionD);
        cur.mStart = afterBridge; cur.mEnd = motion.getTotalLength();
      }
      motionLen = motion.getTotalLength();
      mask.setAttribute('d', motionD); mask.style.strokeDasharray = motionLen; mask.style.strokeDashoffset = motionLen;
      var bb = motion.getBBox(); pathTopY = bb.y; pathBotY = bb.y + bb.height;
      SEGS = segs; ready = true;
      window.__planeEndScroll = skyDoc + pathBotY - innerHeight * .5;
    }
    function planeFrame(s) {
      if (!ready || RM) { sprite.style.opacity = 0; return; }
      var skTop = sky.getBoundingClientRect().top, topVp = skTop + pathTopY, botVp = skTop + pathBotY;
      var p = clamp((s.vh * .5 - topVp) / (botVp - topVp), 0, 1), md = p * motionLen;
      var appear = smooth(s.y / (s.vh * .95));
      if (md === lastMd && appear === lastAppear) return;
      lastAppear = appear;
      if (md === lastMd) { sprite.style.opacity = (lastFade * appear).toFixed(3); return; }   // parked: only the fade moves
      lastMd = md;
      // crossing a bridge: fade out over the first 40%, back in over the last 40%
      var op = 1;
      for (var i = 1; i < SEGS.length; i++) {
        var pv = SEGS[i - 1], sg = SEGS[i];
        if (md > pv.mEnd && md < sg.mStart) { var bp = (md - pv.mEnd) / (sg.mStart - pv.mEnd); op = Math.max(1 - smooth(bp / .4), smooth((bp - .6) / .4)); break; }
      }
      lastFade = op;
      var pt = motion.getPointAtLength(md), pa = motion.getPointAtLength(Math.max(0, md - 1)), pb = motion.getPointAtLength(Math.min(motionLen, md + 1));
      var ang = Math.atan2(pb.y - pa.y, pb.x - pa.x) * 180 / Math.PI;
      mask.style.strokeDashoffset = motionLen - md;
      sprite.style.opacity = (op * appear).toFixed(3);
      sprite.style.transform = 'translate(' + pt.x.toFixed(1) + 'px,' + pt.y.toFixed(1) + 'px) translate(-50%,-50%) rotate(' + (ang + PLANE_OFFSET).toFixed(1) + 'deg)';
    }
    function pin() {
      var vh = innerHeight, fwH = fw.offsetHeight;
      fw.style.top = Math.min(0, vh - fwH) + 'px';
      if (mqDesk.matches) {
        var end = window.__planeEndScroll || 0;
        testi.style.marginTop = Math.max(0, end + 160 + vh - (fwDocTop() + fwH)) + 'px';
        testi.style.top = '0px';
      } else {
        testi.style.marginTop = (vh * .6) + 'px';
        testi.style.top = Math.min(0, vh - testi.offsetHeight) + 'px';
      }
    }
    function all() { measure(); pin(); Scroll.kick(); }
    var lastW = innerWidth;
    addEventListener('resize', function () { if (innerWidth !== lastW || mqDesk.matches) { lastW = innerWidth; all(); } else pin(); });
    addEventListener('load', all);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(all);
    if ('ResizeObserver' in window) { var lastH = 0; new ResizeObserver(function () { var h = fw.offsetHeight; if (Math.abs(h - lastH) >= 2) { lastH = h; all(); } }).observe(fw); }
    all();
    Scroll.add(function (s) {
      planeFrame(s);
      if (mqDesk.matches) {
        var tt = testi.getBoundingClientRect().top;
        dim.style.opacity = (.45 * smooth((s.vh - tt) / s.vh)).toFixed(3);
      } else { dim.style.opacity = 0; if (!mqDesk.matches) testi.style.top = Math.min(0, s.vh - testi.offsetHeight) + 'px'; }
    });
  }

  /* ======================= TESTIMONIALS ======================= */
  function paintWillows(night) {
    var W = 1200, H = 1071, cv = document.createElement('canvas'); cv.width = W * 2; cv.height = H;
    var c = cv.getContext('2d'), half = document.createElement('canvas'); half.width = W; half.height = H; var h = half.getContext('2d');
    var pal = night ? { sky: '#141d3a', mead: '#231b44', greens: ['#3b2d6e', '#4a3a86', '#5b4a9c', '#6d5bb0', '#2c2257'], trunk: '#0e0b1c' }
      : { sky: '#efe9d6', mead: '#a7bd7a', greens: ['#6f8f3b', '#84a64a', '#9bbb5c', '#b7cf7d', '#557a2d'], trunk: '#2a2a1c' };
    var rnd = (function (s) { return function () { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; })(night ? 99 : 7);
    var g = h.createLinearGradient(0, 0, 0, H); g.addColorStop(0, pal.sky); g.addColorStop(.12, pal.sky); g.addColorStop(.35, pal.mead); g.addColorStop(1, pal.mead);
    h.fillStyle = g; h.fillRect(0, 0, W, H);
    // trees: back (pale, tall) → front (smaller, brighter)
    var trees = [];
    for (var layer = 0; layer < 4; layer++) {
      var n = 4 + layer;
      for (var i = 0; i < n; i++) trees.push({ x: (i + rnd() * .8) / n * W, top: 90 + layer * 150 + rnd() * 60, w: 260 - layer * 30 + rnd() * 80, len: 420 - layer * 40 + rnd() * 120, layer: layer });
    }
    trees.forEach(function (t) {
      var col = pal.greens[(t.layer + Math.floor(rnd() * 3)) % pal.greens.length];
      // trunk
      h.strokeStyle = pal.trunk; h.lineWidth = 3 - t.layer * .4; h.globalAlpha = .9;
      h.beginPath(); h.moveTo(t.x, t.top + t.len * .4); h.quadraticCurveTo(t.x + 6, t.top + t.len * .8, t.x - 2, t.top + t.len + 40); h.stroke();
      // hanging fronds
      var strands = Math.floor(t.w * 2.2);
      for (var k = 0; k < strands; k++) {
        var u = rnd() * 2 - 1, sx = t.x + u * t.w / 2, sy = t.top + Math.pow(Math.abs(u), 1.8) * t.w * .35 + rnd() * 20;
        var L = t.len * (1 - Math.pow(Math.abs(u), 3) * .35) * (.7 + rnd() * .3);
        h.strokeStyle = rnd() < .2 ? pal.greens[3] : col; h.globalAlpha = .18 + rnd() * .25; h.lineWidth = .8 + rnd() * 1.2;
        h.beginPath(); h.moveTo(sx, sy); h.quadraticCurveTo(sx + u * 10, sy + L * .5, sx + u * 4 + (rnd() - .5) * 6, sy + L); h.stroke();
      }
    });
    h.globalAlpha = 1;
    // meadow corners
    h.fillStyle = night ? '#2d2458' : '#9cbf52';
    h.beginPath(); h.moveTo(0, H); h.lineTo(0, H * .86); h.quadraticCurveTo(W * .25, H * .88, W * .5, H); h.fill();
    c.drawImage(half, 0, 0); c.save(); c.translate(W * 2, 0); c.scale(-1, 1); c.drawImage(half, 0, 0); c.restore();
    return cv.toDataURL('image/jpeg', .82);
  }
  function initTestimonials() {
    $('.t-eyebrow').textContent = S.testimonialsEyebrow; $('.t-heading').textContent = S.testimonialsHeading;
    var skin = $('.t-willow-skin'), cache = {};
    function setSkin() { var n = isNight(); if (!cache[n]) cache[n] = paintWillows(n); skin.style.backgroundImage = 'url(' + cache[n] + ')'; }
    setSkin(); document.addEventListener('theme:change', setSkin);
    $('.t-wavy').innerHTML = '<path d="' + A.crest + '"/>';
    $('.t-land').innerHTML = '<path d="' + A.tl_ridge + '" fill="#fc9073"/><path d="' + A.tl_back + '" fill="#b4c48c"/><path d="' + A.tl_front + '" fill="#c3cf98"/><path d="' + A.tl_strokes + '" fill="#f3efd9" opacity=".9"/>';
    var cards = $('#t-cards'), list = T.slice(), n = list.length, active = 0;
    function card(t, i, clone) {
      return '<figure class="t-card"' + (clone ? ' aria-hidden="true"' : ' data-i="' + i + '" role="group" aria-roledescription="slide" aria-label="' + (i + 1) + ' of ' + n + '"') + '>' +
        '<img class="t-quoteicon" src="assets/img/quote.svg" alt=""><blockquote class="t-quote">' + esc(t.quote) + '</blockquote><hr class="t-divider">' +
        '<figcaption class="t-author"><div class="t-authorrow"><span class="t-avatar" style="background:' + t.color + '">' + esc(t.name.split(' ').map(function (w) { return w[0]; }).join('')) + '</span><span class="t-name">' + esc(t.name) + '</span></div><span class="t-role">' + esc(t.role) + '</span></figcaption></figure>';
    }
    var base = list.map(function (t, i) { return card(t, i); }).join('');
    cards.innerHTML = base;
    cards.setAttribute('aria-roledescription', 'carousel'); cards.setAttribute('aria-label', 'Testimonials');
    // pagination dots
    var dots = document.createElement('div'); dots.className = 't-dots'; dots.setAttribute('role', 'tablist'); dots.setAttribute('aria-label', 'Choose testimonial');
    dots.innerHTML = list.map(function (t, i) { return '<button type="button" class="t-dot" role="tab" aria-label="Testimonial ' + (i + 1) + ' of ' + n + ' — ' + esc(t.name) + '" data-i="' + i + '"></button>'; }).join('');
    cards.parentNode.insertBefore(dots, cards.nextSibling);
    if (n < 2) dots.hidden = true;
    var testi = $('#testimonials'), fw = $('#work'), story = $('#story'), carousel = false;
    function wrap(i) { return ((i % n) + n) % n; }
    function paintDots() { $$('.t-dot', dots).forEach(function (d, i) { d.setAttribute('aria-selected', String(i === active)); d.tabIndex = i === active ? 0 : -1; }); }

    /* desktop: fanned deck, active card in front, neighbours at ±1 */
    function layoutDeck() {
      if (carousel) return;
      $$('.t-card', cards).forEach(function (el) {
        var i = +el.dataset.i, off = wrap(i - active);
        if (off > n / 2) off -= n;                       // shortest way round
        var vis = Math.abs(off) <= 1;
        el.style.setProperty('--pos', vis ? off : (off < 0 ? -1 : 1));
        el.style.zIndex = off === 0 ? 3 : vis ? 2 : 1;
        el.classList.toggle('is-active', off === 0);
        el.classList.toggle('is-hidden', !vis);
        el.setAttribute('aria-hidden', String(off !== 0));
      });
    }
    function go(i, from) {
      if (n < 2) return;
      active = wrap(i); paintDots();
      if (carousel) { var m = metrics(); cards.scrollTo({ left: m.baseX + active * m.stride, behavior: RM ? 'auto' : 'smooth' }); }
      else layoutDeck();
    }
    Scroll.add(function (s) {
      if (!mqDesk.matches) return;
      var flowTop = story.offsetTop + story.offsetHeight + fw.offsetHeight + (parseFloat(testi.style.marginTop) || 0);
      cards.style.setProperty('--spread', RM ? 1 : smooth((s.y - flowTop) / 460).toFixed(4));
    });
    // swipe / drag on the deck (pointer), horizontal trackpad swipe (wheel), arrow keys
    var drag = null;
    cards.addEventListener('pointerdown', function (e) {
      if (carousel || e.button !== 0) return;
      drag = { x: e.clientX, y: e.clientY, dx: 0, id: e.pointerId, moved: false };
    });
    addEventListener('pointermove', function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      drag.dx = e.clientX - drag.x;
      if (!drag.moved && Math.abs(drag.dx) > 8 && Math.abs(drag.dx) > Math.abs(e.clientY - drag.y)) { drag.moved = true; cards.classList.add('dragging'); try { cards.setPointerCapture(drag.id); } catch (err) {} }
      if (drag.moved) cards.style.setProperty('--drag', Math.max(-160, Math.min(160, drag.dx)) + 'px');
    });
    function endDrag(e) {
      if (!drag || (e && e.pointerId !== drag.id)) return;
      var d = drag; drag = null; cards.classList.remove('dragging'); cards.style.setProperty('--drag', '0px');
      if (d.moved) { if (d.dx < -50) go(active + 1); else if (d.dx > 50) go(active - 1); cards.addEventListener('click', function stop(ev) { ev.stopPropagation(); ev.preventDefault(); }, { capture: true, once: true }); }
    }
    addEventListener('pointerup', endDrag); addEventListener('pointercancel', endDrag);
    cards.addEventListener('click', function (e) {          // click a side card to bring it forward
      if (carousel) return; var c = e.target.closest('.t-card'); if (c && !c.classList.contains('is-active')) go(+c.dataset.i);
    });
    var wheelAcc = 0, wheelLock = 0;
    cards.addEventListener('wheel', function (e) {
      if (carousel || Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault(); var t = performance.now(); if (t < wheelLock) return;
      wheelAcc += e.deltaX;
      if (Math.abs(wheelAcc) > 40) { go(active + (wheelAcc > 0 ? 1 : -1)); wheelAcc = 0; wheelLock = t + 500; }
    }, { passive: false });
    testi.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(active + 1); var d = $$('.t-dot', dots)[active]; if (dots.contains(document.activeElement)) d.focus(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(active - 1); var d2 = $$('.t-dot', dots)[active]; if (dots.contains(document.activeElement)) d2.focus(); }
    });
    dots.addEventListener('click', function (e) { var d = e.target.closest('.t-dot'); if (d) go(+d.dataset.i); });

    /* tablet / mobile: native swipe carousel with infinite loop, dots follow the scroll */
    function setupCarousel() {
      var want = !mqDesk.matches;
      if (want === carousel) return; carousel = want;
      if (!want) { cards.innerHTML = base; layoutDeck(); paintDots(); return; }
      var clones = list.map(function (t, i) { return card(t, i, true); }).join('');
      cards.innerHTML = clones + base + clones;
      $$('.t-card', cards).forEach(function (el) { el.style.removeProperty('--pos'); el.style.zIndex = ''; el.classList.remove('is-hidden', 'is-active'); el.removeAttribute('aria-hidden'); });
      requestAnimationFrame(function () { var m = metrics(); cards.scrollLeft = m.baseX + active * m.stride; });
    }
    function metrics() {
      var all = $$('.t-card', cards), first = all[n] || all[0], next = all[n + 1] || first;
      var stride = next.offsetLeft - first.offsetLeft || first.offsetWidth, setW = stride * n;
      var baseX = first.offsetLeft - (cards.clientWidth - first.offsetWidth) / 2;
      return { setW: setW, baseX: baseX, stride: stride };
    }
    var st;
    cards.addEventListener('scroll', function () {
      if (!carousel) return;
      var m = metrics(), idx = wrap(Math.round((cards.scrollLeft - m.baseX) / m.stride));
      if (idx !== active) { active = idx; paintDots(); }
      clearTimeout(st);
      st = setTimeout(function () {
        if (!carousel) return;
        var m2 = metrics(), lo = m2.baseX - m2.stride / 2, hi = m2.baseX + m2.setW - m2.stride / 2;
        if (cards.scrollLeft >= hi) cards.scrollLeft -= m2.setW; else if (cards.scrollLeft < lo) cards.scrollLeft += m2.setW;
      }, 80);
    }, { passive: true });
    setupCarousel(); mqDesk.addEventListener('change', setupCarousel);
    layoutDeck(); paintDots();
  }

  /* ======================= FOOTER + GARDEN ======================= */
  // ridge of the dark land, as a fraction of land height, for x in 0..1
  function ridge(x) { return .34 + .1 * Math.sin(x * 6.28 * 1.1 + .6) + .06 * Math.sin(x * 6.28 * 2.7 + 2.1) + .03 * Math.sin(x * 6.28 * 6.3); }
  function soilFrac(x) { return Math.min(ridge(x), backRidge(x)); }
  function backRidge(x) { return .12 + .08 * Math.sin(x * 6.28 * .9 + 2.4) + .05 * Math.sin(x * 6.28 * 3.1 + 1); }
  function landSVG() {
    var N = 72, front = 'M0 221', back = 'M0 221', line = '';
    for (var i = 0; i <= N; i++) {
      var x = i / N * 1440; front += ' L' + x.toFixed(1) + ' ' + (ridge(i / N) * 221).toFixed(1); back += ' L' + x.toFixed(1) + ' ' + (backRidge(i / N) * 221).toFixed(1);
      line += (i ? ' L' : 'M') + x.toFixed(1) + ' ' + (ridge(i / N) * 221 - 1.5).toFixed(1);
    }
    front += ' L1440 221Z'; back += ' L1440 221Z';
    var strokes = ''; for (var k = 0; k < 14; k++) { var sx = (k * 103 + 37) % 1400, sy = 130 + (k * 37) % 80; strokes += '<path d="M' + sx + ' ' + sy + 'q40 -5 90 2q-45 4 -90 -2Z" fill="#3a3834" opacity=".55"/>'; }
    return '<svg class="ft-land" viewBox="0 0 1440 221" preserveAspectRatio="none" aria-hidden="true"><defs><filter id="ftgrain"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" result="n"/><feColorMatrix in="n" values="0 0 0 0 .5 0 0 0 0 .48 0 0 0 0 .45 0 0 0 .1 0" result="g"/><feComposite in="g" in2="SourceGraphic" operator="in" result="gi"/><feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="gi"/></feMerge></filter></defs>' +
      '<path d="' + back + '" fill="#2c2a26"/><path d="' + front + '" fill="#0d0c0f" filter="url(#ftgrain)"/>' + strokes +
      '<path d="' + line + '" fill="none" stroke="#f3ead2" stroke-width="2.4" stroke-linecap="round" opacity=".9"/></svg>';
  }
  function initFooter() {
    var f = $('#contact');
    $('.ft-sub').textContent = S.footerSub;
    $('.ft-head-btn').textContent = S.footerHead;
    $('.ft-credit').textContent = 'Designed by ' + S.name + ' · ' + S.location.split(',')[0].replace(/\b\w+/g, function (w) { return w[0] + w.slice(1).toLowerCase(); }) + ' @' + new Date().getFullYear();
    $('.ft-social').innerHTML = S.socials.map(function (s) { return '<a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.label) + '</a>'; }).join('');
    $('.ft-wavy').innerHTML = '<path d="' + window.WAVY_PATH + '"/>';
    $('.ft-land-clip').innerHTML = landSVG();
    var head = $('.ft-head');
    Scroll.add(function (s) {
      var r = head.getBoundingClientRect(), mid = (r.top + r.bottom) / 2;
      head.style.setProperty('--ft-grow', RM ? 1 : clamp((s.vh - mid) / (s.vh * .5), 0, 1).toFixed(4));
    });
    initGarden(f);
  }
  function rand(a, b) { return a + Math.random() * (b - a); }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function daisy(H) {
    var stemC = pick(['#b06a4d', '#a95c42', '#bb765b']), leaf = ['#33361a', '#2b2e14', '#3c4020', '#454a24'], petals = '', n = 11 + Math.floor(Math.random() * 4);
    for (var i = 0; i < n; i++) petals += '<ellipse cx="0" cy="-15" rx="6.5" ry="14" fill="' + pick(['#faf5e6', '#fbf7ec', '#f7f1df']) + '" stroke="#e2d5b0" stroke-width=".8" transform="rotate(' + (i * 360 / n) + ')"/>';
    var bend = rand(-14, 14);
    return '<path d="M40 ' + H + ' C' + (40 + bend) + ' ' + (H * .6) + ' ' + (40 - bend) + ' ' + (H * .3) + ' 40 26" stroke="' + stemC + '" stroke-width="3" fill="none"/>' +
      '<path d="M40 ' + (H * .75) + ' C24 ' + (H * .66) + ' 14 ' + (H * .7) + ' 6 ' + (H * .58) + ' C22 ' + (H * .58) + ' 32 ' + (H * .64) + ' 40 ' + (H * .72) + 'Z" fill="' + pick(leaf) + '"/>' +
      '<path d="M41 ' + (H * .85) + ' C56 ' + (H * .76) + ' 66 ' + (H * .8) + ' 76 ' + (H * .68) + ' C60 ' + (H * .68) + ' 50 ' + (H * .74) + ' 41 ' + (H * .82) + 'Z" fill="' + pick(leaf) + '"/>' +
      '<g class="head" transform="translate(40 26)"><g>' + petals + '<circle r="8.5" fill="#e89a1c"/><circle cx="-2.5" cy="-2" r="1.2" fill="#f6c740"/><circle cx="2.4" cy="2" r="1.1" fill="#b9791a"/><circle cx="2" cy="-3" r="1" fill="#f6c740"/></g></g>';
  }
  function lavender(H) {
    var stem = pick(['#5c7d3f', '#4a6b33', '#6f9450']), fl = ['#7c5fa6', '#684c90', '#8f73b8', '#5b4680', '#9a80c2'], buds = '';
    for (var i = 0; i < 16; i++) { var y = 10 + i * (H * .32 / 16), w = 4.5 - i * .12; buds += '<ellipse cx="' + (40 + (i % 2 ? w : -w)) + '" cy="' + y.toFixed(1) + '" rx="' + (w + .5).toFixed(1) + '" ry="5" fill="' + pick(fl) + '"/>'; }
    return '<path d="M40 ' + H + ' Q' + rand(34, 46) + ' ' + (H * .5) + ' 40 10" stroke="' + stem + '" stroke-width="2.4" fill="none"/>' +
      '<path d="M40 ' + (H * .8) + ' q-14 -18 -22 -14 q10 2 22 16Z" fill="' + stem + '"/><g class="head">' + buds + '</g>';
  }
  function foliage(H) {
    var cols = ['#33361a', '#2b2e14', '#3c4020', '#454a24', '#4f5a2a'], out = '<g class="head">';
    for (var i = 0; i < 7; i++) { var tx = 40 + rand(-26, 26), ty = rand(4, H * .35); out += '<path d="M40 ' + H + ' Q' + ((40 + tx) / 2 + rand(-8, 8)) + ' ' + (H * .55) + ' ' + tx.toFixed(1) + ' ' + ty.toFixed(1) + ' Q' + ((40 + tx) / 2 + 6) + ' ' + (H * .6) + ' 44 ' + H + 'Z" fill="' + pick(cols) + '"/>'; }
    return out + '</g>';
  }
  function initGarden(f) {
    var garden = $('.ft-garden'), inner = $('.ft-inner'), land = $('.ft-land'), plants = [];
    var compact = function () { return !mqDesk.matches; };
    var defs = '<svg width="0" height="0" style="position:absolute"><filter id="ft-paint"><feTurbulence type="fractalNoise" baseFrequency="0.028 0.04" numOctaves="2" seed="6"/><feDisplacementMap in="SourceGraphic" scale="4"/></filter></svg>';
    function build() {
      garden.innerHTML = defs; plants = [];
      var nc = 5 + Math.round(Math.random()), centres = [];
      for (var c = 0; c < nc; c++) centres.push(clamp((c + .5) / nc * 100 + rand(-5, 5), 7, 93));
      for (var i = 0; i < 20; i++) {
        var x = clamp(centres[i % nc] + rand(-6, 6), 2, 98), roll = Math.random(), type = roll < .5 ? 'daisy' : roll < .78 ? 'lavender' : 'foliage';
        var H = type === 'daisy' ? rand(165, 245) : type === 'lavender' ? rand(150, 215) : rand(80, 130);
        var el = document.createElement('div'); el.className = 'plant';
        var g = mqMob.matches ? rand(.4, .7) : rand(.55, .95);
        el.style.cssText = 'left:' + x + '%;--g:' + g.toFixed(3) + ';--swayA:' + rand(1.4, 3.4).toFixed(2) + 'deg;--sway:' + rand(4, 7).toFixed(2) + 's;--sway-d:' + rand(-3, 0).toFixed(2) + 's';
        el.innerHTML = '<div class="sway"><svg width="80" height="' + H.toFixed(0) + '" viewBox="0 0 80 ' + H.toFixed(0) + '" filter="url(#ft-paint)">' + (type === 'daisy' ? daisy(H) : type === 'lavender' ? lavender(H) : foliage(H)) + '</svg></div>';
        garden.appendChild(el);
        plants.push({ el: el, x: x / 100, H: H, g: g });
      }
      place();
    }
    function place() {
      var fr = f.getBoundingClientRect(), lr = land.getBoundingClientRect();
      plants.forEach(function (p) {
        var px = p.x * fr.width, lx = (px - (lr.left - fr.left)) / lr.width;
        var soil = (lr.top - fr.top) + soilFrac(clamp(lx, 0, 1)) * lr.height + 7 + (compact() ? rand(4, 28) : 0);
        p.baseY = soil; p.el.style.top = (soil - p.H) + 'px'; p.el.style.bottom = 'auto';
      });
    }
    build();
    addEventListener('resize', function () { place(); });
    if (RM) return;
    // watering can + tip + drops (fine pointers only)
    if (!FINE) {
      f.addEventListener('pointerdown', function (e) { if (!e.target.closest('.ft-head-btn, .ft-social, a, button')) grow(e.clientX, e.clientY); });
      return;
    }
    var can = document.createElement('div'); can.className = 'ft-cursor';
    can.innerHTML = '<svg viewBox="0 0 58 58" width="58" height="58"><g transform="rotate(20 29 29)"><path d="M12 22h24l-2 22H14z" fill="#d99f8c"/><path d="M12 22h24v4H12z" fill="#cf8f7b"/><path d="M36 28l14-10 2 3-14 12z" fill="#d69880"/><path d="M10 26c-6 0-7 12 2 12" stroke="#c9856f" stroke-width="3" fill="none"/><path d="M22 31c1.5-2 4.5-1 4 1.2-.4 2-4 3.6-4 3.6s-3.6-1.6-4-3.6c-.5-2.2 2.5-3.2 4-1.2z" fill="#a85a48"/></g>' +
      '<circle class="mist" cx="44" cy="43" r="1.6" fill="#8fd0f0" style="--mx:3px;--my:12px"/><circle class="mist" cx="46" cy="42" r="1.3" fill="#8fd0f0" style="--mx:8px;--my:11px"/><circle class="mist" cx="43" cy="44" r="1.2" fill="#8fd0f0" style="--mx:2px;--my:13px"/></svg>';
    var tip = document.createElement('div'); tip.className = 'ft-tip'; tip.textContent = 'Click to grow';
    var dropsBox = document.createElement('div'); dropsBox.className = 'ft-drops';
    document.body.appendChild(can); document.body.appendChild(tip); document.body.appendChild(dropsBox);
    var drops = [], running = false, lastDrop = 0, px = 0, py = 0, inside = false;
    function overUI(t) { return !!(t.closest && t.closest('.ft-head-btn, .ft-social, .ft-inner p')); }
    f.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') { inside = true; f.classList.add('garden-live'); } });
    f.addEventListener('pointerleave', function () { inside = false; f.classList.remove('garden-live'); can.classList.remove('on'); tip.classList.remove('on'); });
    f.addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse') return;
      px = e.clientX; py = e.clientY;
      var ui = overUI(e.target);
      can.classList.toggle('on', inside && !ui); f.classList.toggle('garden-live', !ui);
      can.style.transform = 'translate(' + (px - 44) + 'px,' + (py - 43) + 'px)';
      tip.style.transform = 'translate(' + (px + 16) + 'px,' + (py + 2) + 'px)';
      tip.classList.toggle('on', !ui && nearest(px, py).d < 80);
      var t = performance.now();
      if (!ui && t - lastDrop > 120 && py < soilAt(px)) { lastDrop = t; spawn(px, py, 1, .6); }
    });
    f.addEventListener('pointerdown', function (e) {
      if (overUI(e.target)) return;
      spawn(e.clientX, e.clientY, 16, 2.2); grow(e.clientX, e.clientY);
    });
    function soilAt(cx) { var lr = land.getBoundingClientRect(); return lr.top + soilFrac(clamp((cx - lr.left) / lr.width, 0, 1)) * lr.height + 7; }
    function spawn(x, y, n, spread) {
      for (var i = 0; i < n && drops.length < 90; i++) {
        var r = rand(2.4, 4.6), el = document.createElement('span'); el.className = 'ft-drop'; el.style.width = el.style.height = (r * 2) + 'px';
        dropsBox.appendChild(el); drops.push({ el: el, x: x + 4, y: y + 4, vx: rand(-spread, spread), vy: rand(0, 1.5), a: 1, splash: false });
      }
      if (!running) { running = true; requestAnimationFrame(tick); }
    }
    function tick() {
      drops = drops.filter(function (d) {
        if (!d.splash) { d.vy += .42; d.x += d.vx; d.y += d.vy; if (d.y >= soilAt(d.x)) { d.splash = true; d.y = soilAt(d.x); } }
        else { d.a -= .16; d.vx *= .7; d.x += d.vx; }
        if (d.a <= 0 || d.y > innerHeight + 20) { d.el.remove(); return false; }
        d.el.style.transform = 'translate(' + d.x + 'px,' + d.y + 'px)' + (d.splash ? ' scale(1.4,.5)' : ''); d.el.style.opacity = d.a;
        return true;
      });
      if (drops.length) requestAnimationFrame(tick); else running = false;
    }
  }
  var gardenRef = null;
  function nearest(cx, cy) {
    var best = { d: Infinity, p: null };
    (gardenRef || []).forEach(function (p) {
      var r = p.el.getBoundingClientRect(), x = r.left + r.width / 2, top = r.top, bot = r.bottom;
      var dy = cy < top ? top - cy : cy > bot ? cy - bot : 0, d = Math.hypot(cx - x, dy);
      if (d < best.d) best = { d: d, p: p };
    });
    return best;
  }
  function grow(cx, cy) {
    var inner = $('.ft-inner').getBoundingClientRect();
    (gardenRef || []).forEach(function (p) {
      var r = p.el.getBoundingClientRect(), x = r.left + r.width / 2, dy = cy < r.top ? r.top - cy : cy > r.bottom ? cy - r.bottom : 0;
      if (Math.hypot(cx - x, dy) > 80) return;
      var baseY = r.bottom, max = Math.min(1.75, (baseY - (inner.bottom + 18)) / p.H);
      if (p.g >= max - .01) { p.el.classList.remove('bloomed'); void p.el.offsetWidth; p.el.classList.add('bloomed'); return; }
      p.g = Math.min(max, p.g + rand(.14, .24)); p.el.style.setProperty('--g', p.g.toFixed(3));
    });
  }

  /* ======================= BOOT ======================= */
  initNav();
  initCursor();
  initHero();
  initIntro();
  initWork();
  initTestimonials();
  initFooter();
  // expose plants for proximity helpers
  gardenRef = []; $$('.plant').forEach(function (el) { var svg = el.querySelector('svg'); gardenRef.push({ el: el, H: +svg.getAttribute('height'), g: parseFloat(el.style.getPropertyValue('--g')) }); });
  initPlaneAndPins();
  observeReveals();
  // ambient animation gate
  if ('IntersectionObserver' in window) {
    var gate = new IntersectionObserver(function (es) { es.forEach(function (en) { en.target.classList.toggle('anim-idle', !en.isIntersecting); }); }, { rootMargin: '80px 0px' });
    $$('.logo-marquee-wrap, .testimonials, .footer').forEach(function (el) { gate.observe(el); });
  }
  // loader (cold load only)
  if (!window.arrivedViaCurtain) {
    var ready = Promise.all([document.fonts ? document.fonts.ready : Promise.resolve()]);
    pageLoader.show(ready, { min: 1200, cap: 8000 });
  } else { var pl = document.getElementById('page-loader'); if (pl) pl.style.display = 'none'; document.documentElement.classList.remove('pl-lock'); }
  if (location.hash === '#contact') setTimeout(function () { var c = $('#contact'); scrollTo({ top: c.getBoundingClientRect().top + scrollY - 80, behavior: 'instant' }); }, 80);
})();
