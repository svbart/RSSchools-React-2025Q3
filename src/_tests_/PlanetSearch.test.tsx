// import { render, screen } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import { store } from '../store/store';
// import { MemoryRouter } from 'react-router';
// import { describe, it, vi, Mock, expect } from 'vitest';
// import PlanetsSearch from '../containers/planetsSearch/PlanetsSearch';
// import { useGetPlanetsByPageQuery } from '../services/planetsApi';

// vi.mock('../services/planetsApi', async (importOriginal) => {
//   const actual = (await importOriginal()) as Record<string, unknown>;
//   return {
//     ...actual,
//     useGetPlanetsByPageQuery: vi.fn(),
//   };
// });

// describe('PlanetsSearch', () => {
//   it('successful fetch displays the list of planets', async () => {
//     (useGetPlanetsByPageQuery as Mock).mockReturnValue({
//       isLoading: false,
//       isError: false,
//       isSuccess: true,
//       data: {
//         results: [{ name: 'Tatooine' }, { name: 'Alderaan' }],
//         next: null,
//         previous: null,
//         count: 2,
//       },
//       refetch: vi.fn(),
//     });

//     render(
//       <Provider store={store}>
//         <MemoryRouter>
//           <PlanetsSearch />
//         </MemoryRouter>
//       </Provider>
//     );

//     expect(await screen.findByText('Tatooine')).toBeInTheDocument();
//     expect(screen.getByText('Alderaan')).toBeInTheDocument();
//   });
// });
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { MemoryRouter } from 'react-router';
import { describe, it, vi, Mock, expect } from 'vitest';
import PlanetsSearch from '../containers/planetsSearch/PlanetsSearch';
import { useGetPlanetsByPageQuery } from '../services/planetsApi';

vi.mock('../services/planetsApi', async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>;
  return {
    ...actual,
    useGetPlanetsByPageQuery: vi.fn(),
  };
});

describe('PlanetsSearch', () => {
  it('successful fetch displays the list of planets and refetch works', async () => {
    const refetchMock = vi.fn();

    (useGetPlanetsByPageQuery as Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      isSuccess: true,
      data: {
        results: [{ name: 'Tatooine' }, { name: 'Alderaan' }],
        next: null,
        previous: null,
        count: 2,
      },
      refetch: refetchMock,
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PlanetsSearch />
        </MemoryRouter>
      </Provider>
    );

    // Проверяем, что планеты отображаются
    expect(await screen.findByText('Tatooine')).toBeInTheDocument();
    expect(screen.getByText('Alderaan')).toBeInTheDocument();

    // Предположим, что в твоём PlanetsSearch есть кнопка для рефетча с testid='refetch-btn'
    // Если её нет, адаптируй селектор под свой UI
    const refetchButton = screen.getByTestId('refetch-btn');

    // Кликаем по кнопке для вызова refetch
    fireEvent.click(refetchButton);

    // Проверяем, что refetch вызван
    expect(refetchMock).toHaveBeenCalledTimes(1);
  });
});
