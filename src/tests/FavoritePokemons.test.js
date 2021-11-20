import React from 'react';
import { render, screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente Favorite Pokémons', () => {
  it('Sem Pokémons favoritados exibe a mensagem "No favorite pokemon found"', () => {
    render(<FavoritePokemons />);
    const noFavorite = screen.getByText(/No favorite pokemon found/i);
    expect(noFavorite).toBeInTheDocument();
  });
  it('Testa se renderiza o card do Pokémon Favoritado', () => {
    const pokemon = [{
      averageWeight: { measurementUnit: 'kg', value: '6.0' },
      id: 25,
      image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
      name: 'Pikachu',
      summary:
      `This intelligent Pokémon roasts hard berries
       with electricity to make them tender enough to eat.',
      `,
      type: 'Eletric',
    }];
    renderWithRouter(<FavoritePokemons pokemons={ pokemon } />);
    const pokeName = screen.getByTestId('pokemon-name');
    const pokeType = screen.getByTestId('pokemon-type');
    const pokeWeight = screen.getByTestId('pokemon-weight');
    const pokeImg = screen.getByRole('img', { name: `${pokemon[0].name} sprite` });
    const detailsBtn = screen.getByRole('link', { name: /more details/i });
    expect(pokeName).toBeInTheDocument();
    expect(pokeType).toBeInTheDocument();
    expect(pokeWeight).toBeInTheDocument();
    expect(pokeImg).toBeInTheDocument();
    expect(detailsBtn).toBeInTheDocument();
    expect(pokeName).toHaveTextContent(pokemon[0].name);
    expect(pokeType).toHaveTextContent(pokemon[0].type);
    expect(pokeWeight).toHaveTextContent(
      `Average weight: ${
        pokemon[0].averageWeight.value} ${pokemon[0].averageWeight.measurementUnit}`,
    );
    expect(pokeImg.src).toBe(pokemon[0].image);
  });
});
