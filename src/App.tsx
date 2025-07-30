import ErrorBoundary from './hoc/errorBoundary/ErrorBoundary';
import { Route, Routes } from 'react-router';
import ItemDetailsCard from './components/itemDetailsCard/ItemDetailsCard';
import PlanetsSearchPage from './pages/searchPage/PlanetsSearchPage';
import NotFoundPage from './pages/notFoundPage/NotFoundPage';
import AboutPage from './pages/aboutPage/AboutPage';
import { Provider } from 'react-redux';
import { store } from './store/store';

const App = () => {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<PlanetsSearchPage />}>
            <Route
              path="planets/:id"
              element={<ItemDetailsCard key={location.pathname} />}
            />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </ErrorBoundary>
    </Provider>
  );
};
export default App;
