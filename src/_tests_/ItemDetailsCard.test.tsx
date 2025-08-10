// import '@testing-library/jest-dom';
// import { test, expect } from 'vitest';
// import { render, screen, waitFor } from '@testing-library/react';
// import { vi } from 'vitest';
// import { MemoryRouter, Route, Routes } from 'react-router';
// import ItemDetailsCard from '../components/itemDetailsCard/ItemDetailsCard';
// import { Provider } from 'react-redux';
// import { store } from '../store/store';

// test('successful fetch displays the properties of a planet', async () => {
//   globalThis.fetch = vi.fn().mockResolvedValue({
//     ok: true,
//     json: () =>
//       Promise.resolve({
//         name: 'Tatooine',
//         population: '200000',
//         terrain: 'desert',
//         climate: 'arid',
//         gravity: '1 standard',
//         diameter: '10465',
//       }),
//   });

//   render(
//     <Provider store={store}>
//       <MemoryRouter initialEntries={['/planets/1']}>
//         <Routes>
//           <Route path="/planets/:id" element={<ItemDetailsCard />} />
//         </Routes>
//       </MemoryRouter>
//     </Provider>
//   );

//   expect(screen.getByTestId('spinner')).toBeInTheDocument();

//   await waitFor(() => {
//     expect(globalThis.fetch).toHaveBeenCalledTimes(1);
//   });

//   await waitFor(() => {
//     expect(screen.getByText(/Planet: Tatooine/i)).toBeInTheDocument();
//     expect(screen.getByText(/Population: 200000/i)).toBeInTheDocument();
//     expect(screen.getByText(/Terrain: desert/i)).toBeInTheDocument();
//     expect(screen.getByText(/Climate: arid/i)).toBeInTheDocument();
//     expect(screen.getByText(/Gravity: 1 standard/i)).toBeInTheDocument();
//     expect(screen.getByText(/Diameter: 10465/i)).toBeInTheDocument();
//   });
// });
import '@testing-library/jest-dom';
import { test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import ItemDetailsCard from '../components/itemDetailsCard/ItemDetailsCard';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import * as planetsApi from '../services/planetsApi'; // импортируем API с RTK Query

test('successful fetch displays the properties of a planet', async () => {
  const mockData = {
    name: 'Tatooine',
    population: '200000',
    terrain: 'desert',
    climate: 'arid',
    gravity: '1 standard',
    diameter: '10465',
  };

  const useGetPlanetByIdQuerySpy = vi
    .spyOn(planetsApi, 'useGetPlanetByIdQuery')
    .mockReturnValue({
      data: mockData,
      isLoading: false,
      isFetching: false,
      error: undefined,
      refetch: vi.fn(),
    });

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/planets/1']}>
        <Routes>
          <Route path="/planets/:id" element={<ItemDetailsCard />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  expect(await screen.findByText(/Planet: Tatooine/i)).toBeInTheDocument();
  expect(screen.getByText(/Population: 200000/i)).toBeInTheDocument();
  expect(screen.getByText(/Terrain: desert/i)).toBeInTheDocument();
  expect(screen.getByText(/Climate: arid/i)).toBeInTheDocument();
  expect(screen.getByText(/Gravity: 1 standard/i)).toBeInTheDocument();
  expect(screen.getByText(/Diameter: 10465/i)).toBeInTheDocument();

  useGetPlanetByIdQuerySpy.mockRestore();
});
test('displays error message when error occurs', async () => {
  const error = { status: 404, message: 'Not found' };

  vi.spyOn(planetsApi, 'useGetPlanetByIdQuery').mockReturnValue({
    data: undefined,
    isLoading: false,
    isFetching: false,
    isError: true,
    error,
    refetch: vi.fn(),
  });

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/planets/1']}>
        <Routes>
          <Route path="/planets/:id" element={<ItemDetailsCard />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  expect(await screen.findByRole('alert')).toHaveTextContent(/Not found/i);
});
