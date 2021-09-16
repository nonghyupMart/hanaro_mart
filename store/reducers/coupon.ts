import * as actionTypes from "../actions/actionTypes";

export const initialState = {
  coupon: null,
  couponA: null,
  couponDetail: null,
  myCoupon: null,
  myCouponA: null,
};

export default (state = initialState, action) => {
  let coupon;
  let newList;
  let arr = [];
  switch (action.type) {
    case actionTypes.SET_COUPON:
      return {
        ...state,
        coupon: { ...action.coupon },
      };
    case actionTypes.SET_COUPON_A:
      return {
        ...state,
        couponA: { ...action.coupon },
      };
    case actionTypes.SET_COUPON_MORE:
      coupon = { ...state.coupon };
      let newCoupon = { ...action.coupon };
      let updatedCouponList = coupon.couponList.concat(newCoupon.couponList);

      coupon.couponList = updatedCouponList;

      return {
        ...state,
        coupon: coupon,
      };

    case actionTypes.SET_MY_COUPON:
      return {
        ...state,
        myCoupon: { ...action.coupon },
      };

    case actionTypes.SET_MY_COUPON_A:
      return {
        ...state,
        myCouponA: { ...action.coupon },
      };
    case actionTypes.SET_MY_COUPON_MORE:
      let myCoupon = { ...state.myCoupon };
      let newMyCoupon = { ...action.coupon };
      let updatedMyCouponList = myCoupon.couponList.concat(
        newMyCoupon.couponList
      );

      myCoupon.couponList = updatedMyCouponList;

      return {
        ...state,
        myCoupon: myCoupon,
      };

    case actionTypes.SET_COUPON_DETAIL:
      return {
        ...state,
        couponDetail: { ...action.couponDetail },
      };

    default:
      return state;
  }

  return state;
};
