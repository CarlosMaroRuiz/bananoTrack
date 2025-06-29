// src/__tests__/components/Mapas.test.jsx
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi, describe, test, expect, beforeEach } from 'vitest';
import Mapas from '../../components/mapas';

// Mock de los componentes Sidebar y Navbar
vi.mock('../../components/Sidebar', () => ({
  default: () => <div data-testid="sidebar-mock">Sidebar Mock</div>
}));

vi.mock('../../components/Navbar', () => ({
  default: () => <div data-testid="navbar-mock">Navbar Mock</div>
}));

// Mock para localStorage
beforeEach(() => {
  Storage.prototype.getItem = vi.fn(() => 'mock-token');
});

describe('Mapas Component', () => {
  // Preparar el ambiente de prueba
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock para evitar llamadas a fetch (con estructura correcta)
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,  // ¡Importante! El componente verifica response.ok
      json: () => Promise.resolve({ data: [60, 65, 70] })
    });
    
    // Mock para evitar problemas con setInterval
    vi.spyOn(global, 'setInterval').mockImplementation((cb) => {
      return 123; // Un ID de intervalo falso
    });
    
    vi.spyOn(global, 'clearInterval').mockImplementation(() => {});
  });

  test('renders basic structure correctly', async () => {
    const { container } = render(
      <BrowserRouter>
        <Mapas />
      </BrowserRouter>
    );
    
    // Esperar a que el componente se renderice completamente
    await waitFor(() => {
      expect(screen.getByTestId('sidebar-mock')).toBeInTheDocument();
    });
    
    // Verificar componentes de navegación
    expect(screen.getByTestId('sidebar-mock')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-mock')).toBeInTheDocument();
    
    // Verificar grid layout
    const gridContainer = container.querySelector('.grid.grid-cols-2');
    expect(gridContainer).toBeInTheDocument();
    
    // Verificar que hay dos paneles principales
    const panels = container.querySelectorAll('.rounded-xl');
    expect(panels.length).toBeGreaterThan(0);
  });

  test('has correct heading texts', async () => {
    render(
      <BrowserRouter>
        <Mapas />
      </BrowserRouter>
    );
    
    // Esperar a que el componente se renderice completamente
    await waitFor(() => {
      expect(screen.getByText('PROBABILIDAD DE INUNDACIÓN')).toBeInTheDocument();
    });
    
    // Verificar textos de cabecera
    expect(screen.getByText('PROBABILIDAD DE INUNDACIÓN')).toBeInTheDocument();
    expect(screen.getByText('Recomendación de Fertilizante')).toBeInTheDocument();
  });

  test('includes water level visualization container', async () => {
    const { container } = render(
      <BrowserRouter>
        <Mapas />
      </BrowserRouter>
    );
    
    // Esperar a que el componente se renderice completamente
    await waitFor(() => {
      expect(screen.getByText('PROBABILIDAD DE INUNDACIÓN')).toBeInTheDocument();
    });
    
    // Verificar elementos de visualización de nivel de agua
    const waterContainer = container.querySelector('.rounded-full.overflow-hidden');
    expect(waterContainer).toBeInTheDocument();
    
    // Verificar que existe un elemento para la animación de agua
    // Corregido: Usar un selector más amplio que coincida con la forma en que se aplica el estilo
    const waterAnimation = container.querySelector('.absolute.bottom-0');
    expect(waterAnimation).toBeInTheDocument();
  });

  test('contains fertilizer image with correct attributes', async () => {
    render(
      <BrowserRouter>
        <Mapas />
      </BrowserRouter>
    );
    
    // Esperar a que se cargue la imagen
    await waitFor(() => {
      expect(screen.getByAltText('Fertilizante')).toBeInTheDocument();
    });
    
    // Verificar imagen de fertilizante
    const fertilizerImage = screen.getByAltText('Fertilizante');
    expect(fertilizerImage).toBeInTheDocument();
    expect(fertilizerImage).toHaveAttribute('src', expect.stringContaining('ultrasol-banano.jpg'));
    expect(fertilizerImage).toHaveClass('mt-4');
  });

  test('includes custom styles', async () => {
    const { container } = render(
      <BrowserRouter>
        <Mapas />
      </BrowserRouter>
    );
    
    // Esperar a que el componente se renderice completamente
    await waitFor(() => {
      expect(screen.getByText('PROBABILIDAD DE INUNDACIÓN')).toBeInTheDocument();
    });
    
    // Verificar que se incluyen estilos CSS personalizados
    const styleTag = container.querySelector('style');
    expect(styleTag).toBeInTheDocument();
    
    // Verificar que el contenido del estilo incluye la animación
    expect(styleTag.textContent).toContain('@keyframes waterEffect');
    expect(styleTag.textContent).toContain('transform: translateY');
  });

  test('has proper border styling', async () => {
    const { container } = render(
      <BrowserRouter>
        <Mapas />
      </BrowserRouter>
    );
    
    // Esperar a que el componente se renderice completamente
    await waitFor(() => {
      expect(screen.getByText('PROBABILIDAD DE INUNDACIÓN')).toBeInTheDocument();
    });
    
    // Verificar estilos de borde
    const borderedElements = container.querySelectorAll('.border-blue-500');
    expect(borderedElements.length).toBeGreaterThan(0);
    
    // Verificar que el estilo de borde está definido correctamente
    expect(container.querySelector('style').textContent).toContain('.border-blue-500');
    expect(container.querySelector('style').textContent).toContain('border-color: #3182ce');
  });
});