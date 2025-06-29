// src/__tests__/components/reporte.test.jsx
import { render } from '@testing-library/react';
import { vi, describe, test, expect, beforeEach } from 'vitest';

// Mock para react-icons/md
vi.mock('react-icons/md', () => ({
  MdFileDownload: () => <div data-testid="download-icon">Mock Download Icon</div>
}));

// Mock para @react-pdf/renderer - más simple que el anterior
vi.mock('@react-pdf/renderer', () => ({
  pdf: vi.fn(() => ({
    toBlob: vi.fn(() => Promise.resolve(new Blob()))
  })),
  StyleSheet: {
    create: vi.fn(styles => styles)
  },
  Text: ({ children }) => <div>{children}</div>,
  View: ({ children }) => <div>{children}</div>,
  Page: ({ children }) => <div>{children}</div>,
  Document: ({ children }) => <div>{children}</div>
}));

// Importar después de los mocks
import ReportGenerator from '../../components/reporte';

describe('ReportGenerator Component', () => {
  beforeEach(() => {
    // Mock para fetch
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ data: [] })
    });
    
    // Mock para localStorage
    Storage.prototype.getItem = vi.fn(() => 'mock-token');
    
    // Mock para URL y document
    global.URL.createObjectURL = vi.fn();
    global.URL.revokeObjectURL = vi.fn();
    
    const mockLink = {
      href: '',
      download: '',
      click: vi.fn()
    };
    
    vi.spyOn(document, 'createElement').mockImplementation(() => mockLink);
  });

  test('component renders without crashing', () => {
    // Verificar que el componente se renderiza sin errores
    expect(() => render(<ReportGenerator />)).not.toThrow();
  });

  test('renders with custom data', () => {
    // Crear datos de prueba
    const testData = [{ temperatura: 25, humedad: 70 }];
    
    // Verificar que el componente se renderiza con datos personalizados
    expect(() => render(<ReportGenerator data={testData} />)).not.toThrow();
  });
});