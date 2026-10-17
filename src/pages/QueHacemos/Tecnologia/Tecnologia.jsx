import SolucionesDesarrollo from '../../Servicios/SolucionesDesarrollo';

export default function Tecnologia() {
  return (
    <SolucionesDesarrollo
      categorias={['web', 'software']}
      etiqueta="Soluciones digitales"
      titulo="Desarrollo web y software para tus ideas"
      descripcion="Creamos páginas web, aplicaciones y sistemas digitales para personas, emprendimientos e instituciones. Escuchamos tu necesidad y evaluamos contigo la solución adecuada."
    />
  );
}
