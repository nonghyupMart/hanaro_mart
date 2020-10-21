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
} from "../actions/auth";

const initialState = {
  didTryAutoLogin: false,
  isJoin: false,
  isPreview: false,
  pushToken: null,
  location: null,
  userStore: null,
  userInfo: null,
  agreedStatus: null,
  ci: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PREVIEW: {
      return {
        ...state,
        isPreview: action.isPreview,
        didTryAutoLogin: true,
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
        didTryAutoLogin: true,
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
        didTryAutoLogin: true,
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
        didTryAutoLogin: true,
      };
    default:
      return state;
  }
};
