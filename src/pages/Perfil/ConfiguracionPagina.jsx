import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import CircuitBackground from '../../components/fondos/FondoTech';
import PageHero from '../../components/func/MigasPan';
import ProfileSidebar from './components/BarraLateralPerfil';
import useAuthStore from '../../store/useAutenticacionStore';
import {
    useCambioPassword,
    usePreferencias,
    useSesiones,
    useDosFA,
    useDesactivarCuenta,
    useExportarDatos
} from '../../hooks/usePerfilConfig';

const ACCENT_COLORS = [
    { name: 'Rojo Robótico', value: '#a41e22', hover: '#801015', bg: 'bg-[#a41e22]', ring: 'ring-[#a41e22]' },
    { name: 'Dorado Tech', value: '#c5a059', hover: '#a88544', bg: 'bg-[#c5a059]', ring: 'ring-[#c5a059]' },
    { name: 'Azul Espacial', value: '#1d4ed8', hover: '#1e40af', bg: 'bg-blue-700', ring: 'ring-blue-700' },
    { name: 'Verde Cyber', value: '#10b981', hover: '#059669', bg: 'bg-[#10b981]', ring: 'ring-[#10b981]' },
];

const PRIVACY_LEVELS = [
    { id: 'public', name: 'Público', desc: 'Tu perfil es visible en los rankings del club y otros alumnos pueden ver tus proyectos de robótica.', icon: 'fa-earth-americas', color: 'text-blue-500' },
    { id: 'members', name: 'Solo Club', desc: 'Solo los alumnos registrados y tutores pueden ver tus insignias y portafolio técnico.', icon: 'fa-users', color: 'text-[#c5a059]' },
    { id: 'private', name: 'Privado', desc: 'Nadie puede ver tu perfil. Tus avances académicos y proyectos están completamente ocultos.', icon: 'fa-user-lock', color: 'text-red-500' }
];

const Tooltip = ({ text }) => (
    <span className="group relative cursor-pointer text-slate-400 hover:text-[#a41e22] ml-1.5 select-none">
        <i className="fas fa-circle-question"></i>
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 bg-slate-900/95 text-white text-[9px] rounded-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity leading-relaxed z-50 text-center font-bold font-sans shadow-xl border border-white/10 normal-case">
            {text}
        </span>
    </span>
);

const ConfiguracionPagina = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { loading: passLoading, cambiar: cambiarPassword } = useCambioPassword();
    const { loading: prefLoading, guardar: guardarPrefs } = usePreferencias();
    const { sesiones, loading: sesLoading, listar: listarSesiones, revocar: revocarSesion } = useSesiones();
    const { loading: faLoading, toggle: toggle2FA, setup: setup2FA } = useDosFA();
    const { loading: desLoading, desactivar: desactivarCuenta } = useDesactivarCuenta();
    const { exportar: exportarDatos } = useExportarDatos();
    const { user } = useAuthStore();

    // --- Estados ---
    const [accentColor, setAccentColor] = useState(() => {
        return localStorage.getItem('hagamostech_accent_color') || '#a41e22';
    });

    const [privacy, setPrivacy] = useState('members');

    const [preferences, setPreferences] = useState({
        email_promociones: true,
        email_pedidos: true,
        sms_alertas: false,
    });


    const [successMessage, setSuccessMessage] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // --- Doble Factor (2FA) ---
    const [is2FAEnabled, setIs2FAEnabled] = useState(!!user?.twoFactorEnabled);
    const [show2FAModal, setShow2FAModal] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [codeError, setCodeError] = useState('');
    const [secret2FA, setSecret2FA] = useState('');
    const [otpauthUrl2FA, setOtpauthUrl2FA] = useState('');

    // --- Cambio de Contraseña ---
    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirm: ''
    });
    const [passError, setPassError] = useState('');

    // --- Modal de Confirmación Zona de Peligro ---
    const [showDangerModal, setShowDangerModal] = useState(false);

    // --- Listar sesiones activas al cargar ---
    useEffect(() => { listarSesiones(); }, [listarSesiones]);

    // --- Aplicar Acento al Cargar ---
    useEffect(() => {
        document.documentElement.style.setProperty('--color-primary', accentColor);
        localStorage.setItem('hagamostech_accent_color', accentColor);
    }, [accentColor]);

    const handleAccentChange = (colorValue) => {
        setAccentColor(colorValue);
        setSuccessMessage('¡Color de acento actualizado!');
        setShowSuccessModal(true);
    };

    const handleTogglePref = (key) => {
        setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSavePreferences = async () => {
        const result = await guardarPrefs(preferences);
        if (result.success) {
            setSuccessMessage('Preferencias guardadas correctamente.');
            setShowSuccessModal(true);
        }
    };


    // --- Handlers de Contraseña ---
    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswords(prev => ({ ...prev, [name]: value }));
        setPassError('');
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (passwords.new.length < 6) { setPassError('La nueva contraseña debe tener al menos 6 caracteres.'); return; }
        if (passwords.new !== passwords.confirm) { setPassError('La confirmación de la contraseña no coincide.'); return; }
        const result = await cambiarPassword(passwords.current, passwords.new, passwords.confirm);
        if (result.success) {
            setPasswords({ current: '', new: '', confirm: '' });
            setSuccessMessage('Tu contraseña ha sido cambiada con éxito.');
            setShowSuccessModal(true);
        } else {
            setPassError(result.message);
        }
    };

    // --- Handlers de 2FA ---
    const handleToggle2FA = () => {
        if (is2FAEnabled) {
            setIs2FAEnabled(false);
            toggle2FA(false);
            setSuccessMessage('2FA desactivada.');
            setShowSuccessModal(true);
        } else {
            setCodeError('');
            (async () => {
                const res = await setup2FA();
                if (res.success) {
                    setSecret2FA(res.secret || '');
                    setOtpauthUrl2FA(res.otpauthUrl || '');
                    setVerificationCode('');
                    setShow2FAModal(true);
                } else {
                    setSuccessMessage(res.message);
                    setShowSuccessModal(true);
                }
            })();
        }
    };

    const handleConfirm2FA = async (e) => {
        e.preventDefault();
        if (verificationCode.length !== 6 || isNaN(verificationCode)) {
            setCodeError('Código de 6 dígitos requerido.'); return;
        }
        const result = await toggle2FA(true, verificationCode);
        if (result.success) {
            setShow2FAModal(false);
            setIs2FAEnabled(true);
            setSuccessMessage('¡2FA activada!');
            setShowSuccessModal(true);
        } else {
            setCodeError(result.message);
        }
    };

    // --- Exportar Datos de Usuario (Funcional en JSON) ---
    const handleExportData = async () => {
        const result = await exportarDatos();
        if (result.success) {
            setSuccessMessage('Datos exportados correctamente.');
        } else {
            setSuccessMessage(result.message || 'Error al exportar');
        }
        setShowSuccessModal(true);
    };

    // Menú de pestañas para móviles/tablets
    const navItemsMobile = [
        { path: '/perfil', label: 'Mi Perfil', icon: 'fa-user' },
        { path: '/perfil/compras', label: 'Compras', icon: 'fa-receipt' },
        { path: '/configuracion', label: 'Config', icon: 'fa-gear' },
    ];

    return (
        <div id="config-page" className="relative overflow-hidden min-h-screen bg-white">
            <CircuitBackground />
            
            {/* Dots grid overlay */}
            <div className="absolute inset-0 opacity-[0.06] dark:opacity-[0.09] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#a41e22 2px, transparent 2px)', backgroundSize: '24px 24px' }}></div>

            <PageHero
                title="Ajustes y"
                highlight="preferencias"
                description="Personaliza la apariencia del portal, administra tus preferencias de notificaciones, sesiones activas y seguridad."
            />

            {/* MAIN LAYOUT GRID (50/50 EQUAL COLUMNS ON DESKTOP) */}
            <div className="relative">
            <section className="relative z-10 py-5 max-w-[95rem] mx-auto px-4 sm:px-6">
                <CircuitBackground />
                <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-4 items-stretch">
                    
                    {/* LEFT SIDE: SIDEBAR */}
                    <div className="rounded-[2rem] overflow-hidden shadow-xl flex flex-col h-full">
                        <ProfileSidebar
                            preferences={preferences}
                            handleTogglePref={handleTogglePref}
                            isSavingPrefs={prefLoading}
                            handleSavePreferences={handleSavePreferences}
                        />
                    </div>

                    {/* RIGHT SIDE: CONTENT & FORMS */}
                    <div className="flex flex-col gap-4">
                        
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

                        {/* PERSONALIZACIÓN VISUAL */}
                        <div className="bg-white rounded-2xl p-3 shadow-lg border border-slate-200 border-l-4 border-l-[#a41e22]">
                            <div className="bg-gradient-to-r from-red-50/90 via-white to-transparent p-2.5 rounded-xl border border-red-100/70 mb-2.5 flex items-center gap-2.5">
                                <div className="w-7 h-7 rounded-xl bg-[#a41e22] text-white flex items-center justify-center text-[11px] shadow-sm shadow-red-500/20 shrink-0">
                                    <i className="fas fa-palette"></i>
                                </div>
                                <div>
                                    <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-wider m-0">Personalización Visual</h3>
                                    <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest leading-normal m-0 mt-0.5">APARIENCIA DEL PORTAL</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Accent Color Selector */}
                                <div className="space-y-2">
                                    <h4 className="text-[10px] font-black text-slate-850 uppercase tracking-wider">Color de Acento</h4>
                                    <div className="grid grid-cols-2 gap-1.5">
                                        {ACCENT_COLORS.map((color) => {
                                            const isSelected = accentColor === color.value;
                                            return (
                                                <button
                                                    key={color.value}
                                                    onClick={() => handleAccentChange(color.value)}
                                                    className={`p-2 rounded-xl border flex items-center gap-2 transition-all cursor-pointer text-left text-[10px] ${isSelected ? `border-[#a41e22] bg-[#a41e22]/5 font-black text-[#a41e22] ring-2 ${color.ring}/25` : 'border-slate-100 bg-[#fbfdff] text-slate-700 hover:border-slate-200 dark:hover:border-slate-700'}`}
                                                >
                                                    <span className={`w-3 h-3 rounded-full shrink-0 ${color.bg} ${isSelected ? 'ring-2 ring-offset-2 ring-slate-800 dark:ring-offset-slate-900' : ''}`} />
                                                    <span className="truncate">{color.name.split(' ')[0]}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* INTERACTIVE PRIVACY METER */}
                        <div className="bg-white rounded-2xl p-3 shadow-lg border border-slate-200 border-l-4 border-l-[#a41e22]">
                            <div className="bg-gradient-to-r from-red-50/90 via-white to-transparent p-2.5 rounded-xl border border-red-100/70 mb-2.5 flex items-center gap-2.5">
                                <div className="w-7 h-7 rounded-xl bg-[#a41e22] text-white flex items-center justify-center text-[11px] shadow-sm shadow-red-500/20 shrink-0">
                                    <i className="fas fa-user-shield"></i>
                                </div>
                                <div>
                                    <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-wider m-0">Nivel de Privacidad</h3>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-normal m-0 mt-0.5">VISIBILIDAD DEL PERFIL</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                    {PRIVACY_LEVELS.map((level) => {
                                        const isSelected = privacy === level.id;
                                        return (
                                            <button
                                                key={level.id}
                                                onClick={() => setPrivacy(level.id)}
                                                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${isSelected ? 'border-[#a41e22] bg-[#a41e22]/5 font-black shadow-md ring-2 ring-[#a41e22]/15' : 'border-slate-100 bg-slate-50/50 font-bold text-slate-700 dark:text-slate-300'}`}
                                            >
                                                <div className="flex items-center justify-between w-full mb-3">
                                                    <i className={`fas ${level.icon} text-lg ${level.color}`}></i>
                                                    {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-[#a41e22]" />}
                                                </div>
                                                <div>
                                                    <p className="text-xs font-black uppercase tracking-wider">{level.name}</p>
                                                    <p className="text-[10px] text-slate-400 font-semibold mt-1 leading-snug">{level.desc}</p>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* PRIVACIDAD Y SEGURIDAD */}
                        <div className="bg-white rounded-2xl p-3 shadow-lg border border-slate-200 border-l-4 border-l-[#a41e22]">
                            <div className="bg-gradient-to-r from-red-50/90 via-white to-transparent p-2.5 rounded-xl border border-red-100/70 mb-2.5 flex items-center gap-2.5">
                                <div className="w-7 h-7 rounded-xl bg-[#a41e22] text-white flex items-center justify-center text-[11px] shadow-sm shadow-red-500/20 shrink-0">
                                    <i className="fas fa-lock"></i>
                                </div>
                                <div>
                                    <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-wider m-0">Seguridad</h3>
                                    <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest leading-normal m-0 mt-0.5">PROTECCIÓN DE LA CUENTA</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Change Password */}
                                <div className="space-y-2 border-r-0 sm:border-r border-slate-100 sm:pr-4">
                                    <h4 className="text-[10px] font-black text-slate-850 uppercase tracking-wider">Cambiar Contraseña</h4>
                                    <form onSubmit={handlePasswordSubmit} className="space-y-2">
                                        <input 
                                            type="password" 
                                            name="current"
                                            value={passwords.current}
                                            onChange={handlePasswordChange}
                                            placeholder="Contraseña Actual"
                                            required
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs focus:ring-2 focus:ring-[#a41e22]/40 outline-none font-bold placeholder:text-slate-400/50"
                                        />
                                        <input 
                                            type="password" 
                                            name="new"
                                            value={passwords.new}
                                            onChange={handlePasswordChange}
                                            placeholder="Nueva Contraseña"
                                            required
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs focus:ring-2 focus:ring-[#a41e22]/40 outline-none font-bold placeholder:text-slate-400/50"
                                        />
                                        <input 
                                            type="password" 
                                            name="confirm"
                                            value={passwords.confirm}
                                            onChange={handlePasswordChange}
                                            placeholder="Confirmar Nueva Contraseña"
                                            required
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs focus:ring-2 focus:ring-[#a41e22]/40 outline-none font-bold placeholder:text-slate-400/50"
                                        />
                                        {passError && (
                                            <p className="text-[9px] font-bold text-red-500 flex items-center gap-1"><i className="fas fa-circle-exclamation"></i> {passError}</p>
                                        )}
                                        <button 
                                            type="submit"
                                            disabled={passLoading}
                                            className="w-full py-2 rounded-xl bg-[#a41e22] hover:bg-red-800 text-white text-[10px] font-black uppercase tracking-wider shadow-sm shadow-red-500/30 transition-all cursor-pointer border-0 disabled:opacity-50"
                                        >
                                            {passLoading ? 'Cambiando...' : 'Cambiar Contraseña'}
                                        </button>
                                    </form>
                                </div>

                                {/* 2FA Setup */}
                                <div className="space-y-2 flex flex-col justify-between">
                                    <div>
                                        <h4 className="text-[10px] font-black text-slate-850 uppercase tracking-wider flex items-center gap-2">
                                            Doble Factor (2FA) 
                                            <span className={`px-2 py-0.5 rounded-full text-[7px] font-black uppercase tracking-widest ${is2FAEnabled ? 'bg-green-100 text-green-700 dark:text-green-400' : 'bg-amber-100 text-amber-700 dark:text-amber-400'}`}>
                                                {is2FAEnabled ? 'Activo' : 'Inactivo'}
                                            </span>
                                        </h4>
                                        <p className="text-[10px] text-slate-500 leading-relaxed mt-1">
                                            Protege tu cuenta con una capa adicional de seguridad.
                                        </p>
                                    </div>
                                    
                                    <div className="bg-[#fbfdff] p-2.5 rounded-xl border border-slate-100 flex items-center justify-between gap-2">
                                        <div className="flex gap-2 items-center">
                                            <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center text-sm"><i className="fas fa-mobile-screen"></i></div>
                                            <div>
                                                <p className="text-[10px] font-extrabold text-slate-800 leading-tight">Código por Aplicación</p>
                                                <p className="text-[8px] text-slate-450">Recomendado</p>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={handleToggle2FA}
                                            disabled={faLoading}
                                            className={`relative inline-flex h-6.5 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none disabled:opacity-50 ${is2FAEnabled ? 'bg-[#a41e22]' : 'bg-slate-200 dark:bg-slate-800'}`}
                                        >
                                            <span className={`pointer-events-none inline-block h-5.5 w-5.5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${is2FAEnabled ? 'translate-x-5.5' : 'translate-x-0'}`} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SESSIONS & DATA MANAGEMENT */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            
                            {/* Active Sessions */}
                            <div className="bg-white rounded-2xl p-3 shadow-lg border border-slate-200 border-l-4 border-l-[#a41e22]">
                                <div className="bg-gradient-to-r from-red-50/90 via-white to-transparent p-3.5 rounded-xl border border-red-100/70 mb-4 flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-[#a41e22] text-white flex items-center justify-center text-sm shadow-md shadow-red-500/20 shrink-0">
                                        <i className="fas fa-desktop"></i>
                                    </div>
                                    <div>
                                        <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-wider m-0">Sesiones Activas</h3>
                                        <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest leading-normal m-0 mt-0.5">DISPOSITIVOS CONECTADOS</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    {sesiones.length === 0 ? (
                                        <p className="text-xs text-slate-400 italic text-center py-6">No hay otras sesiones activas.</p>
                                    ) : (
                                        sesiones.map((sess) => (
                                            <div key={sess.id} className="flex items-center justify-between border-b border-slate-100 pb-2 last:border-0 last:pb-0">
                                                <div className="flex items-center gap-2.5">
                                                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#a41e22]/10 text-[#a41e22]">
                                                        <i className={`fas ${sess.icon} text-[10px]`}></i>
                                                    </div>
                                                    <div className="text-left">
                                                        <p className="text-[11px] font-black text-slate-850 leading-tight">{sess.device}</p>
                                                        <p className="text-[8px] text-slate-550 truncate max-w-[120px]">{sess.location} • {sess.date}</p>
                                                    </div>
                                                </div>
                                                {sess.date !== 'Conectado ahora' && (
                                                    <button 
                                                        onClick={() => revocarSesion(sess.id)}
                                                        disabled={sesLoading}
                                                        className="text-[8px] font-black uppercase tracking-wider text-red-500 hover:text-[#a41e22] cursor-pointer bg-red-50 px-2 py-1 rounded-lg border border-red-100 transition disabled:opacity-50"
                                                    >
                                                        {sesLoading ? 'Revocando...' : 'Revocar'}
                                                    </button>
                                                )}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            {/* Data Export & Danger Zone */}
                            <div className="bg-white rounded-2xl p-3 shadow-lg border border-slate-200 border-l-4 border-l-[#a41e22] flex flex-col justify-between">
                                <div>
                                    <div className="bg-gradient-to-r from-red-50/90 via-white to-transparent p-3.5 rounded-xl border border-red-100/70 mb-4 flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-[#a41e22] text-white flex items-center justify-center text-sm shadow-md shadow-red-500/20 shrink-0">
                                            <i className="fas fa-gears"></i>
                                        </div>
                                        <div>
                                            <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-wider m-0">Acciones Avanzadas</h3>
                                            <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest leading-normal m-0 mt-0.5">GESTIÓN DE DATOS</p>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <div>
                                            <h4 className="text-[10px] font-black text-slate-850 uppercase tracking-wider">Exportar Información</h4>
                                            <p className="text-[9px] text-slate-500 leading-normal mt-1">
                                                Copia de seguridad JSON de tus datos.
                                            </p>
                            <button 
                                onClick={handleExportData}
                                className="w-full mt-2 py-2 rounded-xl bg-[#a41e22] hover:bg-red-800 text-white text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer border-0"
                            >
                                <i className="fas fa-download mr-2"></i> Exportar a JSON
                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-slate-100 pt-3 mt-3">
                                    <h4 className="text-[10px] font-black text-red-650 uppercase tracking-wider">Zona de Peligro</h4>
                                    <p className="text-[9px] text-slate-500 leading-normal mt-1">
                                        Desactiva tu cuenta temporalmente.
                                    </p>
                                    <button 
                                        onClick={() => setShowDangerModal(true)}
                                        disabled={desLoading}
                                        className="w-full mt-2 py-2 rounded-xl bg-[#a41e22] hover:bg-red-800 text-white text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer border-0 disabled:opacity-50"
                                    >
                                        {desLoading ? 'Desactivando...' : 'Desactivar Cuenta'}
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            </div>

            {/* 2FA MODAL SETUP */}
            {show2FAModal && (
                <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 font-montserrat" onClick={() => setShow2FAModal(false)}>
                    <div className="bg-white rounded-2xl p-6 max-w-sm w-full border border-slate-200 shadow-2xl relative animate-fade-in" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => setShow2FAModal(false)}
                            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition cursor-pointer"
                        >
                            <i className="fas fa-times"></i>
                        </button>

                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-[#a41e22] text-2xl mb-4 shadow-sm">
                            <i className="fas fa-qrcode"></i>
                        </div>
                        <h3 className="text-lg font-black text-slate-850 mb-2">Configurar Doble Factor</h3>
                        <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                            Escanea este código QR con Google Authenticator, Duo o tu app preferida, luego ingresa el código de 6 dígitos que aparezca.
                        </p>

                        {/* Real QR Code */}
                        <div className="mx-auto w-44 h-44 bg-white border-2 border-slate-100 p-2.5 rounded-2xl flex items-center justify-center mb-3 shadow-md relative group overflow-hidden">
                            <QRCodeSVG value={otpauthUrl2FA} size={150} />
                        </div>
                        {secret2FA && (
                            <p className="text-[9px] text-slate-400 font-bold break-all text-center mb-4">Secret: {secret2FA}</p>
                        )}

                        <form onSubmit={handleConfirm2FA} className="space-y-4">
                            <div>
                                <input 
                                    type="text" 
                                    maxLength="6"
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                                    placeholder="0 0 0 0 0 0"
                                    required
                                    className="w-full text-center text-lg font-black tracking-[0.4em] px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs focus:ring-2 focus:ring-[#a41e22]/40 outline-none font-bold placeholder:text-slate-400/50"
                                />
                            </div>
                            {codeError && (
                                <p className="text-[11px] font-bold text-red-500 mt-1"><i className="fas fa-circle-exclamation mr-1"></i> {codeError}</p>
                            )}
                            <button 
                                type="submit"
                                className="w-full py-3 rounded-xl bg-[#a41e22] hover:bg-red-800 text-white text-xs font-black uppercase tracking-wider shadow-md shadow-red-500/30 transition-all cursor-pointer border-0"
                            >
                                Activar 2FA
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* DANGER CONFIRMATION MODAL */}
            {showDangerModal && (
                <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 font-montserrat" onClick={() => setShowDangerModal(false)}>
                    <div className="bg-white rounded-2xl p-6 max-w-sm w-full border border-slate-200 shadow-2xl relative animate-fade-in" onClick={(e) => e.stopPropagation()}>
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-500 text-3xl mb-6 shadow-inner">
                            <i className="fas fa-triangle-exclamation animate-pulse"></i>
                        </div>
                        <h3 className="text-xl font-black text-slate-800 mb-2">¿Desactivar tu Cuenta?</h3>
                        <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                            Al hacer esto, se suspenderán temporalmente tus accesos a cursos y libros digitales. Podrás reactivarla en cualquier momento comunicándote con el equipo de soporte.
                        </p>
                        <div className="flex flex-col gap-2.5">
                            <button 
                                onClick={async () => {
                                    setShowDangerModal(false);
                                    const result = await desactivarCuenta();
                                    if (result.success) {
                                        navigate('/');
                                    } else {
                                        setSuccessMessage(result.message);
                                        setShowSuccessModal(true);
                                    }
                                }}
                                className="w-full py-3 rounded-xl bg-[#a41e22] hover:bg-red-800 text-white text-xs font-black uppercase tracking-wider shadow-md shadow-red-500/30 transition-all cursor-pointer border-0"
                            >
                                Confirmar Desactivación
                            </button>
                            <button 
                                onClick={() => setShowDangerModal(false)}
                                className="w-full py-3 rounded-xl bg-slate-700 hover:bg-slate-800 text-white text-xs font-black uppercase tracking-wider transition-colors cursor-pointer border-0"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* GENERAL SUCCESS MODAL */}
            {showSuccessModal && (
                <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 font-montserrat" onClick={() => setShowSuccessModal(false)}>
                    <div className="bg-white rounded-2xl p-6 max-w-sm w-full border border-slate-200 shadow-2xl relative animate-fade-in" onClick={(e) => e.stopPropagation()}>
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-500 text-3xl mb-6 shadow-inner">
                            <i className="fas fa-circle-check"></i>
                        </div>
                        <h3 className="text-xl font-black text-slate-800 mb-2">Configuración Guardada</h3>
                        <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                            {successMessage}
                        </p>
                        <button 
                            onClick={() => setShowSuccessModal(false)}
                            className="w-full py-3 rounded-xl bg-[#a41e22] hover:bg-red-800 text-white text-xs font-black uppercase tracking-wider shadow-md shadow-red-500/30 transition-all cursor-pointer border-0"
                        >
                            Aceptar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConfiguracionPagina;
