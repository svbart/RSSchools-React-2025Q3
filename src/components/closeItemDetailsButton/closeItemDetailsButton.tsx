'use client';

import { useContext } from 'react';
import classes from './closeItemDetailsButton.module.scss';
import {
  IShowDetailsContext,
  ShowDetailsContext,
} from '../../contexts/showDetailsContext';

const CloseItemDetailsButton = () => {
  const context: IShowDetailsContext | null = useContext(ShowDetailsContext);

  const handleClose = () => {
    if (context && context.setSelectedPlanetId) {
      context.setSelectedPlanetId();
    }
  };

  return (
    <button
      className={`${classes.closeButton}`}
      onClick={handleClose}
      type="button"
      aria-label="Close details"
      title="Close details"
    >
      <span className={classes.closeIcon}>×</span>
    </button>
  );
};

export default CloseItemDetailsButton;
