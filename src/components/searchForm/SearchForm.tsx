import { FC, SyntheticEvent } from 'react';
import SearchButton from '../searchButton/SearchButton';
import classes from './SearchForm.module.scss';
// import { useLocalStorage } from '../../common/hooks/useLocalStorage';

export interface ISearchFormProps {
  handleSubmit: (event: React.SyntheticEvent<HTMLFormElement>) => void;
  initialValue: string;
}

const SearchForm: FC<ISearchFormProps> = ({ handleSubmit, initialValue }) => {
  // const [savedSearch] = useLocalStorage();
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="input"
        defaultValue={initialValue}
        placeholder="Search"
        className={classes.searchField}
      />
      <SearchButton />
    </form>
  );
};
export default SearchForm;
