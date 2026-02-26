import {createStore} from 'redux';
import reducer from './reducer';
import { loadState, savedState } from "./persist";

const persistedState = loadState();

const store = createStore(reducer, persistedState);

store.subscribe(() => {
    savedState(store.getState());
});


export default store;