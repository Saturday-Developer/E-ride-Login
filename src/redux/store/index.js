import {createStore, applyMiddleware} from 'redux';
import RootReducer from '../reducers/index';
import thunk from 'redux-thunk';

export const MyStore = createStore(RootReducer, {}, applyMiddleware(thunk));

MyStore.subscribe(() => {
  console.log('store updated');
});
