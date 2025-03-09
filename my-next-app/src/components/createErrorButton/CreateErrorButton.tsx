import { SyntheticEvent, useState } from 'react';
import styles from './CreateErrorButton.module.scss';

const CreateErrorButton = () => {
  const [hasError, setHasError] = useState<boolean>(false);
  if (hasError) {
    throw new Error('An error occurred');
  }

  const handelClick = (_event: SyntheticEvent) => {
    setHasError(true);
  };

  // useEffect(() => {
  //   if (hasError) {
  //     throw new Error('An error occurred');
  //   }
  // }, [hasError]);

  return (
    <button onClick={handelClick} className={styles.errorButton}>
      Throw Error!
    </button>
  );
};
export default CreateErrorButton;
