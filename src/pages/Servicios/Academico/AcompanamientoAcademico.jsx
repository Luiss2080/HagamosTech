import { Link } from 'react-router-dom';
import { SERVICIOS_DATA } from '../../../data/serviciosData';

const servicios = SERVICIOS_DATA.estudiantes;

export default function AcompanamientoAcademico() {
  return (
    <main className="min-h-screen bg-[#050505] px-5 pb-20 pt-28 text-white sm:px-8">
      <section className="mx-auto max-w-6xl">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#A3E635]">
          Para colegio, secundaria y universidad
        </p>
        <h1 className="max-w-4xl text-4xl font-black leading-tight sm:text-6xl">
          Acompañamiento académico para avanzar con claridad
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-neutral-300">
          Mentorías y orientación para comprender temas, organizar tareas y desarrollar informes,
          monografías y proyectos socioformativos. También apoyamos con presentaciones, recursos
          visuales y proyectos de programación.
        </p>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-neutral-400">
          Trabajamos sobre las pautas de tu materia. Te explicamos, revisamos avances y te damos
          herramientas para que desarrolles y presentes tu propio trabajo.
        </p>
        <Link
          to="/contactanos"
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[#A3E635] px-7 font-bold text-[#0A0A0A] transition hover:bg-[#84CC16] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A3E635]"
        >
          Consultar acompañamiento
        </Link>
      </section>

      <section className="mx-auto mt-16 max-w-6xl" aria-labelledby="servicios-academicos">
        <h2 id="servicios-academicos" className="text-2xl font-black sm:text-3xl">
          ¿En qué podemos acompañarte?
        </h2>
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {servicios.map((servicio) => (
            <article
              key={servicio.id}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#A3E635]/10 text-[#A3E635]" aria-hidden="true">
                <i className={`fa-solid ${servicio.icon}`} />
              </div>
              <h3 className="text-lg font-bold">{servicio.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">{servicio.shortDesc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl rounded-3xl border border-[#A3E635]/20 bg-[#A3E635]/[0.06] p-7 sm:p-10">
        <h2 className="text-2xl font-black">Empezamos por tu consigna</h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-neutral-300">
          Compartinos el nivel, la materia, las instrucciones y la fecha de entrega. Revisamos el
          pedido y te explicamos qué tipo de acompañamiento podemos ofrecer.
        </p>
        <Link to="/contactanos" className="mt-6 inline-flex font-bold text-[#A3E635] hover:underline">
          Contanos qué necesitás <span className="ml-2" aria-hidden="true">→</span>
        </Link>
      </section>
    </main>
  );
}
