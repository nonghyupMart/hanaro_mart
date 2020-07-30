import {
  AUTHENTICATE,
  LOGOUT,
  SET_DID_TRY_AL,
  SET_PUSH_TOKEN,
} from "../actions/auth";

const initialState = {
  isAgreed: false,
  token: null,
  userId: null,
  didTryAutoLogin: false,
  pushToken: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PUSH_TOKEN:
      return {
        ...state,
        pushToken: action.pushToken,
      };
    default:
      return state;
  }
};
