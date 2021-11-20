import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa a rota de "NotFound"', () => {
  it('Ao receber uma url inexistente o componente NotFound é renderizado', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/nãoexiste');
    const titleNotFound = screen.getByRole('heading', {
      name: /page requested not found/i });
    const imgNotFound = screen.getByRole('img', {
      name: 'Pikachu crying because the page requested was not found' });
    expect(titleNotFound).toBeInTheDocument();
    expect(imgNotFound).toBeInTheDocument();
    expect(imgNotFound.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
