import { ChangeEvent, FC } from 'react';

interface SearchFieldProps {
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
}

const SearchField: FC<SearchFieldProps> = ({ onInputChange, searchValue }) => {
  return (
    <input
      type="text"
      placeholder="Search"
      value={searchValue}
      onChange={onInputChange}
    />
  );
};

export default SearchField;
