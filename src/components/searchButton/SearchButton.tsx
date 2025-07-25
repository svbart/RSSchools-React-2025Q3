import { FC, SyntheticEvent } from 'react';

interface SearchButtonProps {
  onButtonClick: (event: SyntheticEvent) => void;
}

const SearchButton: FC<SearchButtonProps> = ({ onButtonClick }) => {
  return <button onClick={onButtonClick}>Search</button>;
};

export default SearchButton;
