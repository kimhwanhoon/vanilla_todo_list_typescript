import { Provider } from 'react-redux';
import './App.css';
import Router from './shared/Router';
import { store } from './redux/config/configStore';

const App: React.FC = (): JSX.Element => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;
