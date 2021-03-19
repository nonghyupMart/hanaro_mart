import queryString from "query-string";
import * as actionTypes from "./actionTypes";
import http from "../../util/axios-instance";

export const fetchCoupon = (query) => {
  query.limit = 40;
  // store_cd , user_cd
  if (!query.page) query.page = "1";
  const url = queryString.stringifyUrl({
    url: `/coupon`,
    query: query,
  });

  return async (dispatch, getState) => {
    return http
      .init(dispatch)
      .get(url)
      .then(async (response) => {
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

        dispatch({ type: type, coupon: response.data });
        return response.data;
      });
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
    url: `/coupon`,
  });
  const data = JSON.stringify(query);

  return async (dispatch, getState) => {
    return http
      .init(dispatch)
      .post(url, data)
      .then(async (response) => {
        switch (response.code) {
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
        return response.data;
      });
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
    url: `/coupon`,
  });
  return async (dispatch, getState) => {
    const data = JSON.stringify(query);
    return http
      .init(dispatch, true)
      .patch(url, data)
      .then(async (response) => {
        coupon.couponList[index].status = "20";
        switch (type) {
          case "A":
            if (routeName === "MyCoupon")
              dispatch({
                type: actionTypes.SET_MY_COUPON_A,
                coupon: coupon,
              });
            else dispatch({ type: actionTypes.SET_COUPON_A, coupon: coupon });
            break;
          case "B":
            if (routeName === "MyCoupon")
              dispatch({ type: actionTypes.SET_MY_COUPON, coupon: coupon });
            else dispatch({ type: actionTypes.SET_COUPON, coupon: coupon });
            break;
        }
        return response.data;
      });
  };
};

export const fetchCouponDetail = (query) => {
  // store_cd , user_cd
  const cou_cd = query.cou_cd;
  delete query.cou_cd;
  const url = queryString.stringifyUrl({
    url: `/coupon/${cou_cd}`,
    query: query,
  });

  return async (dispatch, getState) => {
    return http
      .init(dispatch)
      .get(url)
      .then(async (response) => {
        dispatch({
          type: actionTypes.SET_COUPON_DETAIL,
          couponDetail: response.data.couponInfo,
        });
        return response.data;
      });
  };
};
