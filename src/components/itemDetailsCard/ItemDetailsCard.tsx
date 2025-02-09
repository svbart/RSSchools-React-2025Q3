import { FC, useEffect, useState } from 'react';
import { PlanetCharacteristics } from '../../common/types/types';
import classes from './ItemDetailsCard.module.scss';
import { getIdFromUrl } from '../../common/utils/utils';
import { useLocation } from 'react-router';
import Spinner from '../../common/spinner/Spinner';

const ItemDetailsCard: FC = () => {
  const [data, setData] = useState<PlanetCharacteristics | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const location: any = useLocation();
  console.log('location', location);
  const [planetId, setPlanetId] = useState<number | null>(null);

  useEffect(() => {
    if (typeof location.pathname === 'string') {
      const id = Number(getIdFromUrl(location.pathname));
      setPlanetId((prev) => (prev !== id ? id : prev));
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!planetId) return;
    setData(null);
    const fetchData = async (id: number) => {
      const response = await fetch(`https://swapi.dev/api/planets/${id}/`);
      const result = await response.json();
      setData(result);
    };
    if (planetId) {
      fetchData(planetId);
    }
  }, [planetId]);

  return (
    <>
      <>
        <div className={classes.detailsHeader}>
          <div>Details</div>
        </div>
        <div className={classes.detailsContent}>
          {!data ? (
            <Spinner />
          ) : (
            <>
              <div>Planet: {data.name}</div>
              <div>Population: {data.population}</div>
              <div>Terrain: {data.terrain}</div>
            </>
          )}
        </div>
      </>
    </>
  );
};

export default ItemDetailsCard;
