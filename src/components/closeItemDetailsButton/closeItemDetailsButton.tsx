import { useContext } from 'react';
import classes from './CloseItemDetailsButton.module.scss';
import {
  IShowDetailsContext,
  ShowDetailsContext,
} from '../../contexts/showDetailsContext';
import { useNavigate, useSearchParams } from 'react-router';

const CloseItemDetailsButton = () => {
  const context: IShowDetailsContext | null = useContext(ShowDetailsContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleClose = () => {
    if (context) {
      context.setSelectedPlanetId(null);
      navigate(
        `/?search=${searchParams.get('search') || ''}&page=${searchParams.get('page') || '1'}`
      );
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
