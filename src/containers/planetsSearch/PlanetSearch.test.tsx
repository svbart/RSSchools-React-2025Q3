import '@testing-library/jest-dom';
import { test, beforeEach, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import PlanetsSearch from './PlanetsSearch';
import { vi } from 'vitest';

vi.mock('../../common/utils/utils', () => ({
  getBaseUrl: () => 'https://swapi.dev/api/planets',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  normalizeData: (data: any) => data.map((item: any) => ({ name: item.name })),
}));

beforeEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});

test('успешный fetch показывает список планет', async () => {
  globalThis.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: () =>
      Promise.resolve({
        results: [{ name: 'Tatooine' }, { name: 'Alderaan' }],
      }),
  });
  render(<PlanetsSearch />);

  const element = screen.getByText(/Loading.../i);

  expect(element).toBeInTheDocument();

  await waitFor(() => {
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
  });

  await waitFor(() => {
    expect(screen.getByText('Tatooine')).toBeInTheDocument();
    expect(screen.getByText('Alderaan')).toBeInTheDocument();
  });
});
