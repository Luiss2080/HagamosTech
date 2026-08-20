import React from 'react';
import SucursalForm from './SucursalForm';

const SucursalCreateView = ({ form, set, onBackToList, onSubmit }) => (
  <SucursalForm form={form} set={set} onBackToList={onBackToList} onSubmit={onSubmit} modo="crear" titulo="Registrar Nueva Sucursal" />
);

export default SucursalCreateView;