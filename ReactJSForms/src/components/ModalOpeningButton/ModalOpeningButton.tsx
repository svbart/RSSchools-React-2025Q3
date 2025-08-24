import type { FC } from 'react';
import classes from './ModalOpeningButton.module.scss';

const ModalOpeningButton: FC<{ btnName: string; onClick: () => void }> = ({
  btnName,
  onClick,
}) => {
  return (
    <button className={classes.button} onClick={onClick}>
      {btnName}
    </button>
  );
};

export default ModalOpeningButton;
