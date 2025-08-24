import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { store } from './store/store';
import './index.css';
import { Provider } from 'react-redux';

const container = document.getElementById('root');
console.log('container', container);

if (!container) {
  console.log('Root element not found');
  throw new Error('Root element not found');
}
createRoot(container).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
