// src/__tests__/components/Carousel.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CarouselComponent from '../../components/Carousel';

describe('Carousel Component', () => {
  test('renders carousel with image and navigation arrows', () => {
    const { container } = render(<CarouselComponent />);
    
    // Verificar que hay una imagen
    const image = screen.getByAltText('Imagen');
    expect(image).toBeInTheDocument();
    
    // Verificar que hay flechas de navegación (usando selectores de contenedor)
    const leftArrow = container.querySelector('svg:first-of-type');
    const rightArrow = container.querySelector('svg:last-of-type');
    
    expect(leftArrow).toBeInTheDocument();
    expect(rightArrow).toBeInTheDocument();
  });

  test('changes to next image when right arrow is clicked', async () => {
    const user = userEvent.setup();
    const { container } = render(<CarouselComponent />);
    
    // Guardar URL de la imagen inicial
    const initialImage = screen.getByAltText('Imagen').src;
    
    // Encontrar y hacer clic en la flecha derecha
    const rightArrow = container.querySelector('svg:last-of-type');
    await user.click(rightArrow);
    
    // Verificar que la imagen cambió
    const newImage = screen.getByAltText('Imagen').src;
    expect(newImage).not.toBe(initialImage);
  });

  test('changes to previous image when left arrow is clicked', async () => {
    const user = userEvent.setup();
    const { container } = render(<CarouselComponent />);
    
    // Cambiar primero a la segunda imagen
    const rightArrow = container.querySelector('svg:last-of-type');
    await user.click(rightArrow);
    
    // Guardar URL de la imagen actual (segunda imagen)
    const secondImage = screen.getByAltText('Imagen').src;
    
    // Hacer clic en la flecha izquierda para volver a la primera imagen
    const leftArrow = container.querySelector('svg:first-of-type');
    await user.click(leftArrow);
    
    // Verificar que volvimos a la primera imagen
    const firstImage = screen.getByAltText('Imagen').src;
    expect(firstImage).not.toBe(secondImage);
  });
  
  test('loops to the first image when clicking next on the last image', async () => {
    const user = userEvent.setup();
    const { container } = render(<CarouselComponent />);
    
    // Acceder directamente al array de imágenes en el componente
    // Nota: Esto es una forma de testear la funcionalidad, pero depende de la implementación interna
    const images = [
      'https://www.micultivo.bayer.com.mx/adobe/dynamicmedia/deliver/dm-aid--04a6e9e7-5163-4c79-bb37-146e9a681ac4/banano-1280x720.jpg',
      'https://blogdefagro.com/wp-content/uploads/2019/10/cultivo-de-platano.png',
      'https://www.agroclm.com/wp-content/uploads/2022/03/BANANAS-PIXABAY.jpg',
      'https://st.depositphotos.com/1053932/1330/i/450/depositphotos_13304936-stock-photo-canarian-banana-plantation-platano-in.jpg',
      'https://blogdefagro.com/wp-content/uploads/2019/10/cultivo-de-platano.png',
      'https://cdn.wikifarmer.com/wp-content/uploads/2023/11/Rendimiento-cosecha-procesamiento-y-almacenamiento-de-banano.jpg'
    ];
    
    // Ir hasta la última imagen
    const rightArrow = container.querySelector('svg:last-of-type');
    for (let i = 0; i < images.length - 1; i++) {
      await user.click(rightArrow);
    }
    
    // Guardar URL de la última imagen
    const lastImage = screen.getByAltText('Imagen').src;
    
    // Hacer clic una vez más para volver a la primera imagen
    await user.click(rightArrow);
    
    // Verificar que volvimos a la primera imagen
    const firstImage = screen.getByAltText('Imagen').src;
    expect(firstImage).not.toBe(lastImage);
    expect(firstImage).toContain('banano-1280x720'); // Verificar que es la primera imagen
  });
  
  test('loops to the last image when clicking previous on the first image', async () => {
    const user = userEvent.setup();
    const { container } = render(<CarouselComponent />);
    
    // Guardar URL de la primera imagen
    const firstImage = screen.getByAltText('Imagen').src;
    
    // Hacer clic en la flecha izquierda para ir a la última imagen
    const leftArrow = container.querySelector('svg:first-of-type');
    await user.click(leftArrow);
    
    // Verificar que fuimos a la última imagen
    const lastImage = screen.getByAltText('Imagen').src;
    expect(lastImage).not.toBe(firstImage);
    expect(lastImage).toContain('almacenamiento-de-banano'); // Verificar que es la última imagen
  });
});