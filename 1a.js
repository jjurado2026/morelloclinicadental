(() => {
  const doc = document.documentElement;
  doc.classList.add('js');
  const quieto = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Horario real de la clínica (página de contacto), en hora de Barcelona
  const HORARIO = { 1: [[10, 14], [16, 20]], 2: [[10, 14]], 3: [[9, 14], [16, 20]], 4: [[16, 20]], 5: [[10, 14]] };
  const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  function estado() {
    const ahora = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Madrid' }));
    const d = ahora.getDay(), h = ahora.getHours() + ahora.getMinutes() / 60;
    const tramo = (HORARIO[d] || []).find(([a, b]) => h >= a && h < b);
    if (tramo) return { abierto: true, corto: `Abierto, hasta las ${tramo[1]} h`, largo: `Abierto ahora, hasta las ${tramo[1]} h.`, hoy: d };
    for (let k = 0; k < 8; k++) {
      const dd = (d + k) % 7;
      const sig = (HORARIO[dd] || []).find(([a]) => k > 0 || a > h);
      if (sig) {
        const cuando = k === 0 ? 'hoy' : k === 1 ? 'mañana' : `el ${DIAS[dd]}`;
        return { abierto: false, corto: `Cerrado, abre ${cuando} a las ${sig[0]} h`, largo: `Ahora cerrado. Abre ${cuando} a las ${sig[0]} h.`, hoy: d };
      }
    }
  }
  const e = estado();
  document.querySelectorAll('[data-estado]').forEach((n) => { n.textContent = e.corto; n.classList.toggle('is-abierto', e.abierto); });
  document.querySelectorAll('[data-estado-largo]').forEach((n) => { n.textContent = e.largo; });
  document.querySelector(`.semana [data-dia="${e.hoy}"]`)?.classList.add('is-hoy');

  // Grano fino
  try {
    const g = document.createElement('canvas'); g.width = g.height = 180;
    const cx = g.getContext('2d'); const im = cx.createImageData(180, 180);
    for (let k = 0; k < im.data.length; k += 4) { const v = 150 + Math.random() * 105; im.data[k] = im.data[k + 1] = im.data[k + 2] = v; im.data[k + 3] = 255; }
    cx.putImageData(im, 0, 0);
    document.querySelector('.grano').style.backgroundImage = `url(${g.toDataURL()})`;
  } catch (err) { /* sin grano */ }

  // Menú móvil
  const menu = document.getElementById('menu');
  const abrir = document.querySelector('.cab__menu');
  abrir.addEventListener('click', () => { menu.showModal(); abrir.setAttribute('aria-expanded', 'true'); });
  menu.querySelector('.menu__cerrar').addEventListener('click', () => menu.close());
  menu.addEventListener('close', () => abrir.setAttribute('aria-expanded', 'false'));

  // Hero: pasa solo, se pausa con el ratón o el foco
  const hero = document.querySelector('.hero');
  const diapos = [...hero.querySelectorAll('.diapo')];
  const fotos = [...hero.querySelectorAll('.hero__img')];
  const pasos = [...hero.querySelectorAll('.paso')];
  const texto = hero.querySelector('.hero__texto');
  let actual = 0;
  function ir(n) {
    if (n === actual) return;
    const antes = diapos[actual];
    antes.classList.replace('is-on', 'is-saliendo');
    antes.setAttribute('aria-hidden', 'true');
    antes.querySelectorAll('a').forEach((a) => (a.tabIndex = -1));
    setTimeout(() => antes.classList.remove('is-saliendo'), 760);
    fotos[actual].classList.remove('is-on');
    pasos[actual].classList.remove('is-on');
    pasos[actual].removeAttribute('aria-current');
    actual = n;
    const ya = diapos[n];
    ya.classList.add('is-on');
    ya.removeAttribute('aria-hidden');
    ya.querySelectorAll('a').forEach((a) => a.removeAttribute('tabindex'));
    fotos[n].classList.add('is-on');
    void pasos[n].offsetWidth;
    pasos[n].classList.add('is-on');
    pasos[n].setAttribute('aria-current', 'true');
    luz.pulso = 1;
  }
  pasos.forEach((p, n) => {
    p.addEventListener('click', () => { hero.classList.remove('is-auto'); texto.setAttribute('aria-live', 'polite'); ir(n); });
    p.querySelector('span').addEventListener('animationend', () => ir((actual + 1) % diapos.length));
  });
  if (!quieto) hero.classList.add('is-auto');
  const listo = () => requestAnimationFrame(() => requestAnimationFrame(() => hero.classList.add('is-listo')));
  Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 900))]).then(listo);
  const pausa = (on) => hero.classList.toggle('is-pausa', on);
  const zona = [texto];
  zona.forEach((z) => {
    z.addEventListener('mouseenter', () => pausa(true));
    z.addEventListener('mouseleave', () => pausa(hero.contains(document.activeElement)));
  });
  hero.addEventListener('focusin', () => pausa(true));
  hero.addEventListener('focusout', (ev) => { if (!hero.contains(ev.relatedTarget)) pausa(zona.some((z) => z.matches(':hover'))); });
  new IntersectionObserver(([en]) => hero.classList.toggle('is-fuera', !en.isIntersecting)).observe(hero);

  // Entradas: titular, texto y fotos, escalonados
  const grupos = new Map();
  document.querySelectorAll('[data-in]').forEach((el) => {
    const g = el.parentElement.closest('.accesos, .ref__cab') || el.parentElement;
    const lista = grupos.get(g) || [];
    lista.push(el);
    grupos.set(g, lista);
  });
  grupos.forEach((lista) => lista.forEach((el, k) => el.style.setProperty('--d', `${k * 0.09}s`)));
  const io = new IntersectionObserver((ents) => ents.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
  }), { rootMargin: '0px 0px -12% 0px' });
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

  // Scroll suave
  let lenis = null;
  if (!quieto && window.Lenis) lenis = new window.Lenis({ lerp: 0.085, smoothWheel: true });

  // Luz de las copas de Muntaner entrando por la ventana
  const luz = { pulso: 0 };
  const cv = document.querySelector('.luz');
  const gl = cv.getContext('webgl', { antialias: false, alpha: false, premultipliedAlpha: false, powerPreference: 'low-power' });
  if (!gl) return loop(null);
  const VS = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
  const FS = `precision mediump float;
uniform vec2 R;uniform vec4 F1,F2;uniform float T,S,Y,G,P,D;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
vec2 h2(vec2 p){return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float s=0.,a=.5;for(int i=0;i<4;i++){s+=a*n(p);p=mat2(1.6,1.2,-1.2,1.6)*p+vec2(7.3,2.1);a*=.5;}return s;}
float cel(vec2 p,float t){vec2 i=floor(p),f=fract(p);float md=1.;for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){vec2 g=vec2(float(x),float(y));vec2 o=h2(i+g);o=.5+.38*sin(t+6.2831*o);vec2 r=g+o-f;md=min(md,dot(r,r));}return sqrt(md);}
float caja(vec2 p,vec4 b){return step(b.x,p.x)*step(p.x,b.z)*step(b.y,p.y)*step(p.y,b.w);}
void main(){
  vec2 px=gl_FragCoord.xy;
  vec2 uv=px/R.y;float asp=R.x/R.y;
  // el sol avanza con la hora real y con el scroll: inclinación y calidez
  float dia=clamp(D+Y*.22,0.,1.);
  float incl=mix(.95,-.55,dia);
  vec2 w=vec2(uv.x-asp*.5,uv.y-.5)-vec2(-.10*asp+Y*.10,.02-Y*.30);
  w.x+=w.y*incl;
  vec2 d=abs(w)-vec2(asp*.36,.66);
  float win=1.-smoothstep(-.02,.02,max(d.x,d.y));
  float foto=max(caja(px,F1),caja(px,F2));
  float mull=mix(smoothstep(.010,.020,abs(w.x-asp*.02))*smoothstep(.008,.018,abs(w.y+.16)),1.,foto);
  float g=1.+G*2.5;
  vec2 q=uv*1.7+vec2(0.,Y*.5);
  q+=.035*g*vec2(sin(T*.41+q.y*2.1),cos(T*.33+q.x*1.6));
  vec2 wv=vec2(fbm(q*.8+vec2(T*.02,0.)),fbm(q*.8+vec2(3.1,-T*.017)));
  float ramas=fbm(q*1.1+wv*1.5)+.05*(n(q*14.+wv*5.+T*.8)-.5)*g;
  float lejos=1.-smoothstep(.40,.43,ramas);
  vec2 qr=mat2(.82,-.57,.57,.82)*q;
  float r=.13+.11*n(q*2.3+T*.05);
  float motas=(1.-smoothstep(r,r+.06,cel(qr*vec2(8.,4.6)+wv*2.2,T*.5)))*smoothstep(.2,.5,n(q*3.1-T*.04));
  float cerca=smoothstep(.585,.6,fbm(q*.62+wv*.8+vec2(5.,1.)+vec2(T*.03,0.))+.045*(n(q*10.+wv*3.+vec2(T*.7,-T*.5))-.5)*g);
  float L=1.;
  L=mix(L,.22,lejos*(1.-motas));
  L=mix(L,0.,cerca*(1.-P*.6));
  L*=win*mull;
  L=min(1.,L+P*.3*win);
  vec3 sol=mix(vec3(.80,.79,.75),vec3(.84,.79,.69),abs(dia-.5)*2.);
  vec3 sombra=vec3(.33,.37,.43);
  vec3 col=mix(sombra,sol,L);
  col=mix(vec3(.43,.455,.49),col,win);
  float s=S*mix(1.,.45,foto);
  gl_FragColor=vec4(mix(vec3(.5),col,s),1.);
}`;
  const sh = (t, s) => { const o = gl.createShader(t); gl.shaderSource(o, s); gl.compileShader(o); return o; };
  const pr = gl.createProgram();
  gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS));
  gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS));
  gl.linkProgram(pr);
  if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return loop(null);
  gl.useProgram(pr);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(pr, 'p');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const U = {};
  ['R', 'F1', 'F2', 'T', 'S', 'Y', 'G', 'P', 'D'].forEach((k) => (U[k] = gl.getUniformLocation(pr, k)));
  const fotosPersona = [...document.querySelectorAll('.acceso__foto')];
  const hora = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Madrid' }));
  const hh = hora.getHours() + hora.getMinutes() / 60;
  gl.uniform1f(U.D, hh < 8 || hh > 20 ? 0.85 : (hh - 8) / 12);
  const ESCALA = 0.5;
  function medir() {
    cv.width = Math.max(1, Math.round(innerWidth * ESCALA));
    cv.height = Math.max(1, Math.round(innerHeight * ESCALA));
    gl.viewport(0, 0, cv.width, cv.height);
    gl.uniform2f(U.R, cv.width, cv.height);
  }
  medir();
  addEventListener('resize', () => { medir(); if (quieto) pintar(0); });
  const ref = document.querySelector('.ref');
  let racha = 0, ultimoY = scrollY;
  function pintar(t) {
    const y = scrollY / innerHeight;
    const v = Math.abs(scrollY - ultimoY); ultimoY = scrollY;
    racha += (Math.min(v / 40, 1) - racha) * 0.05;
    luz.pulso *= 0.96;
    const fin = ref.getBoundingClientRect().bottom / innerHeight;
    const s = Math.max(0, Math.min(1, 1 - y * 0.28)) * Math.min(1, Math.max(0, fin));
    ['F1', 'F2'].forEach((k, n) => {
      const b = fotosPersona[n].getBoundingClientRect();
      gl.uniform4f(U[k], b.left * ESCALA, (innerHeight - b.bottom) * ESCALA, b.right * ESCALA, (innerHeight - b.top) * ESCALA);
    });
    gl.uniform1f(U.T, t * 0.001);
    gl.uniform1f(U.S, quieto ? 0.85 : 0.6 + 0.4 * s);
    gl.uniform1f(U.Y, quieto ? 0 : y);
    gl.uniform1f(U.G, quieto ? 0 : racha);
    gl.uniform1f(U.P, quieto ? 0 : luz.pulso);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
  cv.classList.add('is-on');
  if (quieto) { pintar(12000); return; }
  loop(pintar);

  function loop(fn) {
    let cuadro = 0;
    function f(t) {
      lenis?.raf(t);
      cuadro++;
      if (fn && !document.hidden && (racha > 0.02 || luz.pulso > 0.02 || cuadro % 2 === 0)) fn(t);
      requestAnimationFrame(f);
    }
    requestAnimationFrame(f);
  }
})();
