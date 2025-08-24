import { Provider } from 'react-redux';
import './App.css';
import Layout from './hoc/layout/Layout';
import MainPage from './pages/main/MainPage';
import { store } from './store/store';

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <MainPage />
      </Layout>
    </Provider>
  );
}

export default App;
