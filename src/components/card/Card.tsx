'use client';

import { MouseEvent, FC, SyntheticEvent } from 'react';
import { PlanetCharacteristics } from '../../common/types/types';
import { getIdFromUrl } from '../../common/utils/utils';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateSelectedItems } from '../../store/storeSlices/app-reducer';
import classes from './Card.module.scss';

interface CardProps {
  planet: PlanetCharacteristics;
  handlePlanetSelect: (planetId: number) => void;
}

const Card: FC<CardProps> = ({ planet, handlePlanetSelect }) => {
  const id = getIdFromUrl(planet.url);
  const dispatch = useAppDispatch();
  const { selectedItems } = useAppSelector((state) => state.app);
  const isSelected = selectedItems.some((item) => item.url === planet.url);

  const handleClick = (event: SyntheticEvent) => {
    event.preventDefault();
    handlePlanetSelect(Number(id));
  };

  const handleCheckboxChange = (event: MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();
    dispatch(updateSelectedItems(planet));
  };

  return (
    <div
      className={`${classes.cardVertical} ${classes.cardLink}`}
      data-theme-element="true"
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
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
            <span className={classes.detailValue}>{planet.orbitalPeriod}</span>
          </div>
          <div className={classes.detailRow}>
            <span className={classes.detailLabel}>Rotation period:</span>
            <span className={classes.detailValue}>{planet.rotationPeriod}</span>
          </div>
          <div className={classes.detailRow}>
            <span className={classes.detailLabel}>Surface Water:</span>
            <span className={classes.detailValue}>{planet.surfaceWater}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
