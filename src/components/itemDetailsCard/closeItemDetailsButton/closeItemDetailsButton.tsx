import { FC, useContext } from 'react';
import classes from './CloseItemDetailsButton.module.scss';
import {
  IShowDetailsContext,
  ShowDetailsContext,
} from '../../../contexts/showDetailsContext';

interface CloseItemDetailsButtonProps {
  setPlanetId: (id: number | null) => void;
  className?: string;
}

const CloseItemDetailsButton: FC<CloseItemDetailsButtonProps> = () => {
  const context: IShowDetailsContext | null = useContext(ShowDetailsContext);

  const handleClose = () => {
    if (context) {
      context.setSelectedPlanetId(null);
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
