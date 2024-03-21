import React from 'react';
import Root from './pages/Root';
import store from './redux/store';
import { Provider } from 'react-redux'

const App = () => {


  return (
    <Provider store={store}>
      <Root></Root>
    </Provider>




  );
};

export default App;
