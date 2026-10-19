import React from 'react';
import TechToolsCarousel from './TechToolsCarousel';

const ToolsMarquee = ({
  items = [],
  label = 'Herramientas del proyecto',
  description = 'Recursos que pueden evaluarse según los objetivos y el alcance acordado.',
}) => (
  <TechToolsCarousel items={items} label={label} description={description} />
);

export default ToolsMarquee;
