# Identidad visual extraída — Morelló Clínica Dental

- **Web:** https://www.morelloclinicadental.com/
- **Fecha de extracción:** 2026-11-03
- **Método:** variables CSS de `:root` (tema The7), `getComputedStyle` con Playwright a 1440 y 390 px, análisis de píxeles del logo y recuento de colores sobre todos los elementos visibles de la home.

---

## 1. Logo

| Archivo (en `assets/originales/`) | Formato | Tamaño | Uso en la web | Notas |
|---|---|---|---|---|
| `logo-original__Logo-Morello-full-1.png` | PNG transparente | 1103×371 px · 61 KB | Original sin recortar del logo horizontal | **La mejor versión disponible.** Usar esta como fuente para vectorizar. |
| `logo__Logo-Morello-full-1-e1526508198444.png` | PNG transparente | 270×91 px · 9 KB | Logo de la cabecera (escritorio y móvil) | Versión recortada/reescalada desde WordPress (sufijo `-e1526…`). Se carga con *lazy load* de LiteSpeed (`src` vacío hasta que corre JS). |
| `logo-simbolo-favicon__Logo-Morello.png` | PNG transparente | 94×96 px · 1 KB | Favicon 16/32 y todos los `apple-touch-icon` (76, 120, 152) | Solo el símbolo (diente/«M»). Se sirve el mismo PNG de 94 px para todos los tamaños. No hay `favicon.ico` propio (la URL redirige, 302). |
| `logo-transparente-2016__logo-morello-transp.png` | PNG | 315×306 px · 7 KB | Biblioteca de medios (no se usa en páginas) | Símbolo en versión desvaída (cian y gris muy claros), probablemente marca de agua. |

- **No hay SVG** en la web (probado `…/Logo-Morello-full-1.svg`: 404). **Hay que vectorizar** el logo a partir del PNG de 1103 px.
- **No existe versión clara/negativa.** El logo es azul marino + cian sobre transparente; sobre fondo oscuro el azul se pierde (comprobado sobre #333). El pie (#1a1c20) no lleva logo.
- **Composición:** símbolo a la izquierda (diente cuyo contorno forma una «M»/«W» con trazo caligráfico: arco superior cian, cuerpo azul marino) + wordmark «morelló» en minúsculas con una slab/serif humanista de trazo grueso, y debajo «CLÍNICA DENTAL» en mayúsculas, sans serif, color cian, con tracking abierto.
- **Colores del logo (muestreo de píxeles del PNG original):** azul marino **#00456D** (≈79 % de los píxeles opacos) y cian **#00C3E0** (≈21 %). Son casi, pero no exactamente, los colores que usa la web en CSS (#003B5C y #05C3DE).
- **og:image:** la home **no tiene `og:image`** (solo `twitter:image` = `assets/originales/img/home-twitter-image__…estetica-dental-ortodoncia-implantes.jpg`, una sonrisa de stock 1500×787 con el logo como marca de agua). Las páginas de tratamientos y de equipo sí tienen `og:image` (la imagen de cabecera de cada una).

---

## 2. Colores

### 2.1 Variables CSS relevantes en `:root` (tema The7, 792 variables en total)

| Variable | Valor |
|---|---|
| `--the7-accent-color` / `--the7-accent-bg-color` | **#05c3de** |
| `--the7-links-color` | #05c3de |
| `--the7-menu-color` / `--the7-floating-menu-color` | **#003b5c** |
| `--the7-btn-bg-color` | #003b5c |
| `--the7-btn-hover-bg-color` / `--the7-btn-border-color` | #05c3de |
| `--the7-btn-color` / `--the7-btn-hover-color` | #ffffff |
| `--the7-base-color` (texto base) | #313131 |
| `--the7-body-bg-color` | #f7f7f7 |
| `--the7-content-boxes-bg` | #f7f7f7 |
| `--the7-header-bg-color` / `--the7-mobile-header-bg-color` | #ffffff |
| `--the7-footer-bg-color` | #1a1c20 |
| `--the7-bottom-color` (texto del pie) | #d8d8d8 |
| `--the7-divider-color` | rgba(51,51,51,0.12) |
| `--the7-mega-menu-title-color` / `--the7-additional-menu-elements-color` | #333333 |
| `--the7-breadcrumbs-border-color` | rgba(130,36,227,0.2) — morado, resto de la plantilla, no se ve |

Además, en estilos de WPBakery (`.vc_custom_*`): `background-color: #003b5c` en las 3 tarjetas de la home, la banda CTA y la caja del formulario. Ultimate Addons pinta la sección intro de la home con `#f4f4f4`.

### 2.2 Colores calculados (home a 1440 px, todos los elementos visibles)

| Hex | Apariciones | Uso |
|---|---|---|
| **#003B5C** | 30 (17 texto, 10 fondo, 3 borde) | **Primario.** Títulos H1/H2, menú, barra superior, tarjetas, banda CTA, caja del formulario, botón «CONSULTE TODOS…», botón «Aceptar todo» de cookies, botón flotante de teléfono. |
| #FFFFFF | 24 (16 texto, 6 fondo, 2 borde) | Fondo de página/cabecera; texto sobre azul. |
| **#05C3DE** | 9 (5 fondo, 4 texto) | **Secundario/acento.** Enlaces «Ver más», franja de los titulares del slider, botón flotante de cita, hover de botones y del menú, activo del menú. Variante #0AC3DE en el botón «Enviar». |
| #313131 | 8 texto | Texto base del tema. |
| #F4F4F4 | 6 (4 texto, 2 fondo) | Fondo de la sección intro (H1) y texto de la barra superior. |
| #D0D0D0 | 6 texto | Labels y texto del botón del formulario sobre azul. |
| #111111 | 3 texto | Párrafos centrados de la intro. |
| #D8D8D8 | 3 texto | Texto del pie. |
| #FDFDFD | 4 fondo | Campos del formulario. |
| #EBEBEB | 2 borde | Bordes de campos. |
| #1A1C20 | 1 fondo | Pie. |
| #F7F7F7 | — | Fondo de `body` (no se llega a ver: `#page` es blanco). |

**Lectura de la paleta:**
- **Primario:** azul marino **#003B5C** (en el logo, #00456D).
- **Secundario / acento:** cian **#05C3DE** (en el logo, #00C3E0).
- **Neutros:** blanco #FFFFFF, gris de sección #F4F4F4, texto #313131 / #111111, pie #1A1C20.
- No hay más colores de marca (ni cálidos ni de estado). El slider usa también #003B5C para títulos y #05C3DE para las franjas.

### 2.3 Contraste (WCAG 2.x, ratio calculado)

| Par | Colores | Ratio | Resultado |
|---|---|---|---|
| Títulos y menú azul sobre blanco | #003B5C / #FFFFFF | 11,80:1 | AA ✔ |
| H1 azul sobre gris de la intro | #003B5C / #F4F4F4 | 10,73:1 | AA ✔ |
| Párrafos intro sobre gris | #111111 / #F4F4F4 | 17,17:1 | AA ✔ |
| Texto cuerpo sobre blanco | #313131 / #FFFFFF | 13,01:1 | AA ✔ |
| Blanco sobre azul (tarjetas, CTA, botones) | #FFFFFF / #003B5C | 11,80:1 | AA ✔ |
| Barra superior | #F4F4F4 / #003B5C | 10,73:1 | AA ✔ |
| Labels del formulario sobre azul | #D0D0D0 / #003B5C | 7,65:1 | AA ✔ |
| Pie | #D8D8D8 / #1A1C20 | 11,97:1 | AA ✔ |
| Azul sobre cian | #003B5C / #05C3DE | 5,54:1 | AA ✔ |
| **Enlaces «Ver más» cian sobre blanco** | #05C3DE / #FFFFFF | **2,13:1** | **FALLA** (Lighthouse lo marca) |
| **Blanco sobre cian** (franja del slider, botón flotante, hover de botones y menú activo) | #FFFFFF / #05C3DE | **2,13:1** | **FALLA** |
| **Botón «Enviar» del formulario** | #D0D0D0 / #0AC3DE | **1,38:1** | **FALLA** grave |

Conclusión: el cian de marca no sirve como color de texto ni como fondo de texto blanco. En el rediseño hay que reservarlo para acentos no textuales o derivar un cian oscuro accesible (en oklch) para enlaces.

---

## 3. Tipografías

### 3.1 Lo que declara el CSS

| Uso | font-family declarada | Tamaño / peso / interlineado (1440 px) |
|---|---|---|
| H1 (tema) | "Arial", Helvetica, Arial, Verdana, sans-serif | 44 px / 300 / 54 px — color #003B5C |
| H2 de sección («Somos Especialistas», «¿Dónde estamos?», «Solicite Información») | Arial | 40 px / 300 / normal |
| H2 de tarjeta («ORTODONCIA»…) | Arial | 24 px / 500 / 28 px, mayúsculas escritas a mano |
| H2 banda CTA | Arial | 30 px / 500 / 40 px, blanco |
| H3 tarjetas («SOBRE NOSOTROS»…) | Arial | 24 px / 700 / 34 px, blanco |
| H3–H6 (tema) | Arial | 24 / 20 / 16 / 14 px, peso 600 |
| Texto base del tema | Arial | 14 px / 300 / 25 px (variable) → **18 px / 300 / 27 px calculado** en `body` |
| Párrafos de contenido (WPBakery/Ultimate) | **"Source Sans Pro"** (sin fallback) | 20 px / 300 / 30 px (intro, centrado) · 18 px / **200** / 27 px (tarjetas, **justificado**) |
| Menú principal | "Open Sans", Helvetica, Arial… | 17 px / 400 |
| Barra superior | "Open Sans" | 13 px / 300 |
| Botones del tema / formulario | "Roboto", Helvetica, Arial… | 14 px / 700 |
| Botones Ultimate («Más información», «Contacte hoy mismo!») | **"Montserrat"** (sin fallback) | 14–20 px / 400–700 |
| Titulares del slider («Doctores Morelló», «SONRISAS SANAS») | **"Roboto Slab"** | 64–65 px / 700, #003B5C |
| Subtítulos del slider | "Source Sans Pro" | 23–57 px / 300, blanco sobre franja cian |
| Pie | Arial | 13 px / 300 |

### 3.2 Lo que realmente se carga

- **Google Fonts enlazado en el HTML:** solo `css2?family=Roboto+Slab:wght@400;700&family=Roboto:wght@400` (`display=swap`). No hay `@font-face` propio ni fuentes self-hosted, salvo iconos (Font Awesome 5/6/7 duplicado por tema y por el plugin Float Menu, icomoon-the7, «Defaults» de Ultimate, vc_grid, ult-silk, slick).
- **Source Sans Pro, Montserrat y Open Sans** solo llegan cuando se ejecuta el JS diferido (cargador de fuentes de Slider Revolution / The7 / Ultimate), y ese JS **solo corre si el visitante acepta las cookies** (ver diagnóstico). Con las cookies rechazadas o sin contestar el banner, el navegador usa su serif por defecto: **los párrafos y los botones se ven en Times New Roman** (comprobado en las capturas `home-1440-cookies-rechazadas.png` y en las de 390 px). En la sesión de Lighthouse sí llegaron a descargarse (Source Sans Pro 200/300/400, Montserrat 400/700, Roboto, Roboto Slab, Open Sans), con 600 KB de fuentes en total.
- **Resultado visible típico:** títulos en Arial/Helvetica fina (300), cuerpo en Source Sans Pro 200–300 (o Times si no carga), slider en Roboto Slab bold, botones en Montserrat. Cinco familias sin un sistema común; el logo usa otra slab distinta de Roboto Slab.

### 3.3 Tamaños a 390 px

| Elemento | 1440 px | 390 px |
|---|---|---|
| H1 | 44 px / 300 | 34 px / 300 (line-height fijo 54 px) |
| H2 de sección | 40 px | 40 px (no escala) |
| H2 de tarjeta | 24 px | 24 px |
| H3 tarjeta | 24 px | 24 px |
| Párrafo intro | 20 px | 20 px |
| Párrafo de tarjeta | 18 px / 200 | 18 px / 200 (justificado: «ríos» de espacios) |
| Titular del slider | 65 px | **18 px** (el slider se escala entero) |
| Subtítulo del slider | 23 px | **6 px** (ilegible) |
| «Llame ahora» / teléfono | 60 px | 60 px |

---

## 4. Tono de voz

1. **Trato de usted, formal y algo institucional.**
   - «Rellene el siguiente formulario o llame al teléfono +34 934 182 129 donde le atenderemos personalmente pare resolver todas sus dudas.»
   - «¿Está listo para realizar una consulta?» / «Pida una cita previa ahora!»
   - (Inconsistencia: en algunas páginas pasa al tú: «Pide una cita o infórmate», «Solicita información o pide tu cita», «Luce tu mejor sonrisa»).
2. **Autoridad por trayectoria y carácter familiar.**
   - «Morelló Clínica Dental, fundada en el año 1982 por el Dr. Joan Morelló Cubells.»
   - «Somos una clínica familiar que ha tenido siempre como objetivo principal la profesionalidad y la seriedad con los pacientes, lo que nos ha hecho crecer como una clínica de referencia en Barcelona.»
3. **Cercanía humana como promesa.**
   - «EXCELENCIA ODONTOLÓGICA CON UN TRATO CERCANO»
   - «Conocimientos, experiencia, cercanía»
   - «Profesionales con alta capacitación y proximidad.»
4. **Divulgativo y clínico en las páginas de tratamiento** (definiciones, «¿Qué es…?», listas de tipos).
   - «La ortodoncia es la especialidad odontológica que se ocupa de la corrección de la posición de los dientes y de los problemas de maloclusión.»
   - «"Una buena sonrisa es sinónimo de salud."»
5. **Mensajes de salud y familia, poco orientados a beneficio emocional.**
   - «SONRISAS SANAS» / «PARA TODA LA FAMILIA»
   - «El cuidado de hoy, la sonrisa de mañana»
   - «En Morelló Clínica Dental tenemos una verdadera devoción por la salud bucodental.»

Rasgos formales a tener en cuenta: exclamaciones sin signo de apertura («Contacte hoy mismo!», «Pida una cita previa ahora!»), mayúsculas escritas a mano en titulares, comillas rectas en las citas destacadas de los tratamientos.
