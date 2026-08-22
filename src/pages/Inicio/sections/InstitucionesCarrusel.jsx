import React, { useState, useEffect, useRef } from 'react';
import ModalColegio from './modalesColegios/ModalColegio';

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
        desc: 'Entorno de ejecución de JavaScript para construir servidores rápidos, eficientes y altamente escalables.'
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

    const renderCard = (inst, index, globalIndex) => (
        <article
            key={`${inst.id}-${globalIndex}`}
            className="bg-white rounded-[20px] shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-3.5 flex items-center gap-3 sm:gap-4 border-b-[5px] border-[#A3E635] w-[min(290px,86vw)] sm:w-[320px] shrink-0 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)]"
        >
            {/* Logo */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-gray-50/50 rounded-[14px] p-2 shrink-0 border border-gray-100">
                <img src={inst.logo} alt={inst.name} loading="lazy" decoding="async" className="max-w-full max-h-full object-contain" />
            </div>

            {/* Divider */}
            <div className="w-px h-20 bg-gradient-to-b from-transparent via-[#A3E635]/30 to-transparent"></div>

            {/* Content */}
            <div className="flex flex-col flex-1 justify-between py-1">
                <div className="mb-2">
                    <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[#A3E635] font-black text-[11px] sm:text-xs">0{index + 1}</span>
                        <h3 className="font-extrabold text-gray-800 text-[11px] sm:text-xs leading-tight truncate uppercase w-32" title={inst.name}>
                            {inst.name}
                        </h3>
                    </div>
                    
                    <div className="flex items-center gap-1.5 mb-1.5">
                        <i className="fa-solid fa-code text-[#84CC16] text-[9px] sm:text-[10px]"></i>
                        <span className="text-gray-500 font-bold text-[8px] sm:text-[9px] tracking-widest uppercase truncate">{inst.tag}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <div className="flex text-[#facc15] text-[8px] sm:text-[9px] gap-[1px]">
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                        </div>
                        <span className="text-gray-400 font-bold text-[8px] uppercase tracking-wider">
                            EFICACIA: 100%
                        </span>
                    </div>
                </div>

                <button 
                    onClick={() => setSelectedInst(inst)}
                    className="w-full bg-[#A3E635] hover:bg-[#0a0a0a] text-[#0A0A0A] hover:text-white font-bold text-[9px] sm:text-[10px] py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-sm mt-auto cursor-pointer"
                >
                    VER DETALLES
                    <i className="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
                </button>
            </div>
        </article>
    );

    return (
        <section id="instituciones" className="w-full bg-gradient-to-r from-[#0A0A0A] via-[#111111] to-[#0A0A0A] border-y border-[#A3E635]/15 py-4 sm:py-6 overflow-hidden relative z-10 flex items-center min-h-[160px]">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black/10 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.06),transparent_70%)] pointer-events-none"></div>

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
                    {row1.map((inst, i) => renderCard(inst, i % base.length, `r1-${i}`))}
                </div>
            </div>

            {/* Modal */}
            {selectedInst && <ModalColegio institution={selectedInst} onClose={() => setSelectedInst(null)} />}
        </section>
    );
};

export default InstitucionesCarrusel;
