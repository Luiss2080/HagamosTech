import React from 'react';
import './Animaciones.css';

const AnimacionTransicion = ({ children, clave }) => {
  if (!children) return null;
  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    const className = [child.props.className, 'reveal'].filter(Boolean).join(' ');
    const style = { ...child.props.style, transitionDelay: '0ms' };
    return React.cloneElement(child, { key: clave || child.key, className, style });
  });
};

export default AnimacionTransicion;






















