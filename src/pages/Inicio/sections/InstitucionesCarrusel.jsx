import React, { useEffect, useState } from 'react';
import ModalColegio from './modalesColegios/ModalColegio';
import FondoTech from '../../../components/fondos/FondoTech';
import TechToolsCarousel from '../../../components/ui/TechToolsCarousel';

const INSTITUTIONS = [
  {
    id: 'react',
    name: 'React',
    tag: 'Frontend UI',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    desc: 'Biblioteca JavaScript para construir interfaces de usuario rápidas, reactivas y modernas en la web.'
  },
  {
    id: 'tailwindcss',
    name: 'Tailwind CSS',
    tag: 'Diseño y Estilo',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
    desc: 'Framework de CSS enfocado en utilidades para diseñar páginas web responsivas y estilizadas de manera ágil.'
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    tag: 'Lógica Web',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    desc: 'Lenguaje de programación estándar para la interactividad y la lógica dinámica en el navegador y servidor.'
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    tag: 'Lógica Tipada',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    desc: 'Superconjunto tipado de JavaScript que aporta robustez, escalabilidad y autocompletado inteligente al código.'
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    tag: 'Backend API',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    desc: 'Entorno de JavaScript que puede utilizarse en aplicaciones web y servicios de software.'
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    tag: 'Base de Datos',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    desc: 'Sistema de base de datos relacional de código abierto.'
  },
  {
    id: 'git',
    name: 'Git',
    tag: 'Control de Versiones',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    desc: 'Sistema de control de versiones distribuido para rastrear cambios en el código y facilitar el trabajo colaborativo.'
  },
  {
    id: 'vite',
    name: 'Vite',
    tag: 'Build Tool',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg',
    desc: 'Herramienta de compilación para proyectos de frontend modernos.'
  }
];

const InstitucionesCarrusel = () => {
  const [selectedInst, setSelectedInst] = useState(null);

  useEffect(() => {
    document.body.style.overflow = selectedInst ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedInst]);

  return (
    <>
      <section id="instituciones" className="relative z-10 min-h-[220px] w-full overflow-hidden bg-[#050505] py-10 sm:py-12">
        <FondoTech />
        <TechToolsCarousel
          items={INSTITUTIONS}
          label="Tecnologías y herramientas"
          description="Conocé recursos que pueden utilizarse según los requisitos y el alcance de cada proyecto."
          onDetails={setSelectedInst}
        />
      </section>
      {selectedInst && <ModalColegio institution={selectedInst} onClose={() => setSelectedInst(null)} />}
    </>
  );
};

export default InstitucionesCarrusel;
