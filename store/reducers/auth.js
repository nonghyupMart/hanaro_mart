import {
  SET_USER_INFO,
  SET_PUSH_TOKEN,
  SET_LOCATION,
  SET_BOTTOM_NAVIGATION,
  SET_USER_STORE,
  SET_AGREED_STATUS,
  SET_PREVIEW,
} from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
  isPreview: false,
  pushToken: null,
  location: null,
  isBottomNavigation: true,
  userStore: null,
  userInfo: null,
  agreedStatus: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PREVIEW: {
      return {
        ...state,
        isPreview: action.isPreview,
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

    case SET_BOTTOM_NAVIGATION:
      return {
        ...state,
        isBottomNavigation: action.isBottomNavigation,
      };
    case SET_USER_STORE:
      return {
        ...state,
        userStore: { ...action.userStore },
      };
    default:
      return state;
  }
};
