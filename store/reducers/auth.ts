import { InitialState } from "@react-navigation/native";
import _ from "lodash";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  didTryAutoLogin: false,
  isJoined: null,
  hasUserStore: null,
  isJoinedUserHasStore: null,
  pushToken: null,
  location: null,
  userStore: null,
  userInfo: null,
  agreedStatus: null,
  ci: null,
  updatePopup: null,
  isAppUpdated: true,
  pushCnt: 0,
  wishCnt: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_WISH_CNT:
      return {
        ...state,
        wishCnt: action.wishCnt,
      };
    case actionTypes.SET_PUSH_CNT:
      return {
        ...state,
        pushCnt: action.pushCnt,
      };
    case actionTypes.SET_IS_APP_UPDATED:
      return {
        ...state,
        isAppUpdated: action.isAppUpdated,
      };
    case actionTypes.SET_UPDATE_POPUP:
      return {
        ...state,
        updatePopup: action.updatePopup,
      };
    case actionTypes.SET_DID_TRY_AL: {
      return {
        ...state,
        didTryAutoLogin: true,
      };
    }
    case actionTypes.SET_AGREED_STATUS: {
      return {
        ...state,
        agreedStatus: { ...action.agreedStatus },
      };
    }
    case actionTypes.SET_USER_INFO: {
      const result = { ...state };
      const userInfo = { ...action.userInfo };
      result.isJoined = !_.isEmpty(userInfo);
      result.isJoinedUserHasStore = result.isJoined && result.hasUserStore;
      result.userInfo = userInfo;
      return result;
    }
    case actionTypes.SET_CI:
      return {
        ...state,
        ci: action.ci,
      };
    case actionTypes.SET_PUSH_TOKEN:
      return {
        ...state,
        pushToken: action.pushToken,
      };
    case actionTypes.SET_LOCATION:
      return {
        ...state,
        location: action.location,
      };

    case actionTypes.SET_USER_STORE:
      const result = { ...state };
      const userStore = { ...action.userStore };
      result.hasUserStore = !_.isEmpty(userStore);
      result.isJoinedUserHasStore = result.isJoined && result.hasUserStore;
      result.userStore = userStore;
      return result;

    case actionTypes.WITHDRAWAL:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
