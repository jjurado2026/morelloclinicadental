# Copy actual — Morelló Clínica Dental | Especialistas en ortodoncia, estética e implantes.

- **URL:** https://www.morelloclinicadental.com/
- **Fecha de extracción:** 2026-11-03
- **Fuente:** HTML servido por el servidor (curl) + DOM renderizado con Playwright para comprobar el Slider Revolution. Textos literales, erratas incluidas.
- **Elementos comunes** (barra superior, cabecera, menú, pie, banner de cookies, botones flotantes): ver `_global.md`.

## Metadatos

- `<title>`: Morelló Clínica Dental | Especialistas en ortodoncia, estética e implantes.
- meta description: Morelló Clínica Dental en Barcelona. Especialistas en ortodoncia invisible, estética dental, implantes y odontopediatría.
- og:title: Morelló Clínica Dental
- og:description: Clínica dental con más de 30 años de experiencia cuidando sonrisas en Barcelona. En Calle Muntaner 571.
- og:image: (no aparece)

## Bloque 1 — Hero — Slider principal (Slider Revolution)

[Slider Revolution] alias='the7-medical-hero' id=SR7_1_1
- Slide 1 (data-key=3) · fondo: /wp-content/uploads/2018/03/home-morello-clinica-dental-barcelona-family-ok.jpg
  - Texto (sr7-txt): 'Doctores Morelló'
  - Botón: 'Pida una cita ahora' → /contacto/
  - Texto (sr7-txt): 'EXCELENCIA ODONTOLÓGICA CON UN TRATO CERCANO'
- Slide 2 (data-key=1) · fondo: /wp-content/uploads/2017/10/home-slide-morello03-1919x905.jpg
  - Texto (sr7-txt): 'SONRISAS SANAS'
  - Botón: 'Ver tratamientos' → /tratamientos/
  - Texto (sr7-txt): 'PARA TODA LA FAMILIA'
- Slide 3 (data-key=10) · sin fondo/capas en el HTML

> Notas de la extracción (DOM renderizado con Playwright):
> - Solo se muestran 2 slides (el data-key=10 está vacío y no figura en la configuración JSON del slider). Orden en pantalla: «Doctores Morelló» → «SONRISAS SANAS», fundido cada ~10 s.
> - En el HTML los botones apuntan a `/contacto/` y `/tratamientos/`, pero una vez que el slider se ejecuta el `href` de ambos pasa a ser `https://www.morelloclinicadental.com/` (la home). Ver diagnóstico.
> - El slider entero solo se pinta si el visitante acepta las cookies; si las rechaza o no contesta el banner, el hueco queda en blanco.

## Bloque 2 — Clínica Dental de referencia en Barcelona

[H1] Clínica Dental de referencia en Barcelona
Morelló Clínica Dental, fundada en el año 1982 por el Dr. Joan Morelló Cubells.

Somos una clínica familiar que ha tenido siempre como objetivo principal la profesionalidad y la seriedad con los pacientes, lo que nos ha hecho crecer como una clínica de referencia en Barcelona.

[H3] SOBRE NOSOTROS
[Botón] Más información → /la-clinica/
[H3] EL EQUIPO
[Botón] Nuestros doctores → /equipo/
[H3] CITA ONLINE
[Botón] Pida una cita → /cita-online/

## Bloque 3 — Slider (home-odontopediatria)

[Slider Revolution] alias='home-odontopediatria' id=SR7_3_2
- Slide 1 (data-key=6) · fondo: /wp-content/uploads/2018/02/Tratamientos-odontopediatria-morello.jpg (alt='Odontopediatría | Morelló Clínica Dental en Barcelona')
  - Texto (sr7-txt): 'Odontopediatría'
  - Texto (p): 'El cuidado de hoy, la sonrisa de mañana'
  - Botón: 'Más información' → http://www.morelloclinicadental.com/tratamientos/odontopediatria/

> Nota: el subtítulo se muestra en MAYÚSCULAS por CSS (franja cian); el texto real es el de arriba.

## Bloque 4 — Somos Especialistas

[H2] Somos Especialistas
En Morelló Clínica Dental tenemos una verdadera devoción por la salud bucodental. Nuestros más de 30 años en la clínica de Barcelona lo demuestran.

[Imagen] alt='Ortodoncia - Brackets | Morelló Clínica Dental en Barcelona' · /wp-content/uploads/2016/05/Tratamientos-ortodoncia-brackets.jpg (300×150) · enlace → http://www.morelloclinicadental.com/tratamientos/ortodoncia/

[H2] ORTODONCIA → /tratamientos/ortodoncia/
En Morelló contamos con los tratamientos de ortodoncia más demandados y con mejores resultados. Ortodoncia lingual, brackets estéticos, cerámicos y ortodoncia invisible Invisalign®. [Ver más](http://www.morelloclinicadental.com/tratamientos/ortodoncia/)

[Imagen] alt='Estética Dental - Sonrisas | Morelló Clínica Dental en Barcelona' · /wp-content/uploads/2017/09/Tratamientos-estetica-dental.jpg (300×150) · enlace → http://www.morelloclinicadental.com/tratamientos/estetica-dental/

[H2] ESTÉTICA DENTAL → /tratamientos/estetica-dental/
La solución a problemas relacionados con la salud bucal y la armonía estética de la boca en su totalidad. La importancia de lucir una bonita sonrisa natural. [Ver más](http://www.morelloclinicadental.com/tratamientos/estetica-dental/)

[Imagen] alt='Odontopediatría | Morelló Clínica Dental en Barcelona' · /wp-content/uploads/2016/05/Tratamientos-odontopediatria-morello.jpg (300×150) · enlace → http://www.morelloclinicadental.com/tratamientos/odontopediatria/

[H2] ODONTOPEDIATRÍA → /tratamientos/odontopediatria/
La **odontopediatría,** también llamada odontología infantil, es la encargada de tratar los dientes de los niños, desde los primeros dientes temporales hasta que finaliza el periodo de recambio dental. [Ver más](http://www.morelloclinicadental.com/tratamientos/odontopediatria/)

[Botón] CONSULTE TODOS LOS TRATAMIENTOS QUE REALIZAMOS → /tratamientos/

## Bloque 5 — Slider (home-invisalign)

[Slider Revolution] alias='home-invisalign' id=SR7_4_3
- Slide 1 (data-key=7) · fondo: /wp-content/uploads/2018/04/invisalign-morello-barcelona.jpg (alt='Ortodoncia Invisible Invisalign® | Morelló Clínica Dental en Barcelona')
  - Texto (sr7-txt): 'Ortodoncia invisible'
  - Texto (sr7-txt): 'La clara alternativa a los brackets'
  - Botón: 'Más información' → http://www.morelloclinicadental.com/tratamientos/ortodoncia-invisible-invisalign/

> Nota: el subtítulo se muestra en MAYÚSCULAS por CSS (franja cian); el texto real es el de arriba.

## Bloque 6 — ¿Está listo para realizar una consulta?

[H2] ¿Está listo para realizar una consulta?
Su tratamiento será realizado por nuestro equipo de especialistas. Pida una cita previa ahora!
[Botón] Contacte hoy mismo! → /contacto/

## Bloque 7 — Slider (equipo-home6)

[Slider Revolution] alias='equipo-home6' id=SR7_5_4
- Slide 1 (data-key=8) · fondo: /wp-content/uploads/2019/06/Morello-clinica-dental-2019_V7A9526-ok.jpg
  - Texto (sr7-txt): 'Nuestro Equipo'
  - Texto (sr7-txt): 'Conocimientos, experiencia, cercanía'
  - Botón: 'Entre a conocernos' → http://www.morelloclinicadental.com/equipo/
- Slide 2 (data-key=11, capa estática del slider) · sin fondo/capas en el HTML

> Nota: el subtítulo se muestra en MAYÚSCULAS por CSS (franja cian); el texto real es el de arriba.

## Bloque 8 — ¿Dónde estamos?

[H2] ¿Dónde estamos?
[H3] Morelló Clínica Dental BARCELONA
[Imagen] alt='Morelló Clínica Dental Barcelona' · /wp-content/uploads/2018/11/morello-clinica-dental-barcelona.jpg (962×559)

Llame ahora

[934 182 129](tel:+34934182129)

[Iframe] https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4647.253882238056!2d2.131503570908085!3d41.40545500000001!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x297902793fde597!2sMorell%C3%B3+Cl%C3%ADnica+Dental!5e0!3m2!1ses!2ses!4v1519974439574 (title='')

## Bloque 9 — Fila vacía (separador)

*(sin texto)*

## Bloque 10 — Solicite Información

[H2] Solicite Información
Rellene el siguiente formulario o llame al teléfono +34 934 182 129 donde le atenderemos personalmente pare resolver todas sus dudas. Además, podrá solicitar una primera visita.

[Formulario] aria-label='Formulario de contacto' action=/#wpcf7-f823-p699-o1
[Campo text] label: 'Nombre *' · name=your-name · obligatorio

[Campo email] label: 'Correo electrónico *' · name=your-email · obligatorio

[Campo tel] label: 'Teléfono de contacto *' · name=your-phone · obligatorio

[Campo textarea] label: 'Mensaje' · name=your-message · placeholder='Mensaje'
[Campo checkbox] name=acceptance-rgpd · valor='1' · texto: He leído y acepto las [políticas de privacidad](http://www.morelloclinicadental.com/politica-de-privacidad/).

[Botón enviar] Enviar
