import Address1 from "@models/address1";
import { API_URL } from "@constants/settings";
export const SET_HOME_BANNER = "SET_HOME_BANNER";
export const SET_HOME_NOTICE = "SET_HOME_NOTICE";

export const fetchHomeBanner = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${API_URL}/home-banner`);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      // console.log("===> ", resData.data);

      dispatch({ type: SET_HOME_BANNER, homeBanner: resData.data });
    } catch (err) {
      throw err;
    }
  };
};

export const fetchHomeNotice = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${API_URL}/home-notice`);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      //   console.log("===> ", resData.data);

      dispatch({ type: SET_HOME_NOTICE, homeNotice: resData.data });
    } catch (err) {
      throw err;
    }
  };
};
