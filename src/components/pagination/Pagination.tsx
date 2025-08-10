import { SyntheticEvent } from 'react';
import classes from './Pagination.module.scss';
import { useSearchParams } from 'react-router';
import Flyout from '../flyout/Flyout';

interface PaginationProps {
  thereIsNext: boolean;
}

const Pagination = ({ thereIsNext }: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageNumber = Number(searchParams.get('page')) || 1;
  const searchValue = searchParams.get('search') || '';

  const handleButtonClick = (event: SyntheticEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLButtonElement;
    let newPage = pageNumber;

    if (target.textContent === 'Previous') newPage = pageNumber - 1;
    if (target.textContent === 'Next') newPage = pageNumber + 1;

    setSearchParams(
      searchValue
        ? { search: searchValue, page: String(newPage) }
        : { page: String(newPage) }
    );
  };

  return (
    <div className={classes.container}>
      <div className={classes.flyout}>
        <Flyout />
      </div>
      <div className={classes.pagination}>
        <button
          className={classes.button}
          onClick={handleButtonClick}
          disabled={pageNumber === 1}
        >
          Previous
        </button>
        <span className={classes.pageNumber}>{pageNumber}</span>
        <button
          className={classes.button}
          onClick={handleButtonClick}
          disabled={!thereIsNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
