/* ==========================================================================
   CORE — shared by every page
   Scroll scheduler · helpers · page loader · route curtain · contact drawer · reveals
   ========================================================================== */
(function () {
  var S = window.SITE;
  var RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
  var smooth = function (t) { t = clamp(t, 0, 1); return t * t * (3 - 2 * t); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  window.U = { clamp: clamp, smooth: smooth, esc: esc, RM: RM, $: function (s, el) { return (el || document).querySelector(s); }, $$: function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); } };

  /* ---------- single scroll scheduler (read phase → write phase, one rAF) ---------- */
  var reads = [], writes = [], rects = new Map(), queued = false, st = { y: 0, vh: innerHeight, vw: innerWidth };
  function frame() {
    queued = false;
    st.y = window.scrollY; st.vh = innerHeight; st.vw = innerWidth;
    rects.forEach(function (_, el) { rects.set(el, el.getBoundingClientRect()); });
    reads.forEach(function (f) { f(st); });
    writes.forEach(function (f) { f(st); });
  }
  function kick() { if (!queued) { queued = true; requestAnimationFrame(frame); } }
  addEventListener('scroll', kick, { passive: true });
  addEventListener('resize', kick, { passive: true });
  window.Scroll = {
    add: function (f) { writes.push(f); kick(); }, addRead: function (f) { reads.push(f); kick(); },
    rect: function (el) { if (!rects.has(el)) rects.set(el, el.getBoundingClientRect()); return rects.get(el); },
    y: function () { return st.y; }, vh: function () { return st.vh; }, vw: function () { return st.vw; }, kick: kick
  };


  /* ---------- local time + live weather (Open-Meteo, cached 15 min) ---------- */
  var timeFmt = new Intl.DateTimeFormat('en-US', { timeZone: S.timezone, hour: 'numeric', minute: '2-digit' });
  window.localTime = function () { return timeFmt.format(new Date()); };
  window.weatherIcon = function (code, stroke) {
    stroke = stroke || 'currentColor';
    var a = '<svg viewBox="0 0 14 14" fill="none" stroke="' + stroke + '" stroke-width="1.4" stroke-linecap="round" aria-hidden="true">';
    var sun = '<circle cx="7" cy="7" r="2.6"/><path d="M7 .8v1.4M7 11.8v1.4M.8 7h1.4M11.8 7h1.4M2.6 2.6l1 1M10.4 10.4l1 1M2.6 11.4l1-1M10.4 3.6l1-1"/>';
    var cloud = '<path d="M4 11h6.2a2.6 2.6 0 0 0 .3-5.2A3.6 3.6 0 0 0 3.6 6.6 2.2 2.2 0 0 0 4 11z"/>';
    if (code === 0 || code === 1) return a + sun + '</svg>';
    if (code === 2) return a + '<circle cx="5" cy="4.6" r="2"/><path d="M5 1v.8M1.4 4.6h.8M2.5 2.1l.6.6"/>' + cloud + '</svg>';
    if (code >= 95) return a + cloud + '<path d="M7.6 11.4 6.4 13.4h1.6l-1 1.6"/></svg>';
    if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return a + cloud + '<path d="M5 12.4l-.5 1M7.5 12.4l-.5 1M10 12.4l-.5 1"/></svg>';
    return a + cloud + '</svg>';
  };
  var wxPromise = null;
  window.getWeather = function () {
    if (wxPromise) return wxPromise;
    try { var c = JSON.parse(sessionStorage.getItem('wx') || 'null'); if (c && Date.now() - c.t < 9e5) return (wxPromise = Promise.resolve(c)); } catch (e) {}
    var url = 'https://api.open-meteo.com/v1/forecast?latitude=' + S.lat + '&longitude=' + S.lon + '&current=temperature_2m,weather_code&timezone=' + encodeURIComponent(S.timezone);
    wxPromise = fetch(url).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); }).then(function (j) {
      var w = { temp: Math.round(j.current.temperature_2m), code: j.current.weather_code, t: Date.now() };
      try { sessionStorage.setItem('wx', JSON.stringify(w)); } catch (e) {}
      return w;
    });
    wxPromise.catch(function () { wxPromise = null; });
    return wxPromise;
  };

  /* ---------- page loader (Pac-Man) ---------- */
  var QUIPS = ['Loading…', 'Sharpening pixels…', 'Aligning to the 8pt grid…', 'Kerning very carefully…', 'Watering the garden…',
    'Asking the sun to rise…', 'Feeding the Pac-Man…', 'Untangling the bezier curves…', 'Warming up the vinyl…', 'Folding the paper plane…'];
  window.pageLoader = {
    show: function (ready, opts) {
      var el = document.getElementById('page-loader'); if (!el) return;
      opts = opts || {}; var min = RM ? 600 : (opts.min || 1200), cap = opts.cap || 8000, t0 = performance.now(), done = false;
      var line = el.querySelector('.pl-line');
      var qi = setInterval(function () {
        line.classList.add('pl-line-swap');
        setTimeout(function () { line.textContent = QUIPS[1 + Math.floor(Math.random() * (QUIPS.length - 1))]; line.classList.remove('pl-line-swap'); }, 300);
      }, 1600);
      function hide() {
        if (done) return; done = true;
        setTimeout(function () {
          clearInterval(qi); el.classList.add('is-hiding');
          document.documentElement.classList.remove('pl-lock'); document.body.classList.remove('pl-lock');
          setTimeout(function () { el.style.display = 'none'; document.dispatchEvent(new Event('loader:done')); }, 420);
        }, Math.max(0, min - (performance.now() - t0)));
      }
      Promise.resolve(ready).then(hide, hide); setTimeout(hide, cap);
    }
  };
  window.loaderHTML = '<div id="page-loader" role="status" aria-live="polite"><div class="pl-stage"><span class="pl-dots">' + '<i></i>'.repeat(9) +
    '</span><span class="pl-pac"><span class="pl-lip pl-top"></span><span class="pl-lip pl-bottom"></span></span></div><p class="pl-line">Loading…</p></div>';

  /* ---------- route curtain (page-to-page transition) ---------- */
  function curtain() {
    var c = document.getElementById('route-curtain');
    if (!c) { c = document.createElement('div'); c.id = 'route-curtain'; c.innerHTML = '<div class="rc-scrim"></div><div class="rc-pane rc-pane--top"></div><div class="rc-pane rc-pane--bottom"></div>'; document.body.appendChild(c); }
    return c;
  }
  // Arriving through the curtain: start closed, then open.
  function openCurtainOnArrival() {
    var flag; try { flag = sessionStorage.getItem('curtain'); sessionStorage.removeItem('curtain'); } catch (e) {}
    if (!flag || RM) return false;
    var c = curtain(); c.classList.add('is-active', 'is-closed');
    requestAnimationFrame(function () { requestAnimationFrame(function () {
      setTimeout(function () { c.classList.remove('is-closing', 'is-closed'); setTimeout(function () { c.classList.remove('is-active'); }, 980); }, 350);
    }); });
    return true;
  }
  window.routeTo = function (href) {
    if (RM) { location.href = href; return; }
    var c = curtain(); c.classList.add('is-active', 'is-closing'); void c.offsetWidth; c.classList.add('is-closed');
    try { sessionStorage.setItem('curtain', '1'); } catch (e) {}
    setTimeout(function () { location.href = href; }, 550);
  };
  function samePage(url) { return url.pathname === location.pathname && url.search === location.search; }
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]'); if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    if (a.target === '_blank' || a.hasAttribute('download') || a.hasAttribute('data-no-curtain') || a.hasAttribute('data-contact-open')) return;
    var url = new URL(a.href, location.href);
    if (url.origin !== location.origin || /^(mailto|tel):/.test(a.href)) return;
    if (samePage(url)) return; // in-page hash: native smooth scroll
    e.preventDefault(); window.routeTo(url.href);
  });
  addEventListener('pageshow', function (e) { if (e.persisted) { var c = document.getElementById('route-curtain'); if (c) c.className = ''; } });

  /* ---------- contact drawer ---------- */
  var WAVY = 'M0 4.15L46.4 23.45C91.2 42.74 175.3 94.05 266.5 74.75C359.3 55.46 446.5 33.43 548.8 33.43C651.1 33.43 731.2 68.47 822.4 94.2C913.6 119.92 1006.4 65.63 1097.6 65.63C1188.8 65.63 1280 119.92 1371.2 87.76C1440 63 1440 63 1440 63V198H0Z';
  window.WAVY_PATH = WAVY;
  function daisySVG() {
    var petals = '';
    for (var i = 0; i < 12; i++) petals += '<ellipse cx="48" cy="26" rx="7.5" ry="15.5" fill="#faf5e6" stroke="#e2d5b0" stroke-width="1" transform="rotate(' + (i * 30) + ' 48 41)"/>';
    return '<svg class="cd-daisy" viewBox="0 0 96 152" width="76" height="152" aria-hidden="true">' +
      '<path d="M48 56 C46 90 50 120 48 152" stroke="#b06a4d" stroke-width="3.5" fill="none"/>' +
      '<path d="M48 110 C30 100 22 104 14 92 C30 90 40 96 48 108Z" fill="#33361a"/><path d="M49 124 C64 112 74 116 84 104 C68 102 56 110 49 122Z" fill="#3c4020"/>' +
      petals + '<circle cx="48" cy="41" r="9.5" fill="#e89a1c"/><circle cx="45" cy="38" r="1.3" fill="#f6c740"/><circle cx="51" cy="43" r="1.1" fill="#b9791a"/></svg>';
  }
  function drawerHTML() {
    return '<div class="contact-scrim" id="contact-scrim"></div>' +
      '<aside class="contact-drawer" id="contact-drawer" role="dialog" aria-modal="true" aria-labelledby="cd-title" aria-hidden="true">' +
      '<button class="cd-close" type="button" aria-label="Close contact panel"></button>' +
      '<div class="cd-body">' +
      '<p class="cd-eyebrow"><span class="cd-dot"></span>AVAILABLE FOR NEW PROJECTS</p>' +
      '<h2 class="cd-title" id="cd-title">' + esc(S.drawerTitle) + '</h2>' +
      '<p class="cd-intro">' + esc(S.drawerIntro) + '</p>' +
      '<form class="cd-form" id="cd-form">' +
      '<input type="text" name="_honey" class="cd-honey" tabindex="-1" autocomplete="off">' +
      '<div class="cd-fields">' +
      '<div class="cd-field"><label class="cd-label" for="cd-name">YOUR NAME</label><input class="cd-input" id="cd-name" name="name" required placeholder="Shintaine Ruiz Tajanlangit" autocomplete="name"></div>' +
      '<div class="cd-field"><label class="cd-label" for="cd-email">EMAIL</label><input class="cd-input" id="cd-email" type="email" name="email" required placeholder="you@company.com" autocomplete="email"></div>' +
      '<div class="cd-field"><label class="cd-label" for="cd-msg">WHAT ARE WE MAKING?</label><textarea class="cd-input cd-textarea" id="cd-msg" name="message" rows="3" required placeholder="A few lines about your project, timeline, or budget"></textarea></div>' +
      '</div>' +
      '<button class="cd-send" type="submit"><span class="cd-send-label">Send it over</span><img src="assets/img/email.svg" alt="" width="20" height="20"></button>' +
      '<p class="cd-error" hidden>Hmm, that didn\'t send. Email me directly at <a href="mailto:' + esc(S.email) + '">' + esc(S.email) + '</a>.</p>' +
      '</form>' +
      '<div class="cd-done" hidden>' + daisySVG() + '<h3 class="cd-done-title">Planted!</h3><p class="cd-done-copy">Your note is on its way. I\'ll write back within 48 hours.</p></div>' +
      '</div>' +
      '<div class="cd-alt"><svg class="cd-wavy" viewBox="0 0 1440 198" preserveAspectRatio="none" aria-hidden="true"><path d="' + WAVY + '"/></svg>' +
      '<p class="cd-alt-label">NOT A FAN OF FORMS?</p>' +
      '<a class="cd-alt-mail" href="mailto:' + esc(S.email) + '">' + esc(S.email) + '</a>' +
      '<nav class="cd-alt-social" aria-label="Social">' + S.socials.map(function (s) { return '<a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.label) + ' ↗</a>'; }).join('') + '</nav>' +
      '</div></aside>';
  }
  function initContact() {
    var holder = document.createElement('div'); holder.innerHTML = drawerHTML();
    while (holder.firstChild) document.body.appendChild(holder.firstChild);
    var scrim = document.getElementById('contact-scrim'), dr = document.getElementById('contact-drawer');
    var form = dr.querySelector('#cd-form'), send = dr.querySelector('.cd-send'), label = dr.querySelector('.cd-send-label');
    var err = dr.querySelector('.cd-error'), done = dr.querySelector('.cd-done'), opener = null, prevOverflow = '';
    function focusables() {
      return U.$$('a[href], button:not([disabled]), input:not(.cd-honey), textarea', dr).filter(function (el) { return el.offsetParent !== null || el.classList.contains('cd-close'); });
    }
    function setOpen(open) {
      if (open === dr.classList.contains('open')) return;
      dr.classList.toggle('open', open); scrim.classList.toggle('open', open); dr.setAttribute('aria-hidden', String(!open));
      if (open) {
        prevOverflow = document.body.style.overflow; document.body.style.overflow = 'hidden';
        setTimeout(function () { dr.querySelector('.cd-close').focus({ preventScroll: true }); }, 60);
      } else {
        document.body.style.overflow = prevOverflow;
        if (opener && opener.focus) opener.focus({ preventScroll: true });
      }
      document.dispatchEvent(new CustomEvent('contact:toggle', { detail: open }));
    }
    window.openContact = function (from) { opener = from || document.activeElement; setOpen(true); };
    document.addEventListener('click', function (e) {
      var o = e.target.closest('[data-contact-open]');
      if (o) { e.preventDefault(); window.openContact(o); }
    });
    scrim.addEventListener('click', function () { setOpen(false); });
    dr.querySelector('.cd-close').addEventListener('click', function () { setOpen(false); });
    document.addEventListener('keydown', function (e) {
      if (!dr.classList.contains('open')) return;
      if (e.key === 'Escape') { e.preventDefault(); setOpen(false); return; }
      if (e.key === 'Tab') {
        var f = focusables(); if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault(); err.hidden = true;
      var d = new FormData(form);
      if (d.get('_honey')) return;
      send.disabled = true; label.textContent = 'Sending…';
      fetch(S.formEndpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: d.get('name'), email: d.get('email'), message: d.get('message'), _subject: 'Portfolio inquiry — ' + d.get('name'), _replyto: d.get('email'), _template: 'table', _captcha: 'false' })
      }).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); }).then(function (j) {
        if (j && (j.success === false || j.success === 'false')) throw new Error('fail');
        form.hidden = true; done.hidden = false; void done.offsetWidth; done.classList.add('show');
      }).catch(function () { err.hidden = false; }).then(function () { send.disabled = false; label.textContent = 'Send it over'; });
    });
  }

  /* ---------- auto-scrolling screenshots: distance + speed follow the image height ---------- */
  window.initScrollShots = function (root) {
    U.$$('.scroll-shot img', root).forEach(function (img) {
      function fit() {
        var box = img.parentNode.getBoundingClientRect(), ih = img.getBoundingClientRect().height, dist = Math.max(0, ih - box.height);
        if (!box.height || !ih) return;
        img.style.setProperty('--dist', dist + 'px');
        img.style.setProperty('--dur', Math.max(8, dist / (box.height * .12)).toFixed(1) + 's');
      }
      img.addEventListener('load', fit); addEventListener('resize', fit);
      if ('ResizeObserver' in window) { var ro = new ResizeObserver(function () { fit(); }); ro.observe(img); ro.observe(img.parentNode); }
      requestAnimationFrame(fit); setTimeout(fit, 600);
    });
  };

  /* ---------- short-viewport scale (DevTools docked, landscape laptops…): --vh-scale 0.5–1 ---------- */
  function vhScale() {
    var v = Math.max(.5, Math.min(1, innerHeight / 900));
    document.documentElement.style.setProperty('--vh-scale', v.toFixed(3));
    document.documentElement.classList.toggle('short-vp', innerHeight < 720);
    return v;
  }
  window.vhScale = vhScale; vhScale(); addEventListener('resize', vhScale);

  /* ---------- reveal ---------- */
  window.observeReveals = function (root) {
    var els = U.$$('.reveal:not(.is-visible)', root);
    if (RM || !('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('is-visible'); }); return; }
    var io = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); } }); }, { rootMargin: '0px 0px -12% 0px', threshold: .15 });
    els.forEach(function (e) { io.observe(e); });
  };

  /* crawler-readable static copy (#ssr) is replaced by the live page */
  var ssr = document.getElementById('ssr'); if (ssr) ssr.remove();

  /* boot (scripts are at the end of <body>) */
  initContact();
  window.arrivedViaCurtain = openCurtainOnArrival();
})();
