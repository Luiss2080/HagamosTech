import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import EnfoquePanel from './EnfoquePanel';

const props = (extras = {}) => ({ sesiones: [], proyectos: [{ id: 3, titulo: 'Proyecto web' }], onGuardarSesion: vi.fn().mockResolvedValue(true), onEliminar: vi.fn(), ...extras });

afterEach(() => vi.useRealTimers());

describe('herramienta de enfoque', () => {
  it('permite configurar, pausar y reiniciar un bloque', () => {
    vi.useFakeTimers();
    render(<EnfoquePanel {...props()} />);
    const campoMinutos = screen.getByLabelText('Minutos · Enfoque');
    fireEvent.change(campoMinutos, { target: { value: '1' } });
    fireEvent.click(screen.getByRole('button', { name: 'Comenzar' }));
    act(() => { vi.advanceTimersByTime(1000); });
    fireEvent.click(screen.getByRole('button', { name: 'Pausar' }));
    expect(screen.getByRole('button', { name: 'Continuar' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Reiniciar' }));
    expect(screen.getByLabelText('Concentración: 01:00 restantes')).toBeInTheDocument();
  });

  it('registra la sesión al completar el temporizador y muestra su resultado', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-10-21T10:00:00.000Z'));
    const onGuardarSesion = vi.fn().mockResolvedValue(true);
    render(<EnfoquePanel {...props({ onGuardarSesion })} />);
    fireEvent.change(screen.getByLabelText('Minutos · Enfoque'), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText('¿En qué vas a enfocarte?'), { target: { value: 'Preparar entrega' } });
    fireEvent.click(screen.getByRole('button', { name: 'Comenzar' }));

    await act(async () => { await vi.advanceTimersByTimeAsync(60_000); });

    expect(onGuardarSesion).toHaveBeenCalledWith(expect.objectContaining({ titulo: 'Preparar entrega', duracionMinutos: 1, proyectoId: null }));
    expect(screen.getByText('Sesión de enfoque guardada en tu historial.')).toBeInTheDocument();
  });

  it('configura descansos, filtra el historial y permite eliminar sesiones', () => {
    const onEliminar = vi.fn();
    const sesiones = [{ id: 8, titulo: 'Lectura', duracionMinutos: 25, completadoEn: new Date().toISOString(), proyectoId: 3 }];
    render(<EnfoquePanel {...props({ sesiones, onEliminar })} />);
    fireEvent.click(screen.getByRole('button', { name: 'Descanso corto' }));
    expect(screen.getByLabelText('Pausa breve: 05:00 restantes')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '10 min' }));
    expect(screen.getByLabelText('Pausa breve: 10:00 restantes')).toBeInTheDocument();
    expect(screen.getByText('25 min')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Eliminar sesión Lectura' }));
    expect(onEliminar).toHaveBeenCalledWith(sesiones[0]);
  });

  it('conserva una sesión pendiente y ofrece reintentar si falla la base de datos', async () => {
    const onGuardarSesion = vi.fn().mockResolvedValueOnce(false).mockResolvedValueOnce(true);
    vi.useFakeTimers();
    render(<EnfoquePanel {...props({ onGuardarSesion })} />);
    fireEvent.change(screen.getByLabelText('Minutos · Enfoque'), { target: { value: '1' } });
    fireEvent.click(screen.getByRole('button', { name: 'Comenzar' }));
    await act(async () => { await vi.advanceTimersByTimeAsync(60_000); });
    expect(screen.getByRole('button', { name: 'Reintentar guardar sesión' })).toBeInTheDocument();
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Reintentar guardar sesión' })); });
    expect(onGuardarSesion).toHaveBeenCalledTimes(2);
    expect(screen.queryByRole('button', { name: 'Reintentar guardar sesión' })).not.toBeInTheDocument();
  });
});
