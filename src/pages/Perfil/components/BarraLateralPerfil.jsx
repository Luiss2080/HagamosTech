import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAuthStore from '../../../store/useAutenticacionStore';

const ProfileSidebar = ({ formData, handleChange }) => {
    const location = useLocation();
    const user = useAuthStore(state => state.user);
    
    const [showDiploma, setShowDiploma] = useState(false);
    const diplomaRef = useRef(null);

    const displayName = user?.nombre || 'Usuario Tech';
    const userInitials = displayName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    const userAvatar = user?.fotoPerfil || '';
    
    const navItems = [
        { path: '/perfil', label: 'Mi Perfil', sub: 'Datos personales y foto', icon: 'fa-user' },
        { path: '/perfil/espacio', label: 'Mi espacio', sub: 'Proyectos, notas y calendario', icon: 'fa-calendar-days' },
        { path: '/configuracion', label: 'Configuración', sub: 'Preferencias y seguridad', icon: 'fa-gear' },
    ];

    return (
        <div className="relative hidden h-auto w-full flex-col justify-start overflow-hidden bg-gradient-to-br from-[#080a05] via-[#10150a] to-[#080a05] p-4 lg:flex lg:p-5">
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#111827]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-[#111827]/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center w-full space-y-3">
                
                {/* 1. SECCIÓN DE CABECERA BRANDING (Como en el panel del usuario) */}
                <div className="w-full pb-3.5 border-b border-white/10 text-left">
                    <h1 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-1.5">
                        <i className="fas fa-microchip text-[#A3E635]"></i> HagamosTech
                    </h1>
                    <p className="text-[8px] text-white/50 font-bold uppercase tracking-widest mt-0.5">Tu espacio personal</p>
                </div>

                {/* 2. SECCIÓN DE AVATAR Y METADATA */}
                <div className="flex flex-col items-center text-center w-full px-1">
                    <div className="mb-2 inline-flex items-center justify-center rounded-[2rem] bg-white/20 p-2 shadow-2xl ring-1 ring-white/35 backdrop-blur-md">
                        <div className="flex h-16 w-16 items-center justify-center rounded-[1.2rem] bg-white text-[#A3E635] text-xl font-black shadow-lg overflow-hidden border-2 border-white/50">
                            {userAvatar ? (
                                <img src={userAvatar} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                userInitials || 'U'
                            )}
                        </div>
                    </div>

                    <h2 className="text-sm font-black text-white leading-tight mb-0.5 tracking-tight drop-shadow-lg truncate max-w-full">
                        {displayName}
                    </h2>
                    <p className="text-[9px] text-white/60 font-bold uppercase tracking-widest mb-2 truncate max-w-full">
                        {user?.correo || 'correo@ejemplo.com'}
                    </p>
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#A3E635]/25 bg-[#A3E635]/10 px-3 py-1 text-[8px] font-black uppercase tracking-wider text-[#A3E635]">
                        <i className={`fas ${user?.emailVerificado ? 'fa-circle-check' : 'fa-user'} text-[9px]`}></i>
                        {user?.emailVerificado ? 'Cuenta verificada' : user?.rolNombre || 'Cuenta personal'}
                    </div>
                </div>

                {/* 3. MENÚ DE NAVEGACIÓN */}
                <div className="flex flex-col w-full gap-2 pt-2 border-t border-white/10">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link 
                                key={item.path}
                                to={item.path} 
                                className={`flex items-center gap-3 rounded-xl border px-3.5 py-3 text-left transition-all duration-200 ${isActive ? 'border-[#A3E635] bg-[#A3E635] shadow-md scale-[1.01]' : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'}`}
                            >
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isActive ? 'bg-[#A3E635]/15 text-[#65A30D]' : 'bg-white/10 text-[#A3E635]'}`}>
                                    <i className={`fas ${item.icon} text-[10px]`}></i>
                                </div>
                                <div className="truncate">
                                    <p className={`font-black text-[11px] leading-tight ${isActive ? 'text-[#111827]' : 'text-white'}`}>{item.label}</p>
                                    <p className={`text-[9px] font-semibold leading-tight mt-1 ${isActive ? 'text-black/65' : 'text-white/55'}`}>{item.sub}</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {location.pathname === '/configuracion' && (
                    <nav aria-label="Accesos directos de configuración" className="w-full rounded-xl border border-white/10 bg-black/20 p-3">
                        <p className="mb-2 text-[9px] font-black uppercase tracking-wider text-[#A3E635]">Ir a configuración</p>
                        <div className="grid gap-1">
                            {[
                                ['personalizacion', 'Personalización'],
                                ['notificaciones', 'Notificaciones'],
                                ['privacidad', 'Privacidad'],
                                ['seguridad', 'Seguridad'],
                                ['sesiones', 'Sesiones y datos'],
                            ].map(([id, label]) => (
                                <a key={id} href={`#${id}`} className="rounded-lg px-2.5 py-2 text-[10px] font-bold text-slate-300 transition hover:bg-white/5 hover:text-[#A3E635]">
                                    {label}
                                </a>
                            ))}
                        </div>
                    </nav>
                )}

                {/* 7. REDES SOCIALES Y ENLACES - Solo en /perfil */}
                {location.pathname === '/perfil' && (
                <div className="w-full bg-black/15 border border-white/5 rounded-2xl p-3 text-left shadow-inner">
                    <div className="flex items-center gap-2 mb-2.5">
                        <div className="w-6 h-6 rounded-lg bg-[#A3E635] text-[#0A0A0A] flex items-center justify-center text-[9px] shadow-md shrink-0">
                            <i className="fas fa-share-nodes"></i>
                        </div>
                        <div>
                            <h4 className="text-[8px] font-black text-[#A3E635] uppercase tracking-wider m-0 leading-tight">Redes Sociales y Enlaces</h4>
                            <p className="text-[6px] text-white/40 font-bold uppercase tracking-widest m-0">Perfiles profesionales y contacto</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div>
                            <label className="block text-[7px] font-black uppercase tracking-wider text-[#A3E635]/80 mb-0.5">LinkedIn</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-[#0077b5]"><i className="fab fa-linkedin text-[9px]"></i></span>
                                <input type="url" name="linkedin" value={formData?.linkedin || ''} onChange={handleChange} placeholder="URL de LinkedIn" className="w-full pl-8 pr-2.5 py-1.5 rounded-lg border border-white/10 bg-white/10 text-white text-[9px] focus:ring-2 focus:ring-[#A3E635]/40 outline-none font-bold placeholder:text-white/30" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[7px] font-black uppercase tracking-wider text-[#A3E635]/80 mb-0.5">GitHub</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-400"><i className="fab fa-github text-[9px]"></i></span>
                                <input type="url" name="github" value={formData?.github || ''} onChange={handleChange} placeholder="URL de GitHub" className="w-full pl-8 pr-2.5 py-1.5 rounded-lg border border-white/10 bg-white/10 text-white text-[9px] focus:ring-2 focus:ring-[#A3E635]/40 outline-none font-bold placeholder:text-white/30" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[7px] font-black uppercase tracking-wider text-[#A3E635]/80 mb-0.5">Facebook</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-[#1877f2]"><i className="fab fa-facebook text-[9px]"></i></span>
                                <input type="url" name="facebook" value={formData?.facebook || ''} onChange={handleChange} placeholder="URL de Facebook" className="w-full pl-8 pr-2.5 py-1.5 rounded-lg border border-white/10 bg-white/10 text-white text-[9px] focus:ring-2 focus:ring-[#A3E635]/40 outline-none font-bold placeholder:text-white/30" />
                            </div>
                        </div>
                    </div>
                </div>
                )}

                {/* 8. SECCIÓN DE ACCIONES RÁPIDAS EXTRAS (BOTÓN DE PDF AGRANDADO) */}
                <div className="w-full pt-1.5 border-t border-white/10">
                    <button 
                        onClick={() => setShowDiploma(true)}
                        className="w-full py-3.5 bg-[#A3E635] hover:bg-[#84CC16] text-[#0A0A0A] text-[10px] font-black uppercase tracking-widest shadow-lg transition-all hover:scale-[1.02] active:scale-95 cursor-pointer flex items-center justify-center gap-2 rounded-full border-0"
                    >
                        <i className="fas fa-file-pdf text-xs"></i> Descargar constancia personal
                    </button>
                </div>
            </div>

            {/* DIPLOMA MODAL WIDGET */}
            {showDiploma && (
                <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowDiploma(false)}></div>
                    <div className="relative w-full max-w-xl transform overflow-hidden rounded-[2.5rem] bg-white p-8 text-center shadow-2xl border border-slate-200 animate-modal-pop">
                        <button
                            onClick={() => setShowDiploma(false)}
                            className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition cursor-pointer"
                        >
                            <i className="fas fa-times"></i>
                        </button>

                        {/* Certificate Mockup Frame */}
                        <div ref={diplomaRef} className="border-8 border-[#A3E635] p-6 rounded-2xl bg-[#fffcf4] text-slate-800 relative overflow-hidden shadow-inner mb-6">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-[#A3E635]/10 rounded-full blur-2xl pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#A3E635]/5 rounded-full blur-3xl pointer-events-none" />
                            
                            <h3 className="font-serif text-[#A3E635] text-xl font-bold italic tracking-wide">HagamosTech</h3>
                            <p className="text-[8px] font-black uppercase tracking-[0.25em] text-[#A3E635] mt-1">Software & Digital Solutions</p>
                            
                            <div className="w-10 h-0.5 bg-slate-350 mx-auto my-3" />
                            
                            <p className="text-[10px] font-bold italic text-slate-500">Registro personal de actividad para:</p>
                            <h4 className="text-lg font-black font-sans text-slate-900 mt-1 uppercase tracking-wider">{displayName}</h4>
                            
                            <p className="text-[10px] font-medium leading-relaxed max-w-xs mx-auto mt-3 text-slate-600">
                                Este documento es un registro personal de tu actividad en HagamosTech; no acredita estudios ni certificaciones oficiales.
                            </p>
                            
                            <div className="flex justify-between items-center mt-6 px-4">
                                <div className="text-center">
                                    <div className="h-0.5 w-16 bg-slate-300 mx-auto mb-1" />
                                    <p className="text-[7px] font-black uppercase text-slate-400">Hans J. Svane</p>
                                    <p className="text-[6px] font-bold text-slate-400 uppercase tracking-widest">Soporte Técnico</p>
                                </div>
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-[#A3E635]/30 shadow-sm relative">
                                    <i className="fas fa-certificate text-2xl text-[#A3E635]" />
                                    <i className="fas fa-check text-[9px] text-[#A3E635] absolute" />
                                </div>
                                <div className="text-center">
                                    <div className="h-0.5 w-16 bg-slate-300 mx-auto mb-1" />
                                    <p className="text-[7px] font-black uppercase text-slate-400">Nicolas Zalles</p>
                                    <p className="text-[6px] font-bold text-slate-400 uppercase tracking-widest">Director General</p>
                                </div>
                            </div>
                        </div>

                        <button 
                            onClick={async () => {
                                try {
                                    if (!diplomaRef.current || !window.html2canvas || !window.jspdf) {
                                        alert('No se pudo generar el certificado en este navegador');
                                        return;
                                    }
                                    const canvas = await window.html2canvas(diplomaRef.current, {
                                        scale: 2,
                                        backgroundColor: '#fffcf4',
                                        useCORS: true,
                                    });
                                    const img = canvas.toDataURL('image/png');
                                    const { jsPDF } = window.jspdf;
                                    const pdf = new jsPDF({
                                        orientation: 'landscape',
                                        unit: 'px',
                                        format: [canvas.width, canvas.height],
                                    });
                                    pdf.addImage(img, 'PNG', 0, 0, canvas.width, canvas.height);
                                    pdf.save('certificado_hagamostech.pdf');
                                    setShowDiploma(false);
                                } catch {
                                    alert('Error al generar el certificado');
                                }
                            }}
                            className="w-full py-3.5 bg-[#A3E635] hover:bg-[#84CC16] text-[#0A0A0A] font-black text-xs uppercase tracking-widest rounded-xl shadow-md transition active:scale-95 cursor-pointer"
                        >
                            Descargar Certificado (PDF)
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileSidebar;
