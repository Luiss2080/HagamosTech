import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import AcompanamientoAcademico from './AcompanamientoAcademico';

describe('Acompañamiento académico', () => {
  it('explica niveles, tipos de apoyo y el enfoque formativo', () => {
    render(
      <MemoryRouter>
        <AcompanamientoAcademico />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /acompañamiento académico para avanzar/i })).toBeInTheDocument();
    expect(screen.getByText(/primaria\/colegio, secundaria, institutos y universidad/i)).toBeInTheDocument();
    expect(screen.getByText(/según materia y disponibilidad/i)).toBeInTheDocument();
    expect(screen.getByText(/desarrolles y presentes tu propio trabajo/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Mentorías Académicas y Apoyo en Tareas' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Acompañamiento en Informes y Monografías' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Proyectos Socioformativos' })).toBeInTheDocument();
  });

  it('ofrece un enlace de consulta al contacto', () => {
    render(
      <MemoryRouter>
        <AcompanamientoAcademico />
      </MemoryRouter>
    );

    expect(screen.getAllByRole('link', { name: /consultar acompañamiento|contanos qué necesitás/i })).toHaveLength(2);
  });

  it('explica que el estudiante desarrolla y presenta su propio trabajo', () => {
    const { container } = render(<MemoryRouter><AcompanamientoAcademico /></MemoryRouter>);
    expect(container.textContent).toMatch(/desarrolles y presentes tu propio trabajo/i);
    expect(container.textContent).not.toMatch(/garantizamos tus notas|hacemos tu tarea completa/i);
  });
});
