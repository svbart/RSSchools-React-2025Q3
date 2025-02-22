// import { SyntheticEvent, useEffect, useRef } from 'react';
// import Results from '../results/Results';
// import ResultsList from '../resultsList/ResultsList';
// import { PlanetCharacteristics } from '../../common/types/types';
// import classes from './PlanetsSearch.module.scss';
// import CreateErrorButton from '../createErrorButton/CreateErrorButton';
// import Pagination from '../pagination/Pagination';
// import SearchForm from '../searchForm/SearchForm';
// import Spinner from '../../common/spinner/Spinner';
// import { Outlet, useSearchParams } from 'react-router';
// import { useGetPlanetsByPageQuery } from '../../services/planetsApi';
// import { useAppDispatch, useAppSelector } from '../../store/hooks';
// import {
//   setCurrentPageData,
//   setPageNumber,
//   setSearchValue,
// } from '../../store/storeSlices/app-reducer';
// import { useTheme } from '../../contexts/ThemeContext';

// export interface PlanetsSearchState {
//   searchValue: string;
//   results: PlanetCharacteristics[];
//   isLoading: boolean;
//   requestError: string;
// }

// const PlanetsSearch = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const { searchValue, pageNumber, itemToShowDetails, currentPageData } =
//     useAppSelector((state) => state.app);
//   const dispatch = useAppDispatch();
//   const page = Number(searchParams.get('page'));
//   const { data, error, isLoading } = useGetPlanetsByPageQuery({
//     page,
//     searchValue,
//     itemToShowDetails,
//   });

//   console.log('data', data);
//   const themeContext = useTheme();
//   const darkMode = themeContext?.darkMode;
//   const theme = darkMode ? classes.dark : classes.light;

//   const ref = useRef<HTMLDivElement | null>(null);

//   const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const formData = new FormData(event.currentTarget);
//     const searchValue = formData.get('input') as string;
//     dispatch(setPageNumber(1));
//     setSearchParams({ search: searchValue, page: '1' });
//     dispatch(setSearchValue(searchValue));

//     if (searchValue) {
//       localStorage.setItem('searchValue', searchValue);
//     } else {
//       localStorage.removeItem('searchValue');
//     }
//   };
//   useEffect(() => {
//     const savedSearch = localStorage.getItem('searchValue') || '';
//     const initialSearchValue = searchParams.get('search') || savedSearch;
//     dispatch(setSearchValue(initialSearchValue));
//   }, []);

//   useEffect(() => {
//     if (data && data.results) {
//       dispatch(setCurrentPageData(data));
//     }
//   }, [data, pageNumber, dispatch]);

//   useEffect(() => {
//     const pageFromUrl = Number(searchParams.get('page')) || 1;

//     if (pageFromUrl !== pageNumber) {
//       dispatch(setPageNumber(pageFromUrl));
//     }

//     // Если в URL нет page, добавляем его
//     if (!searchParams.get('page')) {
//       setSearchParams({
//         ...Object.fromEntries(searchParams),
//         page: pageFromUrl.toString(),
//       });
//     }
//   }, [searchParams, dispatch, setSearchParams, pageNumber]);

//   return (
//     <>
//       <div className={classes.SearchSection}>
//         <SearchForm handleSubmit={handleSubmit} />
//         <CreateErrorButton />
//       </div>
//       <Results />
//       {error && <div className={classes.errorMessage}>{String(error)}</div>}

//       {isLoading ? <Spinner /> : null}
//       {!isLoading &&
//         !error &&
//         (!currentPageData?.results || currentPageData.results.length < 1) && (
//           <div className={classes.loading}>Nothing found</div>
//         )}

//       {!isLoading &&
//         !error &&
//         currentPageData?.results &&
//         currentPageData.results.length > 0 && (
//           <>
//             <Pagination />
//             <div className={classes.resultsSection}>
//               <div
//                 style={itemToShowDetails ? { width: '70%' } : { width: '100%' }}
//               >
//                 <ResultsList />
//               </div>

//               {itemToShowDetails && (
//                 <div
//                   id="details"
//                   ref={ref}
//                   className={`${classes.details} ${theme}`}
//                 >
//                   <Outlet />
//                 </div>
//               )}
//             </div>
//           </>
//         )}
//     </>
//   );
// };

// export default PlanetsSearch;
import { SyntheticEvent, useEffect, useRef } from 'react';
import Results from '../results/Results';
import ResultsList from '../resultsList/ResultsList';
// import { PlanetCharacteristics } from '../../common/types/types';
import classes from './PlanetsSearch.module.scss';
import CreateErrorButton from '../createErrorButton/CreateErrorButton';
import Pagination from '../pagination/Pagination';
import SearchForm from '../searchForm/SearchForm';
import Spinner from '../../common/spinner/Spinner';
import { Outlet, useSearchParams } from 'react-router';
import { useGetPlanetsByPageQuery } from '../../services/planetsApi';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  setCurrentPageData,
  setPageNumber,
  setSearchValue,
} from '../../store/storeSlices/app-reducer';
import { useTheme } from '../../contexts/ThemeContext';

const PlanetsSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchValue, pageNumber, itemToShowDetails, currentPageData } =
    useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useGetPlanetsByPageQuery({
    pageNumber,
    searchValue,
    itemToShowDetails,
  });

  const themeContext = useTheme();
  const darkMode = themeContext?.darkMode;
  const theme = darkMode ? classes.dark : classes.light;

  const ref = useRef<HTMLDivElement | null>(null);

  // При сабмите формы обновляем параметры URL и state
  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchValue = formData.get('input') as string;

    dispatch(setPageNumber(1)); // Сброс страницы на 1
    dispatch(setSearchValue(searchValue)); // Обновляем значение поиска

    // Обновляем параметры в URL
    setSearchParams({ search: searchValue, page: '1' });
    if (searchValue) {
      localStorage.setItem('searchValue', searchValue);
    } else {
      localStorage.removeItem('searchValue');
    }
  };

  // При загрузке компонента, получаем сохраненный searchValue из localStorage или параметров URL
  useEffect(() => {
    const savedSearch = localStorage.getItem('searchValue') || '';
    const initialSearchValue = searchParams.get('search') || savedSearch;
    dispatch(setSearchValue(initialSearchValue));
  }, [searchParams, dispatch]);

  // Когда приходит новый результат от API, обновляем состояние с данными текущей страницы
  useEffect(() => {
    if (data && data.results) {
      dispatch(setCurrentPageData(data));
    }
  }, [data, dispatch]);

  // Следим за параметрами page в URL и обновляем pageNumber в Redux
  useEffect(() => {
    const pageFromUrl = Number(searchParams.get('page')) || 1;

    if (pageFromUrl !== pageNumber) {
      dispatch(setPageNumber(pageFromUrl)); // Обновляем номер страницы в Redux
    }

    // Если нет параметра page, добавляем его в URL
    if (!searchParams.get('page')) {
      setSearchParams({
        ...Object.fromEntries(searchParams),
        page: pageFromUrl.toString(),
      });
    }
  }, [searchParams, dispatch, setSearchParams, pageNumber]);

  return (
    <>
      <div className={classes.SearchSection}>
        <SearchForm handleSubmit={handleSubmit} />
        <CreateErrorButton />
      </div>
      <Results />
      {error && <div className={classes.errorMessage}>{String(error)}</div>}

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
                  <Outlet />
                </div>
              )}
            </div>
          </>
        )}
    </>
  );
};

export default PlanetsSearch;
