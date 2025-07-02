// src/data/mapas/__tests__/getLevelColor.test.js
import { getLevelColorTemperature } from '../getLevelColor';

describe('getLevelColorTemperature', () => {
  
  describe('Nivel Alto (>= 80)', () => {
    test('debe retornar información para waterLevel = 80', () => {
      const waterLevel = 80;
      
      const result = getLevelColorTemperature(waterLevel);
      
      expect(result).toStrictEqual({
        waterLevelText: 'Alto',
        waterLevelColor: 'bg-red-500'
      });
    });

    test('debe manejar valores altos', () => {
      const waterLevel = 90;
      
      const result = getLevelColorTemperature(waterLevel);
      
      expect(result.waterLevelText).toBe('Alto');
      expect(result.waterLevelColor).toBe('bg-red-500');
    });

    test('debe manejar valores muy altos', () => {
      const waterLevel = 100;
      
      const result = getLevelColorTemperature(waterLevel);
      
      expect(result.waterLevelText).toBe('Alto');
    });

    test('debe manejar decimales en rango alto', () => {
      const waterLevel = 85.5;
      
      const result = getLevelColorTemperature(waterLevel);
      
      expect(result.waterLevelText).toBe('Alto');
    });

    test('debe ser consistente para valores en rango alto', () => {
      const valores = [80, 85, 90, 95, 100, 150];
      
      valores.forEach(valor => {
        const result = getLevelColorTemperature(valor);
        expect(result.waterLevelText).toBe('Alto');
        expect(result.waterLevelColor).toBe('bg-red-500');
      });
    });
  });

  describe('Nivel Bajo (< 45)', () => {
    test('debe retornar información para waterLevel = 44', () => {
      const waterLevel = 44;
      
      const result = getLevelColorTemperature(waterLevel);
      
      expect(result.waterLevelText).toBe('Bajo');
      expect(result.waterLevelColor).toBe('bg-blue-500');
    });

    test('debe manejar valores muy bajos', () => {
      const waterLevel = 10;
      
      const result = getLevelColorTemperature(waterLevel);
      
      expect(result.waterLevelText).toBe('Bajo');
    });

    test('debe manejar valor cero', () => {
      const waterLevel = 0;
      
      const result = getLevelColorTemperature(waterLevel);
      
      expect(result.waterLevelText).toBe('Bajo');
    });

    test('debe manejar valores negativos', () => {
      const waterLevel = -10;
      
      const result = getLevelColorTemperature(waterLevel);
      
      expect(result.waterLevelText).toBe('Bajo');
    });

    test('debe manejar decimales en rango bajo', () => {
      const waterLevel = 44.9;
      
      const result = getLevelColorTemperature(waterLevel);
      
      expect(result.waterLevelText).toBe('Bajo');
    });

    test('debe ser consistente para valores en rango bajo', () => {
      const valores = [0, 10, 20, 30, 40, 44];
      
      valores.forEach(valor => {
        const result = getLevelColorTemperature(valor);
        expect(result.waterLevelText).toBe('Bajo');
        expect(result.waterLevelColor).toBe('bg-blue-500');
      });
    });
  });

  describe('Nivel Normal (45-79)', () => {
    test('debe retornar información para waterLevel = 45', () => {
      const waterLevel = 45;
      
      const result = getLevelColorTemperature(waterLevel);
      
      expect(result.waterLevelText).toBe('Normal');
      expect(result).toHaveProperty('waterLevelColor');
    });

    test('debe manejar valores en rango medio', () => {
      const waterLevel = 60;
      
      const result = getLevelColorTemperature(waterLevel);
      
      expect(result.waterLevelText).toBe('Normal');
    });

    test('debe manejar el límite superior del rango normal', () => {
      const waterLevel = 79;
      
      const result = getLevelColorTemperature(waterLevel);
      
      expect(result.waterLevelText).toBe('Normal');
    });

    test('debe manejar decimales en rango normal', () => {
      const waterLevel = 62.5;
      
      const result = getLevelColorTemperature(waterLevel);
      
      expect(result.waterLevelText).toBe('Normal');
    });

    test('debe ser consistente para valores en rango normal', () => {
      const valores = [45, 50, 55, 60, 65, 70, 75, 79];
      
      valores.forEach(valor => {
        const result = getLevelColorTemperature(valor);
        expect(result.waterLevelText).toBe('Normal');
      });
    });
  });

  describe('Casos Límite y Edge Cases', () => {
    test('debe manejar waterLevel exactamente 45 como Normal', () => {
      const waterLevel = 45;
      
      const result = getLevelColorTemperature(waterLevel);
      
      // 45 no es < 45, por lo tanto debe ser Normal
      expect(result.waterLevelText).toBe('Normal');
    });

    test('debe manejar waterLevel exactamente 80 como Alto', () => {
      const waterLevel = 80;
      
      const result = getLevelColorTemperature(waterLevel);
      
      // 80 es >= 80, por lo tanto debe ser Alto
      expect(result.waterLevelText).toBe('Alto');
    });

    test('debe manejar waterLevel = 44.99 vs 45.01', () => {
      const bajo = getLevelColorTemperature(44.99);
      const normal = getLevelColorTemperature(45.01);
      
      expect(bajo.waterLevelText).toBe('Bajo');
      expect(normal.waterLevelText).toBe('Normal');
    });

    test('debe manejar waterLevel = 79.99 vs 80.01', () => {
      const normal = getLevelColorTemperature(79.99);
      const alto = getLevelColorTemperature(80.01);
      
      expect(normal.waterLevelText).toBe('Normal');
      expect(alto.waterLevelText).toBe('Alto');
    });

    test('debe manejar números muy grandes', () => {
      const waterLevel = 999999;
      
      const result = getLevelColorTemperature(waterLevel);
      
      expect(result.waterLevelText).toBe('Alto');
    });

    test('debe manejar números muy negativos', () => {
      const waterLevel = -999999;
      
      const result = getLevelColorTemperature(waterLevel);
      
      expect(result.waterLevelText).toBe('Bajo');
    });

    test('debe manejar precisión de decimales', () => {
      const valores = [44.999999, 45.000001, 79.999999, 80.000001];
      const esperados = ['Bajo', 'Normal', 'Normal', 'Alto'];
      
      valores.forEach((valor, index) => {
        const result = getLevelColorTemperature(valor);
        expect(result.waterLevelText).toBe(esperados[index]);
      });
    });
  });

  describe('Validación de Retorno', () => {
    test('debe retornar siempre un objeto', () => {
      const valores = [0, 25, 45, 60, 80, 100];
      
      valores.forEach(valor => {
        const result = getLevelColorTemperature(valor);
        expect(typeof result).toBe('object');
        expect(result).toBeInstanceOf(Object);
        expect(result).not.toBeNull();
      });
    });

    test('debe retornar objeto con propiedades correctas', () => {
      const valores = [10, 30, 50, 70, 90];
      const valoresValidosTexto = ['Bajo', 'Normal', 'Alto'];
      
      valores.forEach(valor => {
        const result = getLevelColorTemperature(valor);
        
        expect(result).toHaveProperty('waterLevelText');
        expect(result).toHaveProperty('waterLevelColor');
        expect(valoresValidosTexto).toContain(result.waterLevelText);
        expect(typeof result.waterLevelColor).toBe('string');
      });
    });

    test('debe retornar textos no vacíos', () => {
      const valores = [0, 45, 80];
      
      valores.forEach(valor => {
        const result = getLevelColorTemperature(valor);
        expect(result.waterLevelText.length).toBeGreaterThan(0);
      });
    });

    test('no debe retornar undefined o null en propiedades', () => {
      const valores = [20, 50, 90];
      
      valores.forEach(valor => {
        const result = getLevelColorTemperature(valor);
        expect(result.waterLevelText).not.toBeUndefined();
        expect(result.waterLevelText).not.toBeNull();
        expect(result.waterLevelColor).not.toBeUndefined();
        expect(result.waterLevelColor).not.toBeNull();
      });
    });
  });

  describe('Consistencia de Rangos', () => {
    test('valores en el mismo rango deben retornar el mismo resultado', () => {
      // Rango bajo
      const bajo1 = getLevelColorTemperature(20);
      const bajo2 = getLevelColorTemperature(30);
      expect(bajo1).toStrictEqual(bajo2);
      
      // Rango normal
      const normal1 = getLevelColorTemperature(50);
      const normal2 = getLevelColorTemperature(70);
      expect(normal1).toStrictEqual(normal2);
      
      // Rango alto
      const alto1 = getLevelColorTemperature(85);
      const alto2 = getLevelColorTemperature(95);
      expect(alto1).toStrictEqual(alto2);
    });

    test('valores en rangos diferentes deben retornar resultados diferentes', () => {
      const bajo = getLevelColorTemperature(30);
      const normal = getLevelColorTemperature(60);
      const alto = getLevelColorTemperature(90);
      
      expect(bajo.waterLevelText).not.toBe(normal.waterLevelText);
      expect(bajo.waterLevelText).not.toBe(alto.waterLevelText);
      expect(normal.waterLevelText).not.toBe(alto.waterLevelText);
    });

    test('debe ser determinística', () => {
      const waterLevel = 65;
      
      const resultados = [];
      for (let i = 0; i < 10; i++) {
        resultados.push(getLevelColorTemperature(waterLevel));
      }
      
      // Todos deben ser iguales
      const primerResultado = resultados[0];
      resultados.forEach(resultado => {
        expect(resultado).toStrictEqual(primerResultado);
      });
    });
  });

  describe('Función Pura', () => {
    test('no debe modificar el parámetro de entrada', () => {
      const waterLevelOriginal = 55;
      const waterLevelAntes = waterLevelOriginal;
      
      getLevelColorTemperature(waterLevelOriginal);
      
      expect(waterLevelOriginal).toBe(waterLevelAntes);
    });

    test('debe retornar el mismo resultado para el mismo input', () => {
      const waterLevel = 75;
      
      const resultado1 = getLevelColorTemperature(waterLevel);
      const resultado2 = getLevelColorTemperature(waterLevel);
      
      expect(resultado1).toStrictEqual(resultado2);
    });

    test('no debe tener efectos secundarios', () => {
      const waterLevel = 45;
      
      // Verificar que no modifica variables globales básicas
      const consoleMethods = Object.keys(console);
      getLevelColorTemperature(waterLevel);
      const consoleMethodsAfter = Object.keys(console);
      
      expect(consoleMethods).toEqual(consoleMethodsAfter);
    });
  });

  describe('Cobertura Completa de Rangos', () => {
    test('debe cubrir todos los casos posibles', () => {
      const testCases = [
        { input: -100, expectedText: 'Bajo', expectedColor: 'bg-blue-500' },
        { input: 0, expectedText: 'Bajo', expectedColor: 'bg-blue-500' },
        { input: 44, expectedText: 'Bajo', expectedColor: 'bg-blue-500' },
        { input: 44.99, expectedText: 'Bajo', expectedColor: 'bg-blue-500' },
        { input: 45, expectedText: 'Normal', expectedColor: expect.any(String) },
        { input: 45.01, expectedText: 'Normal', expectedColor: expect.any(String) },
        { input: 60, expectedText: 'Normal', expectedColor: expect.any(String) },
        { input: 79, expectedText: 'Normal', expectedColor: expect.any(String) },
        { input: 79.99, expectedText: 'Normal', expectedColor: expect.any(String) },
        { input: 80, expectedText: 'Alto', expectedColor: 'bg-red-500' },
        { input: 80.01, expectedText: 'Alto', expectedColor: 'bg-red-500' },
        { input: 100, expectedText: 'Alto', expectedColor: 'bg-red-500' },
        { input: 1000, expectedText: 'Alto', expectedColor: 'bg-red-500' }
      ];
      
      testCases.forEach(({ input, expectedText, expectedColor }) => {
        const result = getLevelColorTemperature(input);
        expect(result.waterLevelText).toBe(expectedText);
        expect(result.waterLevelColor).toEqual(expectedColor);
      });
    });
  });

  // ✅ FUNCIÓN CORREGIDA - Tests para el comportamiento actual correcto
  describe('Función Corregida - Comportamiento Esperado', () => {
    test('debe retornar objeto con texto y color correctos', () => {
      const result = getLevelColorTemperature(80);
      
      expect(result).toMatchObject({
        waterLevelText: 'Alto',
        waterLevelColor: 'bg-red-500'
      });
    });

    test('debe incluir colores apropiados para cada nivel', () => {
      const testCases = [
        { input: 30, expectedText: 'Bajo', expectedColor: 'bg-blue-500' },
        { input: 60, expectedText: 'Normal', expectedColor: expect.any(String) },
        { input: 90, expectedText: 'Alto', expectedColor: 'bg-red-500' }
      ];
      
      testCases.forEach(({ input, expectedText, expectedColor }) => {
        const result = getLevelColorTemperature(input);
        
        expect(result).toMatchObject({
          waterLevelText: expectedText,
          waterLevelColor: expectedColor
        });
      });
    });

    test('debe retornar estructura consistente para todos los casos', () => {
      const valores = [10, 50, 90];
      
      valores.forEach(valor => {
        const result = getLevelColorTemperature(valor);
        
        expect(result).toHaveProperty('waterLevelText');
        expect(result).toHaveProperty('waterLevelColor');
        expect(typeof result.waterLevelText).toBe('string');
        expect(typeof result.waterLevelColor).toBe('string');
      });
    });

    test('debe retornar colores Tailwind válidos', () => {
      const bajo = getLevelColorTemperature(30);
      const alto = getLevelColorTemperature(90);
      
      // Verificar que son clases de Tailwind válidas
      expect(bajo.waterLevelColor).toMatch(/^bg-\w+-\d+$/);
      expect(alto.waterLevelColor).toMatch(/^bg-\w+-\d+$/);
      
      // Verificar colores específicos esperados
      expect(bajo.waterLevelColor).toBe('bg-blue-500');
      expect(alto.waterLevelColor).toBe('bg-red-500');
    });
  });
});