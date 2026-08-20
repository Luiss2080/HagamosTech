import React from 'react';
import { HeaderSistema, TarjetaFicha, TituloFicha, FieldVer, MiniVer } from '../../components/FormSystem';
import { tipoClase, tipoIcono, tipoLabel, estadoClase, formatearFecha } from '../constantes';

const HornoShowView = ({ registro, onBackToList }) => {
  if (!registro) return null;

  return (
    <div className="space-y-4 font-montserrat w-full">
      <HeaderSistema
        icon="fas fa-fire-burner"
        breadcrumbs={['Operaciones', 'Horno', 'Detalle del Registro']}
        titulo={`REGISTRO: ${registro.codigo}`}
        subtitulo={`Vista de solo lectura · ${formatearFecha(registro.creadoEn)}`}
        onVolver={onBackToList}
        volverTexto="Volver al listado"
      />

      <div className="flex flex-col lg:flex-row gap-4 items-start w-full relative">
        {/* COLUMNA IZQUIERDA */}
        <div className="w-full lg:w-72 shrink-0 lg:sticky lg:top-4 space-y-4 self-start">
          <TarjetaFicha className="flex flex-col items-center text-center gap-3">
            <span className="block text-[7px] font-black text-slate-400 uppercase tracking-widest">CÓDIGO #{registro.id}</span>
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0 border ${registro.tipo === 'merma' ? 'bg-red-50 border-red-200 text-red-500' : 'bg-emerald-50 border-emerald-200 text-emerald-600'}`}>
              <i className={tipoIcono(registro.tipo)}></i>
            </div>
            <h3 className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wide leading-snug m-0">{registro.producto?.nombre}</h3>
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase ${tipoClase(registro.tipo)}`}>{tipoLabel(registro.tipo)}</span>
              <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase ${estadoClase(registro.estado)}`}>{registro.estado}</span>
            </div>
            <div className="w-full border-t border-slate-100 my-1"></div>
            <div className="w-full grid grid-cols-1 gap-2 text-left">
              <MiniVer label="Cantidad" icon="fas fa-hashtag" value={registro.cantidad} />
              <MiniVer label="Sucursal" icon="fas fa-store" value={registro.sucursal?.nombre} />
            </div>
            <div className="w-full flex gap-2 pt-2 border-t border-slate-100">
              <button type="button" onClick={() => window.print()} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#E95A0C] to-red-700 text-white font-black text-[9px] uppercase tracking-widest transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 border-0">
                <i className="fas fa-print text-[10px]"></i><span>Imprimir</span>
              </button>
            </div>
          </TarjetaFicha>
        </div>

        {/* COLUMNA DERECHA */}
        <div className="flex-1 w-full space-y-4">
          <TarjetaFicha>
            <TituloFicha icon="fas fa-info-circle">FICHA TÉCNICA DEL REGISTRO</TituloFicha>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FieldVer icon="fas fa-hashtag" label="Identificador" value={`#${registro.id}`} />
              <FieldVer icon="fas fa-barcode" label="Código" value={registro.codigo} />
              <FieldVer icon="fas fa-fire-burner" label="Tipo" value={tipoLabel(registro.tipo)} />
              <FieldVer icon="fas fa-box-open" label="Producto" value={registro.producto?.nombre} />
              <FieldVer icon="fas fa-store" label="Sucursal" value={registro.sucursal?.nombre} />
              <FieldVer icon="fas fa-hashtag" label="Cantidad" value={registro.cantidad} />
              <FieldVer icon="fas fa-circle-check" label="Estado" value={registro.estado} />
              <FieldVer icon="fas fa-calendar" label="Fecha" value={formatearFecha(registro.creadoEn)} />
              <FieldVer icon="fas fa-comment-dots" label="Motivo" value={registro.motivo} span />
              {registro.observaciones && <FieldVer icon="fas fa-align-justify" label="Observaciones" value={registro.observaciones} span />}
            </div>
          </TarjetaFicha>
        </div>
      </div>
    </div>
  );
};

export default HornoShowView;