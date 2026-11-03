import fs from 'node:fs';

const dims = JSON.parse(fs.readFileSync(new URL('./img-dims.json', import.meta.url)));

// <picture> con AVIF + JPEG, srcset de todos los anchos generados y width/height del mayor.
export function pic(name, alt, sizes, { cls = '', eager = false, pos = '' } = {}) {
  const set = dims[name];
  if (!set) throw new Error(`Imagen sin medidas: ${name}`);
  const [w, h] = set[set.length - 1];
  const src = (ext) => set.map(([sw]) => `img/${name}-${sw}.${ext} ${sw}w`).join(', ');
  const mid = set.find(([sw]) => sw >= 1000) ?? set[set.length - 1];
  const load = eager ? 'fetchpriority="high"' : 'loading="lazy" decoding="async"';
  const style = pos ? ` style="object-position:${pos}"` : '';
  return `<picture${cls ? ` class="${cls}"` : ''}><source type="image/avif" srcset="${src('avif')}" sizes="${sizes}"><img src="img/${name}-${mid[0]}.jpg" srcset="${src('jpg')}" sizes="${sizes}" width="${w}" height="${h}" alt="${alt}" ${load}${style}></picture>`;
}

export const ALT = {
  doctores: 'Doctores Morelló, con bata blanca',
  'sala-espera': 'Sala de espera de la clínica, con ventanal y plantas',
  box: 'Box de tratamiento de la clínica',
  'box-vertical': 'Sillón del box de tratamiento',
  'logo-pared': 'Logo de Morelló Clínica Dental en la pared de la clínica',
  recepcion: 'Recepción de la clínica, con el logo Morelló',
  'espera-infantil': 'Sala de espera con mesa y sillas infantiles',
  'rincon-infantil': 'Rincón infantil de la sala de espera',
  doctoras: 'Tres doctoras del equipo en el box',
  higienista: 'Higienista atendiendo a una paciente',
  ortodoncia: 'Ortodoncia con brackets',
  estetica: 'Sonrisa: estética dental',
  odontopediatria: 'Niña en una revisión de odontopediatría',
};
