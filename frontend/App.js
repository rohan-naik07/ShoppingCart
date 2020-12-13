import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet} from 'react-native';
import {combineReducers,createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import productReducer from './store/reducers/product';
import cartReducer from './store/reducers/cart';
import orderReducer from './store/reducers/orders'
import authReducer from './store/reducers/auth'
import NavigationContainer from './navigation/NavigationContainer' // do not use curly brackets if single module is exported 
import ReduxThunk from 'redux-thunk';

const rootReducer = combineReducers({
  products : productReducer,
  cart : cartReducer,
  orders : orderReducer,
  auth : authReducer
});

const store = createStore(
  rootReducer,
  applyMiddleware(ReduxThunk)
  );

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer/>
    </Provider>
  );
}
