# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.spec.js >> login de usuario demo funciona en la interfaz
- Location: e2e\auth.spec.js:7:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Cliente Demo').first()
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByText('Cliente Demo').first() with timeout 15000ms
  - waiting for getByText('Cliente Demo').first()

```

```yaml
- banner:
  - link "Ir al inicio de HagamosTech":
    - /url: "#/"
    - img "Logo HagamosTech"
  - navigation:
    - button "¿Qué hacemos? "
    - button "Servicios "
    - button "¿Para quién? "
    - button "Cómo trabajamos"
    - button "Sobre Nosotros "
    - button "Contactanos"
  - button " Iniciar Sesion"
  - button " Crear Cuenta "
- main:
  - img
  - text:  Soluciones digitales y tecnológicas
  - heading "Soluciones digitales y acompañamiento académico" [level=1]:
    - text: Soluciones digitales y acompañamiento académico.
    - img
  - paragraph: Desarrollamos sitios web y software a medida, creamos recursos de diseño y acompañamos procesos académicos. Revisamos cada solicitud según su alcance, materia y disponibilidad.
  - button " Contanos qué necesitás"
  - button " Explorar áreas"
  - 'img "HagamosTech: desarrollo digital, diseño y acompañamiento académico"'
  - region "¿Qué estás buscando resolver?":
    - paragraph: Elegí por dónde empezar
    - heading "¿Qué estás buscando resolver?" [level=2]
    - paragraph: Explorá nuestras áreas y encontrá la ruta que mejor describe tu necesidad.
    - link "Desarrollo digital Páginas web, aplicaciones y software a medida, con alcance y viabilidad acordados. Explorar":
      - /url: "#/que-hacemos/tecnologia"
      - heading "Desarrollo digital" [level=3]
      - paragraph: Páginas web, aplicaciones y software a medida, con alcance y viabilidad acordados.
      - text: Explorar
    - link "Acompañamiento académico Mentorías, tareas guiadas, informes, monografías y proyectos socioformativos. Explorar":
      - /url: "#/que-hacemos/academia"
      - heading "Acompañamiento académico" [level=3]
      - paragraph: Mentorías, tareas guiadas, informes, monografías y proyectos socioformativos.
      - text: Explorar
    - link "Emprendimientos y profesionales Diseño, identidad visual, recursos para negocios y desarrollo profesional. Explorar":
      - /url: "#/que-hacemos/negocios"
      - heading "Emprendimientos y profesionales" [level=3]
      - paragraph: Diseño, identidad visual, recursos para negocios y desarrollo profesional.
      - text: Explorar
    - link "Solicitud personalizada Contanos qué necesitás y revisaremos si corresponde a nuestras áreas de trabajo. Explorar":
      - /url: "#/que-hacemos/personalizado"
      - heading "Solicitud personalizada" [level=3]
      - paragraph: Contanos qué necesitás y revisaremos si corresponde a nuestras áreas de trabajo.
      - text: Explorar
  - text: NUESTROS SERVICIOS
  - heading "Soluciones que impulsan tu futuro" [level=2]:
    - text: Soluciones que impulsan tu futuro
    - img
  - paragraph: Acompañamos proyectos académicos y desarrollamos soluciones web, software y diseño para empresas, emprendimientos, estudiantes y profesionales.
  - group "Categorías de servicios":
    - button "ACOMPAÑAMIENTO ACADÉMICO" [pressed]
    - button "EMPRENDEDORES"
    - button "EMPLEO"
    - button "DISEÑO GRÁFICO"
    - button "WEB Y E-COMMERCE"
    - button "SOFTWARE"
    - button "A MEDIDA"
  - button "Anterior" [disabled]: 
  - button "Siguiente": 
  - img "Presentaciones PowerPoint e Interactivas"
  - text: Académico Activo  EXPOSICIONES
  - heading "Presentaciones PowerPoint e Interactivas" [level=3]
  - paragraph: Organización visual de exposiciones, defensas, proyectos, clases y presentaciones académicas.
  - text:  Soporte A Coordinar  Diseño A Medida  Foco Universitario   Diseño Visual   Aprobación   Exportación PRECIO A Medida
  - link " WhatsApp":
    - /url: https://wa.me/59161320004?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20el%20servicio%3A%20Presentaciones%20PowerPoint%20e%20Interactivas
  - link "Consultar ":
    - /url: "#/contactanos"
  - img "Formato APA 7 y Documentación Técnica"
  - text: Documentación Activo  RIGOR ACADÉMICO
  - heading "Formato APA 7 y Documentación Técnica" [level=3]
  - paragraph: Orientación de estructura, formato, citas, referencias, tablas, figuras y documentación técnica según pauta.
  - text:  Soporte A Coordinar  Diseño A Medida  Calidad Ortografía   Índices   Citas   Editable PRECIO A Medida
  - link " WhatsApp":
    - /url: https://wa.me/59161320004?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20el%20servicio%3A%20Formato%20APA%207%20y%20Documentaci%C3%B3n%20T%C3%A9cnica
  - link "Consultar ":
    - /url: "#/contactanos"
  - img "Infografías, Diagramas y Líneas de Tiempo"
  - text: Visualización Activo  ESQUEMAS
  - heading "Infografías, Diagramas y Líneas de Tiempo" [level=3]
  - paragraph: Recursos visuales para explicar temas, procesos y contenidos de estudio.
  - text:  Soporte A Coordinar  Diseño A Medida  Formato Alta Res   Flujos   Visual   Imprimible PRECIO A Medida
  - link " WhatsApp":
    - /url: https://wa.me/59161320004?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20el%20servicio%3A%20Infograf%C3%ADas%2C%20Diagramas%20y%20L%C3%ADneas%20de%20Tiempo
  - link "Consultar ":
    - /url: "#/contactanos"
  - img "Mapas Conceptuales y Portadas Académicas"
  - text: Síntesis Activo  MARCO TEÓRICO
  - heading "Mapas Conceptuales y Portadas Académicas" [level=3]
  - paragraph: Síntesis visual de temas y preparación de portadas para trabajos.
  - text:  Soporte A Coordinar  Diseño A Medida  Teoría Precisa   Resumen   Niveles   Formatos PRECIO A Medida
  - link " WhatsApp":
    - /url: https://wa.me/59161320004?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20el%20servicio%3A%20Mapas%20Conceptuales%20y%20Portadas%20Acad%C3%A9micas
  - link "Consultar ":
    - /url: "#/contactanos"
  - img "Simuladores Educativos y Proyectos de Redes"
  - text: Tecnología Activo  ENTORNOS VIRTUALES
  - heading "Simuladores Educativos y Proyectos de Redes" [level=3]
  - paragraph: Orientación en simulaciones y proyectos tecnológicos educativos, según alcance.
  - text:  Soporte A Coordinar  Desarrollo A Medida  Redes Cisco/Otros   Topologías   Robótica   Pruebas PRECIO A Medida
  - link " WhatsApp":
    - /url: https://wa.me/59161320004?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20el%20servicio%3A%20Simuladores%20Educativos%20y%20Proyectos%20de%20Redes
  - link "Consultar ":
    - /url: "#/contactanos"
  - img "Apoyo en Proyectos de Programación"
  - text: Software Activo  CÓDIGO
  - heading "Apoyo en Proyectos de Programación" [level=3]
  - paragraph: Tutoría de algoritmos, lógica y comprensión de código.
  - text:  Soporte A Coordinar  Solución A Medida  Debug Efectivo   Algoritmos   Bases Datos   Funcionamiento PRECIO A Medida
  - link " WhatsApp":
    - /url: https://wa.me/59161320004?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20el%20servicio%3A%20Apoyo%20en%20Proyectos%20de%20Programaci%C3%B3n
  - link "Consultar ":
    - /url: "#/contactanos"
  - img "Mentorías Académicas y Apoyo en Tareas"
  - text: Acompañamiento Activo  TUTORÍA
  - heading "Mentorías Académicas y Apoyo en Tareas" [level=3]
  - paragraph: Explicación de contenidos, ejercicios guiados y apoyo en tareas de distintos niveles y materias disponibles.
  - text:  Niveles Escolar y Superior  Modalidad A Coordinar  Enfoque Aprendizaje   Explicación   Ejercicios   Orientación PRECIO A Medida
  - link " WhatsApp":
    - /url: https://wa.me/59161320004?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20el%20servicio%3A%20Mentor%C3%ADas%20Acad%C3%A9micas%20y%20Apoyo%20en%20Tareas
  - link "Consultar ":
    - /url: "#/contactanos"
  - img "Acompañamiento en Informes y Monografías"
  - text: Documentación Activo  ORIENTACIÓN
  - heading "Acompañamiento en Informes y Monografías" [level=3]
  - paragraph: Guía para delimitar tema, organizar capítulos, revisar avances y preparar citas y referencias.
  - text:  Formato Según pauta  Revisión A Coordinar  Enfoque Formativo   Estructura   Referencias   Retroalimentación PRECIO A Medida
  - link " WhatsApp":
    - /url: https://wa.me/59161320004?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20el%20servicio%3A%20Acompa%C3%B1amiento%20en%20Informes%20y%20Monograf%C3%ADas
  - link "Consultar ":
    - /url: "#/contactanos"
  - img "Proyectos Socioformativos"
  - text: Proyectos Activo  ACOMPAÑAMIENTO
  - heading "Proyectos Socioformativos" [level=3]
  - paragraph: Orientación para definir problema, objetivos, actividades, evidencias, documentación y exposición del proyecto.
  - text:  Niveles Colegio y Universidad  Proceso Por Etapas  Entrega Documentada   Objetivos   Plan de trabajo  Presentación PRECIO A Medida
  - link " WhatsApp":
    - /url: https://wa.me/59161320004?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20el%20servicio%3A%20Proyectos%20Socioformativos
  - link "Consultar ":
    - /url: "#/contactanos"
  - button "Ir al slide 1"
  - button "Ir al slide 2"
  - button "Ir al slide 3"
  - button "Ir al slide 4"
  - button "Ir al slide 5"
  - button "Ir al slide 6"
  - button "Ir al slide 7"
  - region "De la consulta a la entrega":
    - paragraph: Un proceso claro
    - heading "De la consulta a la entrega" [level=2]
    - list:
      - listitem:
        - text: "01"
        - heading "Contanos" [level=3]
        - paragraph: Explicanos tu idea, consigna o necesidad.
      - listitem:
        - text: "02"
        - heading "Analizamos" [level=3]
        - paragraph: Revisamos el alcance y confirmamos si corresponde a nuestras áreas de trabajo.
      - listitem:
        - text: "03"
        - heading "Proponemos" [level=3]
        - paragraph: Acordamos entregables, tiempos y presupuesto antes de empezar.
      - listitem:
        - text: "04"
        - heading "Desarrollamos" [level=3]
        - paragraph: Realizamos el trabajo definido en la propuesta.
      - listitem:
        - text: "05"
        - heading "Entregamos" [level=3]
        - paragraph: Presentamos el resultado y las indicaciones incluidas en el acuerdo.
- contentinfo:
  - link "Logo HagamosTech":
    - /url: "#/"
    - img "Logo HagamosTech"
  - paragraph: Acompañamos procesos académicos y desarrollamos soluciones digitales y de diseño. Revisamos el alcance de cada solicitud antes de proponer.
  - link "":
    - /url: https://www.facebook.com/HagamosTech
  - link "":
    - /url: https://www.instagram.com/hagamostech/
  - link "":
    - /url: https://www.tiktok.com/@hagamostech
  - link "":
    - /url: https://wa.me/59161320004
  - heading "SOLUCIONES" [level=3]
  - list:
    - listitem:
      - link " Tecnología":
        - /url: "#/que-hacemos/tecnologia"
    - listitem:
      - link " Academia":
        - /url: "#/que-hacemos/academia"
    - listitem:
      - link " Emprendimientos y profesionales":
        - /url: "#/que-hacemos/negocios"
    - listitem:
      - link " Soluciones personalizadas":
        - /url: "#/que-hacemos/personalizado"
    - listitem:
      - link " Cómo trabajamos":
        - /url: "#/como-trabajamos"
  - heading "NOSOTROS" [level=3]
  - list:
    - listitem:
      - link " Cómo trabajamos":
        - /url: "#/como-trabajamos"
    - listitem:
      - link " Nuestras soluciones":
        - /url: "#/servicios/desarrollo-web"
    - listitem:
      - link " Contanos tu idea":
        - /url: "#/contactanos"
    - listitem:
      - link " Consultas":
        - /url: "#/contactanos"
    - listitem:
      - link " Trabajá con nosotros":
        - /url: "#/contactanos"
  - heading "CONTACTO" [level=3]
  - list:
    - listitem:
      - text:  Email
      - link "contacto@hagamostech.bo":
        - /url: mailto:contacto@hagamostech.bo
    - listitem:
      - text:  Teléfono / WhatsApp
      - link "+591 61320004":
        - /url: tel:+59161320004
  - paragraph: © 2026 HagamosTech. Todos los derechos reservados.
  - link "Política de Privacidad":
    - /url: "#/privacidad"
  - link "Términos de Servicio":
    - /url: "#/terminos"
  - link "Cookies":
    - /url: "#/cookies"
- button "Abrir contacto por WhatsApp"
- button "Abrir asistente Niko": 
- dialog:
  - button ""
  - text: 
  - heading "Iniciar Sesión en HAGAMOSTECH" [level=2]:
    - text: Iniciar Sesión en HAGAMOSTECH
    - img
  - paragraph: Ingresa a tu cuenta de HAGAMOSTECH para gestionar tus servicios y acceder a las soluciones tecnológicas.
  - text: Cuenta HAGAMOSTECH
  - paragraph:  Web
  - paragraph: Páginas y Landing
  - paragraph:  Sistemas
  - paragraph: Apps y Software
  - paragraph:  Academia
  - paragraph: Mentorías y proyectos
  - paragraph:  Diseño
  - paragraph: Identidad y Gráfica
  - paragraph: Conecta con HAGAMOSTECH
  - link "":
    - /url: https://www.facebook.com/HagamosTech
  - link "":
    - /url: https://www.instagram.com/hagamostech/
  - link "":
    - /url: https://www.tiktok.com/@hagamostech
  - link "":
    - /url: https://wa.me/59161320004
  - text: 
  - heading "Iniciar Sesión" [level=3]
  - paragraph: Accede a tu panel HAGAMOSTECH
  - text: 
  - paragraph: Modulo
  - paragraph: Web
  - text: 
  - paragraph: Modulo
  - paragraph: Sistemas
  - text: 
  - paragraph: Estado
  - paragraph: Activo
  - text: 
  - paragraph: Credenciales
  - textbox "Correo": cliente@hagamostech.bo
  - text: Correo electrónico 
  - textbox "Password": Cliente123
  - text: Contraseña  
  - checkbox " Recordarme" [checked]
  - text: Recordarme
  - button " Recuperar acceso"
  - button "Entrar a Iniciar Sesión "
  - text: " Consejo: si no recuerdas tu acceso, usa la opcion Recuperar acceso o contacta al soporte oficial de HAGAMOSTECH en WhatsApp al +591 61320004."
- dialog:
  - button ""
  - text:  
  - heading "Algo fallo Revisemos" [level=2]:
    - text: Algo fallo Revisemos
    - img
  - paragraph: No se completo la accion. Verifica tus datos y vuelve a intentarlo.
  - text: Requiere atencion
  - paragraph:  Web
  - paragraph: Páginas y Landing
  - paragraph:  Sistemas
  - paragraph: Apps y Software
  - paragraph:  Academia
  - paragraph: Mentorías y proyectos
  - paragraph:  Diseño
  - paragraph: Identidad y Gráfica
  - paragraph: Conecta con HAGAMOSTECH
  - link "":
    - /url: https://www.facebook.com/HagamosTech
  - link "":
    - /url: https://www.instagram.com/hagamostech/
  - link "":
    - /url: https://www.tiktok.com/@hagamostech
  - link "":
    - /url: https://wa.me/59161320004
  - text: 
  - heading "Error" [level=3]
  - paragraph: Alerta
  - text: 
  - paragraph: Modulo
  - paragraph: Web
  - text: 
  - paragraph: Modulo
  - paragraph: Sistemas
  - text: 
  - paragraph: Estado
  - paragraph: Error
  - text: 
  - paragraph: Error al iniciar sesión
  - text: Se requiere accion
  - button "Entendido "
  - text:  Si el problema persiste, contacta al soporte HAGAMOSTECH en WhatsApp al +591 61320004.
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | const BACKEND = process.env.E2E_BACKEND_URL || 'http://localhost:4321';
  4  | const USUARIO = { correo: 'cliente@hagamostech.bo', contrasena: 'Cliente123' };
  5  | 
  6  | // Spec 013: el login debe funcionar de punta a punta.
  7  | test('login de usuario demo funciona en la interfaz', async ({ page, request }) => {
  8  |   const check = await request.post(`${BACKEND}/api/auth/login`, { data: USUARIO }).catch(() => null);
  9  |   test.skip(!check || check.status() !== 200, 'usuario demo no disponible en este entorno');
  10 | 
  11 |   await page.goto('/');
  12 |   await expect(page.getByAltText('Logo HagamosTech').first()).toBeVisible({ timeout: 30_000 });
  13 | 
  14 |   await page.getByRole('button', { name: /iniciar sesion/i }).first().click();
  15 |   await page.waitForSelector('input[name="correo"]', { state: 'visible', timeout: 10_000 });
  16 |   await page.fill('input[name="correo"]', USUARIO.correo);
  17 |   await page.fill('input[name="contrasena"]', USUARIO.contrasena);
  18 |   await page.getByRole('button', { name: /entrar a iniciar/i }).click();
  19 | 
> 20 |   await expect(page.getByText('Cliente Demo').first()).toBeVisible({ timeout: 15_000 });
     |                                                        ^ Error: expect(locator).toBeVisible() failed
  21 | });
  22 | 
```