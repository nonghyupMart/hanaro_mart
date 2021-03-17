import queryString from "query-string";
import { API_URL } from "../../constants";
import * as Util from "../../util";
import { getResponse } from "../actions/auth";
import * as actionTypes from "./actionTypes";

export const fetchEvent = (query) => {
  if (!query.page) query.page = "1";
  const url = queryString.stringifyUrl({
    url: `${API_URL}/event`,
    query: query,
  });
  return async (dispatch, getState) => {
    try {
      const response = await fetch(url);
      const resData = await getResponse(response, dispatch, url, query);
      let type = actionTypes.SET_EVENT;
      if (query.page > 1) {
        if (query.user_cd) type = actionTypes.SET_MY_EVENT_MORE;
        else type = actionTypes.SET_EVENT_MORE;
      } else {
        if (query.user_cd) type = actionTypes.SET_MY_EVENT;
        else type = actionTypes.SET_EVENT;
      }
      dispatch({ type: type, event: resData.data });
      return resData.data;
    } catch (err) {
      throw err;
    }
  };
};

export const fetchEventDetail = (query) => {
  const event_cd = query.event_cd;
  delete query.event_cd;
  const url = queryString.stringifyUrl({
    url: `${API_URL}/event/${event_cd}`,
    query: query,
  });
  return async (dispatch, getState) => {
    try {
      const response = await fetch(url);
      const resData = await getResponse(response, dispatch, url, query);

      dispatch({
        type: actionTypes.SET_EVENT_DETAIL,
        eventDetail: resData.data.eventInfo,
      });
    } catch (err) {
      throw err;
    }
  };
};
export const clearEventDetail = () => {
  return { type: actionTypes.SET_EVENT_DETAIL, eventDetail: null };
};

export const updateEventDetail = (eventDetail) => {
  return {
    type: actionTypes.SET_EVENT_DETAIL,
    eventDetail: eventDetail,
  };
};

export const applyEvent = (query) => {
  const url = queryString.stringifyUrl({
    url: `${API_URL}/event`,
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
      return resData.data;
    } catch (err) {
      throw err;
    }
  };
};

export const applyStamp = (query) => {
  const url = queryString.stringifyUrl({
    url: `${API_URL}/stamp`,
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
      return resData.data;
    } catch (err) {
      throw err;
    }
  };
};

export const exchangeStamp = (query) => {
  const url = queryString.stringifyUrl({
    url: `${API_URL}/stamp-trade`,
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
      return resData.data;
    } catch (err) {
      throw err;
    }
  };
};
