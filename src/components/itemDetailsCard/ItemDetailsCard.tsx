import { FC, useEffect, useState } from 'react';
import { PlanetCharacteristics } from '../../common/types/types';
import classes from './ItemDetailsCard.module.scss';
import Spinner from '../../common/spinner/Spinner';
import { useParams } from 'react-router';
import CloseItemDetailsButton from './closeItemDetailsButton/closeItemDetailsButton';

const ItemDetailsCard: FC = () => {
  const { id } = useParams();
  const [data, setData] = useState<PlanetCharacteristics | null>(null);
  const [planetId, setPlanetId] = useState<number | null>(null);

  useEffect(() => {
    if (id) {
      setPlanetId((prev) => (prev !== Number(id) ? Number(id) : prev));
    }
  }, [id]);

  useEffect(() => {
    if (!planetId) return;
    setData(null);
    const fetchData = async (id: number) => {
      try {
        const response = await fetch(
          `https://swapi.py4e.com/api/planets/${id}/`
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching planet data:', error);
      }
    };
    fetchData(planetId);
  }, [planetId]);

  return (
    <>
      <div className={classes.details}>
        <div className={classes.detailsHeader}>
          Details <CloseItemDetailsButton setPlanetId={setPlanetId} />
        </div>
      </div>
      <div className={classes.detailsContent}>
        {!data ? (
          <Spinner />
        ) : (
          <>
            <div>Planet: {data.name}</div>
            <div>Population: {data.population}</div>
            <div>Terrain: {data.terrain}</div>
            <div>Climate: {data.climate}</div>
            <div>Gravity: {data.gravity}</div>
            <div>Diameter: {data.diameter}</div>
          </>
        )}
      </div>
    </>
  );
};

export default ItemDetailsCard;
