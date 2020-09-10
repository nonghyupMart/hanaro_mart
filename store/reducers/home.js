import { SET_HOME_BANNER, SET_HOME_NOTICE } from "@actions/home";

const initialState = {
  homeBanner: {},
  homeNotice: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_HOME_BANNER:
      return {
        ...state,
        homeBanner: action.homeBanner,
      };
    case SET_HOME_NOTICE:
      return {
        ...state,
        homeNotice: action.homeNotice,
      };
  }

  return state;
};
