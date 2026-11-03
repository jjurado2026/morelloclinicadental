(() => {
  const doc = document.documentElement;
  doc.classList.add('js');
  const quieto = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ancho = matchMedia('(min-width: 901px)');

  // Horario real de la clínica (página de contacto), en hora de Barcelona
  const HORARIO = { 1: [[10, 14], [16, 20]], 2: [[10, 14]], 3: [[9, 14], [16, 20]], 4: [[16, 20]], 5: [[10, 14]] };
  const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  function estado() {
    const ahora = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Madrid' }));
    const d = ahora.getDay(), h = ahora.getHours() + ahora.getMinutes() / 60;
    const tramo = (HORARIO[d] || []).find(([a, b]) => h >= a && h < b);
    if (tramo) return { abierto: true, corto: `Abierto, hasta las ${tramo[1]} h`, largo: `Abierto ahora, hasta las ${tramo[1]} h` };
    for (let k = 0; k < 8; k++) {
      const dd = (d + k) % 7;
      const sig = (HORARIO[dd] || []).find(([a]) => k > 0 || a > h);
      if (sig) {
        const cuando = k === 0 ? 'hoy' : k === 1 ? 'mañana' : `el ${DIAS[dd]}`;
        return { abierto: false, corto: `Cerrado, abre ${cuando} a las ${sig[0]} h`, largo: `Ahora cerrado, abre ${cuando} a las ${sig[0]} h` };
      }
    }
  }
  const e = estado();
  document.querySelectorAll('[data-estado]').forEach((n) => { n.textContent = e.corto; n.classList.toggle('is-abierto', e.abierto); });
  document.querySelectorAll('[data-estado-largo]').forEach((n) => { n.textContent = e.largo; });

  // Menú móvil
  const menu = document.getElementById('menu');
  const abrir = document.querySelector('.cab__menu');
  abrir.addEventListener('click', () => { menu.showModal(); abrir.setAttribute('aria-expanded', 'true'); });
  menu.querySelector('.menu__cerrar').addEventListener('click', () => menu.close());
  menu.addEventListener('close', () => abrir.setAttribute('aria-expanded', 'false'));

  const gsap = window.gsap;
  if (gsap) gsap.registerPlugin(window.ScrollTrigger, window.SplitText);

  // Scroll suave sincronizado con ScrollTrigger
  let lenis = null;
  if (!quieto && window.Lenis) {
    lenis = new window.Lenis({ lerp: 0.09 });
    if (gsap) {
      lenis.on('scroll', window.ScrollTrigger.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const f = (t) => { lenis.raf(t); requestAnimationFrame(f); };
      requestAnimationFrame(f);
    }
  }

  // El apellido: dos copias exactas, blanca sobre el campo y azul dentro del marco
  const hero = document.querySelector('.hero');
  const marco = hero.querySelector('.marco');
  const capa = hero.querySelector('.marco__capa');
  const fuera = hero.querySelector('.nombre:not(.nombre--tinta)');
  const dentro = capa.querySelector('.nombre--tinta');
  const diapos = [...hero.querySelectorAll('.diapo')];
  const fotos = [...hero.querySelectorAll('.marco__foto')];
  const pasos = [...hero.querySelectorAll('.paso')];
  const grupoPasos = hero.querySelector('.pasos');
  let dx = 0, letrasF = [], letrasD = [], partido = false;
  const pieNombre = document.querySelector('.pie__nombre');
  const margen = () => parseFloat(getComputedStyle(document.querySelector('.cab')).paddingLeft) || 16;
  // El apellido ocupa exactamente el ancho entre márgenes
  function encajar() {
    [fuera, dentro, pieNombre].forEach((n) => (n.style.fontSize = ''));
    const ancho0 = fuera.firstElementChild.getBoundingClientRect().width;
    const fs = parseFloat(getComputedStyle(fuera).fontSize);
    const t = `${(fs * (hero.clientWidth - 2 * margen()) / ancho0) * 0.998}px`;
    [fuera, dentro, pieNombre].forEach((n) => (n.style.fontSize = t));
  }
  // El borde del marco cae en el hueco entre la «o» y la «r», nunca en un remate
  function cortar() {
    const m = margen();
    if (!ancho.matches) { marco.style.width = ''; diapos.forEach((d) => (d.style.width = '')); return; }
    const o = (letrasF[1] || fuera.firstElementChild).getBoundingClientRect();
    const corte = (letrasF[1] ? o.right : o.left + o.width * 0.29) - hero.getBoundingClientRect().left - 2;
    marco.style.width = `${hero.clientWidth - m - corte}px`;
    diapos.forEach((d) => (d.style.width = `${Math.max(280, corte - m - 48)}px`));
  }
  function alinear() {
    dentro.style.left = `${fuera.offsetLeft - marco.offsetLeft}px`;
    dentro.style.top = `${fuera.offsetTop - marco.offsetTop}px`;
    dx = ancho.matches && !quieto ? -(marco.offsetLeft - fuera.offsetLeft) : 0;
  }
  function preparar() {
    encajar();
    if (!partido && gsap && window.SplitText) {
      letrasF = window.SplitText.create(fuera.firstElementChild, { type: 'chars' }).chars;
      letrasD = window.SplitText.create(dentro.firstElementChild, { type: 'chars' }).chars;
      partido = true;
    }
    cortar();
    alinear();
  }
  addEventListener('resize', () => { gsap?.set([marco, capa, grupoPasos], { x: 0 }); preparar(); colocar(actual, true); });

  // Diapositivas: el marco cruza el apellido y el apellido cambia de color a su paso
  let actual = 0, enCurso = null;
  function colocar(n, ya) {
    if (!gsap) return;
    const x = n === 1 ? dx : 0;
    const px = n === 1 && dx ? diapos[1].offsetLeft - grupoPasos.offsetLeft : 0;
    const d = ya ? 0 : 1.4;
    gsap.to(marco, { x, duration: d, ease: 'power4.inOut', overwrite: true });
    gsap.to(capa, { x: -x, duration: d, ease: 'power4.inOut', overwrite: true });
    gsap.to(grupoPasos, { x: px, duration: d, ease: 'power4.inOut', overwrite: true });
  }
  function ir(n) {
    if (n === actual) return;
    const antes = diapos[actual], ya = diapos[n];
    antes.setAttribute('aria-hidden', 'true');
    antes.querySelectorAll('a').forEach((a) => (a.tabIndex = -1));
    ya.removeAttribute('aria-hidden');
    ya.querySelectorAll('a').forEach((a) => a.removeAttribute('tabindex'));
    pasos[actual].classList.remove('is-on');
    pasos[actual].removeAttribute('aria-current');
    void pasos[n].offsetWidth;
    pasos[n].classList.add('is-on');
    pasos[n].setAttribute('aria-current', 'true');
    fotos[n].classList.add('is-on');
    if (!gsap || quieto) {
      fotos[actual].classList.remove('is-on');
      antes.classList.remove('is-on');
      ya.classList.add('is-on');
      if (gsap) { gsap.fromTo(ya, { opacity: 0 }, { opacity: 1, duration: 0.4 }); }
      actual = n;
      return;
    }
    enCurso?.kill();
    const vieja = fotos[actual];
    antes.classList.add('is-saliendo');
    ya.classList.add('is-on');
    const tl = gsap.timeline({ onComplete: () => { antes.classList.remove('is-on', 'is-saliendo'); vieja.classList.remove('is-on'); } });
    tl.to(antes.querySelectorAll('.ln>span'), { yPercent: -110, duration: 0.6, ease: 'power3.in', stagger: 0.05 }, 0)
      .to(antes.querySelector('.btn'), { opacity: 0, y: -12, duration: 0.4, ease: 'power2.in' }, 0)
      .fromTo(fotos[n], { opacity: 0 }, { opacity: 1, duration: 1.1, ease: 'power2.inOut' }, 0.25)
      .fromTo(fotos[n].querySelector('img'), { scale: 1.12 }, { scale: 1, duration: 1.8, ease: 'power4.out' }, 0.25)
      .fromTo(ya.querySelectorAll('.ln>span'), { yPercent: 110 }, { yPercent: 0, duration: 1.1, ease: 'power4.out', stagger: 0.08 }, 0.75)
      .fromTo(ya.querySelector('.btn'), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power4.out' }, 0.95);
    colocar(n);
    enCurso = tl;
    actual = n;
  }
  pasos.forEach((p, n) => {
    p.addEventListener('click', () => { hero.classList.remove('is-auto'); diapos.forEach((d) => d.setAttribute('aria-live', 'polite')); ir(n); });
    p.querySelector('span').addEventListener('animationend', () => ir((actual + 1) % diapos.length));
  });
  const pausa = (on) => hero.classList.toggle('is-pausa', on);
  const zona = [...diapos, grupoPasos];
  zona.forEach((z) => {
    z.addEventListener('mouseenter', () => pausa(true));
    z.addEventListener('mouseleave', () => pausa(hero.contains(document.activeElement)));
  });
  hero.addEventListener('focusin', () => pausa(true));
  hero.addEventListener('focusout', (ev) => { if (!hero.contains(ev.relatedTarget)) pausa(zona.some((z) => z.matches(':hover'))); });

  // Entrada: el marco se abre de abajo arriba y el apellido sube letra a letra
  if (gsap && !quieto) {
    const ya = diapos[0];
    gsap.set(marco, { clipPath: 'inset(100% 0% 0% 0%)' });
    gsap.set([fuera, dentro], { autoAlpha: 0 });
    gsap.set(ya.querySelectorAll('.ln>span'), { yPercent: 110 });
    gsap.set([ya.querySelector('.btn'), grupoPasos], { opacity: 0, y: 16 });
    const empezar = () => {
      preparar();
      gsap.set([...letrasF, ...letrasD], { yPercent: 118 });
      gsap.set([fuera, dentro], { autoAlpha: 1 });
      const tl = gsap.timeline({ onComplete: () => hero.classList.add('is-auto') });
      tl.to(marco, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'power4.inOut' }, 0)
        .fromTo(fotos[0].querySelector('img'), { scale: 1.18 }, { scale: 1, duration: 2.2, ease: 'power4.out' }, 0.2)
        .to(letrasF, { yPercent: 0, duration: 1.3, ease: 'power4.out', stagger: 0.055 }, 0.55)
        .to(letrasD, { yPercent: 0, duration: 1.3, ease: 'power4.out', stagger: 0.055 }, 0.55)
        .to(ya.querySelectorAll('.ln>span'), { yPercent: 0, duration: 1.1, ease: 'power4.out', stagger: 0.08 }, 0.9)
        .to([ya.querySelector('.btn'), grupoPasos], { opacity: 1, y: 0, duration: 0.8, ease: 'power4.out', stagger: 0.06 }, 1.1);
      // Al salir del hero, las letras se separan a ritmos distintos
      letrasF.forEach((l, i) => {
        const y = -(28 + (i % 3) * 26 + i * 6);
        gsap.to([l, letrasD[i]], { y, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
      });
      gsap.to(marco.querySelector('.marco__fotos'), { yPercent: 10, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
    };
    const fuentes = Promise.all([document.fonts.load('900 100px Neco'), document.fonts.load('700 100px Neco'), document.fonts.load('500 20px "Cabinet Grotesk"')]).then(() => document.fonts.ready);
    Promise.race([fuentes, new Promise((r) => setTimeout(r, 1800))]).then(() => requestAnimationFrame(empezar));
  } else {
    diapos[0].classList.add('is-on');
    Promise.all([document.fonts.load('900 100px Neco')]).then(() => document.fonts.ready).then(preparar);
  }

  // Entradas por bloque
  const grupos = new Map();
  document.querySelectorAll('[data-in]').forEach((el) => {
    const g = el.closest('.indice') || el.parentElement;
    const lista = grupos.get(g) || [];
    lista.push(el);
    grupos.set(g, lista);
  });
  grupos.forEach((lista) => lista.forEach((el, k) => el.style.setProperty('--d', `${k * 0.09}s`)));
  const io = new IntersectionObserver((ents) => ents.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
  }), { rootMargin: '0px 0px -10% 0px' });
  document.querySelectorAll('[data-in]').forEach((el) => io.observe(el));

  // Barra compacta al dejar atrás el hero
  const barra = document.querySelector('.barra');
  const enlacesBarra = barra.querySelectorAll('a, button');
  barra.querySelector('.barra__menu').addEventListener('click', () => { menu.showModal(); });
  new IntersectionObserver(([en]) => {
    const on = !en.isIntersecting && en.boundingClientRect.top < 0;
    barra.classList.toggle('is-on', on);
    barra.setAttribute('aria-hidden', String(!on));
    enlacesBarra.forEach((a) => (a.tabIndex = on ? 0 : -1));
  }).observe(hero);
})();
