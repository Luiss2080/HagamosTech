import { Link } from 'react-router-dom';

const pasos = [
  ['Contanos', 'Explicanos qué querés resolver o qué idea querés desarrollar.'],
  ['Revisamos', 'Evaluamos el alcance y si corresponde a nuestras áreas de trabajo.'],
  ['Proponemos', 'Definimos entregables, tiempos y presupuesto antes de iniciar.'],
  ['Desarrollamos', 'Realizamos el trabajo acordado y presentamos el resultado.'],
];

const areas = ['Desarrollo web', 'Software', 'Diseño gráfico', 'Acompañamiento académico'];

export default function Personalizado() {
  return (
    <main className="min-h-screen bg-[#050505] px-5 pb-20 pt-28 text-white sm:px-8">
      <section className="mx-auto max-w-6xl">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#A3E635]">Soluciones a medida</p>
        <h1 className="max-w-4xl text-4xl font-black leading-tight sm:text-6xl">
          Empecemos por entender lo que necesitás
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-neutral-300">
          Si tu pedido no encaja en una categoría, contanos la idea. Revisamos si podemos ayudarte
          desde nuestras áreas de desarrollo digital, diseño o acompañamiento académico.
        </p>
        <ul className="mt-6 flex flex-wrap gap-3">
          {areas.map((area) => (
            <li key={area} className="rounded-full border border-white/10 px-4 py-2 text-sm text-neutral-300">{area}</li>
          ))}
        </ul>
        <Link to="/contactanos" className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[#A3E635] px-7 font-bold text-[#0A0A0A] transition hover:bg-[#84CC16] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A3E635]">
          Contarnos mi proyecto
        </Link>
      </section>

      <section className="mx-auto mt-16 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4" aria-label="Etapas de trabajo">
        {pasos.map(([titulo, detalle], index) => (
          <article key={titulo} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm font-black text-[#A3E635]">0{index + 1}</p>
            <h2 className="mt-4 text-xl font-bold">{titulo}</h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-400">{detalle}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
