import { FC, useEffect, useState } from 'react';
import { PlanetCharacteristics } from '../../common/types/types';
import classes from './ItemDetailsCard.module.scss';
import Spinner from '../../common/spinner/Spinner';
import { useParams } from 'react-router';
import CloseItemDetailsButton from '../closeItemDetailsButton/closeItemDetailsButton';

const ItemDetailsCard: FC = () => {
  const { id } = useParams();
  const [data, setData] = useState<PlanetCharacteristics | null>(null);

  useEffect(() => {
    if (!id) return;
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
    fetchData(Number(id));
  }, [id]);

  return (
    <>
      <div className={classes.details} data-theme-element="true">
        <div className={classes.detailsHeader} data-theme-element="true">
          Details <CloseItemDetailsButton />
        </div>
      </div>
      <div className={classes.detailsContent} data-theme-element="true">
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
