// 2b · El diente M — coreografía
const { gsap, ScrollTrigger, SplitText } = window;
const root = document.documentElement;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const desk = matchMedia('(min-width: 1000px)');
const EASE = 'expo.out';
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
if (reduce) root.classList.add('reduce');

gsap.registerPlugin(ScrollTrigger, SplitText);
gsap.defaults({ ease: EASE });

/* Scroll suave */
let lenis = null;
if (!reduce && window.Lenis) {
  lenis = new window.Lenis({ lerp: 0.1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}
$$('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => {
  const id = a.getAttribute('href'); const el = id.length > 1 && $(id); if (!el) return;
  e.preventDefault();
  if (lenis) lenis.scrollTo(el, { duration: 1.4 }); else el.scrollIntoView();
  if (id === '#contenido' || id === '#inicio') el.setAttribute('tabindex', '-1'), el.focus({ preventScroll: true });
}));

/* Botones: rótulo que rueda */
$$('.btn__label[data-label]').forEach((l) => {
  const t = l.dataset.label;
  l.innerHTML = `<span class="roll"><span>${t}</span><span aria-hidden="true">${t}</span></span>`;
});

/* Horario vivo, en hora de Barcelona */
const HOURS = { 1: [[10, 14], [16, 20]], 2: [[10, 14]], 3: [[9, 14], [16, 20]], 4: [[16, 20]], 5: [[10, 14]] };
const DAYS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
function madridNow() {
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Madrid', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date()).map((p) => [p.type, p.value]));
  const d = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[parts.weekday];
  return { d, h: Number(parts.hour) + Number(parts.minute) / 60 };
}
function clinicStatus() {
  const { d, h } = madridNow();
  const today = HOURS[d] || [];
  const open = today.find(([a, b]) => h >= a && h < b);
  if (open) return { open: true, d, h, text: `Abierto, hasta las ${open[1]} h` };
  const later = today.find(([a]) => h < a);
  if (later) return { open: false, d, h, text: `Cerrado, abre hoy a las ${later[0]} h` };
  for (let i = 1; i <= 7; i++) {
    const nd = (d + i) % 7;
    if (HOURS[nd]) return { open: false, d, h, next: nd, text: `Cerrado, abre ${i === 1 ? 'mañana' : 'el ' + DAYS[nd]} a las ${HOURS[nd][0][0]} h` };
  }
}
function paintStatus() {
  const s = clinicStatus();
  $$('[data-status-text]').forEach((el) => { el.textContent = s.text; });
  $$('[data-status-dot]').forEach((el) => el.classList.toggle('is-open', s.open));
  const showDay = HOURS[s.d] ? s.d : (s.next ?? 1);
  const row = $(`.hours__day[data-day="${showDay}"]`);
  $$('.hours__day').forEach((r) => r.classList.toggle('is-today', r === row && !!HOURS[s.d]));
  if (row) {
    const name = row.querySelector('.hours__d').textContent;
    const t = row.querySelector('.hours__t').textContent;
    const today = $('[data-today]'); if (today) today.textContent = `${name} ${t}`;
    const inRange = !!HOURS[s.d] && s.h >= 8 && s.h <= 21;
    row.classList.toggle('has-now', inRange);
    if (inRange) row.querySelector('.hours__track').style.setProperty('--now', s.h.toFixed(2));
  }
}
paintStatus();
setInterval(paintStatus, 60000);

/* El diente M en 3D */
const toothSections = $$('[data-tooth]');
let tooth = null;
let heroMat = 'porcelain';
let espStep = 0;
const ESP_MATS = ['lacquer', 'pearl', 'satin'];
const K = (u, x, y, s, rx, ry, rz, mat) => ({ u, x, y, s, rx, ry, rz, mat });
function keyframes(id, L) {
  const D = desk.matches;
  if (id === 'hero') return D
    ? [K(0, 0.245, 0.05, 0.6, 0.1, -0.62, 0.06), K(1, 0.27, 0.5, 0.5, 0.5, -1.4, 0.12)]
    : [K(0, 0, 0.21, 0.36, 0.08, -0.4, 0.04), K(1, 0, 0.62, 0.3, 0.4, -1.1, 0.1)];
  if (id === 'esp') {
    if (D && !reduce) return [K(-1, 0.02, -0.85, 0.46, 0.7, -1.2, -0.25), K(0, 0.04, -0.02, 0.52, 0.18, 0.5, -0.08), K(0.62, 0.04, 0, 0.52, 0.12, 0.85, -0.04), K(1.0, 0.02, -0.02, 0.52, -0.1, 5.8, 0.08), K(1.5, 0.0, -0.01, 0.52, -0.06, 6.15, 0.05), K(1.9, 0.0, -0.03, 0.5, 0.2, 13.0, -0.1), K(L - 1, 0.0, -0.02, 0.5, 0.14, 13.35, -0.06), K(L, 0.02, 0.85, 0.42, 0.6, 14.2, 0)];
    if (D) return [K(-1, 0.06, -0.8, 0.5, 0.4, 0.8, 0), K(0, 0.05, 0, 0.56, 0.18, 0.6, -0.08), K(L - 1, 0.05, 0, 0.56, 0.18, 0.6, -0.08), K(L, 0.05, 0.8, 0.5, 0.4, 1, 0)];
    return [K(-1, 0.05, -0.7, 0.3, 0.5, 1.2, -0.2), K(0, 0.08, 0.22, 0.32, 0.2, 0.5, -0.08), K(0.5, 0.22, 0.32, 0.26, 0.2, 1.4, -0.08), K(L - 1, 0.22, 0.3, 0.27, 0.2, 6.8, -0.08), K(L, 0.2, 0.8, 0.26, 0.4, 7.4, 0)];
  }
  if (id === 'inv') return D
    ? [K(-1, 0, -0.85, 0.48, 0.5, -1.2, 0.1, 'porcelain'), K(0, 0, -0.03, 0.62, 0.12, -0.2, 0, 'porcelain'), K(0.22, 0, -0.02, 0.64, 0.1, 0.4, 0, 'glass'), K(L - 1, 0, 0, 0.7, -0.06, 3.5, 0, 'glass'), K(L - 0.75, 0, 0.12, 0.66, 0.05, 3.8, 0, 'porcelain'), K(L, 0, 0.85, 0.5, 0.4, 4.4, 0, 'porcelain')]
    : [K(-1, 0, -0.8, 0.36, 0.5, -1.2, 0.1, 'porcelain'), K(0, 0, 0.04, 0.4, 0.12, -0.2, 0, 'porcelain'), K(0.22, 0, 0.04, 0.42, 0.1, 0.4, 0, 'glass'), K(L - 1, 0, 0.04, 0.46, -0.06, 3.5, 0, 'glass'), K(L - 0.75, 0, 0.12, 0.44, 0.05, 3.8, 0, 'porcelain'), K(L, 0, 0.8, 0.36, 0.4, 4.4, 0, 'porcelain')];
  if (id === 'info') return D
    ? [K(-1, -0.3, -0.8, 0.28, 0.5, -2.2, 0), K(0, -0.3, -0.27, 0.32, 0.16, -0.45, -0.05), K(L, -0.3, 0.25, 0.3, 0.1, 0.6, 0.05)]
    : [K(-1, -0.18, -0.8, 0.3, 0.5, -2, 0), K(0, -0.16, -0.28, 0.32, 0.16, -0.45, -0.05), K(L, -0.14, 0.2, 0.3, 0.1, 0.8, 0.05)];
  return [K(0, 0, 0, 0.5, 0, 0, 0)];
}
const smooth = (t) => t * t * (3 - 2 * t);
function sample(kfs, u) {
  const keys = ['x', 'y', 's', 'rx', 'ry', 'rz'];
  let mat = null;
  for (const k of kfs) if (k.mat && u >= k.u) mat = k.mat;
  if (!mat) mat = kfs.find((k) => k.mat)?.mat || null;
  if (u <= kfs[0].u) return { ...kfs[0], mat };
  for (let i = 0; i < kfs.length - 1; i++) {
    const a = kfs[i], b = kfs[i + 1];
    if (u <= b.u) { const t = smooth((u - a.u) / (b.u - a.u)); const o = { mat }; keys.forEach((k) => { o[k] = a[k] + (b[k] - a[k]) * t; }); return o; }
  }
  return { ...kfs[kfs.length - 1], mat };
}
const metrics = new Map();
function measure() {
  const vh = window.innerHeight;
  toothSections.forEach((el) => {
    const r = el.getBoundingClientRect();
    metrics.set(el, { top: r.top + window.scrollY, L: el.offsetHeight / vh });
  });
}
let activeId = null;
function driveTooth() {
  if (!tooth) return;
  const vh = window.innerHeight, y = window.scrollY;
  let found = null;
  for (const el of toothSections) {
    const m = metrics.get(el); if (!m) continue;
    const u = (y - m.top) / vh;
    if (u > -1 && u < m.L) { found = { el, u, L: m.L }; break; }
  }
  if (!found) { if (tooth.running) tooth.stop(); activeId = null; return; }
  const id = found.el.dataset.tooth;
  const pose = sample(keyframes(id, found.L), found.u);
  if (id === 'hero') pose.mat = heroMat;
  if (id === 'esp') pose.mat = ESP_MATS[espStep];
  if (id === 'info') pose.mat = 'porcelain';
  if (id !== activeId) { tooth.jump(pose); activeId = id; } else tooth.setTarget(pose);
  if (!tooth.running) tooth.start();
}

async function initTooth() {
  const canvas = $('#stage');
  const probe = document.createElement('canvas');
  if (!(probe.getContext('webgl2') || probe.getContext('webgl'))) throw new Error('sin WebGL');
  const mod = await import('./js/2b-tooth.js');
  tooth = await mod.createTooth(canvas, { svgUrl: 'logo/morello-simbolo.svg', reduce });
  measure();
  const hero = keyframes('hero', 1)[0];
  if (window.scrollY < window.innerHeight * 0.5 && !reduce) {
    tooth.jump({ ...hero, s: hero.s * 0.72, y: hero.y - 0.12, ry: hero.ry - 2.4, rx: hero.rx + 0.4, mat: 'porcelain' });
    activeId = 'hero';
    tooth.start();
    tooth.setTarget(hero);
  }
  root.classList.add('is-gl');
  gsap.ticker.add(driveTooth);
  driveTooth();
}
const toothReady = initTooth().catch((err) => { console.warn('[2b] 3D no disponible:', err.message); root.classList.add('no-gl'); });

const menuBtn = $('.nav__menu'), menu = $('#menu'), mbar = $('.mbar');
/* Tema de la cabecera según la sección que pasa por debajo */
const nav = $('.nav');
const themed = $$('main > section, .foot');
let navTheme = 'dark';
function paintNav() {
  if (!menu.hidden) return;
  let t = 'dark';
  for (const sec of themed) { const r = sec.getBoundingClientRect(); if (r.top <= 44 && r.bottom > 44) { t = sec.dataset.theme === 'dark' ? 'dark' : 'light'; break; } }
  if (t !== navTheme) { navTheme = t; nav.dataset.theme = t; }
}
gsap.ticker.add(paintNav);

/* Menú móvil */

function setMenu(open) {
  menuBtn.setAttribute('aria-expanded', String(open));
  menu.hidden = !open;
  mbar.classList.toggle('is-hidden', open);
  if (open) { nav.dataset.theme = 'dark'; navTheme = 'dark'; }
  document.body.style.overflow = open ? 'hidden' : '';
  if (open) {
    lenis?.stop();
    if (!reduce) { gsap.fromTo(menu, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'expo.out' }); gsap.from($$('a', menu), { yPercent: 60, opacity: 0, duration: 0.9, stagger: 0.05, delay: 0.05 }); }
    $('a', menu).focus();
  } else { lenis?.start(); }
}
menuBtn.addEventListener('click', () => setMenu(menu.hidden));
menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) { setMenu(false); menuBtn.focus(); } });

/* Hero: entrada y diapositivas */
const slides = $$('.hero__slide');
const dots = $$('.hero__dot');
const cards = $$('.hero__card-img');
const caps = $$('.hero__card-name');
slides.forEach((s) => s.querySelectorAll('.hero__line').forEach((l) => { l.innerHTML = `<span class="hl">${l.textContent}</span>`; }));
let slide = 0, slideTimer = null, fillTween = null, paused = false, heroVisible = true;
const SLIDE_S = 7;
function scheduleSlide() {
  slideTimer?.kill(); fillTween?.kill();
  dots.forEach((d, i) => gsap.set(d.querySelector('.hero__dot-fill'), { scaleX: i === slide ? (reduce ? 1 : 0) : 0 }));
  if (reduce || paused || !heroVisible) { gsap.set(dots[slide].querySelector('.hero__dot-fill'), { scaleX: 1 }); return; }
  fillTween = gsap.to(dots[slide].querySelector('.hero__dot-fill'), { scaleX: 1, duration: SLIDE_S, ease: 'none' });
  slideTimer = gsap.delayedCall(SLIDE_S, () => goSlide((slide + 1) % slides.length));
}
function goSlide(n) {
  if (n === slide) return;
  const from = slides[slide], to = slides[n];
  slide = n;
  from.setAttribute('aria-hidden', 'true'); from.inert = true;
  to.removeAttribute('aria-hidden'); to.inert = false;
  dots.forEach((d, i) => { d.classList.toggle('is-active', i === n); d.toggleAttribute('aria-current', i === n); });
  caps.forEach((c, i) => { c.hidden = i !== n; });
  if (!reduce) gsap.fromTo(caps[n], { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.9, delay: 0.35 });
  heroMat = n === 1 ? 'pearl' : 'porcelain';
  if (reduce) {
    slides.forEach((s) => s.classList.toggle('is-active', s === to));
    cards.forEach((c, i) => c.classList.toggle('is-active', i === n));
  } else {
    tooth?.spin(1);
    gsap.to($$('.hl', from), { yPercent: -110, duration: 0.7, stagger: 0.06, ease: 'expo.out' });
    gsap.to($('.hero__meta', from), { opacity: 0, y: -16, duration: 0.5, onComplete: () => from.classList.remove('is-active') });
    to.classList.add('is-active');
    gsap.fromTo($$('.hl', to), { yPercent: 110 }, { yPercent: 0, duration: 1.3, stagger: 0.08, delay: 0.25 });
    gsap.fromTo($('.hero__meta', to), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1.1, delay: 0.5 });
    const ci = cards[n];
    cards.forEach((c) => { if (c !== ci) gsap.to(c, { opacity: 0, duration: 0.8, delay: 0.3, onComplete: () => c.classList.remove('is-active') }); });
    ci.classList.add('is-active');
    gsap.fromTo(ci, { opacity: 1, clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'expo.inOut' });
    gsap.fromTo($('img', ci), { scale: 1.25 }, { scale: 1, duration: 1.6 });
  }
  scheduleSlide();
}
dots.forEach((d, i) => d.addEventListener('click', () => goSlide(i)));
const hero = $('.hero');
const pause = (v) => { paused = v; scheduleSlide(); };
hero.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') pause(true); });
hero.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') pause(false); });
hero.addEventListener('focusin', () => pause(true));
hero.addEventListener('focusout', (e) => { if (!hero.contains(e.relatedTarget)) pause(false); });
ScrollTrigger.create({ trigger: hero, start: 'top top', end: 'bottom 30%', onToggle: (s) => { heroVisible = s.isActive; scheduleSlide(); } });

function intro() {
  root.classList.add('is-ready');
  if (reduce) { scheduleSlide(); return; }
  const s0 = slides[0];
  const tl = gsap.timeline({ delay: 0.1, onComplete: scheduleSlide });
  tl.from($$('.hl', s0), { yPercent: 112, duration: 1.6, stagger: 0.11 }, 0.15)
    .from($('.hero__sub', s0), { y: 28, opacity: 0, duration: 1.2 }, 0.6)
    .from($('.btn', s0), { y: 28, opacity: 0, duration: 1.2 }, 0.7)
    .from('.nav__bar', { y: -24, opacity: 0, duration: 1.2 }, 0.35)
    .from('.hero__card', { y: 48, opacity: 0, duration: 1.4 }, 0.75)
    .from('.hero__card-media', { clipPath: 'inset(100% 0% 0% 0% round 17px)', duration: 1.5, ease: 'expo.inOut' }, 0.8)
    .from('.hero__card-img.is-active img', { scale: 1.3, duration: 1.8 }, 0.8)
    .from('.hero__foot', { y: 16, opacity: 0, duration: 1.1 }, 1.05);
}

/* Revelaciones de titulares por línea */
function splitHeadings() {
  $$('[data-split]').forEach((el) => {
    SplitText.create(el, {
      type: 'lines', mask: 'lines', linesClass: 'split-line', autoSplit: true,
      onSplit(self) {
        if (reduce) return;
        return gsap.from(self.lines, { yPercent: 112, duration: 1.3, stagger: 0.09, scrollTrigger: { trigger: el, start: 'top 86%', once: true } });
      }
    });
  });
}

/* Clínica de referencia */
function refScene() {
  if (reduce) return;
  gsap.from('.chip', { scale: 0.4, opacity: 0, duration: 1.3, stagger: 0.12, delay: 0.25, scrollTrigger: { trigger: '.ref__title', start: 'top 86%', once: true } });
  gsap.fromTo('.ref__year span', { yPercent: 100 }, { yPercent: 0, stagger: 0.12, ease: 'none', scrollTrigger: { trigger: '.ref__founded', start: 'top 95%', end: 'top 62%', scrub: 0.6 } });
  const stmt = $('.ref__statement');
  SplitText.create(stmt, { type: 'words', wordsClass: 'w', autoSplit: true, onSplit(self) {
    return gsap.fromTo(self.words, { opacity: 0.16 }, { opacity: 1, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: stmt, start: 'top 82%', end: 'bottom 48%', scrub: true } });
  } });
  gsap.from('.ref__body', { y: 30, opacity: 0, duration: 1.2, scrollTrigger: { trigger: '.ref__body', start: 'top 88%', once: true } });
  const frame = $('.ref__photo-frame');
  const side = desk.matches ? 27 : 9;
  gsap.fromTo(frame, { clipPath: `inset(4% ${side}% 4% ${side}% round 44px)` }, { clipPath: 'inset(0% 0% 0% 0% round 44px)', ease: 'none', scrollTrigger: { trigger: frame, start: 'top 92%', end: 'center 52%', scrub: true } });
  gsap.fromTo($('img', frame), { scale: 1.32 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true } });
  gsap.from('.ref__photo-cap span', { y: 20, opacity: 0, duration: 1, stagger: 0.1, scrollTrigger: { trigger: '.ref__photo-cap', start: 'top 95%', once: true } });
  gsap.from('.access__stage', { clipPath: 'inset(0% 0% 100% 0% round 44px)', duration: 1.6, ease: 'expo.inOut', scrollTrigger: { trigger: '.access', start: 'top 84%', once: true } });
  gsap.from('.access__row', { x: 50, opacity: 0, duration: 1.3, stagger: 0.1, scrollTrigger: { trigger: '.access', start: 'top 80%', once: true } });
}

/* Especialistas: escena fijada */
const esp = $('.esp'), espStage = $('.esp__stage'), espSteps = $$('.esp__step'), espIdx = $$('.esp__index li'), espBars = $$('.esp__bar i');
function setEsp(n) {
  if (n === espStep && esp.dataset.ready) return;
  espStep = n; esp.dataset.ready = '1';
  espSteps.forEach((s, i) => { s.classList.toggle('is-active', i === n); if (esp.classList.contains('is-pinned')) s.inert = i !== n; });
  espIdx.forEach((li, i) => li.classList.toggle('is-active', i === n));
}
function espScene() {
  const RANGES = [[0, 0.95], [0.95, 1.85], [1.85, 2.6]];
  ScrollTrigger.matchMedia({
    '(min-width: 1000px)': () => {
      if (reduce) return;
      esp.classList.add('is-pinned');
      setEsp(0);
      const st = ScrollTrigger.create({
        trigger: espStage, pin: true, start: 'top top', end: () => '+=' + window.innerHeight * 2.6, anticipatePin: 1,
        onUpdate: (self) => {
          const u = self.progress * 2.6;
          const n = u < RANGES[1][0] ? 0 : u < RANGES[2][0] ? 1 : 2;
          setEsp(n);
          espBars.forEach((b, i) => { const [a, z] = RANGES[i]; gsap.set(b, { scaleX: Math.min(Math.max((u - a) / (z - a), 0), 1) }); });
        }
      });
      gsap.from('.esp__lead', { y: 30, opacity: 0, duration: 1.2, scrollTrigger: { trigger: espStage, start: 'top 70%', once: true } });
      gsap.from('.esp__index li', { opacity: 0, duration: 1.1, stagger: 0.08, scrollTrigger: { trigger: espStage, start: 'top 55%', once: true } });
      return () => { st.kill(); esp.classList.remove('is-pinned'); espSteps.forEach((s) => { s.inert = false; }); };
    },
    '(max-width: 999px)': () => {
      espSteps.forEach((s, i) => {
        ScrollTrigger.create({ trigger: s, start: 'top 65%', end: 'bottom 35%', onToggle: (self) => { if (self.isActive) setEsp(i); } });
        if (!reduce) gsap.from(s, { y: 60, opacity: 0, duration: 1.2, scrollTrigger: { trigger: s, start: 'top 90%', once: true } });
      });
    }
  });
}

/* Índice de tratamientos */
function ttoScene() {
  if (reduce) return;
  gsap.from('.tto__list li', { y: 40, opacity: 0, duration: 1.1, stagger: 0.06, scrollTrigger: { trigger: '.tto__list', start: 'top 85%', once: true } });
}


/* Accesos: la foto cambia con la fila activa */
function accessIndex() {
  const rows = $$('.access__row'), imgs = $$('.access__img');
  const set = (i) => {
    rows.forEach((r, k) => r.classList.toggle('is-active', k === i));
    imgs.forEach((m, k) => m.classList.toggle('is-active', k === i));
  };
  rows.forEach((r, i) => { r.addEventListener('pointerenter', () => set(i)); r.addEventListener('focus', () => set(i)); });
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) {
    rows.forEach((r, i) => ScrollTrigger.create({ trigger: r, start: 'top 62%', end: 'bottom 38%', onToggle: (s) => { if (s.isActive) set(i); } }));
  }
}

/* Tratamientos: vista previa que sigue al cursor */
function ttoPreview() {
  const list = $('.tto__list'), pv = $('.tto__pv');
  if (!list || !pv || reduce || !matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1000px)').matches) return;
  const imgs = $$('.tto__pv-img', pv);
  const pos = { x: 0, y: 0 }, tgt = { x: 0, y: 0 };
  let on = false;
  const xTo = gsap.quickSetter(pv, 'x', 'px'), yTo = gsap.quickSetter(pv, 'y', 'px'), rTo = gsap.quickSetter(pv, 'rotate', 'deg');
  let anchorX = 0;
  const measureAnchor = () => { const d = $('.tto__desc', list); anchorX = d ? d.getBoundingClientRect().left + 150 : window.innerWidth * 0.62; };
  window.addEventListener('resize', measureAnchor); measureAnchor();
  list.addEventListener('pointermove', (e) => { measureAnchor(); tgt.x = anchorX + (e.clientX - window.innerWidth / 2) * 0.04; tgt.y = e.clientY; if (!on) { pos.x = tgt.x; pos.y = tgt.y; } });
  $$('.tto__row', list).forEach((row) => row.addEventListener('pointerenter', () => {
    imgs.forEach((m) => m.classList.toggle('is-active', m.dataset.img === row.dataset.img));
    if (!on) { on = true; gsap.to(pv, { opacity: 1, scale: 1, duration: 0.6, overwrite: 'auto' }); }
  }));
  list.addEventListener('pointerleave', () => { on = false; gsap.to(pv, { opacity: 0, scale: 0.85, duration: 0.5, overwrite: 'auto' }); });
  gsap.set(pv, { xPercent: -50, yPercent: -50 });
  gsap.ticker.add(() => {
    const dx = tgt.x - pos.x;
    pos.x += dx * 0.14; pos.y += (tgt.y - pos.y) * 0.14;
    xTo(pos.x); yTo(pos.y); rTo(Math.max(-8, Math.min(8, dx * 0.04)));
  });
}

/* Ortodoncia invisible: escena fijada */
function invScene() {
  if (reduce) return;
  const stage = $('.inv__stage');
  const tl = gsap.timeline({ scrollTrigger: { trigger: stage, pin: true, start: 'top top', end: () => '+=' + window.innerHeight * 1.6, scrub: 0.8, anticipatePin: 1 } });
  tl.fromTo('.inv__line:not(.inv__line--2)', { xPercent: -18, opacity: 0.0 }, { xPercent: 0, opacity: 1, duration: 0.5, ease: 'none' }, 0)
    .fromTo('.inv__line--2', { xPercent: 18, opacity: 0.0 }, { xPercent: 0, opacity: 1, duration: 0.5, ease: 'none' }, 0.08)
    .fromTo('.inv__foot > *', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, stagger: 0.06, ease: 'none' }, 0.45)
    .fromTo('.inv__card', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'none' }, 0.55)
    .to({}, { duration: 0.4 });
}

/* Llamada: el campo cian crece */
function ctaScene() {
  if (reduce) return;
  const field = $('.cta__field');
  gsap.fromTo(field, { clipPath: 'inset(7% 6% 7% 6% round 72px)' }, { clipPath: 'inset(0% 0% 0% 0% round 44px)', ease: 'none', scrollTrigger: { trigger: '.cta', start: 'top bottom', end: 'top 25%', scrub: true } });
  gsap.fromTo('.cta__motif', { rotate: -14, yPercent: 8 }, { rotate: 16, yPercent: -8, ease: 'none', scrollTrigger: { trigger: '.cta', start: 'top bottom', end: 'bottom top', scrub: true } });
  gsap.from('.cta__side > *', { y: 40, opacity: 0, duration: 1.2, stagger: 0.1, scrollTrigger: { trigger: '.cta__top', start: 'top 85%', once: true } });
  gsap.fromTo('.cta__phone span', { yPercent: 55, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.12, ease: 'none', scrollTrigger: { trigger: '.cta__phone', start: 'top 98%', end: 'bottom 80%', scrub: 0.6 } });
}

/* Equipo: pista horizontal fijada */
function teamScene() {
  const track = $('.team__track'), viewport = $('.team__viewport'), stage = $('.team__stage');
  if (reduce) { viewport.style.overflowX = 'auto'; return; }
  const dist = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
  const move = gsap.to(track, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: stage, pin: true, start: 'top top', end: () => '+=' + dist(), scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1 } });
  $$('.person', track).forEach((p) => {
    gsap.fromTo(p, { yPercent: 8, rotate: 2, opacity: 0.4 }, { yPercent: 0, rotate: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: p, containerAnimation: move, start: 'left 104%', end: 'left 80%', scrub: true } });
    gsap.fromTo($('img', p), { scale: 1.18 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: p, containerAnimation: move, start: 'left 100%', end: 'right 0%', scrub: true } });
  });
  gsap.from('.team__group', { clipPath: 'inset(0% 0% 100% 0% round 28px)', duration: 1.5, ease: 'expo.inOut', scrollTrigger: { trigger: stage, start: 'top 75%', once: true } });
  gsap.fromTo('.team__group img', { scale: 1.25 }, { scale: 1, duration: 2, scrollTrigger: { trigger: stage, start: 'top 75%', once: true } });
  gsap.from('.team__aside > *', { y: 30, opacity: 0, duration: 1.2, stagger: 0.08, scrollTrigger: { trigger: '.team__head', start: 'top 80%', once: true } });
}

/* Dónde estamos */
function dondeScene() {
  if (reduce) return;
  gsap.from('.bento > *', { y: 60, opacity: 0, duration: 1.3, stagger: 0.1, scrollTrigger: { trigger: '.bento', start: 'top 85%', once: true } });
  gsap.from('.bento__photo', { clipPath: 'inset(100% 0% 0% 0% round 16px)', duration: 1.4, ease: 'expo.inOut', delay: 0.4, scrollTrigger: { trigger: '.bento', start: 'top 80%', once: true } });
  gsap.from('.bento__tel span', { yPercent: 80, opacity: 0, duration: 1.1, stagger: 0.08, scrollTrigger: { trigger: '.bento__tel', start: 'top 92%', once: true } });
  gsap.from('.hours__track i', { scaleX: 0, duration: 1.4, stagger: 0.06, scrollTrigger: { trigger: '.hours__week', start: 'top 85%', once: true } });
  gsap.from('.hours__day', { x: 30, opacity: 0, duration: 1.1, stagger: 0.06, scrollTrigger: { trigger: '.hours__week', start: 'top 88%', once: true } });
}

/* Solicite información */
function infoScene() {
  if (!reduce) {
    gsap.from('.info__text', { y: 30, opacity: 0, duration: 1.2, scrollTrigger: { trigger: '.info', start: 'top 70%', once: true } });
    gsap.from('.form > *', { y: 36, opacity: 0, duration: 1.1, stagger: 0.06, scrollTrigger: { trigger: '.form', start: 'top 82%', once: true } });
    gsap.fromTo('.foot__mark img', { yPercent: 40, opacity: 0.2 }, { yPercent: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: '.foot', start: 'top bottom', end: 'bottom bottom', scrub: true } });
  }
  const form = $('.form'), err = $('.form__error'), done = $('.form__done');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const bad = $$('[required]', form).filter((f) => !f.checkValidity());
    $$('input, textarea', form).forEach((f) => f.removeAttribute('aria-invalid'));
    bad.forEach((f) => f.setAttribute('aria-invalid', 'true'));
    if (bad.length) {
      err.hidden = false;
      err.textContent = bad.some((f) => f.type === 'checkbox') && bad.length === 1 ? 'Para enviar, acepte las políticas de privacidad.' : 'Revise los campos marcados con * para poder enviar.';
      bad[0].focus();
      return;
    }
    err.hidden = true;
    $$('.field, .check, .form__send', form).forEach((n) => { n.hidden = true; });
    done.hidden = false;
    if (!reduce) gsap.from(done, { y: 24, opacity: 0, duration: 1 });
    done.setAttribute('tabindex', '-1'); done.focus();
  });
}

/* Arranque */
(async () => {
  await Promise.race([document.fonts.ready, wait(2200)]);
  await Promise.race([toothReady, wait(1400)]);
  splitHeadings();
  intro();
  refScene();
  espScene();
  ttoScene();
  accessIndex();
  ttoPreview();
  invScene();
  ctaScene();
  teamScene();
  dondeScene();
  infoScene();
  ScrollTrigger.addEventListener('refresh', () => { measure(); driveTooth(); });
  ScrollTrigger.refresh();
  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
