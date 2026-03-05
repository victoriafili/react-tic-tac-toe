import {createStore, applyMiddleware} from 'redux';
import reducer from './reducer';
import { loadState, savedState } from "./persist";
import { broadcastMiddleware }  from './broadcastMiddleware';

const persistedState = loadState();

const store = createStore(
  reducer,
  persistedState,                  // <-- preloaded state
  applyMiddleware(broadcastMiddleware)  // <-- middleware
);

store.subscribe(() => {
    savedState(store.getState());
});


export default store;