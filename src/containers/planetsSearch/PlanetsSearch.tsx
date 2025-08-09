import { SyntheticEvent, useRef, useState } from 'react';
import ResultsList from '../../components/resultsList/ResultsList';
import SearchForm from '../../components/searchForm/SearchForm';
import CreateErrorButton from '../../components/createErrorButton/CreateErrorButton';
import Pagination from '../../components/pagination/Pagination';
import Spinner from '../../common/spinner/Spinner';
import { Outlet, useSearchParams } from 'react-router';
import classes from './PlanetsSearch.module.scss';
import { useLocalStorage } from '../../common/hooks/useLocalStorage';
import { useGetPlanetsByPageQuery } from '../../sevices/planetsApi';
import { ShowDetailsContext } from '../../contexts/showDetailsContext';

const PlanetsSearch = () => {
  const [savedSearch, setSavedSearch] = useLocalStorage();
  const [searchParams, setSearchParams] = useSearchParams();

  const searchValue = searchParams.get('search') || savedSearch || '';
  const pageNumber = Number(searchParams.get('page')) || 1;

  const { isLoading, isError, isSuccess, data } = useGetPlanetsByPageQuery({
    pageNumber,
    searchValue,
  });

  const [selectedPlanetId, setSelectedPlanetId] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const value = formData.get('input') as string;

    setSearchParams({ search: value, page: '1' });
    setSavedSearch(value);
    setSelectedPlanetId(null);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <div className={classes.errorMessage}>
        An error occurred while fetching data. Please try again later.
      </div>
    );
  }

  if (isSuccess) {
    return (
      <>
        <div className={classes.SearchSection} data-theme-element="true">
          <SearchForm handleSubmit={handleSubmit} initialValue={searchValue} />
          <CreateErrorButton />
        </div>

        {data.results && data.results.length < 1 ? (
          <div className={classes.searchInfo}>
            Oops, we couldn&apos;t find anything
          </div>
        ) : (
          <>
            <Pagination thereIsNext={Boolean(data.next)} />

            <div className={classes.resultsSection}>
              <div
                style={selectedPlanetId ? { width: '70%' } : { width: '100%' }}
              >
                <ResultsList
                  planets={data.results}
                  setSelectedPlanetId={setSelectedPlanetId}
                />
              </div>

              {selectedPlanetId && (
                <div id="details" ref={ref} className={classes.details}>
                  <ShowDetailsContext.Provider value={{ setSelectedPlanetId }}>
                    <Outlet />
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
