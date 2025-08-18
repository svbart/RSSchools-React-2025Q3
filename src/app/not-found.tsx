import { NextIntlClientProvider } from 'next-intl';
import NotFoundPage from '../pages/notFoundPage/NotFoundPage';

// Import default English messages for global 404
async function getMessages() {
  return (await import('../../messages/en.json')).default;
}

export default async function GlobalNotFound() {
  const messages = await getMessages();

  return (
    <html lang="en">
      <head>
        <title>404 - Page Not Found</title>
      </head>
      <body>
        <NextIntlClientProvider locale="en" messages={messages}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100vh',
              padding: '20px',
            }}
          >
            <NotFoundPage />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
