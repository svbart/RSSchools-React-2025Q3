import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, test, expect } from 'vitest';
import PlanetsSearchPage from '../pages/searchPage/PlanetsSearchPage';
import { Provider } from 'react-redux';
import { store } from '../store/store';

describe('PlanetsSearchPage component', () => {
  test('renders header, navigation, and PlanetsSearch components', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PlanetsSearchPage />
        </MemoryRouter>
      </Provider>
    );

    const heading = screen.getByRole('heading', { name: /star wars planets/i });
    expect(heading).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /homepage/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();

    // const searchInput = screen.getByPlaceholderText(/search/i);
    // expect(searchInput).toBeInTheDocument();
  });
});
