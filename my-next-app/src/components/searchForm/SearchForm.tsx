import { FC, SyntheticEvent } from 'react';
import SearchButton from '../searchButton/SearchButton';
import classes from './SearchForm.module.scss';
import { useAppSelector } from '@/src/store/hooks';

interface ISearchFormProps {
  handleSubmit: (event: SyntheticEvent<HTMLFormElement>) => void;
}

const SearchForm: FC<ISearchFormProps> = ({ handleSubmit }) => {
  const { searchValue } = useAppSelector((state) => state.app);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="input"
        defaultValue={searchValue ?? ''}
        placeholder="Search"
        className={classes.searchField}
      />
      <SearchButton />
    </form>
  );
};
export default SearchForm;
