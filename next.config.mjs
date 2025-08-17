// /** @type {import('next').NextConfig} */

// const nextConfig = {
//   output: 'export', // Outputs a Single-Page Application (SPA).
//   distDir: './dist', // Changes the build output directory to `./dist/`.
//   basePath: process.env.NEXT_PUBLIC_BASE_PATH, // Sets the base path to `/some-base-path`.
// }

// export default nextConfig
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
  // Включаем статический экспорт только для production
  // ...(process.env.NODE_ENV === 'production' && {
  //   output: 'export',
  //   distDir: './dist',
  //   basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  // }),
};

export default nextConfig;
