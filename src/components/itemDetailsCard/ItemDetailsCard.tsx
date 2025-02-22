// import { FC, useEffect, useState } from 'react';
// import { PlanetCharacteristics } from '../../common/types/types';
// import classes from './ItemDetailsCard.module.scss';
// import Spinner from '../../common/spinner/Spinner';
// import { useParams } from 'react-router';

// const ItemDetailsCard: FC = () => {
//   const { id } = useParams();
//   const [data, setData] = useState<PlanetCharacteristics | null>(null);
//   const [planetId, setPlanetId] = useState<number | null>(null);

//   useEffect(() => {
//     if (id) {
//       setPlanetId((prev) => (prev !== Number(id) ? Number(id) : prev));
//     }
//   }, [id]);

//   useEffect(() => {
//     if (!planetId) return;
//     setData(null);
//     const fetchData = async (id: number) => {
//       try {
//         const response = await fetch(`https://swapi.dev/api/planets/${id}/`);
//         const result = await response.json();
//         setData(result);
//       } catch (error) {
//         console.error('Error fetching planet data:', error);
//       }
//     };
//     fetchData(planetId);
//   }, [planetId]);

//   return (
//     <>
//       <>
//         <div className={classes.detailsHeader}>
//           <div>Details</div>
//         </div>
//         <div className={classes.detailsContent}>
//           {!data ? (
//             <Spinner />
//           ) : (
//             <>
//               <div>Planet: {data.name}</div>
//               <div>Population: {data.population}</div>
//               <div>Terrain: {data.terrain}</div>
//             </>
//           )}
//         </div>
//       </>
//     </>
//   );
// };

// export default ItemDetailsCard;
import { useEffect } from 'react';
import { PlanetCharacteristics } from '../../common/types/types';
import classes from './ItemDetailsCard.module.scss';
import Spinner from '../../common/spinner/Spinner';
// import { useParams } from 'react-router';
import { useGetPlanetByIdQuery } from '../../services/planetsApi';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getIdFromUrl, normalizeDataOfPlanet } from '../../common/utils/utils';
import {
  setItemToShowDetails,
  setPageNumber,
} from '../../store/storeSlices/app-reducer';
import { useTheme } from '../../contexts/ThemeContext';
import { useNavigate, useSearchParams } from 'react-router';

const ItemDetailsCard = () => {
  // const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const [data, setData] = useState<PlanetCharacteristics | null>(null);
  const { itemToShowDetails, pageNumber } = useAppSelector(
    (state) => state.app
  );
  // const [planetId, setPlanetId] = useState<number | null>(null);
  const { data, error, isLoading } = useGetPlanetByIdQuery(
    itemToShowDetails ? getIdFromUrl(itemToShowDetails.url) : 0
  );
  const [searchParams] = useSearchParams();

  const themeContext = useTheme();
  const darkMode = themeContext?.darkMode;
  const theme = darkMode ? classes.dark : classes.light;

  // const handleCloseButtonClick = () => {
  //   dispatch(setItemToShowDetails(null));
  //   navigate(`/planets/?page=${pageNumber}`);
  // };

  const handleCloseButtonClick = () => {
    dispatch(setItemToShowDetails(null));

    // Получаем `page` из URL с помощью useSearchParams
    const pageFromUrl = Number(searchParams.get('page')) || pageNumber;

    dispatch(setPageNumber(pageFromUrl)); // Обновляем номер страницы
    navigate(`/planets/?page=${pageFromUrl}`);
  };
  useEffect(() => {
    if (data) {
      const normalizedResults: PlanetCharacteristics =
        normalizeDataOfPlanet(data);
      dispatch(setItemToShowDetails(normalizedResults));
    }
  }, [data, dispatch]);

  return (
    <>
      <>
        <div className={`${classes.detailsHeader} ${theme}`}>
          <div>Details</div>
          <button onClick={handleCloseButtonClick} className={classes.closeBtn}>
            X
          </button>
        </div>
        <div className={classes.detailsContent}>
          {isLoading && <Spinner />}
          {error && (
            <div className={classes.error}>Error in details fetching</div>
          )}
          {itemToShowDetails && (
            <>
              <div>Planet: {itemToShowDetails.name}</div>
              <div>Population: {itemToShowDetails.population}</div>
              <div>Terrain: {itemToShowDetails.terrain}</div>
            </>
          )}
        </div>
      </>
    </>
  );
};

export default ItemDetailsCard;
