import {
  legacy_createStore,
  combineReducers,
  compose,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { AuthReducer } from "./auth/reducer";
import { CartReducer } from "./cart/reducer";
import { ProductReducer } from "./products/reducer";

const root_reducer = combineReducers({
  productsManager: ProductReducer,
  authManager: AuthReducer,
  cartManager: CartReducer,
});

//   const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
const composeEnhancers = compose;

export const store = legacy_createStore(
  root_reducer,
  composeEnhancers(applyMiddleware(thunk))
);
