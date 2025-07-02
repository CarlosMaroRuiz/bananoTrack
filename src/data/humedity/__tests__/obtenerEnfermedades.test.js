// src/data/humedity/__tests__/obtenerEnfermedades.test.js
import { obtenerEnfermedadesYRecomendaciones } from '../obtenerEnfermedades';

describe('obtenerEnfermedadesYRecomendaciones', () => {
  
  describe('Temperatura Alta (>= 30°C)', () => {
    test('debe retornar enfermedades de temperatura alta cuando temp = 30', () => {
      const temperaturaLimite = 30;
      
      const result = obtenerEnfermedadesYRecomendaciones(temperaturaLimite);
      
      expect(result).toHaveProperty('enfermedades');
      expect(result).toHaveProperty('recomendaciones');
      expect(result.enfermedades).toHaveLength(2);
      expect(result.recomendaciones).toHaveLength(3);
    });

    test('debe incluir SIGATOKA NEGRA en enfermedades de temperatura alta', () => {
      const temperaturaAlta = 35;
      
      const result = obtenerEnfermedadesYRecomendaciones(temperaturaAlta);
      
      expect(result.enfermedades[0]).toContain('SIGATOKA NEGRA');
      expect(result.enfermedades[0]).toContain('Mycosphaerella fijiensis');
    });

    test('debe incluir ANTRACNOSIS en enfermedades de temperatura alta', () => {
      const temperaturaAlta = 32;
      
      const result = obtenerEnfermedadesYRecomendaciones(temperaturaAlta);
      
      expect(result.enfermedades[1]).toContain('ANTRACNOSIS');
      expect(result.enfermedades[1]).toContain('Colletotrichum musae');
    });

    test('debe incluir recomendaciones de fungicidas para temperatura alta', () => {
      const temperaturaAlta = 40;
      
      const result = obtenerEnfermedadesYRecomendaciones(temperaturaAlta);
      
      expect(result.recomendaciones[0]).toContain('fungicidas específicos');
      expect(result.recomendaciones[0]).toContain('Sigatoka Negra');
      expect(result.recomendaciones[1]).toContain('preventiva');
      expect(result.recomendaciones[2]).toContain('manejo integrado');
    });

    test('debe manejar temperaturas muy altas', () => {
      const temperaturaMuyAlta = 50;
      
      const result = obtenerEnfermedadesYRecomendaciones(temperaturaMuyAlta);
      
      expect(result.enfermedades).toHaveLength(2);
      expect(result.recomendaciones).toHaveLength(3);
      expect(result.enfermedades[0]).toContain('SIGATOKA NEGRA');
    });
  });

  describe('Temperatura Baja (< 30°C)', () => {
    test('debe retornar enfermedades de temperatura baja cuando temp = 29', () => {
      const temperaturaBaja = 29;
      
      const result = obtenerEnfermedadesYRecomendaciones(temperaturaBaja);
      
      expect(result).toHaveProperty('enfermedades');
      expect(result).toHaveProperty('recomendaciones');
      expect(result.enfermedades).toHaveLength(2);
      expect(result.recomendaciones).toHaveLength(3);
    });

    test('debe incluir PUDRICIÓN DE CUELLO en enfermedades de temperatura baja', () => {
      const temperaturaBaja = 25;
      
      const result = obtenerEnfermedadesYRecomendaciones(temperaturaBaja);
      
      expect(result.enfermedades[0]).toContain('PUDRICIÓN DE CUELLO');
      expect(result.enfermedades[0]).toContain('Fusarium oxysporum');
    });

    test('debe incluir MOKO en enfermedades de temperatura baja', () => {
      const temperaturaBaja = 20;
      
      const result = obtenerEnfermedadesYRecomendaciones(temperaturaBaja);
      
      expect(result.enfermedades[1]).toContain('MOKO');
      expect(result.enfermedades[1]).toContain('Ralstonia solanacearum');
    });

    test('debe incluir recomendaciones de fungicidas sistémicos para temperatura baja', () => {
      const temperaturaBaja = 15;
      
      const result = obtenerEnfermedadesYRecomendaciones(temperaturaBaja);
      
      expect(result.recomendaciones[0]).toContain('fungicidas sistémicos');
      expect(result.recomendaciones[0]).toContain('Fusarium');
      expect(result.recomendaciones[1]).toContain('exceso de riego');
      expect(result.recomendaciones[2]).toContain('desinfección');
    });

    test('debe manejar temperaturas muy bajas', () => {
      const temperaturaMuyBaja = 5;
      
      const result = obtenerEnfermedadesYRecomendaciones(temperaturaMuyBaja);
      
      expect(result.enfermedades).toHaveLength(2);
      expect(result.recomendaciones).toHaveLength(3);
      expect(result.enfermedades[0]).toContain('PUDRICIÓN DE CUELLO');
    });

    test('debe manejar temperaturas negativas', () => {
      const temperaturaNegativa = -5;
      
      const result = obtenerEnfermedadesYRecomendaciones(temperaturaNegativa);
      
      expect(result.enfermedades).toHaveLength(2);
      expect(result.recomendaciones).toHaveLength(3);
      expect(result.enfermedades[1]).toContain('MOKO');
    });
  });

  describe('Casos Límite y Edge Cases', () => {
    test('debe manejar temperatura exactamente 30 como temperatura alta', () => {
      const temperaturaLimite = 30;
      
      const result = obtenerEnfermedadesYRecomendaciones(temperaturaLimite);
      
      // Debería comportarse como temperatura alta (>= 30)
      expect(result.enfermedades[0]).toContain('SIGATOKA NEGRA');
      expect(result.enfermedades[1]).toContain('ANTRACNOSIS');
    });

    test('debe manejar temperatura cero', () => {
      const temperaturaCero = 0;
      
      const result = obtenerEnfermedadesYRecomendaciones(temperaturaCero);
      
      expect(result.enfermedades).toHaveLength(2);
      expect(result.recomendaciones).toHaveLength(3);
      expect(result.enfermedades[0]).toContain('PUDRICIÓN DE CUELLO');
    });

    test('debe manejar números decimales', () => {
      const temperaturaDecimal = 29.9;
      
      const result = obtenerEnfermedadesYRecomendaciones(temperaturaDecimal);
      
      expect(result.enfermedades[0]).toContain('PUDRICIÓN DE CUELLO');
      
      const temperaturaDecimalAlta = 30.1;
      const resultAlta = obtenerEnfermedadesYRecomendaciones(temperaturaDecimalAlta);
      
      expect(resultAlta.enfermedades[0]).toContain('SIGATOKA NEGRA');
    });
  });

  describe('Estructura del Retorno', () => {
    test('debe retornar siempre un objeto con propiedades correctas', () => {
      const temperaturas = [10, 25, 30, 35, 45];
      
      temperaturas.forEach(temp => {
        const result = obtenerEnfermedadesYRecomendaciones(temp);
        
        expect(result).toBeInstanceOf(Object);
        expect(result).toHaveProperty('enfermedades');
        expect(result).toHaveProperty('recomendaciones');
        expect(Array.isArray(result.enfermedades)).toBe(true);
        expect(Array.isArray(result.recomendaciones)).toBe(true);
      });
    });

    test('debe retornar arrays no vacíos', () => {
      const temperaturas = [5, 20, 30, 40];
      
      temperaturas.forEach(temp => {
        const result = obtenerEnfermedadesYRecomendaciones(temp);
        
        expect(result.enfermedades.length).toBeGreaterThan(0);
        expect(result.recomendaciones.length).toBeGreaterThan(0);
        expect(result.enfermedades).toHaveLength(2);
        expect(result.recomendaciones).toHaveLength(3);
      });
    });

    test('todos los elementos de los arrays deben ser strings no vacíos', () => {
      const temperatura = 25;
      
      const result = obtenerEnfermedadesYRecomendaciones(temperatura);
      
      result.enfermedades.forEach(enfermedad => {
        expect(typeof enfermedad).toBe('string');
        expect(enfermedad.length).toBeGreaterThan(0);
      });
      
      result.recomendaciones.forEach(recomendacion => {
        expect(typeof recomendacion).toBe('string');
        expect(recomendacion.length).toBeGreaterThan(0);
      });
    });

    test('no debe mutar el input', () => {
      const temperaturaOriginal = 25;
      const temperaturaAntes = temperaturaOriginal;
      
      obtenerEnfermedadesYRecomendaciones(temperaturaOriginal);
      
      expect(temperaturaOriginal).toBe(temperaturaAntes);
    });
  });

  describe('Contenido Específico', () => {
    test('enfermedades de temperatura alta deben mencionar climas cálidos', () => {
      const result = obtenerEnfermedadesYRecomendaciones(35);
      
      const todasLasEnfermedades = result.enfermedades.join(' ').toLowerCase();
      expect(todasLasEnfermedades).toContain('cálidos');
    });

    test('enfermedades de temperatura baja deben mencionar climas fríos o húmedos', () => {
      const result = obtenerEnfermedadesYRecomendaciones(20);
      
      const todasLasEnfermedades = result.enfermedades.join(' ').toLowerCase();
      expect(todasLasEnfermedades).toMatch(/(fríos|húmedos|frescas)/);
    });

    test('recomendaciones deben incluir acciones específicas', () => {
      const resultAlta = obtenerEnfermedadesYRecomendaciones(35);
      const resultBaja = obtenerEnfermedadesYRecomendaciones(20);
      
      const recAlta = resultAlta.recomendaciones.join(' ').toLowerCase();
      const recBaja = resultBaja.recomendaciones.join(' ').toLowerCase();
      
      // Temperatura alta debe incluir acciones preventivas
      expect(recAlta).toContain('preventiva');
      expect(recAlta).toContain('fungicidas');
      
      // Temperatura baja debe incluir control de riego
      expect(recBaja).toContain('riego');
      expect(recBaja).toContain('drenaje');
    });
  });

  describe('Diferenciación entre Casos', () => {
    test('temperatura alta y baja deben retornar contenido diferente', () => {
      const resultAlta = obtenerEnfermedadesYRecomendaciones(35);
      const resultBaja = obtenerEnfermedadesYRecomendaciones(25);
      
      // Las enfermedades deben ser diferentes
      expect(resultAlta.enfermedades[0]).not.toBe(resultBaja.enfermedades[0]);
      expect(resultAlta.enfermedades[1]).not.toBe(resultBaja.enfermedades[1]);
      
      // Las recomendaciones deben ser diferentes
      expect(resultAlta.recomendaciones[0]).not.toBe(resultBaja.recomendaciones[0]);
      expect(resultAlta.recomendaciones[1]).not.toBe(resultBaja.recomendaciones[1]);
    });

    test('temperaturas en el mismo rango deben retornar el mismo contenido', () => {
      const result1 = obtenerEnfermedadesYRecomendaciones(32);
      const result2 = obtenerEnfermedadesYRecomendaciones(38);
      
      expect(result1.enfermedades).toEqual(result2.enfermedades);
      expect(result1.recomendaciones).toEqual(result2.recomendaciones);
    });
  });
});