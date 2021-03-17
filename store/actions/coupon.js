import queryString from "query-string";
import { API_URL } from "../../constants";
import * as Util from "../../util";
import { getResponse } from "../actions/auth";
import * as actionTypes from "./actionTypes";

export const fetchCoupon = (query) => {
  query.limit = 40;
  // store_cd , user_cd
  if (!query.page) query.page = "1";
  const url = queryString.stringifyUrl({
    url: `${API_URL}/coupon`,
    query: query,
  });

  return async (dispatch, getState) => {
    try {
      const response = await fetch(url);

      const resData = await getResponse(response, dispatch, url, query);
      let type = actionTypes.SET_COUPON;

      if (query.page > 1) {
        // 다음 페이지 로딩
        if (query.user_yn == "Y") {
          //마이쿠폰일 경우..
          type = actionTypes.SET_MY_COUPON_MORE;
        } else {
          type = actionTypes.SET_COUPON_MORE;
        }
      } else {
        // 첫페이지 로딩
        if (query.user_yn == "Y") {
          //마이쿠폰일 경우..
          if (query.gbn == "A") {
            type = actionTypes.SET_MY_COUPON_A;
          } else {
            type = actionTypes.SET_MY_COUPON;
          }
        } else {
          if (query.gbn == "A") {
            type = actionTypes.SET_COUPON_A;
          } else {
            type = actionTypes.SET_COUPON;
          }
        }
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
  const type = query.type;
  delete query.coupon;
  delete query.index;
  delete query.type;
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
      const resData = await getResponse(response, dispatch, url, query);
      switch (resData.code) {
        case "200":
          coupon.couponList[index].status = "10";
          break;
        case "COU-0004": //COU-0004 - 수량이 없을때 오류 메세지
          coupon.couponList[index].status = "30";
        default:
          break;
      }

      switch (type) {
        case "A":
          dispatch({ type: actionTypes.SET_COUPON_A, coupon: coupon });
          break;
        case "B":
          dispatch({ type: actionTypes.SET_COUPON, coupon: coupon });
          break;
      }
      return resData.data;
    } catch (err) {
      throw err;
    }
  };
};

export const useCoupon = (query) => {
  const coupon = { ...query.coupon };
  const index = query.index;
  const type = query.type;
  const routeName = query.routeName;
  delete query.coupon;
  delete query.index;
  delete query.type;
  delete query.routeName;
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
      const resData = await getResponse(response, dispatch, url, query);
      // return;
      coupon.couponList[index].status = "20";
      switch (type) {
        case "A":
          if (routeName === "MyCoupon")
            dispatch({ type: actionTypes.SET_MY_COUPON_A, coupon: coupon });
          else dispatch({ type: actionTypes.SET_COUPON_A, coupon: coupon });
          break;
        case "B":
          if (routeName === "MyCoupon")
            dispatch({ type: actionTypes.SET_MY_COUPON, coupon: coupon });
          else dispatch({ type: actionTypes.SET_COUPON, coupon: coupon });
          break;
      }
      return resData.data;
    } catch (err) {
      throw err;
    }
  };
};

export const fetchCouponDetail = (query) => {
  // store_cd , user_cd
  const cou_cd = query.cou_cd;
  delete query.cou_cd;
  const url = queryString.stringifyUrl({
    url: `${API_URL}/coupon/${cou_cd}`,
    query: query,
  });

  return async (dispatch, getState) => {
    try {
      const response = await fetch(url);
      const resData = await getResponse(response, dispatch, url, query);
      // Util.log("fetchCouponDetail", resData.data.couponInfo);
      dispatch({
        type: actionTypes.SET_COUPON_DETAIL,
        couponDetail: resData.data.couponInfo,
      });
    } catch (err) {
      throw err;
    }
  };
};
