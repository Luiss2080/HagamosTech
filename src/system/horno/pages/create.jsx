import React from 'react';
import HornoForm from './HornoForm';

const HornoCreateView = ({ form, set, onBackToList, onSubmit, productos, sucursales }) => (
  <HornoForm form={form} set={set} onBackToList={onBackToList} onSubmit={onSubmit} productos={productos} sucursales={sucursales} modo="crear" titulo="Registrar Producción o Merma" />
);

export default HornoCreateView;