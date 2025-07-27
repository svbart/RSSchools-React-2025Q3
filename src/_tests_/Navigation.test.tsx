import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, test, expect } from 'vitest';
import Navigation from '../components/navigation/Navigation';

describe('Navigation component', () => {
  test('renders Homepage and About links', () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    const homepageLink = screen.getByRole('link', { name: /homepage/i });
    const aboutLink = screen.getByRole('link', { name: /about/i });

    expect(homepageLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();

    expect(homepageLink).toHaveAttribute('href', '/');
    expect(aboutLink).toHaveAttribute('href', '/about');
  });
});
