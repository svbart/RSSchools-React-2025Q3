import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Основная конфигурация для production
  typescript: {
    ignoreBuildErrors: false, // Включаем проверку TypeScript
  },
  
  // Для статического экспорта
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
