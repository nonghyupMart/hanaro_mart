import {
  SET_BOTTOM_NAVIGATION,
  SET_STORE_POPUP,
  SET_APP_POPUP,
} from "@actions/common";

const initialState = {
  isBottomNavigation: true,
  isStorePopup: false,
  isAppPopup: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_BOTTOM_NAVIGATION:
      return {
        ...state,
        isBottomNavigation: action.isBottomNavigation,
      };

    case SET_STORE_POPUP:
      return {
        ...state,
        isStorePopup: action.isStorePopup,
      };
    case SET_APP_POPUP:
      return {
        ...state,
        isAppPopup: action.isAppPopup,
      };
    default:
      return state;
  }
};
