'use client';

import { NextIntlClientProvider } from 'next-intl';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { ThemeProvider } from '../../contexts/themeProvider';
import Layout from '../../hoc/layout/Layout';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  messages: Record<string, unknown>;
  locale: string;
};

export default function ClientProviders({ children, messages, locale }: Props) {
  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <Provider store={store}>
        <ThemeProvider>
          <ErrorBoundary>
            <Layout>{children}</Layout>
          </ErrorBoundary>
        </ThemeProvider>
      </Provider>
    </NextIntlClientProvider>
  );
}
