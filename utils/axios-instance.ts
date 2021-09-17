import axios from "axios";
import { API_URL } from "../constants";
import {
  setAlert,
  setIsLoading,
  showServiceErrorAlert,
} from "../store/actions/common";
import * as actionTypes from "../store/actions/actionTypes";
import { AppDispatch } from "../hooks";
import { clearAllData } from "./storage";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
});
let _dispatch: AppDispatch;
const errorHandler = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log("error=>", error.response);
    console.log("error.response.data=>", error.response.data);
    // console.log("error.response.status=>", error.response.status);
    // console.log("error.response.headers=>", error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    // console.log(error.request);
    console.log("ERROR responseURL => ", error.request.responseURL);
  } else {
    // Something happened in setting up the request that triggered an Error
    // console.log("Error", error.message);
  }
  // console.log(error.config);
  // console.log("errorHandler", error);
  showServiceErrorAlert(_dispatch);
  return error;
};
// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // console.log(config.isNoLoading);
    console.log(config.isNoLoading, `[${config.method}]`, config.url);
    if (!config.isNoLoading) {
      _dispatch(setIsLoading(true));
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  async (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    if (response.data.code === "USE-0000") {
      //회원정보가 없는 경우 자동로그인 해제
      await clearAllData();
      return await _dispatch({ type: actionTypes.WITHDRAWAL });
    }

    if (response.data.code !== 200 && response.data.code !== 201) {
      console.log("response URL=>", response.request.responseURL);
      console.log("response=>", response.data);
      _dispatch(
        setAlert({
          message: response.data.error.errorMsg,
          onPressConfirm: () => {
            _dispatch(setAlert(null));
          },
        })
      );
    }
    if (response.config.isAutoOff) {
      _dispatch(setIsLoading(false));
    }

    return response.data;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    errorHandler(error);
    return Promise.reject(error);
  }
);

export const axiosInit = ({
  dispatch,
  isAutoOff = false,
  isNoLoading = false,
  url = null,
}: {
  dispatch: AppDispatch;
  isAutoOff?: boolean;
  isNoLoading?: boolean;
  url?: Nullable<string>;
}) => {
  _dispatch = dispatch;
  axiosInstance.defaults.isAutoOff = isAutoOff;
  axiosInstance.defaults.isNoLoading = isNoLoading;
  if (url) axiosInstance.defaults.baseURL = url;
  return axiosInstance;
};
