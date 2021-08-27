import * as actionTypes from "../actions/actionTypes";

const initialState = {
  isBottomNavigation: true,
  dateForStorePopup: null,
  shouldShowAppPopup: true,
  alert: null,
  isLoading: false,
  headerHeight: 0,
  didTryStorePopup: false,
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
    case actionTypes.SET_DID_TRY_STORE_POPUP:
      return {
        ...state,
        didTryStorePopup: action.didTryStorePopup,
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

    case actionTypes.SET_DATE_FOR_STORE_POPUP:
      return {
        ...state,
        dateForStorePopup: { ...action.dateForStorePopup },
      };
    case actionTypes.SET_SHOULD_SHOW_APP_POPUP:
      return {
        ...state,
        shouldShowAppPopup: action.shouldShowAppPopup,
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
