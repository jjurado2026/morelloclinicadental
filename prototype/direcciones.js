(() => {
  window.__dirOK = true;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');

  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.06 });
  document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));

  document.querySelectorAll('.menu-btn').forEach((btn) => btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') !== 'true';
    btn.setAttribute('aria-expanded', String(open));
    btn.closest('.bar').classList.toggle('is-open', open);
  }));

  // 1a: especialidades como pestañas (flechas, Inicio y Fin)
  document.querySelectorAll('.esp-tabs').forEach((list) => {
    const tabs = [...list.querySelectorAll('[role="tab"]')];
    const sec = list.closest('.esp');
    const select = (tab, focus) => {
      for (const t of tabs) {
        const on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        sec.querySelector('#' + t.getAttribute('aria-controls')).hidden = !on;
      }
      sec.querySelectorAll('.esp-img').forEach((p) => p.classList.toggle('is-on', p.dataset.panel === tab.dataset.panel));
      if (focus) tab.focus();
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => select(t));
      t.addEventListener('keydown', (e) => {
        const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
        let next = null;
        if (step) next = tabs[(i + step + tabs.length) % tabs.length];
        if (e.key === 'Home') next = tabs[0];
        if (e.key === 'End') next = tabs[tabs.length - 1];
        if (next) { e.preventDefault(); select(next, true); }
      });
    });
    select(tabs.find((t) => t.getAttribute('aria-selected') === 'true') || tabs[0]);
  });

  // 1c: la foto de la carta sigue a la especialidad señalada
  document.querySelectorAll('.carta li[data-panel]').forEach((li) => {
    const show = () => li.closest('.esp').querySelectorAll('.esp-img').forEach((p) => p.classList.toggle('is-on', p.dataset.panel === li.dataset.panel));
    li.addEventListener('mouseenter', show);
    li.addEventListener('focusin', show);
  });

  // 1b: la panorámica se desplaza un poco más despacio que la página
  const panos = [...document.querySelectorAll('.pano img')];
  if (panos.length && !reduced.matches) {
    let queued = false;
    const update = () => {
      queued = false;
      const vh = innerHeight;
      for (const img of panos) {
        const r = img.parentElement.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) continue;
        const p = (r.top + r.height / 2 - vh / 2) / vh;
        img.style.transform = `translate3d(0, ${(p * -7).toFixed(2)}%, 0) scale(1.16)`;
      }
    };
    addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }
})();
