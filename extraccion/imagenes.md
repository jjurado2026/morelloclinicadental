# Inventario de imágenes — Morelló Clínica Dental

- **Fecha de extracción:** 2026-11-03
- **Carpeta:** `assets/originales/img/` (imágenes usadas en páginas) y `assets/originales/img/biblioteca/` (fotos de la biblioteca de medios de WordPress que no aparecen en las páginas actuales, sacadas del `attachment-sitemap.xml`).
- **Criterio de descarga:** siempre el original sin el sufijo de tamaño de WordPress (`-1000x541`, `-300x150`, `-150x150`…); si no existía, la versión más grande del `srcset`. Los fondos del Slider Revolution se sacaron de su `<noscript>` y de la configuración JSON del slider. No hay `<picture>`, ni WebP/AVIF, ni vídeos propios (solo 2 vídeos de YouTube de Align Technology en la página de Invisalign). Iconos (<64 px) y píxeles de seguimiento descartados.
- **Nombre de archivo:** `<página>-<bloque>-<qué es>__<nombre original>.<ext>`.
- **Bloques:** numerados como en `copy/actual/<página>.md`.

Leyenda de la columna «Origen»: **Real** = foto del cliente (su clínica, su equipo); **Stock** = banco de imágenes o material de marca de terceros (Invisalign); **Gráfica** = flyer/anuncio diseñado. Columna «Hero»: ✅ sirve para hero a sangre en escritorio · 🟡 sirve con reservas · — no.

## 1. Home

| Archivo | Bloque (home) | alt | px | KB | Origen | Calidad premium | Hero |
|---|---|---|---|---|---|---|---|
| `home-hero-slide1-doctores-morello__home-morello-clinica-dental-barcelona-family-ok.jpg` | 1 · Hero, slide «Doctores Morelló» | (vacío) | 1919×905 | 66 | **Real** — Dr. Joan Morelló y una doctora (bata blanca) sobre fondo blanco; mitad derecha vacía para el texto | Retrato profesional, buena luz; **JPEG muy comprimido** (66 KB para 1919 px) y composición pensada para el slider | 🟡 (mejor la versión `equipo-og-image`, misma sesión y más resolución) |
| `home-hero-slide2-sonrisas-sanas__home-slide-morello03-1919x905.jpg` | 1 · Hero, slide «SONRISAS SANAS» | (vacío) | 1919×905 | 511 | **Stock** (sonrisa de mujer) montado sobre una foto real desenfocada de la recepción | Montaje evidente, sonrisa genérica | — |
| `home-banner-odontopediatria-nina__Tratamientos-odontopediatria-morello.jpg` (2018) | 3 · Banner «Odontopediatría» | Odontopediatría \| Morelló Clínica Dental en Barcelona | 1080×541 | 160 | **Stock** (niña con espejo dental) | Resolución corta para banner a sangre (se ve a 1440 px ampliada) | — |
| `home-especialistas-ortodoncia-brackets__Tratamientos-ortodoncia-brackets.jpg` | 4 · Tarjeta ORTODONCIA | Ortodoncia - Brackets \| Morelló Clínica Dental en Barcelona | 1080×541 | 185 | **Stock** (render/foto de brackets) | Genérica | — |
| `home-especialistas-estetica-sonrisa__Tratamientos-estetica-dental.jpg` | 4 · Tarjeta ESTÉTICA DENTAL | Estética Dental - Sonrisas \| Morelló Clínica Dental en Barcelona | 1080×541 | 190 | **Stock** (sonrisa) | Genérica | — |
| `home-especialistas-odontopediatria__Tratamientos-odontopediatria-morello.jpg` (2016) | 4 · Tarjeta ODONTOPEDIATRÍA | Odontopediatría \| Morelló Clínica Dental en Barcelona | 1080×541 | 160 | **Stock** (misma niña que el banner) | Genérica, repetida en la misma página | — |
| `home-banner-invisalign__invisalign-morello-barcelona.jpg` | 5 · Banner «Ortodoncia invisible» | Ortodoncia Invisible Invisalign® \| Morelló Clínica Dental en Barcelona | 906×559 | 97 | **Stock / material de marca Invisalign** (dos perfiles, brackets vs. alineador, logo Invisalign) | Baja resolución para un banner de 960 px de alto a sangre: se ve pixelada | — |
| `home-banner-equipo-doctoras__Morello-clinica-dental-2019_V7A9526-ok.jpg` | 7 · Banner «Nuestro Equipo» | (vacío) | 1800×1200 | 123 | **Real** — tres doctoras en el box, uniforme con logo | Buena luz y naturalidad; resolución justa para retina | ✅ |
| `home-donde-estamos-recepcion__morello-clinica-dental-barcelona.jpg` | 8 · ¿Dónde estamos? | Morelló Clínica Dental Barcelona | 962×559 | 98 | **Real** — recepción con logo en la pared | Correcta pero pequeña (existe la misma foto a 2694 px: `la-clinica-recepcion`) | — |
| `home-twitter-image__…estetica-dental-ortodoncia-implantes.jpg` | `twitter:image` de la home (no hay `og:image`) | — | 1500×787 | 608 | **Stock** (sonrisa) con logo como marca de agua | Genérica | — |

## 2. Tratamientos (listado y páginas de cada tratamiento)

| Archivo | Página · bloque | alt | px | KB | Origen | Calidad premium | Hero |
|---|---|---|---|---|---|---|---|
| `tratamientos-conservadora__odontologia-conservadora-endodoncia-morello-barcelona.jpg` | tratamientos · 2 (Conservadora) | Odontología Conservadora - Endodoncia \| … | 1080×541 | 118 | Stock | Genérica | — |
| `home-especialistas-estetica-sonrisa__…` | tratamientos · 2 (Estética dental); estética · 2 | (ver home) | | | Stock | | — |
| `tratamientos-implantes__Tratamientos-implantes-dentales.jpg` | tratamientos · 2 (Implantología); implantes · 3 | Implantes dentales \| … | 1080×541 | 85 | Stock (render 3D de implante) | Genérica | — |
| `tratamientos-atm-ferulas__Tratamientos-ferulas-de-descarga-morello.jpg` | tratamientos · 2 (ATM) | Férulas de descarga \| … | 1080×541 | 133 | Stock (férula azul) | Genérica | — |
| `tratamientos-periodoncia__Tratamientos-periodoncia-barcelona-morello.jpg` | tratamientos · 3 (Periodoncia); periodoncia · 2 | Periodoncia \| … | 1080×541 | 201 | Stock | Genérica | — |
| `tratamientos-cirugia-oral__Tratamientos-cirugia-oral-morello.jpg` | tratamientos · 3 (Cirugía oral) | Cirugía Oral \| … | 1080×541 | 161 | Stock (instrumental) | Genérica | — |
| `home-especialistas-ortodoncia-brackets__…` / `home-especialistas-odontopediatria__…` | tratamientos · 3; ortodoncia · 2; odontopediatría · 2 | (ver home) | | | Stock | | — |
| `ortodoncia-anuncio-fb__fb-morello-001-ad-ortodoncia.jpg` | ortodoncia · 3 | ortodoncia-en-barcelona-sant-gervasi | 1500×787 | 500 | **Gráfica** de anuncio de Facebook: fotos intraorales «antes/después» con logo Morelló y la URL. **Probable caso real** de la clínica (sin confirmar) | Pieza publicitaria, no editorial | — |
| `invisalign-cabecera__invisalign-barcelona-morello.jpg` | invisalign · 2 | Ortodoncia Invisible Invisalign® \| … | 800×300 | 32 | Material de marca Invisalign | Baja resolución | — |
| `invisalign-contenido-1__ortodoncia-invisible-barcelona-morello.jpg` | invisalign · 4 | Invisalign: Ortodoncia Invisible \| … | 323×195 | 39 | Stock / Invisalign | Muy pequeña | — |
| `invisalign-contenido-2__morello-barcelona-ortodoncia-invisalign-1.jpg` | invisalign · 4 | Ortodoncia Invisible Invisalign® \| … | 1920×720 | 54 | Material de marca Invisalign («The Clear Alternative to Braces») | Muy comprimida | — |
| `estetica-flyer-promo-verano-2018__flyer-morello-verano-promo-2018-2.png` | estética dental · 2 | flyer-morello-verano-promo-2018-2 | 1748×1240 | 441 | **Gráfica** promo «Este verano luce tu mejor sonrisa» (blanqueamiento + higiene, 2018) | Caducada (2018) | — |
| `blanqueamiento-contenido-1__blanqueamiento-dental-en-arrasate.jpg` | blanqueamiento · 3 | Blanqueamiento Dental en Barcelona | 1200×803 | 74 | Stock (guía de color; el nombre del archivo es de otra ciudad, «arrasate») | Genérica | — |
| `blanqueamiento-contenido-2__blanqueamiento-dental-barcelona-morello.jpg` | blanqueamiento · 4 | Blanqueamiento Dental en Barcelona | 800×533 | 46 | Stock (férula de blanqueamiento) | Genérica | — |
| `protesis-pareja-sonrisa__protesis-adultos-sonrisa-pareja.jpeg` | prótesis · 2 | Prótesis Dentales \| … | 920×409 | 67 | Stock (pareja mayor) | Genérica | — |
| `protesis-esquema-fija-removible__protesis-fija-removible-implantes.png` | prótesis · 2 | Tipos de Prótesis Dentales \| … | 1159×301 | 169 | Ilustración/render de tipos de prótesis | Didáctica | — |
| `conservadora-cabecera__odontologia-conservadora-endodoncia-clinica-dental-morello-barcelona.jpg` | conservadora · 2 | Odontología Conservadora - Endodoncia \| … | 1080×541 | 67 | Stock (paciente sonriendo en sillón) | Genérica | — |
| `endodoncia-sonrisa__Smile.jpg` | endodoncia · 2 | Morelló Clínica Dental Barcelona | 1600×1002 | 958 | Stock (sonrisa) | Genérica, muy pesada (958 KB) | — |

## 3. Clínica, equipo, cita y galerías

| Archivo | Página · bloque | alt | px | KB | Origen | Calidad premium | Hero |
|---|---|---|---|---|---|---|---|
| `la-clinica-recepcion__fb-portada-morello-01.jpg` | la-clinica · 2; galerías | Recepción - Morelló Clínica Dental en Barcelona Sarria Sant Gervasi | 2694×1564 | 2429 | **Real** — recepción blanca con logo en la pared, parquet, cactus | Buena; pesa 2,4 MB (hay que optimizar) | ✅ |
| `cita-online-cabecera__20190517-…-cita-online.jpg` | cita-online · 2 | morello-clinica-dental-dentista-barcelona-esplugues-cita-online | 1500×787 | 76 | **Real** — box con sillón; **la imagen está volteada en espejo** (el logo de la pared se lee al revés: «ollerom») | Correcta pero con el logo invertido | — |
| `equipo-dr-joan-morello__Dr-Joan-Morello-Cubells.jpg` | equipo · 3; ficha Dr. Joan Morelló | Dr. Joan Morelló Cubells \| Equipo \| Morello Clínica Dental en Barcelona | 783×765 | 32 | **Real** — retrato fundador | Retrato limpio, fondo claro; tamaño de ficha | — |
| `equipo-dra-carmen-morello__Dra-Carmen-Morello-odontologa-02.jpg` | equipo · 6; ficha | Dra-Carmen-Morello-odontologa-02 | 700×684 | 57 | **Real** | Serie homogénea (mismo fondo y uniforme) | — |
| `equipo-dra-maria-nart__Dra-Maria-Nart-Molina-2020.jpg` | equipo · 6; ficha | Dra-Maria-Nart-Molina-2020 | 700×684 | 43 | **Real** | Igual | — |
| `equipo-dra-maria-estivalez__Dra-Maria-Estivalez-odontologa-2jpg.jpg` | equipo · 6; ficha | Dra-Maria-Estivalez-odontologa | 700×684 | 35 | **Real** | Igual | — |
| `equipo-dra-carla-mozas__dra-carla-m-periodoncia-en-barcelona-clinica-dental-morello.jpg` | equipo · 6; ficha | dra-carla-m-periodoncia-en-barcelona-clinica-dental-morello | 700×684 | 43 | **Real** (2026) — uniforme turquesa y lupas: no sigue la serie | Distinta luz/estilo que el resto | — |
| `equipo-higienista-eli__higienista-eli-…-esplugues.jpg` | equipo · 8 | higienista-eli-morello-clinica-dental-barcelona-esplugues | 700×684 | 27 | **Real** | Serie homogénea | — |
| `equipo-higienista-gemma__gemma-higienista-auxiliar-dental-barcelona.jpg` | equipo · 8 | gemma-higienista-auxiliar-dental-barcelona | 700×684 | 20 | **Real** | Serie homogénea | — |
| `equipo-og-image__Morello-clinica-dental-779-2_V7A7576-ok.jpg` | `og:image` de /equipo/ | — | 2052×1368 | 108 | **Real** — Dr. Joan Morelló y doctora, fondo blanco | Buena, profesional | ✅ (composición lateral para texto) |
| `galeria-clinica-029__Morello029_V7A1298.jpg` | galería «La Clínica Nueva»; /la-clinica/photo-gallery/ | Morelló Clínica Dental en Barcelona Sarria Sant Gervasi | 4104×2736 | 264 | **Real** — logo en la pared, primer plano | Foto profesional 2018 | ✅ |
| `galeria-clinica-040__Morello040_V7A1318.jpg` | ídem | Sala de espera infantil - … | 4104×2736 | 360 | **Real** — rincón infantil + sillas | Profesional | 🟡 |
| `galeria-clinica-041__Morello041_V7A1319.jpg` | ídem | Sala de espera - … | 4104×2736 | 721 | **Real** — sala de espera con ventanal y vegetación, luz natural | Profesional, la más «editorial» | ✅ |
| `galeria-clinica-046__Morello046_V7A1324.jpg` | ídem | Box principal - … | 2699×1799 | 283 | **Real** — box con sillón y ventana | Profesional | ✅ |
| `galeria-clinica-050__Morello050_V7A1340.jpg` | ídem | Box principal - … | 2267×2736 | 314 | **Real** — box, vertical | Profesional (vertical, útil en móvil) | 🟡 (móvil) |
| `galeria-hospital-g10__G10.jpg`, `…g11__G11.jpg`, `…g12__G12.jpg` | /galeria/ · álbum «La Clínica» (2017) | Morelló Clínica Dental en Barcelona | 800×534–556 | 56–60 | **Real** — instalaciones antiguas (sala con diplomas, box anterior) | Baja resolución y estética antigua | — |

## 4. Biblioteca de medios (no se usan hoy en páginas)

| Archivo | px | KB | Origen | Valoración | Hero |
|---|---|---|---|---|---|
| `biblioteca/biblioteca-clinica-001__Morello001_V7A1266.jpg` | 4104×2736 | 2300 | **Real** — cinco profesionales en uniforme (azul/turquesa) en la recepción | Profesional; **comprobar si el equipo sigue siendo el actual** | ✅ |
| `biblioteca/biblioteca-clinica-043__Morello043_V7A1321.jpg` | 4104×2736 | 471 | **Real** — recepción | Profesional | ✅ |
| `biblioteca/biblioteca-clinica-035__Morello035_V7A1306.jpg` | 4104×2736 | 1461 | **Real** — mesa y sillas infantiles | Profesional (detalle) | 🟡 |
| `biblioteca/biblioteca-clinica-051__Morello051_V7A1341-3.jpg` | 433×712 | 230 | **Real** (recorte vertical) | Pequeña | — |
| `biblioteca/biblioteca-clinica-higienista-con-paciente__Morello-barcelona-clinica-dental.jpg` | 1097×959 | 637 | **Real** — higienista con paciente y monitor con radiografía | Buena para bloque, corta para hero | — |
| `biblioteca/biblioteca-invisalign-anuncio-fb__fb-morello-003-ad-invisalign-ortodoncia-invisible.jpg` | 1347×707 | 559 | **Real** (misma sesión: tratamiento con paciente) con logo en marca de agua | Anuncio | — |
| `biblioteca/biblioteca-cita-online-v1__…-cita-online.jpg` | 1080×1080 | 51 | **Real** — box | Cuadrada, pequeña | — |
| `biblioteca/biblioteca-clinica-esplugues__morello-clinica-dental-esplugues.jpg` | 962×559 | 68 | **Real** — recepción de **otra sede (Esplugues)**, sillas azules | No corresponde a la clínica actual de Muntaner | — |
| `biblioteca/biblioteca-dra-carmen-morello-2016__…`, `…-dra-maria-estivalez-2016__…`, `…-dra-maria-nart-2016__…`, `…-higienista-01-2016__…`, `…-higienista-02-2016__…` | 783×765 | 273–323 | **Real** — retratos antiguos (2016) con el logo de fondo | Sesión anterior, estilo distinto | — |
| `biblioteca/biblioteca-dra-carmen-morello-v1__…`, `…-dra-maria-estivalez-v1__…` | 700×684 | 35 | **Real** — versiones previas de los retratos actuales | — | — |
| `biblioteca/biblioteca-banner-titulo__banner-titulo-morello.jpg` | 1280×300 | 22 | Gráfica: banda blanca con el símbolo desvaído | Antigua cabecera | — |
| `biblioteca/biblioteca-tratamiento-conservadora-antiguo__…`, `…-invisalign-tratamientos__…`, `…-invisalign-2__…` | 620–1080 | 19–121 | Stock / Invisalign | — | — |
| `biblioteca/biblioteca-flyer-verano-2018-vol2__…`, `…-blanqueamiento-promo-2018__…` | 1500–1748 | 216–743 | Gráfica promocional 2018 | Caducada | — |
| `biblioteca/biblioteca-epi-covid__…` | 408×700 | 12 | Ilustración EPI COVID-19 | Caducada | — |

## 5. Resumen

- **Total descargado:** 66 imágenes (44 en `img/`: las usadas en páginas más la `og:image` de /equipo/ y la `twitter:image` de la home; 22 en `img/biblioteca/`), unos 19 MB, + 4 logos en `assets/originales/`.
- **Reales del cliente y con calidad para un hero a sangre:** `galeria-clinica-041` (sala de espera con ventanal), `galeria-clinica-046` (box), `galeria-clinica-029` (logo en pared), `la-clinica-recepcion` (recepción, 2694 px), `biblioteca-clinica-043` (recepción), `biblioteca-clinica-001` (equipo de 5, a confirmar vigencia), `home-banner-equipo-doctoras` (3 doctoras, 1800 px) y `equipo-og-image` (Dr. Joan + doctora, 2052 px). Todas son de la sesión profesional de 2018–2019: luz natural, interiores blancos, parquet, toques de verde.
- **Retratos del equipo:** serie homogénea de 700×684 px (fondo claro, uniforme azul marino con logo), salvo la Dra. Carla Mozas (2026, uniforme turquesa con lupas). Sirven para fichas y rejilla, no para gran formato.
- **Stock:** todas las imágenes de tratamientos (brackets, sonrisas, niña, implantes, férulas, instrumental, prótesis, blanqueamiento) y el slide «SONRISAS SANAS». Muchas se repiten entre páginas y varias son de baja resolución para el tamaño al que se muestran (banners de 960 px de alto con imágenes de 906–1080 px de ancho).
- **Lo que falta para un rediseño premium:** fotos reales de tratamientos (detalle de manos, tecnología, escáner/radiografía), fachada o portal de Muntaner 571, retratos actualizados en una sola sesión y en horizontal, y fotos de pacientes con consentimiento. Sin material: dirigirlo con Higgsfield (sin presentarlo como real) o placeholders etiquetados.
- **Problemas detectados en las imágenes:** sin WebP/AVIF; pesos sin optimizar (2,4 MB la recepción, 958 KB una sonrisa de stock); alts autogenerados con el nombre del archivo en el equipo y en la cita online; foto de la cita online volteada (logo al revés); imagen de blanqueamiento nombrada «arrasate» (otra ciudad); `noimage.jpg` del tema en el álbum «Hospital» de /galeria/.
