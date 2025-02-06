import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {Provider} from 'react-redux';
import store from './src/store/store';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </>
  );
}

export default App;
