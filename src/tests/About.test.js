import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Testa o componente "About"', () => {
  it('Se possui o título "About Pokedéx"', () => {
    render(<About />);
    const titleElement = screen.getByRole('heading', { name: /about pokédex/i });
    expect(titleElement).toBeInTheDocument();
  });

  it('Se possui 2 parágrafos sobre Pokémons', () => {
    render(<About />);
    const paragraphs = screen.getAllByText(/pokémons/i);
    expect(paragraphs).toHaveLength(2);
  });

  it('Se possui a imagem de uma Pokédex', () => {
    render(<About />);
    const pokedexImg = screen.getByAltText('Pokédex');
    const imgUrl = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(pokedexImg.src).toBe(imgUrl);
  });
});
