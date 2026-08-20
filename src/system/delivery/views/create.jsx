import React from 'react';
import PedidoForm from './PedidoForm';

const PedidoCreateView = ({ form, set, onBackToList, onSubmit, productos, zonas, repartidores }) => (
  <PedidoForm form={form} set={set} onBackToList={onBackToList} onSubmit={onSubmit} productos={productos} zonas={zonas} repartidores={repartidores} modo="crear" titulo="Registrar Pedido a Domicilio" />
);

export default PedidoCreateView;