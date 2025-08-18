// import Spinner from '../../common/spinner/Spinner';
// import { useParams } from 'react-router';
// import CloseItemDetailsButton from '../closeItemDetailsButton/closeItemDetailsButton';
// import {
//   ExtendedFetchBaseQueryError,
//   useGetPlanetByIdQuery,
// } from '../../services/planetsApi';
// import classes from './ItemDetailsCard.module.scss';

// const ItemDetailsCard = () => {
//   const id = useParams<{ id: string }>().id;
//   const planetId = id ? Number(id) : 0;
//   const { isLoading, isError, error, isFetching, data } =
//     useGetPlanetByIdQuery(planetId);

//   if (isLoading) {
//     return <Spinner />;
//   }
//   if (isError) {
//     return (
//       <div role="alert" className={classes.errorMessage}>
//         {(error as ExtendedFetchBaseQueryError).message} occurred while fetching
//         data
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className={classes.details} data-theme-element="true">
//         <div className={classes.detailsHeader} data-theme-element="true">
//           Details <CloseItemDetailsButton />
//         </div>
//       </div>
//       <div className={classes.detailsContent} data-theme-element="true">
//         {isFetching && (
//           <>
//             <div className={classes.fetching}>Fetching...</div>
//           </>
//         )}
//         {!isFetching && data ? (
//           <>
//             <div>Planet: {data.name}</div>
//             <div>Population: {data.population}</div>
//             <div>Terrain: {data.terrain}</div>
//             <div>Climate: {data.climate}</div>
//             <div>Gravity: {data.gravity}</div>
//             <div>Diameter: {data.diameter}</div>
//           </>
//         ) : (
//           <Spinner />
//         )}
//       </div>
//     </>
//   );
// };

// export default ItemDetailsCard;
// import Spinner from '../../common/spinner/Spinner';
// import { useParams } from 'react-router';
// import CloseItemDetailsButton from '../closeItemDetailsButton/closeItemDetailsButton';
// import {
//   ExtendedFetchBaseQueryError,
//   useGetPlanetByIdQuery,
// } from '../../services/planetsApi';
// import classes from './ItemDetailsCard.module.scss';

// const ItemDetailsCard = () => {
//   const id = useParams<{ id: string }>().id;
//   const planetId = id ? Number(id) : 0;
//   const { isLoading, isError, error, isFetching, data } =
//     useGetPlanetByIdQuery(planetId);

//   if (isLoading) {
//     return <Spinner />;
//   }
//   if (isError) {
//     return (
//       <div role="alert" className={classes.errorMessage}>
//         {(error as ExtendedFetchBaseQueryError).message} occurred while fetching
//         data
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className={classes.details} data-theme-element="true">
//         <div className={classes.detailsHeader} data-theme-element="true">
//           Details <CloseItemDetailsButton />
//         </div>
//       </div>
//       <div className={classes.detailsContent} data-theme-element="true">
//         {isFetching && (
//           <>
//             <div className={classes.fetching}>Fetching...</div>
//           </>
//         )}
//         {!isFetching && data ? (
//           <>
//             <div>Planet: {data.name}</div>
//             <div>Population: {data.population}</div>
//             <div>Terrain: {data.terrain}</div>
//             <div>Climate: {data.climate}</div>
//             <div>Gravity: {data.gravity}</div>
//             <div>Diameter: {data.diameter}</div>
//           </>
//         ) : (
//           <Spinner />
//         )}
//       </div>
//     </>
//   );
// };

// export default ItemDetailsCard;
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

// Клиентская функция для получения данных о планете
async function fetchPlanetData(
  planetId: number
): Promise<PlanetCharacteristics | null> {
  try {
    const response = await fetch(`/api/planets/${planetId}`);
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch planet: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching planet:', error);
    throw error;
  }
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
        const planetData = await fetchPlanetData(planetId);

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
        {error} occurred while fetching data
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
