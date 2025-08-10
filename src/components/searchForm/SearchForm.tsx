import { FC } from 'react';
import SearchButton from '../searchButton/SearchButton';
import classes from './SearchForm.module.scss';

export interface ISearchFormProps {
  handleSubmit: (event: React.SyntheticEvent<HTMLFormElement>) => void;
  initialValue: string;
}

const SearchForm: FC<ISearchFormProps> = ({ handleSubmit, initialValue }) => {
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
