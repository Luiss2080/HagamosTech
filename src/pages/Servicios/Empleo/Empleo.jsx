import CatalogoServicios from '../CatalogoServicios';

export default function Empleo() {
  return (
    <CatalogoServicios
      categorias={['empleo']}
      etiqueta="Desarrollo profesional"
      titulo="Presentá tu experiencia con claridad"
      descripcion="Te ayudamos a organizar tu perfil profesional, preparar documentos de postulación y practicar para entrevistas."
    />
  );
}
