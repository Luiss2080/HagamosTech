import { describe, it, expect } from 'vitest';

// TEMPORAL (T10): verifica que un test en rojo devuelve salida != 0.
describe('fallo temporal', () => {
  it('debe fallar a propósito', () => {
    expect(1).toBe(2);
  });
});
