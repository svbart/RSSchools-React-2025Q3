import { SyntheticEvent, useEffect, useRef } from 'react';
import Results from '../results/Results';
import ResultsList from '../resultsList/ResultsList';
import classes from './PlanetsSearch.module.scss';
import CreateErrorButton from '../createErrorButton/CreateErrorButton';
import Pagination from '../pagination/Pagination';
import SearchForm from '../searchForm/SearchForm';
import Spinner from '../../common/spinner/Spinner';
import { useGetPlanetsByPageQuery } from '../../services/planetsApi';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  setCurrentPageData,
  setPageNumber,
  setSearchValue,
} from '../../store/storeSlices/app-reducer';
import { useRouter } from 'next/router';
import { useTheme } from '../../contexts/ThemeContext';
import ItemDetailsCard from '../itemDetailsCard/ItemDetailsCard';

const PlanetsSearch = () => {
  const { searchValue, pageNumber, itemToShowDetails, currentPageData } =
    useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useGetPlanetsByPageQuery({
    pageNumber,
    searchValue,
    itemToShowDetails,
  });
  const router = useRouter();
  const themeContext = useTheme();
  const darkMode = themeContext?.darkMode;
  const theme = darkMode ? classes.dark : classes.light;

  const ref = useRef<HTMLDivElement | null>(null);

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchValue = formData.get('input') as string;

    dispatch(setPageNumber(1));
    dispatch(setSearchValue(searchValue));

    router.replace({
      pathname: '/planets',
      query: { search: searchValue, page: '1' },
    });
    if (searchValue) {
      localStorage.setItem('searchValue', searchValue);
    } else {
      localStorage.removeItem('searchValue');
    }
  };
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSearch = localStorage.getItem('searchValue') || '';
      dispatch(setSearchValue(savedSearch ?? ''));
    }
  }, [dispatch]);

  useEffect(() => {
    if (data && data.results) {
      dispatch(setCurrentPageData(data));
    }
  }, [data, dispatch]);

  return (
    <>
      <div className={classes.SearchSection}>
        <SearchForm handleSubmit={handleSubmit} />
        <CreateErrorButton />
      </div>
      <Results />
      {error && <div className={classes.errorMessage}>An error occurred</div>}

      {isLoading ? <Spinner /> : null}
      {!isLoading &&
        !error &&
        (!currentPageData?.results || currentPageData.results.length < 1) && (
          <div className={classes.loading}>Nothing found</div>
        )}

      {!isLoading &&
        !error &&
        currentPageData?.results &&
        currentPageData.results.length > 0 && (
          <>
            <Pagination />
            <div className={classes.resultsSection}>
              <div
                style={itemToShowDetails ? { width: '70%' } : { width: '100%' }}
              >
                <ResultsList />
              </div>

              {itemToShowDetails && (
                <div
                  id="details"
                  ref={ref}
                  className={`${classes.details} ${theme}`}
                >
                  <ItemDetailsCard />
                </div>
              )}
            </div>
          </>
        )}
    </>
  );
};

export default PlanetsSearch;
