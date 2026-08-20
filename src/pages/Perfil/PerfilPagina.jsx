import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAuthStore from '../../store/useAutenticacionStore';
import CircuitBackground from '../../components/fondos/FondoTech';
import PageHero from '../../components/func/MigasPan';
import ProfileSidebar from './components/BarraLateralPerfil';

const GRADIENTS = [
    { id: 'g-red', name: 'Rojo Robótico', from: '#a41e22', to: '#f56565' },
    { id: 'g-gold', name: 'Dorado Tech', from: '#c5a059', to: '#ecc94b' },
    { id: 'g-blue', name: 'Azul Espacial', from: '#0f172a', to: '#2563eb' },
    { id: 'g-green', name: 'Verde Cyber', from: '#064e3b', to: '#10b981' },
    { id: 'g-purple', name: 'Morado Quantum', from: '#581c87', to: '#8b5cf6' },
    { id: 'g-slate', name: 'Gris Acero', from: '#1e293b', to: '#64748b' },
];

const generateGradientAvatar = (color1, color2, initials) => {
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
        <defs>
            <linearGradient id="avatarGrad_${color1.replace('#', '')}" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="${color1}" />
                <stop offset="100%" stop-color="${color2}" />
            </linearGradient>
        </defs>
        <rect width="100" height="100" rx="30" fill="url(#avatarGrad_${color1.replace('#', '')})" />
        <text x="50" y="52" font-family="'Montserrat', 'Inter', sans-serif" font-weight="900" font-size="34" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">
            ${initials}
        </text>
    </svg>
    `;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const Tooltip = ({ text }) => (
    <span className="group relative cursor-pointer text-slate-400 hover:text-[#a41e22] ml-1.5 select-none text-[10px]">
        <i className="fas fa-circle-question"></i>
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 bg-slate-900/95 text-white text-[9px] rounded-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity leading-relaxed z-50 text-center font-bold font-sans shadow-xl border border-white/10 normal-case">
            {text}
        </span>
    </span>
);

// CUSTOM DATE PICKER COMPONENT (Avoid default native browser calendar)
const CalendarDropdown = ({ value, options, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = React.useRef(null);

    useEffect(() => {
        const handler = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const selectedOption = options.find(o => o.value === value) || options[0];

    return (
        <div className="relative inline-block text-left" ref={containerRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-black text-slate-850 focus:outline-none flex items-center gap-1.5 hover:border-[#a41e22]/50 transition cursor-pointer"
            >
                <span>{selectedOption.label}</span>
                <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'} text-[9px] text-[#a41e22]`}></i>
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 z-[120] mt-1 max-h-48 w-32 overflow-y-auto rounded-xl border-2 border-[#a41e22] bg-white shadow-xl scrollbar-thin">
                    <div className="py-1">
                        {options.map((opt) => (
                            <button
                                key={opt.value}
                                type="button"
                                onClick={() => {
                                    onChange(opt.value);
                                    setIsOpen(false);
                                }}
                                className={`w-full px-3 py-1.5 text-left text-[11px] font-bold transition hover:bg-[#a41e22]/5 hover:text-[#a41e22] cursor-pointer ${value === opt.value ? 'bg-[#a41e22]/5 text-[#a41e22] font-black' : 'text-slate-700 dark:text-slate-350'}`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const CustomDatePicker = ({ value, onChange, tooltipText }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [viewMonth, setViewMonth] = useState(new Date().getMonth());
    const [viewYear, setViewYear] = useState(new Date().getFullYear());
    const containerRef = React.useRef(null);

    useEffect(() => {
        const handler = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    const currentYear = new Date().getFullYear();
    const years = [];
    for (let y = currentYear; y >= 1950; y--) {
        years.push(y);
    }

    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    let firstDayIdx = new Date(viewYear, viewMonth, 1).getDay();
    firstDayIdx = firstDayIdx === 0 ? 6 : firstDayIdx - 1;

    const handleSelectDay = (day) => {
        const formattedMonth = String(viewMonth + 1).padStart(2, '0');
        const formattedDay = String(day).padStart(2, '0');
        const dateStr = `${viewYear}-${formattedMonth}-${formattedDay}`;
        onChange(dateStr);
        setIsOpen(false);
    };

    const handleClear = () => {
        onChange('');
        setIsOpen(false);
    };

    const handleToday = () => {
        const today = new Date();
        const formattedMonth = String(today.getMonth() + 1).padStart(2, '0');
        const formattedDay = String(today.getDate()).padStart(2, '0');
        const dateStr = `${today.getFullYear()}-${formattedMonth}-${formattedDay}`;
        onChange(dateStr);
        setIsOpen(false);
    };

    const formatDateForInput = (val) => {
        if (!val) return '';
        const parts = val.split('-');
        if (parts.length !== 3) return val;
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
    };

    return (
        <div className={`relative ${isOpen ? 'z-[60]' : 'z-10'}`} ref={containerRef}>
            <label className="block text-[9px] font-black uppercase tracking-wider text-[#a41e22] mb-1">
                Fecha de Nacimiento
                <Tooltip text={tooltipText} />
            </label>
            <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-455 "><i className="fas fa-calendar-alt text-xs"></i></span>
                <input 
                    type="text" 
                    readOnly
                    onClick={() => setIsOpen(!isOpen)}
                    value={formatDateForInput(value)}
                    placeholder="Ej. dd/mm/aaaa (Toca para seleccionar)"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs focus:ring-2 focus:ring-[#a41e22]/40 outline-none font-bold cursor-pointer placeholder:text-slate-400/50"
                />
            </div>

            {isOpen && (
                <div className="absolute top-full left-0 z-[100] mt-2 w-72 rounded-2xl border-2 border-[#a41e22] bg-white p-4 shadow-2xl text-slate-850 animate-fade-in">
                    <div className="flex justify-between items-center mb-3.5 px-1 pb-2 border-b border-slate-100">
                        {/* Month Navigation */}
                        <div className="flex items-center gap-1">
                            <button 
                                type="button" 
                                onClick={() => setViewMonth(prev => prev === 0 ? 11 : prev - 1)} 
                                className="w-6 h-6 rounded-lg bg-slate-50 hover:bg-[#a41e22]/10 border border-slate-250 flex items-center justify-center text-[#a41e22] cursor-pointer transition active:scale-90"
                            >
                                <i className="fas fa-chevron-left text-[8px]"></i>
                            </button>
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-800 min-w-[55px] text-center">{months[viewMonth].substring(0, 3)}.</span>
                            <button 
                                type="button" 
                                onClick={() => setViewMonth(prev => prev === 11 ? 0 : prev + 1)} 
                                className="w-6 h-6 rounded-lg bg-slate-50 hover:bg-[#a41e22]/10 border border-slate-250 flex items-center justify-center text-[#a41e22] cursor-pointer transition active:scale-90"
                            >
                                <i className="fas fa-chevron-right text-[8px]"></i>
                            </button>
                        </div>
                        
                        {/* Year Navigation */}
                        <div className="flex items-center gap-1">
                            <button 
                                type="button" 
                                onClick={() => setViewYear(prev => prev - 1)} 
                                className="w-6 h-6 rounded-lg bg-slate-50 hover:bg-[#a41e22]/10 border border-slate-250 flex items-center justify-center text-[#a41e22] cursor-pointer transition active:scale-90"
                            >
                                <i className="fas fa-chevron-left text-[8px]"></i>
                            </button>
                            <span className="text-[10px] font-black text-slate-800 min-w-[32px] text-center">{viewYear}</span>
                            <button 
                                type="button" 
                                onClick={() => setViewYear(prev => prev + 1)} 
                                className="w-6 h-6 rounded-lg bg-slate-50 hover:bg-[#a41e22]/10 border border-slate-250 flex items-center justify-center text-[#a41e22] cursor-pointer transition active:scale-90"
                            >
                                <i className="fas fa-chevron-right text-[8px]"></i>
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-center text-[9px] font-black text-[#a41e22] uppercase mb-1">
                        <span>Lu</span><span>Ma</span><span>Mi</span><span>Ju</span><span>Vi</span><span>Sa</span><span>Do</span>
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                        {Array.from({ length: firstDayIdx }).map((_, idx) => (
                            <div key={`empty-${idx}`} className="w-8 h-8" />
                        ))}
                        {Array.from({ length: daysInMonth }).map((_, idx) => {
                            const dayNum = idx + 1;
                            const formattedM = String(viewMonth + 1).padStart(2, '0');
                            const formattedD = String(dayNum).padStart(2, '0');
                            const itemDateStr = `${viewYear}-${formattedM}-${formattedD}`;
                            const isSelected = value === itemDateStr;
                            
                            return (
                                <button
                                    key={dayNum}
                                    type="button"
                                    onClick={() => handleSelectDay(dayNum)}
                                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold transition-all cursor-pointer ${isSelected ? 'bg-[#a41e22] text-white' : 'hover:bg-[#a41e22]/10 text-slate-800 dark:text-slate-300'}`}
                                >
                                    {dayNum}
                                </button>
                            );
                        })}
                    </div>

                    <div className="flex justify-between items-center border-t border-slate-100 mt-3 pt-2 text-[10px] font-black uppercase">
                        <button type="button" onClick={handleClear} className="text-red-500 hover:text-[#a41e22] cursor-pointer">Borrar</button>
                        <button type="button" onClick={handleToday} className="text-[#a41e22] hover:text-[#801015] cursor-pointer">Hoy</button>
                    </div>
                </div>
            )}
        </div>
    );
};

const PerfilPagina = () => {
    const location = useLocation();
    const { user, updateProfile, loading } = useAuthStore();
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        numci: '',
        fenac: '',
        numtel: '',
        nomcol: '',
        correo: '',
        bio: '',
        linkedin: '',
        github: '',
        facebook: ''
    });

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    // Cargar datos iniciales del usuario
    useEffect(() => {
        if (user) {
            setFormData({
                nombre: user.nombre || '',
                apellido: user.apellido || '',
                numci: user.numci || '',
                fenac: user.fenac ? new Date(user.fenac).toISOString().split('T')[0] : '',
                numtel: user.numtel || user.telefono || '',
                nomcol: user.nomcol || '',
                correo: user.correo || '',
                bio: user.bio || '',
                linkedin: user.linkedin || '',
                github: user.github || '',
                facebook: user.facebook || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const [photoError, setPhotoError] = useState('');

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setPhotoError('');

        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/bmp', 'image/tiff'];
        if (!allowedTypes.includes(file.type)) {
            setPhotoError('Formato de imagen no válido. Solo se aceptan JPG, PNG, WebP, GIF, BMP y TIFF.');
            e.target.value = '';
            return;
        }

        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            setPhotoError('La imagen supera el peso máximo permitido de 5 MB. Comprime la imagen e inténtalo de nuevo.');
            e.target.value = '';
            return;
        }

        const reader = new FileReader();
        reader.onloadend = async () => {
            setIsSaving(true);
            const result = await updateProfile({ fotoPerfil: reader.result });
            setIsSaving(false);
            if (result.success) {
                setSuccessMessage('¡Foto de perfil actualizada con éxito!');
                setShowSuccessModal(true);
            }
        };
        reader.readAsDataURL(file);
    };

    const handlePresetSelect = async (grad) => {
        setIsSaving(true);
        const displayName = formData.nombre || user?.nombre || 'Usuario';
        const initials = displayName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) || 'U';
        const dataUri = generateGradientAvatar(grad.from, grad.to, initials);
        
        const result = await updateProfile({ fotoPerfil: dataUri });
        setIsSaving(false);
        if (result.success) {
            setSuccessMessage('¡Avatar preestablecido seleccionado!');
            setShowSuccessModal(true);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        const result = await updateProfile({
            nombre: formData.nombre,
            apellido: formData.apellido,
            numci: formData.numci,
            fenac: formData.fenac ? new Date(formData.fenac) : null,
            numtel: formData.numtel,
            nomcol: formData.nomcol,
            correo: formData.correo,
            bio: formData.bio,
            linkedin: formData.linkedin,
            github: formData.github,
            facebook: formData.facebook
        });
        setIsSaving(false);
        if (result.success) {
            setSuccessMessage('Tus datos de perfil han sido actualizados y sincronizados en tiempo real.');
            setShowSuccessModal(true);
        }
    };

    const getCompletionPercentage = () => {
        let count = 0;
        const total = 9;
        if (formData.nombre) count++;
        if (formData.apellido) count++;
        if (formData.numci) count++;
        if (formData.fenac) count++;
        if (formData.numtel) count++;
        if (formData.nomcol) count++;
        if (formData.bio) count++;
        if (user?.fotoPerfil) count++;
        if (formData.linkedin || formData.github || formData.facebook) count++;
        return Math.round((count / total) * 100);
    };

    const completion = getCompletionPercentage();
    const displayName = user?.nombre || 'Usuario Tech';
    const userAvatar = user?.fotoPerfil || '';

    const navItemsMobile = [
        { path: '/perfil', label: 'Mi Perfil', icon: 'fa-user' },
        { path: '/perfil/compras', label: 'Compras', icon: 'fa-receipt' },
        { path: '/configuracion', label: 'Config', icon: 'fa-gear' },
    ];

    return (
        <div id="perfil-page" className="relative overflow-hidden min-h-screen bg-white">
            <CircuitBackground />
            
            {/* Dots grid overlay */}
            <div className="absolute inset-0 opacity-[0.06] dark:opacity-[0.09] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#a41e22 2px, transparent 2px)', backgroundSize: '24px 24px' }}></div>

            <PageHero
                title="Mi cuenta"
                highlight="personalizable"
                description="Gestiona tus datos personales, información de contacto y personaliza tu avatar institucional en HagamosTech."
            />

            {/* MAIN LAYOUT GRID (THINNED LEFT COLUMN 340px) */}
            <div className="relative">
            <section className="relative z-10 py-10 max-w-[95rem] mx-auto px-4 sm:px-6">
                <CircuitBackground />
                <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8 items-stretch">
                    
                    {/* LEFT SIDEBAR (Red outline border) */}
                    <div className="rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col h-full">
                        <ProfileSidebar formData={formData} handleChange={handleChange} />
                    </div>

                    {/* RIGHT SIDE: CONTENT & FORMS */}
                    <div className="flex flex-col gap-8">
                        
                        {/* MOBILE TABS NAVIGATION */}
                        <div className="flex lg:hidden gap-2 bg-[#f8fafc] p-2 rounded-2xl border border-slate-100 overflow-x-auto scrollbar-none">
                            {navItemsMobile.map((item) => {
                                const isActive = location.pathname === item.path;
                                return (
                                    <Link 
                                        key={item.path}
                                        to={item.path}
                                        className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all whitespace-nowrap ${isActive ? 'bg-[#a41e22] text-white shadow-md' : 'text-slate-500 hover:bg-[#a41e22]/5 dark:hover:bg-white/5'}`}
                                    >
                                        <i className={`fas ${item.icon}`}></i>
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* INTERACTIVE PROFILE COMPLETION PROGRESS (Red outline border) */}
                        <div className="bg-white rounded-2xl p-5 shadow-xl border border-slate-200 border-l-4 border-l-[#a41e22]">
                            <div className="bg-gradient-to-r from-red-50/90 via-white to-transparent p-3.5 rounded-xl border border-red-100/70 mb-4 flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-[#a41e22] text-white flex items-center justify-center text-sm shadow-md shadow-red-500/20 shrink-0">
                                    <i className="fas fa-chart-line"></i>
                                </div>
                                <div>
                                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider m-0">Completitud del Perfil</h3>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-normal m-0 mt-0.5">Progreso de datos configurados</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-[9px] font-black uppercase tracking-wider text-[#a41e22] flex items-center gap-2">
                                    <i className="fas fa-chart-line text-xs"></i> Progreso
                                </span>
                                <span className="text-sm font-black text-slate-800">{completion}%</span>
                            </div>
                            <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden border border-slate-200/50">
                                <div 
                                    className="h-full bg-gradient-to-r from-[#a41e22] to-[#c5a059] transition-all duration-700 ease-out rounded-full"
                                    style={{ width: `${completion}%` }}
                                />
                            </div>
                            <p className="text-[10px] text-slate-400 font-bold uppercase mt-2.5 flex items-center gap-1.5">
                                <i className="fas fa-sparkles text-amber-500"></i>
                                {completion === 100 ? '¡Tu perfil está completamente configurado!' : 'Completa todos los campos para alcanzar el 100%'}
                            </p>
                        </div>

                        {/* PHOTO & AVATAR PICKER (Red outline border) */}
                        <div className="bg-white rounded-2xl p-5 shadow-xl border border-slate-200 border-l-4 border-l-[#a41e22]">
                            <div className="bg-gradient-to-r from-red-50/90 via-white to-transparent p-3.5 rounded-xl border border-red-100/70 mb-4 flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-[#a41e22] text-white flex items-center justify-center text-sm shadow-md shadow-red-500/20 shrink-0">
                                    <i className="fas fa-camera"></i>
                                </div>
                                <div>
                                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider m-0">Imagen de Perfil</h3>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-normal m-0 mt-0.5">Personaliza tu foto o avatar institucional</p>
                                </div>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row gap-8 items-center">
                                {/* Current Avatar Preview */}
                                <div className="relative group shrink-0">
                                    <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden bg-[#f1f5f9] border-4 border-white shadow-xl flex items-center justify-center text-5xl font-black text-[#a41e22] select-none animate-pulse-slow">
                                        {userAvatar ? (
                                            <img src={userAvatar} alt="Perfil" className="w-full h-full object-cover" />
                                        ) : (
                                            displayName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
                                        )}
                                    </div>
                                    <label className="absolute bottom-1 right-1 w-9 h-9 bg-[#a41e22] hover:bg-[#801015] text-white rounded-xl shadow-lg border-2 border-white flex items-center justify-center cursor-pointer transition-all duration-200 active:scale-90">
                                        <i className="fas fa-pen text-xs"></i>
                                        <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                                    </label>
                                </div>

                                <div className="flex-1 w-full text-center sm:text-left">
                                    <h4 className="text-base font-extrabold text-slate-850">Cambiar foto de perfil</h4>
                                    <p className="text-[11px] text-slate-500 mt-1 mb-4 leading-relaxed">
                                        Sube tu foto o escoge uno de nuestros gradientes de alta fidelidad tecnológica de abajo.
                                    </p>
                                    {photoError && (
                                        <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-[11px] font-bold text-red-600 flex items-start gap-2.5">
                                            <i className="fas fa-circle-exclamation mt-0.5 text-sm shrink-0"></i>
                                            <span>{photoError}</span>
                                        </div>
                                    )}

                                    {/* Presets Grid */}
                                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                                        {GRADIENTS.map((grad) => (
                                            <button
                                                key={grad.id}
                                                onClick={() => handlePresetSelect(grad)}
                                                className="group relative flex flex-col items-center p-2 rounded-2xl border border-[#a41e22]/10 bg-[#fbfdff] hover:border-[#a41e22]/50 hover:bg-[#a41e22]/5 transition-all duration-300 cursor-pointer"
                                                title={grad.name}
                                            >
                                                <div 
                                                    className="w-8 h-8 rounded-xl shadow-md transition-transform group-hover:scale-110"
                                                    style={{ background: `linear-gradient(135deg, ${grad.from}, ${grad.to})` }}
                                                />
                                                <span className="text-[8px] font-black uppercase text-slate-450 mt-2 truncate w-full text-center">
                                                    {grad.name.split(' ')[0]}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* PERSONAL INFORMATION FORM (Red outline border) */}
                        <div className="bg-white rounded-2xl p-5 shadow-xl border border-slate-200 border-l-4 border-l-[#a41e22]">
                            <div className="bg-gradient-to-r from-red-50/90 via-white to-transparent p-3.5 rounded-xl border border-red-100/70 mb-4 flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-[#a41e22] text-white flex items-center justify-center text-sm shadow-md shadow-red-500/20 shrink-0">
                                    <i className="fas fa-id-card"></i>
                                </div>
                                <div>
                                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider m-0">Datos Personales</h3>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-normal m-0 mt-0.5">Información personal y de contacto</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Nombre */}
                                    <div>
                                        <label className="block text-[9px] font-black uppercase tracking-wider text-[#a41e22] mb-1">
                                            Nombre
                                            <Tooltip text="Tu nombre de pila. Será visible en tu perfil y diplomas de capacitación." />
                                        </label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400"><i className="fas fa-user text-xs"></i></span>
                                            <input 
                                                type="text" 
                                                name="nombre"
                                                value={formData.nombre}
                                                onChange={handleChange}
                                                required
                                                placeholder="Ej. Luis Sanders"
                                                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs focus:ring-2 focus:ring-[#a41e22]/40 outline-none font-bold placeholder:text-slate-400/50"
                                            />
                                        </div>
                                    </div>

                                    {/* Apellido */}
                                    <div>
                                        <label className="block text-[9px] font-black uppercase tracking-wider text-[#a41e22] mb-1">
                                            Apellido
                                            <Tooltip text="Tus apellidos paterno y materno registrados legalmente." />
                                        </label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400"><i className="fas fa-signature text-xs"></i></span>
                                            <input 
                                                type="text" 
                                                name="apellido"
                                                value={formData.apellido}
                                                onChange={handleChange}
                                                placeholder="Ej. Vela Rocha"
                                                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs focus:ring-2 focus:ring-[#a41e22]/40 outline-none font-bold placeholder:text-slate-400/50"
                                            />
                                        </div>
                                    </div>

                                    {/* CI / Documento */}
                                    <div>
                                        <label className="block text-[9px] font-black uppercase tracking-wider text-[#a41e22] mb-1">
                                            Cédula de Identidad (CI)
                                            <Tooltip text="Tu documento de identificación oficial. Necesario para certificar cursos y facturaciones." />
                                        </label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-455 "><i className="fas fa-address-card text-xs"></i></span>
                                            <input 
                                                type="text" 
                                                name="numci"
                                                value={formData.numci}
                                                onChange={handleChange}
                                                placeholder="Ej. 1234567 LP"
                                                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs focus:ring-2 focus:ring-[#a41e22]/40 outline-none font-bold placeholder:text-slate-400/50"
                                            />
                                        </div>
                                    </div>

                                    {/* Custom Calendar date picker */}
                                    <CustomDatePicker 
                                        value={formData.fenac} 
                                        onChange={(date) => setFormData(prev => ({ ...prev, fenac: date }))}
                                        tooltipText="Utilizado para la categorización y niveles de cursos de robótica (primaria, secundaria, jóvenes)."
                                    />

                                    {/* Teléfono */}
                                    <div>
                                        <label className="block text-[9px] font-black uppercase tracking-wider text-[#a41e22] mb-1">
                                            Número de Teléfono
                                            <Tooltip text="Tu número celular. Usado para avisos de mensajería de soporte y envíos." />
                                        </label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-455 "><i className="fas fa-phone text-xs"></i></span>
                                            <input 
                                                type="tel" 
                                                name="numtel"
                                                value={formData.numtel}
                                                onChange={handleChange}
                                                placeholder="Ej. +591 76543210"
                                                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs focus:ring-2 focus:ring-[#a41e22]/40 outline-none font-bold placeholder:text-slate-400/50"
                                            />
                                        </div>
                                    </div>

                                    {/* Colegio/Institución */}
                                    <div>
                                        <label className="block text-[9px] font-black uppercase tracking-wider text-[#a41e22] mb-1">
                                            Colegio / Institución
                                            <Tooltip text="Tu colegio, universidad o empresa. Nos ayuda a adaptar el nivel académico de tus cursos." />
                                        </label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-455 "><i className="fas fa-school text-xs"></i></span>
                                            <input 
                                                type="text" 
                                                name="nomcol"
                                                value={formData.nomcol}
                                                onChange={handleChange}
                                                placeholder="Ej. Colegio Alemán / UMSA"
                                                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs focus:ring-2 focus:ring-[#a41e22]/40 outline-none font-bold placeholder:text-slate-400/50"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Biografía / Frase Corta */}
                                <div>
                                    <label className="block text-[9px] font-black uppercase tracking-wider text-[#a41e22] mb-1">
                                        Biografía / Frase Corta
                                        <Tooltip text="Frase corta que aparecerá en tu barra lateral del perfil de usuario." />
                                    </label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-455 "><i className="fas fa-quote-left text-xs"></i></span>
                                        <input 
                                            type="text" 
                                            name="bio"
                                            value={formData.bio}
                                            onChange={handleChange}
                                            placeholder="Ej. Estudiante apasionado por la robótica educativa y la inteligencia artificial"
                                            className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs focus:ring-2 focus:ring-[#a41e22]/40 outline-none font-bold placeholder:text-slate-400/50"
                                        />
                                    </div>
                                </div>

                                {/* Correo (No editable) */}
                                <div>
                                    <label className="block text-[9px] font-black uppercase tracking-wider text-[#a41e22] mb-1">
                                        Correo Electrónico (No modificable)
                                        <Tooltip text="El email de tu cuenta. No se puede modificar por motivos de integridad de usuario." />
                                    </label>
                                    <div className="relative opacity-60">
                                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400"><i className="fas fa-envelope text-xs"></i></span>
                                        <input 
                                            type="email" 
                                            name="correo"
                                            value={formData.correo}
                                            disabled
                                            className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs focus:ring-2 focus:ring-[#a41e22]/40 outline-none font-bold cursor-not-allowed"
                                        />
                                    </div>
                                </div>
                                {/* FORM ACTIONS BAR */}
                                <div className="pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <Link 
                                        to="/" 
                                        className="px-4 py-2.5 rounded-xl bg-[#a41e22] hover:bg-red-800 text-white text-xs font-black uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2 border-0"
                                    >
                                        <i className="fas fa-arrow-left"></i> Volver al Inicio
                                    </Link>
                                    
                                    <div className="flex w-full sm:w-auto gap-3 justify-end">
                                        <button 
                                            type="button"
                                            onClick={() => {
                                                if(user) {
                                                    setFormData({
                                                        nombre: user.nombre || '',
                                                        apellido: user.apellido || '',
                                                        numci: user.numci || '',
                                                        fenac: user.fenac ? new Date(user.fenac).toISOString().split('T')[0] : '',
                                                        numtel: user.numtel || user.telefono || '',
                                                        nomcol: user.nomcol || '',
                                                        correo: user.correo || '',
                                                        bio: user.bio || '',
                                                        linkedin: user.linkedin || '',
                                                        github: user.github || '',
                                                        facebook: user.facebook || ''
                                                    });
                                                }
                                            }}
                                            className="px-4 py-2.5 rounded-xl bg-[#a41e22] hover:bg-red-800 text-white text-xs font-black uppercase tracking-wider transition-colors cursor-pointer border-0"
                                        >
                                            Restablecer
                                        </button>
                                        
                                        <button 
                                            type="submit"
                                            disabled={isSaving || loading}
                                            className="px-5 py-2.5 rounded-xl bg-[#a41e22] hover:bg-red-800 text-white text-xs font-black uppercase tracking-wider shadow-md shadow-red-500/30 transition-all cursor-pointer disabled:opacity-50 border-0"
                                        >
                                            {isSaving ? (
                                                <>
                                                    <i className="fas fa-spinner animate-spin mr-2"></i> Guardando...
                                                </>
                                            ) : 'Guardar Cambios'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </section>
            </div>

            {/* SUCCESS FEEDBACK MODAL */}
            {showSuccessModal && (
                <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 font-montserrat">
                    <div className="bg-white rounded-2xl p-6 max-w-sm w-full border border-slate-200 shadow-2xl relative animate-fade-in text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-500 text-2xl mb-4 shadow-sm">
                            <i className="fas fa-circle-check"></i>
                        </div>
                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-2">¡Cambios Guardados!</h3>
                        <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                            {successMessage}
                        </p>
                        <button 
                            onClick={() => setShowSuccessModal(false)}
                            className="w-full py-2.5 rounded-xl bg-[#a41e22] hover:bg-red-800 text-white text-xs font-black uppercase tracking-wider shadow-md shadow-red-500/30 transition-all cursor-pointer border-0"
                        >
                            Excelente
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PerfilPagina;
