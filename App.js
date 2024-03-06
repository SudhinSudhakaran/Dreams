import React from 'react';
import {Navigators} from './src/navigators';
import {Provider} from 'react-redux';
import store, {persistor} from './src/redux/store/store';
import {PersistGate} from 'redux-persist/integration/react';
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigators.RootStack />
      </PersistGate>
    </Provider>
  );
};

export default App;
