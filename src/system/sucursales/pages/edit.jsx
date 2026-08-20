import React from 'react';
import SucursalForm from './SucursalForm';

const SucursalEditView = ({ form, set, onBackToList, onSubmit }) => (
  <SucursalForm form={form} set={set} onBackToList={onBackToList} onSubmit={onSubmit} modo="editar" titulo={`Modificar Sucursal #${form.id}`} />
);

export default SucursalEditView;