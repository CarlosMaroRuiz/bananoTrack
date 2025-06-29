// src/__tests__/views/client/Login.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { vi, describe, test, expect, beforeEach } from 'vitest';
import Login from '../../../views/client/Login';

// No mockear react-router-dom completamente
// En su lugar, solo mockear useNavigate
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: vi.fn(() => vi.fn()),
  };
});

// Mock para setupWebSocket
vi.mock('../../../components/socket', () => ({
  default: vi.fn(() => ({ close: vi.fn() })),
}));

describe('Login Component', () => {
  beforeEach(() => {
    // Limpiar todos los mocks entre pruebas
    vi.clearAllMocks();
  });

  test('renders login form with all elements', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    // Verificar título
    expect(screen.getByText('Inicio de Sesión')).toBeInTheDocument();
    
    // Verificar campos de formulario
    expect(screen.getByLabelText(/Usuario:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña:/i)).toBeInTheDocument();
    
    // Verificar botón de inicio de sesión
    expect(screen.getByRole('button', { name: /Iniciar sesión/i })).toBeInTheDocument();
    
    // Verificar enlace para recuperación de contraseña
    expect(screen.getByText('Olvidé mi Contraseña')).toBeInTheDocument();
    
    // Verificar elementos de branding
    expect(screen.getByText('BananoTrack')).toBeInTheDocument();
    expect(screen.getByText('Bienvenido A BananoTrack')).toBeInTheDocument();
  });

  test('updates form values when user types', async () => {
    const user = userEvent.setup();
    
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    const emailInput = screen.getByLabelText(/Usuario:/i);
    const passwordInput = screen.getByLabelText(/Contraseña:/i);
    
    await user.type(emailInput, 'usuario@example.com');
    await user.type(passwordInput, 'contraseña123');
    
    expect(emailInput.value).toBe('usuario@example.com');
    expect(passwordInput.value).toBe('contraseña123');
  });

  test('has correct link to password recovery page', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    const recoveryLink = screen.getByText('Olvidé mi Contraseña').closest('a');
    expect(recoveryLink).toHaveAttribute('href', '/signin');
  });

  test('has form with correct styling and layout', () => {
    const { container } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    // Verificar estructura de secciones principales
    const formSection = container.querySelector('.md\\:mx-6');
    expect(formSection).toBeInTheDocument();
    
    const brandingSection = container.querySelector('.bg-\\[\\#F6BD43\\]');
    expect(brandingSection).toBeInTheDocument();
    
    // Verificar que los inputs tienen el estilo correcto
    const inputs = screen.getAllByRole('textbox').concat(screen.getAllByLabelText(/Contraseña/i));
    inputs.forEach(input => {
      expect(input).toHaveClass('rounded');
      expect(input).toHaveClass('border');
    });
    
    // Verificar que el botón de login tiene el estilo correcto
    const loginButton = screen.getByRole('button', { name: /Iniciar sesión/i });
    expect(loginButton).toHaveClass('bg-[#F6BD43]');
  });

  test('has appropriate input types for email and password', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    // Verificar que el campo de email es de tipo email
    const emailInput = screen.getByLabelText(/Usuario:/i);
    expect(emailInput).toHaveAttribute('type', 'email');
    
    // Verificar que el campo de contraseña es de tipo password
    const passwordInput = screen.getByLabelText(/Contraseña:/i);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
});