# Brief — Morelló Clínica Dental

Cada dato va marcado como *(extraído)* de su web, *(propuesto)* por nosotros o *(pendiente)* de confirmar.

## Proyecto
- **Nombre:** Morelló Clínica Dental *(extraído)*
- **Descripción:** clínica dental familiar en un piso de Sant Gervasi, Barcelona, fundada en 1982 por el Dr. Joan Morelló Cubells *(extraído)*
- **Web actual:** https://www.morelloclinicadental.com/ *(extraído)*
- **Tipo de proyecto:** rediseño, remaquetación 1:1 de la home *(extraído del encargo)*: mismos bloques, mismo orden, textos literales, imágenes, logo y colores del cliente. La mejora está en tipografía, composición, jerarquía, UX, motion y rendimiento.
- **Fase actual:** extracción terminada (3-nov-2026). Primera ronda de direcciones (1a «El arco», 1b «Muntaner 571», 1c «Casa Morelló») rechazada por Juan. Segunda ronda: 1a «A la altura de las copas» y 1b «Doctores Morelló».

## Objetivo
- Que la web transmita la clínica que es (familiar, seria, con 44 años de trayectoria y un equipo especializado) y convierta visitas en citas: llamada al 934 182 129 o solicitud por formulario *(propuesto)*.
- Arreglar lo que hoy impide que funcione: sin aceptar cookies desaparece el hero, los banners y los botones de cita; LCP de 5,7 s en móvil; CLS de 0,75 en escritorio *(extraído del diagnóstico)*.
- Prioridades del cliente (más pacientes de ortodoncia invisible, odontopediatría, implantes…) *(pendiente)*.

## Qué necesita el usuario *(propuesto, de `ui-ux-pro-max` y del diagnóstico)*
Del sector solo se toma lo funcional. Quien llega quiere:
- **Llamar o pedir cita** sin buscar: teléfono y cita visibles en la primera pantalla y siempre a mano en móvil.
- **Saber si está abierto:** el horario es irregular (cinco días distintos, sin fines de semana) y hoy solo está en /contacto/.
- **Ver qué tratamientos hacen** y llegar a cada uno.
- **Confiar en quién le atiende:** el equipo con nombre y especialidad, y la trayectoria desde 1982.
- **Saber dónde está:** Muntaner 571, 2º C, con mapa.

La estética del sector no es referencia: las webs dentales son plantillas de blanco, azul y sonrisas de stock, y parecerse a ellas es fracasar. Competencia local *(pendiente, no se estudia)*.

## Referentes premiados *(propuesto)*
Capturados a 1440×900 en `_interno/referentes/` (notas en `referentes.md`). Ninguno es del sector.

| Referente | Técnica que se toma |
|---|---|
| [Daylight Computer](https://daylightcomputer.com/) | La luz natural como material: sombras de persiana y de hojas sobre un campo gris claro, con grano fino. → 1a |
| [White Desert](https://white-desert.com/) | Una palabra gigante anclada al borde inferior sobre la imagen a sangre, como el título de una película. → 1a y 1b |
| [Tengile MalaMala](https://tengilemalamala.com/) | Serif fina en titulares y fotos a tamaños distintos entre columnas. → 1a |
| [Seasats](https://www.seasats.com/) | Ritmo pausado y paleta sacada del propio lugar. → 1a |
| [Paul Kalkbrenner](https://www.paulkalkbrenner.net/) | El nombre como cartel suizo con el retrato metido en la línea; cada capítulo, su campo de color plano. → 1b |
| [City of Angels](https://cityxofxangels.com) | El título fijado que atraviesa el marco de una foto mientras la foto cambia dentro. → 1b |
| [Revelatio Studio](https://revelatio.studio/) (Awwwards SOTD) | La foto del equipo como pieza principal que crece con el scroll. → bloque «Nuestro Equipo» |
| [Z. Webb Perinatal](https://zperinatal.com) | Una consulta de salud presentada como algo personal: foto con grano y servicios en lista tipográfica, no en tarjetas. → bloques de servicios |

## Idea propia y momento firma *(propuesto, se elige en la parada 1)*
Inventario de lo que solo tiene Morelló: el apellido como titular («Doctores Morelló», padre e hija), fundada en 1982, un piso en Muntaner 571 2º C, ventanas a la altura de las copas de los árboles de la calle, parquet de taco y radiador de hierro, un horario irregular, el equipo de uniforme en los colores del logo.
- **1a · A la altura de las copas.** La clínica está en un segundo piso de Muntaner, a la altura de los árboles: la luz que entra por sus ventanas, filtrada por las hojas, cae sobre toda la web. *Momento firma:* shader WebGL de luz moteada (la ventana proyectada con su montante, motas de sol y sombras de hojas que se mueven con el viento y con el scroll), con el azul marino de la marca como color de la sombra, sobre fotos, fondo y texto. Gambarino + Author.
- **1b · Doctores Morelló.** El apellido es el titular de la clínica desde 1982: la web se compone como un cartel con el nombre a todo el ancho, fijo, mientras pasan los doctores que lo llevan. *Momento firma:* «Morelló» gigante en dos colores (blanco sobre el campo azul, azul sobre la foto) que cambia de color al paso del marco de la foto entre diapositivas. Neco + Cabinet Grotesk.
- **Pieza viva (las dos):** el estado del horario real en hora de Barcelona («Abierto, hasta las 14 h» / «Cerrado, abre mañana a las 9 h») y el día de hoy marcado en la semana.

## Identidad extraída
- **Logo:** símbolo de diente cuyo contorno forma una «M» (arco superior cian, cuerpo azul) + «morelló» en slab serif minúscula + «CLÍNICA DENTAL» en sans espaciada *(extraído)*. Solo existía en PNG: **vectorizado** en `assets/logo/` (color, negativo, blanco, símbolo y arco) *(propuesto: validar con el cliente o pedir el original)*.
- **Colores** *(extraído)*:
  - Primario: azul **#003B5C** (en el logo #00456D). Títulos, menú, bandas y formulario. 11,8:1 sobre blanco.
  - Secundario: cian **#05C3DE** (en el logo #00C3E0). Franjas, hover, botón flotante. Solo 2,13:1 sobre blanco: **no sirve para texto sobre claro**.
  - Neutros: blanco, gris de sección #F4F4F4, texto #313131, pie #1A1C20.
- **Derivados** *(propuesto, en oklch)*: cian de texto **#00778E** (oklch 0.51 0.12 212; 5,24:1 sobre blanco) para enlaces; tinte cian **#E7F9FD** (oklch 0.97 0.02 212) para fondos. Cian sobre azul (5,54:1) y azul sobre cian (5,54:1) sí cumplen.
- **Tipografías actuales** *(extraído)*: Arial 300 en títulos, Source Sans Pro 200/300 en cuerpo, Open Sans en el menú, Roboto Slab en el slider y Montserrat en botones: cinco familias sin sistema, y sin cookies aceptadas el cuerpo sale en Times. Se sustituyen por la pareja de la dirección elegida *(propuesto)*.

## Tono de comunicación *(extraído)*
1. Trato de usted, formal: «Rellene el siguiente formulario o llame al teléfono +34 934 182 129…»
2. Autoridad por trayectoria y carácter familiar: «Somos una clínica familiar que ha tenido siempre como objetivo principal la profesionalidad y la seriedad con los pacientes…»
3. Cercanía como promesa: «Excelencia odontológica con un trato cercano», «Conocimientos, experiencia, cercanía».
4. Divulgativo en tratamientos: «La ortodoncia es la especialidad odontológica que se ocupa de la corrección de la posición de los dientes…»
5. Salud y familia: «Sonrisas sanas para toda la familia», «El cuidado de hoy, la sonrisa de mañana».

## Target *(propuesto)*
- Familias del barrio (Sant Gervasi, Sarrià, Putxet) con hijos: odontopediatría y ortodoncia.
- Adultos de 25 a 50 que buscan ortodoncia invisible y estética.
- Pacientes de más edad: implantes, prótesis, periodoncia.
- Lectura en móvil, con prisa por llamar o pedir cita.

## Servicios y secciones *(extraído)*
- 10 tratamientos con página: ortodoncia, ortodoncia invisible Invisalign®, estética dental, blanqueamiento, odontopediatría, implantes, prótesis, odontología conservadora, periodoncia y endodoncia. ATM y cirugía oral aparecen sin página.
- Equipo de 7: Dr. Joan Morelló (fundador), Dra. Carmen Morelló, Dra. María Nart, Dra. María Estívalez, Dra. Carla Mozas e higienistas Eli y Gemma.
- Home actual, en orden: cabecera con barra superior → hero (2 slides) → «Clínica Dental de referencia en Barcelona» + 3 accesos → banner Odontopediatría → «Somos Especialistas» (3) → banner Ortodoncia invisible → banda «¿Está listo para realizar una consulta?» → banner Nuestro Equipo → «¿Dónde estamos?» → «Solicite Información» (formulario) → pie.
- Sin testimonios, precios, financiación ni certificaciones en la web *(extraído: no aparecen)*. No se inventan.

## Material visual *(extraído)*
- **Reales y con calidad:** sesión profesional de 2018–2019 de la clínica (sala de espera con ventanal, box, recepción, logo en pared, rincón infantil) y del equipo (Dr. Joan con la Dra. Carmen, tres doctoras). Interiores blancos, parquet, toques turquesa y verde: encajan con la marca.
- **Stock del cliente:** imágenes de tratamientos (brackets, sonrisas, niña) a 1080 px y el banner de Invisalign a 906 px. Se usan (son suyas) con un tratamiento que las unifica y a un tamaño que aguanten.
- **Valoración honesta:** la sala de espera con ventanal (041, 4104 px), el rincón infantil (040) y la recepción limpia (043) aguantan gran formato; la portada de Facebook de la recepción lleva el logo superpuesto y no se usa; el box (046) es frío y no va a sangre; los retratos de fondo blanco valen como retrato, no como atmósfera.
- **Tratamiento:** 1a, la luz del shader cae sobre las fotos (atenuada sobre la foto del hero) y un leve ajuste de saturación y contraste; 1b, recorte en marco y cambio de color del nombre a su paso.
- **Falta:** fachada o portal de Muntaner 571, fotos reales de tratamientos, retratos en una sola sesión *(pendiente)*. Lo que falte en la home completa, placeholder etiquetado.
- Todas las imágenes del prototipo van en AVIF + JPEG con `srcset`.

## Motion
- **Nivel:** protagonista *(propuesto)*. Una coreografía por dirección: 1a, lenta y continua como el viento (salidas expo, 1,1–1,4 s, la luz siempre viva); 1b, cinética y precisa (quint out en entradas, ease-in-out fuerte en el desplazamiento del marco). Solo transform y opacity; con `prefers-reduced-motion`, la misma información sin desplazamientos y la luz quieta.

## CMS
- **Actual:** WordPress 7.1.4 con The7, WPBakery, Slider Revolution, LiteSpeed Cache sobre Apache y CookieYes *(extraído)*.
- **Elegido:** WordPress con tema a medida (PHP/HTML/CSS/JS, sin page builders) *(propuesto)*.

## Dirección estética elegida
*(pendiente)*: se rellena tras la parada 1, con su justificación.
