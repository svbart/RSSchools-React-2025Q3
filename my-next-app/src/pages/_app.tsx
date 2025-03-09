import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '@/src/store/store';
import Layout from '../hoc/layout/Layout';
import ErrorBoundary from '../hoc/errorBoundary/ErrorBoundary';
import ThemeProvider from '../hoc/ThemeProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ErrorBoundary>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  );
}
