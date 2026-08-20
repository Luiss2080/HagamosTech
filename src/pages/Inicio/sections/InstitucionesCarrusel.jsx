import React, { useState, useEffect, useRef } from 'react';
import ModalColegio from './modalesColegios/ModalColegio';

export const INSTITUTIONS = [
    {
        id: 'sanmarcos',
        name: 'Colegio Internacional San Marcos',
        tag: 'Santa Cruz',
        logo: '/img/11_Escudos/01_SanMarcos.png',
        contextPath: '/img/11_Escudos/context/SanMarcos.md',
        images: Array.from({length: 7}, (_, i) => `/img/10_Colegios/SanMarcos/SanMarcos${i+1}.png`),
        redColumn: {
            title1: "Conoce nuestra",
            title2: "institución aliada",
            desc: "Descubre la infraestructura, propuesta educativa y metodología del Colegio Internacional San Marcos.",
            grid: [
                { label: "Ubicación", text: "Zona Norte, El Remanso", icon: "fa-location-dot" },
                { label: "Niveles", text: "Primaria y Secundaria", icon: "fa-layer-group" },
                { label: "Educación", text: "Bilingüe (Esp-Ing)", icon: "fa-language" },
                { label: "Alianza", text: "Activa 100%", icon: "fa-handshake" }
            ],
            contact: {
                phone: "76350019",
                email: "informacion@colegiosanmarcos.edu.bo",
                web: "https://www.colegiosanmarcos.edu.bo",
                facebook: "https://www.facebook.com/internacionalsanmarcos",
                instagram: "https://www.instagram.com/colegio_internacionalsanmarcos",
                tiktok: "https://www.tiktok.com/@colegiointernacio8"
            }
        },
        highlights: [
            {
                title: "Doble Bachillerato",
                icon: "fa-graduation-cap",
                text: "Ofrecemos a nuestros estudiantes la posibilidad de obtener el Bachiller de Bolivia y el American High School Diploma de EE.UU."
            },
            {
                title: "Formación Integral",
                icon: "fa-users-viewfinder",
                text: "Nuestro currículo combina conocimientos académicos, arte y deporte mediante metodologías innovadoras y evaluación continua."
            }
        ]
    },
    {
        id: 'lasalle',
        name: 'Colegio La Salle',
        tag: 'Santa Cruz',
        logo: '/img/11_Escudos/02_LaSalle.png',
        contextPath: '/img/11_Escudos/context/LaSalleSantaCruz.md',
        images: Array.from({length: 8}, (_, i) => `/img/10_Colegios/LaSalle/LaSalle${i+1}.${i === 7 ? 'jpeg' : 'jpg'}`),
        redColumn: {
            title1: "Educación",
            title2: "Lasallista",
            desc: "Promovemos una formación académica y humano-cristiana de altísima calidad en Santa Cruz.",
            grid: [
                { label: "Ubicación", text: "2do Anillo, Av. Ovidio", icon: "fa-location-dot" },
                { label: "Modelo", text: "Académico y Cristiano", icon: "fa-book-bible" },
                { label: "Competencias", text: "Digitales e Innovación", icon: "fa-laptop-code" },
                { label: "Alianza", text: "Activa 100%", icon: "fa-handshake" }
            ],
            contact: {
                phone: "33324237",
                email: "recepcion@lasallescz.edu.bo",
                web: "https://www.lasallescz.edu.bo/",
                facebook: "#",
                instagram: "#"
            }
        },
        highlights: [
            {
                title: "Valores Lasallistas",
                icon: "fa-heart",
                text: "Inculcamos honestidad, responsabilidad, justicia social y fe para formar bachilleres íntegros y solidarios."
            },
            {
                title: "Propuesta Educativa",
                icon: "fa-lightbulb",
                text: "Impulsamos el pensamiento crítico, el liderazgo, el trabajo colaborativo y la excelencia académica para los desafíos actuales."
            }
        ]
    },
    {
        id: 'sanagustin',
        name: 'Colegio San Agustín',
        tag: 'Santa Cruz',
        logo: '/img/11_Escudos/03_SanAgustin.png',
        contextPath: '/img/11_Escudos/context/SanAgustin.md',
        images: Array.from({length: 4}, (_, i) => `/img/10_Colegios/SanAgustin/SanAgustin${i+1}.jpg`),
        redColumn: {
            title1: "Ciencia y",
            title2: "Verdad",
            desc: "Más de 35 años formando integralmente a niños y jóvenes con valores éticos y excelencia.",
            grid: [
                { label: "Ubicación", text: "Av. Noel Kempff M.", icon: "fa-location-dot" },
                { label: "Estudiantes", text: "+1.300", icon: "fa-users" },
                { label: "Infraestructura", text: "22.570 m²", icon: "fa-building" },
                { label: "Alianza", text: "Activa 100%", icon: "fa-handshake" }
            ],
            contact: {
                phone: "33424843",
                email: "csa@colegiosanagustin.edu.bo",
                web: "http://www.colegiosanagustin.edu.bo/",
                facebook: "#"
            }
        },
        highlights: [
            {
                title: "Filosofía Agustiniana",
                icon: "fa-book-open-reader",
                text: "Integramos la excelencia académica con la formación humana y espiritual, inspirados en el pensamiento de San Agustín."
            },
            {
                title: "Formación de Liderazgo",
                icon: "fa-ranking-star",
                text: "Fomentamos la autonomía, el pensamiento crítico y el compromiso social, preparando a los jóvenes para la educación superior."
            }
        ]
    },
    {
        id: 'lasalleoruro',
        name: 'Colegio La Salle Oruro',
        tag: 'Santa Cruz',
        logo: '/img/11_Escudos/04_LaSalleOruro.png',
        contextPath: '/img/11_Escudos/context/LaSalleOruro.md',
        images: Array.from({length: 6}, (_, i) => `/img/10_Colegios/LaSalleOruro/LaSalleOruro${i+1}.png`),
        redColumn: {
            title1: "Tradición y",
            title2: "Excelencia",
            desc: "Educación de primer nivel en Oruro con sólidos principios morales y académicos.",
            grid: [
                { label: "Ubicación", text: "Ciudad de Oruro", icon: "fa-location-dot" },
                { label: "Formación", text: "Humano-Cristiana", icon: "fa-church" },
                { label: "Niveles", text: "Inicial a Secundaria", icon: "fa-layer-group" },
                { label: "Alianza", text: "Oficial", icon: "fa-handshake" }
            ],
            contact: { phone: "5251234", email: "info@lasalleoruro.edu.bo" }
        },
        highlights: [
            {
                title: "Calidad Académica",
                icon: "fa-medal",
                text: "Enseñanza integral con metodologías participativas y un plantel docente altamente capacitado."
            }
        ]
    },
    {
        id: 'vidanueva',
        name: 'Colegio Vida Nueva',
        tag: 'Santa Cruz',
        logo: '/img/11_Escudos/05_VidaNueva.png',
        contextPath: '/img/11_Escudos/context/VidaNueva.md',
        images: Array.from({length: 7}, (_, i) => `/img/10_Colegios/VidaNueva/VidaNueva${i+1}.png`),
        redColumn: {
            title1: "Formando",
            title2: "el Futuro",
            desc: "Una unidad educativa comprometida con la innovación y el desarrollo integral en Santa Cruz.",
            grid: [
                { label: "Ubicación", text: "Santa Cruz", icon: "fa-location-dot" },
                { label: "Tecnología", text: "Aulas Equipadas", icon: "fa-computer" },
                { label: "Enfoque", text: "Práctico y Moderno", icon: "fa-flask" },
                { label: "Alianza", text: "Oficial", icon: "fa-handshake" }
            ],
            contact: { phone: "70012345", email: "contacto@vidanueva.edu.bo" }
        },
        highlights: [
            {
                title: "Innovación y Robótica",
                icon: "fa-robot",
                text: "Preparamos a nuestros estudiantes para el mañana con programas especializados en tecnología, robótica y desarrollo de software."
            }
        ]
    },
    {
        id: 'santateresa',
        name: 'Colegio Hallein Santa Teresa',
        tag: 'Santa Cruz',
        logo: '/img/11_Escudos/06_SantaTeresa.png',
        contextPath: '/img/11_Escudos/context/SantaTeresa.md',
        images: Array.from({length: 6}, (_, i) => `/img/10_Colegios/SantaTeresa/SantaTeresa${i+1}.png`),
        redColumn: {
            title1: "Excelencia",
            title2: "y Valores",
            desc: "Prestigiosa institución en Potosí enfocada en la calidad humana y educativa.",
            grid: [
                { label: "Ubicación", text: "Potosí", icon: "fa-location-dot" },
                { label: "Trayectoria", text: "Reconocida", icon: "fa-award" },
                { label: "Comunidad", text: "Inclusiva", icon: "fa-users" },
                { label: "Alianza", text: "Oficial", icon: "fa-handshake" }
            ],
            contact: { phone: "6221234", email: "info@santateresa.edu.bo" }
        },
        highlights: [
            {
                title: "Metodología Dinámica",
                icon: "fa-chalkboard-user",
                text: "Fomentamos el aprendizaje activo y participativo, asegurando que cada estudiante alcance su máximo potencial."
            }
        ]
    },
    {
        id: 'delasierra',
        name: 'Colegio Internacional La Sierra',
        tag: 'Santa Cruz',
        logo: '/img/11_Escudos/07_DeLaSierra.png',
        contextPath: '/img/11_Escudos/context/DeLaSierra.md',
        images: Array.from({length: 7}, (_, i) => `/img/10_Colegios/DeLaSierra/DeLaSierra${i+1}.png`),
        redColumn: {
            title1: "Creciendo",
            title2: "Juntos",
            desc: "Educación de vanguardia con un fuerte enfoque en liderazgo y valores familiares.",
            grid: [
                { label: "Ubicación", text: "Santa Cruz", icon: "fa-location-dot" },
                { label: "Deporte", text: "Alto Rendimiento", icon: "fa-volleyball" },
                { label: "Arte", text: "Desarrollo Creativo", icon: "fa-palette" },
                { label: "Alianza", text: "Oficial", icon: "fa-handshake" }
            ],
            contact: { phone: "70098765", web: "https://www.delasierra.edu.bo" }
        },
        highlights: [
            {
                title: "Desarrollo Integral",
                icon: "fa-puzzle-piece",
                text: "Nuestros estudiantes desarrollan habilidades blandas, deportivas y académicas en un entorno seguro y estimulante."
            }
        ]
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
        // Soporta cualquier magnitud (varias vueltas) usando módulo.
        let normalized = offset % halfWidth;
        if (normalized > 0) normalized -= halfWidth;
        return normalized;
    };

    // Se muestran todas las instituciones aliadas
    const base = INSTITUTIONS;

    // Duplicate list for smooth infinite loop
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
                // 40 seconds per complete copy, matching the previous CSS marquee speed.
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

            {/* Red Divider */}
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
                        <i className="fa-solid fa-graduation-cap text-[#84CC16] text-[9px] sm:text-[10px]"></i>
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
                            ALIANZA: 100%
                        </span>
                    </div>
                </div>

                <button 
                    onClick={() => setSelectedInst(inst)}
                    className="w-full bg-[#A3E635] hover:bg-[#0a0a0a] text-white font-bold text-[9px] sm:text-[10px] py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-sm mt-auto"
                >
                    VER DETALLES
                    <i className="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
                </button>
            </div>
        </article>
    );

    return (
        <section id="instituciones" className="w-full bg-gradient-to-br from-[#0a0a0a] via-[#A3E635] to-[#0a0a0a] py-4 sm:py-6 overflow-hidden relative z-10 flex items-center min-h-[160px]">
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
                    aria-label="Mostrar colegio anterior"
                    onClick={() => moveByCard(-1)}
                    className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 hover:bg-white text-[#A3E635] shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
                >
                    <i className="fa-solid fa-chevron-left text-sm" aria-hidden="true"></i>
                </button>
                <button
                    type="button"
                    aria-label="Mostrar siguiente colegio"
                    onClick={() => moveByCard(1)}
                    className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 hover:bg-white text-[#A3E635] shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
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
