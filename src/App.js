import { Provider } from 'react-redux';
import AppStore from './utils/AppStore';
import './App.css';
import Body from './components/Body';

function App() {
  return (
   <div>
    <Provider store={AppStore}>
    <Body/>
    </Provider>
   </div>
  );
}

export default App;