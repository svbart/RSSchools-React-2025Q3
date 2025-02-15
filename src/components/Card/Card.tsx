import { FC, SyntheticEvent } from 'react';
import classes from './Card.module.scss';
import { PlanetCharacteristics } from '../../common/types/types';
import { getIdFromUrl } from '../../common/utils/utils';
import { Link } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateSelectedItems } from '../../store/storeSlices/app-reducer';

interface ICardProps {
  planet: PlanetCharacteristics;
  setSelectedPlanetId: React.Dispatch<React.SetStateAction<number | null>>;
}

const Card: FC<ICardProps> = ({ planet, setSelectedPlanetId }) => {
  const dispatch = useAppDispatch();
  const { selectedItems } = useAppSelector((state) => state.app);
  const isSelected = selectedItems.some((item) => item.url === planet.url);

  const handleCardClick = (_event: SyntheticEvent) => {
    const id = getIdFromUrl(planet.url);
    setSelectedPlanetId(Number(id));
  };

  const handleCheckboxChange = (_event: SyntheticEvent) => {
    dispatch(updateSelectedItems(planet));
  };

  return (
    <Link
      to={`/planets/${getIdFromUrl(planet.url)}`}
      onClick={handleCardClick}
      className={classes.cardLink}
    >
      <div className={classes.cardVertical}>
        <div className={classes.cardContent}>
          <div className={classes.planetNameSelect}>
            <div className={classes.planetName}>{planet.name}</div>{' '}
            <input
              type="checkbox"
              checked={isSelected}
              onChange={handleCheckboxChange}
              className={classes.checkbox}
            />{' '}
          </div>
          <div className={classes.planetDetails}>
            <div className={classes.detailRow}>
              <span className={classes.detailLabel}>Rotation period:</span>
              <span className={classes.detailValue}>
                {planet.rotationPeriod}
              </span>
            </div>
            <div className={classes.detailRow}>
              <span className={classes.detailLabel}>Orbital period:</span>
              <span className={classes.detailValue}>
                {planet.orbitalPeriod}
              </span>
            </div>
            <div className={classes.detailRow}>
              <span className={classes.detailLabel}>Diameter:</span>
              <span className={classes.detailValue}>{planet.diameter}</span>
            </div>
            <div className={classes.detailRow}>
              <span className={classes.detailLabel}>Climate:</span>
              <span className={classes.detailValue}>{planet.climate}</span>
            </div>
            <div className={classes.detailRow}>
              <span className={classes.detailLabel}>Gravity:</span>
              <span className={classes.detailValue}>{planet.gravity}</span>
            </div>
            <div className={classes.detailRow}>
              <span className={classes.detailLabel}>Surface water:</span>
              <span className={classes.detailValue}>{planet.surfaceWater}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
