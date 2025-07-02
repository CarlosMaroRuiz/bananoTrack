import { calculateAverage } from '../calcuteAverage';

describe('calculateAverage', () => {
  test('debe calcular el promedio correctamente con números enteros', () => {
    const input = [10, 20, 30, 40, 50];
    const expected = 30;
    
    const result = calculateAverage(input);
    
    expect(result).toBe(expected);
  });

  test('debe calcular el promedio con números decimales', () => {
    const input = [2.5, 3.5, 4.5];
    const expected = 3.5;
    
    const result = calculateAverage(input);
    
    expect(result).toBe(expected);
  });

  test('debe manejar un solo elemento', () => {
    const input = [42];
    const expected = 42;
    
    const result = calculateAverage(input);
    
    expect(result).toBe(expected);
  });

  test('debe manejar números negativos', () => {
    const input = [-10, -20, -30];
    const expected = -20;
    
    const result = calculateAverage(input);
    
    expect(result).toBe(expected);
  });

  test('debe manejar arreglo con ceros', () => {
    const input = [0, 0, 0, 12];
    const expected = 3;
    
    const result = calculateAverage(input);
    
    expect(result).toBe(expected);
  });
});
