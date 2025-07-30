import '@testing-library/jest-dom';
import { test, beforeEach, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import PlanetsSearch from '../containers/planetsSearch/PlanetsSearch';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { store } from '../store/store';

vi.mock('../../common/utils/utils', () => ({
  getBaseUrl: () => 'https://swapi.py4e.com/api/planets',
  normalizeData: (data: { name: string }[]) =>
    data.map((item: { name: string }) => ({ name: item.name })),
}));

beforeEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});

test('successful fetch displays the list of planets', async () => {
  globalThis.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: () =>
      Promise.resolve({
        results: [{ name: 'Tatooine' }, { name: 'Alderaan' }],
      }),
  });
  render(
    <Provider store={store}>
      <BrowserRouter>
        <PlanetsSearch />
      </BrowserRouter>
    </Provider>
  );

  expect(screen.getByTestId('spinner')).toBeInTheDocument();

  await waitFor(() => {
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
  });

  await waitFor(() => {
    expect(screen.getByText('Tatooine')).toBeInTheDocument();
    expect(screen.getByText('Alderaan')).toBeInTheDocument();
  });
});
