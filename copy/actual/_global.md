# Copy actual — Elementos comunes a todas las páginas

- **URL:** https://www.morelloclinicadental.com/ (y todas las páginas)
- **Fecha de extracción:** 2026-11-03
- **Fuente:** HTML servido + DOM renderizado con Playwright (banner de cookies, botones flotantes y buscador solo existen en el DOM renderizado). Textos literales, erratas incluidas.

## Bloque 1 — Barra superior (fondo azul #003b5c)

- [934 182 129](tel:+34934182129) — con icono de teléfono
- [Carrer de Muntaner, 571 - 2ºC, 08022 Barcelona](https://goo.gl/maps/yKcNHb74snL2) — con icono de ubicación
- Icono Instagram → https://www.instagram.com/morelloclinicadental/ (nueva pestaña) · texto para lectores de pantalla: «Instagram page opens in new window»
- Icono Facebook → https://www.facebook.com/Morelloclinicadental/ (nueva pestaña) · texto para lectores de pantalla: «Facebook page opens in new window»

## Bloque 2 — Cabecera (logo + menú + buscador)

- Enlace «Saltar al contenido» → #content (solo visible con teclado)
- Textos ocultos de marca (assistive-text): «Morelló Clínica Dental» · «Tu dentista de referencia en Barcelona»
- [Imagen] logo · alt='Morelló Clínica Dental' · /wp-content/uploads/2017/08/Logo-Morello-full-1-e1526508198444.png (270×91) → enlace a la home
- Buscador: «Buscar» (abre una caja emergente) · placeholder del campo: «Type and hit enter …» (en inglés) · en la 404 el placeholder es «Escribe y pulsa enter …»

### Menú principal (mismo contenido en escritorio y en el menú móvil)

- Tratamientos → /tratamientos/
  - Ortodoncia → /tratamientos/ortodoncia/
  - Ortodoncia Invisible Invisalign® en Barcelona → /tratamientos/ortodoncia-invisible-invisalign/
  - Estética Dental → /tratamientos/estetica-dental/
  - Blanqueamiento Dental → /tratamientos/blanqueamiento-dental-barcelona/
  - Odontopediatría → /tratamientos/odontopediatria/
  - Implantes Dentales → /tratamientos/implantes-dentales/
  - Prótesis Dental → /tratamientos/protesis-dental/
  - Odontología Conservadora → /tratamientos/odontologia-conservadora/
  - Periodoncia → /tratamientos/periodoncia/
  - Endodoncia → /tratamientos/endodoncia/
- Cita Online (con icono de calendario) → /cita-online/
- Equipo Humano → /equipo/
- La clínica → /la-clinica/
  - La clínica → /la-clinica/
  - Galería de fotos → /la-clinica/photo-gallery/
  - Política de Privacidad → /politica-de-privacidad/
- Contacto → /contacto/

Menú móvil (panel lateral derecho): los mismos enlaces + teléfono [934 182 129](tel:+34934182129) + iconos de Instagram y Facebook.

## Bloque 3 — Botones flotantes (lateral derecho, centrados en vertical; plugin Float Menu)

- Icono calendario (fondo cian #05c3de) · etiqueta al pasar el ratón: «Solicite una cita ahora» → http://www.morelloclinicadental.com/cita-online/?utm_source=web&utm_medium=cpc&utm_campaign=float_button
- Icono teléfono (fondo azul #003b5c) · etiqueta: «Llamar a Clínica Barcelona» → tel:+34934182129

## Bloque 4 — Pie (fondo #1a1c20)

Morelló Clínica Dental © 2017 - 2026. Reservados todos los derechos.

Diseño web y SEO por [Docmedia](https://docmedia.es/) Marketing Dental

- Botón «volver arriba» (flecha) · texto para lectores de pantalla: «Ir a Tienda» (sic)
- No hay enlaces a Aviso legal, Política de privacidad ni Cookies en el pie.

## Bloque 5 — Banner de cookies (CookieYes, abajo a la izquierda)

[H1] Valoramos tu privacidad

Usamos cookies para mejorar su experiencia de navegación, mostrarle anuncios o contenidos personalizados y analizar nuestro tráfico. Al hacer clic en “Aceptar todo” usted da su consentimiento a nuestro uso de las cookies. [Política de cookies](https://www.morelloclinicadental.com/politicas-de-cookies/)

[Botón] Personalizar
[Botón] Rechazar todo
[Botón] Aceptar todo

## Bloque 6 — Página de agradecimiento

Existe `/gracias/` (200, indexable: no lleva `noindex`), a la que redirige el formulario tras el envío (plugin wpcf7-redirect). Copy en `gracias.md` (se leyó con una petición GET normal, sin enviar ningún formulario).
