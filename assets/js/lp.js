/* ==========================================================================
   INNER PAGES — sheet shell · chrome · Explore omnibar · ocean footer · cursor/tooltip
   + page renderers: projects (index) · search (blogs) · detail
   ========================================================================== */
(function () {
  var S = window.SITE, P = window.PROJECTS, B = window.POSTS;
  var $ = U.$, $$ = U.$$, esc = U.esc, clamp = U.clamp, RM = U.RM;
  var FINE = matchMedia('(hover:hover) and (pointer:fine)').matches;
  var mqMob = matchMedia('(max-width:800px)');
  var PAGE = document.body.getAttribute('data-page');
  var qs = new URLSearchParams(location.search);
  // detail pages: pre-built files (project-<slug>.html / blog-<slug>.html) carry data-type/data-slug; detail.html?type=&slug= still works
  var DTYPE = document.body.getAttribute('data-type') || qs.get('type') || 'project', DSLUG = document.body.getAttribute('data-slug') || qs.get('slug');
  var COLORS = { red: '#e8524a', orange: '#f28a3c', yellow: '#f5c842', lime: '#a8cf45', green: '#4fa65a', mint: '#5fcfae', cyan: '#3fc3d9', sky: '#6fb8f2', blue: '#3b6fe0', violet: '#8b62d9', magenta: '#cf4fae', pink: '#f28bb8' };
  document.documentElement.classList.add('lp');

  /* ---------- helpers ---------- */
  function hrefFor(item) { return (P.indexOf(item) > -1 ? 'project-' : 'blog-') + item.slug + '.html'; }
  function media(item, seed, w, h, cls) {
    if (item.image) return '<img src="' + esc(item.image) + '" alt="" class="' + (cls || '') + '" loading="lazy">';
    return window.coverArt(item, seed, w, h).replace('<svg ', '<svg class="' + (cls || '') + '" ');
  }
  function card(item, opts) {
    opts = opts || {};
    var label = item.title + ', ' + (P.indexOf(item) > -1 ? 'Project' : 'Blog') + '. ' + item.description;
    return '<a class="card" data-hover="artifact" data-tip="' + esc(item.description) + '" data-slug="' + item.slug + '" href="' + hrefFor(item) + '" aria-label="' + esc(label) + '">' +
      '<span class="card-media" style="--pal:' + item.palette[1] + (opts.ar ? ';--ar:' + opts.ar : '') + '">' + media(item, opts.seed || 0, opts.w || 400, opts.h || 500, 'fade-img') + '</span></a>';
  }
  function fadeImages(root) {
    $$('.fade-img', root).forEach(function (el) {
      if (el.tagName === 'IMG' && !el.complete) el.addEventListener('load', function () { el.classList.add('loaded'); }, { once: true });
      else requestAnimationFrame(function () { el.classList.add('loaded'); });
    });
  }
  var BIRD = '<svg viewBox="0 0 390 138" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">' +
    '<g class="body"><path class="wing l" d="M195 92 C160 40 110 30 60 52"/><path class="wing r" d="M195 92 C230 40 280 30 330 52"/><path d="M182 96 Q195 104 208 96"/></g></g></svg>';

  var FOOT_ICONS = {
    home: '<path d="M3.5 10.5 12 4l8.5 6.5V19a1 1 0 0 1-1 1h-4.5v-5.5h-6V20H4.5a1 1 0 0 1-1-1z"/>',
    projects: '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
    blogs: '<path d="M5 19.5h4l10-10a2.1 2.1 0 0 0-3-3l-10 10z"/><path d="M14 8l3 3"/>',
    about: '<circle cx="12" cy="8.5" r="3.5"/><path d="M5 20c1-3.6 3.7-5.5 7-5.5s6 1.9 7 5.5"/>',
    contact: '<rect x="3.5" y="6" width="17" height="12.5" rx="2"/><path d="m4.5 7.5 7.5 6 7.5-6"/>'
  };
  function footerLinks() {
    var cur = PAGE === 'projects' || (PAGE === 'detail' && DTYPE !== 'post') ? 'projects' : PAGE === 'search' || (PAGE === 'detail' && DTYPE === 'post') ? 'blogs' : PAGE === 'about' ? 'about' : '';
    return [['home', 'Home', 'index.html'], ['projects', 'Projects', 'projects.html'], ['blogs', 'Blogs', 'blog.html'], ['about', 'About', 'about.html'], ['contact', 'Contact', 'index.html#contact']].map(function (l) {
      return '<a href="' + l[2] + '"' + (l[0] === 'contact' ? ' data-contact-open' : '') + (l[0] === cur ? ' aria-current="page"' : '') + ' aria-label="' + l[1] + '" data-cursor="pointer">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + FOOT_ICONS[l[0]] + '</svg><span>' + l[1] + '</span></a>';
    }).join('');
  }

  var letterI = 0;
  function letters(t) { return t.split('').map(function (ch) { return ch === ' ' ? '<span class="of-space"> </span>' : '<span class="of-letter" style="--i:' + (letterI++) + '" aria-hidden="true">' + esc(ch) + '</span>'; }).join(''); }

  /* ---------- beach scene (original illustration, sits behind the sheet) ---------- */
  function beachSVG() {
    var stripes = '';
    for (var i = -12; i < 14; i++) stripes += '<rect x="' + (1060 + i * 15) + '" y="60" width="9" height="400" fill="#FFDA3F" transform="rotate(45 1060 250)"/>';
    return '<svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs>' +
      '<radialGradient id="bsky" cx=".69" cy=".23" r="1.1"><stop offset="0" stop-color="#71b7f4"/><stop offset="1" stop-color="#5788b3"/></radialGradient>' +
      '<radialGradient id="bdome" cx=".26" cy="1.05" r=".75"><stop offset="0" stop-color="#fff"/><stop offset=".55" stop-color="#fff" stop-opacity=".85"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="bglow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FFF7D4" stop-opacity=".6"/><stop offset="1" stop-color="#FFF7D4" stop-opacity="0"/></radialGradient>' +
      '<clipPath id="bsun"><circle cx="1060" cy="250" r="96"/></clipPath></defs>' +
      '<rect width="1440" height="900" fill="url(#bsky)"/><rect width="1440" height="900" fill="url(#bdome)"/>' +
      '<circle cx="1060" cy="250" r="230" fill="url(#bglow)"/><g clip-path="url(#bsun)">' + stripes + '</g>' +
      '<g fill="#FFF9E9" opacity=".55"><path d="M760 300c8-20 30-27 52-20 14-18 46-24 70-10 28-18 74-14 102 8 12 6 21 13 25 22z"/><path d="M1110 360c10-22 40-30 66-20 18-20 58-26 86-10 34-20 90-14 124 10 14 6 24 14 28 22z"/></g>' +
      '<path d="M0 700 C 260 640 520 720 760 680 S 1200 630 1440 680 V900 H0Z" fill="#eee8d2"/>' +
      '<path d="M0 760 C 300 720 600 790 900 750 S 1300 720 1440 750 V900 H0Z" fill="#0d0c0f"/>' +
      '<path d="M0 760 C 300 720 600 790 900 750 S 1300 720 1440 750" stroke="#f3ead2" stroke-width="3" fill="none"/></svg>';
  }

  /* ---------- watercolour swatch ---------- */
  function swatchSVG(key, i) {
    var c = COLORS[key];
    return '<svg viewBox="0 0 48 48" aria-hidden="true"><defs><filter id="wc' + i + '" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency=".09" numOctaves="2" seed="' + (i + 3) + '"/><feDisplacementMap in="SourceGraphic" scale="7"/></filter></defs>' +
      '<g filter="url(#wc' + i + ')"><circle cx="24" cy="24" r="18" fill="' + c + '" opacity=".55"/><circle cx="24" cy="24" r="14" fill="' + c + '" opacity=".5"/>' +
      '<circle class="pool" cx="24" cy="24" r="16" fill="' + c + '"/></g></svg>';
  }

  /* ---------- shell ---------- */
  var scroller, inner, frame, chrome, omni, omniHost, veil;
  function buildShell(content) {
    var back = PAGE === 'detail';
    var backHref = DTYPE === 'post' ? 'blog.html' : 'projects.html';
    document.body.insertAdjacentHTML('afterbegin',
      '<div class="beach" aria-hidden="true"><div class="beach-media">' + beachSVG() + '</div></div>' +
      '<div class="frame" data-footer-phase="rest"><div class="route-motion">' +
      '<div class="sheet"><div class="sheet-scroll" data-site-scroll-root><div class="sheet-inner"><div class="route-content" id="route-content"></div></div></div></div>' +
      '<div class="chrome" data-scrolled="false">' +
      (back ? '<a class="round-btn back-btn" href="' + backHref + '" aria-label="Back to all ' + (DTYPE === 'post' ? 'blogs' : 'projects') + '" data-cursor="pointer"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M16 10H4M9 5l-5 5 5 5"/></svg></a>'
        : '<a class="site-logo" href="index.html" aria-label="Go to home" data-cursor="pointer"><span>' + esc(S.name) + '</span></a>') +
      '<button class="round-btn env-btn" type="button" aria-label="Contact me" data-contact-open data-cursor="pointer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round">' +
      '<g class="lyr"><rect x="4" y="7" width="16" height="11" rx="1.5"/></g><g class="lyr flap"><path d="M4.5 7.5 12 13l7.5-5.5"/></g><g class="lyr seal"><circle cx="12" cy="12.6" r="1.5" fill="#e8524a" stroke="none"/></g></svg></button>' +
      '<button class="lp-theme day-toggle" type="button" aria-label="Toggle night mode" aria-pressed="' + document.body.classList.contains('night') + '" data-cursor="pointer">' +
      '<svg class="sun-ic" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" fill="#f5a623"/>' + [0,1,2,3,4,5,6,7].map(function (i) { var a = i * Math.PI / 4; return '<circle cx="' + (12 + Math.cos(a) * 8.4).toFixed(2) + '" cy="' + (12 + Math.sin(a) * 8.4).toFixed(2) + '" r="1.15" fill="#f5a623"/>'; }).join('') + '</svg>' +
      '<svg class="moon-ic" viewBox="0 0 24 24" aria-hidden="true"><path fill="#f2ead6" d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/></svg></button>' +
      '</div></div>' +
      '<footer class="ocean-footer" aria-label="Site footer"><div class="of-status"><span>' + esc(S.clockLabel) + '</span><span class="of-sep">·</span><span class="of-clock"></span><span class="of-weather"></span></div>' +
      '<h2 class="of-signature"><button type="button" class="of-sig-btn" data-contact-open aria-label="' + esc(S.tagline[0] + ' & ' + S.tagline[1]) + ' — get in touch">' + letters(S.tagline[0] + ' ') + '<em>' + letters('&') + '</em>' + letters(' ' + S.tagline[1]) + '</button></h2>' +
      '<nav class="of-links" aria-label="Footer">' + footerLinks() + '</nav></footer>' +
      '</div>' +
      '<div class="veil" id="veil"></div>' +
      '<div class="omni-host" id="omni-host"><form class="omnibar" id="omnibar" role="search" action="blog.html" autocomplete="off">' +
      '<div class="dock"><button type="button" class="dock-explore" aria-expanded="false" data-cursor="pointer"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6" stroke="currentColor"/><path d="M15 15l5 5" stroke="#fc9073"/></svg>Explore</button>' +
      '<button type="button" class="dock-ask" aria-expanded="false" aria-controls="ask-panel" data-cursor="pointer"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="#f2a33a" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="10" r="3.4" fill="#ffda3f" stroke="none"/><path d="M4 17c2.5-1.6 5.5-1.6 8 0s5.5 1.6 8 0" stroke="#fc9073"/></svg>Ask</button></div>' +
      '<div class="omni-panel"><div class="search-row"><svg class="glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5 5"/></svg>' +
      '<input type="search" name="q" placeholder="Search ' + esc(S.firstName) + '\'s work" aria-label="Search">' +
      '<button class="icon-btn" type="submit" aria-label="Search"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M3 9h12M10 4l5 5-5 5"/></svg></button>' +
      '<button class="icon-btn omni-close" type="button" aria-label="Close"><svg width="16" height="16" viewBox="0 0 16 16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M3 3l10 10M13 3 3 13"/></svg></button></div>' +
      '<div class="rows" data-lenis-prevent></div></div></form></div>' +
      '<div class="cbar" aria-hidden="true"><i></i></div>');
    scroller = $('.sheet-scroll'); inner = $('#route-content'); frame = $('.frame'); chrome = $('.chrome');
    omni = $('#omnibar'); omniHost = $('#omni-host'); veil = $('#veil');
    inner.innerHTML = content;
  }

  /* ---------- smooth scroll (Lenis on the sheet) ---------- */
  var lenis = null;
  function initLenis() {
    if (RM || !window.Lenis) return;
    lenis = new window.Lenis({ wrapper: scroller, content: $('.sheet-inner'), eventsTarget: scroller, duration: 1.1, easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smoothWheel: true, wheelMultiplier: .9, touchMultiplier: 1, prevent: function (el) { return !!(el.closest && el.closest('[data-lenis-prevent]')); } });
    // drive Lenis ourselves (autoRaf is not available in this version)
    (function loop(t) { lenis.raf(t); requestAnimationFrame(loop); })(performance.now());
  }

  /* ---------- chrome behaviours ---------- */
  function initChrome() {
    var bar = $('.cbar'), thumb = bar.firstChild, hideT;
    function onScroll() {
      var y = scroller.scrollTop, max = scroller.scrollHeight - scroller.clientHeight;
      chrome.setAttribute('data-scrolled', String(y > 40));
      if (max > 10) {
        var th = Math.max(16, 144 * scroller.clientHeight / scroller.scrollHeight);
        thumb.style.height = th + 'px'; thumb.style.top = ((144 - th) * (y / max)) + 'px';
        bar.classList.add('on'); clearTimeout(hideT); hideT = setTimeout(function () { bar.classList.remove('on'); }, 900);
      }
      document.dispatchEvent(new Event('sheet:scroll'));
    }
    scroller.addEventListener('scroll', onScroll, { passive: true });
    // day / night (shared with the home page via localStorage)
    var tb = $('.lp-theme');
    tb.addEventListener('click', function () {
      var night = !document.body.classList.contains('night');
      var swap = function () { document.body.classList.toggle('night', night); try { localStorage.setItem('theme', night ? 'night' : 'day'); } catch (e) {} tb.setAttribute('aria-pressed', String(night)); };
      if (document.startViewTransition && !RM && !document.hidden) { var vt = document.startViewTransition(swap); vt.ready.catch(function () {}); vt.finished.catch(function () {}); } else swap();
    });
    // envelope = open the contact form (tooltip follows the pointer)
    var env = $('.env-btn'), ct = document.createElement('div'); ct.className = 'copy-tip'; ct.textContent = 'Contact me'; document.body.appendChild(ct);
    env.addEventListener('pointerenter', function () { if (FINE) ct.classList.add('on'); });
    env.addEventListener('pointerleave', function () { ct.classList.remove('on'); });
    env.addEventListener('pointermove', function (e) { ct.style.left = (e.clientX - 100) + 'px'; ct.style.top = (e.clientY + 14) + 'px'; });
    env.addEventListener('click', function () { ct.classList.remove('on'); });
  }

  /* ---------- Explore omnibar ---------- */
  function rowsHTML() {
    var tag = qs.get('tag'), color = qs.get('color');
    var chips = S.suggested.map(function (t) { return '<span class="omni-reveal" data-k><button type="button" class="chip" data-tag="' + esc(t) + '" aria-pressed="' + (t === tag) + '" data-cursor="pointer">' + esc(t) + '</button></span>'; }).join('');
    var sw = Object.keys(COLORS).map(function (k, i) { return '<span class="color-slot"><button type="button" class="swatch omni-reveal" data-k data-color="' + k + '" aria-label="' + k + '" aria-pressed="' + (k === color) + '" data-cursor="pointer">' + swatchSVG(k, i) + '</button></span>'; }).join('');
    var shelf = function (list) { return list.map(function (it, i) { return '<span class="omni-reveal" data-k>' + card(it, { seed: i }) + '</span>'; }).join(''); };
    return '<section class="row"><h2 class="section-label omni-reveal" data-k>Suggested</h2><div class="rail">' + chips + '</div></section>' +
      '<section class="row"><h2 class="section-label omni-reveal" data-k>Color</h2><div class="spectrum">' + sw + '</div></section>' +
      '<section class="row"><div class="shelf-head"><h2 class="section-label omni-reveal" data-k>Projects</h2><a class="view-all omni-reveal" data-k href="projects.html">View all</a></div><div class="shelf" role="list">' + shelf(P) + '</div></section>' +
      '<section class="row"><div class="shelf-head"><h2 class="section-label omni-reveal" data-k>Blogs</h2><a class="view-all omni-reveal" data-k href="blog.html">View all</a></div><div class="shelf" role="list">' + shelf(B) + '</div></section>';
  }
  function initOmnibar() {
    var rows = $('.rows', omni), input = $('input', omni), btn = $('.dock-explore', omni);
    rows.innerHTML = rowsHTML();
    if (PAGE === 'search' && (qs.get('tag') || qs.get('color') || qs.get('q'))) omni.setAttribute('data-contextual-results', 'true');
    input.value = qs.get('q') || '';
    // stagger: rowBeat = 60 + 80*max(0,row-1); item = rowBeat + 60 + 50*i
    $$('.row', rows).forEach(function (row, r) {
      var beat = 60 + 80 * Math.max(0, r - 1);
      $$('[data-k]', row).forEach(function (el, i) { el.style.setProperty('--d', (beat + 60 + 50 * i) + 'ms'); });
    });
    var open = false;
    function size() {
      if (mqMob.matches) return;
      var w = Math.min(840, innerWidth - 340); if (w < 420) w = Math.min(innerWidth - 32, 560);
      omni.style.width = w + 'px';
      omni.style.height = (48 + rows.scrollHeight) + 'px';
    }
    function setOpen(v) {
      if (v === open) return; open = v;
      btn.setAttribute('aria-expanded', String(v));
      omniHost.classList.toggle('open', v); veil.classList.toggle('open', v);
      if (v) {
        omni.classList.remove('closing'); omni.classList.add('open');
        rows.style.maxHeight = ''; size(); setTimeout(function () { input.focus({ preventScroll: true }); }, 120);
        if (lenis) lenis.stop();
      } else {
        omni.classList.add('closing'); omni.classList.remove('open'); omni.style.width = ''; omni.style.height = '';
        if (lenis) lenis.start();
      }
    }
    btn.addEventListener('click', function () { if (window.closeAsk) window.closeAsk(); setOpen(!open); });
    $('.omni-close', omni).addEventListener('click', function () { setOpen(false); });
    veil.addEventListener('click', function () { setOpen(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && open) setOpen(false);
      if ((e.key === '/' || (e.key === 'k' && (e.metaKey || e.ctrlKey))) && !open && document.activeElement.tagName !== 'INPUT') { e.preventDefault(); setOpen(true); }
    });
    addEventListener('resize', function () { if (open) size(); });
    omni.addEventListener('submit', function (e) {
      e.preventDefault(); var q = input.value.trim(); setOpen(false);
      go('blog.html' + (q ? '?q=' + encodeURIComponent(q) : ''));
    });
    rows.addEventListener('click', function (e) {
      var chip = e.target.closest('.chip'), sw = e.target.closest('.swatch');
      if (chip) { var t = chip.dataset.tag, on = chip.getAttribute('aria-pressed') === 'true'; setOpen(false); go('blog.html' + (on ? '' : '?tag=' + encodeURIComponent(t))); }
      if (sw) { var c = sw.dataset.color, onc = sw.getAttribute('aria-pressed') === 'true'; setOpen(false); go('blog.html' + (onc ? '' : '?color=' + c)); }
    });
    // watercolour "pooling" sprite: 16 frames @72ms, forward on enter, reverse on leave
    $$('.swatch', rows).forEach(function (sw) {
      var f = sw.getAttribute('aria-pressed') === 'true' ? 15 : 0, dir = 0, t = null;
      sw.style.setProperty('--f', f);
      function run() { clearInterval(t); t = setInterval(function () {
        f = clamp(f + dir, 0, 15); sw.style.setProperty('--f', f);
        if ((dir > 0 && f === 15) || (dir < 0 && f === 0)) clearInterval(t);
      }, 72); }
      sw.addEventListener('pointerenter', function () { dir = 1; run(); });
      sw.addEventListener('pointerleave', function () { if (sw.getAttribute('aria-pressed') === 'true') return; dir = -1; run(); });
    });
    fadeImages(rows);
    window.openExplore = function () { setOpen(true); };
    window.closeExplore = function () { setOpen(false); };
    window.isExploreOpen = function () { return open; };
  }

  /* ---------- route transitions (dim .6) + card → detail flight ---------- */
  function go(href) {
    if (RM) { location.href = href; return; }
    inner.classList.add('exiting');
    setTimeout(function () { location.href = href; }, 200);
  }
  window.routeTo = function (href) {
    var url = new URL(href, location.href);
    // leaving the editorial pages for the home page uses the curtain
    if (/index\.html$|\/$/.test(url.pathname)) { curtainTo(href); return; }
    go(href);
  };
  function curtainTo(href) {
    var c = document.getElementById('route-curtain');
    if (!c) { c = document.createElement('div'); c.id = 'route-curtain'; c.innerHTML = '<div class="rc-scrim"></div><div class="rc-pane rc-pane--top"></div><div class="rc-pane rc-pane--bottom"></div>'; document.body.appendChild(c); }
    c.classList.add('is-active', 'is-closing'); void c.offsetWidth; c.classList.add('is-closed');
    try { sessionStorage.setItem('curtain', '1'); } catch (e) {}
    setTimeout(function () { location.href = href; }, 550);
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a.card'); if (!a || e.metaKey || e.ctrlKey || e.shiftKey) return;
    var m = a.querySelector('.card-media'); if (!m) return;
    var r = m.getBoundingClientRect();
    try { sessionStorage.setItem('flight', JSON.stringify({ slug: a.dataset.slug, x: r.left, y: r.top, w: r.width, h: r.height })); } catch (err) {}
  }, true);

  /* ---------- ocean footer reveal ---------- */
  function initFooter() {
    var phase = 'rest', footer = $('.ocean-footer'), rm = $('.route-motion'), clock = $('.of-clock');
    var tick = function () { clock.textContent = localTime(); }; tick(); setInterval(tick, 30000);
    var wxEl = $('.of-weather');
    getWeather().then(function (w) { wxEl.innerHTML = '<span class="of-sep">·</span>' + weatherIcon(w.code, '#fff') + '<span>' + w.temp + '°C</span>'; wxEl.style.width = 'auto'; }).catch(function () { wxEl.remove(); });
    function set(p) { phase = p; frame.setAttribute('data-footer-phase', p); document.body.setAttribute('data-footer', p); }
    set('rest');
    function open() {
      if (phase !== 'rest') return; set('exiting'); if (lenis) lenis.stop();
      rm.style.setProperty('--footer-progress', (footer.offsetHeight + 24) + 'px');
      document.documentElement.style.setProperty('--ocean-blur', 0);
      setTimeout(function () { if (phase === 'exiting') set('open'); }, RM ? 0 : 1000);
    }
    function close() {
      if (phase !== 'open') return; set('returning');
      rm.style.setProperty('--footer-progress', '0px');
      document.documentElement.style.setProperty('--ocean-blur', 1);
      setTimeout(function () { set('rest'); if (lenis) lenis.start(); }, RM ? 0 : 1000);
    }
    function remaining() { return scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight; }
    addEventListener('wheel', function (e) {
      if (omniHost.classList.contains('open') || document.querySelector('.contact-drawer.open, .lightbox.open, .ask-panel.open')) return;
      if (phase === 'rest' && e.deltaY > 0 && remaining() <= 4) { e.preventDefault(); open(); }
      else if (phase === 'open' && e.deltaY < 0) { e.preventDefault(); close(); }
      else if (phase !== 'rest') e.preventDefault();
    }, { passive: false });
    var ty = null;
    addEventListener('touchstart', function (e) { ty = e.touches[0].clientY; }, { passive: true });
    addEventListener('touchend', function (e) {
      if (ty == null) return; var dy = ty - e.changedTouches[0].clientY; ty = null;
      if (phase === 'rest' && dy > 60 && remaining() <= 4) open(); else if (phase === 'open' && dy < -60) close();
    }, { passive: true });
    addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && phase === 'open') close();
      if ((e.key === 'PageDown' || e.key === 'End' || e.key === ' ') && phase === 'rest' && remaining() <= 4 && document.activeElement === document.body) open();
    });
  }

  /* ---------- cursor + card tooltip ---------- */
  function initPointer() {
    if (!FINE) return;
    document.documentElement.classList.add('custom-cursor');
    var c = document.createElement('div'); c.className = 'cursor-hand';
    c.innerHTML = '<svg class="arrow" viewBox="0 0 22 24"><path d="M3 2l15 10.5-6.6 1.2 3.8 7.4-2.8 1.4-3.8-7.4L3 20z" fill="#fff" stroke="#002142" stroke-width="1.4" stroke-linejoin="round"/></svg>' +
      '<svg class="hand" viewBox="0 0 22 24"><path d="M7.6 11V3.6a1.6 1.6 0 0 1 3.2 0V10l.1-1.4a1.5 1.5 0 0 1 3 .1v1.5a1.5 1.5 0 0 1 3 0v1.2a1.4 1.4 0 0 1 2.8.2v4.6c0 3.6-2.6 6.3-6.2 6.3h-1.6c-2.2 0-3.6-.9-4.8-2.6L3.6 16a1.6 1.6 0 0 1 2.4-2.1z" fill="#fff" stroke="#002142" stroke-width="1.3" stroke-linejoin="round"/></svg>';
    document.body.appendChild(c);
    var tip = document.createElement('div'); tip.className = 'tip'; tip.innerHTML = '<span></span>'; document.body.appendChild(tip);
    var span = tip.firstChild, x = -100, y = -100, q = false, tipCard = null, intent = null;
    function paint() { q = false; c.style.transform = 'translate(' + (x - 4) + 'px,' + (y - 2) + 'px)'; tip.style.transform = 'translate(' + (x + 20) + 'px,' + (y + 14) + 'px)'; }
    addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse') return;
      x = e.clientX; y = e.clientY; c.classList.add('on');
      var t = e.target, ptr = t.closest && t.closest('a, button, [data-cursor=pointer], input[type=submit]');
      c.classList.toggle('pointer', !!ptr && !(t.closest && t.closest('.cs-media')));
      var cd = t.closest && t.closest('[data-tip]');
      if (cd !== tipCard) {
        clearTimeout(intent);
        if (!cd) { tip.classList.remove('visible'); tipCard = null; }
        else {
          var text = cd.getAttribute('data-tip');
          if (tipCard && tip.classList.contains('visible')) { span.setAttribute('data-fading', ''); setTimeout(function () { span.textContent = text; span.removeAttribute('data-fading'); }, 130); }
          else { span.textContent = text; intent = setTimeout(function () { tip.classList.add('visible'); }, 120); }
          tipCard = cd;
        }
      }
      if (!q) { q = true; requestAnimationFrame(paint); }
    }, { passive: true });
    document.addEventListener('mouseleave', function () { c.classList.remove('on'); tip.classList.remove('visible'); tipCard = null; });
    document.addEventListener('sheet:scroll', function () { if (tipCard) { tip.classList.remove('visible'); tipCard = null; } });
  }

  /* ======================= PAGES ======================= */
  function revealGrid(root) {
    var items = $$('[data-grid-item]', root), batch = 0, bt = null;
    if (RM || !('IntersectionObserver' in window)) { items.forEach(function (it) { it.setAttribute('data-visible', 'true'); }); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.style.setProperty('--order', batch++); en.target.setAttribute('data-visible', 'true'); io.unobserve(en.target); } });
      clearTimeout(bt); bt = setTimeout(function () { batch = 0; }, 120);
    }, { root: scroller, threshold: .1 });
    items.forEach(function (it) { io.observe(it); });
  }
  // Projects page uses the visual-search results layout (bird → summary → masonry of every project frame → project strip)
  function projectsPage() { searchPage(true); }

  function searchPage(projectsOnly) {
    var q = (qs.get('q') || '').trim(), tag = qs.get('tag'), color = qs.get('color');
    var mode = projectsOnly ? 'projects' : q ? 'query' : tag ? 'tag' : color ? 'color' : 'curated';
    var all = B.concat(P);
    var match = function (it) {
      if (mode === 'query') return [it.title, it.description, it.industry, (it.tags || []).join(' ')].join(' ').toLowerCase().indexOf(q.toLowerCase()) > -1;
      if (mode === 'tag') return (it.tags || []).indexOf(tag) > -1;
      if (mode === 'color') return it.color === color;
      return true;
    };
    // colour search also pulls in neighbouring hues (exact matches first), like a visual search
    function hue(hex) { var r = parseInt(hex.substr(1, 2), 16) / 255, g = parseInt(hex.substr(3, 2), 16) / 255, b2 = parseInt(hex.substr(5, 2), 16) / 255;
      var mx = Math.max(r, g, b2), mn = Math.min(r, g, b2), d = mx - mn, h = 0; if (!d) return -1;
      var l = (mx + mn) / 2, sat = d / (1 - Math.abs(2 * l - 1));
      if (sat < .35 || l > .9 || l < .12) return -1;           // ignore creams, near-whites and near-blacks
      h = mx === r ? ((g - b2) / d) % 6 : mx === g ? (b2 - r) / d + 2 : (r - g) / d + 4; return (h * 60 + 360) % 360; }
    function hueDist(a1, a2) { var d = Math.abs(a1 - a2) % 360; return d > 180 ? 360 - d : d; }
    var matched;
    if (mode === 'color') {
      var target = hue(COLORS[color]);
      matched = all.map(function (it) {
        var exact = it.color === color, dist = Math.min.apply(null, it.palette.map(function (c) { var h = hue(c); return h < 0 ? 999 : hueDist(h, target); }));
        return { it: it, score: exact ? -1 : dist };
      }).filter(function (m) { return m.score < 32; }).sort(function (x, y) { return x.score - y.score; }).map(function (m) { return m.it; });
    } else matched = mode === 'projects' ? P.slice() : mode === 'curated' ? all : all.filter(match);
    var posts = matched.filter(function (it) { return B.indexOf(it) > -1; });
    var projs = mode === 'curated' ? P : matched.filter(function (it) { return P.indexOf(it) > -1; });
    // every matching item contributes all of its frames: cover + each media block, in their real shapes
    function framesOf(it, k) {
      var f = [{ ar: '4 / 5', seed: 0 }], sd = 11;
      (it.blocks || []).forEach(function (bl) {
        if (bl.type === 'wide') f.push({ ar: '3 / 2', seed: ++sd });
        else if (bl.type === 'tall') { f.push({ ar: '2 / 3', seed: ++sd }); f.push({ ar: '2 / 3', seed: ++sd }); }
        else if (bl.type === 'trio') { f.push({ ar: '3 / 4', seed: ++sd }); f.push({ ar: '3 / 4', seed: ++sd }); f.push({ ar: '3 / 4', seed: ++sd }); }
        else if (bl.type === 'footer') f.push({ ar: '2 / 1', seed: ++sd });
      });
      f.push({ ar: '1 / 1', seed: 40 + k }); f.push({ ar: '3 / 2', seed: 50 + k });
      // stagger shapes so wide / square / tall frames mix from the first row
      var order = [0, 2, f.length - 1, 1, f.length - 2].concat(f.map(function (_, i) { return i; }));
      var seen = {}, out = [];
      order.forEach(function (i) { if (i >= 0 && i < f.length && !seen[i]) { seen[i] = 1; out.push(f[i]); } });
      if (k % 2) out.push(out.shift());
      return out.map(function (x) { return { item: it, ar: x.ar, seed: x.seed }; });
    }
    var lists = matched.map(framesOf), artifacts = [], more = true, round = 0;
    while (more) { more = false; lists.forEach(function (l) { if (l[round]) { artifacts.push(l[round]); more = true; } }); round++; }   // interleave
    var ADJ = { red: 'Bold red', orange: 'Warm orange', yellow: 'Sunny yellow', lime: 'Fresh lime', green: 'Calm green', mint: 'Cool mint', cyan: 'Bright cyan', sky: 'Soft sky blue', blue: 'Deep blue', violet: 'Rich violet', magenta: 'Vivid magenta', pink: 'Playful pink' };
    var names = projs.slice(0, 2).map(function (p) { return p.title; }).join(' and ');
    var summary = mode === 'projects' ? S.projectsSummary : mode === 'curated' ? S.writingSummary :
      mode === 'query' ? (artifacts.length ? 'Here\'s what turned up for “' + q + '” — ' + posts.length + ' blog post' + (posts.length === 1 ? '' : 's') + ' and ' + projs.length + ' project' + (projs.length === 1 ? '' : 's') + '.' : 'Nothing matched “' + q + '” yet. Try a broader word, a topic or a colour.') :
      mode === 'tag' ? 'A few ways ' + tag.toLowerCase() + ' shows up in my work and blogs.' :
      (matched.length ? (ADJ[color] || color) + ' carries through the identity, illustration and digital work I created' + (names ? ' for ' + names : '') + '.' : 'Nothing in ' + color + ' yet — try a neighbouring colour.');
    var birdColor = mode === 'color' ? COLORS[color] : '';
    buildShell('<section class="presentation" data-status="searching" aria-busy="true"><header class="summary"><figure class="bird summary-bird"' + (birdColor ? ' style="color:' + birdColor + '"' : '') + '>' + BIRD + '</figure>' +
      '<div class="skeleton" aria-hidden="true"><i></i><i></i></div><div class="summary-play" hidden><p class="summary-text">' + esc(summary) + '</p></div></header>' +
      '<div class="masonry" role="list"></div>' +
      (projs.length && mode !== 'curated' ? '<section class="project-section"><h2>Projects</h2><div class="project-flex">' + projs.map(function (p, i) { return '<div data-grid-item>' + card(p, { seed: i }) + '</div>'; }).join('') + '</div></section>' : '') +
      '<figure class="end-mark bird">' + BIRD + '</figure></section>');
    var pres = $('.presentation'), grid = $('.masonry');
    fadeImages(inner);
    function layout() {
      var w = grid.clientWidth, cols = innerWidth >= 1520 ? 5 : innerWidth <= 800 ? 2 : 4, gap = innerWidth <= 800 ? 16 : 24, colW = (w - gap * (cols - 1)) / cols, h = [];
      for (var i = 0; i < cols; i++) h.push(0);
      $$('.m-item', grid).forEach(function (el, i) {
        var ar = el.getAttribute('data-ar').split('/').map(parseFloat), H = colW / (ar[0] / ar[1]), c = h.indexOf(Math.min.apply(null, h)), y = h[c];
        el.style.width = colW + 'px'; el.style.transform = 'translate3d(' + (c * (colW + gap)) + 'px,' + y + 'px,0)';
        el.style.setProperty('--order', (Math.floor(i / cols) + c / cols).toFixed(2));
        h[c] += H + gap;
      });
      grid.style.height = Math.max(0, Math.max.apply(null, h) - gap) + 'px';
    }
    setTimeout(function () {
      pres.setAttribute('data-status', 'ready'); pres.removeAttribute('aria-busy'); pres.classList.add('ready');
      $('.skeleton').remove(); $('.summary-play').hidden = false;
      if (!artifacts.length && mode !== 'curated') { grid.innerHTML = ''; }
      grid.innerHTML = artifacts.map(function (a) {
        var ar = a.ar.split('/').map(parseFloat);
        return '<div class="m-item" role="listitem" data-ar="' + a.ar + '">' + card(a.item, { ar: a.ar, seed: a.seed, w: 400, h: Math.round(400 * ar[1] / ar[0]) }) + '</div>';
      }).join('');
      layout(); fadeImages(grid);
      requestAnimationFrame(function () { $$('.m-item', grid).forEach(function (el) { el.classList.add('in'); }); });
      revealGrid(inner);
    }, RM ? 0 : 900);
    var rt; addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(layout, 120); });
  }

  function detailPage() {
    var isPost = DTYPE === 'post', list = isPost ? B : P;
    var it = list.filter(function (x) { return x.slug === DSLUG; })[0] || list[0];
    document.title = it.title + ' — ' + (isPost ? 'Blog' : 'Project') + ' by ' + (S.fullName || S.name);   // matches the SEO title
    var metaRows = isPost ? [['Published', new Date(it.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })], ['Topic', (it.tags || []).join(', ')]]
      : [['Industry', it.industry], ['Role', it.role], ['Year', it.year]];
    var meta = '<dl class="meta">' + metaRows.map(function (m) { return '<div><dt>' + esc(m[0]) + '</dt><dd>' + esc(m[1]) + '</dd></div>'; }).join('') + '</dl>';
    var links = '<div class="cs-links">' + (it.links || []).map(function (l) { return '<a class="cs-link" href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label) + '</a>'; }).join('') + '</div>';
    var titleHTML = esc(it.title).replace(/ &amp; /, '<br>&amp; ');
    var seed = 10;
    // every photo / gif / video / device preview is registered in one gallery (opened in the paginated lightbox)
    var gallery = [];
    function isVideo(src) { return /\.(mp4|webm|mov)(\?|$)/i.test(src); }
    function mediaBtn(cls, w, h, o) {
      o = o || {}; seed++;
      var item = { w: w, h: h, seed: seed }, inner2;
      if (o.preview) { item.kind = 'device'; item.preview = o.preview; inner2 = media(it, seed, w, h) + window.deviceHTML(o.preview, false); }
      else if (typeof o.video === 'string' || (o.src && isVideo(o.src))) { item.kind = 'video'; item.src = o.src || o.video; inner2 = '<video autoplay loop muted playsinline src="' + esc(item.src) + '"></video>'; }
      else if (o.video) { item.kind = 'placeholder'; inner2 = media(it, seed, w, h) + '<span class="shimmer"></span>'; }
      else if (o.src) { item.kind = 'image'; item.src = o.src; inner2 = '<img src="' + esc(o.src) + '" alt="" loading="lazy">'; }
      else { item.kind = 'art'; inner2 = media(it, seed, w, h); }
      gallery.push(item);
      var gi = gallery.length - 1, label = { device: 'Open preview', video: 'Open video', placeholder: 'Open video', image: 'Enlarge image', art: 'Enlarge image' }[item.kind];
      return '<button type="button" class="' + cls + (item.kind === 'video' || item.kind === 'placeholder' ? ' is-video' : '') + (item.kind === 'device' ? ' is-video is-device' : '') + '" data-gi="' + gi + '" aria-label="' + label + ' (' + (gi + 1) + ')">' + inner2 + '</button>';
    }
    var blocks = (it.blocks || []).map(function (b) {
      if (b.type === 'text') return '<section class="cs-block" data-reveal="editorial">' + b.paras.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') + (b.cta ? '<p><a href="' + esc(b.cta.url) + '" target="_blank" rel="noopener">' + esc(b.cta.label) + '</a></p>' : '') + '</section>';
      var sr = b.srcs || [];
      if (b.type === 'wide') return '<figure class="cs-media" data-reveal="editorial"><div class="cs-media-grid">' + mediaBtn('m-wide', 600, 400, { video: b.video, preview: b.preview, src: b.src }) + '</div></figure>';
      if (b.type === 'tall') return '<figure class="cs-media" data-reveal="editorial"><div class="cs-media-grid">' + mediaBtn('m-tall', 400, 600, { src: sr[0] }) + mediaBtn('m-tall', 400, 600, { src: sr[1] }) + '</div></figure>';
      if (b.type === 'trio') return '<figure class="cs-media" data-reveal="editorial"><div class="cs-media-grid">' + mediaBtn('m-tall', 400, 600, { src: sr[0] }) + mediaBtn('m-tall', 400, 600, { src: sr[1] }) + mediaBtn('m-tall', 400, 600, { src: sr[2] }) + '</div></figure>';
      if (b.type === 'footer') return '<div class="cs-media" data-reveal="editorial"><div class="cs-media-grid">' + mediaBtn('m-footer', 800, 400, { src: b.src }) + '</div></div>';
      return '';
    }).join('');
    buildShell('<section class="case-study"><aside class="mini-hero" aria-hidden="true"><div class="mini-arc"><div class="mini-visual">' + media(it, 0, 400, 500) + '</div></div>' +
      '<div class="mini-copy"><p class="mini-title">' + esc(it.title) + '</p>' + links + meta + '</div></aside>' +
      '<div class="cs-body"><section class="cs-hero cs-grid"><div class="cs-visual" data-hero-item style="--i:0"><span class="card-media hero-img" style="--pal:' + it.palette[1] + '">' + media(it, 0, 400, 500, 'loaded') + '</span></div>' +
      '<div class="cs-copy"><h1 class="display" data-hero-item style="--i:1">' + titleHTML + '</h1><div data-hero-item style="--i:2">' + links + '</div><div data-hero-item style="--i:3">' + meta + '</div></div></section>' +
      '<div class="cs-content">' + blocks + '<figure class="end-mark bird">' + BIRD + '</figure></div></div></section>' +
      '<div class="lightbox" role="dialog" aria-modal="true" aria-label="Media gallery" aria-hidden="true">' +
      '<div class="lb-top"><span class="lb-count" aria-live="polite"></span><button type="button" class="lb-close" aria-label="Close gallery" data-cursor="pointer"><svg width="16" height="16" viewBox="0 0 16 16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M3 3l10 10M13 3 3 13"/></svg></button></div>' +
      '<button type="button" class="lb-nav lb-prev" aria-label="Previous" data-cursor="pointer"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12.5 4 6.5 10l6 6"/></svg></button>' +
      '<div class="lb-stage"></div>' +
      '<button type="button" class="lb-nav lb-next" aria-label="Next" data-cursor="pointer"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M7.5 4l6 6-6 6"/></svg></button>' +
      '<div class="lb-dots" role="tablist" aria-label="Choose item"></div></div>');
    initScrollShots(inner);
    var hero = $('.cs-hero'), heroImg = $('.hero-img');
    // shared-element flight from the clicked card
    var fl = null; try { fl = JSON.parse(sessionStorage.getItem('flight') || 'null'); sessionStorage.removeItem('flight'); } catch (e) {}
    if (fl && fl.slug === it.slug && !RM) {
      var to = heroImg.getBoundingClientRect(), clone = document.createElement('div'); clone.className = 'flight';
      clone.style.cssText = 'left:' + to.left + 'px;top:' + to.top + 'px;width:' + to.width + 'px;height:' + to.height + 'px';
      clone.innerHTML = media(it, 0, 400, 500); document.body.appendChild(clone);
      heroImg.style.visibility = 'hidden';
      clone.animate([{ transform: 'translate(' + (fl.x - to.left) + 'px,' + (fl.y - to.top) + 'px) scale(' + (fl.w / to.width) + ',' + (fl.h / to.height) + ')', transformOrigin: '0 0' }, { transform: 'none', transformOrigin: '0 0' }],
        { duration: 680, easing: 'cubic-bezier(.18,1,.28,1)' }).onfinish = function () { heroImg.style.visibility = ''; clone.remove(); };
      $('.cs-visual').style.opacity = 1;
      setTimeout(function () { hero.classList.add('shown'); }, 520);
    } else requestAnimationFrame(function () { hero.classList.add('shown'); });
    // editorial reveals (fade in and out)
    var reveal = $$('[data-reveal="editorial"]');
    if (RM || !('IntersectionObserver' in window)) reveal.forEach(function (el) { el.classList.add('in-view'); });
    else { var io = new IntersectionObserver(function (es) { es.forEach(function (en) { en.target.classList.toggle('in-view', en.isIntersecting); }); }, { root: scroller, threshold: .12 }); reveal.forEach(function (el) { io.observe(el); }); }
    // mini hero (≥1200)
    var mini = $('.mini-hero'), miniOn = false;
    function checkMini() {
      if (innerWidth < 1200 || innerHeight <= 480) return;
      var r = heroImg.getBoundingClientRect(), want = r.bottom < 80;
      if (want === miniOn) return; miniOn = want;
      var mv = $('.mini-visual', mini), mr = mv.getBoundingClientRect();
      mini.style.setProperty('--dx', (r.left - mr.left) + 'px'); mini.style.setProperty('--dy', (r.top - mr.top) + 'px');
      mini.style.setProperty('--sx', (r.width / mr.width).toFixed(3)); mini.style.setProperty('--sy', (r.height / mr.height).toFixed(3));
      mini.classList.remove('is-flying', 'is-returning'); void mini.offsetWidth;
      if (want) { mini.classList.add('is-active', 'is-flying'); hero.classList.add('mini-on'); }
      else { mini.classList.add('is-returning'); mini.classList.remove('is-active'); setTimeout(function () { if (!miniOn) { hero.classList.remove('mini-on'); mini.classList.remove('is-returning'); } }, 520); }
    }
    document.addEventListener('sheet:scroll', checkMini);
    // paginated lightbox: arrows, dots, counter, swipe / drag, trackpad, keyboard, looping
    var lb = $('.lightbox'), stage = $('.lb-stage', lb), dots = $('.lb-dots', lb), count = $('.lb-count', lb), cur = -1, opener = null;
    var n = gallery.length;
    dots.innerHTML = gallery.map(function (g, i) { return '<button type="button" class="lb-dot" role="tab" aria-label="Item ' + (i + 1) + ' of ' + n + '" data-i="' + i + '"></button>'; }).join('');
    if (n < 2) lb.classList.add('single');
    function slideHTML(g) {
      var body;
      if (g.kind === 'device') body = media(it, g.seed, g.w, g.h) + window.deviceHTML(g.preview, false);
      else if (g.kind === 'video') body = '<video src="' + esc(g.src) + '" autoplay loop muted playsinline controls></video>';
      else if (g.kind === 'image') body = '<img src="' + esc(g.src) + '" alt="">';
      else body = media(it, g.seed, g.w, g.h) + (g.kind === 'placeholder' ? '<span class="shimmer"></span>' : '');
      return '<div class="lb-slide lb-' + g.kind + '" style="--ar:' + g.w + ' / ' + g.h + ';--ar-num:' + (g.w / g.h).toFixed(4) + '">' + body + '</div>';
    }
    function show(i, dir) {
      if (!n) return;
      i = ((i % n) + n) % n; if (i === cur && stage.firstChild) return;
      var old = stage.querySelector('.lb-slide:not(.out)');
      stage.insertAdjacentHTML('beforeend', slideHTML(gallery[i]));
      var neo = stage.lastChild;
      neo.style.setProperty('--from', (dir || 0) * 60 + 'px'); neo.classList.add('in');
      if (old) {
        old.style.setProperty('--to', -(dir || 0) * 60 + 'px'); old.classList.add('out');
        var v = old.querySelector('video'); if (v) v.pause();
        setTimeout(function () { old.remove(); }, 450);
      }
      initScrollShots(neo);
      cur = i; count.textContent = (i + 1) + ' / ' + n;
      $$('.lb-dot', dots).forEach(function (d, k) { d.setAttribute('aria-selected', String(k === i)); });
    }
    function openAt(i, from) { opener = from; cur = -1; stage.innerHTML = ''; show(i, 0); lb.classList.add('open'); document.body.classList.add('lb-open'); lb.setAttribute('aria-hidden', 'false'); if (lenis) lenis.stop(); setTimeout(function () { $('.lb-close', lb).focus({ preventScroll: true }); }, 50); }
    function close() { lb.classList.remove('open'); document.body.classList.remove('lb-open'); lb.setAttribute('aria-hidden', 'true'); $$('video', stage).forEach(function (v) { v.pause(); }); if (lenis) lenis.start(); if (opener) opener.focus({ preventScroll: true }); }
    inner.addEventListener('click', function (e) { var b = e.target.closest('.cs-media button[data-gi]'); if (b) openAt(+b.dataset.gi, b); });
    $('.lb-prev', lb).addEventListener('click', function () { show(cur - 1, -1); });
    $('.lb-next', lb).addEventListener('click', function () { show(cur + 1, 1); });
    $('.lb-close', lb).addEventListener('click', close);
    dots.addEventListener('click', function (e) { var d = e.target.closest('.lb-dot'); if (d) { var i = +d.dataset.i; show(i, i > cur ? 1 : -1); } });
    lb.addEventListener('click', function (e) { if (e.target === lb || e.target === stage) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close(); else if (e.key === 'ArrowRight') show(cur + 1, 1); else if (e.key === 'ArrowLeft') show(cur - 1, -1);
    });
    // swipe / drag (touch + mouse) with the slide following the pointer
    var drag = null;
    stage.addEventListener('pointerdown', function (e) { if (e.target.closest('video[controls]') && e.offsetY > e.target.clientHeight - 48) return; drag = { x: e.clientX, y: e.clientY, dx: 0, id: e.pointerId, moved: false }; });
    addEventListener('pointermove', function (e) {
      if (!drag || e.pointerId !== drag.id) return; drag.dx = e.clientX - drag.x;
      if (!drag.moved && Math.abs(drag.dx) > 8 && Math.abs(drag.dx) > Math.abs(e.clientY - drag.y)) { drag.moved = true; lb.classList.add('dragging'); }
      if (drag.moved) { var s2 = stage.querySelector('.lb-slide:not(.out)'); if (s2) s2.style.transform = 'translateX(' + drag.dx * .6 + 'px)'; }
    });
    function endDrag() {
      if (!drag) return; var d = drag; drag = null; lb.classList.remove('dragging');
      var s2 = stage.querySelector('.lb-slide:not(.out)'); if (s2) s2.style.transform = '';
      if (d.moved) { if (d.dx < -50) show(cur + 1, 1); else if (d.dx > 50) show(cur - 1, -1); lb.addEventListener('click', function st(ev) { ev.stopPropagation(); }, { capture: true, once: true }); }
    }
    addEventListener('pointerup', endDrag); addEventListener('pointercancel', endDrag);
    var wAcc = 0, wLock = 0;
    lb.addEventListener('wheel', function (e) {
      e.preventDefault(); if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      var t = performance.now(); if (t < wLock) return; wAcc += e.deltaX;
      if (Math.abs(wAcc) > 40) { show(cur + (wAcc > 0 ? 1 : -1), wAcc > 0 ? 1 : -1); wAcc = 0; wLock = t + 450; }
    }, { passive: false });
  }

  /* ======================= ASK (portfolio assistant) ======================= */
  // A small scripted assistant that answers from the site's own content (no backend, no API key).
  function initAsk() {
    var A = window.ABOUT || {}, SUG = window.ASK_SUGGESTIONS || [];
    document.body.insertAdjacentHTML('beforeend',
      '<div class="ask-veil" id="ask-veil"></div>' +
      '<section class="ask-panel" id="ask-panel" role="dialog" aria-modal="true" aria-label="Ask ' + esc(S.firstName) + '" aria-hidden="true">' +
      '<button class="ask-close" type="button" aria-label="Close" data-cursor="pointer"><svg width="16" height="16" viewBox="0 0 16 16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M3 3l10 10M13 3 3 13"/></svg></button>' +
      '<div class="ask-log" data-lenis-prevent aria-live="polite"></div>' +
      '<form class="ask-box" autocomplete="off"><textarea rows="1" name="q" placeholder="Ask ' + esc(S.firstName) + '" aria-label="Ask a question"></textarea>' +
      '<div class="ask-tools"><button type="button" class="ask-reset" aria-label="Start over" data-cursor="pointer"><svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M16 10a6 6 0 1 1-1.8-4.3M16 3v3.5h-3.5"/></svg></button>' +
      '<span class="ask-right"><button type="button" class="ask-mic" aria-label="Speak your question" data-cursor="pointer"><svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><rect x="7" y="2.5" width="6" height="10" rx="3"/><path d="M4.5 10a5.5 5.5 0 0 0 11 0M10 15.5V18"/></svg></button>' +
      '<button type="submit" class="ask-send" aria-label="Send" disabled data-cursor="pointer"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M3 9h12M10 4l5 5-5 5"/></svg></button></span></div></form>' +
      '</section>');
    var panel = $('#ask-panel'), veil2 = $('#ask-veil'), log = $('.ask-log', panel), form = $('.ask-box', panel), ta = $('textarea', panel), send = $('.ask-send', panel);
    var askBtn = $('.dock-ask'), open = false, busy = false;
    function setOpen(v) {
      if (v === open) return; open = v;
      if (v && window.isExploreOpen && window.isExploreOpen()) window.closeExplore();
      panel.classList.toggle('open', v); veil2.classList.toggle('open', v); panel.setAttribute('aria-hidden', String(!v));
      askBtn.setAttribute('aria-expanded', String(v)); document.body.classList.toggle('ask-open', v);
      if (v) { if (!log.children.length) greet(); setTimeout(function () { ta.focus({ preventScroll: true }); }, 200); if (lenis) lenis.stop(); }
      else if (lenis) lenis.start();
    }
    window.closeAsk = function () { setOpen(false); };
    askBtn.addEventListener('click', function () { setOpen(!open); });
    $('.ask-close', panel).addEventListener('click', function () { setOpen(false); });
    veil2.addEventListener('click', function () { setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && open) setOpen(false); });
    function scrollDown() { log.scrollTo({ top: log.scrollHeight, behavior: RM ? 'auto' : 'smooth' }); }
    function add(html, cls) { var d = document.createElement('div'); d.className = 'ask-msg ' + cls; d.innerHTML = html; log.appendChild(d); scrollDown(); return d; }
    function greet() {
      add('<p>How can I help you today?</p>', 'bot');
      add(SUG.map(function (q) { return '<button type="button" class="ask-sug" data-cursor="pointer">' + esc(q) + '</button>'; }).join(''), 'sugs');
    }
    log.addEventListener('click', function (e) {
      var sg = e.target.closest('.ask-sug'); if (sg) { ask(sg.textContent); return; }
      var c = e.target.closest('[data-ask-contact]'); if (c) { setOpen(false); setTimeout(function () { window.openContact(c); }, 250); }
    });
    ta.addEventListener('input', function () { send.disabled = !ta.value.trim(); ta.style.height = 'auto'; ta.style.height = Math.min(120, ta.scrollHeight) + 'px'; });
    ta.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); if (ta.value.trim()) form.requestSubmit(); } });
    form.addEventListener('submit', function (e) { e.preventDefault(); var q = ta.value.trim(); if (!q || busy) return; ta.value = ''; ta.style.height = ''; send.disabled = true; ask(q); });
    $('.ask-reset', panel).addEventListener('click', function () { log.innerHTML = ''; greet(); ta.focus(); });
    // voice input where the browser supports it
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition, mic = $('.ask-mic', panel);
    if (!SR) mic.hidden = true; else mic.addEventListener('click', function () {
      var r = new SR(); r.lang = 'en-US'; r.interimResults = false; mic.classList.add('listening');
      r.onresult = function (ev) { ta.value = ev.results[0][0].transcript; ta.dispatchEvent(new Event('input')); };
      r.onend = function () { mic.classList.remove('listening'); }; r.start();
    });
    function projectCard(it) {
      var isP = P.indexOf(it) > -1;
      return '<div class="ask-card"><a class="ask-thumb" href="' + hrefFor(it) + '" style="background:' + it.palette[1] + '">' + window.coverArt(it, 0, 400, 500) + '</a>' +
        '<div class="ask-card-body"><p class="ask-card-title">' + esc(it.title) + '</p><p class="ask-card-desc">' + esc(it.description) + '</p>' +
        '<a class="ask-card-btn" href="' + hrefFor(it) + '" data-cursor="pointer">View ' + (isP ? 'Project' : 'Post') + '</a></div></div>';
    }
    function link(it) { return '<a href="' + hrefFor(it) + '">' + esc(it.title) + '</a>'; }
    function reply(q) {
      var t = q.toLowerCase(), all = P.concat(B);
      var named = all.filter(function (it) { return t.indexOf(it.title.toLowerCase()) > -1 || t.indexOf(it.slug.replace(/-/g, ' ')) > -1; })[0];
      if (named) {
        var isP = P.indexOf(named) > -1;
        return { text: link(named) + (isP ? ' is a ' + named.industry.toLowerCase() + ' project from ' + named.year + ' where I worked as ' + named.role.toLowerCase() + '. ' : ' is a blog post. ') + esc(named.description), card: named };
      }
      if (/(hire|contact|email|reach|availab|budget|price|cost|rate|quote|work with|freelance|collab)/.test(t))
        return { text: 'I\'m currently available for new projects. The quickest way is the contact form — I reply within 48 hours — or email me at <a href="mailto:' + esc(S.email) + '">' + esc(S.email) + '</a>.', action: 'Open contact form' };
      if (/(where|based|location|city|live|time ?zone|weather|temperature|cebu)/.test(t)) {
        var line = 'I\'m based in ' + esc(S.city) + ', Philippines — it\'s ' + localTime() + ' here right now';
        return { text: line + '. I work with teams worldwide and overlap easily with Asia, Australia and Europe.', weather: true };
      }
      if (/(service|offer|what do you do|skills|help with|specialt|capabilit)/.test(t))
        return { text: 'Here\'s what I help with:</p><ul>' + (A.services || []).map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul><p>Most projects combine a few of these — from first sketch to shipped code.' };
      if (/(blog|post|writ|article|read|essay)/.test(t))
        return { text: 'My latest post is ' + link(B[0]) + ' — ' + esc(B[0].description.charAt(0).toLowerCase() + B[0].description.slice(1)) + ' You\'ll find more on the <a href="blog.html">Blogs</a> page.', card: B[0] };
      if (/(project|recent|work|portfolio|case|latest|show)/.test(t))
        return { text: link(P[0]) + ' is one of my recent projects — ' + esc(P[0].description.charAt(0).toLowerCase() + P[0].description.slice(1)) + ' I led ' + esc(P[0].role.toLowerCase()) + ' work across brand, product and launch.', card: P[0] };
      if (/(who are you|who is|about you|about yourself|about shintaine|background|experience|career|yourself|bio)/.test(t))
        return { text: esc(S.intro) + ' Read more on the <a href="about.html">About</a> page.' };
      var hit = all.filter(function (it) { return t.split(/\W+/).some(function (w) { return w.length > 3 && (it.tags || []).join(' ').toLowerCase().indexOf(w) > -1; }); })[0];
      if (hit) return { text: 'You might like ' + link(hit) + ' — ' + esc(hit.description), card: hit };
      return { text: 'I\'m a small assistant that knows this portfolio — projects, blog posts, services and how to get in touch. Try one of these:', sugs: true };
    }
    function ask(q) {
      var sugs = $('.ask-msg.sugs', log); if (sugs) sugs.remove();
      add('<p>' + esc(q) + '</p>', 'user');
      busy = true;
      var typing = add('<span class="ask-sun"></span><span class="ask-dots"><i></i><i></i><i></i></span>', 'typing');
      var r = reply(q);
      setTimeout(function () {
        typing.remove();
        var msg = add('<p></p>', 'bot'), html = '<p>' + r.text + '</p>', words = html.split(/(\s+)/), i = 0;
        var tick = setInterval(function () {
          i = Math.min(words.length, i + 3); msg.innerHTML = words.slice(0, i).join('');
          if (i >= words.length) {
            clearInterval(tick);
            if (r.card) add(projectCard(r.card), 'card');
            if (r.action) add('<button type="button" class="ask-card-btn" data-ask-contact data-cursor="pointer">' + esc(r.action) + '</button>', 'act');
            if (r.weather) getWeather().then(function (w) { add('<p class="ask-wx">' + weatherIcon(w.code) + ' ' + w.temp + '°C in ' + esc(S.city) + ' right now</p>', 'bot'); }).catch(function () {});
            if (r.sugs) add(SUG.map(function (x) { return '<button type="button" class="ask-sug" data-cursor="pointer">' + esc(x) + '</button>'; }).join(''), 'sugs');
            busy = false; scrollDown();
          }
          scrollDown();
        }, RM ? 0 : 40);
      }, RM ? 0 : 700);
    }
  }

  /* ======================= ABOUT ======================= */
  function aboutPage() {
    var A = window.ABOUT;
    buildShell('<section class="about">' +
      '<header class="about-hero" data-reveal="editorial"><p class="about-eyebrow">About</p><h1 class="about-lead">' + esc(A.lead) + '</h1>' +
      '<a class="about-learn" href="#how">Learn about how I work ↓</a></header>' +
      '<section class="about-pair" id="how">' + A.intro.map(function (x) { return '<article class="about-card" data-reveal="editorial"><h2>' + esc(x.title) + '</h2><p>' + esc(x.body) + '</p></article>'; }).join('') + '</section>' +
      '<section class="about-principles"><h2 class="about-h" data-reveal="editorial">' + esc(A.principlesTitle) + '</h2><div class="about-three">' +
      A.principles.map(function (x, i) { return '<article class="about-card" data-reveal="editorial"><span class="about-num">0' + (i + 1) + '</span><h3>' + esc(x.title) + '</h3><p>' + esc(x.body) + '</p></article>'; }).join('') + '</div></section>' +
      '<section class="about-recent"><div class="shelf-head about-shelf-head"><h2 class="section-label">Recent projects</h2><a class="view-all" href="projects.html">View all projects</a></div>' +
      '<div class="grid">' + P.slice(0, 4).map(function (p, i) { return '<div data-grid-item>' + card(p, { seed: i }) + '</div>'; }).join('') + '</div></section>' +
      '<section class="about-exp" data-reveal="editorial"><h2 class="section-label">Experience</h2><ul>' + A.experience.map(function (x) { return '<li><span>' + esc(x.role) + '</span><span>' + esc(x.org) + '</span><span>' + esc(x.years) + '</span></li>'; }).join('') + '</ul>' +
      '<h2 class="section-label">Services</h2><ul class="about-services">' + A.services.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></section>' +
      '<section class="about-engage"><h2 class="about-h" data-reveal="editorial">' + esc(A.engagementTitle) + '</h2><div class="about-pair">' +
      A.engagements.map(function (x) { return '<article class="about-card" data-reveal="editorial"><h3>' + esc(x.title) + '</h3><p>' + esc(x.body) + '</p></article>'; }).join('') + '</div></section>' +
      '<section class="about-contact" data-reveal="editorial"><h2 class="about-h">' + esc(A.contactTitle) + '</h2>' +
      '<button type="button" class="about-mail" data-contact-open data-cursor="pointer">' + esc(S.email) + '</button>' +
      '<p class="about-where">Based in ' + esc(S.city) + ', Philippines · <span class="about-time"></span> <span class="about-wx"></span></p></section>' +
      '<figure class="end-mark bird">' + BIRD + '</figure></section>');
    fadeImages(inner); revealGrid(inner);
    var rv = $$('[data-reveal="editorial"]');
    if (RM || !('IntersectionObserver' in window)) rv.forEach(function (el) { el.classList.add('in-view'); });
    else { var io = new IntersectionObserver(function (es) { es.forEach(function (en) { en.target.classList.toggle('in-view', en.isIntersecting); }); }, { root: scroller, threshold: .12 }); rv.forEach(function (el) { io.observe(el); }); }
    var tm = $('.about-time'), tk = function () { tm.textContent = localTime(); }; tk(); setInterval(tk, 30000);
    getWeather().then(function (w) { $('.about-wx').innerHTML = '· ' + weatherIcon(w.code) + ' ' + w.temp + '°C'; }).catch(function () {});
    $('.about-learn').addEventListener('click', function (e) { e.preventDefault(); var el = $('#how'); if (lenis) lenis.scrollTo(el, { offset: -96 }); else scroller.scrollTo({ top: el.offsetTop - 96, behavior: 'smooth' }); });
  }

  /* ======================= BOOT ======================= */
  ({ projects: projectsPage, search: searchPage, detail: detailPage, about: aboutPage })[PAGE]();
  initLenis(); initChrome(); initOmnibar(); initAsk(); initFooter(); initPointer();
  document.addEventListener('contact:toggle', function (e) { if (lenis) e.detail ? lenis.stop() : lenis.start(); });
})();
