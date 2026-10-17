const pasos = [
  ['Contanos', 'Explicanos tu idea, consigna o necesidad.'],
  ['Analizamos', 'Revisamos el alcance y confirmamos si corresponde a nuestras áreas de trabajo.'],
  ['Proponemos', 'Acordamos entregables, tiempos y presupuesto antes de empezar.'],
  ['Desarrollamos', 'Realizamos el trabajo definido en la propuesta.'],
  ['Entregamos', 'Presentamos el resultado y las indicaciones incluidas en el acuerdo.'],
];

export default function ProcesoTrabajo() {
  return (
    <section id="flujo" className="border-t border-white/5 bg-[#050505] px-5 py-16 text-white sm:px-8 sm:py-20" aria-labelledby="proceso-trabajo-titulo">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-xs font-black uppercase tracking-[0.2em] text-[#A3E635]">Un proceso claro</p>
        <h2 id="proceso-trabajo-titulo" className="mt-3 text-center text-3xl font-black sm:text-4xl">De la consulta a la entrega</h2>
        <ol className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {pasos.map(([titulo, detalle], index) => (
            <li key={titulo} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
              <span className="text-sm font-black text-[#A3E635]">0{index + 1}</span>
              <h3 className="mt-3 text-lg font-bold">{titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">{detalle}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export { pasos as PASOS_TRABAJO };
