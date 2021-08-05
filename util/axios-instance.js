import axios from "axios";
import { API_URL } from "../constants";
import * as Util from "./";
import {
  setAlert,
  setIsLoading,
  showServiceErrorAlert,
} from "../store/actions/common";
import * as Updates from "expo-updates";
import * as actionTypes from "../store/actions/actionTypes";

let http = (() => {
  const instance = axios.create({
    baseURL: API_URL,
    timeout: 30000,
    headers: { "Content-Type": "application/json" },
  });
  let dispatch,
    isAutoOff = false,
    isNoLoading = false;
  const errorHandler = (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      Util.log("error=>", error.response);
      Util.log("error.response.data=>", error.response.data);
      // Util.log("error.response.status=>", error.response.status);
      // Util.log("error.response.headers=>", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      // Util.log(error.request);
      Util.log("ERROR responseURL => ", error.request.responseURL);
    } else {
      // Something happened in setting up the request that triggered an Error
      // console.log("Error", error.message);
    }
    // console.log(error.config);
    // console.log("errorHandler", error);
    showServiceErrorAlert(dispatch);
    return error;
  };
  // Add a request interceptor
  instance.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      // console.log(config);
      if (!isNoLoading) dispatch(setIsLoading(true));
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    async (response) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data

      if (response.data.code == "USE-0000") {
        //회원정보가 없는 경우 자동로그인 해제
        await Util.clearAllData();
        return await dispatch({ type: actionTypes.WITHDRAWAL });
      }

      if (response.data.code != "200" && response.data.code != "201") {
        Util.log("response URL=>", response.request.responseURL);
        Util.log("response=>", response.data);
        dispatch(
          setAlert({
            message: response.data.error.errorMsg,
            onPressConfirm: () => {
              dispatch(setAlert(null));
            },
          })
        );
      }
      if (isAutoOff) {
        dispatch(setIsLoading(false));
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
  return {
    init: (options) => {
      dispatch = options.dispatch;
      if (options.isAutoOff) isAutoOff = options.isAutoOff;
      if (options.isNoLoading) isNoLoading = options.isNoLoading;
      if (options.url) instance.defaults.baseURL = options.url;
      return instance;
    },
    get: (...params) => {
      return instance.get(...params);
    },
    post: (...params) => {
      return instance.post(...params);
    },
    patch: (...params) => {
      return instance.patch(...params);
    },
    delete: (...params) => {
      return instance.delete(...params);
    },
  };
})();
export default http;
