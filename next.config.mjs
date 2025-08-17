// /** @type {import('next').NextConfig} */

// const nextConfig = {
//   output: 'export', // Outputs a Single-Page Application (SPA).
//   distDir: './dist', // Changes the build output directory to `./dist/`.
//   basePath: process.env.NEXT_PUBLIC_BASE_PATH, // Sets the base path to `/some-base-path`.
// }

// export default nextConfig
/** @type {import('next').NextConfig} */

const nextConfig = {
  // Включаем статический экспорт только для production
  ...(process.env.NODE_ENV === 'production' && {
    output: 'export',
    distDir: './dist',
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  }),
};

export default nextConfig;
