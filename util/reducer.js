import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk from "redux-thunk";

import authReducer from "../store/reducers/auth";
import branchesReducer from "../store/reducers/branches";
import homeReducer from "../store/reducers/home";
import flyerReducer from "../store/reducers/flyer";
import eventReducer from "../store/reducers/event";
import couponReducer from "../store/reducers/coupon";
import commonReducer from "../store/reducers/common";
import exhibitionReducer from "../store/reducers/exhibition";
import exclusiveReducer from "../store/reducers/exclusive";
import memoReducer from "../store/reducers/memo";
import wishReducer from "../store/reducers/wish";
import { WITHDRAWAL } from "../store/actions/auth";

const appReducer = combineReducers({
  auth: authReducer,
  branches: branchesReducer,
  home: homeReducer,
  flyer: flyerReducer,
  event: eventReducer,
  coupon: couponReducer,
  common: commonReducer,
  exhibition: exhibitionReducer,
  exclusive: exclusiveReducer,
  wish: wishReducer,
  memo: memoReducer,
});
const rootReducer = (state, action) => {
  if (action.type === WITHDRAWAL) {
    // for all keys defined in your persistConfig(s)
    // AsyncStorage.removeItem("persist:root");
    // storage.removeItem('persist:otherKey')

    state = undefined;
  }
  return appReducer(state, action);
};

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);
