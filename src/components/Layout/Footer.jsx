import React from "react";
import { Link, useLocation } from "react-router-dom";
import ParticulasCirculares from "../fondos/ParticulasCirculares";

const Footer = () => {
  const location = useLocation();

  const menuLinks = [
    { name: "Salteñas Clásicas", path: "/menu#saltenas", icon: "fa-fire" },
    { name: "Bebidas y Refrescos", path: "/menu#refrescos", icon: "fa-leaf" },
    { name: "Cafetería", path: "/menu#cafes", icon: "fa-mug-hot" },
    { name: "Ofertas y Combos", path: "/promociones", icon: "fa-tags" },
    { name: "Delivery Express", path: "/servicios/delivery", icon: "fa-motorcycle" },
  ];

  const nosotrosLinks = [
    { name: "Nuestra Historia", path: "/sobre-nosotros", icon: "fa-clock" },
    { name: "Sucursales", path: "/sucursales/santa-cruz", icon: "fa-map-marked-alt" },
    { name: "Calidad y Tradición", path: "/sobre-nosotros#calidad", icon: "fa-medal" },
    { name: "Eventos y Catering", path: "/servicios/eventos", icon: "fa-glass-cheers" },
    { name: "Trabaja con Nosotros", path: "/contacto", icon: "fa-briefcase" },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#8B3A13] to-[#5C2307] text-[#FFE8D6] pt-16 pb-8 border-t-[5px] border-[#FF4D00] z-10 overflow-hidden shadow-[0_-10px_30px_rgba(0,0,0,0.3)]">
      
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
                alt="Logo HAGAMOSTECH"
                className="h-32 w-auto object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-xl"
              />
            </Link>
            <p className="text-[#FFE8D6]/90 text-[14px] leading-relaxed max-w-sm font-medium">
              El verdadero sabor tradicional, horneado diariamente con los mejores ingredientes para alegrar tus mañanas. Desde Santa Cruz para el mundo.
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
                  className={`w-11 h-11 rounded-full bg-black/20 border border-white/10 flex items-center justify-center text-[#FFE8D6] ${social.hover} hover:text-white hover:border-transparent transition-all duration-300 group hover:-translate-y-2 shadow-lg hover:shadow-xl`}
                >
                  <i className={`fab ${social.icon} text-lg group-hover:-translate-y-1 transition-transform`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* COLUMNA 2: MENU (3 cols) */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left px-4 lg:pl-12">
            <h3 className="text-white font-black text-[15px] tracking-widest uppercase mb-8 flex items-center justify-center lg:justify-start gap-3 w-full">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF4D00] shadow-[0_0_10px_rgba(255,77,0,1)]"></span>
              NUESTRO MENÚ
            </h3>
            <ul className="space-y-5 w-full flex flex-col items-center lg:items-start">
              {menuLinks.map((link, i) => (
                <li key={i} className="w-full max-w-[200px] lg:max-w-none">
                  <Link to={link.path} className="group flex items-center justify-start gap-4 text-[#FFE8D6]/90 hover:text-white transition-colors duration-300 w-full hover:-translate-y-1">
                    <div className="w-9 h-9 rounded-lg bg-black/20 border border-white/5 flex items-center justify-center group-hover:bg-[#FF4D00] transition-colors duration-300 shadow-inner shrink-0">
                      <i className={`fas ${link.icon} text-[13px] text-[#FF4D00] group-hover:text-white transition-colors`}></i>
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
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF4D00] shadow-[0_0_10px_rgba(255,77,0,1)]"></span>
              NOSOTROS
            </h3>
            <ul className="space-y-5 w-full flex flex-col items-center lg:items-start">
              {nosotrosLinks.map((link, i) => (
                <li key={i} className="w-full max-w-[200px] lg:max-w-none">
                  <Link to={link.path} className="group flex items-center justify-start gap-4 text-[#FFE8D6]/90 hover:text-white transition-colors duration-300 w-full hover:-translate-y-1">
                    <div className="w-9 h-9 rounded-lg bg-black/20 border border-white/5 flex items-center justify-center group-hover:bg-[#FF4D00] transition-colors duration-300 shadow-inner shrink-0">
                      <i className={`fas ${link.icon} text-[13px] text-[#FF4D00] group-hover:text-white transition-colors`}></i>
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
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF4D00] shadow-[0_0_10px_rgba(255,77,0,1)]"></span>
              CONTACTO
            </h3>
            <ul className="space-y-6 w-full flex flex-col items-center lg:items-start">
              <li className="flex items-center justify-start gap-4 group hover:-translate-y-1 transition-transform w-full max-w-[250px] lg:max-w-none">
                <div className="w-10 h-10 rounded-lg bg-black/20 border border-white/5 flex items-center justify-center shrink-0 group-hover:bg-[#FF4D00] transition-colors duration-300 shadow-inner">
                  <i className="fas fa-location-dot text-[#FF4D00] text-[15px] group-hover:text-white transition-colors"></i>
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] font-black text-white/60 uppercase tracking-widest mb-1">Sede Central</span>
                  <span className="text-[14px] text-[#FFE8D6]/90 font-medium leading-snug group-hover:text-white transition-colors">Av. San Martín y 2do Anillo<br />Equipetrol, Santa Cruz</span>
                </div>
              </li>
              <li className="flex items-center justify-start gap-4 group hover:-translate-y-1 transition-transform w-full max-w-[250px] lg:max-w-none">
                <div className="w-10 h-10 rounded-lg bg-black/20 border border-white/5 flex items-center justify-center shrink-0 group-hover:bg-[#FF4D00] transition-colors duration-300 shadow-inner">
                  <i className="fas fa-envelope text-[#FF4D00] text-[15px] group-hover:text-white transition-colors"></i>
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] font-black text-white/60 uppercase tracking-widest mb-1">Email</span>
                  <a href="mailto:contacto@hagamostech.bo" className="text-[14px] text-[#FFE8D6]/90 font-medium hover:text-white transition-colors">contacto@hagamostech.bo</a>
                </div>
              </li>
              <li className="flex items-center justify-start gap-4 group hover:-translate-y-1 transition-transform w-full max-w-[250px] lg:max-w-none">
                <div className="w-10 h-10 rounded-lg bg-black/20 border border-white/5 flex items-center justify-center shrink-0 group-hover:bg-[#FF4D00] transition-colors duration-300 shadow-inner">
                  <i className="fas fa-phone text-[#FF4D00] text-[15px] group-hover:text-white transition-colors"></i>
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] font-black text-white/60 uppercase tracking-widest mb-1">Teléfono / Pedidos</span>
                  <a href="tel:+59161320004" className="text-[14px] text-[#FFE8D6]/90 font-medium hover:text-white transition-colors">+591 61320004</a>
                </div>
              </li>
              <li className="flex items-center justify-start gap-4 group hover:-translate-y-1 transition-transform w-full max-w-[250px] lg:max-w-none">
                <div className="w-10 h-10 rounded-lg bg-black/20 border border-white/5 flex items-center justify-center shrink-0 group-hover:bg-[#FF4D00] transition-colors duration-300 shadow-inner">
                  <i className="fas fa-clock text-[#FF4D00] text-[15px] group-hover:text-white transition-colors"></i>
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] font-black text-white/60 uppercase tracking-widest mb-1">Horarios</span>
                  <span className="text-[14px] text-[#FFE8D6]/90 font-medium group-hover:text-white transition-colors">Lun - Dom: 07:00 - 22:00</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[13px] text-[#FFE8D6]/70 font-semibold tracking-wide">
            &copy; {new Date().getFullYear()} HagamosTech. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacidad" className="text-[13px] font-semibold text-[#FFE8D6]/70 hover:text-white transition-colors">Política de Privacidad</Link>
            <Link to="/terminos" className="text-[13px] font-semibold text-[#FFE8D6]/70 hover:text-white transition-colors">Términos de Servicio</Link>
            <Link to="/cookies" className="text-[13px] font-semibold text-[#FFE8D6]/70 hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
