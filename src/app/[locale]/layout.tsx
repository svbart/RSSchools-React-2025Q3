import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { ThemeProvider } from '../../contexts/themeProvider';
import Layout from '../../hoc/layout/Layout';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Provider store={store}>
            <ThemeProvider>
              <ErrorBoundary>
                <Layout>{children}</Layout>
              </ErrorBoundary>
            </ThemeProvider>
          </Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
