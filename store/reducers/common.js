import * as actionTypes from "../actions/actionTypes";

const initialState = {
  isBottomNavigation: true,
  isStorePopup: {},
  isAppPopup: true,
  alert: null,
  isLoading: false,
  headerHeight: 0,
  didTryPopup: false,
  notification: null,
  brightness: null,
  link: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LINK:
      return {
        ...state,
        link: action.link,
      };
    case actionTypes.SET_DID_TRY_POPUP:
      return {
        ...state,
        didTryPopup: action.didTryPopup,
      };
    case actionTypes.SET_BOTTOM_NAVIGATION:
      return {
        ...state,
        isBottomNavigation: action.isBottomNavigation,
      };
    case actionTypes.SET_NOTIFICATION:
      return {
        ...state,
        notification: { ...action.notification },
      };
    case actionTypes.SET_HEADER_HEIGHT:
      return {
        ...state,
        headerHeight: action.headerHeight,
      };

    case actionTypes.SET_IS_STORE_POPUP:
      return {
        ...state,
        isStorePopup: { ...action.isStorePopup },
      };
    case actionTypes.SET_IS_APP_POPUP:
      return {
        ...state,
        isAppPopup: action.isAppPopup,
      };
    case actionTypes.SET_ALERT:
      return {
        ...state,
        alert: action.alert,
      };
    case actionTypes.SET_IS_LOADING:
      return {
        ...state,
        isLoading: !!action.isLoading,
      };
    case actionTypes.SET_BRIGHTNESS:
      return {
        ...state,
        brightness: action.brightness,
      };
    default:
      return state;
  }
  return state;
};
