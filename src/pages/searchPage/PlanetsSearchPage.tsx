import Navigation from '../../components/navigation/Navigation';
import PlanetsSearch from '../../containers/planetsSearch/PlanetsSearch';
import Layout from '../../hoc/layout/Layout';
import classes from './PlanetsSearchPage.module.scss';

const PlanetsSearchPage = () => {
  return (
    <Layout>
      <Navigation />
      <h1 className={classes.header}>Star Wars Planets</h1>
      <PlanetsSearch />
    </Layout>
  );
};

export default PlanetsSearchPage;
