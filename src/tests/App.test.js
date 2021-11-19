import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa se o componente App', () => {
  it('Possui o Link "Home"', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();
  });

  it('Possui o Link "About"', () => {
    renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();
  });

  it('Possui o Link "Favorite Pokémons"', () => {
    renderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favoriteLink).toBeInTheDocument();
  });
});

describe('Testa as rotas', () => {
  it('"Home" ao ser clicado redireciona para a rota "/"', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    userEvent.click(homeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('"About" ao ser clicado redireciona para a rota "/about"', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: 'About' });
    userEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('"Favorites Pokémons" ao ser clicado redireciona para a rota "/favorites"', () => {
    const { history } = renderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoriteLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Url inexistente rediciona para "NotFound"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/inexistente');
    const notFound = screen.getByRole('img', {
      name: 'Pikachu crying because the page requested was not found',
    });
    expect(notFound).toBeInTheDocument();
  });
});
