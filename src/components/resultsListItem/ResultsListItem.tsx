import { FC, SyntheticEvent } from 'react';
import classes from './ResultsListItem.module.scss';
import { PlanetCharacteristics } from '../../common/types/types';
import { getIdFromUrl } from '../../common/utils/utils';
import { Link, useSearchParams } from 'react-router';

interface ResultsListProps {
  planet: PlanetCharacteristics;
  setSelectedPlanetId: React.Dispatch<React.SetStateAction<number | null>>;
}

const ResultsListItem: FC<ResultsListProps> = ({
  planet,
  setSelectedPlanetId,
}) => {
  const [searchParams] = useSearchParams();
  const handleClick = (_event: SyntheticEvent) => {
    const id = getIdFromUrl(planet.url);
    setSelectedPlanetId(Number(id));
  };
  const id = getIdFromUrl(planet.url);
  const newSearch = `/planets/${id}/?search=${searchParams.get('search') || ''}&page=${searchParams.get('page') || '1'}`;

  return (
    <Link to={newSearch} onClick={handleClick}>
      <div className={classes.ResultsListItem}>
        <div className={classes.item}>
          <div className={classes.col1}>{planet.name}</div>
          <div className={classes.col2}>
            <div className={classes.row}>
              <div className={classes.rowCol1}>Rotation period</div>
              <div className={classes.rowCol2}>{planet.rotationPeriod}</div>
            </div>
            <div className={classes.row}>
              <div className={classes.rowCol1}>Orbital period</div>
              <div className={classes.rowCol2}>{planet.orbitalPeriod}</div>
            </div>
            <div className={classes.row}>
              <div className={classes.rowCol1}>Surface water</div>
              <div className={classes.rowCol2}>{planet.surfaceWater}</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default ResultsListItem;
