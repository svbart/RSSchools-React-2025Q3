import Flyout from '@/src/components/flyout/Flyout';
import PlanetsSearch from '@/src/components/planetsSearch/PlanetsSearch';
import ThemeBtn from '@/src/components/themeBtn/ThemeBtn';
import styles from '@/src/components/planetsSearchPage/PlanetsSearchPage.module.scss';

const PlanetsSearchPage = () => {
  return (
    <>
      <h1 className={styles.header}>Star Wars Planets</h1>
      <ThemeBtn />
      <PlanetsSearch />
      <Flyout />
    </>
  );
};

export default PlanetsSearchPage;
