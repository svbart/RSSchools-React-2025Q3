import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, test, expect } from 'vitest';
import NotFoundPage from '../pages/notFoundPage/NotFoundPage';

describe('NotFoundPage component', () => {
  test('renders "Page Not Found" and homepage link', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    const heading = screen.getByRole('heading', { name: /page not found/i });
    expect(heading).toBeInTheDocument();

    const link = screen.getByRole('link', { name: /homepage/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});
