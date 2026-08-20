import React from 'react';
import PedidoForm from './PedidoForm';

const PedidoEditView = ({ form, set, onBackToList, onSubmit, productos, zonas, repartidores }) => (
  <PedidoForm form={form} set={set} onBackToList={onBackToList} onSubmit={onSubmit} productos={productos} zonas={zonas} repartidores={repartidores} modo="editar" titulo={`Modificar Pedido #${form.id}`} />
);

export default PedidoEditView;