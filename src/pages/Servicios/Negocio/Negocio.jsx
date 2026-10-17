import CatalogoServicios from '../CatalogoServicios';

export default function Negocio() {
  return (
    <CatalogoServicios
      categorias={['emprendedores']}
      etiqueta="Emprendimientos"
      titulo="Dale forma y presencia a tu negocio"
      descripcion="Creamos identidad visual, catálogos digitales y piezas de comunicación para presentar tus productos y servicios."
    />
  );
}
