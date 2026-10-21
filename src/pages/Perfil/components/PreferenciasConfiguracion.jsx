const COLORES_ACENTO = [
    { nombre: 'Rojo', valor: '#ef4444', bg: 'bg-red-500' },
    { nombre: 'Dorado', valor: '#d4a72c', bg: 'bg-amber-400' },
    { nombre: 'Azul', valor: '#1d4ed8', bg: 'bg-blue-700' },
    { nombre: 'Verde', valor: '#10b981', bg: 'bg-[#10b981]' },
];

const PreferenciasConfiguracion = ({ accentColor, onAccentChange, preferences, onToggle, error, saving, onSave }) => (
    <div className="rounded-2xl border border-white/10 bg-[#090b08]/95 p-4 text-white">
        <section id="personalizacion" className="scroll-mt-36 border-b border-white/10 pb-4">
            <div className="mb-3 flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#A3E635] text-[#0A0A0A]"><i className="fas fa-palette" /></span>
                <div>
                    <h3 className="m-0 text-[11px] font-black uppercase tracking-wider">Personalización</h3>
                    <p className="m-0 mt-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-500">Color de acento</p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
                {COLORES_ACENTO.map((color) => {
                    const seleccionado = accentColor === color.valor;
                    return (
                        <button
                            key={color.valor}
                            type="button"
                            aria-pressed={seleccionado}
                            onClick={() => onAccentChange(color.valor)}
                            className={`flex items-center gap-2 rounded-xl border px-2.5 py-2 text-left text-[10px] font-bold transition ${seleccionado ? 'border-[#A3E635] bg-[#A3E635]/10 text-[#A3E635]' : 'border-white/10 bg-black/20 text-slate-200 hover:border-[#A3E635]/50'}`}
                        >
                            <span className={`h-3 w-3 shrink-0 rounded-full ${color.bg}`} />{color.nombre}
                        </button>
                    );
                })}
            </div>
        </section>

        <section id="notificaciones" className="scroll-mt-36 pt-4">
            <div className="mb-3 flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#A3E635] text-[#0A0A0A]"><i className="fas fa-bell" /></span>
                <div>
                    <h3 className="m-0 text-[11px] font-black uppercase tracking-wider">Notificaciones</h3>
                    <p className="m-0 mt-0.5 text-[9px] font-bold text-slate-500">Elegí qué avisos recibir</p>
                </div>
            </div>
            <div className="grid gap-2">
                {[
                    { key: 'email_promociones', label: 'Promociones por email' },
                    { key: 'email_pedidos', label: 'Novedades de cuenta' },
                    { key: 'sms_alertas', label: 'Alertas de seguridad' },
                ].map((item) => (
                    <button key={item.key} type="button" aria-pressed={preferences[item.key]} onClick={() => onToggle(item.key)} className="flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-2.5 py-2 text-left text-[10px] font-bold text-slate-200 transition hover:border-[#A3E635]/40">
                        {item.label}<span className={`h-2.5 w-2.5 shrink-0 rounded-full ${preferences[item.key] ? 'bg-[#A3E635] shadow-[0_0_10px_rgba(163,230,53,.65)]' : 'bg-slate-600'}`} />
                    </button>
                ))}
            </div>
            {error && <p role="alert" className="mt-3 rounded-lg border border-rose-400/25 bg-rose-950/30 px-3 py-2 text-[10px] font-semibold text-rose-100">{error}</p>}
            <button type="button" onClick={onSave} disabled={saving} className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#A3E635] px-3 py-2.5 text-[10px] font-black uppercase tracking-wider text-[#0A0A0A] transition hover:bg-[#84CC16] disabled:cursor-wait disabled:opacity-60">
                <i className={`fas ${saving ? 'fa-spinner fa-spin' : 'fa-floppy-disk'}`} />{saving ? 'Guardando...' : 'Guardar preferencias'}
            </button>
        </section>
    </div>
);

export default PreferenciasConfiguracion;
