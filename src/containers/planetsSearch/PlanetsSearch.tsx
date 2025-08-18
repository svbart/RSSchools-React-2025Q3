// import { SyntheticEvent, useRef, useState } from 'react';
// import ResultsList from '../../components/resultsList/ResultsList';
// import SearchForm from '../../components/searchForm/SearchForm';
// import CreateErrorButton from '../../components/createErrorButton/CreateErrorButton';
// import Pagination from '../../components/pagination/Pagination';
// import Spinner from '../../common/spinner/Spinner';
// import { Outlet, useSearchParams } from 'react-router';
// import { useLocalStorage } from '../../common/hooks/useLocalStorage';
// import {
//   ExtendedFetchBaseQueryError,
//   planetsApi,
//   useGetPlanetsByPageQuery,
// } from '../../services/planetsApi';
// import { ShowDetailsContext } from '../../contexts/showDetailsContext';
// import classes from './PlanetsSearch.module.scss';
// import { useAppDispatch } from '../../store/hooks';

// const PlanetsSearch = () => {
//   const dispatch = useAppDispatch();
//   const [savedSearch, setSavedSearch] = useLocalStorage();
//   const [searchParams, setSearchParams] = useSearchParams();

//   const searchValue = searchParams.get('search') || savedSearch || '';
//   const pageNumber = Number(searchParams.get('page')) || 1;

//   const { isLoading, isError, error, isFetching, isSuccess, data, refetch } =
//     useGetPlanetsByPageQuery({
//       pageNumber,
//       searchValue,
//     });

//   const [selectedPlanetId, setSelectedPlanetId] = useState<number | null>(null);
//   const ref = useRef<HTMLDivElement | null>(null);

//   const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const formData = new FormData(event.currentTarget);
//     const value = formData.get('input') as string;

//     setSearchParams({ search: value, page: '1' });
//     setSavedSearch(value);
//     setSelectedPlanetId(null);
//   };

//   const onRefreshButtonClick = () => {
//     dispatch(planetsApi.util.invalidateTags([{ type: 'Planets', id: 'LIST' }]));
//     refetch();
//   };

//   if (isLoading) {
//     return (
//       <>
//         <div>Loading...</div>
//         <Spinner />
//       </>
//     );
//   }

//   if (isError) {
//     return (
//       <div className={classes.errorMessage}>
//         {(error as ExtendedFetchBaseQueryError).message} occurred while fetching
//         data
//       </div>
//     );
//   }

//   if (isSuccess) {
//     return (
//       <>
//         <div className={classes.SearchSection} data-theme-element="true">
//           <SearchForm handleSubmit={handleSubmit} initialValue={searchValue} />
//           <CreateErrorButton />
//           <button data-testid="refetch-btn" onClick={onRefreshButtonClick}>
//             Refresh
//           </button>
//         </div>
//         {isFetching && (
//           <>
//             <div className={classes.fetching}>Fetching...</div>
//           </>
//         )}

//         {data.results && data.results.length < 1 ? (
//           <div className={classes.searchInfo}>
//             Oops, we couldn&apos;t find anything
//           </div>
//         ) : (
//           <>
//             <Pagination thereIsNext={Boolean(data.next)} />

//             <div className={classes.resultsSection}>
//               <div
//                 style={selectedPlanetId ? { width: '70%' } : { width: '100%' }}
//               >
//                 <ResultsList
//                   planets={data.results}
//                   setSelectedPlanetId={setSelectedPlanetId}
//                 />
//               </div>

//               {selectedPlanetId && (
//                 <div id="details" ref={ref} className={classes.details}>
//                   <ShowDetailsContext.Provider value={{ setSelectedPlanetId }}>
//                     <Outlet />
//                   </ShowDetailsContext.Provider>
//                 </div>
//               )}
//             </div>
//           </>
//         )}
//       </>
//     );
//   }

//   return null;
// };

// export default PlanetsSearch;

'use client';

import { SyntheticEvent, useRef, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import ResultsList from '../../components/resultsList/ResultsList';
import SearchForm from '../../components/searchForm/SearchForm';
import CreateErrorButton from '../../components/createErrorButton/CreateErrorButton';
import Spinner from '../../common/spinner/Spinner';
import { useLocalStorage } from '../../common/hooks/useLocalStorage';
import {
  ExtendedFetchBaseQueryError,
  planetsApi,
  useGetPlanetsByPageQuery,
} from '../../services/planetsApi';
import { ShowDetailsContext } from '../../contexts/showDetailsContext';
import classes from './PlanetsSearch.module.scss';
import { useAppDispatch } from '../../store/hooks';
import ItemDetailsCard from '../../components/itemDetailsCard/ItemDetailsCard';

const PlanetsSearch = () => {
  const t = useTranslations('search');
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [savedSearch, setSavedSearch] = useLocalStorage(`savedSearch`, '');
  const searchParams = useSearchParams();

  const searchValue = searchParams?.get('search') || savedSearch || '';
  const pageNumber = Number(searchParams?.get('page')) || 1;
  const planetIdFromUrl = searchParams?.get('planetId');

  const { isLoading, isError, error, isFetching, isSuccess, data, refetch } =
    useGetPlanetsByPageQuery({
      pageNumber,
      searchValue,
    });

  const [selectedPlanetId, setSelectedPlanetId] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);

  // Инициализация выбранной планеты из URL
  useEffect(() => {
    if (planetIdFromUrl && !selectedPlanetId) {
      setSelectedPlanetId(Number(planetIdFromUrl));
    }
  }, [planetIdFromUrl, selectedPlanetId]);

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const value = formData.get('input') as string;

    // Next.js navigation
    const params = new URLSearchParams();
    params.set('search', value);
    params.set('page', '1');

    router.push(`?${params.toString()}`);
    setSavedSearch(value);
    setSelectedPlanetId(null);
  };

  const onRefreshButtonClick = () => {
    dispatch(planetsApi.util.invalidateTags([{ type: 'Planets', id: 'LIST' }]));
    refetch();
  };

  const handlePlanetSelect = (planetId: number) => {
    setSelectedPlanetId(planetId);
    // Можно также обновить URL
    const params = new URLSearchParams(searchParams?.toString());
    params.set('planetId', planetId.toString());
    router.push(`?${params.toString()}`);
  };

  const handleCloseDetails = () => {
    setSelectedPlanetId(null);
    // Удаляем planetId из URL
    const params = new URLSearchParams(searchParams?.toString());
    params.delete('planetId');
    router.push(`?${params.toString()}`);
  };

  if (isLoading) {
    return (
      <>
        <div>{t('loading')}</div>
        <Spinner />
      </>
    );
  }

  if (isError) {
    return (
      <div className={classes.errorMessage}>
        {t('error')}: {(error as ExtendedFetchBaseQueryError).message}
      </div>
    );
  }

  if (isSuccess) {
    return (
      <>
        <div className={classes.SearchSection} data-theme-element="true">
          <SearchForm handleSubmit={handleSubmit} initialValue={searchValue} />
          <CreateErrorButton />
          <button data-testid="refetch-btn" onClick={onRefreshButtonClick}>
            Refresh
          </button>
        </div>

        {isFetching && <div className={classes.fetching}>{t('loading')}</div>}

        {data.results && data.results.length < 1 ? (
          <div className={classes.searchInfo}>{t('noResults')}</div>
        ) : (
          <>
            {/* <Pagination thereIsNext={Boolean(data.next)} /> */}

            <div className={classes.resultsSection}>
              <div
                style={selectedPlanetId ? { width: '70%' } : { width: '100%' }}
              >
                <ResultsList
                  planets={data.results}
                  handlePlanetSelect={handlePlanetSelect}
                />
              </div>

              {selectedPlanetId && (
                <div id="details" ref={ref} className={classes.details}>
                  <ShowDetailsContext.Provider
                    value={{
                      setSelectedPlanetId: handleCloseDetails,
                    }}
                  >
                    <ItemDetailsCard planetId={selectedPlanetId} />
                  </ShowDetailsContext.Provider>
                </div>
              )}
            </div>
          </>
        )}
      </>
    );
  }

  return null;
};

export default PlanetsSearch;
