import CatalogoServicios from '../../Servicios/CatalogoServicios';

export default function Negocios() {
  return (
    <CatalogoServicios
      categorias={['emprendedores', 'empleo', 'diseno', 'web']}
      etiqueta="Emprendimientos y profesionales"
      titulo="Diseño, presencia digital y desarrollo profesional"
      descripcion="Explorá recursos para presentar un emprendimiento, comunicar una oferta, mostrar tu experiencia profesional o desarrollar una presencia web. Cada proyecto se revisa según el alcance acordado."
    />
  );
}
