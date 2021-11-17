import queryString from "query-string";
import * as actionTypes from "./actionTypes";
import * as Util from "../../utils";

export const fetchCoupon = (query) => {
  query.limit = 40;
  // store_cd , user_cd
  if (!query.page) query.page = "1";
  const url = queryString.stringifyUrl({
    url: `/coupon`,
    query: query,
  });

  return async (dispatch, getState) => {
    return Util.axiosInit({ dispatch: dispatch, isAutoOff: true })
      .get(url)
      .then(async (response) => {
        let type = actionTypes.SET_COUPON;

        if (query.page > 1) {
          // 다음 페이지 로딩
          if (query.user_yn === "Y") {
            //마이쿠폰일 경우..
            type = actionTypes.SET_MY_COUPON_MORE;
          } else {
            type = actionTypes.SET_COUPON_MORE;
          }
        } else {
          // 첫페이지 로딩
          if (query.user_yn === "Y") {
            //마이쿠폰일 경우..
            type = actionTypes.SET_MY_COUPON;
          } else {
            type = actionTypes.SET_COUPON;
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
  delete query.coupon;
  delete query.index;

  const url = queryString.stringifyUrl({
    url: `/coupon`,
  });
  const data = JSON.stringify(query);

  return async (dispatch, getState) => {
    return Util.axiosInit({ dispatch: dispatch, isAutoOff: true })
      .post(url, data)
      .then(async (response) => {
        switch (`${response["code"]}`) {
          case "200":
            coupon.couponList[index].status = "10";
            break;
          case "COU-0004": //COU-0004 - 수량이 없을때 오류 메세지
            coupon.couponList[index].status = "30";
          default:
            break;
        }
        dispatch({ type: actionTypes.SET_COUPON, coupon: coupon });
        return response.data;
      });
  };
};

export const registerCoupon = (query: any) => {
  const coupon = { ...query.coupon };

  const type =
    coupon.user_yn === "Y" ? actionTypes.SET_MY_COUPON : actionTypes.SET_COUPON;
  delete query.coupon;

  const url = queryString.stringifyUrl({
    url: `/coupon_barcode`,
  });
  const data = JSON.stringify(query);

  return async (dispatch, getState) => {
    return Util.axiosInit({ dispatch: dispatch, isAutoOff: true })
      .post(url, data)
      .then(async (response) => {
        switch (`${response["code"]}`) {
          case "200":
            const updatedCouponList = coupon.couponList.concat(
              response.data.couponList
            );
            coupon.couponList = updatedCouponList;
            break;
          default:
            break;
        }
        dispatch({ type: type, coupon: coupon });
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
    return Util.axiosInit({ dispatch: dispatch, isAutoOff: true })
      .patch(url, data)
      .then(async (response) => {
        coupon.couponList[index].status = "20";
        if (routeName === "MyCoupon")
          dispatch({ type: actionTypes.SET_MY_COUPON, coupon: coupon });
        else dispatch({ type: actionTypes.SET_COUPON, coupon: coupon });
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
    return Util.axiosInit({ dispatch: dispatch, isAutoOff: true })
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
