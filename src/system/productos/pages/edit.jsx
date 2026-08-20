import React from 'react';
import ProductoForm from './ProductoForm';

const ProductoEditView = ({ productoForm, setProductoForm, submitProducto, onBackToList, categorias }) => (
  <ProductoForm form={productoForm} set={setProductoForm} onBackToList={onBackToList} onSubmit={submitProducto} categorias={categorias} modo="editar" titulo={`Modificar Producto #${productoForm.id}`} />
);

export default ProductoEditView;