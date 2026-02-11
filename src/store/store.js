import {createStore} from 'redux';
import reducer from './reducer';
//import { applyMiddleware } from 'redux';

// export const loggerMiddleware = (store) => (next) => (action) => {
//   console.log("----- REDUX ACTION -----");
//   console.log("Prev state:", store.getState());
//   console.log("Action:", action);

//   const result = next(action);

//   console.log("Next state:", store.getState());
//   console.log("------------------------");

//   return result;
// };

const store = createStore(reducer);

export default store;