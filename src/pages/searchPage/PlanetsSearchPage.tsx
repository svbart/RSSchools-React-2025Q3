'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import classes from './PlanetsSearchPage.module.scss';
import PlanetsSearch from '../../containers/planetsSearch/PlanetsSearch';
import { PlanetCharacteristics } from '../../common/types/types';
import Spinner from '../../common/spinner/Spinner';

interface PlanetsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PlanetCharacteristics[];
}

// Временная функция для получения данных (для старого роутера)
async function fetchInitialData(): Promise<PlanetsResponse> {
  try {
    const response = await fetch('https://swapi.py4e.com/api/planets/?page=1');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    return {
      count: data.count,
      next: data.next,
      previous: data.previous,
      results: data.results || [],
    };
  } catch (error) {
    console.error('Error fetching initial data:', error);
    return {
      count: 0,
      next: null,
      previous: null,
      results: [],
    };
  }
}

const PlanetsSearchPage = () => {
  const t = useTranslations('search');
  const [initialData, setInitialData] = useState<PlanetsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchInitialData();
        setInitialData(data);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading || !initialData) {
    return (
      <div>
        <h1 className={classes.header}>{t('title')}</h1>
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <h1 className={classes.header}>{t('title')}</h1>
      <PlanetsSearch
        initialData={initialData}
        initialPage={1}
        initialSearch=""
      />
    </div>
  );
};

export default PlanetsSearchPage;
