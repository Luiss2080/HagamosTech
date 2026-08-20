import React, { useState } from 'react';
import FondoSaltenas from '../../components/fondos/FondoSaltenas';
// --- SECTIONS ---
import HeroSaltenas from './sections/HeroSaltenas';
import SucursalesCarrusel from './sections/SucursalesCarrusel';
import ModalSucursal from '../../components/Modales/ModalSucursal';
import CarruselSaltenas from '../Menu/sections/CarruselSaltenas';
import CarruselCafeteria from '../Menu/sections/CarruselCafeteria';
import CarruselBebidasPostres from '../Menu/sections/CarruselBebidasPostres';

const Inicio = () => {
    const [selectedSucursal, setSelectedSucursal] = useState(null);
    return (
        <div id="app" className="relative overflow-hidden">
            <FondoSaltenas />

            {/* --- HERO SECTION --- */}
            <HeroSaltenas />

            {/* --- SUCURSALES (CARRUSEL Y MODAL) --- */}
            <SucursalesCarrusel onOpenModal={setSelectedSucursal} />
            <ModalSucursal sucursal={selectedSucursal} onClose={() => setSelectedSucursal(null)} />

            {/* --- CARRUSELES DE PRODUCTOS --- */}
            <CarruselSaltenas />
            <CarruselCafeteria />
            <CarruselBebidasPostres />
        </div>
    );
};

export default Inicio;
