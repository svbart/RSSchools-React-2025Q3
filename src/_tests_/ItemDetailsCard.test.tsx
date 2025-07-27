import '@testing-library/jest-dom';
import { test, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router';
import ItemDetailsCard from '../components/itemDetailsCard/ItemDetailsCard';

test('successful fetch displays the properties of a planet', async () => {
  globalThis.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: () =>
      Promise.resolve({
        name: 'Tatooine',
        population: '200000',
        terrain: 'desert',
        climate: 'arid',
        gravity: '1 standard',
        diameter: '10465',
      }),
  });

  render(
    <MemoryRouter initialEntries={['/planets/1']}>
      <Routes>
        <Route path="/planets/:id" element={<ItemDetailsCard />} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByTestId('spinner')).toBeInTheDocument();

  await waitFor(() => {
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
  });

  await waitFor(() => {
    expect(screen.getByText(/Planet: Tatooine/i)).toBeInTheDocument();
    expect(screen.getByText(/Population: 200000/i)).toBeInTheDocument();
    expect(screen.getByText(/Terrain: desert/i)).toBeInTheDocument();
    expect(screen.getByText(/Climate: arid/i)).toBeInTheDocument();
    expect(screen.getByText(/Gravity: 1 standard/i)).toBeInTheDocument();
    expect(screen.getByText(/Diameter: 10465/i)).toBeInTheDocument();
  });
});
