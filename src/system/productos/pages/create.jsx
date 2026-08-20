import React from 'react';
import ProductoForm from './ProductoForm';

const ProductoCreateView = ({ productoForm, setProductoForm, submitProducto, onBackToList, categorias }) => (
  <ProductoForm form={productoForm} set={setProductoForm} onBackToList={onBackToList} onSubmit={submitProducto} categorias={categorias} modo="crear" titulo="Registrar Nuevo Producto" />
);

export default ProductoCreateView;