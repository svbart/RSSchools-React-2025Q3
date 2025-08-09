// import { SyntheticEvent, useContext } from 'react';
// import classes from './Pagination.module.scss';
// import { useSearchParams } from 'react-router';
// import { PageContext, IPageContext } from '../../contexts/pageContext';
// import Flyout from '../flyout/Flyout';
// import { useGetPlanetsByPageQuery } from '../../sevices/planetsApi';
// import { useLocalStorage } from '../../common/hooks/useLocalStorage';

// const Pagination = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [savedSearch] = useLocalStorage();
//   const pageNumber = Number(searchParams.get('page'));
//   const { data } = useGetPlanetsByPageQuery({
//     pageNumber,
//     searchValue: savedSearch,
//   });
//   const next = data?.next;
//   const context: IPageContext | null = useContext(PageContext);

//   const handleButtonClick = (event: SyntheticEvent<HTMLButtonElement>) => {
//     if (!context) {
//       return;
//     }
//     const target = event.target as HTMLButtonElement;
//     let newPage = pageNumber;
//     if (target.textContent === 'Previous') newPage = pageNumber - 1;
//     if (target.textContent === 'Next') newPage = pageNumber + 1;

//     context.setPageNumber(newPage);
//     const searchValue = searchParams.get('search') || '';
//     setSearchParams(
//       searchValue
//         ? { search: searchValue, page: newPage.toString() }
//         : { page: newPage.toString() }
//     );
//   };
//   if (!context) {
//     return null;
//   }

//   return (
//     <div className={classes.container}>
//       <div className={classes.flyout}>
//         <Flyout />
//       </div>
//       <div className={classes.pagination}>
//         <button
//           className={classes.button}
//           onClick={handleButtonClick}
//           disabled={pageNumber === 1}
//         >
//           Previous
//         </button>{' '}
//         <span className={classes.pageNumber}>{pageNumber}</span>{' '}
//         <button
//           className={classes.button}
//           onClick={handleButtonClick}
//           disabled={!next}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Pagination;
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
