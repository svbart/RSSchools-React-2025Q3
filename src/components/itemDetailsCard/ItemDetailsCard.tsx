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
import Spinner from '../../common/spinner/Spinner';
import CloseItemDetailsButton from '../closeItemDetailsButton/closeItemDetailsButton';
import {
  ExtendedFetchBaseQueryError,
  useGetPlanetByIdQuery,
} from '../../services/planetsApi';
import classes from './ItemDetailsCard.module.scss';

interface ItemDetailsCardProps {
  planetId: number;
}

const ItemDetailsCard = ({ planetId }: ItemDetailsCardProps) => {
  const t = useTranslations('planet');
  const { isLoading, isError, error, isFetching, data } =
    useGetPlanetByIdQuery(planetId);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <div role="alert" className={classes.errorMessage}>
        {(error as ExtendedFetchBaseQueryError).message} occurred while fetching
        data
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
        {isFetching && <div className={classes.fetching}>Fetching...</div>}
        {!isFetching && data ? (
          <>
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
          </>
        ) : (
          !isFetching && <Spinner />
        )}
      </div>
    </>
  );
};

export default ItemDetailsCard;
