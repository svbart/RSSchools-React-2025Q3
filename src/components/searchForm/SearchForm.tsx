import { FC, SyntheticEvent } from 'react';
import SearchButton from '../searchButton/SearchButton';
import classes from './SearchForm.module.scss';
import { useLocalStorage } from '../../common/hooks/useLocalStorage';

interface ISearchFormProps {
  handleSubmit: (event: SyntheticEvent<HTMLFormElement>) => void;
}

const SearchForm: FC<ISearchFormProps> = ({ handleSubmit }) => {
  const [savedSearch] = useLocalStorage();
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="input"
        defaultValue={savedSearch}
        placeholder="Search"
        className={classes.searchField}
      />
      <SearchButton />
    </form>
  );
};
export default SearchForm;
