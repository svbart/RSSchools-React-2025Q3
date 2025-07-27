import ErrorBoundary from './hoc/errorBoundary/ErrorBoundary';
import { Route, Routes } from 'react-router';
import ItemDetailsCard from './components/itemDetailsCard/ItemDetailsCard';
import PlanetsSearchPage from './pages/searchPage/PlanetsSearchPage';
import NotFoundPage from './pages/notFoundPage/NotFoundPage';
import AboutPage from './pages/aboutPage/AboutPage';

const App = () => {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<PlanetsSearchPage />}>
          e
          <Route
            path="planets/:id"
            element={<ItemDetailsCard key={location.pathname} />}
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </ErrorBoundary>
  );
};
export default App;
