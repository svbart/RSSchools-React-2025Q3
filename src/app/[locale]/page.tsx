'use client';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../../contexts/themeContext';
import PlanetsSearchPage from '../../pages/searchPage/PlanetsSearchPage';
import { store } from '../../store/store';
import AboutPage from './AboutPage';
import NotFoundPage from './NotFoundPage';
import { use } from 'react';

interface PageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

export default function CatchAllPage({ params }: PageProps) {
  const { slug } = use(params);

  // Корневая страница "/" - slug будет undefined
  if (!slug || slug.length === 0) {
    return (
      <Provider store={store}>
        <ThemeProvider>
          {/* <ErrorBoundary> */}
          <PlanetsSearchPage />
          {/* </ErrorBoundary> */}
        </ThemeProvider>
      </Provider>
    );
  }

  // Другие маршруты "/search", "/about" и т.д.
  const currentPath = slug.join('/');

  switch (currentPath) {
    case 'search':
      return <PlanetsSearchPage />;
    case 'about':
      return <AboutPage />;
    default:
      return <NotFoundPage />;
  }
}
