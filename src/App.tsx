import { Component } from 'react';
import Layout from './hoc/layout/Layout';
import PlanetsSearch from './containers/planetsSearch/PlanetsSearch';
import classes from './App.module.scss';
import ErrorBoundary from './hoc/errorBoundary/ErrorBoundary';

export default class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <Layout>
          <h1 className={classes.header}>Star Wars Planets</h1>
          <PlanetsSearch />
        </Layout>
      </ErrorBoundary>
    );
  }
}
