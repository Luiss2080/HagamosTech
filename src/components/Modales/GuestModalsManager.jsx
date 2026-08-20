import React, { useEffect, useState, useCallback } from 'react';
import useAuthStore from '../../store/useAutenticacionStore';
import ModalModoInvitado from './ModalModoInvitado';
import ModalRecordatorioInvitado from './ModalRecordatorioInvitado';
import ModalFinInvitado from './ModalFinInvitado';

const INVITADO_KEY = 'lc_invitado';
const INVITADO_FIN_KEY = 'lc_invitado_fin';

const esAccesoTotal = (user) => {
    if (!user) return false;
    if (user.rolId === 1) return true;
    const rolNombre = (user.rolNombre || '').toLowerCase();
    return /profesor|docente|profes/.test(rolNombre);
};

const GuestModalsManager = () => {
    const { isAuthenticated, user, fetchProfile } = useAuthStore();
    
    const [isModoInvitadoOpen, setIsModoInvitadoOpen] = useState(false);
    const [isRecordatorioOpen, setIsRecordatorioOpen] = useState(false);
    const [isFinInvitadoOpen, setIsFinInvitadoOpen] = useState(false);
    
    const [diasRestantes, setDiasRestantes] = useState(0);

    const revisarEstadoInvitado = useCallback(() => {
        if (!isAuthenticated) return;
        if (esAccesoTotal(user)) return;

        const invitado = localStorage.getItem(INVITADO_KEY);
        const finStr = localStorage.getItem(INVITADO_FIN_KEY);

        if (invitado !== 'activo' || !finStr) {
            const rechazado = localStorage.getItem('invitado_rechazado') === 'true';
            if (!rechazado && !sessionStorage.getItem('invitado_visto_sesion')) {
                setIsModoInvitadoOpen(true);
                sessionStorage.setItem('invitado_visto_sesion', 'true');
            }
            return;
        }

        const fin = new Date(finStr);
        const hoy = new Date();
        const diffTime = fin - hoy;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (isNaN(diffDays)) return;

        if (diffDays <= 0) {
            if (!sessionStorage.getItem('fin_invitado_visto')) {
                setIsFinInvitadoOpen(true);
                sessionStorage.setItem('fin_invitado_visto', 'true');
            }
        } else {
            setDiasRestantes(diffDays);
            if (!sessionStorage.getItem('recordatorio_visto')) {
                setIsRecordatorioOpen(true);
                sessionStorage.setItem('recordatorio_visto', 'true');
            }
        }
    }, [isAuthenticated, user]);

    useEffect(() => {
        revisarEstadoInvitado();
    }, [revisarEstadoInvitado]);

    useEffect(() => {
        const handleAbrirInvitado = () => {
            const sub = user?.suscripcion || {};
            const invitadoActivado = sub.invitadoActivado || localStorage.getItem(INVITADO_KEY) === 'activo';

            if (!invitadoActivado) {
                setIsModoInvitadoOpen(true);
                return;
            }

            const finStr = localStorage.getItem(INVITADO_FIN_KEY);
            const fin = finStr ? new Date(finStr) : null;
            const diffDays = fin ? Math.ceil((fin - new Date()) / (1000 * 60 * 60 * 24)) : 0;

            if (isNaN(diffDays) || diffDays <= 0) {
                setIsFinInvitadoOpen(true);
            } else {
                setDiasRestantes(diffDays);
                setIsRecordatorioOpen(true);
            }
        };
        const handleActualizado = () => {
            sessionStorage.removeItem('recordatorio_visto');
            sessionStorage.removeItem('fin_invitado_visto');
            sessionStorage.removeItem('invitado_visto_sesion');
            if (fetchProfile) fetchProfile();
            revisarEstadoInvitado();
        };
        window.addEventListener('abrirModalInvitado', handleAbrirInvitado);
        window.addEventListener('invitadoActualizado', handleActualizado);

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                revisarEstadoInvitado();
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            window.removeEventListener('abrirModalInvitado', handleAbrirInvitado);
            window.removeEventListener('invitadoActualizado', handleActualizado);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [revisarEstadoInvitado, user, fetchProfile]);

    return (
        <>
            <ModalModoInvitado 
                isOpen={isModoInvitadoOpen} 
                onClose={() => setIsModoInvitadoOpen(false)} 
            />
            
            <ModalRecordatorioInvitado 
                isOpen={isRecordatorioOpen} 
                onClose={() => setIsRecordatorioOpen(false)} 
                diasRestantes={diasRestantes}
            />
            
            <ModalFinInvitado 
                isOpen={isFinInvitadoOpen} 
                onClose={() => setIsFinInvitadoOpen(false)}
            />
        </>
    );
};

export default GuestModalsManager;
