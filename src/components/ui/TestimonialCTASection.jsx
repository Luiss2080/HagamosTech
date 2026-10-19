import React from 'react';
import FondoTech from '../fondos/FondoTech';
import TestimonialCarousel from '../carouseles/CarruselTestimonios';
import CenteredProjectCTA from './CenteredProjectCTA';

const TestimonialCTASection = ({ testimonialTitle, testimonialDescription, testimonials, cta }) => (
  <section className="relative z-10 overflow-hidden px-5 py-14 sm:px-6 sm:py-16" aria-label="Testimonios y consulta del proyecto">
    <FondoTech />
    <div className="relative z-10 mx-auto max-w-7xl">
      <TestimonialCarousel title={testimonialTitle} description={testimonialDescription} testimonials={testimonials} />
      <CenteredProjectCTA {...cta} embedded />
    </div>
  </section>
);

export default TestimonialCTASection;
