import { Link } from 'react-router-dom';

const pasos = [
  { titulo: 'Nos contás tu necesidad', detalle: 'Compartí qué querés resolver, para quién y con qué objetivo.' },
  { titulo: 'Revisamos el alcance', detalle: 'Acordamos las funciones, los materiales y los entregables del proyecto.' },
  { titulo: 'Recibís una propuesta', detalle: 'Te presentamos tiempos y presupuesto antes de iniciar.' },
];

export default function PromocionesPagina() {
  return (
    <main className="min-h-screen bg-[#050505] px-5 pb-20 pt-28 text-white sm:px-8">
      <section className="mx-auto max-w-5xl">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#A3E635]">Proyectos a medida</p>
        <h1 className="max-w-4xl text-4xl font-black leading-tight sm:text-6xl">
          Una propuesta clara antes de empezar
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-neutral-300">
          El costo depende del servicio, el alcance y los entregables acordados. Contanos tu idea y
          revisamos contigo la viabilidad, los tiempos y el presupuesto.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {pasos.map((paso, index) => (
            <article key={paso.titulo} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <p className="text-sm font-black text-[#A3E635]">0{index + 1}</p>
              <h2 className="mt-4 text-xl font-bold">{paso.titulo}</h2>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">{paso.detalle}</p>
            </article>
          ))}
        </div>
        <Link
          to="/contactanos"
          className="mt-9 inline-flex min-h-12 items-center justify-center rounded-full bg-[#A3E635] px-7 font-bold text-[#0A0A0A] transition hover:bg-[#84CC16] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A3E635]"
        >
          Solicitar propuesta
        </Link>
      </section>
    </main>
  );
}
