const EditorImagenPerfil = ({ gradients, userAvatar, displayName, photoError, onFileUpload, onPresetSelect }) => (
    <section className="rounded-2xl border border-white/10 bg-[#090b08]/95 p-4 text-white">
        <div className="mb-3 flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#A3E635] text-[#0A0A0A]"><i className="fas fa-camera" /></span>
            <div>
                <h3 className="m-0 text-[11px] font-black uppercase tracking-wider">Imagen de perfil</h3>
                <p className="m-0 mt-0.5 text-[9px] text-slate-500">Foto y avatar</p>
            </div>
        </div>

        <div className="flex items-center gap-3">
            <div className="relative shrink-0">
                <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border-2 border-white bg-slate-100 text-xl font-black text-[#84CC16]">
                    {userAvatar ? <img src={userAvatar} alt="Perfil" className="h-full w-full object-cover" /> : displayName.split(' ').map((name) => name[0]).join('').toUpperCase().slice(0, 2)}
                </div>
                <label className="absolute -bottom-1 -right-1 flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border-2 border-[#090b08] bg-[#A3E635] text-xs text-[#0A0A0A]" aria-label="Subir foto de perfil">
                    <i className="fas fa-pen" />
                    <input type="file" accept="image/*" className="hidden" onChange={onFileUpload} />
                </label>
            </div>
            <p className="m-0 text-[10px] leading-relaxed text-slate-400">Elegí una foto o un avatar de color.</p>
        </div>

        {photoError && <p role="alert" className="mt-3 rounded-lg border border-rose-400/25 bg-rose-950/30 px-3 py-2 text-[10px] font-semibold text-rose-100">{photoError}</p>}

        <div className="mt-4 grid grid-cols-3 gap-2">
            {gradients.map((gradient) => (
                <button key={gradient.id} type="button" onClick={() => onPresetSelect(gradient)} title={gradient.name} className="group flex flex-col items-center gap-1.5 rounded-xl border border-white/10 bg-black/25 p-2 transition hover:border-[#A3E635]/50 hover:bg-[#A3E635]/5">
                    <span className="h-7 w-7 rounded-lg shadow" style={{ background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})` }} />
                    <span className="w-full truncate text-center text-[8px] font-bold uppercase text-slate-400">{gradient.name.split(' ')[0]}</span>
                </button>
            ))}
        </div>
    </section>
);

export default EditorImagenPerfil;
