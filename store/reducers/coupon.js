import {
  SET_COUPON,
  SET_COUPON_DETAIL,
  SET_COUPON_MORE,
} from "@actions/coupon";

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
    case SET_COUPON_MORE:
      let coupon = { ...state.coupon };
      let newCoupon = { ...action.coupon };
      let updatedCouponList = coupon.couponList.concat(newCoupon.couponList);
      // console.warn(event);

      coupon.couponList = updatedCouponList;
      // console.log("- - ->", event);
      return {
        ...state,
        coupon: coupon,
      };

    case SET_COUPON_DETAIL:
      return {
        ...state,
        couponDetail: { ...action.couponDetail },
      };
  }

  return state;
};
