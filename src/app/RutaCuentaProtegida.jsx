import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/useAutenticacionStore';
import useModalStore from '../store/useModalStore';

const RutaCuentaProtegida = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const openModal = useModalStore((state) => state.openModal);

  useEffect(() => {
    if (isInitialized && !isAuthenticated) openModal('loginModal');
  }, [isInitialized, isAuthenticated, openModal]);

  if (!isInitialized) return <div className="min-h-[60vh]" aria-hidden="true" />;
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return children;
};

export const RutaComprasHeredada = () => <Navigate to="/perfil" replace />;

export default RutaCuentaProtegida;
