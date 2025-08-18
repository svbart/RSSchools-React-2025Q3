// // import { Metadata } from 'next';
// import { ReactNode } from 'react';
// import { Provider } from 'react-redux';
// import { store } from '../store/store';
// import { ThemeProvider } from '../contexts/themeProvider';
// import Layout from '../hoc/layout/Layout';

// // interface RootLayoutProps {
// //   children: ReactNode | ReactNode[];
// // }
// // export const metadata: Metadata = {
// //   title: 'React + TS + Next.js',
// //   description: 'My App is a...',
// // };

// export default function RootLayout({ children }: { children: ReactNode }) {
//   return (
//     <html lang="en">
//       <head>
//         {/* <link rel="icon" type="image/svg+xml" href="/vite.svg" /> */}
//         {/* <title>Vite + React + TS + Next.js</title>
//         <meta name="description" content="My App is a..." /> */}
//       </head>
//       <body>
//         <Provider store={store}>
//           <ThemeProvider>
//             {/* <ErrorBoundary fallback={<ErrorBoundaryFallback />}> */}
//             <Layout>{children}</Layout>
//             {/* </ErrorBoundary> */}
//           </ThemeProvider>
//         </Provider>
//       </body>
//     </html>
//   );
// }
import { ReactNode } from 'react';
import '../index.scss';

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
