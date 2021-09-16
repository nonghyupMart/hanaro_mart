import * as actionTypes from "../actions/actionTypes";
export const initialState = {
  homeBanner: null,
  homeNotice: null,
  homeProducts: null,
  homeNaro: null,
  storePopup: null,
  appPopup: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_HOME_BANNER:
      return {
        ...state,
        homeBanner: { ...action.homeBanner },
      };
    case actionTypes.SET_HOME_NOTICE:
      return {
        ...state,
        homeNotice: { ...action.homeNotice },
      };
    case actionTypes.SET_HOME_NOTICE_MORE:
      let homeNotice = { ...state.homeNotice };
      let newHomeNotice = { ...action.homeNotice };

      let updatedNoticeList = homeNotice.noticeList.concat(
        newHomeNotice.noticeList
      );
      homeNotice.noticeList = updatedNoticeList;

      return {
        ...state,
        homeNotice: homeNotice,
      };
    case actionTypes.SET_HOME_PRODUCTS:
      return {
        ...state,
        homeProducts: { ...action.data },
      };
    case actionTypes.SET_HOME_PRODUCTS_MORE:
      let homeProducts = { ...state.homeProducts };
      let newHomeProducts = { ...action.data };

      let updatedProductList = homeProducts.productList.concat(
        newHomeProducts.productList
      );
      homeProducts.productList = updatedProductList;

      return {
        ...state,
        homeProducts: homeProducts,
      };
    case actionTypes.SET_HOME_NARO:
      return {
        ...state,
        homeNaro: { ...action.homeNaro },
      };
    case actionTypes.SET_APP_POPUP:
      return {
        ...state,
        appPopup: { ...action.appPopup },
      };
    case actionTypes.SET_STORE_POPUP:
      return {
        ...state,
        storePopup: { ...action.storePopup },
      };
    default:
      return state;
  }

  return state;
};
