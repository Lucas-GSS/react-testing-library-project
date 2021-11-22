import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente Pokemon', () => {
  it('Renderiza um card com informações sobre o Pokémon', () => {
    renderWithRouter(<App />);
    const pokeName = screen.getByTestId('pokemon-name');
    const pokeType = screen.getByTestId('pokemon-type');
    const pokeWeight = screen.getByTestId('pokemon-weight');
    const pokeImg = screen.getByRole('img', { name: 'Pikachu sprite' });
    expect(pokeName.innerHTML).toBe('Pikachu');
    expect(pokeType.innerHTML).toBe('Electric');
    expect(pokeWeight.innerHTML).toBe('Average weight: 6.0 kg');
    expect(pokeImg.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('O link "More Details" redireciona para os detalhes do pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const detailsBtn = screen.getByRole('link', { name: /more details/i });
    expect(detailsBtn).toBeInTheDocument();
    expect(detailsBtn.href).toBe('http://localhost/pokemons/25');
    userEvent.click(detailsBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Testa se o card de um Pokémon favoritado possui uma estrela', () => {
    renderWithRouter(<App />);
    const detailsBtn = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsBtn);
    const checkFavorite = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(checkFavorite);
    const star = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(star).toBeInTheDocument();
    expect(star.src).toBe('http://localhost/star-icon.svg');
  });
});
