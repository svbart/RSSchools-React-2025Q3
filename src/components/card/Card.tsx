import { MouseEvent, FC, SyntheticEvent } from 'react';
import { PlanetCharacteristics } from '../../common/types/types';
import { getIdFromUrl } from '../../common/utils/utils';
import { Link, useSearchParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateSelectedItems } from '../../store/storeSlices/app-reducer';
import classes from './Card.module.scss';

interface ResultsListProps {
  planet: PlanetCharacteristics;
  setSelectedPlanetId: React.Dispatch<React.SetStateAction<number | null>>;
}

const Card: FC<ResultsListProps> = ({ planet, setSelectedPlanetId }) => {
  const id = getIdFromUrl(planet.url);
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { selectedItems } = useAppSelector((state) => state.app);
  const isSelected = selectedItems.some((item) => item.url === planet.url);

  const handleClick = (_event: SyntheticEvent) => {
    setSelectedPlanetId(Number(id));
  };
  const newSearch = `/planets/${id}/?search=${searchParams.get('search') || ''}&page=${searchParams.get('page')}`;

  const handleCheckboxChange = (event: MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();
    dispatch(updateSelectedItems(planet));
  };

  return (
    <Link
      to={newSearch}
      className={`${classes.cardLink}`}
      onClick={handleClick}
    >
      <div className={`${classes.cardVertical}`} data-theme-element="true">
        <div className={classes.cardContent}>
          <div className={classes.planetNameSelect}>
            <div className={classes.planetName}>{planet.name}</div>
            <label>
              <input
                type="checkbox"
                checked={isSelected}
                onClick={handleCheckboxChange}
                className={classes.checkbox}
              />
            </label>
          </div>
          <div className={classes.planetDetails}>
            <div className={classes.detailRow}>
              <span className={classes.detailLabel}>Orbital period:</span>
              <span className={classes.detailValue}>
                {planet.orbitalPeriod}
              </span>
            </div>
            <div className={classes.detailRow}>
              <span className={classes.detailLabel}>Rotation period:</span>
              <span className={classes.detailValue}>
                {planet.rotationPeriod}
              </span>
            </div>
            <div className={classes.detailRow}>
              <span className={classes.detailLabel}>Surface Water:</span>
              <span className={classes.detailValue}>{planet.surfaceWater}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default Card;
