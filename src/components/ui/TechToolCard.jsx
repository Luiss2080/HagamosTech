import React from 'react';

const BRAND_LOGOS = {
  'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  'Vite': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg',
  'HTML5': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  'CSS3': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  'Tailwind CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  'Express': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  'MySQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  'Prisma': 'https://cdn.simpleicons.org/prisma',
  'Git': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  'GitHub': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
  'Figma': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
  'Postman': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg',
  'Vitest': 'https://cdn.simpleicons.org/vitest',
  'Playwright': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/playwright/playwright-original.svg',
  'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  'R': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg',
  'SPSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spss/spss-original.svg',
  'MATLAB': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matlab/matlab-original.svg',
  'LaTeX': 'https://cdn.simpleicons.org/latex',
  'Mendeley': 'https://cdn.simpleicons.org/mendeley',
  'Google Docs': 'https://cdn.simpleicons.org/googledocs',
  'Google Sheets': 'https://cdn.simpleicons.org/googlesheets',
  'Canva': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg',
  'Zotero': 'https://cdn.simpleicons.org/zotero',
  'RStudio': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rstudio/rstudio-original.svg',
  'Cisco Packet Tracer': 'https://cdn.simpleicons.org/cisco',
  'draw.io': 'https://cdn.simpleicons.org/diagramsdotnet',
  'Visual Studio Code': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
};

const TOOL_TAGS = {
  React: 'Frontend UI', JavaScript: 'Lógica web', TypeScript: 'Lógica tipada', Vite: 'Build tool',
  HTML5: 'Estructura web', CSS3: 'Estilos web', 'Tailwind CSS': 'Diseño y estilo', 'Node.js': 'Backend API',
  Express: 'Backend API', MySQL: 'Base de datos', Prisma: 'ORM y base de datos', Zustand: 'Estado de interfaz',
  'REST API': 'Integración de servicios', Git: 'Control de versiones', GitHub: 'Repositorios', Figma: 'Diseño UI/UX',
  Postman: 'Pruebas de API', Vitest: 'Pruebas de código', Playwright: 'Pruebas web', Python: 'Programación',
  SPSS: 'Análisis estadístico', MATLAB: 'Cálculo y simulación', LaTeX: 'Edición científica', Mendeley: 'Referencias',
  R: 'Análisis estadístico', 'APA 7': 'Norma de citación', 'Microsoft Word': 'Documentos', PowerPoint: 'Presentaciones',
  Excel: 'Hojas de cálculo', 'Google Docs': 'Documentos', 'Google Sheets': 'Hojas de cálculo', Canva: 'Diseño visual',
  Zotero: 'Referencias', RStudio: 'Entorno estadístico', JASP: 'Análisis estadístico', GeoGebra: 'Matemática',
  Desmos: 'Matemática', 'Cisco Packet Tracer': 'Redes', 'draw.io': 'Diagramas', 'Visual Studio Code': 'Editor de código',
};

const TechToolCard = ({ item, index, onDetails }) => (
  <article className="flex min-h-[148px] w-[min(290px,86vw)] shrink-0 items-center gap-3 rounded-[20px] border border-neutral-100 border-b-[5px] border-b-[#A3E635] bg-white p-3.5 text-left shadow-[0_8px_30px_rgba(0,0,0,.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,.2)] sm:w-[320px] sm:gap-4 sm:p-4">
    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[14px] border border-gray-100 bg-gray-50/70 p-2 sm:h-20 sm:w-20">
      {item.logo || BRAND_LOGOS[item.name] ? (
        <img
          src={item.logo || BRAND_LOGOS[item.name]}
          alt={`${item.name} logo`}
          loading="lazy"
          decoding="async"
          className="max-h-full max-w-full object-contain"
          onError={(event) => {
            event.currentTarget.hidden = true;
            event.currentTarget.nextElementSibling.hidden = false;
          }}
        />
      ) : null}
      <span hidden={Boolean(item.logo || BRAND_LOGOS[item.name])} aria-hidden="true" className="text-lg font-black tracking-tight text-slate-700">{item.name.slice(0, 3)}</span>
    </div>
    <div className="h-20 w-px shrink-0 bg-gradient-to-b from-transparent via-[#A3E635]/50 to-transparent" />
    <div className="flex min-w-0 flex-1 flex-col self-stretch py-1">
      <div className="mb-2">
        <div className="mb-1 flex items-start gap-1.5">
          <span className="text-[11px] font-black text-[#84CC16] sm:text-xs">{String(index + 1).padStart(2, '0')}</span>
          <h3 className="line-clamp-2 text-[11px] font-extrabold uppercase leading-tight text-gray-800 sm:text-xs" title={item.name}>{item.name}</h3>
        </div>
        <p className="truncate text-[8px] font-bold uppercase tracking-[.14em] text-gray-500 sm:text-[9px]">{item.tag || TOOL_TAGS[item.name] || 'Recurso tecnológico'}</p>
        <p className="mt-1.5 line-clamp-1 text-[9px] font-semibold text-gray-400">{item.cardDescription || 'Uso según los requisitos del proyecto'}</p>
      </div>
      {onDetails && (
        <button
          type="button"
          onClick={() => onDetails(item)}
          className="mt-auto flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#A3E635] py-1.5 text-[9px] font-bold text-[#0A0A0A] shadow-sm transition-colors hover:bg-[#0a0a0a] hover:text-white sm:text-[10px]"
        >
          VER DETALLES <span aria-hidden="true">↗</span>
        </button>
      )}
    </div>
  </article>
);

export default TechToolCard;
