import { FC, SyntheticEvent, useContext } from 'react';
import classes from './Pagination.module.scss';
import { PageContext, IPageContext } from '../../contexts/pageContext';

const Pagination: FC = () => {
  const context: IPageContext | null = useContext(PageContext);
  console.log('context', context);

  const handleButtonClick = (event: SyntheticEvent<HTMLButtonElement>) => {
    if (!context) {
      return;
    }
    const target = event.target as HTMLButtonElement;
    if (target.textContent === 'Previous') {
      context.setPageNumber((prev) => prev - 1);
    }
    if (target.textContent === 'Next') {
      context.setPageNumber((prev) => prev + 1);
    }
  };

  return (
    <div className={classes.pagination}>
      <button
        className={classes.button}
        onClick={handleButtonClick}
        disabled={context?.pageNumber === 1}
      >
        Previous
      </button>{' '}
      <span className={classes.pageNumber}>{context?.pageNumber}</span>{' '}
      <button
        className={classes.button}
        onClick={handleButtonClick}
        disabled={!context?.thereIsNext}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
