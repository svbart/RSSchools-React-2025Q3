import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locale || !routing.locales.includes(locale as 'en' | 'ru')) {
    const defaultMessages = (
      await import(`../../messages/${routing.defaultLocale}.json`)
    ).default;
    return {
      locale: routing.defaultLocale,
      messages: defaultMessages,
    };
  }

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
});
