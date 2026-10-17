import React from 'react';

const Ubicacion = () => (
    <section aria-labelledby="contact-channels-title" className="relative z-10 border-y border-[#A3E635]/15 py-12 sm:py-16">
        <div className="container mx-auto max-w-5xl px-6">
            <div className="mb-8 text-center">
                <h2 id="contact-channels-title" className="text-2xl font-black text-white sm:text-3xl">Canales de contacto</h2>
                <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/70">Elegí el canal que te resulte más cómodo. Para contarnos los detalles de tu necesidad, también podés usar el formulario de esta página.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
                <a href="https://wa.me/59161320004" target="_blank" rel="noopener noreferrer" className="flex min-h-24 items-center gap-4 rounded-2xl border border-[#A3E635]/25 bg-white/[0.04] p-5 text-white transition-colors hover:bg-white/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A3E635]">
                    <span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/15 text-2xl text-[#25D366]"><i className="fab fa-whatsapp" /></span>
                    <span><span className="block text-xs font-bold uppercase tracking-wider text-white/60">WhatsApp</span><span className="mt-1 block font-extrabold">+591 61320004</span></span>
                </a>
                <a href="mailto:contacto@hagamostech.bo" className="flex min-h-24 items-center gap-4 rounded-2xl border border-[#A3E635]/25 bg-white/[0.04] p-5 text-white transition-colors hover:bg-white/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A3E635]">
                    <span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#A3E635]/15 text-xl text-[#A3E635]"><i className="fas fa-envelope" /></span>
                    <span><span className="block text-xs font-bold uppercase tracking-wider text-white/60">Correo electrónico</span><span className="mt-1 block break-all font-extrabold">contacto@hagamostech.bo</span></span>
                </a>
            </div>
        </div>
    </section>
);

export default Ubicacion;
