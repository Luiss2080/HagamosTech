const ProgresoPerfil = ({ completion }) => (
    <section className="rounded-2xl border border-white/10 bg-[#090b08]/95 p-4 text-white">
        <div className="mb-3 flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#A3E635] text-[#0A0A0A]"><i className="fas fa-chart-line" /></span>
            <div>
                <h3 className="m-0 text-[11px] font-black uppercase tracking-wider">Tu perfil</h3>
                <p className="m-0 mt-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-500">Completitud</p>
            </div>
            <strong className="ml-auto text-sm text-[#A3E635]">{completion}%</strong>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full border border-white/15 bg-white/10">
            <div className="h-full rounded-full bg-[#A3E635] transition-all duration-700" style={{ width: `${completion}%` }} />
        </div>
        <p className="mb-0 mt-2 text-[10px] leading-relaxed text-slate-400">
            {completion === 100 ? 'Tu perfil está completo.' : 'Completa tus datos para que tu cuenta esté lista.'}
        </p>
    </section>
);

export default ProgresoPerfil;
