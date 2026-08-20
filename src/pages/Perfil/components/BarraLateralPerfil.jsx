import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CircuitBackground from '../../../components/fondos/FondoSaltenas';
import useAuthStore from '../../../store/useAutenticacionStore';
import apiClient from '../../../servicios/clienteApi';
import Cookies from 'js-cookie';

const ACHIEVEMENTS = [
    { id: 'ach-1', name: 'LÃ­der Arduino', desc: 'CompletÃ³ Tomo 1 y 2 de Arduino', icon: 'fa-microchip', color: 'text-amber-400 bg-amber-400/10 border-amber-400/30' },
    { id: 'ach-2', name: 'Master Coder', desc: 'Desarrollador de PÃ¡ginas Web', icon: 'fa-code', color: 'text-blue-400 bg-blue-400/10 border-blue-400/30' },
    { id: 'ach-3', name: 'Robot Builder', desc: 'ArmÃ³ su primer prototipo LEGO', icon: 'fa-robot', color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30' },
];

const ProfileSidebar = ({ formData, handleChange, preferences, handleTogglePref, isSavingPrefs, handleSavePreferences }) => {
    const location = useLocation();
    const user = useAuthStore(state => state.user);
    
    const [showDiploma, setShowDiploma] = useState(false);
    const [selectedAch, setSelectedAch] = useState(null);

    const displayName = user?.nombre || 'Usuario Tech';
    const userInitials = displayName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    const userAvatar = user?.fotoPerfil || '';
    
    const navItems = [
        { path: '/perfil', label: 'Mi Perfil', sub: 'Datos personales y foto', icon: 'fa-user' },
        { path: '/perfil/compras', label: 'Mis Compras', sub: 'Pedidos y facturas', icon: 'fa-receipt' },
        { path: '/configuracion', label: 'ConfiguraciÃ³n', sub: 'Preferencias y seguridad', icon: 'fa-gear' },
    ];

    const handleAchClick = (ach) => {
        setSelectedAch(ach);
    };

    return (
        <div className="relative hidden lg:flex flex-col justify-start p-6 overflow-hidden bg-gradient-to-br from-[#801518] via-[#a41e22] to-[#7f1d1d] w-full h-full rounded-[2.5rem] shadow-xl">
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#111827]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-[#111827]/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
                <CircuitBackground />
            </div>

            <div className="relative z-10 flex flex-col items-center w-full space-y-4">
                
                {/* 1. SECCIÃ“N DE CABECERA BRANDING (Como en el panel del usuario) */}
                <div className="w-full pb-3.5 border-b border-white/10 text-left">
                    <h1 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-1.5">
                        <i className="fas fa-microchip text-amber-400"></i> HagamosTech
                    </h1>
                    <p className="text-[8px] text-white/50 font-bold uppercase tracking-widest mt-0.5">Instituto de RobÃ³tica & IA</p>
                </div>

                {/* 2. SECCIÃ“N DE AVATAR Y METADATA */}
                <div className="flex flex-col items-center text-center w-full px-1">
                    <div className="mb-2 inline-flex items-center justify-center rounded-[2rem] bg-white/20 p-2 shadow-2xl ring-1 ring-white/35 backdrop-blur-md">
                        <div className="flex h-16 w-16 items-center justify-center rounded-[1.2rem] bg-white text-[#a41e22] text-xl font-black shadow-lg overflow-hidden border-2 border-white/50">
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
                    <p className="text-[8px] text-red-100 font-bold uppercase tracking-widest mb-1 opacity-80 truncate max-w-full">
                        {user?.correo || 'correo@ejemplo.com'}
                    </p>
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-0.5 text-[7px] font-black uppercase tracking-wider text-white shadow-sm backdrop-blur-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></span>
                        {user?.rolNombre || 'Invitado'}
                    </div>
                </div>

                {/* 3. MENÃš DE NAVEGACIÃ“N */}
                <div className="flex flex-col w-full gap-2 pt-2 border-t border-white/10">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link 
                                key={item.path}
                                to={item.path} 
                                className={`flex items-center gap-3 rounded-xl border px-3 py-2 text-left transition-all duration-200 ${isActive ? 'border-transparent bg-white shadow-md scale-[1.01]' : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'}`}
                            >
                                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${isActive ? 'bg-red-50 text-[#a41e22]' : 'bg-white/10 text-white'}`}>
                                    <i className={`fas ${item.icon} text-[10px]`}></i>
                                </div>
                                <div className="truncate">
                                    <p className={`font-black text-[11px] leading-tight ${isActive ? 'text-[#111827]' : 'text-white'}`}>{item.label}</p>
                                    <p className={`text-[7px] font-bold uppercase tracking-wider mt-0.5 ${isActive ? 'text-[#c5a059]' : 'text-white/50'}`}>{item.sub.substring(0, 24)}</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* 4. WIDGET: PROGRESO DEL CLUB */}
                <div className="w-full bg-black/15 border border-white/5 rounded-2xl p-3.5 text-left shadow-inner">
                    <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[8px] font-black uppercase tracking-widest text-[#c5a059] flex items-center gap-1">
                            <i className="fas fa-crown text-amber-400 text-[9px]"></i> Club HagamosTech
                        </span>
                        <span className="text-[8px] font-black text-white">2,450 / 3,000 pts</span>
                    </div>
                    
                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mb-1">
                        <div className="h-full bg-gradient-to-r from-amber-400 to-[#c5a059] rounded-full" style={{ width: '81%' }} />
                    </div>
                    
                    <div className="flex justify-between items-center text-[7px] text-white/50 font-bold uppercase tracking-wider">
                        <span>Diamante</span>
                        <span className="text-amber-450">Faltan 550 pts</span>
                    </div>
                </div>

                {/* 5. WIDGET: LOGROS ACADÃ‰MICOS */}
                <div className="w-full bg-black/15 border border-white/5 rounded-2xl p-3.5 text-left shadow-inner">
                    <h3 className="text-[8px] font-black uppercase tracking-widest text-red-200 mb-2 flex items-center gap-1">
                        <i className="fas fa-award text-xs text-amber-400"></i> Logros AcadÃ©micos
                    </h3>
                    
                    <div className="grid grid-cols-3 gap-1.5">
                        {ACHIEVEMENTS.map((ach) => (
                            <button
                                key={ach.id}
                                onClick={() => handleAchClick(ach)}
                                className={`group p-1.5 rounded-lg border text-center transition-all cursor-pointer hover:bg-white/5 ${ach.color}`}
                                title={ach.name}
                            >
                                <i className={`fas ${ach.icon} text-xs mb-0.5 block`}></i>
                                <span className="text-[6px] font-black uppercase block truncate text-white">
                                    {ach.name.split(' ')[0]}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* 6. PREFERENCIAS DE ALERTAS - Solo en /configuracion */}
                {location.pathname === '/configuracion' && preferences && (
                <div className="w-full bg-black/15 border border-white/5 rounded-2xl p-3 text-left shadow-inner">
                    <div className="flex items-center gap-2 mb-2.5">
                        <div className="w-6 h-6 rounded-lg bg-[#a41e22] text-white flex items-center justify-center text-[9px] shadow-md shrink-0">
                            <i className="fas fa-bell"></i>
                        </div>
                        <div>
                            <h4 className="text-[8px] font-black text-amber-400 uppercase tracking-wider m-0 leading-tight">Preferencias de Alertas</h4>
                            <p className="text-[6px] text-white/40 font-bold uppercase tracking-widest m-0">NOTIFICACIONES</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        {[
                            { key: 'email_promociones', label: 'Promociones', icon: 'fa-envelope-open-text' },
                            { key: 'email_pedidos', label: 'Pedidos', icon: 'fa-circle-check' },
                            { key: 'sms_alertas', label: 'Seguridad', icon: 'fa-shield-heart' },
                        ].map((item) => (
                            <div key={item.key} className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded flex items-center justify-center bg-white/10 text-amber-400/80">
                                        <i className={`fas ${item.icon} text-[8px]`}></i>
                                    </div>
                                    <span className="text-[8px] font-bold text-white/70 uppercase tracking-wider">{item.label}</span>
                                </div>
                                <button 
                                    onClick={() => handleTogglePref(item.key)}
                                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border border-transparent transition-colors duration-200 focus:outline-none ${preferences[item.key] ? 'bg-[#a41e22]' : 'bg-white/20'}`}
                                >
                                    <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow transition duration-200 ${preferences[item.key] ? 'translate-x-[18px]' : 'translate-x-[1px]'}`} />
                                </button>
                            </div>
                        ))}
                    </div>
                    <button 
                        onClick={handleSavePreferences}
                        disabled={isSavingPrefs}
                        className="w-full mt-2 py-1.5 rounded-lg bg-[#a41e22] hover:bg-red-800 text-white text-[7px] font-black uppercase tracking-widest transition-all cursor-pointer border-0 disabled:opacity-50"
                    >
                        {isSavingPrefs ? 'Guardando...' : 'Guardar Preferencias'}
                    </button>
                </div>
                )}

                {/* 7. REDES SOCIALES Y ENLACES - Solo en /perfil */}
                {location.pathname === '/perfil' && (
                <div className="w-full bg-black/15 border border-white/5 rounded-2xl p-3 text-left shadow-inner">
                    <div className="flex items-center gap-2 mb-2.5">
                        <div className="w-6 h-6 rounded-lg bg-[#a41e22] text-white flex items-center justify-center text-[9px] shadow-md shrink-0">
                            <i className="fas fa-share-nodes"></i>
                        </div>
                        <div>
                            <h4 className="text-[8px] font-black text-amber-400 uppercase tracking-wider m-0 leading-tight">Redes Sociales y Enlaces</h4>
                            <p className="text-[6px] text-white/40 font-bold uppercase tracking-widest m-0">Perfiles profesionales y contacto</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div>
                            <label className="block text-[7px] font-black uppercase tracking-wider text-amber-400/80 mb-0.5">LinkedIn</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-[#0077b5]"><i className="fab fa-linkedin text-[9px]"></i></span>
                                <input type="url" name="linkedin" value={formData?.linkedin || ''} onChange={handleChange} placeholder="URL de LinkedIn" className="w-full pl-8 pr-2.5 py-1.5 rounded-lg border border-white/10 bg-white/10 text-white text-[9px] focus:ring-2 focus:ring-amber-400/40 outline-none font-bold placeholder:text-white/30" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[7px] font-black uppercase tracking-wider text-amber-400/80 mb-0.5">GitHub</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-400"><i className="fab fa-github text-[9px]"></i></span>
                                <input type="url" name="github" value={formData?.github || ''} onChange={handleChange} placeholder="URL de GitHub" className="w-full pl-8 pr-2.5 py-1.5 rounded-lg border border-white/10 bg-white/10 text-white text-[9px] focus:ring-2 focus:ring-amber-400/40 outline-none font-bold placeholder:text-white/30" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[7px] font-black uppercase tracking-wider text-amber-400/80 mb-0.5">Facebook</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-[#1877f2]"><i className="fab fa-facebook text-[9px]"></i></span>
                                <input type="url" name="facebook" value={formData?.facebook || ''} onChange={handleChange} placeholder="URL de Facebook" className="w-full pl-8 pr-2.5 py-1.5 rounded-lg border border-white/10 bg-white/10 text-white text-[9px] focus:ring-2 focus:ring-amber-400/40 outline-none font-bold placeholder:text-white/30" />
                            </div>
                        </div>
                    </div>
                </div>
                )}

                {/* 8. SECCIÃ“N DE ACCIONES RÃPIDAS EXTRAS (BOTÃ“N DE PDF AGRANDADO) */}
                <div className="w-full pt-1.5 border-t border-white/10">
                    <button 
                        onClick={() => setShowDiploma(true)}
                        className="w-full py-3.5 bg-white hover:bg-slate-100 text-[#a41e22] text-[10px] font-black uppercase tracking-widest shadow-lg transition-all hover:scale-[1.02] active:scale-95 cursor-pointer flex items-center justify-center gap-2 rounded-full border-0"
                    >
                        <i className="fas fa-file-pdf text-xs"></i> Certificado Oficial
                    </button>
                </div>
            </div>

            {/* MODAL DE LOGRO INDIVIDUAL */}
            {selectedAch && (
                <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedAch(null)}></div>
                    <div className="relative w-full max-w-xs transform overflow-hidden rounded-[2rem] bg-white p-6 text-center shadow-2xl border-2 border-[#a41e22] animate-modal-pop">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-500 text-2xl mb-4">
                            <i className="fas fa-award"></i>
                        </div>
                        <h4 className="text-sm font-black text-slate-850 uppercase tracking-wider mb-1">{selectedAch.name}</h4>
                        <p className="text-xs text-slate-500 mb-5 leading-relaxed">{selectedAch.desc}</p>
                        <button 
                            onClick={() => setSelectedAch(null)}
                            className="w-full py-2.5 bg-[#a41e22] hover:bg-[#801015] text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition active:scale-95 cursor-pointer"
                        >
                            Aceptar
                        </button>
                    </div>
                </div>
            )}

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
                        <div className="border-8 border-[#c5a059] p-6 rounded-2xl bg-[#fffcf4] text-slate-800 relative overflow-hidden shadow-inner mb-6">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-[#c5a059]/10 rounded-full blur-2xl pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#a41e22]/5 rounded-full blur-3xl pointer-events-none" />
                            
                            <h3 className="font-serif text-[#a41e22] text-xl font-bold italic tracking-wide">HagamosTech</h3>
                            <p className="text-[8px] font-black uppercase tracking-[0.25em] text-[#c5a059] mt-1">Robotics & Software Academy</p>
                            
                            <div className="w-10 h-0.5 bg-slate-350 mx-auto my-3" />
                            
                            <p className="text-[10px] font-bold italic text-slate-500">Este certificado de excelencia es otorgado a:</p>
                            <h4 className="text-lg font-black font-sans text-slate-900 mt-1 uppercase tracking-wider">{displayName}</h4>
                            
                            <p className="text-[10px] font-medium leading-relaxed max-w-xs mx-auto mt-3 text-slate-600">
                                Por completar satisfactoriamente las competencias avanzadas de <strong>Desarrollo Web & RobÃ³tica AutÃ³noma</strong>.
                            </p>
                            
                            <div className="flex justify-between items-center mt-6 px-4">
                                <div className="text-center">
                                    <div className="h-0.5 w-16 bg-slate-300 mx-auto mb-1" />
                                    <p className="text-[7px] font-black uppercase text-slate-400">Hans J. Svane</p>
                                    <p className="text-[6px] font-bold text-slate-400 uppercase tracking-widest">Soporte TÃ©cnico</p>
                                </div>
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-[#c5a059]/30 shadow-sm relative">
                                    <i className="fas fa-certificate text-2xl text-[#c5a059]" />
                                    <i className="fas fa-check text-[9px] text-[#a41e22] absolute" />
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
                                setShowDiploma(false);
                                try {
                                    const token = sessionStorage.getItem('loscatores_token') || Cookies.get('loscatores_token');
                                    const { data } = await apiClient.get('/perfil/certificado', {
                                        headers: { Authorization: `Bearer ${token}` },
                                        responseType: 'blob'
                                    });
                                    const url = window.URL.createObjectURL(new Blob([data]));
                                    const a = document.createElement('a');
                                    a.href = url;
                                    a.download = 'certificado_loscatores.pdf';
                                    a.click();
                                    window.URL.revokeObjectURL(url);
                                } catch {
                                    alert('Error al descargar el certificado');
                                }
                            }}
                            className="w-full py-3.5 bg-[#a41e22] hover:bg-[#801015] text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-md transition active:scale-95 cursor-pointer"
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
