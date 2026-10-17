import CatalogoServicios from '../../Servicios/CatalogoServicios';

export default function Negocios() {
  return (
    <CatalogoServicios
      categorias={['emprendedores', 'web']}
      etiqueta="Para emprendimientos"
      titulo="Diseño y desarrollo para hacer visible tu negocio"
      descripcion="Te ayudamos a presentar tu marca y tu oferta con recursos gráficos, catálogos digitales y páginas web."
    />
  );
}
