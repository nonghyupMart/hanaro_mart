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
import { CHANGE_SHOP, WITHDRAWAL } from "../store/actions/actionTypes";
import { clearMemoTable } from "./db";

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
export const rootReducer = (state, action) => {
  if (action.type === WITHDRAWAL) {
    // for all keys defined in your persistConfig(s)
    // AsyncStorage.removeItem("persist:root");
    // storage.removeItem('persist:otherKey')
    clearMemoTable();
    state = undefined;
  } else if (action.type === CHANGE_SHOP) {
    // state.auth.userStore = null;
    state.home = undefined;
    state.flyer = undefined;
    state.event = undefined;
    state.coupon = undefined;
    state.exhibition = undefined;
    state.exclusive = undefined;
    state.wish = undefined;
  }
  return appReducer(state, action);
};

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);
