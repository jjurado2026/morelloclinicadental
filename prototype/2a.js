// 2a «La visita» — comportamiento de la página. Una coreografía: todo sube (expo.out), como la visita al 2º C.
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const root = document.documentElement;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const desk = matchMedia('(min-width: 1100px)');
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
const { gsap, ScrollTrigger, SplitText, Lenis } = window;
gsap.registerPlugin(ScrollTrigger, SplitText);
const EASE = 'expo.out';

// ---------- scroll suave
let lenis = null;
if (!reduce) {
  lenis = new Lenis({ lerp: 0.11, smoothWheel: true, wheelMultiplier: 0.95 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(t => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]');
  if (!a || a.getAttribute('href') === '#') return;
  const t = document.querySelector(a.getAttribute('href'));
  if (!t) return;
  e.preventDefault();
  closeMenu();
  if (lenis) lenis.scrollTo(t, { duration: 1.8, easing: x => 1 - Math.pow(1 - x, 4) });
  else t.scrollIntoView();
  t.setAttribute('tabindex', '-1');
  t.focus({ preventScroll: true });
});

// ---------- horario real, en hora de Barcelona
const HOURS = { 1: [[10, 14], [16, 20]], 2: [[10, 14]], 3: [[9, 14], [16, 20]], 4: [[16, 20]], 5: [[10, 14]] };
const DAYS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
function bcnNow() {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: 'Europe/Madrid', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' }).formatToParts(new Date()).map(x => [x.type, x.value]));
  return { d: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(p.weekday), h: +p.hour + +p.minute / 60 };
}
function clinicState() {
  const { d, h } = bcnNow();
  const today = HOURS[d] || [];
  const cur = today.find(([a, b]) => h >= a && h < b);
  if (cur) return { open: true, d, h, short: `Abierto, hasta las ${cur[1]} h`, long: `Abierto ahora, hasta las ${cur[1]} h` };
  const later = today.find(([a]) => h < a);
  if (later) return { open: false, d, h, short: `Cerrado, abre a las ${later[0]} h`, long: `Cerrado ahora, abre hoy a las ${later[0]} h` };
  for (let k = 1; k <= 7; k++) {
    const nd = (d + k) % 7;
    if (HOURS[nd]) {
      const when = k === 1 ? 'mañana' : `el ${DAYS[nd]}`;
      return { open: false, d, h, short: `Cerrado, abre ${when} a las ${HOURS[nd][0][0]} h`, long: `Cerrado ahora, abre ${when} a las ${HOURS[nd][0][0]} h` };
    }
  }
}
function paintState() {
  const s = clinicState();
  $$('[data-state-short]').forEach(el => (el.textContent = s.short));
  $$('[data-state-long]').forEach(el => { if (el.closest('.hours, .menu')) el.textContent = s.long; });
  $$('.hd, .hours, .menu').forEach(el => el.classList.toggle('is-open', s.open));
  const board = $('[data-hours]');
  $$('.hours__days li', board).forEach(li => li.classList.toggle('is-today', +li.dataset.day === s.d));
  const inRange = HOURS[s.d] && s.h >= 9 && s.h <= 20;
  board.classList.toggle('has-now', !!inRange);
  if (inRange) board.style.setProperty('--now', ((s.h - 9) / 11).toFixed(4));
  const today = $(`.hours__days li[data-day="${s.d}"]`, board);
  if (today && inRange) {
    const nowEl = $('.hours__now', board);
    nowEl.style.top = `${today.offsetTop + 6}px`;
    nowEl.style.height = `${today.offsetHeight - 12}px`;
  }
}
paintState();
setInterval(paintState, 60000);

// ---------- cabecera, menú y barra del móvil
const hd = $('.hd'), menu = $('#menu'), menuBtn = $('.hd__menu'), dock = $('.dock');
function closeMenu() {
  if (menu.hidden) return;
  menu.hidden = true;
  menuBtn.setAttribute('aria-expanded', 'false');
  $('.hd__menu-t').textContent = 'Menú';
  lenis?.start();
}
menuBtn.addEventListener('click', () => {
  const open = menu.hidden;
  if (!open) return closeMenu();
  menu.hidden = false;
  menuBtn.setAttribute('aria-expanded', 'true');
  $('.hd__menu-t').textContent = 'Cerrar';
  lenis?.stop();
  if (!reduce) gsap.from($$('.menu nav a, .menu__foot > *'), { yPercent: 60, opacity: 0, duration: 0.9, ease: EASE, stagger: 0.04 });
  $('.menu nav a').focus();
});
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !menu.hidden) { closeMenu(); menuBtn.focus(); } });
$$('.menu a').forEach(a => a.addEventListener('click', closeMenu));

const themed = $$('[data-theme]');
const after = $('#odontopediatria'), ask = $('#informacion'), ft = $('.ft');
let mundoPaused = false;
function onScroll() {
  const y = scrollY;
  hd.classList.toggle('is-scrolled', y > 24);
  let theme = 'dark';
  for (const s of themed) { const r = s.getBoundingClientRect(); if (r.top <= 46 && r.bottom > 46) theme = s.dataset.theme; }
  hd.classList.toggle('is-light', theme === 'light' || theme === 'ice');
  hd.classList.toggle('is-cyan', theme === 'cyan');
  const afterTop = after.getBoundingClientRect().top;
  mundoPaused = afterTop <= 0;
  root.classList.toggle('past-visit', mundoPaused);
  root.classList.toggle('rail-out', afterTop < innerHeight * 0.7);
  const askTop = ask.getBoundingClientRect().top;
  dock.classList.toggle('is-hidden', askTop < innerHeight * 0.9 && ft.getBoundingClientRect().bottom > 0);
}
addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ---------- carrusel del hero: pasa solo, se pausa con el ratón, el foco o reduced motion
const slides = $$('.hero__slide'), tabs = $$('.hero__tabs [role=tab]'), hero = $('.hero');
const heroSplits = [];
let cur = 0, holdTween = null, heroHold = false, heroVisible = true;
const DWELL = 6.5;
function splitHero() {
  heroSplits.forEach(s => s.revert());
  slides.forEach((sl, i) => { heroSplits[i] = SplitText.create($('.hero__t', sl), { type: 'lines', mask: 'lines', linesClass: 'ln' }); });
}
function runTimer() {
  holdTween?.kill();
  tabs.forEach((t, i) => t.style.setProperty('--k', i === cur ? (reduce ? 1 : 0) : 0));
  if (reduce) return;
  holdTween = gsap.fromTo(tabs[cur], { '--k': 0 }, { '--k': 1, duration: DWELL, ease: 'none', onComplete: () => go((cur + 1) % slides.length) });
  if (heroHold || !heroVisible) holdTween.pause();
}
function go(i) {
  if (i === cur) return;
  const out = slides[cur], inn = slides[i], so = heroSplits[cur], si = heroSplits[i];
  tabs[cur].setAttribute('aria-selected', 'false'); tabs[cur].tabIndex = -1;
  tabs[i].setAttribute('aria-selected', 'true'); tabs[i].tabIndex = 0;
  out.setAttribute('aria-hidden', 'true'); out.inert = true;
  inn.removeAttribute('aria-hidden'); inn.inert = false;
  if (reduce) {
    out.classList.remove('is-on'); inn.classList.add('is-on');
    gsap.fromTo(inn, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'none' });
  } else {
    out.classList.add('is-leaving');
    gsap.timeline({ onComplete: () => out.classList.remove('is-leaving', 'is-on') })
      .to(so.lines, { yPercent: -105, duration: 0.8, ease: 'expo.in', stagger: 0.05 })
      .to($$('.hero__row > *', out), { y: -24, opacity: 0, duration: 0.5, ease: 'power2.in', stagger: 0.04 }, 0);
    inn.classList.add('is-on');
    gsap.timeline({ delay: 0.62 })
      .fromTo(si.lines, { yPercent: 105 }, { yPercent: 0, duration: 1.2, ease: EASE, stagger: 0.08 })
      .fromTo($$('.hero__row > *', inn), { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: EASE, stagger: 0.07 }, 0.18);
  }
  cur = i;
  runTimer();
}
tabs.forEach((t, i) => {
  t.addEventListener('click', () => go(i));
  t.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); const n = (i + (e.key === 'ArrowRight' ? 1 : slides.length - 1)) % slides.length; go(n); tabs[n].focus(); }
  });
});
const setHold = v => { heroHold = v; if (!holdTween) return; v || !heroVisible ? holdTween.pause() : holdTween.resume(); };
hero.addEventListener('pointerenter', () => setHold(true));
hero.addEventListener('pointerleave', () => setHold(false));
hero.addEventListener('focusin', () => setHold(true));
hero.addEventListener('focusout', e => { if (!hero.contains(e.relatedTarget)) setHold(false); });
ScrollTrigger.create({ trigger: '#calle', start: 'top top', end: 'bottom 40%', onToggle: s => { heroVisible = s.isActive; setHold(heroHold); } });

// ---------- revelados: titulares por líneas con máscara, el resto sube y aparece
function revealLines(el, opts = {}) {
  const run = () => {
    gsap.set(el, { visibility: 'visible' });
    const s = SplitText.create(el, { type: 'lines', mask: 'lines', linesClass: 'ln' });
    gsap.fromTo(s.lines, { yPercent: 108 }, { yPercent: 0, duration: 1.15, ease: EASE, stagger: 0.085, ...opts, onComplete: () => s.revert() });
  };
  document.fonts.status === 'loaded' ? run() : document.fonts.ready.then(run);
}
function riseIn(els, opts = {}) {
  return gsap.fromTo(els, { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: EASE, stagger: 0.08, ...opts });
}
function clipIn(el, opts = {}) {
  const r = getComputedStyle(el).borderTopLeftRadius || '0px';
  const img = $('img', el);
  const tl = gsap.timeline(opts);
  tl.fromTo(el, { clipPath: `inset(100% 0% 0% 0% round ${r})` }, { clipPath: `inset(0% 0% 0% 0% round ${r})`, duration: 1.4, ease: EASE });
  if (img) tl.fromTo(img, { scale: 1.22 }, { scale: 1, duration: 1.8, ease: EASE }, 0);
  return tl;
}

function intro() {
  const el = $('.intro');
  const tl = gsap.timeline({ defaults: { ease: EASE } });
  if (reduce) { el.classList.add('is-gone'); return tl; }
  tl.from('.intro__addr', { yPercent: 120, opacity: 0, duration: 0.5 })
    .from('.intro__floor', { yPercent: 25, opacity: 0, duration: 0.5 }, 0.02)
    .to('.intro__digits span', { yPercent: -200, duration: 0.55, ease: 'power3.inOut' }, 0.1)
    .to(el, { yPercent: -100, duration: 0.55, ease: 'power3.inOut' }, 0.6)
    .add(() => el.classList.add('is-gone'));
  return tl;
}

async function start() {
  await document.fonts.ready;
  splitHero();
  const s0 = heroSplits[0];
  const heroEls = [...$$('.hero__row > *', slides[0]), $('.hero__tabs'), $('.cue')];
  const hdEls = [$('.hd__logo'), ...$$('.hd__nav a'), ...$$('.hd__side > *'), $('.hd__menu')];
  if (!reduce) {
    gsap.set(s0.lines, { yPercent: 108 });
    gsap.set([...heroEls, ...hdEls, '.rail'], { opacity: 0, y: 20 });
  }
  const tl = intro();
  if (!reduce) {
    tl.to(s0.lines, { yPercent: 0, duration: 1.1, ease: EASE, stagger: 0.07 }, 0.78)
      .to(hdEls, { opacity: 1, y: 0, duration: 1, ease: EASE, stagger: 0.035 }, '<0.1')
      .to(heroEls, { opacity: 1, y: 0, duration: 1.1, ease: EASE, stagger: 0.07 }, '<0.15')
      .to('.rail', { opacity: 1, y: 0, duration: 1, ease: EASE }, '<0.2')
      .add(runTimer);
  } else runTimer();
  loadWorld();
  setupReveals();
  setupEsp();
  setupTeam();
  setupMisc();
  let w = innerWidth;
  let rt;
  addEventListener('resize', () => { if (innerWidth === w) return; w = innerWidth; clearTimeout(rt); rt = setTimeout(() => document.fonts.ready.then(() => { splitHero(); gsap.set(heroSplits.flatMap(s => s.lines), { yPercent: 0 }); }), 200); });
}

function setupReveals() {
  if (reduce) return;
  // paradas del recorrido: el texto aparece cuando llega su parada
  $$('.stop:not(.stop--calle)').forEach(sec => {
    const head = $('[data-lines]', sec), rise = $$('[data-rise]', sec);
    const s = SplitText.create(head, { type: 'lines', mask: 'lines', linesClass: 'ln' });
    gsap.set(s.lines, { yPercent: 108 });
    gsap.set(rise, { y: 32, opacity: 0 });
    const tl = gsap.timeline({ paused: true })
      .to(s.lines, { yPercent: 0, duration: 1.15, ease: EASE, stagger: 0.085 })
      .to(rise, { y: 0, opacity: 1, duration: 1.1, ease: EASE, stagger: 0.08 }, 0.25);
    ScrollTrigger.create({ trigger: sec, start: 'top 62%', onEnter: () => tl.play(), onLeaveBack: () => tl.reverse() });
  });
  // secciones de después
  $$('[data-theme] [data-lines]').forEach(h => {
    gsap.set(h, { visibility: 'hidden' });
    ScrollTrigger.create({ trigger: h, start: 'top 88%', once: true, onEnter: () => revealLines(h) });
  });
  $$('[data-theme] [data-rise]').forEach(el => {
    gsap.set(el, { y: 32, opacity: 0 });
    ScrollTrigger.create({ trigger: el, start: 'top 92%', once: true, onEnter: () => riseIn(el, { delay: 0.15 }) });
  });
  [...$$('.where__photo, .where__map'), ...(desk.matches ? [] : $$('.esp__thumb, .team__clip'))].forEach((el, i) => {
    gsap.set(el, { clipPath: 'inset(100% 0% 0% 0%)' });
    ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true, onEnter: () => clipIn(el, { delay: el.classList.contains('where__map') ? 0.25 : 0 }) });
  });
  // el teléfono sube cifra a cifra
  const tel = $('.where__tel');
  const telSplit = SplitText.create(tel, { type: 'chars', mask: 'chars' });
  gsap.set(tel, { opacity: 1, y: 0 });
  gsap.set(telSplit.chars, { yPercent: 110 });
  ScrollTrigger.create({ trigger: tel, start: 'top 90%', once: true, onEnter: () => gsap.to(telSplit.chars, { yPercent: 0, duration: 1.1, ease: EASE, stagger: 0.035, delay: 0.2 }) });
  // El cuidado de hoy: las dos fotos suben recortadas y luego se mueven a ritmos distintos
  const odpMain = $('.odp__main'), odpDet = $('.odp__detail');
  [odpMain, odpDet].forEach((el, i) => {
    gsap.set(el, { clipPath: 'inset(100% 0% 0% 0%)' });
    ScrollTrigger.create({ trigger: el, start: 'top 85%', once: true, onEnter: () => clipIn(el, { delay: i * 0.25 }) });
    gsap.fromTo($('img', el), { '--py': i ? '-12%' : '-8%' }, { '--py': '0%', ease: 'none', scrollTrigger: { trigger: '.odp', start: 'top bottom', end: 'bottom top', scrub: true } });
  });
  if (desk.matches) gsap.fromTo(odpDet, { y: 120 }, { y: -80, ease: 'none', scrollTrigger: { trigger: '.odp', start: 'top bottom', end: 'bottom top', scrub: true } });
  // Ortodoncia invisible: el gabinete se abre como una lente al bajar
  const inv = $('.inv__media');
  if (desk.matches) {
    gsap.timeline({ scrollTrigger: { trigger: '.inv', start: 'top top', end: 'bottom bottom', scrub: 0.6 } })
      .fromTo(inv, { '--iris': '9%', '--zoom': 1.22 }, { '--iris': '80%', '--zoom': 1, ease: 'none', duration: 1 })
      .fromTo(inv, { '--veil': 0 }, { '--veil': 1, ease: 'none', duration: 0.5 }, 0.4);
  } else {
    gsap.set(inv, { clipPath: 'circle(0% at 50% 50%)' });
    ScrollTrigger.create({ trigger: inv, start: 'top 80%', once: true, onEnter: () => { gsap.to(inv, { clipPath: 'circle(75% at 50% 50%)', duration: 1.5, ease: EASE }); gsap.fromTo($('img', inv), { scale: 1.2 }, { scale: 1, duration: 1.8, ease: EASE }); } });
  }
  // horario: las franjas se dibujan de izquierda a derecha
  const bars = $$('.hours__bar i');
  gsap.set(bars, { scaleX: 0 });
  ScrollTrigger.create({ trigger: '.hours', start: 'top 85%', once: true, onEnter: () => gsap.to(bars, { scaleX: 1, duration: 1.2, ease: EASE, stagger: 0.06, delay: 0.2 }) });
  // paralaje suave dentro de los marcos
  $$('.where__photo img').forEach(img => gsap.fromTo(img, { '--py': '-6%' }, { '--py': '0%', ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } }));
  // el logo del pie sube desde su línea base
  const mark = $('.ft__mark img');
  gsap.set(mark, { yPercent: 60, opacity: 0 });
  ScrollTrigger.create({ trigger: '.ft', start: 'top 85%', once: true, onEnter: () => gsap.to(mark, { yPercent: 0, opacity: 1, duration: 1.4, ease: EASE }) });
}

// ---------- Somos Especialistas: el marco cambia de imagen al pasar por cada especialidad
function setupEsp() {
  const items = $$('.esp__item'), pics = $$('.esp__frame picture'), cap = $('[data-cap]');
  let on = 0;
  const set = i => {
    if (i === on) return;
    items.forEach((it, k) => it.classList.toggle('is-on', k === i));
    if (desk.matches) {
      const prev = pics[on], next = pics[i];
      pics.forEach(p => p !== prev && p !== next && gsap.set(p, { zIndex: 0, clipPath: 'inset(100% 0% 0% 0%)' }));
      prev.classList.remove('is-on');
      gsap.set(prev, { zIndex: 1 });
      next.classList.add('is-on');
      gsap.set(next, { zIndex: 2 });
      if (reduce) { gsap.set(next, { clipPath: 'inset(0% 0% 0% 0%)' }); }
      else {
        const dir = i > on ? 1 : -1;
        gsap.fromTo(next, { clipPath: dir > 0 ? 'inset(100% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.15, ease: EASE, overwrite: true });
        gsap.fromTo($('img', next), { scale: 1.18 }, { scale: 1, duration: 1.6, ease: EASE, overwrite: true });
        gsap.timeline().to(cap, { yPercent: -100, duration: 0.35, ease: 'power2.in' }).add(() => (cap.textContent = $('h3', items[i]).textContent)).fromTo(cap, { yPercent: 100 }, { yPercent: 0, duration: 0.8, ease: EASE });
      }
      if (reduce) cap.textContent = $('h3', items[i]).textContent;
    }
    on = i;
  };
  gsap.set(pics.slice(1), { clipPath: 'inset(100% 0% 0% 0%)' });
  items.forEach((it, i) => {
    ScrollTrigger.create({ trigger: it, start: 'top 58%', end: 'bottom 58%', onToggle: s => s.isActive && set(i) });
    if (fine) it.addEventListener('pointerenter', () => set(i));
    it.addEventListener('focusin', () => set(i));
  });
  if (!reduce && desk.matches) {
    pics.forEach(p => gsap.fromTo($('img', p), { yPercent: -4 }, { yPercent: 4, ease: 'none', scrollTrigger: { trigger: '.esp__grid', start: 'top bottom', end: 'bottom top', scrub: true } }));
    const frame = $('.esp__frame');
    gsap.set(frame, { clipPath: 'inset(18% 10% 0% 10% round 36px)' });
    gsap.to(frame, { clipPath: 'inset(0% 0% 0% 0% round 36px)', ease: 'none', scrollTrigger: { trigger: '.esp__grid', start: 'top 95%', end: 'top 30%', scrub: true } });
  }
  // los diez tratamientos se desplazan con el scroll (no en bucle): avanzan al bajar y vuelven al subir
  const tr = $('.marquee__track');
  [...tr.children].forEach(n => { const c = n.cloneNode(true); c.classList.add('is-clone'); tr.append(c); });
  if (!reduce) gsap.fromTo(tr, { xPercent: 0 }, { xPercent: -38, ease: 'none', scrollTrigger: { trigger: '.all', start: 'top bottom', end: 'bottom top', scrub: 0.6 } });
}

// ---------- Nuestro Equipo: la foto crece hasta la pantalla y el equipo pasa en horizontal
function setupTeam() {
  const clip = $('.team__clip'), track = $('.team__track'), rail = $('.team__rail'), people = $$('.person');
  const activate = () => {
    const c = innerWidth / 2;
    let best = 0, dist = Infinity;
    people.forEach((p, i) => { const r = p.getBoundingClientRect(); const d = Math.abs(r.left + r.width / 2 - c * (desk.matches ? 0.8 : 0.6)); if (d < dist) { dist = d; best = i; } });
    people.forEach((p, i) => p.classList.toggle('is-on', i === best));
  };
  if (desk.matches && !reduce) {
    gsap.fromTo(clip, { '--ci': '16%', '--cx': '22%', '--cs': 1.18 }, { '--ci': '0%', '--cx': '0%', '--cs': 1, ease: 'none', scrollTrigger: { trigger: '.team__photo', start: 'top 85%', end: 'bottom bottom', scrub: true } });
    const dist = () => track.scrollWidth - innerWidth;
    gsap.to(track, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: rail, start: 'top top', end: () => '+=' + dist() * 1.1, pin: true, scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1, onUpdate: activate } });
    people.forEach((p, i) => gsap.fromTo(p, { y: 60 + i * 14, opacity: 0 }, { y: 0, opacity: 1, ease: EASE, duration: 1.2, scrollTrigger: { trigger: rail, start: 'top 70%', once: true }, delay: i * 0.06 }));
  } else {
    if (desk.matches) gsap.set(clip, { '--ci': '0%', '--cx': '0%', '--cs': 1 });
    track.addEventListener('scroll', () => requestAnimationFrame(activate), { passive: true });
    activate();
  }
}

// ---------- mapa diferido y formulario
function setupMisc() {
  const map = $('.where__map iframe');
  new IntersectionObserver((es, io) => es.forEach(e => { if (e.isIntersecting) { map.src = map.dataset.src; io.disconnect(); } }), { rootMargin: '800px 0px' }).observe(map);

  const form = $('.ask__form'), ok = $('.ask__ok');
  const rules = [
    ['#f-name', el => el.value.trim().length > 1, 'Escriba su nombre.'],
    ['#f-mail', el => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(el.value.trim()), 'Escriba un correo electrónico válido, por ejemplo nombre@correo.com.'],
    ['#f-tel', el => el.value.replace(/\D/g, '').length >= 9, 'Escriba un teléfono de contacto de 9 cifras.'],
    ['#f-rgpd', el => el.checked, 'Acepte las políticas de privacidad para enviar el formulario.'],
  ];
  const check = ([sel, test, msg]) => {
    const el = $(sel), err = $('#' + el.getAttribute('aria-describedby'));
    const good = test(el);
    err.textContent = good ? '' : msg;
    el.setAttribute('aria-invalid', good ? 'false' : 'true');
    return good;
  };
  rules.forEach(r => $(r[0]).addEventListener(r[0] === '#f-rgpd' ? 'change' : 'blur', () => $(r[0]).getAttribute('aria-invalid') && check(r)));
  form.addEventListener('submit', e => {
    e.preventDefault();
    const results = rules.map(check);
    const first = rules.find((r, i) => !results[i]);
    if (first) { $(first[0]).focus(); return; }
    $$('.field, .check, .ask__form > .btn', form).forEach(el => (el.hidden = true));
    ok.hidden = false;
    if (!reduce) gsap.fromTo(ok, { clipPath: 'inset(100% 0% 0% 0% round 24px)' }, { clipPath: 'inset(0% 0% 0% 0% round 24px)', duration: 1.2, ease: EASE });
    ok.setAttribute('tabindex', '-1');
    ok.focus();
  });
}

// ---------- el mundo 3D, después del primer pintado
function loadWorld() {
  const visita = $('.visita'), stops = $$('.stop');
  import('./js/2a-mundo.js?v=10')
    .then(({ mundo }) => {
      const r = mundo({ canvas: $('.world'), nav: $('.rail'), track: visita, sections: stops, paused: () => mundoPaused });
      if (!r) root.classList.add('no-webgl');
    })
    .catch(err => { root.classList.add('no-webgl'); console.warn('Sin mundo 3D:', err); });
}

start();
