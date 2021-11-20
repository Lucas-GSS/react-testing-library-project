import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa se o componente "Pokedex"', () => {
  it('Possui o título "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const titleElement = screen.getByRole('heading', { name: 'Encountered pokémons' });
    expect(titleElement).toBeInTheDocument();
  });

  it('O botão "Próximo pokémon" ao ser clicado renderiza o próximo pokémon', () => {
    renderWithRouter(<App />);
    const nextPokemon = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(nextPokemon).toBeInTheDocument();
    userEvent.click(nextPokemon);
    const charmander = screen.getByText(/charmander/i);
    expect(charmander).toBeInTheDocument();
    userEvent.click(nextPokemon);
    const caterpie = screen.getByText(/caterpie/i);
    expect(caterpie).toBeInTheDocument();
    userEvent.click(nextPokemon);
    const ekans = screen.getByText(/ekans/i);
    expect(ekans).toBeInTheDocument();
    userEvent.click(nextPokemon);
    const alakazam = screen.getByText(/alakazam/i);
    expect(alakazam).toBeInTheDocument();
    userEvent.click(nextPokemon);
    const mew = screen.getByText(/mew/i);
    expect(mew).toBeInTheDocument();
    userEvent.click(nextPokemon);
    const rapidash = screen.getByText(/rapidash/i);
    expect(rapidash).toBeInTheDocument();
    userEvent.click(nextPokemon);
    const snorlax = screen.getByText(/snorlax/i);
    expect(snorlax).toBeInTheDocument();
    userEvent.click(nextPokemon);
    const dragonair = screen.getByText(/dragonair/i);
    expect(dragonair).toBeInTheDocument();
    userEvent.click(nextPokemon);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });

  it('Renderiza apenas 1 pokémon por vez', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getAllByTestId('pokemon-name');
    expect(pokemonName).toHaveLength(1);
  });

  it('Se possui botões diferentes de filtro', () => {
    renderWithRouter(<App />);
    const allBtn = screen.getByRole('button', { name: /all/i });
    expect(allBtn.innerHTML).toBe('All');
    const typesBtns = screen.getAllByTestId('pokemon-type-button');
    expect(typesBtns[0].innerHTML).toBe('Electric');
    expect(typesBtns[1].innerHTML).toBe('Fire');
    expect(typesBtns[2].innerHTML).toBe('Bug');
    expect(typesBtns[3].innerHTML).toBe('Poison');
    expect(typesBtns[4].innerHTML).toBe('Psychic');
    expect(typesBtns[5].innerHTML).toBe('Normal');
    expect(typesBtns[6].innerHTML).toBe('Dragon');
  });

  it('Se o botão All está sempre visível', () => {
    renderWithRouter(<App />);
    const allBtn = screen.getByRole('button', { name: /all/i });
    const bugBtn = screen.getByRole('button', { name: /bug/i });
    userEvent.click(bugBtn);
    expect(allBtn).toBeInTheDocument();
    expect(allBtn).toBeEnabled();
    const dragonBtn = screen.getByRole('button', { name: /dragon/i });
    userEvent.click(dragonBtn);
    expect(allBtn).toBeInTheDocument();
    expect(allBtn).toBeEnabled();
  });

  it('Ao clicar em um tipo renderiza somente o tipo do pokémon cliclado', () => {
    renderWithRouter(<App />);
    const nextPokemon = screen.getByRole('button', { name: 'Próximo pokémon' });
    const fireBtn = screen.getByRole('button', { name: /fire/i });
    userEvent.click(fireBtn);
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType.innerHTML).toBe('Fire');
    userEvent.click(nextPokemon);
    expect(pokemonType.innerHTML).toBe('Fire');
  });

  it('Ao clicar em "All" renderiza os pokemons sem filtro', () => {
    renderWithRouter(<App />);
    const psychicBtn = screen.getByRole('button', { name: /psychic/i });
    const allBtn = screen.getByRole('button', { name: /all/i });
    const pokemonType = screen.getByTestId('pokemon-type');
    userEvent.click(psychicBtn);
    expect(pokemonType.innerHTML).toBe('Psychic');
    userEvent.click(allBtn);
    expect(pokemonType.innerHTML).toBe('Electric');
  });
});
