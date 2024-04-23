import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import store from './store'; // Import your Redux store

import { AppNavigator } from './AppNavigator';

function App() {

  return(
  <Provider store={store}>

    <AppNavigator />
 </Provider>
)
}

export default App;
