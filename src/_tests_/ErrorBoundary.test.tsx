import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ErrorBoundary from '../hoc/errorBoundary/ErrorBoundary';

function ErrorChild() {
  throw new Error('Test error');
  return null;
}

describe('ErrorBoundary', () => {
  it('should show fallback UI if error occurs in child component', () => {
    render(
      <ErrorBoundary>
        <ErrorChild />
      </ErrorBoundary>
    );

    expect(
      screen.getByText(/Something went wrong! Try again later/i)
    ).toBeInTheDocument();
  });

  it('must show children, if no error occurs', () => {
    render(
      <ErrorBoundary>
        <div>Everything is fine</div>
      </ErrorBoundary>
    );

    expect(screen.getByText(/fine/i)).toBeInTheDocument();
  });
});
