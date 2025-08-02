import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import appReducer, {
  updateSelectedItems,
} from './../store/storeSlices/app-reducer';
import Flyout from '../components/flyout/Flyout';

vi.mock('../downloadSelectedItems/DownloadBtn', () => ({
  default: () => <div data-testid="mock-download-btn">Download</div>,
}));

const mockPlanet = (id: number) => ({
  name: `Planet ${id}`,
  rotationPeriod: `241`,
  orbitalPeriod: `365`,
  diameter: `12742`,
  climate: `temperate`,
  gravity: `1`,
  terrain: `forest`,
  surfaceWater: `0`,
  population: `1000`,
  url: `https://swapi.dev/api/planets/${id}/`,
});

// create custom store for testing
const createTestStore = () =>
  configureStore({
    reducer: {
      app: appReducer,
    },
  });

describe('Flyout with real Redux store', () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
  });

  it('does not render when no selected items', () => {
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    expect(screen.queryByTestId('mock-download-btn')).not.toBeInTheDocument();
  });

  it('renders with selected items and allows clearing selection', () => {
    store.dispatch(updateSelectedItems(mockPlanet(1)));
    store.dispatch(updateSelectedItems(mockPlanet(2)));

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    expect(
      screen.getByText(
        (text) => text.includes('2') && text.includes('selected')
      )
    ).toBeInTheDocument();

    const unselectBtn = screen.getByRole('button', { name: /unselect all/i });
    expect(unselectBtn).toBeInTheDocument();

    fireEvent.click(unselectBtn);

    expect(store.getState().app.selectedItems.length).toBe(0);
    expect(screen.queryByText('2 selected')).not.toBeInTheDocument();
  });
});
