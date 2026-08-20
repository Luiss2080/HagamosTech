import React from 'react';
import HeroHagamosTech from './sections/HeroHagamosTech';
import InstitucionesCarrusel from './sections/InstitucionesCarrusel';
import ServiciosGrid from './sections/ServiciosGrid';
import VentajasCarrusel from './sections/VentajasCarrusel';
import NovedadesCarrusel from './sections/NovedadesCarrusel';

const Inicio = () => {
    return (
        <div id="app" className="relative overflow-hidden">
            <HeroHagamosTech />

            <InstitucionesCarrusel />

            <ServiciosGrid />

            {/* --- VENTAJAS DE TRABAJAR CON TECH HOME --- */}
            <VentajasCarrusel />

            {/* --- NOTICIAS Y NOVEDADES --- */}
            <NovedadesCarrusel />
        </div>
    );
};

export default Inicio;
