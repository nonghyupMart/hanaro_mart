import _ from "lodash";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  didTryAutoLogin: false,
  isJoin: null,
  pushToken: null,
  location: null,
  userStore: null,
  userInfo: null,
  agreedStatus: null,
  ci: null,
  updatePopup: null,
  isUpdated: true,
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
    case actionTypes.SET_IS_UPDATED:
      return {
        ...state,
        isUpdated: action.isUpdated,
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
    case actionTypes.SET_IS_JOIN: {
      return {
        ...state,
        isJoin: action.isJoin,
      };
    }
    case actionTypes.SET_AGREED_STATUS: {
      return {
        ...state,
        agreedStatus: { ...action.agreedStatus },
      };
    }
    case actionTypes.SET_USER_INFO: {
      return {
        ...state,
        userInfo: { ...action.userInfo },
      };
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
      return {
        ...state,
        userStore: { ...action.userStore },
      };

    case actionTypes.WITHDRAWAL:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
