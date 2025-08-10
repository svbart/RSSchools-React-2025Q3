import Spinner from '../../common/spinner/Spinner';
import { useParams } from 'react-router';
import CloseItemDetailsButton from '../closeItemDetailsButton/closeItemDetailsButton';
import { useGetPlanetByIdQuery } from '../../services/planetsApi';
import classes from './ItemDetailsCard.module.scss';

const ItemDetailsCard = () => {
  const id = useParams<{ id: string }>().id;
  const planetId = id ? Number(id) : 0;
  const { isLoading, isFetching, data } = useGetPlanetByIdQuery(planetId);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className={classes.details} data-theme-element="true">
        <div className={classes.detailsHeader} data-theme-element="true">
          Details <CloseItemDetailsButton />
        </div>
      </div>
      <div className={classes.detailsContent} data-theme-element="true">
        {isFetching && (
          <>
            <div className={classes.fetching}>Fetching...</div>
          </>
        )}
        {!isFetching && data ? (
          <>
            <div>Planet: {data.name}</div>
            <div>Population: {data.population}</div>
            <div>Terrain: {data.terrain}</div>
            <div>Climate: {data.climate}</div>
            <div>Gravity: {data.gravity}</div>
            <div>Diameter: {data.diameter}</div>
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
};

export default ItemDetailsCard;
