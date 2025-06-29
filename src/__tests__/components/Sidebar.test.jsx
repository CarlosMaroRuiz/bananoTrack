import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

describe('Sidebar Component', () => {
  test('renders collapsed sidebar by default', () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );
    
    // Verifica que los textos del menú no estén presentes cuando está colapsado
    expect(screen.queryByText('Home')).not.toBeInTheDocument();
    expect(screen.queryByText('Datos de Calor')).not.toBeInTheDocument();
    expect(screen.queryByText('Datos de Humedad')).not.toBeInTheDocument();
  });
  
  test('expands when menu icon is clicked', async () => {
    const user = userEvent.setup();
    
    // Necesitamos el container para acceder directamente al DOM
    const { container } = render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );
    
    // Método 1: Seleccionar el primer SVG en el contenedor (FaBars)
    const menuIcon = container.querySelector('svg');
    await user.click(menuIcon);
    
    // Verifica que los textos del menú aparezcan después del clic
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Datos de Calor')).toBeInTheDocument();
    expect(screen.getByText('Datos de Humedad')).toBeInTheDocument();
  });
  
  test('collapses when close icon is clicked', async () => {
    const user = userEvent.setup();
    
    const { container } = render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );
    
    // Primero expandimos el sidebar
    const menuIcon = container.querySelector('svg');
    await user.click(menuIcon);
    
    // Ahora aparece el icono de cerrar (FaTimes)
    // Podemos buscarlo por su posición en el DOM o por su contexto
    const closeIcon = screen.getByText('Dashboard').nextElementSibling;
    await user.click(closeIcon);
    
    // Verificamos que el sidebar se ha colapsado
    expect(screen.queryByText('Home')).not.toBeInTheDocument();
    expect(screen.queryByText('Datos de Calor')).not.toBeInTheDocument();
    expect(screen.queryByText('Datos de Humedad')).not.toBeInTheDocument();
  });
});