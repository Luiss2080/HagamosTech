import React, { useState } from 'react';

const BotonCalc = ({ children, onClick, clase = '' }) => (
  <button onClick={onClick}
    className={`h-10 rounded-xl text-sm font-black transition-all active:scale-90 cursor-pointer select-none ${clase}`}>
    {children}
  </button>
);

const Calculadora = () => {
  const [display, setDisplay] = useState('0');
  const [acum, setAcum] = useState(null);
  const [op, setOp] = useState(null);
  const [espera, setEspera] = useState(false);

  const digito = (d) => {
    if (espera) { setDisplay(d); setEspera(false); return; }
    setDisplay(prev => prev === '0' ? d : prev + d);
  };

  const decimal = () => {
    if (espera) { setDisplay('0.'); setEspera(false); return; }
    if (!display.includes('.')) setDisplay(prev => prev + '.');
  };

  const operador = (nuevoOp) => {
    const valor = parseFloat(display) || 0;
    if (acum === null) {
      setAcum(valor);
    } else if (!espera) {
      const r = calcular(acum, valor, op);
      setAcum(r);
      setDisplay(String(r));
    }
    setOp(nuevoOp);
    setEspera(true);
  };

  const calcular = (a, b, o) => {
    switch (o) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return b === 0 ? 0 : a / b;
      default: return b;
    }
  };

  const igual = () => {
    if (acum === null || op === null) return;
    const r = calcular(acum, parseFloat(display) || 0, op);
    setDisplay(String(Math.round(r * 100) / 100));
    setAcum(null); setOp(null); setEspera(true);
  };

  const limpiar = () => { setDisplay('0'); setAcum(null); setOp(null); setEspera(false); };
  const retroceso = () => setDisplay(prev => prev.length > 1 ? prev.slice(0, -1) : '0');

  const teclas = [
    { t: 'C', f: limpiar, cls: 'bg-red-50 text-red-500 border border-red-100' },
    { t: '⌫', f: retroceso, cls: 'bg-amber-50 text-amber-600 border border-amber-100' },
    { t: '%', f: () => {}, cls: 'bg-slate-50 text-slate-500 border border-slate-100' },
    { t: '÷', f: () => operador('÷'), cls: 'bg-[#FF4D00] text-white' },
    { t: '7', f: () => digito('7'), cls: 'bg-white border border-gray-200 text-[#111827]' },
    { t: '8', f: () => digito('8'), cls: 'bg-white border border-gray-200 text-[#111827]' },
    { t: '9', f: () => digito('9'), cls: 'bg-white border border-gray-200 text-[#111827]' },
    { t: '×', f: () => operador('×'), cls: 'bg-[#FF4D00] text-white' },
    { t: '4', f: () => digito('4'), cls: 'bg-white border border-gray-200 text-[#111827]' },
    { t: '5', f: () => digito('5'), cls: 'bg-white border border-gray-200 text-[#111827]' },
    { t: '6', f: () => digito('6'), cls: 'bg-white border border-gray-200 text-[#111827]' },
    { t: '-', f: () => operador('-'), cls: 'bg-[#FF4D00] text-white' },
    { t: '1', f: () => digito('1'), cls: 'bg-white border border-gray-200 text-[#111827]' },
    { t: '2', f: () => digito('2'), cls: 'bg-white border border-gray-200 text-[#111827]' },
    { t: '3', f: () => digito('3'), cls: 'bg-white border border-gray-200 text-[#111827]' },
    { t: '+', f: () => operador('+'), cls: 'bg-[#FF4D00] text-white' },
    { t: '0', f: () => digito('0'), cls: 'bg-white border border-gray-200 text-[#111827] col-span-2' },
    { t: '.', f: decimal, cls: 'bg-white border border-gray-200 text-[#111827]' },
    { t: '=', f: igual, cls: 'bg-gradient-to-r from-[#8B4513] to-[#5D3A1F] text-white' }
  ];

  return (
    <div className="select-none">
      <div className="rounded-xl bg-[#111827] text-white text-right px-4 py-3 font-mono text-lg font-black mb-3 overflow-hidden whitespace-nowrap">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        {teclas.map((k, i) => (
          <BotonCalc key={i} onClick={k.f} clase={`${k.cls} ${k.t === '0' ? 'col-span-2' : ''}`}>{k.t}</BotonCalc>
        ))}
      </div>
    </div>
  );
};

export default Calculadora;