import { useState } from 'react';
import apiClient from '../../../../servicios/clienteApi';

const FORM_VACIO = {
  nombre: '',
  enlace: '',
  categoriaId: '',
  precio: '',
  precioAnterior: '',
  descuento: '',
  calificacion: '',
  imagen: '',
  insignia: '',
  descripcion: '',
  descripcionCorta: '',
  disponibilidad: 'En stock',
  stock: 0,
  activo: true
};

const useProductos = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [productoForm, setProductoForm] = useState(FORM_VACIO);
  const [productoEditando, setProductoEditando] = useState(null);

  const cargarProductos = async () => {
    try {
      const { data } = await apiClient.get('/productos-sistema');
      if (data.success) setProductos(data.productos || []);
    } catch (error) {
      console.error(error);
    }
  };

  const cargarCategorias = async () => {
    try {
      const { data } = await apiClient.get('/productos-sistema/categorias');
      if (data.success) setCategorias(data.categorias || []);
    } catch (error) {
      console.error(error);
    }
  };

  const submitProducto = async (e) => {
    e.preventDefault();
    try {
      if (productoEditando) {
        const { data } = await apiClient.put(`/productos-sistema/${productoEditando.id}`, productoForm);
        if (data.success) {
          setProductoForm(FORM_VACIO);
          setProductoEditando(null);
          cargarProductos();
          return true;
        }
        return false;
      }
      const { data } = await apiClient.post('/productos-sistema', productoForm);
      if (data.success) {
        setProductoForm(FORM_VACIO);
        cargarProductos();
        return true;
      }
      return false;
    } catch (error) {
      const msg = error.response?.data?.mensaje || error.response?.data?.error || 'Error al procesar el producto';
      alert(msg);
      return false;
    }
  };

  const eliminarProducto = async (id) => {
    try {
      const { data } = await apiClient.delete(`/productos-sistema/${id}`);
      if (data.success) {
        cargarProductos();
        return true;
      }
      return false;
    } catch (error) {
      const msg = error.response?.data?.mensaje || error.response?.data?.error || 'No se pudo eliminar el producto';
      alert(msg);
      return false;
    }
  };

  return {
    productos,
    categorias,
    productoForm,
    productoEditando,
    setProductoForm,
    setProductoEditando,
    cargarProductos,
    cargarCategorias,
    submitProducto,
    eliminarProducto
  };
};

export default useProductos;