// src/shared/__tests__/imagesShared.test.js
import { imagenEnfermedades, imagenRecomendaciones } from '../imagesShared';

describe('imagesShared', () => {
  describe('imagenEnfermedades', () => {
    test('debe estar definida', () => {
      expect(imagenEnfermedades).toBeDefined();
    });

    test('debe ser un string', () => {
      expect(typeof imagenEnfermedades).toBe('string');
    });

    test('debe ser una URL válida con protocolo HTTPS', () => {
      expect(imagenEnfermedades).toMatch(/^https:\/\/.+/);
    });

    test('debe tener extensión de imagen válida', () => {
      expect(imagenEnfermedades).toMatch(/\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i);
    });

    test('no debe ser una cadena vacía', () => {
      expect(imagenEnfermedades.length).toBeGreaterThan(0);
    });

    test('debe contener el dominio mexico.infoagro.com', () => {
      expect(imagenEnfermedades).toContain('mexico.infoagro.com');
    });

    test('debe contener referencia a Sigatoka', () => {
      expect(imagenEnfermedades.toLowerCase()).toContain('sigatonka');
    });
  });

  describe('imagenRecomendaciones', () => {
    test('debe estar definida', () => {
      expect(imagenRecomendaciones).toBeDefined();
    });

    test('debe ser un string', () => {
      expect(typeof imagenRecomendaciones).toBe('string');
    });

    test('debe ser una URL válida con protocolo HTTPS', () => {
      expect(imagenRecomendaciones).toMatch(/^https:\/\/.+/);
    });

    test('debe tener extensión de imagen válida', () => {
      expect(imagenRecomendaciones).toMatch(/\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i);
    });

    test('no debe ser una cadena vacía', () => {
      expect(imagenRecomendaciones.length).toBeGreaterThan(0);
    });

    test('debe contener el dominio dialoguemos.ec', () => {
      expect(imagenRecomendaciones).toContain('dialoguemos.ec');
    });

    test('debe contener parámetros de consulta para dimensiones', () => {
      expect(imagenRecomendaciones).toContain('fit=590%2C330');
    });
  });

  describe('comparación entre imágenes', () => {
    test('las URLs deben ser diferentes', () => {
      expect(imagenEnfermedades).not.toBe(imagenRecomendaciones);
    });

    test('ambas deben usar HTTPS', () => {
      expect(imagenEnfermedades).toMatch(/^https:/);
      expect(imagenRecomendaciones).toMatch(/^https:/);
    });

    test('deben exportarse como constantes nombradas', () => {
      // Verificar que son valores constantes (no undefined)
      expect(imagenEnfermedades).not.toBeUndefined();
      expect(imagenRecomendaciones).not.toBeUndefined();
    });
  });

  describe('validación de formato URL', () => {
    test('imagenEnfermedades debe ser una URL bien formada', () => {
      expect(() => new URL(imagenEnfermedades)).not.toThrow();
    });

    test('imagenRecomendaciones debe ser una URL bien formada', () => {
      expect(() => new URL(imagenRecomendaciones)).not.toThrow();
    });
  });

  describe('propiedades específicas del contenido', () => {
    test('imagenEnfermedades debe apuntar a imagen de enfermedad de banano', () => {
      const url = imagenEnfermedades.toLowerCase();
      expect(url).toContain('sigatonka');
    });

    test('imagenRecomendaciones debe contener SSL en los parámetros', () => {
      expect(imagenRecomendaciones).toContain('ssl=1');
    });

    test('las URLs deben tener longitud razonable', () => {
      expect(imagenEnfermedades.length).toBeGreaterThan(20);
      expect(imagenEnfermedades.length).toBeLessThan(500);
      
      expect(imagenRecomendaciones.length).toBeGreaterThan(20);
      expect(imagenRecomendaciones.length).toBeLessThan(500);
    });
  });
});