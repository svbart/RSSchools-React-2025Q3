'use client';

import { SyntheticEvent, useRef, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import ResultsList from '../../components/resultsList/ResultsList';
import SearchForm from '../../components/searchForm/SearchForm';
import CreateErrorButton from '../../components/createErrorButton/CreateErrorButton';
import Pagination from '../../components/pagination/Pagination';
import { useLocalStorage } from '../../common/hooks/useLocalStorage';
import { ShowDetailsContext } from '../../contexts/showDetailsContext';
import { PlanetCharacteristics } from '../../common/types/types';
import classes from './PlanetsSearch.module.scss';

// Динамический импорт для ItemDetailsCard
const ItemDetailsCard = dynamic(
  () => import('../../components/itemDetailsCard/ItemDetailsCard'),
  { ssr: false }
);

interface PlanetsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PlanetCharacteristics[];
}

interface PlanetsSearchProps {
  initialData: PlanetsResponse;
  initialPage: number;
  initialSearch: string;
}

const PlanetsSearch = ({
  initialData,
  initialPage,
  initialSearch,
}: PlanetsSearchProps) => {
  const t = useTranslations('search');
  const router = useRouter();
  const [savedSearch, setSavedSearch] = useLocalStorage(`savedSearch`, '');
  const searchParams = useSearchParams();

  // Используем данные напрямую из пропсов, а не из useState
  const data = initialData;
  const [error] = useState<string | null>(null);

  const searchValue = searchParams?.get('search') || savedSearch || '';
  const pageNumber = Number(searchParams?.get('page')) || initialPage;
  const planetIdFromUrl = searchParams?.get('planetId');

  const [selectedPlanetId, setSelectedPlanetId] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);

  // Инициализация выбранной планеты из URL
  useEffect(() => {
    if (planetIdFromUrl && !selectedPlanetId) {
      setSelectedPlanetId(Number(planetIdFromUrl));
    }
  }, [planetIdFromUrl, selectedPlanetId]);

  // Обновление данных при изменении URL параметров
  useEffect(() => {
    if (pageNumber !== initialPage || searchValue !== initialSearch) {
      // Next.js автоматически перезагрузит серверный компонент
    }
  }, [pageNumber, searchValue, initialPage, initialSearch]);

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
    // Перезагружаем страницу для получения свежих данных
    router.refresh();
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

  if (error) {
    return (
      <div className={classes.errorMessage}>
        {t('error')}: {error}
      </div>
    );
  }

  return (
    <>
      <div className={classes.SearchSection} data-theme-element="true">
        <SearchForm handleSubmit={handleSubmit} initialValue={searchValue} />
        <CreateErrorButton />
        <button data-testid="refetch-btn" onClick={onRefreshButtonClick}>
          Refresh
        </button>
      </div>

      {data.results && data.results.length < 1 ? (
        <div className={classes.searchInfo}>{t('noResults')}</div>
      ) : (
        <>
          <Pagination thereIsNext={Boolean(data.next)} />

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
};

export default PlanetsSearch;
