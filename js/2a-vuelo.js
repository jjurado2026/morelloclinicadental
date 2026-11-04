// Motor de vuelo 3D por scroll (skill vuelo-3d). Sin dependencias: Three.js se pasa como primer argumento.
//
//   vuelo(THREE, {
//     canvas,            <canvas> fijo a pantalla completa
//     track,             elemento cuya altura menos la ventana es el recorrido completo (por defecto <main>)
//     keys,              [[p, [x, y, z] cámara, [x, y, z] mira], …] con p de 0 a 1, en orden
//     portrait,          { p: [cámara, mira] } sustituciones de keys en pantallas verticales
//     stops,             [{ section, p }] paradas: su sección y el progreso que se muestra con reduced-motion
//     nav,               contenedor con enlaces a las secciones (#id); el de la parada activa lleva aria-current="step"
//     fade,              selector del texto que se funde en los bordes de la pantalla (por defecto '.copy > *')
//     shift,             centro óptico desplazado en horizontal en pantallas anchas; negativo = motivo a la derecha
//     stiffness,         rigidez del muelle de la cámara
//     paused,            () => true mientras el vuelo está fuera de pantalla: no se pinta (añadido en 2a)
//     build,             ({ THREE, renderer, scene, camera, fine }) => ({ update(p, reduce), tick(dt, p, reduce) })
//   })
//
// build monta la escena (luces, entorno, mundo). update coloca el mundo para el progreso p. tick anima lo que
// se mueve sin scroll y devuelve true si ha cambiado algo. El motor solo pinta cuando algo cambia.
// Devuelve { renderer, scene, camera }, o null sin WebGL (y añade .no-webgl a <html>).

export function vuelo(THREE, o) {
  const root = document.documentElement;
  const track = o.track || document.querySelector('main');
  const reduceMQ = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));

  // El texto se funde al cruzar los bordes para no pisar la cabecera ni la navegación.
  // En JS porque las animaciones CSS ligadas a view() se estiran con position: sticky.
  const lines = [...document.querySelectorAll(o.fade || '.copy > *')];
  let fading = false;
  const fadeCopy = () => {
    fading = false;
    const vh = innerHeight;
    for (const el of lines) {
      const { top, bottom } = el.getBoundingClientRect();
      const a = Math.min(1, Math.max(0, (top - vh * 0.06) / (vh * 0.1)), Math.max(0, (vh - bottom + vh * 0.04) / (vh * 0.14)));
      el.style.opacity = a > 0.995 ? '' : a.toFixed(3);
    }
  };
  addEventListener('scroll', () => { if (!fading) { fading = true; requestAnimationFrame(fadeCopy); } }, { passive: true });
  addEventListener('resize', fadeCopy);
  fadeCopy();

  const stops = o.stops || [];
  const links = stops.map(s => (o.nav ? [...o.nav.querySelectorAll(`a[href="#${s.section.id}"]`)] : []));
  let active = -1;
  const activeStop = () => {
    let i = 0;
    stops.forEach((s, k) => { if (s.section.getBoundingClientRect().top <= innerHeight * 0.5) i = k; });
    return i;
  };

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: o.canvas, antialias: true, powerPreference: 'high-performance' });
  } catch {
    root.classList.add('no-webgl');
    return null;
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio, fine ? 1.75 : 1.5));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.NeutralToneMapping ?? THREE.ACESFilmicToneMapping;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, o.near ?? 0.5, 1000);
  const world = o.build({ THREE, renderer, scene, camera, fine }) || {};

  const K = o.keys;
  let posC, tgtC, vertical = null;
  const path = v => {
    const k = K.map(([p, a, b]) => (v && o.portrait?.[p] ? [p, ...o.portrait[p]] : [p, a, b]));
    posC = new THREE.CatmullRomCurve3(k.map(x => new THREE.Vector3(...x[1])), false, 'centripetal');
    tgtC = new THREE.CatmullRomCurve3(k.map(x => new THREE.Vector3(...x[2])), false, 'centripetal');
  };
  // Cada key cae en su p exacto: el tramo entre dos keys se recorre en proporción al scroll
  const keyU = p => {
    let i = 0;
    while (i < K.length - 2 && p > K[i + 1][0]) i++;
    return (i + clamp((p - K[i][0]) / (K[i + 1][0] - K[i][0]))) / (K.length - 1);
  };

  let reduce = reduceMQ.matches, pTarget = 0, dirty = true, ready = false, last = performance.now(), lastW = 0, lastH = 0;
  const s = { x: 0, v: 0 }, ptr = { x: 0, y: 0, tx: 0, ty: 0 };
  const pos = new THREE.Vector3(), tgt = new THREE.Vector3(), side = new THREE.Vector3();

  // Muelle críticamente amortiguado: arranca y frena sin tirones ni rebote
  const step = (target, dt, w) => {
    const f = 1 + 2 * dt * w, hoo = dt * w * w, hhoo = dt * hoo, inv = 1 / (f + hhoo);
    const x = (f * s.x + dt * s.v + hhoo * target) * inv;
    s.v = (s.v + hoo * (target - s.x)) * inv;
    s.x = x;
  };

  function place(p) {
    const u = keyU(p);
    posC.getPoint(u, pos);
    tgtC.getPoint(u, tgt);
    if (ptr.x || ptr.y) {
      const d = pos.distanceTo(tgt) * 0.014;
      side.subVectors(tgt, pos).cross(camera.up).normalize();
      pos.addScaledVector(side, ptr.x * d).addScaledVector(camera.up, -ptr.y * d * 0.6);
    }
    camera.position.copy(pos);
    camera.lookAt(tgt);
    world.update?.(p, reduce);
    root.style.setProperty('--p', p.toFixed(4));
  }

  function fit() {
    const w = o.canvas.clientWidth, h = o.canvas.clientHeight;
    // En el móvil, la barra del navegador cambia la altura al hacer scroll: eso no recoloca nada
    if (w === lastW && (fine ? h === lastH : Math.abs(h - lastH) < 160)) return;
    lastW = w;
    lastH = h;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = camera.aspect < 0.9 ? 58 : camera.aspect < 1.3 ? 46 : 38;
    if (vertical !== camera.aspect < 0.9) { vertical = camera.aspect < 0.9; path(vertical); }
    const shift = camera.aspect > 1.15 ? (o.shift ?? -0.11) : 0;
    camera.filmOffset = shift * camera.getFilmWidth() * camera.aspect * 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    camera.updateProjectionMatrix();
    readScroll();
  }

  function readScroll() {
    pTarget = clamp(scrollY / Math.max(1, track.offsetHeight - innerHeight));
    const a = stops.length ? activeStop() : -1;
    if (a !== active) {
      active = a;
      links.forEach((ls, i) => ls.forEach(l => (i === a ? l.setAttribute('aria-current', 'step') : l.removeAttribute('aria-current'))));
    }
    dirty = true;
  }

  // Con reduced-motion la cámara salta a la parada activa: la misma información, sin desplazamiento
  const snapped = () => (stops.length ? stops[Math.max(0, active)].p : pTarget);

  function frame(now) {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    if (o.paused?.()) { dirty = true; requestAnimationFrame(frame); return; }
    let moving = false;
    if (reduce) {
      const t = snapped();
      if (t !== s.x) { s.x = t; s.v = 0; moving = true; }
    } else {
      step(pTarget, dt, o.stiffness ?? 5.5);
      if (Math.abs(s.x - pTarget) > 1e-5 || Math.abs(s.v) > 1e-5) moving = true;
      else { s.x = pTarget; s.v = 0; }
    }
    if (fine && !reduce) {
      const k = 1 - Math.exp(-dt * 2.5);
      ptr.x += (ptr.tx - ptr.x) * k;
      ptr.y += (ptr.ty - ptr.y) * k;
      if (Math.abs(ptr.tx - ptr.x) + Math.abs(ptr.ty - ptr.y) > 1e-4) moving = true;
    }
    const p = clamp(s.x);
    if (world.tick?.(dt, p, reduce)) moving = true;
    if (moving || dirty) {
      place(p);
      renderer.render(scene, camera);
      dirty = false;
      if (!ready) { ready = true; root.classList.add('is-ready'); }
    }
    requestAnimationFrame(frame);
  }

  addEventListener('scroll', readScroll, { passive: true });
  addEventListener('resize', fit);
  reduceMQ.addEventListener('change', e => { reduce = e.matches; ptr.tx = ptr.ty = 0; dirty = true; });
  if (fine) addEventListener('pointermove', e => { ptr.tx = (e.clientX / innerWidth) * 2 - 1; ptr.ty = (e.clientY / innerHeight) * 2 - 1; }, { passive: true });
  fit();
  s.x = reduce ? snapped() : pTarget;
  requestAnimationFrame(frame);
  return { renderer, scene, camera };
}
