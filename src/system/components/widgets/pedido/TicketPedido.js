import { formatearHora } from '../usePedidosStore';

// Genera el comprobante/ticket del pedido y abre el diálogo de impresión (jsPDF vía CDN).
const imprimirTicket = (orden) => {
  const jsPDFLib = window.jspdf;
  if (!jsPDFLib) {
    alert('No se pudo cargar el generador de comprobantes. Revisa la conexión.');
    return;
  }
  const { jsPDF } = jsPDFLib;

  const ancho = 80; // mm (ticket 80mm)
  const doc = new jsPDF({ unit: 'mm', format: [ancho, 180] });
  const M = 5;
  const c = M;

  // Encabezado
  doc.setFillColor(233, 90, 12);
  doc.rect(0, 0, ancho, 14, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('HAGAMOSTECH', ancho / 2, 6, { align: 'center' });
  doc.setFontSize(7);
  doc.setTextColor(255, 230, 210);
  doc.text('SALTEÑERIA TRADICIONAL', ancho / 2, 10.5, { align: 'center' });
  doc.setFontSize(6);
  doc.text('Av. San Martin y 2do Anillo · +591 61320004', ancho / 2, 13, { align: 'center' });

  let y = 20;

  // Datos del pedido
  doc.setTextColor(20, 20, 20);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text(`Pedido: ${orden.codigo}`, c, y);
  y += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(`Mesa: ${orden.mesa}`, c, y);
  doc.text(`Hora: ${formatearHora(orden.creadoEn)}`, ancho - c, y, { align: 'right' });
  y += 3;
  doc.text(`Atiende: Personal`, c, y);
  doc.text(`Pago: ${(orden.metodoPago || 'efectivo').toUpperCase()}`, ancho - c, y, { align: 'right' });
  y += 3;

  // Línea
  doc.setDrawColor(200, 200, 200);
  doc.line(c, y, ancho - c, y);
  y += 4;

  // Detalle (tabla)
  const filas = orden.items.map(it => [
    `${it.cantidad}x ${it.nombre}${it.quitar && it.quitar.length ? '\nSin: ' + it.quitar.join(', ') : ''}`,
    `Bs. ${(it.precio * it.cantidad).toFixed(2)}`
  ]);
  if (window.jspdf && window.jspdf.plugins && window.jspdf.plugins.AutoTable) {
    window.jspdf.plugins.AutoTable({ startY: y, margin: { left: M, right: M }, theme: 'plain', head: [['DETALLE', 'TOTAL']], body: filas, styles: { fontSize: 7, cellPadding: 1.2 }, headStyles: { fillColor: [233, 90, 12], textColor: 255, fontStyle: 'bold' } });
    y = doc.lastAutoTable.finalY + 4;
  } else {
    orden.items.forEach(it => {
      doc.setFontSize(7);
      doc.text(`${it.cantidad}x ${it.nombre}`, c, y);
      doc.text(`Bs. ${(it.precio * it.cantidad).toFixed(2)}`, ancho - c, y, { align: 'right' });
      y += 4;
      if (it.quitar && it.quitar.length) {
        doc.text(`  Sin: ${it.quitar.join(', ')}`, c, y);
        y += 4;
      }
    });
    y += 2;
  }

  // Línea y total
  doc.setDrawColor(200, 200, 200);
  doc.line(c, y, ancho - c, y);
  y += 5;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('TOTAL', c, y);
  doc.text(`Bs. ${orden.total.toFixed(2)}`, ancho - c, y, { align: 'right' });
  y += 6;

  // Pie
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(120, 120, 120);
  doc.text('Gracias por su preferencia', ancho / 2, y, { align: 'center' });
  y += 4;
  doc.text('Compra verificada y registrada en el sistema.', ancho / 2, y, { align: 'center' });
  y += 4;
  doc.text('www.hagamostech.bo', ancho / 2, y, { align: 'center' });

  doc.autoPrint();
  doc.output('dataurlnewwindow');
};

export default imprimirTicket;