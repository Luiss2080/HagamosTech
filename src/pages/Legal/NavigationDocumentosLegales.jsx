import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const DOCUMENTOS = [
    { to: '/condiciones', label: 'Condiciones' },
    { to: '/privacidad', label: 'Privacidad' },
    { to: '/terminos', label: 'Términos' },
    { to: '/cookies', label: 'Cookies' },
];

const NavigationDocumentosLegales = () => {
    const { pathname } = useLocation();

    return (
        <nav aria-label="Documentos legales" className="relative z-20 mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
            <ul className="flex flex-wrap gap-2 rounded-2xl border border-[#A3E635]/20 bg-white/95 p-3 shadow-sm">
                {DOCUMENTOS.map(({ to, label }) => {
                    const actual = pathname === to;
                    return (
                        <li key={to}>
                            <Link
                                to={to}
                                aria-current={actual ? 'page' : undefined}
                                className={`inline-flex min-h-10 items-center rounded-xl px-4 py-2 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#84CC16] ${actual ? 'bg-[#0A0A0A] text-white' : 'text-[#171717] hover:bg-[#A3E635]/15'}`}
                            >
                                {label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default NavigationDocumentosLegales;
