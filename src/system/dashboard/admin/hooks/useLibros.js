import { useState } from 'react';
import apiClient from '../../../../servicios/clienteApi';
const showAlert = () => {};

const useLibros = (user) => {
  const [libros, setLibros] = useState([]);
  const [loadingLibros, setLoadingLibros] = useState(false);
  const [buscarLibro, setBuscarLibro] = useState('');
  const [libroEditando, setLibroEditando] = useState(null);
  const [nuevoLibroForm, setNuevoLibroForm] = useState({
    codigo: '', titulo: '', nivel: 'PRIMARIA', grado: '', precioVenta: '', stockActual: '0', stockMinimo: '5', descripcion: ''
  });

  const cargarLibros = async () => {
    setLoadingLibros(true);
    try {
      const { data } = await apiClient.get(`/libros-sistema?buscar=${buscarLibro}`);
      if (data.success) {
        setLibros(data.libros);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingLibros(false);
    }
  };

  const submitLibro = async (e, callbacks = {}) => {
    e.preventDefault();
    try {
      const payload = { ...nuevoLibroForm, usuarioId: user?.id };

      if (libroEditando) {
        const { data } = await apiClient.put(`/libros-sistema/${libroEditando.id}`, payload);
        if (data.success) {
          showAlert({ title: 'Actualizado', message: 'Detalles del libro actualizados', type: 'success' });
        }
      } else {
        const { data } = await apiClient.post('/libros-sistema', payload);
        if (data.success) {
          showAlert({ title: 'Creado', message: 'Nuevo libro registrado en catálogo', type: 'success' });
        }
      }
      setLibroEditando(null);
      setNuevoLibroForm({
        codigo: '', titulo: '', nivel: 'PRIMARIA', grado: '', precioVenta: '', stockActual: '0', stockMinimo: '5', descripcion: ''
      });
      cargarLibros();
      if (callbacks.onSuccess) callbacks.onSuccess();
    } catch (error) {
      const msg = error.response?.data?.mensaje || 'Error al procesar libro';
      showAlert({ title: 'Error', message: msg, type: 'error' });
    }
  };

  const eliminarLibro = async (id) => {
    if (!window.confirm('¿Seguro que deseas dar de baja este libro?')) return;
    try {
      const { data } = await apiClient.delete(`/libros-sistema/${id}`);
      if (data.success) {
        showAlert({ title: 'Eliminado', message: 'El libro fue removido del catálogo activo', type: 'success' });
        cargarLibros();
      }
    } catch (error) {
      showAlert({ title: 'Error', message: 'No se pudo eliminar el libro', type: 'error' });
    }
  };

  return {
    libros,
    loadingLibros,
    buscarLibro,
    libroEditando,
    nuevoLibroForm,
    setBuscarLibro,
    setLibroEditando,
    setNuevoLibroForm,
    cargarLibros,
    submitLibro,
    eliminarLibro,
  };
};

export default useLibros;
