import {
  AUTHENTICATE,
  LOGOUT,
  SET_DID_TRY_AL,
  SET_PUSH_TOKEN,
  SET_LOCATION,
  SET_AGREEMENT,
  SET_BOTTOM_NAVIGATION,
  SET_TEST,
} from "../actions/auth";

const initialState = {
  isAgreed: false,
  token: null,
  userId: null,
  didTryAutoLogin: false,
  pushToken: null,
  location: null,
  isBottomNavigation: true,
  testItem: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
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
    case SET_AGREEMENT:
      return {
        ...state,
        isAgreed: action.isAgreed,
      };
    case SET_BOTTOM_NAVIGATION:
      return {
        ...state,
        isBottomNavigation: action.isBottomNavigation,
      };
    case SET_TEST:
      // console.log("action==> ", action.testItem);
      return {
        ...state,
        testItem: action.testItem,
      };
    default:
      return state;
  }
};
