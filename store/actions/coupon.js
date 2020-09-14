import queryString from "query-string";
import { API_URL } from "@constants/settings";
export const SET_COUPON = "SET_COUPON";
export const SET_COUPON_DETAIL = "SET_COUPON_DETAIL";

export const fetchCoupon = (query) => {
  // store_cd , user_cd
  const url = queryString.stringifyUrl({
    url: `${API_URL}/coupon`,
    query: query,
  });

  return async (dispatch, getState) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("fetchCoupon Something went wrong!");
      }

      const resData = await response.json();
      dispatch({ type: SET_COUPON, coupon: resData.data });
    } catch (err) {
      throw err;
    }
  };
};

export const fetchCouponDetail = (query) => {
  // store_cd , user_cd
  const url = queryString.stringifyUrl({
    url: `${API_URL}/coupon/${query.cou_cd}?user_cd=${query.user_cd}`,
  });
  // console.warn(url);
  return async (dispatch, getState) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("fetchCouponDetail Something went wrong!");
      }

      const resData = await response.json();
      console.log(resData.data);
      dispatch({
        type: SET_COUPON_DETAIL,
        couponDetail: resData.data.couponInfo,
      });
    } catch (err) {
      throw err;
    }
  };
};
