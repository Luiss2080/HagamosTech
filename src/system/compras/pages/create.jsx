import React from 'react';
import CompraForm from './CompraForm';

const CompraCreateView = ({ form, set, onBackToList, onSubmit, productos, sucursales }) => (
  <CompraForm form={form} set={set} onBackToList={onBackToList} onSubmit={onSubmit} productos={productos} sucursales={sucursales} modo="crear" titulo="Registrar Nueva Compra" />
);

export default CompraCreateView;