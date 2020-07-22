import { AUTHENTICATE, LOGOUT, SET_DID_TRY_AL } from '../actions/auth';

const initialState = {
  isAgreed: false,
  token: null,
  userId: null,
  didTryAutoLogin: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
