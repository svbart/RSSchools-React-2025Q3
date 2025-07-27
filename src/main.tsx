import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import PlanetsSearchPage from './pages/searchPage/PlanetsSearchPage.tsx';
import ErrorBoundary from './hoc/errorBoundary/ErrorBoundary.tsx';
import ItemDetailsCard from './components/itemDetailsCard/ItemDetailsCard.tsx';
import NotFoundPage from './pages/notFoundPage/NotFoundPage.tsx';
import AboutPage from './pages/aboutPage/AboutPage.tsx';
import './index.css';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
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
    </BrowserRouter>
  </StrictMode>
);
