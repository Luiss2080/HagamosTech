import React from "react";
import { Link, useLocation } from "react-router-dom";
import ParticulasCirculares from "../fondos/ParticulasCirculares";

const Footer = () => {
  const location = useLocation();

  const menuLinks = [
    { name: "Tecnología", path: "/#tecnologia", icon: "fa-microchip" },
    { name: "Academia", path: "/#academia", icon: "fa-graduation-cap" },
    { name: "Negocios", path: "/#negocios", icon: "fa-store" },
    { name: "Soluciones personalizadas", path: "/#personalizado", icon: "fa-lightbulb" },
    { name: "Cómo trabajamos", path: "/#flujo", icon: "fa-diagram-project" },
  ];

  const nosotrosLinks = [
    { name: "Cómo trabajamos", path: "/#flujo", icon: "fa-diagram-project" },
    { name: "Nuestras soluciones", path: "/#que-hacemos", icon: "fa-layer-group" },
    { name: "Contanos tu idea", path: "/contactanos", icon: "fa-comment-dots" },
    { name: "Apoyo y soporte", path: "/contactanos", icon: "fa-headset" },
    { name: "Trabajá con nosotros", path: "/contactanos", icon: "fa-briefcase" },
  ];

  return (
    <footer className="relative bg-[#0A0A0A] text-white/80 pt-16 pb-8 border-t-[5px] border-[#A3E635] z-10 overflow-hidden shadow-[0_-10px_30px_rgba(0,0,0,0.4)]">

      {/* Fondo de Partículas */}
      <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen">
        <ParticulasCirculares />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Main Grid with Vertical Dividers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-y-12 lg:gap-y-0 lg:divide-x lg:divide-white/10 mb-12">

          {/* COLUMNA 1: BRAND (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-center text-center px-4 lg:pr-10 space-y-6">
            <Link to="/" className="group inline-block">
              <img
                src="/img/02_Logos/LogoFooter.png"
                alt="Logo HagamosTech"
                className="h-32 w-auto object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-xl"
              />
            </Link>
            <p className="text-white/70 text-[14px] leading-relaxed max-w-sm font-medium">
              Transformamos problemas, necesidades e ideas en soluciones reales usando tecnología, creatividad y conocimiento. Vos tenés la necesidad, hagámosla juntos.
            </p>
            <div className="flex items-center justify-center gap-4 pt-3">
              {[
                { icon: "fa-facebook-f", href: "https://www.facebook.com/HagamosTech", hover: "hover:bg-[#1877F2]" },
                { icon: "fa-instagram", href: "https://www.instagram.com/hagamostech/", hover: "hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF]" },
                { icon: "fa-tiktok", href: "https://www.tiktok.com/@hagamostech", hover: "hover:bg-black" },
                { icon: "fa-whatsapp", href: "https://wa.me/59161320004", hover: "hover:bg-[#25D366]" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 ${social.hover} hover:text-white hover:border-transparent transition-all duration-300 group hover:-translate-y-2 shadow-lg hover:shadow-xl`}
                >
                  <i className={`fab ${social.icon} text-lg group-hover:-translate-y-1 transition-transform`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* COLUMNA 2: SOLUCIONES (3 cols) */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left px-4 lg:pl-12">
            <h3 className="text-white font-black text-[15px] tracking-widest uppercase mb-8 flex items-center justify-center lg:justify-start gap-3 w-full">
              <span className="w-2.5 h-2.5 rounded-full bg-[#A3E635] shadow-[0_0_10px_rgba(163,230,53,1)]"></span>
              SOLUCIONES
            </h3>
            <ul className="space-y-5 w-full flex flex-col items-center lg:items-start">
              {menuLinks.map((link, i) => (
                <li key={i} className="w-full max-w-[200px] lg:max-w-none">
                  <Link to={link.path} className="group flex items-center justify-start gap-4 text-white/80 hover:text-white transition-colors duration-300 w-full hover:-translate-y-1">
                    <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#A3E635] transition-colors duration-300 shadow-inner shrink-0">
                      <i className={`fas ${link.icon} text-[13px] text-[#A3E635] group-hover:text-[#0A0A0A] transition-colors`}></i>
                    </div>
                    <span className="text-[14px] font-semibold">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMNA 3: NOSOTROS (2 cols) */}
          <div className="lg:col-span-2 flex flex-col items-center lg:items-start text-center lg:text-left px-4 lg:pl-10">
            <h3 className="text-white font-black text-[15px] tracking-widest uppercase mb-8 flex items-center justify-center lg:justify-start gap-3 w-full">
              <span className="w-2.5 h-2.5 rounded-full bg-[#A3E635] shadow-[0_0_10px_rgba(163,230,53,1)]"></span>
              NOSOTROS
            </h3>
            <ul className="space-y-5 w-full flex flex-col items-center lg:items-start">
              {nosotrosLinks.map((link, i) => (
                <li key={i} className="w-full max-w-[200px] lg:max-w-none">
                  <Link to={link.path} className="group flex items-center justify-start gap-4 text-white/80 hover:text-white transition-colors duration-300 w-full hover:-translate-y-1">
                    <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#A3E635] transition-colors duration-300 shadow-inner shrink-0">
                      <i className={`fas ${link.icon} text-[13px] text-[#A3E635] group-hover:text-[#0A0A0A] transition-colors`}></i>
                    </div>
                    <span className="text-[14px] font-semibold">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMNA 4: CONTACTO (3 cols) */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left px-4 lg:pl-12">
            <h3 className="text-white font-black text-[15px] tracking-widest uppercase mb-8 flex items-center justify-center lg:justify-start gap-3 w-full">
              <span className="w-2.5 h-2.5 rounded-full bg-[#A3E635] shadow-[0_0_10px_rgba(163,230,53,1)]"></span>
              CONTACTO
            </h3>
            <ul className="space-y-6 w-full flex flex-col items-center lg:items-start">
              <li className="flex items-center justify-start gap-4 group hover:-translate-y-1 transition-transform w-full max-w-[250px] lg:max-w-none">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#A3E635] transition-colors duration-300 shadow-inner">
                  <i className="fas fa-location-dot text-[#A3E635] text-[15px] group-hover:text-[#0A0A0A] transition-colors"></i>
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] font-black text-white/50 uppercase tracking-widest mb-1">Oficina principal</span>
                  <span className="text-[14px] text-white/80 font-medium leading-snug group-hover:text-white transition-colors">Av. San Martín y 2do Anillo<br />Equipetrol, Santa Cruz</span>
                </div>
              </li>
              <li className="flex items-center justify-start gap-4 group hover:-translate-y-1 transition-transform w-full max-w-[250px] lg:max-w-none">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#A3E635] transition-colors duration-300 shadow-inner">
                  <i className="fas fa-envelope text-[#A3E635] text-[15px] group-hover:text-[#0A0A0A] transition-colors"></i>
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] font-black text-white/50 uppercase tracking-widest mb-1">Email</span>
                  <a href="mailto:contacto@hagamostech.bo" className="text-[14px] text-white/80 font-medium hover:text-white transition-colors">contacto@hagamostech.bo</a>
                </div>
              </li>
              <li className="flex items-center justify-start gap-4 group hover:-translate-y-1 transition-transform w-full max-w-[250px] lg:max-w-none">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#A3E635] transition-colors duration-300 shadow-inner">
                  <i className="fas fa-phone text-[#A3E635] text-[15px] group-hover:text-[#0A0A0A] transition-colors"></i>
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] font-black text-white/50 uppercase tracking-widest mb-1">Teléfono / WhatsApp</span>
                  <a href="tel:+59161320004" className="text-[14px] text-white/80 font-medium hover:text-white transition-colors">+591 61320004</a>
                </div>
              </li>
              <li className="flex items-center justify-start gap-4 group hover:-translate-y-1 transition-transform w-full max-w-[250px] lg:max-w-none">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#A3E635] transition-colors duration-300 shadow-inner">
                  <i className="fas fa-clock text-[#A3E635] text-[15px] group-hover:text-[#0A0A0A] transition-colors"></i>
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] font-black text-white/50 uppercase tracking-widest mb-1">Horarios</span>
                  <span className="text-[14px] text-white/80 font-medium group-hover:text-white transition-colors">Lun - Vie: 09:00 - 18:00</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[13px] text-white/60 font-semibold tracking-wide">
            &copy; {new Date().getFullYear()} HagamosTech. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacidad" className="text-[13px] font-semibold text-white/60 hover:text-[#A3E635] transition-colors">Política de Privacidad</Link>
            <Link to="/terminos" className="text-[13px] font-semibold text-white/60 hover:text-[#A3E635] transition-colors">Términos de Servicio</Link>
            <Link to="/cookies" className="text-[13px] font-semibold text-white/60 hover:text-[#A3E635] transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
