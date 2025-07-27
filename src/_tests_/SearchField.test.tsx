import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { test, expect } from 'vitest';
import SearchField from '../components/searchField/SearchField';
import { useState } from 'react';

test('input value updates when typed into', () => {
  const Wrapper = () => {
    const [value, setValue] = useState('');
    return (
      <SearchField
        searchValue={value}
        onInputChange={(e) => setValue(e.target.value)}
      />
    );
  };

  render(<Wrapper />);

  const input = screen.getByPlaceholderText('Search') as HTMLInputElement;
  fireEvent.change(input, { target: { value: 'Alderaan' } });

  expect(input.value).toBe('Alderaan');
});
