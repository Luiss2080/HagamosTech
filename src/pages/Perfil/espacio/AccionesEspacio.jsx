import { CalendarPlus, ClipboardPlus, NotebookPen } from 'lucide-react';
import { estilosBoton } from './estilosEspacio';

const acciones = [
  { tipo: 'proyecto', label: 'Nuevo proyecto', icon: ClipboardPlus },
  { tipo: 'nota', label: 'Nueva nota', icon: NotebookPen },
  { tipo: 'evento', label: 'Nuevo recordatorio', icon: CalendarPlus },
];

const AccionesEspacio = ({ onCrear }) => (
  <div aria-label="Acciones rápidas" className="flex flex-wrap justify-center gap-2.5">
    {acciones.map(({ tipo, label, icon: ActionIcon }, index) => (
      <button
        key={tipo}
        type="button"
        onClick={() => onCrear(tipo)}
        className={index === 0 ? estilosBoton.principal : estilosBoton.secundario}
      >
        <ActionIcon size={15} aria-hidden="true" /> {label}
      </button>
    ))}
  </div>
);

export default AccionesEspacio;
