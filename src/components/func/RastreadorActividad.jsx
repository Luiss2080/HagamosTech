import { useEffect, useRef } from 'react';
import useAuthStore from '../../store/useAutenticacionStore';

const CHECK_INTERVAL = 30000;

const RastreadorActividad = () => {
  const checkSessionTimeout = useAuthStore((s) => s.checkSessionTimeout);
  const touchActivity = useAuthStore((s) => s.touchActivity);
  const intervalRef = useRef(null);

  useEffect(() => {
    const handleActivity = () => touchActivity();

    window.addEventListener('mousedown', handleActivity, { passive: true });
    window.addEventListener('keydown', handleActivity, { passive: true });
    window.addEventListener('touchstart', handleActivity, { passive: true });
    window.addEventListener('scroll', handleActivity, { passive: true });

    intervalRef.current = setInterval(() => {
      checkSessionTimeout();
    }, CHECK_INTERVAL);

    return () => {
      window.removeEventListener('mousedown', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [checkSessionTimeout, touchActivity]);

  return null;
};

export default RastreadorActividad;
