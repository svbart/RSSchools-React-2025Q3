import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Конфигурация для RSC с интернационализацией
  experimental: {
    serverComponentsExternalPackages: ['redux', '@reduxjs/toolkit'],
  },
  images: {
    domains: ['example.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // ✅ Оставьте только для production статики (если нужно)
  ...(process.env.DEPLOY_TARGET === 'static' && {
    output: 'export',
    distDir: './dist',
    trailingSlash: true,
    images: {
      unoptimized: true, // Требуется для статического экспорта
    },
  }),
};

export default withNextIntl(nextConfig);
