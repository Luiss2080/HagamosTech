import React, { useState, useEffect, useRef } from 'react';
import ModalColegio from './modalesColegios/ModalColegio';
import FondoTech from '../../../components/fondos/FondoTech';
import TechToolCard from '../../../components/ui/TechToolCard';

export const INSTITUTIONS = [
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
        desc: 'Sistema de base de datos relacional de código abierto más avanzado, potente y seguro del mundo.'
    },
    {
        id: 'git',
        name: 'Git',
        tag: 'Version Control',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
        desc: 'Sistema de control de versiones distribuido para rastrear cambios en el código y facilitar el trabajo colaborativo.'
    },
    {
        id: 'vite',
        name: 'Vite',
        tag: 'Build Tool',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg',
        desc: 'Herramienta de compilación ultrarrápida de última generación para proyectos de frontend modernos.'
    }
];

const InstitucionesCarrusel = () => {
    const [selectedInst, setSelectedInst] = useState(null);
    const trackRef = useRef(null);
    const animationFrameRef = useRef(null);
    const offsetRef = useRef(0);
    const targetOffsetRef = useRef(null);
    const halfWidthRef = useRef(0);
    const lastFrameRef = useRef(0);
    const isPausedRef = useRef(false);
    const isDraggingRef = useRef(false);
    const dragStartXRef = useRef(0);
    const dragStartOffsetRef = useRef(0);

    const applyOffset = (offset) => {
        offsetRef.current = offset;
        if (trackRef.current) {
            trackRef.current.style.transform = `translate3d(${offset}px, 0, 0)`;
        }
    };

    const normalizeOffset = (offset) => {
        const halfWidth = halfWidthRef.current;
        if (!halfWidth) return offset;
        let normalized = offset % halfWidth;
        if (normalized > 0) normalized -= halfWidth;
        return normalized;
    };

    const base = INSTITUTIONS;
    const row1 = [...base, ...base];

    useEffect(() => {
        if (selectedInst) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; }
    }, [selectedInst]);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return undefined;

        const measure = () => {
            halfWidthRef.current = track.scrollWidth / 2;
            applyOffset(normalizeOffset(offsetRef.current));
        };
        measure();

        const resizeObserver = new ResizeObserver(measure);
        resizeObserver.observe(track);

        const animate = (timestamp) => {
            const elapsed = lastFrameRef.current ? timestamp - lastFrameRef.current : 0;
            lastFrameRef.current = timestamp;
            const halfWidth = halfWidthRef.current;

            if (isDraggingRef.current) {
                animationFrameRef.current = requestAnimationFrame(animate);
                return;
            }

            if (targetOffsetRef.current !== null) {
                const distance = targetOffsetRef.current - offsetRef.current;
                const nextOffset = Math.abs(distance) < 0.5
                    ? targetOffsetRef.current
                    : offsetRef.current + distance * Math.min(elapsed / 260, 1);

                if (Math.abs(distance) < 0.5) {
                    applyOffset(normalizeOffset(targetOffsetRef.current));
                    targetOffsetRef.current = null;
                } else {
                    applyOffset(nextOffset);
                }
            } else if (!isPausedRef.current && halfWidth) {
                applyOffset(normalizeOffset(offsetRef.current - (elapsed * halfWidth) / 40000));
            }

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animationFrameRef.current = requestAnimationFrame(animate);
        return () => {
            cancelAnimationFrame(animationFrameRef.current);
            resizeObserver.disconnect();
        };
    }, []);

    const moveByCard = (direction) => {
        const card = trackRef.current?.querySelector('article');
        if (!card) return;

        const gap = parseFloat(getComputedStyle(trackRef.current).columnGap || '0');
        const distance = card.getBoundingClientRect().width + gap;
        targetOffsetRef.current = offsetRef.current - direction * distance;
        isPausedRef.current = false;
    };

    const handlePointerDown = (event) => {
        if (event.pointerType === 'mouse' && event.button !== 0) return;
        if (event.target.closest('button')) return;

        isDraggingRef.current = true;
        dragStartXRef.current = event.clientX;
        dragStartOffsetRef.current = offsetRef.current;
        targetOffsetRef.current = null;
        event.currentTarget.setPointerCapture?.(event.pointerId);
    };

    const handlePointerMove = (event) => {
        if (!isDraggingRef.current) return;
        const distance = event.clientX - dragStartXRef.current;
        applyOffset(normalizeOffset(dragStartOffsetRef.current + distance));
    };

    const handlePointerUp = (event) => {
        if (!isDraggingRef.current) return;
        isDraggingRef.current = false;
        event.currentTarget.releasePointerCapture?.(event.pointerId);
    };

    return (
        <section id="instituciones" className="w-full bg-[#050505] py-10 sm:py-12 overflow-hidden relative z-10 min-h-[220px]">
            <FondoTech />

            {/* Edge Fades */}
            <div className="absolute top-0 left-0 h-full w-16 sm:w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-20 pointer-events-none"></div>
            <div className="absolute top-0 right-0 h-full w-16 sm:w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-20 pointer-events-none"></div>

            <style>{`
                .marquee-row-1 {
                    display: flex;
                    width: max-content;
                    cursor: grab;
                    touch-action: pan-y;
                    user-select: none;
                    will-change: transform;
                }
                .marquee-row-1:active {
                    cursor: grabbing;
                }
            `}</style>

            <div className="relative z-10 w-full flex flex-col">
                <header className="mx-auto mb-6 max-w-3xl px-6 text-center">
                    <h2 className="text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">Tecnologías y herramientas</h2>
                    <p className="mt-3 text-sm font-medium leading-relaxed text-slate-400 sm:text-base">Conocé recursos que pueden utilizarse según los requisitos y el alcance de cada proyecto.</p>
                </header>
                <button
                    type="button"
                    aria-label="Mostrar elemento anterior"
                    onClick={() => moveByCard(-1)}
                    className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 hover:bg-white text-[#A3E635] shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                >
                    <i className="fa-solid fa-chevron-left text-sm" aria-hidden="true"></i>
                </button>
                <button
                    type="button"
                    aria-label="Mostrar siguiente elemento"
                    onClick={() => moveByCard(1)}
                    className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 hover:bg-white text-[#A3E635] shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                >
                    <i className="fa-solid fa-chevron-right text-sm" aria-hidden="true"></i>
                </button>

                {/* Row 1 (Moving Left) */}
                <div
                    ref={trackRef}
                    className="marquee-row-1 flex gap-5 sm:gap-6 px-4"
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                    onPointerEnter={() => { isPausedRef.current = true; }}
                    onPointerLeave={() => { if (!isDraggingRef.current) isPausedRef.current = false; }}
                >
                    {row1.map((inst, i) => (
                        <TechToolCard
                            key={`${inst.id}-r1-${i}`}
                            item={inst}
                            index={i % base.length}
                            onDetails={setSelectedInst}
                        />
                    ))}
                </div>
            </div>

            {/* Modal */}
            {selectedInst && <ModalColegio institution={selectedInst} onClose={() => setSelectedInst(null)} />}
        </section>
    );
};

export default InstitucionesCarrusel;
