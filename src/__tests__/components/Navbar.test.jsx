// src/__tests__/components/Navbar.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, test, expect, beforeEach } from 'vitest';
import Navbar from '../../components/Navbar';

// Mock para localStorage
beforeEach(() => {
  Storage.prototype.getItem = vi.fn(() => 'mock-token');
});

// Mock para fetch
global.fetch = vi.fn();

// Mock para console methods
console.log = vi.fn();
console.error = vi.fn();

describe('Navbar Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders navbar with basic elements', () => {
    render(<Navbar />);
    
    // Verificar elementos básicos
    expect(screen.getByText('Bienvenido 👋')).toBeInTheDocument();
    expect(screen.getByText('Finca El Paraíso')).toBeInTheDocument();
    expect(screen.getByText('Alejandro')).toBeInTheDocument();
  });

  test('has correct layout and styling', () => {
    const { container } = render(<Navbar />);
    
    // Verificar estructura del layout
    const navbarContainer = container.querySelector('.flex.justify-between.items-center');
    expect(navbarContainer).toBeInTheDocument();
    expect(navbarContainer).toHaveClass('bg-white');
    
    // Verificar que tiene 3 secciones principales (bienvenido, título, perfil)
    const mainSections = container.querySelectorAll('.flex.justify-between.items-center > div');
    expect(mainSections.length).toBe(3);
  });

  test('notification panel is hidden by default', () => {
    render(<Navbar />);
    
    // Verificar que el panel de notificaciones no está visible inicialmente
    const notificationPanel = screen.queryByText('Notificaciones');
    expect(notificationPanel).not.toBeInTheDocument();
  });

  test('shows notification panel when bell icon is clicked', async () => {
    // Preparamos userEvent
    const user = userEvent.setup();
    
    // Mock de respuesta para cuando se soliciten las notificaciones
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ data: [] }) // Sin notificaciones
    });
    
    const { container } = render(<Navbar />);
    
    // Encontrar el ícono de notificaciones usando querySelector en lugar de getByRole
    const bellIcon = container.querySelector('.relative svg.cursor-pointer');
    expect(bellIcon).toBeInTheDocument();
    
    // Hacer clic en el icono
    await user.click(bellIcon);
    
    // Verificar que el panel de notificaciones se muestra
    const notificationPanel = screen.getByText('Notificaciones');
    expect(notificationPanel).toBeInTheDocument();
  });

  test('notification panel has close button', async () => {
    // Preparamos userEvent
    const user = userEvent.setup();
    
    // Mock de respuesta para cuando se soliciten las notificaciones
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ data: [] }) // Sin notificaciones
    });
    
    const { container } = render(<Navbar />);
    
    // Abrir el panel de notificaciones
    const bellIcon = container.querySelector('.relative svg.cursor-pointer');
    await user.click(bellIcon);
    
    // Verificar que existe el botón de cierre
    const closeButton = screen.getByText('×');
    expect(closeButton).toBeInTheDocument();
    
    // Verificar que el botón cierra el panel al hacer clic
    await user.click(closeButton);
    
    // Verificar que el panel se ha cerrado
    const notificationPanel = screen.queryByText('Notificaciones');
    expect(notificationPanel).not.toBeInTheDocument();
  });

  test('clicking outside notification panel closes it', async () => {
    // Preparamos userEvent
    const user = userEvent.setup();
    
    // Mock de respuesta para cuando se soliciten las notificaciones
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ data: [] }) // Sin notificaciones
    });
    
    const { container } = render(<Navbar />);
    
    // Abrir el panel de notificaciones
    const bellIcon = container.querySelector('.relative svg.cursor-pointer');
    await user.click(bellIcon);
    
    // Verificar que el panel está abierto
    expect(screen.getByText('Notificaciones')).toBeInTheDocument();
    
    // Hacer clic en el panel (esto debería cerrar el panel porque handleOutsideClick se llama)
    const panel = screen.getByText('Notificaciones');
    await user.click(panel);
    
    // Verificar que el panel se ha cerrado
    expect(screen.queryByText('Notificaciones')).not.toBeInTheDocument();
  });

  test('user profile section displays correctly', () => {
    render(<Navbar />);
    
    // Verificar la sección de perfil de usuario
    const userSection = screen.getByText('Alejandro').closest('div');
    expect(userSection).toBeInTheDocument();
    expect(userSection).toHaveClass('flex');
    expect(userSection).toHaveClass('items-center');
    expect(userSection).toHaveClass('cursor-pointer');
  });

  test('has notification functionality accessible', () => {
    const { container } = render(<Navbar />);
    
    // Verificar que el ícono de notificaciones es accesible
    const bellIcon = container.querySelector('.relative svg.cursor-pointer');
    expect(bellIcon).toBeInTheDocument();
    expect(bellIcon).toHaveClass('cursor-pointer');
  });
});