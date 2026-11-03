# Mapa del sitio y estructura de bloques — morelloclinicadental.com

- **Fecha de extracción:** 2026-11-03
- **Fuentes:** `robots.txt` (solo declara `page-sitemap.xml`), `sitemap_index.xml` (Yoast; `/wp-sitemap.xml` y `/sitemap.xml` redirigen a él), `page-sitemap.xml` (16 URLs), `dt_team-sitemap.xml` (7), `dt_gallery-sitemap.xml` (4), `dt_team_category` (3), `dt_gallery_category` (2), `attachment-sitemap.xml` (60 páginas de adjunto), `post-sitemap.xml` (vacío: **no hay blog**), menú y pie de la home.
- Copy literal de cada página en `copy/actual/<archivo>.md` (indicado en la tabla). Elementos comunes (barra superior, cabecera, menú, botones flotantes, pie, banner de cookies) en `copy/actual/_global.md`.

## 1. Inventario de páginas (31 extraídas)

| # | URL | `<title>` | Copy |
|---|---|---|---|
| 1 | / | Morelló Clínica Dental \| Especialistas en ortodoncia, estética e implantes. | `home.md` |
| 2 | /tratamientos/ | Tratamientos dentales \| Morelló Clínica Dental en Barcelona | `tratamientos.md` |
| 3 | /tratamientos/ortodoncia/ | Ortodoncia convencional y estética en Barcelona \| Morelló Clínica Dental | `tratamientos-ortodoncia.md` |
| 4 | /tratamientos/ortodoncia-invisible-invisalign/ | Ortodoncia Invisible Invisalign en Barcelona \| Morelló Clínica Dental | `tratamientos-ortodoncia-invisible-invisalign.md` |
| 5 | /tratamientos/estetica-dental/ | ▷ Estética Dental \| Carillas Dentales en Barcelona | `tratamientos-estetica-dental.md` |
| 6 | /tratamientos/blanqueamiento-dental-barcelona/ | Blanqueamiento Dental \| Morelló Clínica Dental en Barcelona | `tratamientos-blanqueamiento-dental.md` |
| 7 | /tratamientos/odontopediatria/ | Odontopediatría \| Morelló Clínica Dental Barcelona | `tratamientos-odontopediatria.md` |
| 8 | /tratamientos/implantes-dentales/ | Implantes Dentales \| Morelló Clínica Dental en Barcelona | `tratamientos-implantes-dentales.md` |
| 9 | /tratamientos/protesis-dental/ | Prótesis Dental \| Morelló Clínica Dental en Barcelona | `tratamientos-protesis-dental.md` |
| 10 | /tratamientos/odontologia-conservadora/ | Odontología Conservadora \| Morelló Clínica Dental en Barcelona | `tratamientos-odontologia-conservadora.md` |
| 11 | /tratamientos/periodoncia/ | Periodoncia \| Morelló Clínica Dental en Barcelona. Su boca, su sonrisa! | `tratamientos-periodoncia.md` |
| 12 | /tratamientos/endodoncia/ | Endodoncia \| Morelló Clínica Dental en Barcelona | `tratamientos-endodoncia.md` |
| 13 | /cita-online/ | Pida ahora una Cita Online \| Morelló Clínica Dental en Barcelona | `cita-online.md` |
| 14 | /equipo/ | Equipo Humano \| Morelló Clínica Dental en Barcelona | `equipo.md` |
| 15 | /la-clinica/ | La clínica \| Morelló Clínica Dental en Barcelona | `la-clinica.md` |
| 16 | /la-clinica/photo-gallery/ (enlazada en el menú, **no está en el sitemap**) | Galería de fotos \| Morelló Clínica Dental | `la-clinica-galeria-de-fotos.md` |
| 17 | /contacto/ | Contacto \| Morelló Clínica Dental en Barcelona | `contacto.md` |
| 18–24 | /equipo-clinico/dr-joan-morello/, /dra-carmen-morello/, /dra-maria-nart/, /dra-maria-estivalez/, /dra-carla-mozas/, /higienista-dental-eli/, /higienista/ | «<Nombre> \| Morelló Clínica Dental» | `equipo-clinico-*.md` |
| 25 | /galeria/ (archivo de álbumes, no enlazado en menú) | Álbumes de fotos archivo \| Morelló Clínica Dental | `galeria-archivo-albumes.md` |
| 26 | /galeria/la-clinica-nueva/ | Galería de fotos \| Morelló Clínica Dental en Barcelona Sarria Sant Gervasi | `galeria-la-clinica-nueva.md` |
| 27 | /politica-de-privacidad/ | Política de Privacidad \| Morelló Clínica Dental | `legal-politica-de-privacidad.md` |
| 28 | /politicas-de-cookies/ | Políticas de Cookies \| Morelló Clínica Dental | `legal-politicas-de-cookies.md` |
| 29 | /aviso-legal/ (**no enlazada ni en el sitemap**) | Aviso Legal \| Morelló Clínica Dental | `legal-aviso-legal.md` |
| 30 | /gracias/ (destino tras enviar formularios) | Gracias \| Morelló Clínica Dental | `gracias.md` |
| 31 | 404 (cualquier URL inexistente) | Página no encontrada \| Morelló Clínica Dental | `pagina-404.md` |

**No extraídas (plantillas repetidas o sin contenido):** /galeria/hospital/ y /galeria/la-clinica/ (álbumes antiguos, mismas fotos que /galeria/), /equipo-clinico/ (archivo), /dt_team_category/{especialistas,fundador,higienistas}/, /dt_gallery_category/{la-clinica,la-clinica-2018}/, /author/webmaster/ (redirige a la home) y las 60 páginas de adjunto del `attachment-sitemap.xml` (una por imagen; están indexables).

## 2. Navegación

### Menú principal (escritorio: horizontal, centrado; móvil: hamburguesa → panel lateral derecho)

```
Tratamientos ▾                         → /tratamientos/
  Ortodoncia                           → /tratamientos/ortodoncia/
  Ortodoncia Invisible Invisalign® en Barcelona → /tratamientos/ortodoncia-invisible-invisalign/
  Estética Dental                      → /tratamientos/estetica-dental/
  Blanqueamiento Dental                → /tratamientos/blanqueamiento-dental-barcelona/
  Odontopediatría                      → /tratamientos/odontopediatria/
  Implantes Dentales                   → /tratamientos/implantes-dentales/
  Prótesis Dental                      → /tratamientos/protesis-dental/
  Odontología Conservadora             → /tratamientos/odontologia-conservadora/
  Periodoncia                          → /tratamientos/periodoncia/
  Endodoncia                           → /tratamientos/endodoncia/
[icono calendario] Cita Online         → /cita-online/
Equipo Humano                          → /equipo/
La clínica ▾                           → /la-clinica/
  La clínica                           → /la-clinica/
  Galería de fotos                     → /la-clinica/photo-gallery/
  Política de Privacidad               → /politica-de-privacidad/
Contacto                               → /contacto/
                                   [lupa] Buscar (caja emergente)
```

- Barra superior (azul #003b5c, alineada a la derecha): teléfono «934 182 129» · dirección «Carrer de Muntaner, 571 - 2ºC, 08022 Barcelona» (→ Google Maps) · iconos Instagram y Facebook.
- Cabecera blanca de 100 px con sombra: logo a la izquierda, menú centrado, «Buscar» a la derecha. Al hacer scroll aparece una cabecera fija («phantom header»). El ítem activo se pinta con fondo cian y texto blanco.
- Menú móvil: logo grande + «Buscar» + hamburguesa; el panel trae los mismos enlaces (submenús con «+»), el teléfono y los iconos sociales (casi invisibles, gris muy claro sobre blanco).
- Botones flotantes fijos a la derecha en todas las páginas: calendario (cian, «Solicite una cita ahora» → /cita-online/ con UTM) y teléfono (azul, «Llamar a Clínica Barcelona»).

### Pie (fondo #1a1c20, una sola línea)

- Izquierda: «Morelló Clínica Dental © 2017 - 2026. Reservados todos los derechos.»
- Derecha: «Diseño web y SEO por Docmedia Marketing Dental» (enlace a docmedia.es).
- No hay logo, NAP, horario, menú, redes ni enlaces legales en el pie. Botón «volver arriba» fijo abajo a la derecha.

## 3. HOME — bloques en orden (a 1440 px; alto total ≈ 7 980 px)

| # | Bloque | Contenido | Imágenes | Botones / enlaces | Layout y fondo |
|---|---|---|---|---|---|
| 0 | Barra superior + cabecera | Ver §2 | Logo PNG 270×91 | Menú, teléfono, mapa, redes, buscar | Barra azul #003b5c 36 px + cabecera blanca 100 px |
| 1 | **Hero: Slider Revolution «the7-medical-hero»** | 2 slides con fundido cada ~10 s (hay un 3.er slide vacío sin publicar). **Slide 1:** titular «Doctores Morelló» (Roboto Slab bold 65 px, azul) + franja cian con «EXCELENCIA ODONTOLÓGICA CON UN TRATO CERCANO» (el texto se sale de la franja: «CERCANO» cae encima del botón). **Slide 2:** «SONRISAS SANAS» + franja cian «PARA TODA LA FAMILIA» (el texto desborda la franja por la derecha). | Slide 1: foto real del Dr. Joan Morelló y una doctora con bata, a la izquierda sobre fondo blanco. Slide 2: sonrisa de stock montada sobre la recepción desenfocada. | Botón contorno azul «Pida una cita ahora» (slide 1) y «Ver tratamientos» (slide 2); con JS, **ambos enlazan a la home**. Sin flechas ni puntos visibles. | A sangre, 679 px de alto a 1440 (156 px a 390). Texto alineado a la derecha sobre la zona clara de la foto. **Solo se pinta si el usuario acepta las cookies**; si no, queda un hueco blanco de 100 px. |
| 2 | **Intro + 3 accesos** | H1 «Clínica Dental de referencia en Barcelona» (centrado, 2 líneas, Arial 300 44 px azul) + 2 párrafos centrados (fundación 1982 y «clínica familiar…»). Debajo, 3 tarjetas: «SOBRE NOSOTROS», «EL EQUIPO», «CITA ONLINE» (H3 blanco en mayúsculas). | Iconos de línea blancos dentro de un círculo (edificio/hospital, grupo de personas, calendario) — fuente de iconos, no imágenes | «Más información» → /la-clinica/ · «Nuestros doctores» → /equipo/ · «Pida una cita» → /cita-online/ (botones pequeños con borde blanco) | Fondo gris #f4f4f4; tarjetas azul #003b5c en 3 columnas iguales (≈373 px) con 30 px de separación; contenedor 1260 px. ≈727 px de alto. |
| 3 | **Banner «Odontopediatría»** (Slider Revolution «home-odontopediatria», 1 slide) | Titular «Odontopediatría» (serif blanco grande, centrado abajo) + franja cian «EL CUIDADO DE HOY, LA SONRISA DE MAÑANA» | Stock: niña sonriendo en el sillón con espejo dental (1080×541 ampliada) | «Más información» → /tratamientos/odontopediatria/ (queda cortado por el borde inferior) | A sangre, 960 px de alto a 1440. Solo con cookies aceptadas. |
| 4 | **Somos Especialistas** | H2 «Somos Especialistas» + párrafo («devoción por la salud bucodental… más de 30 años»). 3 columnas: ORTODONCIA, ESTÉTICA DENTAL, ODONTOPEDIATRÍA (H2 azul en mayúsculas, enlazado) con texto justificado y enlace «Ver más» cian. | 3 fotos de stock 300×150 (brackets, sonrisa, niña — la misma del bloque 3) | 3× «Ver más»; botón sólido azul centrado «CONSULTE TODOS LOS TRATAMIENTOS QUE REALIZAMOS» → /tratamientos/ | Fondo blanco, 80 px de padding vertical, 3 columnas. ≈825 px. |
| 5 | **Banner «Ortodoncia invisible»** (Slider Revolution «home-invisalign») | «Ortodoncia invisible» + franja cian «LA CLARA ALTERNATIVA A LOS BRACKETS» | Material de marca Invisalign: dos perfiles (brackets / alineador) con logo «invisalign» en el centro (906×559, se ve pixelada) | «Más información» → /tratamientos/ortodoncia-invisible-invisalign/ | A sangre, 960 px. Solo con cookies aceptadas. |
| 6 | **Banda CTA** | H2 «¿Está listo para realizar una consulta?» + «Su tratamiento será realizado por nuestro equipo de especialistas. Pida una cita previa ahora!» | — | Botón contorno blanco «Contacte hoy mismo!» → /contacto/ | Fondo azul #003b5c a sangre, texto a la izquierda y botón a la derecha, 40 px de padding. ≈252 px. |
| 7 | **Banner «Nuestro Equipo»** (Slider Revolution «equipo-home6») | «Nuestro Equipo» + franja cian «CONOCIMIENTOS, EXPERIENCIA, CERCANÍA» | Foto real: tres doctoras en el box (1800×1200) | «Entre a conocernos» → /equipo/ | A sangre, 960 px. Solo con cookies aceptadas. |
| 8 | **¿Dónde estamos?** | H2 «¿Dónde estamos?»; caja con cabecera azul «Morelló Clínica Dental BARCELONA» (H3 blanco), foto, «Llame ahora» y el teléfono en 60 px; mapa | Foto real de la recepción con el logo (962×559) | Teléfono `tel:` «934 182 129»; iframe de Google Maps (350 px, *lazy*) | Fondo blanco, contenido centrado en columna; la fila mide ≈1 400 px. |
| 9 | Separador | Fila vacía con una línea fina azul | — | — | ≈111 px |
| 10 | **Solicite Información** | H2 «Solicite Información» + párrafo («Rellene el siguiente formulario o llame al teléfono +34 934 182 129…»). Formulario: Nombre *, Correo electrónico *, Teléfono de contacto *, Mensaje, casilla de privacidad, «Enviar». | — | «Enviar» (fondo cian, texto gris claro); enlace a política de privacidad | Caja azul #003b5c centrada con labels gris claro y campos blancos a ancho completo. ≈777 px. |
| 11 | Pie | Ver §2 | — | Docmedia | Banda #1a1c20 |

Notas de la home:
- Bloques a sangre: 1, 3, 5, 6, 7 (y el fondo gris del 2). El resto va en contenedor de 1260 px.
- 4 sliders de Slider Revolution en una sola página (hero + 3 banners de 960 px de alto que hacen de separadores visuales).
- En móvil (390 px) los sliders se escalan en bloque: el hero mide 156 px y su subtítulo baja a 6 px. Los botones flotantes tapan el texto del lateral derecho.
- No hay testimonios, cifras destacadas, logos de confianza, horario ni bloque de «por qué elegirnos».

## 4. Resto de páginas — bloques en orden

Todas las páginas interiores comparten: barra superior + cabecera + **cabecera de página** (H1 centrado en azul, a veces con H2 cian de subtítulo y migas casi invisibles en gris claro) + contenido + pie. Las de tratamiento terminan casi siempre en un formulario dentro de una caja azul.

### /tratamientos/
1. Cabecera: H1 «NUESTROS TRATAMIENTOS».
2. Rejilla de 4 tarjetas (imagen 1000×541 + H2 + botón «Ver más»): Conservadora, Estética dental, Implantología, **ATM (Ver más → #)**.
3. Rejilla de 4 tarjetas: Periodoncia, **Cirugía oral (Ver más → #)**, Ortodoncia, Odontopediatría.
- Faltan en el listado: Invisalign, Blanqueamiento, Prótesis y Endodoncia (sí están en el menú). No hay textos descriptivos.

### Páginas de tratamiento (plantilla común)
- **Ortodoncia:** 1 cabecera · 2 imagen (brackets) + cita destacada en cian «"Una buena sonrisa es sinónimo de salud."» · 3 texto: intro + botón «Pide una cita o infórmate» (→ #contacto) + H2 «TIPOS DE ORTODONCIA» (lista) + H3 «Brackets convencionales» + H3 «Brackets de autoligado» + imagen antes/después · 4 «Otros tratamientos estéticos» (lista de 6 en 2 columnas) · 5 formulario de cita (caja azul, 2 columnas).
- **Ortodoncia invisible Invisalign:** 1 cabecera (H1 «Ortodoncia Invisible en Barcelona», H2 «Invisalign ®») · 2 imagen de marca · 3 cita «"Ortodoncia invisible alternativa a los brackets"» · 4 «¿Qué es Invisalign?» + 2 imágenes · 5 «¿Cómo funciona Invisalign?» · 6 dos vídeos de YouTube de Align («Ver el video de cómo funciona» / «Ver el video de un caso real») · 7 separador · 8 formulario de contacto.
- **Estética dental:** 1 cabecera · 2 cita + intro + flyer promo verano 2018 + «Tipos de carillas dentales» + «¿Qué carillas dentales son las mejores?» + «Otros tratamientos estéticos» · 3 separador · 4 «Pida una cita» + formulario.
- **Blanqueamiento dental:** 1 cabecera (H2 «Luce la mejor sonrisa») · 2 cita «"Luce tu mejor sonrisa"» + texto · 3 imagen + texto · 4 imagen + texto · 5 «Infórmese y solicite una cita previa» + formulario de cita.
- **Odontopediatría:** 1 cabecera (H2 «Odontología infantil») · 2 imagen + cita · 3 «¿Qué es la odontopediatría?», «¿Cuándo llevar a los niños…?», «¿Cada cuánto realizar la revisión…?» · 4 separador · 5 «Pida una cita» (H2 enlazado a `href=""`) + formulario de cita.
- **Implantes dentales:** 1 cabecera · 2 separador · 3 imagen + cita «"Contamos con más de 20 años…"» + «¿Qué es un implante dental?» + «¿Cómo se desarrolla un tratamiento…?» · 4 botón «PIDA UNA CITA E INFÓRMESE» · 5 «Solicite Información» + formulario.
- **Prótesis dental:** 1 cabecera · 2 cita + texto + 2 imágenes + «¿Cuántos tipos de prótesis existen?» · 3 separador · 4 formulario.
- **Odontología conservadora:** 1 cabecera · 2 imagen + cita + texto + «Sobre la odontología conservadora» · 3 separador · 4 formulario.
- **Periodoncia:** 1 cabecera · 2 imagen + cita + texto (gingivitis / periodontitis, lista). **Sin formulario ni CTA.**
- **Endodoncia:** 1 cabecera · 2 imagen + cita + texto (RECIPROC GOLD) · 3 separador · 4 formulario.

### /cita-online/
1. Cabecera: H1 «PIDA UNA CITA ONLINE» · 2. Imagen del box (real, volteada) + H4 «Solicite ahora una Cita Online…» + formulario de cita (nombre, teléfono, email, fecha, franja mañana/tarde, mensaje).

### /equipo/
1. Cabecera: H1 «Equipo Humano» + H2 cian «Profesionales con alta capacitación y proximidad.» · 2. H2 «Fundador» · 3. Foto del Dr. Joan Morelló (centrada) · 4. Separador · 5. H2 «Especialistas» + párrafo · 6. Rejilla 2×2 de fotos (Dra. Carmen Morelló, Dra. María Nart, Dra. María Estívalez, Dra. Carla Mozas); nombre y extracto solo al pasar el ratón; botón «Cargar más» · 7. H2 «Higienistas» + párrafo · 8. Dos fotos sin nombre visible.

### /equipo-clinico/<persona>/ (7 fichas)
1. Cabecera: H1 nombre + H2 cargo · 2. Foto + H3 «Núm. de colegiada …» + lista de formación. Las de Dr. Joan Morelló, Eli y Gemma solo tienen la foto (o ni eso: las de higienistas están vacías).

### /la-clinica/
1. Cabecera: H1 «LA CLÍNICA» + H2 «Tu clínica dental en Barcelona» · 2. H2 «Bienvenidos a Morelló Clínica Dental» + 3 párrafos + botón «Ver los tratamientos» + foto de la recepción · 3. Banda «¿Listo para realizar una consulta?» + «Contacte hoy mismo!» (→ /cita-online/).

### /la-clinica/photo-gallery/
1. Cabecera: H1 «Galería de Fotos» · 2. Galería de 6 fotos reales (recepción, sala de espera infantil, sala de espera, box ×2, logo).

### /contacto/
1. Cabecera: H1 «CONTACTO» · 2. Dos columnas: a la izquierda, caja gris con «Email» + «Horario de atención»; a la derecha, H2 «Rellene el siguiente formulario y nos pondremos en contacto a la mayor brevedad.» + formulario (fondo blanco, botón cian «Enviar»). Debajo, en la columna derecha: «Clínica Dental Barcelona» + dirección enlazada a Maps + «Teléfono» + **mapa interactivo de Google Maps (API JavaScript, con el símbolo del logo como chincheta)** · 3. Separador.

### /galeria/ y /galeria/la-clinica-nueva/
- /galeria/: archivo de álbumes de la plantilla («Archivo de álbumes:», autor «webmaster», fechas 2016–2018); el álbum «Hospital» muestra la imagen por defecto del tema (`noimage.jpg`).
- /galeria/la-clinica-nueva/: galería de 6 fotos de 2018.

### Legales, gracias y 404
- **Aviso legal / Privacidad / Cookies:** cabecera + texto legal largo.
- **/gracias/:** H1 «Gracias» · H2 «GRACIAS POR SU SOLICITUD.» + texto · H3 «Le invitamos a seguirnos en nuestras redes» + H4 «Morelló en Instagram» / «Morelló en Facebook».
- **404:** plantilla del tema: H1 «Página no encontrada» + segundo H1 «¡Epa! Esta página no la hemos encontrado.» + texto + buscador. No está personalizada.
