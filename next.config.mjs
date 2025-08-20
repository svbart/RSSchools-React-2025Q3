import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Основная конфигурация для production
  typescript: {
    ignoreBuildErrors: false, // Включаем проверку TypeScript
  },
};

export default withNextIntl(nextConfig);
