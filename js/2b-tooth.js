// 2b · El diente M — el símbolo del logo extruido en 3D y su escenario de luz
import * as THREE from 'three';
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';

const BASE = '#04131E';

const PRESETS = {
  porcelain: {
    body: { color: '#ffffff', roughness: 0.2, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.03, iridescence: 0, transmission: 0, sheen: 0.3, thickness: 1.2, envMapIntensity: 1.9 },
    arc: { color: '#05c3de', emissive: '#0598ad', emissiveIntensity: 0.55, roughness: 0.12, transmission: 0 },
    glow: 1, ring: 0, slats: 0
  },
  lacquer: {
    body: { color: '#003b5c', roughness: 0.14, metalness: 0.2, clearcoat: 1, clearcoatRoughness: 0.02, iridescence: 0, transmission: 0, sheen: 0, thickness: 1.2, envMapIntensity: 1.25 },
    arc: { color: '#9cf1ff', emissive: '#05c3de', emissiveIntensity: 0.9, roughness: 0.08, transmission: 0 },
    glow: 1.15, ring: 1, slats: 0
  },
  pearl: {
    body: { color: '#fbf7f6', roughness: 0.1, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.02, iridescence: 1, transmission: 0, sheen: 0.2, thickness: 1.2, envMapIntensity: 2.0 },
    arc: { color: '#05c3de', emissive: '#05c3de', emissiveIntensity: 0.45, roughness: 0.1, transmission: 0 },
    glow: 0.95, ring: 0, slats: 0
  },
  satin: {
    body: { color: '#05c3de', roughness: 0.42, metalness: 0, clearcoat: 0.5, clearcoatRoughness: 0.25, iridescence: 0, transmission: 0, sheen: 1, thickness: 1.2, envMapIntensity: 1 },
    arc: { color: '#ffffff', emissive: '#05c3de', emissiveIntensity: 0.35, roughness: 0.2, transmission: 0 },
    glow: 1.05, ring: 0, slats: 0
  },
  glass: {
    body: { color: '#ffffff', roughness: 0.03, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.02, iridescence: 0.35, transmission: 1, sheen: 0, thickness: 1.7, envMapIntensity: 1.1 },
    arc: { color: '#05c3de', emissive: '#05c3de', emissiveIntensity: 1.1, roughness: 0.05, transmission: 0 },
    glow: 0.8, ring: 0, slats: 1
  }
};

const bgVert = /* glsl */`varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.9999, 1.0); }`;
const bgFrag = /* glsl */`
  uniform vec2 uRes; uniform vec2 uGlow; uniform float uTime; uniform float uK;
  uniform vec3 uBase; uniform vec3 uA; uniform vec3 uB;
  varying vec2 vUv;
  float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
  void main(){
    vec2 d = vUv - uGlow; d.x *= uRes.x / uRes.y;
    float r = length(d);
    vec3 col = uBase;
    col += uA * exp(-r * r * 2.2) * 0.62 * uK;
    col += uB * exp(-r * r * 9.0) * 0.2 * uK;
    float band = exp(-pow((vUv.y - uGlow.y + (vUv.x - uGlow.x) * 0.35) * 5.0, 2.0));
    col += uA * band * 0.08 * uK;
    float g = hash(gl_FragCoord.xy + floor(uTime * 24.0)) - 0.5;
    col += g * 0.018;
    gl_FragColor = vec4(max(col, 0.0), 1.0);
    #include <colorspace_fragment>
  }`;

export async function createTooth(canvas, { svgUrl, reduce = false } = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
  const dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 800 ? 1.6 : 1.5);
  renderer.setPixelRatio(dpr);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.02;
  renderer.setClearColor(BASE, 1);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 0, 10);

  const pmrem = new THREE.PMREMGenerator(renderer);
  // Estudio con cajas de luz: reflejos largos sobre la porcelana
  const env = new THREE.Scene();
  env.add(new THREE.Mesh(new THREE.BoxGeometry(24, 24, 24), new THREE.MeshBasicMaterial({ color: new THREE.Color('#0a2638'), side: THREE.BackSide })));
  const softbox = (w, hh, p, r, k, col = '#ffffff') => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, hh), new THREE.MeshBasicMaterial({ color: new THREE.Color(col).multiplyScalar(k), side: THREE.DoubleSide })); m.position.set(...p); m.rotation.set(...r); env.add(m); };
  softbox(2.2, 12, [-7, 1.5, 4], [0, Math.PI / 2.8, 0], 2.6);
  softbox(1.4, 12, [7.5, 0.5, 2], [0, -Math.PI / 2.4, 0], 1.6);
  softbox(12, 2, [0, 8.5, 1], [Math.PI / 2, 0, 0], 2.0);
  softbox(3, 10, [2.5, 0, -9], [0, 0, 0.3], 1.4, '#05c3de');
  softbox(14, 1.4, [0, -6.5, 5], [-Math.PI / 2.6, 0, 0], 0.7, '#7cc7ea');
  softbox(30, 30, [0, 0, 11.9], [0, 0, 0], 0.18, '#3d6f8c');
  scene.environment = pmrem.fromScene(env, 0.01).texture;

  // Fondo: el campo azul abismo con la luz de estudio detrás del objeto
  const bgMat = new THREE.ShaderMaterial({
    vertexShader: bgVert, fragmentShader: bgFrag, depthWrite: false, depthTest: false, toneMapped: false,
    uniforms: {
      uRes: { value: new THREE.Vector2(1, 1) }, uGlow: { value: new THREE.Vector2(0.68, 0.5) },
      uTime: { value: 0 }, uK: { value: 1 },
      uBase: { value: new THREE.Color(BASE) }, uA: { value: new THREE.Color('#0d5f8c') }, uB: { value: new THREE.Color('#05c3de') }
    }
  });
  const bg = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), bgMat);
  bg.frustumCulled = false; bg.renderOrder = -10;
  scene.add(bg);

  // Luces de estudio
  const key = new THREE.DirectionalLight('#ffffff', 2.5); key.position.set(3, 4, 6); scene.add(key);
  const fill = new THREE.DirectionalLight('#a8dcff', 0.7); fill.position.set(-5, -1, 3); scene.add(fill);
  const rim = new THREE.PointLight('#05c3de', 34, 14, 2); rim.position.set(2.8, 1.4, -2.4); scene.add(rim);
  const rim2 = new THREE.PointLight('#7ee8f7', 14, 12, 2); rim2.position.set(-2.6, 2, -1.8); scene.add(rim2);
  const under = new THREE.PointLight('#3aa0d8', 10, 10, 2); under.position.set(1.5, -2.6, 1.5); scene.add(under);

  // El diente M desde el SVG del logo
  const svgText = await (await fetch(svgUrl)).text();
  const data = new SVGLoader().parse(svgText);
  const bodyMat = new THREE.MeshPhysicalMaterial({ color: '#f2f7f9', sheenColor: new THREE.Color('#cdf3fb'), sheenRoughness: 0.45, iridescenceIOR: 1.8, iridescenceThicknessRange: [200, 900], ior: 1.5, attenuationColor: new THREE.Color('#bfefff'), attenuationDistance: 2.4 });
  const arcMat = new THREE.MeshPhysicalMaterial({ color: '#05c3de', clearcoat: 1, clearcoatRoughness: 0.04, ior: 1.5, thickness: 0.8 });
  const inner = new THREE.Group();
  const box = new THREE.Box3();
  const meshes = [];
  data.paths.forEach((path) => {
    const isArc = /c3e0/i.test(path.userData?.style?.fill || '');
    const shapes = SVGLoader.createShapes(path);
    const depth = isArc ? 118 : 96;
    const geo = new THREE.ExtrudeGeometry(shapes, { depth, bevelEnabled: true, bevelThickness: 30, bevelSize: 15, bevelOffset: 0, bevelSegments: 10, curveSegments: 56 });
    geo.translate(0, 0, -depth / 2);
    geo.computeBoundingBox(); box.union(geo.boundingBox);
    const mesh = new THREE.Mesh(geo, isArc ? arcMat : bodyMat);
    if (isArc) mesh.position.z = 12;
    meshes.push(mesh); inner.add(mesh);
  });
  const c = box.getCenter(new THREE.Vector3()); const sz = box.getSize(new THREE.Vector3());
  meshes.forEach((m) => m.geometry.translate(-c.x, -c.y, 0));
  const k = 1 / sz.y;
  inner.scale.set(k, -k, k);
  const tooth = new THREE.Group(); tooth.add(inner); scene.add(tooth);

  // Anillo cromado (ortodoncia)
  const ringMat = new THREE.MeshPhysicalMaterial({ color: '#eef4f7', metalness: 1, roughness: 0.05, clearcoat: 1 });
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.58, 0.01, 24, 240), ringMat);
  const ring2 = new THREE.Mesh(new THREE.TorusGeometry(0.66, 0.006, 16, 240), ringMat);
  const rings = new THREE.Group(); rings.add(ring, ring2); rings.rotation.set(1.2, 0.2, 0.3); tooth.add(rings);

  // Láminas de luz que el diente de cristal refracta (ortodoncia invisible)
  const slats = new THREE.Group();
  const slatGeo = new THREE.BoxGeometry(0.3, 4.6, 0.3);
  const slatMats = [
    new THREE.MeshPhysicalMaterial({ color: '#077d92', emissive: '#05c3de', emissiveIntensity: 0.18, roughness: 0.22, clearcoat: 1 }),
    new THREE.MeshPhysicalMaterial({ color: '#0b4f77', emissive: '#063a59', emissiveIntensity: 0.45, roughness: 0.2, clearcoat: 1 }),
    new THREE.MeshPhysicalMaterial({ color: '#0d6a96', emissive: '#0b5a82', emissiveIntensity: 0.35, roughness: 0.2, clearcoat: 1 })
  ];
  for (let i = 0; i < 7; i++) {
    const s = new THREE.Mesh(slatGeo, slatMats[i % 3]);
    s.position.set((i - 3) * 0.56, 0, -2.4 - (i % 2) * 0.4);
    s.userData.base = s.position.x;
    slats.add(s);
  }
  slats.rotation.z = -0.5;
  scene.add(slats);

  // Estado
  const cur = { x: 0.2, y: 0, s: 0.6, rx: 0, ry: 0, rz: 0, ring: 0, slats: 0, glow: 1 };
  const tgt = { ...cur };
  let preset = 'porcelain';
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  let spin = 0, spinT = 0;
  let w = 1, h = 1;

  function applyPreset(name, dur = 1.1) {
    const p = PRESETS[name]; if (!p) return;
    preset = name;
    const g = window.gsap;
    const set = (mat, v) => {
      const { color, emissive, ...rest } = v;
      const col = new THREE.Color(color);
      if (g && dur > 0) {
        g.to(mat.color, { r: col.r, g: col.g, b: col.b, duration: dur, ease: 'expo.out', overwrite: 'auto' });
        g.to(mat, { ...rest, duration: dur, ease: 'expo.out', overwrite: 'auto' });
        if (emissive) { const e = new THREE.Color(emissive); g.to(mat.emissive, { r: e.r, g: e.g, b: e.b, duration: dur, ease: 'expo.out', overwrite: 'auto' }); }
      } else {
        mat.color.copy(col); Object.assign(mat, rest); if (emissive) mat.emissive.set(emissive);
      }
    };
    set(bodyMat, p.body); set(arcMat, p.arc);
    tgt.ring = p.ring; tgt.slats = p.slats; tgt.glow = p.glow;
  }

  function resize() {
    w = canvas.clientWidth || window.innerWidth; h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
    const v = renderer.getDrawingBufferSize(new THREE.Vector2());
    bgMat.uniforms.uRes.value.copy(v);
  }
  resize();
  window.addEventListener('resize', resize);

  if (!reduce && matchMedia('(pointer: fine)').matches) {
    window.addEventListener('pointermove', (e) => {
      pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });
  }

  // Precompila todas las variantes de material para que el cambio no dé tirones
  for (const name of Object.keys(PRESETS)) { applyPreset(name, 0); renderer.compile(scene, camera); }
  applyPreset('porcelain', 0);

  const worldH = () => 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;

  let running = false, last = performance.now(), t0 = performance.now();
  function frame(now) {
    if (!running) return;
    const dt = Math.min((now - last) / 1000, 0.05); last = now;
    const t = (now - t0) / 1000;
    const a = reduce ? 1 : 1 - Math.exp(-dt * 4.2);
    for (const key in tgt) cur[key] += (tgt[key] - cur[key]) * a;
    pointer.x += (pointer.tx - pointer.x) * (1 - Math.exp(-dt * 3));
    pointer.y += (pointer.ty - pointer.y) * (1 - Math.exp(-dt * 3));
    spin += (spinT - spin) * (reduce ? 1 : 1 - Math.exp(-dt * 2.6));

    const H = worldH(), W = H * camera.aspect;
    const idle = reduce ? 0 : 1;
    tooth.position.set(cur.x * W, cur.y * H + Math.sin(t * 0.9) * 0.035 * idle, 0);
    const sc = cur.s * H;
    tooth.scale.setScalar(sc);
    tooth.rotation.set(
      cur.rx + pointer.y * 0.12 + Math.sin(t * 0.6) * 0.04 * idle,
      cur.ry + spin + pointer.x * 0.28 + Math.sin(t * 0.45) * 0.12 * idle,
      cur.rz + Math.sin(t * 0.5) * 0.02 * idle
    );
    rings.scale.setScalar(Math.max(cur.ring, 0.0001));
    rings.visible = cur.ring > 0.01;
    rings.rotation.z = t * 0.35 * idle + 0.3;
    rings.rotation.x = 1.2 + Math.sin(t * 0.4) * 0.15 * idle;
    slats.visible = cur.slats > 0.01;
    slats.children.forEach((s, i) => {
      s.scale.y = Math.max(cur.slats, 0.0001);
      s.position.x = s.userData.base + Math.sin(t * 0.35 + i) * 0.12 * idle + (1 - cur.slats) * (i - 3) * 0.5;
    });
    slats.position.x = tooth.position.x;
    slats.position.y = tooth.position.y;
    slats.rotation.z = -0.5 + Math.sin(t * 0.2) * 0.05 * idle;

    bgMat.uniforms.uTime.value = t;
    bgMat.uniforms.uK.value = cur.glow;
    bgMat.uniforms.uGlow.value.set(0.5 + cur.x, 0.5 + cur.y);
    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }

  return {
    setTarget(p) {
      for (const key of ['x', 'y', 's', 'rx', 'ry', 'rz']) if (p[key] !== undefined) tgt[key] = p[key];
      if (p.mat && p.mat !== preset) applyPreset(p.mat, reduce ? 0 : 1.1);
    },
    jump(p) { this.setTarget(p); Object.assign(cur, tgt); },
    spin(turns = 1) { spinT += Math.PI * 2 * turns; },
    start() { if (running) return; running = true; last = performance.now(); requestAnimationFrame(frame); },
    stop() { running = false; },
    get running() { return running; },
    renderOnce() { const r = running; running = true; frame(performance.now()); running = r; },
    resize
  };
}
