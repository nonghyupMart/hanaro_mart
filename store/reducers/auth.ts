import _ from "lodash";
import { Popup } from "../../models/Popup";
import { UserInfo } from "../../models/UserInfo";
import { UserStore } from "../../models/UserStore";
import { UserData } from "../../models/UserData";
import * as actionTypes from "../actions/actionTypes";

export const initialState: {
  didTryAutoLogin: boolean;
  isJoined: Nullable<boolean>;
  hasUserStore: Nullable<boolean>;
  isJoinedUserHasStore: Nullable<boolean>;
  pushToken: Nullable<string>;
  location: Nullable<boolean>;
  userStore: Nullable<UserStore>;
  userInfo: Nullable<UserInfo>;
  userData: Nullable<UserData>;
  agreedStatus: Nullable<object>;
  ci: Nullable<string>;
  updatePopup: Nullable<Popup>;
  isAppUpdated: boolean;
  pushCnt: number;
  wishCnt: number;
} = {
  didTryAutoLogin: false,
  isJoined: null,
  hasUserStore: null,
  isJoinedUserHasStore: null,
  pushToken: null,
  location: null,
  userStore: null,
  userInfo: null,
  userData: null,
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
    case actionTypes.SET_USER_DATA: {
      const result = { ...state };
      const userData = { ...action.userData };
      result.userData = userData;
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
