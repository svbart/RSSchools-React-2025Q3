import { SyntheticEvent, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import classes from './CreateErrorButton.module.scss';

const CreateErrorButton = () => {
  const t = useTranslations('actions');
  const [hasError, setHasError] = useState<boolean>(false);

  const handelClick = (_event: SyntheticEvent) => {
    setHasError(true);
  };

  useEffect(() => {
    if (hasError) {
      throw new Error('An error occurred');
    }
  }, [hasError]);

  return (
    <button onClick={handelClick} className={classes.errorButton}>
      {t('throwError')}
    </button>
  );
};
export default CreateErrorButton;
