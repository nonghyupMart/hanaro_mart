import {
  SET_BOTTOM_NAVIGATION,
  SET_IS_STORE_POPUP,
  SET_IS_APP_POPUP,
  SET_ALERT,
  SET_IS_LOADING,
  SET_HEADER_HEIGHT,
} from "@actions/common";

const initialState = {
  isBottomNavigation: true,
  isStorePopup: {},
  isAppPopup: true,
  alert: null,
  isLoading: true,
  headerHeight: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_BOTTOM_NAVIGATION:
      return {
        ...state,
        isBottomNavigation: action.isBottomNavigation,
      };
    case SET_HEADER_HEIGHT:
      return {
        ...state,
        headerHeight: action.headerHeight,
      };

    case SET_IS_STORE_POPUP:
      return {
        ...state,
        isStorePopup: { ...action.isStorePopup },
      };
    case SET_IS_APP_POPUP:
      return {
        ...state,
        isAppPopup: action.isAppPopup,
      };
    case SET_ALERT:
      return {
        ...state,
        alert: action.alert,
      };
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    default:
      return state;
  }
  return state;
};
