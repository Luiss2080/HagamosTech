import React from 'react';
import HeroNovedades from './sections/HeroNovedades';
import AgendaNovedades from './sections/AgendaNovedades';
import LogrosNovedades from './sections/LogrosNovedades';

const NovedadesPagina = () => {
    return (
        <div id="novedades-page" className="relative overflow-hidden min-h-screen bg-[#0A0A0A]">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#111111] rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute top-[40%] left-[20%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[120px] pointer-events-none"></div>

            <HeroNovedades />
            <AgendaNovedades />
            <LogrosNovedades />
        </div>
    );
};

export default NovedadesPagina;
