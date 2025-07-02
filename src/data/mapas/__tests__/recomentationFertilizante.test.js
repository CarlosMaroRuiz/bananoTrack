// src/data/mapas/__tests__/recomentationFertilizante.test.js
import { getRecomentationFertilizante } from '../recomentationFertilizante';

describe('getRecomentationFertilizante', () => {
  
  describe('Humedad Alta (>= 80)', () => {
    test('debe retornar recomendación de evitar fertilizantes cuando waterLevel = 80', () => {
      const waterLevel = 80;
      
      const result = getRecomentationFertilizante(waterLevel);
      
      expect(result).toContain('evitar la aplicación de fertilizantes');
      expect(result).toContain('saturación del suelo');
    });

    test('debe mencionar lixiviación para humedad muy alta', () => {
      const waterLevel = 90;
      
      const result = getRecomentationFertilizante(waterLevel);
      
      expect(result).toContain('lixiviar fácilmente');
      expect(result).toContain('pérdida de nutrientes');
    });

    test('debe recomendar no aplicar fertilizantes en condiciones extremas', () => {
      const waterLevel = 100;
      
      const result = getRecomentationFertilizante(waterLevel);
      
      expect(result).toContain('no aplicar fertilizantes');
      expect(result).toContain('exceso de agua');
    });

    test('debe funcionar con valores decimales altos', () => {
      const waterLevel = 85.5;
      
      const result = getRecomentationFertilizante(waterLevel);
      
      expect(result).toContain('alta humedad');
      expect(result).toContain('evitar la aplicación');
    });

    test('debe retornar string no vacío para humedad alta', () => {
      const waterLevel = 95;
      
      const result = getRecomentationFertilizante(waterLevel);
      
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('Humedad Baja (< 40)', () => {
    test('debe recomendar fertilizantes con nitrógeno para waterLevel < 40', () => {
      const waterLevel = 35;
      
      const result = getRecomentationFertilizante(waterLevel);
      
      expect(result).toContain('aplicar fertilizantes');
      expect(result).toContain('nitrógeno');
    });

    test('debe mencionar urea y nitrato de amonio', () => {
      const waterLevel = 30;
      
      const result = getRecomentationFertilizante(waterLevel);
      
      expect(result).toContain('urea');
      expect(result).toContain('nitrato de amonio');
    });

    test('debe mencionar estimulación del crecimiento', () => {
      const waterLevel = 25;
      
      const result = getRecomentationFertilizante(waterLevel);
      
      expect(result).toContain('estimular el crecimiento');
      expect(result).toContain('plátanos');
    });

    test('debe funcionar con valores muy bajos', () => {
      const waterLevel = 10;
      
      const result = getRecomentationFertilizante(waterLevel);
      
      expect(result).toContain('baja humedad');
      expect(result).toContain('crecimiento vigoroso');
    });

    test('debe funcionar con valores decimales bajos', () => {
      const waterLevel = 39.9;
      
      const result = getRecomentationFertilizante(waterLevel);
      
      expect(result).toContain('aplicar fertilizantes');
      expect(result).toContain('nitrógeno');
    });

    test('debe mencionar compensación de nutrientes', () => {
      const waterLevel = 20;
      
      const result = getRecomentationFertilizante(waterLevel);
      
      expect(result).toContain('compensar');
      expect(result).toContain('falta de nutrientes');
    });
  });

  describe('Humedad Normal (40-79)', () => {
    test('debe recomendar fertilizantes equilibrados para waterLevel = 40', () => {
      const waterLevel = 40;
      
      const result = getRecomentationFertilizante(waterLevel);
      
      expect(result).toContain('fertilizantes equilibrados');
      expect(result).toContain('NPK');
    });

    test('debe mencionar proporciones específicas NPK', () => {
      const waterLevel = 50;
      
      const result = getRecomentationFertilizante(waterLevel);
      
      expect(result).toContain('10-10-10');
      expect(result).toContain('20-20-20');
    });

    test('debe mencionar nitrógeno, fósforo y potasio', () => {
      const waterLevel = 60;
      
      const result = getRecomentationFertilizante(waterLevel);
      
      expect(result).toContain('nitrógeno, fósforo y potasio');
    });

    test('debe funcionar en el rango medio', () => {
      const waterLevel = 65;
      
      const result = getRecomentationFertilizante(waterLevel);
      
      expect(result).toContain('humedad normal');
      expect(result).toContain('proporción equilibrada');
    });

    test('debe funcionar con el valor límite superior', () => {
      const waterLevel = 79;
      
      const result = getRecomentationFertilizante(waterLevel);
      
      expect(result).toContain('fertilizantes equilibrados');
      expect(result).toContain('mezcla de nutrientes');
    });

    test('debe mencionar nutrientes esenciales', () => {
      const waterLevel = 55;
      
      const result = getRecomentationFertilizante(waterLevel);
      
      expect(result).toContain('nutrientes esenciales');
      expect(result).toContain('crecimiento de los plátanos');
    });
  });

  describe('Casos Límite y Edge Cases', () => {
    test('debe manejar waterLevel exactamente 40 como humedad normal', () => {
      const waterLevel = 40;
      
      const result = getRecomentationFertilizante(waterLevel);
      
      // Debe comportarse como humedad normal (>= 40)
      expect(result).toContain('fertilizantes equilibrados');
      expect(result).not.toContain('baja humedad');
    });

    test('debe manejar waterLevel exactamente 80 como humedad alta', () => {
      const waterLevel = 80;
      
      const result = getRecomentationFertilizante(waterLevel);
      
      // Debe comportarse como humedad alta (>= 80)
      expect(result).toContain('evitar la aplicación');
      expect(result).not.toContain('fertilizantes equilibrados');
    });

    test('debe manejar waterLevel = 39 como humedad baja', () => {
      const waterLevel = 39;
      
      const result = getRecomentationFertilizante(waterLevel);
      
      expect(result).toContain('baja humedad');
      expect(result).toContain('nitrógeno');
    });

    test('debe manejar waterLevel = 0', () => {
      const waterLevel = 0;
      
      const result = getRecomentationFertilizante(waterLevel);
      
      expect(result).toContain('baja humedad');
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    test('debe manejar valores decimales en límites', () => {
      const resultado39_9 = getRecomentationFertilizante(39.9);
      const resultado40_0 = getRecomentationFertilizante(40.0);
      const resultado79_9 = getRecomentationFertilizante(79.9);
      const resultado80_0 = getRecomentationFertilizante(80.0);
      
      expect(resultado39_9).toContain('baja humedad');
      expect(resultado40_0).toContain('humedad normal');
      expect(resultado79_9).toContain('humedad normal');
      expect(resultado80_0).toContain('alta humedad');
    });

    test('debe manejar valores muy altos', () => {
      const waterLevel = 150;
      
      const result = getRecomentationFertilizante(waterLevel);
      
      expect(result).toContain('alta humedad');
      expect(result).toContain('evitar la aplicación');
    });

    test('debe manejar valores negativos', () => {
      const waterLevel = -10;
      
      const result = getRecomentationFertilizante(waterLevel);
      
      expect(result).toContain('baja humedad');
      expect(result).toContain('aplicar fertilizantes');
    });
  });

  describe('Validación de Retorno', () => {
    test('debe retornar siempre un string', () => {
      const valores = [0, 25, 40, 60, 80, 100];
      
      valores.forEach(valor => {
        const result = getRecomentationFertilizante(valor);
        expect(typeof result).toBe('string');
      });
    });

    test('debe retornar siempre un string no vacío', () => {
      const valores = [5, 15, 35, 45, 65, 85, 95];
      
      valores.forEach(valor => {
        const result = getRecomentationFertilizante(valor);
        expect(result.length).toBeGreaterThan(0);
      });
    });

    test('debe retornar strings con longitud razonable', () => {
      const valores = [20, 50, 90];
      
      valores.forEach(valor => {
        const result = getRecomentationFertilizante(valor);
        // Las recomendaciones deben ser descriptivas
        expect(result.length).toBeGreaterThan(50);
        expect(result.length).toBeLessThan(1000);
      });
    });

    test('no debe retornar undefined o null', () => {
      const valores = [0, 30, 50, 80, 100];
      
      valores.forEach(valor => {
        const result = getRecomentationFertilizante(valor);
        expect(result).not.toBeUndefined();
        expect(result).not.toBeNull();
      });
    });
  });

  describe('Contenido Específico por Rango', () => {
    test('humedad alta debe mencionar problemas de saturación', () => {
      const result = getRecomentationFertilizante(85);
      
      expect(result.toLowerCase()).toContain('saturación');
      expect(result.toLowerCase()).toContain('lixiviar');
      expect(result.toLowerCase()).toContain('pérdida');
    });

    test('humedad baja debe mencionar estímulo y crecimiento', () => {
      const result = getRecomentationFertilizante(30);
      
      expect(result.toLowerCase()).toContain('estimular');
      expect(result.toLowerCase()).toContain('crecimiento');
      expect(result.toLowerCase()).toContain('vigoroso');
    });

    test('humedad normal debe mencionar balance y equilibrio', () => {
      const result = getRecomentationFertilizante(55);
      
      expect(result.toLowerCase()).toContain('equilibrado');
      expect(result.toLowerCase()).toContain('mezcla');
      expect(result.toLowerCase()).toContain('proporción');
    });

    test('cada rango debe tener palabras clave únicas', () => {
      const altaHumedad = getRecomentationFertilizante(85).toLowerCase();
      const bajaHumedad = getRecomentationFertilizante(30).toLowerCase();
      const normalHumedad = getRecomentationFertilizante(55).toLowerCase();
      
      // Alta humedad: única en mencionar "evitar"
      expect(altaHumedad).toContain('evitar');
      expect(bajaHumedad).not.toContain('evitar');
      expect(normalHumedad).not.toContain('evitar');
      
      // Baja humedad: única en mencionar "urea"
      expect(bajaHumedad).toContain('urea');
      expect(altaHumedad).not.toContain('urea');
      expect(normalHumedad).not.toContain('urea');
      
      // Normal humedad: única en mencionar proporciones específicas
      expect(normalHumedad).toContain('10-10-10');
      expect(altaHumedad).not.toContain('10-10-10');
      expect(bajaHumedad).not.toContain('10-10-10');
    });
  });

  describe('Consistencia de Rangos', () => {
    test('valores en el mismo rango deben retornar la misma recomendación', () => {
      // Rango alto
      const alta1 = getRecomentationFertilizante(85);
      const alta2 = getRecomentationFertilizante(95);
      expect(alta1).toBe(alta2);
      
      // Rango bajo
      const baja1 = getRecomentationFertilizante(25);
      const baja2 = getRecomentationFertilizante(35);
      expect(baja1).toBe(baja2);
      
      // Rango normal
      const normal1 = getRecomentationFertilizante(50);
      const normal2 = getRecomentationFertilizante(70);
      expect(normal1).toBe(normal2);
    });

    test('valores en rangos diferentes deben retornar recomendaciones diferentes', () => {
      const alta = getRecomentationFertilizante(85);
      const baja = getRecomentationFertilizante(30);
      const normal = getRecomentationFertilizante(55);
      
      expect(alta).not.toBe(baja);
      expect(alta).not.toBe(normal);
      expect(baja).not.toBe(normal);
    });
  });

  describe('Función Pura', () => {
    test('no debe modificar el parámetro de entrada', () => {
      const waterLevelOriginal = 50;
      const waterLevelAntes = waterLevelOriginal;
      
      getRecomentationFertilizante(waterLevelOriginal);
      
      expect(waterLevelOriginal).toBe(waterLevelAntes);
    });

    test('debe retornar el mismo resultado para el mismo input', () => {
      const waterLevel = 65;
      
      const resultado1 = getRecomentationFertilizante(waterLevel);
      const resultado2 = getRecomentationFertilizante(waterLevel);
      
      expect(resultado1).toBe(resultado2);
    });

    test('debe ser determinística', () => {
      const valores = [25, 50, 85];
      
      valores.forEach(valor => {
        const resultados = [];
        // Ejecutar múltiples veces
        for (let i = 0; i < 5; i++) {
          resultados.push(getRecomentationFertilizante(valor));
        }
        
        // Todos los resultados deben ser iguales
        const primerResultado = resultados[0];
        resultados.forEach(resultado => {
          expect(resultado).toBe(primerResultado);
        });
      });
    });
  });
});