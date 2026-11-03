// Genera prototype/direcciones.html: tres direcciones (1a, 1b, 1c) con el hero y dos bloques de la home real.
import fs from 'node:fs';
import { pic, ALT } from './pic.mjs';

const U = 'https://www.morelloclinicadental.com';
const TEL = '<a href="tel:+34934182129">934 182 129</a>';
const DIR = `<a href="https://goo.gl/maps/yKcNHb74snL2" rel="noopener">Carrer de Muntaner, 571 - 2ºC, 08022 Barcelona</a>`;
const SOCIAL = `<a href="https://www.instagram.com/morelloclinicadental/" rel="noopener">Instagram</a><a href="https://www.facebook.com/Morelloclinicadental/" rel="noopener">Facebook</a>`;
const NAV = [
  ['Tratamientos', '/tratamientos/'],
  ['Cita Online', '/cita-online/'],
  ['Equipo Humano', '/equipo/'],
  ['La clínica', '/la-clinica/'],
  ['Contacto', '/contacto/'],
];
const nav = (id) => `<nav class="nav" aria-label="Principal"><ul id="menu-${id}" class="nav-list">${NAV.map(([t, h]) => `<li><a href="${U}${h}">${t}</a></li>`).join('')}<li><a href="${U}/?s=">Buscar</a></li></ul></nav>`;
const menuBtn = (id) => `<button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu-${id}">Menú</button>`;

const H1 = 'Clínica Dental de referencia en Barcelona';
const P1 = 'Morelló Clínica Dental, fundada en el año 1982 por el Dr. Joan Morelló Cubells.';
const P2 = 'Somos una clínica familiar que ha tenido siempre como objetivo principal la profesionalidad y la seriedad con los pacientes, lo que nos ha hecho crecer como una clínica de referencia en Barcelona.';
const ACCESOS = [
  ['Sobre nosotros', 'Más información', '/la-clinica/'],
  ['El equipo', 'Nuestros doctores', '/equipo/'],
  ['Cita online', 'Pida una cita', '/cita-online/'],
];
const ESP_H2 = 'Somos Especialistas';
const ESP_P = 'En Morelló Clínica Dental tenemos una verdadera devoción por la salud bucodental. Nuestros más de 30 años en la clínica de Barcelona lo demuestran.';
const ESP = [
  { id: 'ortodoncia', t: 'Ortodoncia', h: '/tratamientos/ortodoncia/', p: 'En Morelló contamos con los tratamientos de ortodoncia más demandados y con mejores resultados. Ortodoncia lingual, brackets estéticos, cerámicos y ortodoncia invisible Invisalign®.' },
  { id: 'estetica', t: 'Estética dental', h: '/tratamientos/estetica-dental/', p: 'La solución a problemas relacionados con la salud bucal y la armonía estética de la boca en su totalidad. La importancia de lucir una bonita sonrisa natural.' },
  { id: 'odontopediatria', t: 'Odontopediatría', h: '/tratamientos/odontopediatria/', p: 'La <strong>odontopediatría,</strong> también llamada odontología infantil, es la encargada de tratar los dientes de los niños, desde los primeros dientes temporales hasta que finaliza el periodo de recambio dental.' },
];
const verMas = (e) => `<a class="more" href="${U}${e.h}">Ver más<span class="sr"> sobre ${e.t.toLowerCase()}</span></a>`;
const TODOS = `<a class="btn" href="${U}/tratamientos/">Consulte todos los tratamientos que realizamos</a>`;

const intro = (id, name, concept, rows) => `
<header class="opt-head" aria-labelledby="t-${id}">
  <p class="opt-badge" aria-hidden="true">${id}</p>
  <div class="opt-text">
    <h2 class="opt-title" id="t-${id}"><span class="sr">Dirección </span>${id} · ${name}</h2>
    <p class="opt-concept">${concept}</p>
    <dl class="opt-facts">${rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
  </div>
</header>`;

/* ---------- 1a · El arco ---------- */
const d1a = `
<article id="1a" class="opt" aria-labelledby="t-1a">
${intro('1a', 'El arco', 'El arco cian del símbolo Morelló, el mismo que está grabado en el cristal de su recepción, dibuja la web: es el gran campo de color del hero, la esquina curva de cada foto y del botón.', [
  ['Tipografía', 'Jost, geométrica de los años veinte, de la familia del «CLÍNICA DENTAL» del logo. Mayúsculas solo en el titular.'],
  ['Color', 'Blanco de fondo y azul #003B5C en el texto. El cian #05C3DE nunca va como texto: es superficie plana y grande.'],
  ['Imagen', 'Fotos reales con la esquina del arco. Las de stock de tratamientos, dentro del campo cian.'],
  ['Motion', 'El arco entra girando y se asienta; las especialidades cambian de foto con un fundido.'],
])}
<div class="site d1a">
  <p class="opt-chip" aria-hidden="true">1a · El arco</p>
  <div class="bar">
    <a class="logo" href="${U}/"><img src="logo/morello-logo.svg" alt="Morelló Clínica Dental" width="1049" height="333"></a>
    ${nav('1a')}
    <a class="bar-call" href="tel:+34934182129">934 182 129</a>
    ${menuBtn('1a')}
  </div>
  <section class="hero" aria-label="Doctores Morelló" data-reveal>
    <img class="hero-arc" src="logo/morello-simbolo-arco.svg" alt="" width="624" height="443">
    <div class="hero-copy">
      <p class="hero-title" style="--i:0">Doctores Morelló</p>
      <p class="hero-lead" style="--i:1">Excelencia odontológica con un trato cercano</p>
      <p class="hero-actions" style="--i:2"><a class="btn" href="${U}/contacto/">Pida una cita ahora</a></p>
      <p class="hero-second" style="--i:3">${pic('rincon-infantil', ALT['rincon-infantil'], '96px', { cls: 'hero-thumb' })}<span>Sonrisas sanas para toda la familia</span><a href="${U}/tratamientos/">Ver tratamientos</a></p>
    </div>
    ${pic('doctores', ALT.doctores, '(min-width: 900px) 46vw, 100vw', { cls: 'hero-photo arc-corner', eager: true, pos: '46% 30%' })}
    <p class="hero-foot">${DIR}${SOCIAL}</p>
  </section>
  <section class="intro" aria-labelledby="h1-1a" data-reveal>
    <div class="intro-text">
      <h1 id="h1-1a" style="--i:0">${H1}</h1>
      <p class="lead" style="--i:1">${P1}</p>
      <p style="--i:2">${P2}</p>
    </div>
    ${pic('logo-pared', ALT['logo-pared'], '(min-width: 900px) 38vw, 100vw', { cls: 'intro-photo arc-corner', pos: '30% 50%' })}
    <ul class="tiles" role="list">
      <li class="tile tile-photo" style="--i:3"><a class="tile-a" href="${U}${ACCESOS[0][2]}">${pic('recepcion', ALT.recepcion, '(min-width: 900px) 30vw, 100vw')}<h3>${ACCESOS[0][0]}</h3><span class="tile-cta">${ACCESOS[0][1]}</span></a></li>
      <li class="tile tile-photo" style="--i:4"><a class="tile-a" href="${U}${ACCESOS[1][2]}">${pic('doctoras', ALT.doctoras, '(min-width: 900px) 30vw, 100vw', { pos: '50% 35%' })}<h3>${ACCESOS[1][0]}</h3><span class="tile-cta">${ACCESOS[1][1]}</span></a></li>
      <li class="tile tile-field" style="--i:5"><h3>${ACCESOS[2][0]}</h3><a href="${U}${ACCESOS[2][2]}" class="btn">${ACCESOS[2][1]}</a></li>
    </ul>
  </section>
  <section class="esp" aria-labelledby="esp-1a" data-reveal>
    <div class="esp-stage" style="--i:0">
      ${ESP.map((e, i) => pic(e.id, ALT[e.id], '(min-width: 900px) 44vw, 100vw', { cls: `esp-img${i === 0 ? ' is-on' : ''}` }).replace('<picture', `<picture data-panel="${e.id}"`)).join('')}
    </div>
    <div class="esp-body">
      <h2 id="esp-1a" style="--i:1">${ESP_H2}</h2>
      <p style="--i:2">${ESP_P}</p>
      <div class="esp-tabs" role="tablist" aria-label="Especialidades" style="--i:3">
        ${ESP.map((e, i) => `<button role="tab" id="tab-1a-${e.id}" aria-controls="pan-1a-${e.id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-panel="${e.id}">${e.t}</button>`).join('')}
      </div>
      ${ESP.map((e, i) => `<div class="esp-panel" role="tabpanel" id="pan-1a-${e.id}" aria-labelledby="tab-1a-${e.id}"><h3 class="sr">${e.t}</h3><p>${e.p}</p>${verMas(e)}</div>`).join('')}
      <p style="--i:4">${TODOS}</p>
    </div>
  </section>
</div>
</article>`;

/* ---------- 1b · Muntaner 571, 2º C ---------- */
const d1b = `
<article id="1b" class="opt" aria-labelledby="t-1b">
${intro('1b', 'Muntaner 571, 2º C', 'Una visita al piso de la clínica: sus fotos colgadas como copias en una pared, cada una a su tamaño, con el texto pequeño y tranquilo entre ellas.', [
  ['Tipografía', 'Switzer, grotesca suiza, una sola familia a pocos tamaños. Solo el titular de la clínica salta a gran tamaño.'],
  ['Color', 'El gris #F4F4F4 de su web como fondo, azul #003B5C en el texto y el cian solo en el botón de cita, con texto azul.'],
  ['Imagen', 'Las fotos mandan: sin máscaras, a tamaños desiguales, colgadas de una misma línea.'],
  ['Motion', 'La foto principal se abre como un obturador; el resto de copias se asientan al entrar.'],
])}
<div class="site d1b">
  <p class="opt-chip" aria-hidden="true">1b · Muntaner 571, 2º C</p>
  <div class="bar">
    <a class="logo" href="${U}/"><img src="logo/morello-logo.svg" alt="Morelló Clínica Dental" width="1049" height="333"></a>
    ${nav('1b')}
    <a class="btn btn-sm" href="${U}/cita-online/">Cita Online</a>
    ${menuBtn('1b')}
  </div>
  <section class="hero" aria-label="Doctores Morelló" data-reveal>
    <figure class="print print-sq" style="--i:1">${pic('logo-pared', ALT['logo-pared'], '(min-width: 900px) 14vw, 40vw', { pos: '28% 50%' })}</figure>
    <div class="hero-copy" style="--i:2">
      <p class="hero-title">Doctores Morelló</p>
      <p class="hero-lead">Excelencia odontológica con un trato cercano</p>
      <p><a class="btn" href="${U}/contacto/">Pida una cita ahora</a></p>
    </div>
    <figure class="print print-tall" style="--i:0">${pic('doctores', ALT.doctores, '(min-width: 900px) 31vw, 72vw', { cls: 'shutter', eager: true, pos: '47% 30%' })}<figcaption>${TEL}</figcaption></figure>
    <figure class="print print-wide" style="--i:3">${pic('sala-espera', ALT['sala-espera'], '(min-width: 900px) 40vw, 100vw')}<figcaption>${DIR}<span class="social">${SOCIAL}</span></figcaption></figure>
    <p class="hero-second" style="--i:4"><span>Sonrisas sanas para toda la familia</span><a href="${U}/tratamientos/">Ver tratamientos</a></p>
  </section>
  <section class="intro" aria-labelledby="h1-1b" data-reveal>
    <h1 id="h1-1b" style="--i:0">${H1}</h1>
    <div class="intro-cols" style="--i:1"><p>${P1}</p><p>${P2}</p></div>
    <figure class="pano" style="--i:2">${pic('recepcion', ALT.recepcion, '100vw', { pos: '50% 55%' })}</figure>
    <ul class="accesos" role="list">
      <li class="acc acc-a" style="--i:3">${pic('box', ALT.box, '(min-width: 900px) 36vw, 100vw')}<h3>${ACCESOS[0][0]}</h3><a href="${U}${ACCESOS[0][2]}">${ACCESOS[0][1]}</a></li>
      <li class="acc acc-b" style="--i:4">${pic('doctoras', ALT.doctoras, '(min-width: 900px) 22vw, 60vw', { pos: '50% 40%' })}<h3>${ACCESOS[1][0]}</h3><a href="${U}${ACCESOS[1][2]}">${ACCESOS[1][1]}</a></li>
      <li class="acc acc-c" style="--i:5">${pic('higienista', ALT.higienista, '(min-width: 900px) 16vw, 44vw')}<h3>${ACCESOS[2][0]}</h3><a class="btn" href="${U}${ACCESOS[2][2]}">${ACCESOS[2][1]}</a></li>
    </ul>
  </section>
  <section class="esp" aria-labelledby="esp-1b" data-reveal>
    <div class="esp-head" style="--i:0"><h2 id="esp-1b">${ESP_H2}</h2><p>${ESP_P}</p></div>
    ${ESP.map((e, i) => `<article class="esp-item esp-${i}" style="--i:${i + 1}">${pic(e.id, ALT[e.id], '(min-width: 900px) 40vw, 100vw')}<h3><a href="${U}${e.h}">${e.t}</a></h3><p>${e.p}</p>${verMas(e)}</article>`).join('')}
    <p class="esp-all" style="--i:4">${TODOS}</p>
  </section>
</div>
</article>`;

/* ---------- 1c · Casa Morelló ---------- */
const wide = 'Doctores Morelló';
const d1c = `
<article id="1c" class="opt" aria-labelledby="t-1c">
${intro('1c', 'Casa Morelló', 'La clínica de la familia Morelló presentada con la calma de una casa de relojería: campo azul marino, el nombre como una marca ancha y espaciada, pocas palabras y largas pausas.', [
  ['Tipografía', 'Boska, serif de alto contraste con cursiva. Una sola familia, en redonda y cursiva.'],
  ['Color', 'Azul #003B5C como campo, texto blanco, el cian en el botón con texto azul y un papel cian muy claro para la carta de especialidades.'],
  ['Imagen', 'Un retrato centrado como un objeto en vitrina. Las especialidades, en una carta impresa.'],
  ['Motion', 'Las letras del nombre se asientan una a una; la foto de cada especialidad aparece con un fundido lento.'],
])}
<div class="site d1c">
  <p class="opt-chip" aria-hidden="true">1c · Casa Morelló</p>
  <div class="bar">
    <a class="logo" href="${U}/"><img src="logo/morello-logo-negativo.svg" alt="Morelló Clínica Dental" width="1049" height="333"></a>
    ${nav('1c')}
    ${menuBtn('1c')}
  </div>
  <section class="hero" aria-label="Doctores Morelló" data-reveal>
    ${pic('doctores', ALT.doctores, '(min-width: 900px) 28vw, 70vw', { cls: 'hero-photo', eager: true, pos: '47% 30%' })}
    <p class="wordmark" aria-label="${wide}">${[...wide].map((c, i) => `<span aria-hidden="true" style="--l:${i}">${c === ' ' ? '&nbsp;' : c}</span>`).join('')}</p>
    <p class="hero-lead">Excelencia odontológica con un trato cercano</p>
    <p class="hero-row"><span>${TEL}</span><a class="btn" href="${U}/contacto/">Pida una cita ahora</a><span>Muntaner, 571 · 2ºC</span></p>
    <p class="hero-second"><span>Sonrisas sanas para toda la familia</span><a href="${U}/tratamientos/">Ver tratamientos</a></p>
  </section>
  <section class="intro" aria-labelledby="h1-1c" data-reveal>
    <h1 id="h1-1c" style="--i:0"><span>Clínica Dental de referencia</span> <span>en Barcelona</span></h1>
    <div class="intro-text" style="--i:1"><p class="lead">${P1}</p><p>${P2}</p></div>
    <ul class="triptych" role="list">
      ${ACCESOS.map(([t, b, h], i) => `<li style="--i:${i + 2}"><h3>${t}</h3><a href="${U}${h}">${b}</a></li>`).join('')}
    </ul>
  </section>
  <section class="esp" aria-labelledby="esp-1c" data-reveal>
    <div class="esp-photo" style="--i:0">
      ${ESP.map((e, i) => pic(e.id, ALT[e.id], '(min-width: 900px) 34vw, 100vw', { cls: `esp-img${i === 0 ? ' is-on' : ''}` }).replace('<picture', `<picture data-panel="${e.id}"`)).join('')}
    </div>
    <div class="carta" style="--i:1">
      <h2 id="esp-1c">${ESP_H2}</h2>
      <p class="carta-intro">${ESP_P}</p>
      <ul role="list">
        ${ESP.map((e) => `<li data-panel="${e.id}"><h3><a href="${U}${e.h}"><span>${e.t}</span><span class="leader" aria-hidden="true"></span><span class="val">Ver más</span></a></h3><p>${e.p}</p></li>`).join('')}
      </ul>
      <p class="carta-all">${TODOS}</p>
    </div>
  </section>
</div>
</article>`;

const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Direcciones de arte · Morelló Clínica Dental</title>
<meta name="robots" content="noindex">
<meta name="description" content="Tres direcciones de arte para el rediseño de la home de Morelló Clínica Dental.">
<link rel="icon" href="logo/morello-simbolo.svg" type="image/svg+xml">
<link rel="stylesheet" href="direcciones.css">
<script>document.documentElement.classList.add('js');setTimeout(function(){if(!window.__dirOK)document.documentElement.classList.add('reveal-all')},2500)</script>
</head>
<body>
<a class="skip" href="#1a">Saltar a las direcciones</a>
<header class="deck">
  <p class="deck-title">Morelló Clínica Dental · Rediseño de la home</p>
  <p class="deck-sub">Ronda 1: tres direcciones de arte con el contenido real de su web. Mismo logo, mismos colores, mismos textos; cambian la tipografía, la composición, el uso del color, la imagen y el movimiento.</p>
  <nav class="deck-nav" aria-label="Direcciones"><a href="#1a">1a · El arco</a><a href="#1b">1b · Muntaner 571, 2º C</a><a href="#1c">1c · Casa Morelló</a></nav>
</header>
<main>
<section class="turn" aria-label="Ronda 1">
${d1a}
${d1b}
${d1c}
</section>
</main>
<footer class="deck-foot"><p>Prototipo de propuesta. Textos, fotos, logo y colores de morelloclinicadental.com. El logo se ha vectorizado a partir del PNG de la web.</p></footer>
<script src="direcciones.js" defer></script>
</body>
</html>
`;
fs.writeFileSync(new URL('../prototype/direcciones.html', import.meta.url), html);
console.log('prototype/direcciones.html', html.length);
