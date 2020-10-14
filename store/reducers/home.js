import {
  SET_HOME_BANNER,
  SET_HOME_NOTICE,
  SET_HOME_NOTICE_MORE,
  SET_HOME_NARO,
  SET_APP_POPUP,
  SET_STORE_POPUP,
} from "@actions/home";

const initialState = {
  homeBanner: null,
  homeNotice: null,
  homeNaro: null,
  storePopup: null,
  appPopup: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_HOME_BANNER:
      return {
        ...state,
        homeBanner: { ...action.homeBanner },
      };
    case SET_HOME_NOTICE:
      return {
        ...state,
        homeNotice: { ...action.homeNotice },
      };
    case SET_HOME_NOTICE_MORE:
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
    case SET_HOME_NARO:
      return {
        ...state,
        homeNaro: { ...action.homeNaro },
      };
    case SET_APP_POPUP:
      return {
        ...state,
        appPopup: { ...action.appPopup },
      };
    case SET_STORE_POPUP:
      return {
        ...state,
        storePopup: { ...action.storePopup },
      };
    default:
      return state;
  }

  return state;
};
