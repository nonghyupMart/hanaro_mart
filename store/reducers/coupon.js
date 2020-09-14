import { SET_COUPON, SET_COUPON_DETAIL } from "@actions/coupon";

const initialState = {
  coupon: null,
  couponDetail: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_COUPON:
      return {
        ...state,
        coupon: { ...action.coupon },
      };
    case SET_COUPON_DETAIL:
      return {
        ...state,
        couponDetail: { ...action.couponDetail },
      };
  }

  return state;
};
