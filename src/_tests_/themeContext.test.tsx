import { useContext } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ThemeProvider, ThemeContext } from '../contexts/themeContext';

const TestComponent = () => {
  const context = useContext(ThemeContext);

  if (!context) return null;

  return (
    <>
      <span data-testid="theme">{context.theme}</span>
      <button onClick={context.toggleTheme}>Toggle Theme</button>
      <button onClick={() => context.setTheme('dark')}>Set Dark</button>
    </>
  );
};

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should default to light theme if no theme in localStorage', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme').textContent).toBe('light');
    expect(document.documentElement.classList.contains('light')).toBe(true);
  });

  it('should read initial theme from localStorage', () => {
    localStorage.setItem('theme', 'dark');

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme').textContent).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('should toggle theme between light and dark', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const button = screen.getByText('Toggle Theme');
    const themeDisplay = screen.getByTestId('theme');

    // Initial state
    expect(themeDisplay.textContent).toBe('light');

    // Toggle to dark
    fireEvent.click(button);
    expect(themeDisplay.textContent).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    // Toggle back to light
    fireEvent.click(button);
    expect(themeDisplay.textContent).toBe('light');
    expect(document.documentElement.classList.contains('light')).toBe(true);
  });

  it('should allow setting theme explicitly', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const setDarkButton = screen.getByText('Set Dark');
    fireEvent.click(setDarkButton);

    expect(screen.getByTestId('theme').textContent).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('should store the selected theme in localStorage', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const toggleButton = screen.getByText('Toggle Theme');
    fireEvent.click(toggleButton);

    expect(localStorage.getItem('theme')).toBe('dark');
  });
});
