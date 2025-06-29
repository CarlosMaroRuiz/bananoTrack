// src/__tests__/components/Humedad.test.jsx
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi, describe, test, expect, beforeEach } from 'vitest';
import Humedad from '../../components/humedad';  // Ruta corregida

// Mock de los componentes Sidebar y Navbar
vi.mock('../../components/Sidebar', () => ({
  default: () => <div data-testid="sidebar-mock">Sidebar Mock</div>
}));

vi.mock('../../components/Navbar', () => ({
  default: () => <div data-testid="navbar-mock">Navbar Mock</div>
}));

// Mock para localStorage
beforeEach(() => {
  // Configurar mock para localStorage.getItem
  Storage.prototype.getItem = vi.fn(() => 'mock-token');
});

describe('Humedad Component', () => {
  // Resetear mocks antes de cada prueba
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock para el fetch global
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ data: [30, 32, 35] }) // Simular datos de alta temperatura
    });
  });

  test('renders component structure correctly', async () => {
    render(
      <BrowserRouter>
        <Humedad />
      </BrowserRouter>
    );
    
    // Verificar que los componentes de navegación están presentes
    expect(screen.getByTestId('sidebar-mock')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-mock')).toBeInTheDocument();
    
    // Verificar que los títulos principales están presentes
    expect(await screen.findByText('ENFERMEDADES O PLAGAS')).toBeInTheDocument();
    expect(await screen.findByText('RECOMENDACIONES')).toBeInTheDocument();
  });
  
  test('displays high temperature diseases and recommendations', async () => {
    // Configurar fetch para simular alta temperatura
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ data: [35, 37, 40] }) // Datos de alta temperatura
    });
    
    render(
      <BrowserRouter>
        <Humedad />
      </BrowserRouter>
    );
    
    // Verificar que muestra las enfermedades y recomendaciones de alta temperatura
    expect(await screen.findByText(/SIGATOKA NEGRA/)).toBeInTheDocument();
    expect(await screen.findByText(/ANTRACNOSIS/)).toBeInTheDocument();
    expect(await screen.findByText(/Utiliza fungicidas específicos/)).toBeInTheDocument();
  });
  
  test('displays low temperature diseases and recommendations', async () => {
    // Configurar fetch para simular baja temperatura
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ data: [20, 22, 25] }) // Datos de baja temperatura
    });
    
    render(
      <BrowserRouter>
        <Humedad />
      </BrowserRouter>
    );
    
    // Verificar que muestra las enfermedades y recomendaciones de baja temperatura
    expect(await screen.findByText(/PUDRICIÓN DE CUELLO/)).toBeInTheDocument();
    expect(await screen.findByText(/MOKO/)).toBeInTheDocument();
    expect(await screen.findByText(/Aplica fungicidas sistémicos/)).toBeInTheDocument();
  });
  
  test('renders images correctly', async () => {
    render(
      <BrowserRouter>
        <Humedad />
      </BrowserRouter>
    );
    
    // Verificar que las imágenes están presentes
    const images = await screen.findAllByRole('img');
    expect(images.length).toBe(2); // Debe haber dos imágenes
    
    // Verificar que las imágenes tienen las URLs correctas
    expect(images[0]).toHaveAttribute('src', expect.stringContaining('Sigatonka-negra.jpg'));
    expect(images[1]).toHaveAttribute('src', expect.stringContaining('Sigatoka.jpg'));
    
    // Verificar atributos alt de las imágenes
    expect(images[0]).toHaveAttribute('alt', 'Imagen de enfermedades o plagas');
    expect(images[1]).toHaveAttribute('alt', 'Imagen de recomendaciones');
  });
  
  test('has correct layout structure', async () => {
    const { container } = render(
      <BrowserRouter>
        <Humedad />
      </BrowserRouter>
    );
    
    // Verificar la estructura del grid
    await screen.findByText('ENFERMEDADES O PLAGAS'); // Esperar a que se cargue el componente
    
    const gridContainer = container.querySelector('.grid.grid-cols-2');
    expect(gridContainer).toBeInTheDocument();
    
    // Verificar que hay dos paneles principales
    const panels = container.querySelectorAll('.border-blue-500.border');
    expect(panels.length).toBe(2);
    
    // Verificar que cada panel tiene la clase correcta para el borde
    panels.forEach(panel => {
      expect(panel).toHaveClass('border-blue-500');
      expect(panel).toHaveClass('shadow-lg');
    });
  });
  
  test('handles error when fetching data', async () => {
    // Simular un error en la petición fetch
    global.fetch = vi.fn().mockRejectedValue(new Error('Error de red'));
    
    // Silenciar el error de consola para esta prueba
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    render(
      <BrowserRouter>
        <Humedad />
      </BrowserRouter>
    );
    
    // Verificar que el componente no falla aunque haya error
    expect(screen.getByTestId('sidebar-mock')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-mock')).toBeInTheDocument();
    
    // Verificar que se llamó al console.error
    await vi.waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
    });
    
    // Restaurar el comportamiento original de console.error
    consoleSpy.mockRestore();
  });
});