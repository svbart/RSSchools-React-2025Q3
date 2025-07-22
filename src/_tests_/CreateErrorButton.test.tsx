import { fireEvent, render, screen } from '@testing-library/react';
import CreateErrorButton from '../components/createErrorButton/CreateErrorButton';
import { describe, it, expect } from 'vitest';
import { Component } from 'react';
import { ChildrenAsProps } from '../common/types/types';

interface ErrorBoundaryState {
  hasError: boolean;
}

describe('CreateErrorButton', () => {
  it('shows fallback UI when error is thrown', async () => {
    class ErrorBoundary extends Component<ChildrenAsProps, ErrorBoundaryState> {
      state = { hasError: false };

      static getDerivedStateFromError() {
        return { hasError: true };
      }

      render() {
        if (this.state.hasError) {
          return <div role="alert">Something went wrong</div>;
        }
        return this.props.children;
      }
    }

    render(
      <ErrorBoundary>
        <CreateErrorButton />
      </ErrorBoundary>
    );

    const button = screen.getByRole('button', { name: /throw error/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent('Something went wrong');
  });
});
