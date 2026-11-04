// 2a «La visita»: Muntaner 571 a la hora azul. La calle con sus plátanos, el 2º C a la altura de las copas,
// la sala de espera y el gabinete. Geometría en código; la luz cálida de la clínica es lo único encendido.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
import { vuelo } from './2a-vuelo.js?v=4';

const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const ramp = (a, b, x) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); };
const lerp = (a, b, t) => a + (b - a) * t;
let seed = 571;
const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

const NOISE = `
vec3 m289(vec3 x){return x-floor(x*(1./289.))*289.;}vec4 m289(vec4 x){return x-floor(x*(1./289.))*289.;}
vec4 perm(vec4 x){return m289(((x*34.)+1.)*x);}vec4 tis(vec4 r){return 1.79284291400159-.85373472095314*r;}
float snoise(vec3 v){const vec2 C=vec2(1./6.,1./3.);const vec4 D=vec4(0.,.5,1.,2.);vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
i=m289(i);vec4 p=perm(perm(perm(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
float n_=.142857142857;vec3 ns=n_*D.wyz-D.xzx;vec4 j=p-49.*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.*x_);
vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.-abs(x)-abs(y);vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
vec4 s0=floor(b0)*2.+1.;vec4 s1=floor(b1)*2.+1.;vec4 sh=-step(h,vec4(0.));vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
vec4 norm=tis(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);m=m*m;
return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));}
`;

const F = 7.95;            // suelo del 2º
const FL = [0, 4.6, 7.7, 10.8, 13.9, 17.0, 20.1, 23.2]; // forjados
const BAYS = [-13.25, -7.95, -2.65, 2.65, 7.95, 13.25];
const WIN = { w: 3.0, sill: 0.85, head: 2.45 };

export function mundo({ canvas, nav, track, sections, paused }) {
  const vh = innerHeight;
  const top0 = track.getBoundingClientRect().top + scrollY;
  const H = Math.max(1, track.offsetHeight - vh);
  const T = sections.map(s => {
    const t = s.getBoundingClientRect().top + scrollY - top0;
    return { a: clamp(t / H), b: clamp((t + s.offsetHeight - vh) / H) };
  });
  const mid = (i, f) => lerp(T[i].b, T[i + 1].a, f);

  const P = {
    calleA: [[10, 1.7, 18.6], [-3, 8.6, 0]],
    calleB: [[8.8, 2.3, 18.0], [-3, 8.9, 0]],
    sube: [[4.5, 6.4, 12.5], [-2.4, 8.9, 0]],
    pisoA: [[-0.2, 9.35, 7.4], [-2.65, 9.15, 0]],
    pisoB: [[-1.1, 9.28, 5.2], [-2.65, 9.2, 0]],
    aleja: [[-9, 11.8, 15], [0.5, 8.8, -1]],
    finA: [[-30, 16.5, 31], [2.5, 8.2, -2]],
    finB: [[-33, 17.5, 33], [2.0, 8.4, -2]],
  };
  const keys = [
    [T[0].a, ...P.calleA], [T[0].b, ...P.calleB],
    [mid(0, 0.55), ...P.sube],
    [T[1].a, ...P.pisoA], [T[1].b, ...P.pisoB],
    [mid(1, 0.5), ...P.aleja],
    [T[2].a, ...P.finA], [1, ...P.finB],
  ];
  // En vertical: calle y plano final más altos y lejanos para que el edificio quede encima del texto
  const portrait = {
    [T[0].a]: [[-3.2, 2.4, 24], [0.2, 10.5, 0]],
    [T[0].b]: [[-2.6, 3.2, 23], [0.0, 11, 0]],
    [T[1].a]: [[-1.4, 9.0, 9.2], [-2.65, 10.6, 0]],
    [T[1].b]: [[-1.8, 9.1, 7.6], [-2.65, 10.6, 0]],
    [T[2].a]: [[-12, 15, 30], [0, 13.5, 0]],
    1: [[-13, 15.6, 31], [0, 14, 0]],
  };


  return vuelo(THREE, {
    canvas, nav, track, paused, near: 0.12, stiffness: 6.5, shift: -0.12,
    stops: sections.map((s, i) => ({ section: s, p: T[i].a })),
    keys, portrait,
    build: ctx => build(ctx, T),
  });
}

function build({ renderer, scene, camera, fine }, T) {
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const C = {
    zenith: '#020f1c', horizon: '#0d3b55', fog: 0x0c3a52,
    facade: 0x1a3f66, band: 0x56799f, frame: 0xd7e6ec, glass: 0x061a28, slat: 0x9fbac8,
    asphalt: 0x0b2131, walk: 0x6d8796, kerb: 0x9cb3bf,
    leaf: 0x0c4150, leaf2: 0x2b8a8c, bark: 0x7f98a0,
    wall: 0xeef2f3, ceil: 0xf4f6f6, white: 0xf6f8f8,
    chair: 0x2a7477, wood: 0xd5b289, dental: 0x83aac6, navy: 0x003b5c, cyan: 0x05c3de,
    warm: 0xffe3b8, warm2: 0xffcf8f,
  };
  scene.background = skyTexture(C.zenith, C.horizon);
  scene.environment = envMap();
  scene.fog = new THREE.FogExp2(C.fog, 0.021);

  const hemi = new THREE.HemisphereLight(0x3d6f9e, 0x04121f, 0.38);
  scene.add(hemi);
  const moon = new THREE.DirectionalLight(0xb4dcf5, 0.55);
  moon.position.set(-34, 42, 38);
  moon.target.position.set(2, 4, 0);
  moon.castShadow = true;
  moon.shadow.mapSize.setScalar(fine ? 2048 : 1024);
  Object.assign(moon.shadow.camera, { left: -34, right: 34, top: 30, bottom: -14, near: 10, far: 130 });
  moon.shadow.camera.updateProjectionMatrix();
  moon.shadow.bias = -0.0004;
  moon.shadow.normalBias = 0.05;
  scene.add(moon, moon.target);

  const std = (color, roughness = 0.9, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness, metalness: 0, envMapIntensity: 0.18, ...extra });
  const M = {
    facade: std(C.facade, 0.92, { envMapIntensity: 0.2 }), band: std(C.band, 0.85), frame: std(C.frame, 0.5), sill: std(C.band, 0.8),
    glass: std(C.glass, 0.06, { metalness: 0.7, envMapIntensity: 1.4 }), dark: new THREE.MeshBasicMaterial({ color: 0x03121d }),
    slat: std(C.slat, 0.75, { map: slatTexture('#a9c3cf', '#6d8fa1') }),
    shutter: std(0x8da7b4, 0.6, { map: slatTexture('#9fb6c2', '#6f8794', 22), metalness: 0.2 }),
    lit: new THREE.MeshBasicMaterial({ color: C.warm }),
    lit2: new THREE.MeshBasicMaterial({ color: 0xc99a62 }),
    lit3: new THREE.MeshBasicMaterial({ color: 0x9a7650 }),
    asphalt: std(C.asphalt, 0.2, { metalness: 0.4, envMapIntensity: 0.9 }),
    walk: std(0xffffff, 0.85, { map: panotTexture(renderer) }),
    kerb: std(C.kerb, 0.7), paint: std(0xcfdde4, 0.6),
    leaf: std(0xffffff, 0.82, { envMapIntensity: 0.3, emissive: new THREE.Color(0x05222b) }), bark: std(0xffffff, 0.85, { map: barkTexture() }), pit: std(0x0a1f2c, 1),
    pole: std(0x3f5f72, 0.5, { metalness: 0.5 }),
    wall: std(C.wall, 0.95, { envMapIntensity: 0.5 }), ceil: std(C.ceil, 1, { envMapIntensity: 0.5 }), floor: std(0xffffff, 0.62, { map: parquetTexture(renderer) }),
    white: std(C.white, 0.55), chair: std(C.chair, 0.45), wood: std(C.wood, 0.7), metal: std(0x23313a, 0.4, { metalness: 0.7 }),
    dental: std(C.dental, 0.45), navy: std(C.navy, 0.6), cyan: std(C.cyan, 0.4, { emissive: new THREE.Color(C.cyan), emissiveIntensity: 0.35 }),
    cactus: std(0x2f6f5b, 0.8), basket: std(0xb7925f, 0.95), screen: new THREE.MeshBasicMaterial({ color: 0xbfe6f5 }),
    glow: new THREE.MeshBasicMaterial({ color: 0xfff6e8 }),
  };
  const glowTex = glowTexture();
  const sprite = (color, s, pos, o = 1) => {
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: o, fog: true }));
    sp.scale.set(s, s, 1);
    sp.position.set(...pos);
    scene.add(sp);
    return sp;
  };

  const add = (geo, mat, parent = scene, shadow = true) => {
    const m = new THREE.Mesh(geo, mat);
    m.castShadow = shadow; m.receiveShadow = true;
    parent.add(m);
    return m;
  };
  const bucket = {};
  const put = (key, geo) => (bucket[key] ||= []).push(geo);
  const boxG = (w, h, d, x, y, z, r = 0) => {
    const g = r ? new RoundedBoxGeometry(w, h, d, 2, r) : new THREE.BoxGeometry(w, h, d);
    g.translate(x, y, z);
    return g;
  };

  // ---------- Calle: calzada brillante, aceras de panot, bordillos, paso de cebra
  add(boxG(260, 0.1, 12, 0, -0.05, 10.5), M.asphalt, scene, false);
  const walkA = add(boxG(260, 0.16, 4.5, 0, 0.08, 2.25), M.walk, scene, false);
  const walkB = add(boxG(260, 0.16, 4.5, 0, 0.08, 18.75), M.walk, scene, false);
  M.walk.map.repeat.set(325, 5.6);
  put('kerb', boxG(260, 0.17, 0.22, 0, 0.085, 4.5));
  put('kerb', boxG(260, 0.17, 0.22, 0, 0.085, 16.5));
  for (let i = 0; i < 7; i++) put('paint', boxG(0.55, 0.012, 7.4, -12.6 + i * 1.05, 0.006, 10.5));
  for (let x = -120; x < 120; x += 6) put('paint', boxG(3, 0.012, 0.14, x, 0.006, 10.5));
  add(boxG(400, 0.05, 400, 0, -0.14, 0), M.pit, scene, false);
  walkA.castShadow = walkB.castShadow = false;

  // ---------- Fachada de Muntaner 571: forjados marcados, huecos con persiana, balcones
  const facade = new THREE.Shape([new THREE.Vector2(-16, 0), new THREE.Vector2(16, 0), new THREE.Vector2(16, 23.2), new THREE.Vector2(-16, 23.2)]);
  const openings = [];
  const hole = (x, y, w, h) => {
    facade.holes.push(new THREE.Path([new THREE.Vector2(x - w / 2, y), new THREE.Vector2(x - w / 2, y + h), new THREE.Vector2(x + w / 2, y + h), new THREE.Vector2(x + w / 2, y)]));
    openings.push({ x, y, w, h });
  };
  // planta baja: portal y dos locales con persiana metálica
  hole(-7.95, 0.16, 2.4, 3.3);
  hole(2.65, 0.16, 4.2, 3.4);
  hole(-13.25, 0.16, 4.2, 3.4);
  hole(9.6, 0.16, 6.6, 3.4);
  const balcon = (f, x) => f >= 3 && f <= 5 && Math.abs(x) > 6;
  for (let f = 1; f <= 6; f++) for (const x of BAYS) {
    const y = FL[f] + 0.25;
    if (balcon(f, x)) hole(x, y, 2.2, 2.4);
    else hole(x, y + WIN.sill, WIN.w, WIN.head - WIN.sill);
  }
  const fg = new THREE.ExtrudeGeometry(facade, { depth: 0.36, bevelEnabled: false, curveSegments: 1 });
  fg.translate(0, 0, -0.36);
  put('facade', fg);
  put('facade', boxG(0.36, 23.2, 9, -16.18, 11.6, -4.5));
  put('facade', boxG(0.36, 23.2, 9, 16.18, 11.6, -4.5));
  put('facade', boxG(32.7, 0.5, 9.5, 0, 23.45, -4.6));
  put('band', boxG(30, 2.6, 6, 0, 24.9, -5.2));
  put('band', boxG(32.9, 0.7, 0.5, 0, 23.75, 0.05));
  for (let f = 1; f <= 7; f++) put('band', boxG(32.5, 0.26, 0.5, 0, FL[f] + 0.12, -0.08));
  put('band', boxG(32.5, 0.5, 0.4, 0, 4.1, -0.05));

  // huecos: marco, vierteaguas, vidrio y persiana a alturas distintas (menos en la clínica)
  const blinds = [];
  for (const o of openings) {
    const clinic = Math.abs(o.y - (F + WIN.sill)) < 0.01 && Math.abs(o.x) < 4;
    const ground = o.y < 1;
    const { x, y, w, h } = o;
    put('frame', boxG(w, 0.06, 0.12, x, y + h - 0.03, -0.3));
    put('frame', boxG(0.06, h, 0.12, x - w / 2 + 0.03, y + h / 2, -0.3));
    put('frame', boxG(0.06, h, 0.12, x + w / 2 - 0.03, y + h / 2, -0.3));
    if (!ground) put('sill', boxG(w + 0.3, 0.07, 0.34, x, y - 0.03, -0.02));
    if (clinic) { put('frame', boxG(w, 0.06, 0.12, x, y + 0.03, -0.3)); continue; }
    if (ground) {
      if (Math.abs(x + 7.95) < 0.1) {
        // portal de madera y cristal con el vestíbulo encendido
        add(new THREE.PlaneGeometry(w - 0.2, h - 0.2).translate(x, y + h / 2, -0.32), M.lit2, scene, false);
        put('frame', boxG(0.08, h, 0.1, x, y + h / 2, -0.28));
        sprite(C.warm2, 5.5, [x, y + 1.6, 0.6], 0.5);
      } else {
        const s = add(new THREE.PlaneGeometry(w, h).translate(x, y + h / 2, -0.25), M.shutter, scene, false);
        s.material.map.repeat.set(1, 1);
      }
      continue;
    }
    const lit = rand() < 0.12;
    add(new THREE.PlaneGeometry(w - 0.1, h - 0.1).translate(x, y + h / 2, -0.34), lit ? (rand() < 0.5 ? M.lit2 : M.lit3) : M.glass, scene, false);
    if (lit) sprite(0xc99a62, 3.0, [x, y + h * 0.4, 0.2], 0.12);
    const down = lit ? 0.2 + rand() * 0.4 : 0.25 + rand() * 0.75;
    const b = new THREE.Mesh(new THREE.PlaneGeometry(w - 0.06, 1).translate(0, -0.5, 0), M.slat);
    b.position.set(x, y + h, -0.22);
    b.scale.y = Math.max(0.05, h * down);
    scene.add(b);
  }
  // balcones: losa y barandilla de barrotes
  const bars = [];
  for (let f = 3; f <= 5; f++) for (const x of BAYS) if (balcon(f, x)) {
    const y = FL[f] + 0.25;
    put('band', boxG(3.4, 0.16, 0.95, x, y - 0.05, 0.45));
    put('frame', boxG(3.4, 0.06, 0.06, x, y + 1.0, 0.88));
    for (let i = 0; i <= 16; i++) bars.push([x - 1.7 + i * 0.2125, y + 0.5, 0.88]);
  }
  const barG = new THREE.BoxGeometry(0.03, 0.95, 0.03);
  const barM = new THREE.InstancedMesh(barG, M.frame, bars.length);
  const o3 = new THREE.Object3D();
  bars.forEach(([x, y, z], i) => { o3.position.set(x, y, z); o3.updateMatrix(); barM.setMatrixAt(i, o3.matrix); });
  barM.castShadow = true;
  scene.add(barM);
  // placa con el número del portal
  const plate = add(new THREE.PlaneGeometry(0.9, 0.42), new THREE.MeshStandardMaterial({ map: numberTexture('571'), roughness: 0.4, metalness: 0.2 }), scene, false);
  plate.position.set(-7.95, 3.85, 0.02);

  // persianas de la clínica: bajadas a medias en la calle, suben al llegar a la ventana
  const clinicBlinds = [-2.65, 2.65].map(x => {
    const b = new THREE.Mesh(new THREE.PlaneGeometry(WIN.w - 0.06, 1).translate(0, -0.5, 0), M.slat);
    b.position.set(x, F + WIN.head, -0.22);
    scene.add(b);
    put('band', boxG(WIN.w + 0.1, 0.26, 0.3, x, F + WIN.head + 0.13, -0.2));
    return b;
  });
  const spill = [-2.65, 2.65].map(x => { const l = new THREE.PointLight(0xffc68a, 0, 8, 1.6); l.position.set(x, F + 1.7, 1.3); scene.add(l); return l; });
  const winGlow = [-2.65, 2.65].map(x => sprite(C.warm, 8.5, [x, F + 1.5, 0.4], 0.7));
  const winGlow2 = [-2.65, 2.65].map(x => sprite(0xfff1dc, 3.4, [x, F + 1.45, 0.25], 0.85));

  // edificios vecinos: volumen, forjados y ventanas en instancias
  neighbour(-49, -16.4, 19.8, 0x285a75, 9);
  neighbour(16.4, 47, 26.6, 0x245470, 11);
  neighbour(-82, -49.2, 23.4, 0x214e68, 21);
  neighbour(47.2, 80, 17.2, 0x285a75, 33);
  function neighbour(x0, x1, h, color, s) {
    seed = s * 977;
    const w = x1 - x0, cx = (x0 + x1) / 2;
    add(boxG(w, h, 12, cx, h / 2, -6.2), std(color, 0.92));
    add(boxG(w + 0.3, 0.5, 0.5, cx, h + 0.25, 0.05), M.band);
    const dark = [], lit = [];
    for (let y = 4.6; y < h - 2.5; y += 3.05) {
      add(boxG(w, 0.2, 0.36, cx, y, 0.02), M.band, scene, false);
      for (let x = x0 + 2.4; x < x1 - 1.6; x += 3.6) (rand() < 0.09 ? lit : dark).push([x, y + 1.55]);
    }
    for (const [list, mat] of [[dark, M.glass], [lit, M.lit3]]) {
      if (!list.length) continue;
      const im = new THREE.InstancedMesh(new THREE.PlaneGeometry(1.9, 1.7), mat, list.length);
      list.forEach(([x, y], i) => { o3.position.set(x, y, 0.011); o3.updateMatrix(); im.setMatrixAt(i, o3.matrix); });
      scene.add(im);
    }
    for (const [x, y] of lit) if (rand() < 0.4) sprite(0xc99a62, 2.4, [x, y, 0.3], 0.1);
  }

  // ---------- Plátanos de la acera: tronco moteado, ramas y copa de volúmenes que se mecen
  const uTime = { value: 0 };
  // follaje suave: esferas lisas deformadas con ruido, motas de hoja en el color y luz que atraviesa los bordes
  M.leaf.onBeforeCompile = sh => {
    sh.uniforms.uTime = uTime;
    sh.vertexShader = 'uniform float uTime;\nvarying vec3 vLeafP;\nvarying float vBump;\n' + NOISE + sh.vertexShader.replace('#include <begin_vertex>', `#include <begin_vertex>
      vec3 lp = (instanceMatrix * vec4(position, 1.0)).xyz;
      float bump = snoise(lp * 0.55 + vec3(0.0, uTime * 0.06, 0.0)) * 0.6 + snoise(lp * 1.6) * 0.28 + snoise(lp * 3.8 + uTime * 0.05) * 0.14;
      vBump = bump;
      transformed += objectNormal * bump * 0.34;
      vec4 wp0 = instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
      float sw = sin(uTime * 0.9 + wp0.x * 0.45 + wp0.y * 0.3) * 0.05 + sin(uTime * 1.9 + wp0.z * 0.9 + wp0.x) * 0.02;
      transformed += vec3(sw, sw * 0.3, sw * 0.6) * (1.0 + position.y);
      vLeafP = (instanceMatrix * vec4(transformed, 1.0)).xyz;`);
    sh.fragmentShader = 'varying vec3 vLeafP;\nvarying float vBump;\n' + NOISE + sh.fragmentShader
      .replace('#include <color_fragment>', `#include <color_fragment>
        float leafN = snoise(vLeafP * 2.6) * 0.5 + snoise(vLeafP * 7.5) * 0.35 + snoise(vLeafP * 16.0) * 0.15;
        diffuseColor.rgb *= (0.88 + leafN * 0.3) * mix(0.62, 1.08, smoothstep(-0.55, 0.45, vBump));`)
      .replace('#include <opaque_fragment>', `
        float rim = pow(1.0 - clamp(dot(normal, normalize(vViewPosition)), 0.0, 1.0), 2.2);
        outgoingLight += rim * (diffuseColor.rgb * 0.4 + vec3(0.02, 0.13, 0.16));
        #include <opaque_fragment>`);
  };
  const blobs = [], trunks = [], branches = [];
  const tree = (x, z, s) => {
    const h = 5.4 * s;
    trunks.push([x, z, s, h]);
    for (let k = 0; k < 3; k++) branches.push([x, z, s, h, k]);
    const cy = h + 2.4 * s, n = 15;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + rand() * 0.8, u = i === 0 ? 0 : 0.25 + rand() * 0.75, r = Math.pow(u, 0.6), e = (rand() - 0.4) * 2;
      const bx = x + Math.cos(a) * r * 2.6 * s, bz = z + Math.sin(a) * r * 2.1 * s;
      const by = cy + e * 1.1 * s * Math.sqrt(1 - r * r * 0.6);
      const br = (1.05 + rand() * 0.6) * s * (1.2 - r * 0.35);
      blobs.push([bx, by, bz, br, clamp(0.2 + r * 0.5 + e * 0.3 + rand() * 0.15)]);
    }
  };
  for (const x of [-26.5, -15.9, -5.3, 5.3, 15.9, 26.5, 37.1, -37.1]) tree(x + (rand() - 0.5) * 0.6, 2.55, 0.95 + rand() * 0.12);
  for (const x of [-31.8, -21.2, -10.6, 0, 10.6, 21.2, 31.8]) tree(x + (rand() - 0.5) * 0.6, 18.4, 0.9 + rand() * 0.12);
  const blobG = new THREE.IcosahedronGeometry(1, 4);
  const leaves = new THREE.InstancedMesh(blobG, M.leaf, blobs.length);
  const ca = new THREE.Color(C.leaf), cb = new THREE.Color(C.leaf2), cc = new THREE.Color();
  blobs.forEach(([x, y, z, r, t], i) => {
    o3.position.set(x, y, z);
    o3.rotation.set(rand() * 3, rand() * 3, 0);
    o3.scale.set(r, r * 0.82, r);
    o3.updateMatrix();
    leaves.setMatrixAt(i, o3.matrix);
    leaves.setColorAt(i, cc.copy(ca).lerp(cb, t));
  });
  leaves.castShadow = leaves.receiveShadow = true;
  scene.add(leaves);
  o3.rotation.set(0, 0, 0);
  const trunkG = new THREE.CylinderGeometry(0.2, 0.3, 1, 16).translate(0, 0.5, 0);
  const trunkM = new THREE.InstancedMesh(trunkG, M.bark, trunks.length);
  trunks.forEach(([x, z, s, h], i) => { o3.position.set(x, 0, z); o3.scale.set(s, h, s); o3.rotation.set(0, rand() * 6, 0); o3.updateMatrix(); trunkM.setMatrixAt(i, o3.matrix); put('pit', boxG(1.3, 0.02, 1.3, x, 0.17, z)); });
  trunkM.castShadow = trunkM.receiveShadow = true;
  scene.add(trunkM);
  const branchG = new THREE.CylinderGeometry(0.07, 0.14, 1, 12).translate(0, 0.5, 0);
  const branchM = new THREE.InstancedMesh(branchG, M.bark, branches.length);
  branches.forEach(([x, z, s, h, k], i) => {
    o3.position.set(x, h * 0.92, z);
    o3.scale.set(s, 2.8 * s, s);
    o3.rotation.set((k - 1) * 0.5, k * 2.1, 0.55 * (k % 2 ? 1 : -1));
    o3.updateMatrix();
    branchM.setMatrixAt(i, o3.matrix);
  });
  branchM.castShadow = true;
  scene.add(branchM);
  o3.scale.set(1, 1, 1); o3.rotation.set(0, 0, 0);

  // farolas: tres con luz real, el resto solo con su halo
  const coneG = new THREE.CylinderGeometry(0.28, 2.4, 6.2, 32, 6, true);
  { const pos = coneG.attributes.position, col = new Float32Array(pos.count * 4);
    for (let i = 0; i < pos.count; i++) { const t = (pos.getY(i) + 3.1) / 6.2; col.set([1, 0.82, 0.58, 0.16 * t * t], i * 4); }
    coneG.setAttribute('color', new THREE.BufferAttribute(col, 4)); }
  const coneM = new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, fog: true });
  const lampPos = [[0, 3.95], [-10.6, 3.95], [10.6, 3.95], [21.2, 3.95], [-21.2, 3.95], [-5.3, 17.05], [5.3, 17.05], [15.9, 17.05], [-15.9, 17.05]];
  lampPos.forEach(([x, z], i) => {
    const side = z < 10 ? 1 : -1;
    put('pole', boxG(0.14, 6.6, 0.14, x, 3.3, z));
    put('pole', boxG(0.1, 0.1, 1.3, x, 6.55, z + side * 0.6));
    put('pole', boxG(0.5, 0.16, 0.7, x, 6.45, z + side * 1.2));
    add(new THREE.PlaneGeometry(0.42, 0.6).rotateX(Math.PI / 2).translate(x, 6.36, z + side * 1.2), M.glow, scene, false);
    sprite(C.warm2, 3.6, [x, 6.2, z + side * 1.2], 0.75);
    const cone = new THREE.Mesh(coneG, coneM);
    cone.position.set(x, 3.2, z + side * 1.2);
    scene.add(cone);
    if (i === 0 || i === 1 || i === 2 || i === 6) {
      const l = new THREE.PointLight(0xffc88a, 120, 26, 1.45);
      l.position.set(x, 6.1, z + side * 1.2);
      scene.add(l);
    }
  });

  // ---------- Interior del 2º C
  const inside = new THREE.Group();
  scene.add(inside);
  const D = 6.5, Y = F;
  const room = (x0, x1) => {
    const w = x1 - x0, cx = (x0 + x1) / 2;
    add(boxG(w, 0.06, D - 0.36, cx, Y - 0.03, -0.36 - (D - 0.36) / 2), M.floor, inside, false).receiveShadow = true;
    add(boxG(w, 0.06, D - 0.36, cx, Y + 2.62, -0.36 - (D - 0.36) / 2), M.ceil, inside, false);
    add(boxG(w, 2.62, 0.1, cx, Y + 1.31, -D), M.wall, inside, false);
  };
  room(-5.3, 0);
  room(0, 5.3);
  M.floor.map.repeat.set(2.6, 3.2);
  add(boxG(0.1, 2.62, D - 0.36, -5.3, Y + 1.31, -0.36 - (D - 0.36) / 2), M.wall, inside, false);
  add(boxG(0.1, 2.62, D - 0.36, 5.3, Y + 1.31, -0.36 - (D - 0.36) / 2), M.wall, inside, false);
  // tabique con puerta corredera de vidrio abierta entre sala y gabinete
  add(boxG(0.1, 2.62, 3.9, 0, Y + 1.31, -D + 1.95), M.wall, inside, false);
  add(boxG(0.1, 0.5, 2.2, 0, Y + 2.37, -1.5), M.wall, inside, false);
  add(boxG(0.1, 2.62, 0.35, 0, Y + 1.31, -0.54), M.wall, inside, false);
  add(boxG(0.03, 2.1, 1.1, -0.1, Y + 1.05, -3.2), new THREE.MeshStandardMaterial({ color: 0xdff1f5, roughness: 0.2, transparent: true, opacity: 0.45 }), inside, false);
  // luces de techo
  for (const x of [-2.65, 2.65]) {
    add(new THREE.CylinderGeometry(0.42, 0.42, 0.03, 32).translate(x, Y + 2.58, -3.2), M.glow, inside, false);
    add(new THREE.CylinderGeometry(0.42, 0.42, 0.03, 32).translate(x, Y + 2.58, -1.4), M.glow, inside, false);
  }
  const roomL = new THREE.PointLight(0xfff0dc, 0, 11, 1.2); roomL.position.set(-2.6, Y + 2.2, -3.0);
  const roomR = new THREE.PointLight(0xf2f9ff, 0, 11, 1.2); roomR.position.set(2.6, Y + 2.2, -3.0);
  inside.add(roomL, roomR);
  // radiadores de hierro bajo las ventanas
  for (const x of [-2.65, 2.65]) {
    for (let i = 0; i < 13; i++) put('radiator', boxG(0.075, 0.62, 0.16, x - 0.9 + i * 0.15, Y + 0.42, -0.62, 0.03));
    put('radiator', boxG(1.95, 0.05, 0.05, x, Y + 0.14, -0.62));
  }

  // sala de espera: sillas de carcasa, mesa con revistas, rincón infantil, cactus, lámpara de trípode
  const shell = new THREE.LatheGeometry([[0, 0], [0.24, 0.0], [0.27, 0.05], [0.26, 0.12], [0.2, 0.15]].map(([a, b]) => new THREE.Vector2(a, b)), 28);
  const chairAt = (x, z, ry) => {
    const g = new THREE.Group();
    add(shell.clone().scale(1, 1, 1.05), M.chair, g).position.y = 0.44;
    const back = add(new RoundedBoxGeometry(0.46, 0.38, 0.05, 2, 0.02), M.chair, g);
    back.position.set(0, 0.74, -0.23); back.rotation.x = -0.16;
    for (const [lx, lz] of [[-0.18, -0.18], [0.18, -0.18], [-0.18, 0.18], [0.18, 0.18]]) {
      const l = add(new THREE.CylinderGeometry(0.012, 0.012, 0.46, 6), M.metal, g);
      l.position.set(lx, 0.22, lz); l.rotation.set(lz * 0.6, 0, -lx * 0.6);
    }
    g.position.set(x, Y, z); g.rotation.y = ry;
    inside.add(g);
  };
  chairAt(-4.85, -2.0, Math.PI / 2);
  chairAt(-4.85, -2.7, Math.PI / 2);
  chairAt(-4.85, -3.4, Math.PI / 2);
  chairAt(-3.6, -4.6, 0);
  put('white', boxG(1.05, 0.05, 0.62, -2.95, Y + 0.42, -3.0, 0.02));
  for (const [lx, lz] of [[-0.45, -0.25], [0.45, -0.25], [-0.45, 0.25], [0.45, 0.25]]) put('woodp', boxG(0.04, 0.4, 0.04, -2.95 + lx, Y + 0.2, -3.0 + lz));
  const mags = [0x003b5c, 0x05c3de, 0xe8735a, 0xf1d7a6, 0xffffff, 0x2a7477];
  mags.forEach((c, i) => add(boxG(0.22, 0.012, 0.3, -3.3 + (i % 3) * 0.3, Y + 0.455 + Math.floor(i / 3) * 0.013, -3.08 + (i % 2) * 0.12), std(c, 0.6), inside, false).rotation.y = (rand() - 0.5) * 0.6);
  // rincón infantil
  put('woodp', boxG(0.8, 0.04, 0.5, -4.4, Y + 0.5, -5.6));
  for (const [lx, lz] of [[-0.36, -0.21], [0.36, -0.21], [-0.36, 0.21], [0.36, 0.21]]) put('woodp', boxG(0.04, 0.5, 0.04, -4.4 + lx, Y + 0.25, -5.6 + lz));
  for (const cx of [-4.95, -3.85]) {
    put('woodp', boxG(0.3, 0.03, 0.3, cx, Y + 0.3, -5.6));
    put('woodp', boxG(0.03, 0.32, 0.3, cx + (cx < -4.4 ? -0.14 : 0.14), Y + 0.47, -5.6));
    for (const [lx, lz] of [[-0.13, -0.13], [0.13, -0.13], [-0.13, 0.13], [0.13, 0.13]]) put('woodp', boxG(0.03, 0.3, 0.03, cx + lx, Y + 0.15, -5.6 + lz));
  }
  add(boxG(0.32, 0.4, 0.02, -4.55, Y + 0.72, -5.84), std(0x05c3de, 0.6), inside, false);
  add(boxG(0.32, 0.4, 0.02, -4.2, Y + 0.72, -5.84), std(0xe8735a, 0.6), inside, false);
  // mostrador de recepción y el símbolo de Morelló en la pared del fondo
  put('white', boxG(2.1, 1.05, 0.55, -1.75, Y + 0.525, -5.25, 0.03));
  put('white', boxG(2.3, 0.04, 0.7, -1.75, Y + 1.07, -5.25, 0.015));
  add(boxG(0.5, 0.32, 0.03, -1.3, Y + 1.28, -5.38), M.metal, inside, false);
  // cactus en cesto y lámpara de trípode junto a la ventana
  add(new THREE.CylinderGeometry(0.24, 0.2, 0.36, 18).translate(-4.7, Y + 0.18, -0.85), M.basket, inside);
  [[0, 0.95, 0.09], [0.12, 0.62, 0.07], [-0.1, 0.5, 0.06]].forEach(([dx, h, r]) => add(new THREE.CapsuleGeometry(r, h, 4, 10).translate(-4.7 + dx, Y + 0.36 + h / 2 + r, -0.85), M.cactus, inside));
  for (let k = 0; k < 3; k++) {
    const a = k * 2.1 + 0.4, l = add(new THREE.CylinderGeometry(0.016, 0.02, 1.5, 6), M.wood, inside);
    l.position.set(-0.7 + Math.cos(a) * 0.16, Y + 0.72, -0.85 + Math.sin(a) * 0.16);
    l.rotation.set(Math.sin(a) * 0.2, 0, -Math.cos(a) * 0.2);
  }
  const shade = add(new THREE.CylinderGeometry(0.17, 0.3, 0.36, 24, 1, true).translate(-0.7, Y + 1.55, -0.85), new THREE.MeshStandardMaterial({ color: 0xfff6ea, roughness: 0.9, side: THREE.DoubleSide, emissive: new THREE.Color(0xffe6c4), emissiveIntensity: 0.6 }), inside, false);
  const lampL = new THREE.PointLight(0xffd7a3, 0, 6, 1.4); lampL.position.set(-0.7, Y + 1.4, -0.85);
  inside.add(lampL);

  // gabinete: sillón dental, lámpara de quirófano, muebles y monitor
  const chair = new THREE.Group();
  chair.position.set(3.05, Y, -3.6);
  inside.add(chair);
  add(new THREE.CylinderGeometry(0.26, 0.34, 0.46, 24).translate(0, 0.23, 0), M.white, chair);
  add(new RoundedBoxGeometry(1.25, 0.06, 0.8, 2, 0.02).translate(0, 0.02, 0), M.white, chair);
  const part = (w, h, d, x, y, rz, mat = M.dental, r = 0.045) => { const m = add(new RoundedBoxGeometry(w, h, d, 3, r), mat, chair); m.position.set(x, y, 0); m.rotation.z = rz; return m; };
  part(1.0, 0.11, 0.56, 0.1, 0.56, 0);
  part(0.82, 0.1, 0.5, 0.95, 0.44, -0.3);
  part(0.86, 0.11, 0.56, -0.76, 0.8, -0.56);
  part(0.3, 0.09, 0.3, -1.2, 1.1, -0.7);
  part(0.9, 0.06, 0.62, 0.1, 0.48, 0, M.white, 0.025);
  part(0.42, 0.05, 0.08, 0.1, 0.72, 0, M.white, 0.02).position.z = 0.34;
  part(0.42, 0.05, 0.08, 0.1, 0.72, 0, M.white, 0.02).position.z = -0.34;
  // taburete del doctor
  add(new THREE.CylinderGeometry(0.22, 0.22, 0.08, 24).translate(1.75, Y + 0.55, -4.75), M.navy, inside);
  add(new THREE.CylinderGeometry(0.03, 0.03, 0.5, 8).translate(1.75, Y + 0.27, -4.75), M.metal, inside);
  add(new THREE.CylinderGeometry(0.26, 0.26, 0.03, 5).translate(1.75, Y + 0.03, -4.75), M.metal, inside);
  // brazo y lámpara
  const tube = (a, b, r = 0.03) => { const va = new THREE.Vector3(...a), vb = new THREE.Vector3(...b); const g = new THREE.CylinderGeometry(r, r, va.distanceTo(vb), 10); const m = add(g, M.white, inside); m.position.copy(va).add(vb).multiplyScalar(0.5); m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), vb.clone().sub(va).normalize()); return m; };
  tube([2.3, Y + 2.62, -4.3], [2.3, Y + 2.25, -4.3], 0.04);
  tube([2.3, Y + 2.25, -4.3], [1.95, Y + 2.0, -3.75]);
  tube([1.95, Y + 2.0, -3.75], [1.95, Y + 1.82, -3.62]);
  const head = add(new RoundedBoxGeometry(0.46, 0.1, 0.24, 3, 0.04), M.white, inside);
  head.position.set(1.95, Y + 1.76, -3.6); head.rotation.z = -0.18;
  const lens = add(new THREE.PlaneGeometry(0.36, 0.15).rotateX(Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0x9fb4bd }), inside, false);
  lens.position.set(1.95, Y + 1.705, -3.6); lens.rotation.z = -0.18;
  const op = new THREE.SpotLight(0xffffff, 0, 6, 0.55, 0.6, 1.2);
  op.position.set(1.95, Y + 1.69, -3.6);
  op.target.position.set(1.9, Y + 0.95, -3.6);
  // monitor en brazo y cuadros: el gabinete y la sala no son una caja vacía
  tube([4.95, Y + 1.5, -6.42], [4.75, Y + 1.5, -5.4], 0.025);
  inside.add(op, op.target);
  // unidad con bandeja
  put('white', boxG(0.1, 0.9, 0.1, 3.9, Y + 0.45, -4.3));
  put('white', boxG(0.6, 0.06, 0.4, 3.75, Y + 0.95, -4.1, 0.02));
  // muebles del fondo, encimera, monitor
  put('white', boxG(4.6, 0.9, 0.6, 2.65, Y + 0.45, -D + 0.32, 0.02));
  put('band2', boxG(4.7, 0.04, 0.66, 2.65, Y + 0.92, -D + 0.33));
  put('white', boxG(3.0, 0.7, 0.35, 3.4, Y + 1.95, -D + 0.2, 0.02));
  for (let i = 0; i < 6; i++) put('handle', boxG(0.012, 0.22, 0.02, 0.7 + i * 0.78, Y + 0.72, -D + 0.63));
  const screen = add(new THREE.PlaneGeometry(0.62, 0.38), M.screen, inside, false);
  screen.position.set(4.7, Y + 1.5, -5.25); screen.rotation.y = -0.5;
  add(boxG(0.66, 0.42, 0.03, 0, 0, -0.02), M.metal, screen, false);
  add(new THREE.CylinderGeometry(0.42, 0.42, 0.03, 32).translate(2.65, Y + 2.58, -4.8), M.glow, inside, false);

  // el símbolo del logo, en volumen, en la pared de recepción
  fetch('logo/morello-simbolo.svg').then(r => r.text()).then(txt => {
    const data = new SVGLoader().parse(txt);
    const logo = new THREE.Group();
    data.paths.forEach(path => {
      const col = (path.userData?.style?.fill || '#00456D').toLowerCase();
      const mat = col.includes('c3') || col.includes('c4') ? M.cyan : M.navy;
      SVGLoader.createShapes(path).forEach(sh => {
        const g = new THREE.ExtrudeGeometry(sh, { depth: 26, bevelEnabled: false, curveSegments: 10 });
        add(g, mat, logo, false);
      });
    });
    const box = new THREE.Box3().setFromObject(logo), size = box.getSize(new THREE.Vector3()), c = box.getCenter(new THREE.Vector3());
    logo.children.forEach(m => m.geometry.translate(-c.x, -c.y, 0));
    const k = 0.95 / size.y;
    logo.scale.set(k, -k, k);
    logo.position.set(-1.75, Y + 1.85, -D + 0.07);
    inside.add(logo);
  }).catch(() => {});

  // sombras de contacto bajo los muebles (más baratas que sombras de focos interiores)
  const blob = new THREE.MeshBasicMaterial({ map: glowTex, color: 0x0a2230, transparent: true, opacity: 0.5, depthWrite: false });
  const shadowAt = (x, z, w, d, o = 1) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d).rotateX(-Math.PI / 2), blob.clone()); m.material.opacity = 0.5 * o; m.position.set(x, Y + 0.004, z); m.renderOrder = 1; inside.add(m); };
  [[-4.85, -2.0], [-4.85, -2.7], [-4.85, -3.4], [-3.6, -4.6]].forEach(([x, z]) => shadowAt(x, z, 0.9, 0.9));
  shadowAt(-2.95, -3.0, 1.6, 1.1); shadowAt(-4.4, -5.6, 1.5, 1.0); shadowAt(-1.75, -5.25, 2.9, 1.2); shadowAt(-4.7, -0.85, 0.8, 0.8);
  shadowAt(3.05, -3.6, 2.8, 1.5, 1.2); shadowAt(1.75, -4.75, 0.8, 0.8); shadowAt(2.65, -6.1, 5, 0.9, 0.8); shadowAt(3.85, -4.2, 0.8, 0.8);
  // rodapiés
  for (const [x, z, w, d] of [[-2.65, -6.42, 5.2, 0.04], [2.65, -6.42, 5.2, 0.04], [-5.23, -3.4, 0.04, 6], [5.23, -3.4, 0.04, 6]]) put('white', boxG(w, 0.09, d, x, Y + 0.045, z));
  // dos cuadros en la sala, como en la real
  for (const [x, c] of [[-3.55, 0x8fb7c4], [-2.85, 0xd8c4a3]]) { add(boxG(0.5, 0.62, 0.03, x, Y + 1.75, -6.43), M.white, inside, false); add(boxG(0.42, 0.54, 0.01, x, Y + 1.75, -6.41), std(c, 0.8), inside, false); }

  // ---------- fusión de lo estático por material
  const mats = { kerb: M.kerb, paint: M.paint, facade: M.facade, band: M.band, frame: M.frame, sill: M.sill, pit: M.pit, pole: M.pole, radiator: M.white, white: M.white, woodp: M.wood, band2: M.navy, handle: M.metal };
  for (const [k, list] of Object.entries(bucket)) {
    const mesh = new THREE.Mesh(mergeGeometries(list.map(g => (g.index ? g.toNonIndexed() : g)), false), mats[k]);
    mesh.castShadow = !['paint', 'pit', 'kerb'].includes(k);
    mesh.receiveShadow = true;
    (['radiator', 'white', 'woodp', 'band2', 'handle'].includes(k) ? inside : scene).add(mesh);
  }

  const B = i => T[i];
  return {
    update(p) {
      const up = ramp(B(0).b - 0.01, B(1).a + 0.02, p);
      clinicBlinds.forEach((b, i) => { b.scale.y = Math.max(0.02, (1 - up) * (i ? 1.05 : 0.8)); });
      const near = 0.7 + 0.3 * ramp(0, B(1).a, p);
      roomL.intensity = 15 * near;
      roomR.intensity = 14 * near;
      lampL.intensity = 5 * near;
      spill.forEach(l => { l.intensity = lerp(9, 16, up); });
      const wide = ramp(B(1).b, B(2).a, p);
      scene.fog.density = 0.021 * lerp(1, 0.62, wide);
      winGlow.forEach(g => { const d = camera.position.distanceTo(g.position); g.material.opacity = 0.7 * lerp(0.55, 1, up) * ramp(4, 14, d); g.scale.setScalar(8.5 + ramp(20, 45, d) * 7); });
      winGlow2.forEach(g => { const d = camera.position.distanceTo(g.position); g.material.opacity = 0.85 * lerp(0.4, 1, up) * ramp(3, 10, d); });
    },
    tick(dt) {
      uTime.value += dt;
      return true;
    },
  };

  // ---------- texturas hechas en canvas
  function canvas(w, h = w) { const c = document.createElement('canvas'); c.width = w; c.height = h; return [c, c.getContext('2d')]; }
  function tex(c, repeat = true) {
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    if (repeat) t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.anisotropy = 8;
    return t;
  }
  function skyTexture(a, b) {
    const [c, g] = canvas(4, 512);
    const gr = g.createLinearGradient(0, 0, 0, 512);
    gr.addColorStop(0, a); gr.addColorStop(0.62, b); gr.addColorStop(1, b);
    g.fillStyle = gr; g.fillRect(0, 0, 4, 512);
    return tex(c, false);
  }
  function envMap() {
    const env = new THREE.Scene();
    const sky = new THREE.Mesh(new THREE.SphereGeometry(40, 32, 16), new THREE.ShaderMaterial({
      side: THREE.BackSide, depthWrite: false,
      vertexShader: 'varying vec3 vP; void main(){ vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
      fragmentShader: 'varying vec3 vP; void main(){ float h = normalize(vP).y; vec3 c = mix(vec3(0.06, 0.22, 0.32), vec3(0.008, 0.04, 0.08), smoothstep(0.0, 0.7, h)); c = mix(vec3(0.02, 0.05, 0.07), c, step(0.0, h)); gl_FragColor = vec4(c, 1.0); }',
    }));
    env.add(sky);
    const warm = new THREE.MeshBasicMaterial({ color: 0xffc37a });
    for (let i = 0; i < 14; i++) { const b = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.8, 0.2), warm); const a = (i / 14) * Math.PI * 2; b.position.set(Math.cos(a) * 30, 1.5 + (i % 3), Math.sin(a) * 30); b.lookAt(0, 2, 0); env.add(b); }
    const pm = new THREE.PMREMGenerator(renderer);
    const t = pm.fromScene(env, 0.02).texture;
    pm.dispose();
    return t;
  }
  function glowTexture() {
    const [c, g] = canvas(128);
    const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.18, 'rgba(255,255,255,.55)'); gr.addColorStop(0.5, 'rgba(255,255,255,.12)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
    return tex(c, false);
  }
  function slatTexture(a, b, n = 34) {
    const [c, g] = canvas(64, 256);
    g.fillStyle = a; g.fillRect(0, 0, 64, 256);
    for (let i = 0; i < n; i++) { g.fillStyle = b; g.fillRect(0, Math.round((i * 256) / n), 64, 2); }
    return tex(c);
  }
  function panotTexture() {
    // panot de flor de Barcelona: losetas de 20 cm con cuatro flores
    const [c, g] = canvas(256);
    g.fillStyle = '#7f98a6'; g.fillRect(0, 0, 256, 256);
    for (let ty = 0; ty < 2; ty++) for (let tx = 0; tx < 2; tx++) {
      const ox = tx * 128, oy = ty * 128;
      g.strokeStyle = 'rgba(20,40,52,.45)'; g.lineWidth = 3; g.strokeRect(ox + 1.5, oy + 1.5, 125, 125);
      for (const [fx, fy] of [[32, 32], [96, 32], [32, 96], [96, 96]]) {
        g.fillStyle = 'rgba(20,45,60,.28)';
        for (let k = 0; k < 4; k++) { const a = k * Math.PI / 2 + Math.PI / 4; g.beginPath(); g.arc(ox + fx + Math.cos(a) * 11, oy + fy + Math.sin(a) * 11, 9, 0, Math.PI * 2); g.fill(); }
        g.fillStyle = 'rgba(210,228,236,.25)'; g.beginPath(); g.arc(ox + fx, oy + fy, 5, 0, Math.PI * 2); g.fill();
      }
    }
    return tex(c);
  }
  function barkTexture() {
    // corteza de plátano: placas claras y oscuras
    const [c, g] = canvas(256);
    g.fillStyle = '#6f8b95'; g.fillRect(0, 0, 256, 256);
    const cols = ['#a7bcc2', '#4b6672', '#c3d2d4', '#587784'];
    for (let i = 0; i < 70; i++) {
      g.fillStyle = cols[i % 4]; g.globalAlpha = 0.55;
      g.beginPath(); g.ellipse(rand() * 256, rand() * 256, 8 + rand() * 26, 6 + rand() * 16, rand() * 3, 0, Math.PI * 2); g.fill();
    }
    g.globalAlpha = 1;
    return tex(c);
  }
  function parquetTexture() {
    // parquet de taco en espiga cuadrada
    const [c, g] = canvas(512);
    const woods = ['#c49a6c', '#b88d5f', '#cfa679', '#a97f53', '#d4ae84'];
    const s = 128, n = 4;
    for (let y = 0; y < 4; y++) for (let x = 0; x < 4; x++) {
      const vert = (x + y) % 2;
      for (let k = 0; k < n; k++) {
        g.fillStyle = woods[Math.floor(rand() * woods.length)];
        if (vert) g.fillRect(x * s + k * (s / n), y * s, s / n, s); else g.fillRect(x * s, y * s + k * (s / n), s, s / n);
        g.strokeStyle = 'rgba(60,35,15,.35)'; g.lineWidth = 1.2;
        if (vert) g.strokeRect(x * s + k * (s / n), y * s, s / n, s); else g.strokeRect(x * s, y * s + k * (s / n), s, s / n);
      }
    }
    return tex(c);
  }
  function numberTexture(txt) {
    const [c, g] = canvas(256, 120);
    g.fillStyle = '#d7e6ec'; g.fillRect(0, 0, 256, 120);
    g.fillStyle = '#003b5c';
    g.font = '600 78px "Archivo", system-ui, sans-serif';
    g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(txt, 128, 64);
    return tex(c, false);
  }
}
