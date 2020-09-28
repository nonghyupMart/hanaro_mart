import { SET_BOTTOM_NAVIGATION } from "@actions/common";

const initialState = {
  isBottomNavigation: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_BOTTOM_NAVIGATION:
      return {
        ...state,
        isBottomNavigation: action.isBottomNavigation,
      };
    default:
      return state;
  }
};
