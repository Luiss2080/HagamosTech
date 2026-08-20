import React from 'react';
import HornoForm from './HornoForm';

const HornoEditView = ({ form, set, onBackToList, onSubmit, productos, sucursales }) => (
  <HornoForm form={form} set={set} onBackToList={onBackToList} onSubmit={onSubmit} productos={productos} sucursales={sucursales} modo="editar" titulo={`Modificar Registro #${form.id}`} />
);

export default HornoEditView;