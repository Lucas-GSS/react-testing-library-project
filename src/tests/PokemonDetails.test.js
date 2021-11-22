import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente Pokemon Details', () => {
  it('As informações detalhadas aparecem na tela', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.queryByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const detailsText = screen.getByRole('heading', { name: /pikachu details/i });
    expect(detailsText).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();
    const summaryTitle = screen.getByRole('heading', { name: /summary/i });
    expect(summaryTitle).toBeInTheDocument();
    const pokemonParagraph = screen.getByText(/roasts hard berries with electricity/i);
    expect(pokemonParagraph).toBeInTheDocument();
  });

  it('A página renderiza mapas coma  localização do Pokémon', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.queryByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const title = screen.getByRole('heading', { name: /Game Locations of Pikachu/i });
    expect(title).toBeInTheDocument();
    const firstLocation = screen.getByText(/Kanto Viridian Forest/i);
    expect(firstLocation).toBeInTheDocument();
    const secondLocation = screen.getByText(/Kanto Power Plant/i);
    expect(secondLocation).toBeInTheDocument();
    const locationImg = screen.getAllByRole('img', { name: /Pikachu location/i });
    expect(locationImg[0]).toBeInTheDocument();
    expect(locationImg[0].src).toEqual('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(locationImg[1]).toBeInTheDocument();
    expect(locationImg[1].src).toEqual('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('É possível favoritar o Pokémon', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.queryByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const checkbox = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
    userEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
  });
});
