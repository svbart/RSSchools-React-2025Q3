import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, test, expect } from 'vitest';
import App from '../App';

describe('App routing', () => {
  test('renders PlanetsSearchPage on /', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(
      screen.getByRole('heading', { name: /star wars planets/i })
    ).toBeInTheDocument();
  });

  test('renders AboutPage on /about', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /about/i })).toBeInTheDocument();
  });

  test('renders ItemDetailsCard on /planets/1', () => {
    render(
      <MemoryRouter initialEntries={['/planets/1']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('spinner')).toBeInTheDocument(); //
  });

  test('renders NotFoundPage on unknown route', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <App />
      </MemoryRouter>
    );
    expect(
      screen.getByRole('heading', { name: /page not found/i })
    ).toBeInTheDocument();
  });
});
