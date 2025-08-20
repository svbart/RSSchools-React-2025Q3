'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import Spinner from '../../common/spinner/Spinner';
import CloseItemDetailsButton from '../closeItemDetailsButton/closeItemDetailsButton';
import { PlanetCharacteristics } from '../../common/types/types';
import classes from './ItemDetailsCard.module.scss';

interface ItemDetailsCardProps {
  planetId: number;
}

const ItemDetailsCard = ({ planetId }: ItemDetailsCardProps) => {
  const t = useTranslations('planet');
  const [data, setData] = useState<PlanetCharacteristics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadPlanet = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Используем API route вместо прямого запроса к SWAPI
        const response = await fetch(`/api/planets/${planetId}`);

        if (!response.ok) {
          if (response.status === 404) {
            setData(null);
            return;
          }
          throw new Error(`Failed to fetch planet: ${response.status}`);
        }

        const planetData = await response.json();

        if (!cancelled) {
          setData(planetData);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : 'Failed to load planet'
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadPlanet();

    return () => {
      cancelled = true;
    };
  }, [planetId]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div role="alert" className={classes.errorMessage}>
        {error}
      </div>
    );
  }

  if (!data) {
    return (
      <div role="alert" className={classes.errorMessage}>
        Planet not found
      </div>
    );
  }

  return (
    <>
      <div className={classes.details} data-theme-element="true">
        <div className={classes.detailsHeader} data-theme-element="true">
          Details <CloseItemDetailsButton />
        </div>
      </div>
      <div className={classes.detailsContent} data-theme-element="true">
        <div>
          {t('name')}: {data.name}
        </div>
        <div>
          {t('population')}: {data.population}
        </div>
        <div>
          {t('terrain')}: {data.terrain}
        </div>
        <div>
          {t('climate')}: {data.climate}
        </div>
        <div>
          {t('gravity')}: {data.gravity}
        </div>
        <div>
          {t('diameter')}: {data.diameter}
        </div>
      </div>
    </>
  );
};

export default ItemDetailsCard;
