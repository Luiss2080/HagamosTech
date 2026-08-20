import React from 'react';
import CompraForm from './CompraForm';

const CompraEditView = ({ form, set, onBackToList, onSubmit, productos, sucursales }) => (
  <CompraForm form={form} set={set} onBackToList={onBackToList} onSubmit={onSubmit} productos={productos} sucursales={sucursales} modo="editar" titulo={`Modificar Compra #${form.id}`} />
);

export default CompraEditView;