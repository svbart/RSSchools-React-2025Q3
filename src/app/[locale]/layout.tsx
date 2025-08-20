import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';
import { ReactNode } from 'react';
import ClientProviders from '../components/ClientProviders/ClientProviders';

// Отключаем кеширование для корректной работы интернационализации
export const dynamic = 'force-dynamic';

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

  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body>
        <ClientProviders key={locale} messages={messages} locale={locale}>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
