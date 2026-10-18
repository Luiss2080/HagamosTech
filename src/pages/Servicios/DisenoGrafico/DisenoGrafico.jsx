import CatalogoServicios from '../CatalogoServicios';

export default function DisenoGrafico() {
  return (
    <CatalogoServicios
      categorias={['diseno']}
      etiqueta="Diseño gráfico"
      titulo="Diseño para comunicar tus ideas"
      descripcion="Diseñamos identidades visuales y piezas gráficas para medios digitales e impresos."
    />
  );
}
