import React from 'react';
import FondoTech from '../../../components/fondos/FondoTech';
import TechToolsCarousel from '../../../components/ui/TechToolsCarousel';
import { HERRAMIENTAS_DESARROLLO } from '../../../data/herramientasCarruselData';

const InstitucionesCarrusel = () => (
  <section id="instituciones" className="relative z-10 min-h-[220px] w-full overflow-hidden bg-[#050505] py-10 sm:py-12">
    <FondoTech />
    <TechToolsCarousel
      items={HERRAMIENTAS_DESARROLLO}
      label="Tecnologías y herramientas"
      description="Conocé recursos que pueden evaluarse según los requisitos y el alcance de cada proyecto."
    />
  </section>
);

export default InstitucionesCarrusel;
