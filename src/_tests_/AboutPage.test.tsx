import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, test, expect } from 'vitest';
import AboutPage from '../pages/aboutPage/AboutPage';
import { Provider } from 'react-redux';
import { store } from '../store/store';

describe('AboutPage component', () => {
  test('renders heading, author name, and course link', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AboutPage />
        </MemoryRouter>
      </Provider>
    );

    const heading = screen.getByRole('heading', { name: /about/i });
    expect(heading).toBeInTheDocument();

    expect(
      screen.getByText(/Author: Svetlana Bartkevich/i)
    ).toBeInTheDocument();

    const link = screen.getByRole('link', { name: /rs ?school react course/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
