import { Link } from 'react-router-dom';

const areas = [
  {
    ruta: '/que-hacemos/tecnologia',
    titulo: 'Desarrollo digital',
    descripcion: 'Páginas web, aplicaciones y software a medida, con alcance y viabilidad acordados.',
    icono: 'fa-laptop-code',
  },
  {
    ruta: '/que-hacemos/academia',
    titulo: 'Acompañamiento académico',
    descripcion: 'Mentorías, tareas guiadas, informes, monografías y proyectos socioformativos.',
    icono: 'fa-graduation-cap',
  },
  {
    ruta: '/que-hacemos/negocios',
    titulo: 'Emprendimientos y profesionales',
    descripcion: 'Diseño, identidad visual, recursos para negocios y desarrollo profesional.',
    icono: 'fa-briefcase',
  },
  {
    ruta: '/que-hacemos/personalizado',
    titulo: 'Solicitud personalizada',
    descripcion: 'Contanos qué necesitás y revisaremos si corresponde a nuestras áreas de trabajo.',
    icono: 'fa-compass',
  },
];

export default function AreasTrabajo() {
  return (
    <section id="areas-trabajo" className="relative border-t border-white/5 bg-[#080808] px-5 py-16 text-white sm:px-8 sm:py-20" aria-labelledby="areas-trabajo-titulo">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-xs font-black uppercase tracking-[0.2em] text-[#A3E635]">Elegí por dónde empezar</p>
        <h2 id="areas-trabajo-titulo" className="mx-auto mt-3 max-w-3xl text-center text-3xl font-black leading-tight sm:text-4xl">
          ¿Qué estás buscando resolver?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center leading-relaxed text-neutral-400">
          Explorá nuestras áreas y encontrá la ruta que mejor describe tu necesidad.
        </p>
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {areas.map((area) => (
            <Link
              key={area.ruta}
              to={area.ruta}
              className="group min-h-52 rounded-2xl border border-white/10 bg-white/[0.035] p-6 transition hover:-translate-y-1 hover:border-[#A3E635]/45 hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A3E635]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#A3E635]/10 text-xl text-[#A3E635]" aria-hidden="true">
                <i className={`fa-solid ${area.icono}`} />
              </span>
              <h3 className="mt-5 text-lg font-bold text-white group-hover:text-[#A3E635]">{area.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">{area.descripcion}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#A3E635]">
                Explorar <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export { areas as AREAS_TRABAJO };
