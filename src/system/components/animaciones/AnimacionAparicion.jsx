import React from 'react';
import './Animaciones.css';

const AnimacionAparicion = ({ children, retraso = 0 }) => {
  if (!children) return null;
  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    const className = [child.props.className, 'reveal'].filter(Boolean).join(' ');
    const style = { ...child.props.style, transitionDelay: `${retraso}ms` };
    return React.cloneElement(child, { className, style });
  });
};

export const AnimacionAparicionStagger = ({ children, retrasoBase = 80 }) => {
  if (!children) return null;
  return React.Children.map(children, (child, idx) => {
    if (!React.isValidElement(child)) return child;
    const className = [child.props.className, 'reveal'].filter(Boolean).join(' ');
    const style = { ...child.props.style, transitionDelay: `${idx * retrasoBase}ms` };
    return React.cloneElement(child, { className, style });
  });
};

export default AnimacionAparicion;






















