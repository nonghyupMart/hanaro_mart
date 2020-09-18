import queryString from "query-string";
import { API_URL } from "@constants/settings";
export const SET_COUPON = "SET_COUPON";
export const SET_COUPON_MORE = "SET_COUPON_MORE";
export const SET_COUPON_DETAIL = "SET_COUPON_DETAIL";

export const fetchCoupon = (query) => {
  // store_cd , user_cd
  if (!query.page) query.page = "1";
  const url = queryString.stringifyUrl({
    url: `${API_URL}/coupon`,
    query: query,
  });

  return async (dispatch, getState) => {
    try {
      const response = await fetch(url);

      const resData = await response.json();
      if (!response.ok) {
        console.warn(url, resData.error.errorMsg);
        throw new Error("fetchCoupon Something went wrong!");
      }
      console.warn(url);
      let type = SET_COUPON;
      if (query.page > 1) {
        type = SET_COUPON_MORE;
      } else {
        type = SET_COUPON;
      }
      dispatch({ type: type, coupon: resData.data });
    } catch (err) {
      throw err;
    }
  };
};

export const downloadCoupon = (query) => {
  const coupon = { ...query.coupon };
  const index = query.index;
  delete query.coupon;
  delete query.index;
  const url = queryString.stringifyUrl({
    url: `${API_URL}/coupon`,
  });

  return async (dispatch, getState) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(query),
      });
      const resData = await response.json();
      if (!response.ok) {
        console.warn(url, resData.error.errorMsg);
        throw new Error("downloadCoupon Something went wrong!");
      }
      console.warn("downloadCoupon", resData.data);
      coupon.couponList[index].status = "10";
      dispatch({ type: SET_COUPON, coupon: coupon });
      return resData.data;
    } catch (err) {
      throw err;
    }
  };
};

export const useCoupon = (query) => {
  const url = queryString.stringifyUrl({
    url: `${API_URL}/coupon`,
  });

  return async (dispatch, getState) => {
    try {
      const response = await fetch(url, {
       
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(query),
      });
      console.warn(url, query)
      const resData = await response.json();
      if (!response.ok) {
        console.warn(url, resData.error.errorMsg);
        throw new Error("useCoupon Something went wrong!");
      }
      console.warn("useCoupon", resData.data);
      return resData.data;
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
