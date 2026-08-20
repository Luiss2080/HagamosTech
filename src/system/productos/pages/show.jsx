import React from 'react';
import { HeaderSistema, TarjetaFicha, TituloFicha, FieldVer, MiniVer } from '../../components/FormSystem';
import { formatearBs, calcularDescuento } from '../constantes';

const ProductoShowView = ({ producto, onBackToList, onEdit }) => {
  if (!producto) return null;
  const descuento = calcularDescuento(producto.precio, producto.precioAnterior);
  const fecha = producto.fechaCreacion ? new Date(producto.fechaCreacion).toLocaleDateString() : '—';

  return (
    <div className="space-y-4 font-montserrat w-full">
      <HeaderSistema
        icon="fas fa-box-open"
        breadcrumbs={['Comercial', 'Productos', 'Detalle del Producto']}
        titulo={`PRODUCTO: ${producto.nombre}`}
        subtitulo="Vista de solo lectura — ítem del menú de la salteñería."
        onVolver={onBackToList}
        volverTexto="Volver al listado"
      />

      <div className="flex flex-col lg:flex-row gap-4 items-start w-full relative">
        {/* COLUMNA IZQUIERDA */}
        <div className="w-full lg:w-72 shrink-0 lg:sticky lg:top-4 space-y-4 self-start">
          <TarjetaFicha className="flex flex-col items-center text-center gap-3">
            <span className="block text-[7px] font-black text-slate-400 uppercase tracking-widest">CÓDIGO #{producto.id}</span>
            <div className="w-28 h-28 rounded-2xl overflow-hidden bg-[#FFF5EC] border border-orange-200/60 shadow-md">
              {producto.imagen ? <img src={producto.imagen} alt={producto.nombre} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-4xl text-[#E95A0C]"><i className="fas fa-utensils"></i></div>}
            </div>
            <h3 className="text-sm font-black text-slate-800 dark:text-slate-200 uppercase tracking-wide m-0">{producto.nombre}</h3>
            {producto.insignia && <span className="px-3 py-1 rounded-full bg-[#E95A0C] text-white text-[9px] font-black uppercase tracking-wider">{producto.insignia}</span>}
            <div className="w-full border-t border-slate-100 my-1"></div>
            <div className="w-full grid grid-cols-1 gap-2 text-left">
              <MiniVer label="Categoría" icon="fas fa-layer-group" value={producto.categoria?.titulo} />
              <MiniVer label="Disponibilidad" icon="fas fa-circle-info" value={producto.disponibilidad} />
            </div>
            <div className="w-full flex gap-2 pt-2 border-t border-slate-100">
              {onEdit && (
                <button type="button" onClick={() => onEdit(producto)} className="flex-1 py-2.5 rounded-xl bg-[#E95A0C] hover:bg-[#cc4a00] text-white font-black text-[9px] uppercase tracking-widest transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 border-0">
                  <i className="fas fa-pen text-[10px]"></i><span>Editar</span>
                </button>
              )}
              <button type="button" onClick={() => window.print()} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#E95A0C] to-red-700 text-white font-black text-[9px] uppercase tracking-widest transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 border-0">
                <i className="fas fa-print text-[10px]"></i><span>Imprimir</span>
              </button>
            </div>
          </TarjetaFicha>

          <TarjetaFicha className="flex flex-col gap-2.5">
            <TituloFicha icon="fas fa-chart-pie">RESUMEN COMERCIAL</TituloFicha>
            <MiniVer label="Precio venta" icon="fas fa-money-bill-wave" value={formatearBs(producto.precio)} />
            <MiniVer label="Stock" icon="fas fa-boxes-stacked" value={`${producto.stock} unidades`} />
            <MiniVer label="Registrado" icon="fas fa-calendar" value={fecha} />
          </TarjetaFicha>
        </div>

        {/* COLUMNA DERECHA */}
        <div className="flex-1 w-full space-y-4">
          <TarjetaFicha>
            <TituloFicha icon="fas fa-info-circle">FICHA TÉCNICA DEL PRODUCTO</TituloFicha>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FieldVer icon="fas fa-hashtag" label="Identificador" value={`#${producto.id}`} />
              <FieldVer icon="fas fa-tag" label="Nombre" value={producto.nombre} />
              <FieldVer icon="fas fa-link" label="Enlace / Slug" value={producto.enlace} />
              <FieldVer icon="fas fa-layer-group" label="Categoría" value={producto.categoria?.titulo} />
              <FieldVer icon="fas fa-money-bill-wave" label="Precio de venta" value={formatearBs(producto.precio)} />
              <FieldVer icon="fas fa-arrow-trend-down" label="Precio anterior" value={producto.precioAnterior ? formatearBs(producto.precioAnterior) : null} />
              <FieldVer icon="fas fa-badge-percent" label="Descuento" value={descuento > 0 ? `-${descuento}% (${producto.descuento || 'Oferta'})` : 'Sin descuento'} />
              <FieldVer icon="fas fa-star" label="Calificación" value={producto.calificacion ? `${producto.calificacion} / 5` : null} />
              <FieldVer icon="fas fa-boxes-stacked" label="Stock" value={`${producto.stock} unidades`} />
              <FieldVer icon="fas fa-circle-info" label="Disponibilidad" value={producto.disponibilidad} />
              <FieldVer icon="fas fa-power-off" label="Estado" value={producto.activo ? 'Activo' : 'Inactivo'} />
              <FieldVer icon="fas fa-crown" label="Insignia" value={producto.insignia || null} />
              <FieldVer icon="fas fa-align-left" label="Descripción corta" value={producto.descripcionCorta} span />
              <FieldVer icon="fas fa-align-justify" label="Descripción completa" value={producto.descripcion} span />
            </div>
          </TarjetaFicha>
        </div>
      </div>
    </div>
  );
};

export default ProductoShowView;