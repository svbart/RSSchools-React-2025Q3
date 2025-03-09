import { SyntheticEvent } from 'react';
import styles from './Pagination.module.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  setItemToShowDetails,
  setPageNumber,
} from '../../store/storeSlices/app-reducer';
import { useRouter } from 'next/router';
import { useTheme } from '../../contexts/ThemeContext';

const Pagination = () => {
  const dispatch = useAppDispatch();
  const { currentPageData, pageNumber, searchValue } = useAppSelector(
    (state) => state.app
  );
  const router = useRouter();

  const themeContext = useTheme();
  const darkMode = themeContext?.darkMode;
  const theme = darkMode ? styles.dark : styles.light;

  const handleButtonClick = (event: SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const target = event.target as HTMLButtonElement;

    let newPageNumber = pageNumber;
    if (target.textContent === 'Previous') newPageNumber = pageNumber - 1;
    if (target.textContent === 'Next') newPageNumber = pageNumber + 1;

    dispatch(setPageNumber(newPageNumber));
    dispatch(setItemToShowDetails(null));
    const searchString = searchValue || '';

    router.replace({
      pathname: '/planets',
      query: { query: searchString, page: newPageNumber.toString() },
    });
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.button}
        onClick={handleButtonClick}
        disabled={!currentPageData.previous}
      >
        Previous
      </button>
      <span className={`${styles.pageNumber} ${theme}`}>{pageNumber}</span>
      <button
        className={styles.button}
        onClick={handleButtonClick}
        disabled={!currentPageData.next}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
