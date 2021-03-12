import _ from "lodash";
import {
  SET_USER_INFO,
  SET_PUSH_TOKEN,
  SET_LOCATION,
  SET_USER_STORE,
  SET_AGREED_STATUS,
  SET_PREVIEW,
  SET_IS_JOIN,
  SET_DID_TRY_AL,
  WITHDRAWAL,
  SET_CI,
  SET_UPDATE_POPUP,
  SET_IS_UPDATED,
  SET_PUSH_CNT,
} from "../actions/auth";

const initialState = {
  didTryAutoLogin: false,
  isJoin: false,
  isPreview: true,
  pushToken: null,
  location: null,
  userStore: null,
  userInfo: null,
  agreedStatus: null,
  ci: null,
  updatePopup: null,
  isUpdated: true,
  pushCnt: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PUSH_CNT:
      return {
        ...state,
        pushCnt: action.pushCnt,
      };
    case SET_IS_UPDATED:
      return {
        ...state,
        isUpdated: action.isUpdated,
      };
    case SET_UPDATE_POPUP:
      return {
        ...state,
        updatePopup: action.updatePopup,
      };
    case SET_PREVIEW: {
      return {
        ...state,
        isPreview: action.isPreview,
      };
    }
    case SET_DID_TRY_AL: {
      return {
        ...state,
        didTryAutoLogin: true,
      };
    }
    case SET_IS_JOIN: {
      return {
        ...state,
        isJoin: action.isJoin,
      };
    }
    case SET_AGREED_STATUS: {
      return {
        ...state,
        agreedStatus: { ...action.agreedStatus },
      };
    }
    case SET_USER_INFO: {
      return {
        ...state,
        userInfo: { ...action.userInfo },
      };
    }
    case SET_CI:
      return {
        ...state,
        ci: action.ci,
      };
    case SET_PUSH_TOKEN:
      return {
        ...state,
        pushToken: action.pushToken,
      };
    case SET_LOCATION:
      return {
        ...state,
        location: action.location,
      };

    case SET_USER_STORE:
      return {
        ...state,
        userStore: { ...action.userStore },
      };

    case WITHDRAWAL:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
