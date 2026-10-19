import React from 'react';
import { Link } from 'react-router-dom';
import FondoTech from '../fondos/FondoTech';

const solutionsLinks = [
  { name: 'Tecnología', path: '/que-hacemos/tecnologia' },
  { name: 'Academia', path: '/que-hacemos/academia' },
  { name: 'Negocios', path: '/que-hacemos/negocios' },
  { name: 'Soluciones personalizadas', path: '/que-hacemos/personalizado' },
  { name: 'Cómo trabajamos', path: '/como-trabajamos' },
];

const aboutLinks = [
  { name: 'Cómo trabajamos', path: '/como-trabajamos' },
  { name: 'Nuestras soluciones', path: '/servicios/desarrollo-web' },
  { name: 'Contanos tu idea', path: '/contactanos' },
  { name: 'Apoyo y soporte', path: '/contactanos' },
  { name: 'Trabajá con nosotros', path: '/contactanos' },
];

const socialLinks = [
  { name: 'Facebook', icon: 'fa-facebook-f', href: 'https://www.facebook.com/HagamosTech' },
  { name: 'Instagram', icon: 'fa-instagram', href: 'https://www.instagram.com/hagamostech/' },
  { name: 'TikTok', icon: 'fa-tiktok', href: 'https://www.tiktok.com/@hagamostech' },
  { name: 'WhatsApp', icon: 'fa-whatsapp', href: 'https://wa.me/59161320004' },
];

const FooterLinkList = ({ title, links }) => (
  <section aria-labelledby={`footer-${title.toLowerCase().replace(/\s+/g, '-')}`}>
    <h2 id={`footer-${title.toLowerCase().replace(/\s+/g, '-')}`} className="mb-5 flex items-center gap-2.5 text-xs font-black uppercase tracking-[.2em] text-white">
      <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#A3E635] shadow-[0_0_12px_rgba(163,230,53,.85)]" />
      {title}
    </h2>
    <ul className="space-y-3">
      {links.map(({ name, path }) => (
        <li key={name}>
          <Link to={path} className="group inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition-colors hover:text-[#A3E635]">
            <i aria-hidden="true" className="fa-solid fa-arrow-right text-[9px] text-[#A3E635]/60 transition-transform group-hover:translate-x-1 group-hover:text-[#A3E635]" />
            {name}
          </Link>
        </li>
      ))}
    </ul>
  </section>
);

const ContactItem = ({ icon, title, children }) => (
  <li className="flex items-start gap-3">
    <span aria-hidden="true" className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#A3E635]/20 bg-[#A3E635]/[.08] text-sm text-[#A3E635]">
      <i className={`fa-solid ${icon}`} />
    </span>
    <span className="min-w-0">
      <span className="block text-[10px] font-black uppercase tracking-[.16em] text-slate-500">{title}</span>
      <span className="mt-1 block text-sm font-medium leading-relaxed text-slate-300">{children}</span>
    </span>
  </li>
);

const Footer = () => (
  <footer className="relative isolate z-10 overflow-hidden border-t border-[#A3E635]/25 bg-[#050505] text-white/80">
    <FondoTech />
    <div className="relative z-10 mx-auto max-w-7xl px-6 pb-7 pt-14 sm:px-8 sm:pt-16 lg:px-10">
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-12 xl:gap-x-10">
        <section aria-label="HagamosTech" className="xl:col-span-4">
          <Link to="/" aria-label="HagamosTech, ir al inicio" className="inline-flex rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635]">
            <img src="/img/02_Logos/LogoHeader.png" alt="HagamosTech" className="h-12 w-auto object-contain sm:h-14" />
          </Link>
          <p className="mt-5 max-w-md text-sm font-medium leading-relaxed text-slate-300">
            Transformamos problemas, necesidades e ideas en soluciones reales usando tecnología, creatividad y conocimiento. Vos tenés la necesidad, hagámosla juntos.
          </p>
          <ul aria-label="Redes sociales" className="mt-6 flex flex-wrap gap-2.5">
            {socialLinks.map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[.04] text-slate-300 transition hover:-translate-y-0.5 hover:border-[#A3E635]/50 hover:bg-[#A3E635] hover:text-[#0A0A0A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635]"
                >
                  <i aria-hidden="true" className={`fab ${social.icon}`} />
                </a>
              </li>
            ))}
          </ul>
        </section>

        <div className="xl:col-span-2">
          <FooterLinkList title="Soluciones" links={solutionsLinks} />
        </div>

        <div className="xl:col-span-2">
          <FooterLinkList title="Nosotros" links={aboutLinks} />
        </div>

        <section aria-labelledby="footer-contacto" className="xl:col-span-4">
          <h2 id="footer-contacto" className="mb-5 flex items-center gap-2.5 text-xs font-black uppercase tracking-[.2em] text-white">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#A3E635] shadow-[0_0_12px_rgba(163,230,53,.85)]" />
            Contacto
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
            <ContactItem icon="fa-location-dot" title="Oficina principal">
              Av. San Martín y 2do Anillo<br />Equipetrol, Santa Cruz
            </ContactItem>
            <ContactItem icon="fa-envelope" title="Email">
              <a href="mailto:contacto@hagamostech.bo" className="break-all transition-colors hover:text-[#A3E635]">contacto@hagamostech.bo</a>
            </ContactItem>
            <ContactItem icon="fa-phone" title="Teléfono / WhatsApp">
              <a href="tel:+59161320004" className="transition-colors hover:text-[#A3E635]">+591 61320004</a>
            </ContactItem>
            <ContactItem icon="fa-clock" title="Horarios">Lun - Vie: 09:00 - 18:00</ContactItem>
          </ul>
        </section>
      </div>

      <div className="mt-12 flex flex-col gap-5 border-t border-white/10 pt-6 text-center sm:mt-14 md:flex-row md:items-center md:justify-between md:text-left">
        <p className="text-xs font-medium tracking-wide text-slate-400">© {new Date().getFullYear()} HagamosTech. Todos los derechos reservados.</p>
        <nav aria-label="Información legal" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 md:justify-end">
          <Link to="/privacidad" className="text-xs font-semibold text-slate-400 transition-colors hover:text-[#A3E635]">Política de Privacidad</Link>
          <Link to="/terminos" className="text-xs font-semibold text-slate-400 transition-colors hover:text-[#A3E635]">Términos de Servicio</Link>
          <Link to="/cookies" className="text-xs font-semibold text-slate-400 transition-colors hover:text-[#A3E635]">Cookies</Link>
        </nav>
      </div>
    </div>
  </footer>
);

export default Footer;
