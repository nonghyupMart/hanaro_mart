import queryString from "query-string";
import * as actionTypes from "./actionTypes";
import http from "../../util/axios-instance";

export const fetchEvent = (query) => {
  if (!query.page) query.page = "1";
  const url = queryString.stringifyUrl({
    url: `/event`,
    query: query,
  });
  return async (dispatch, getState) => {
    return http
      .init({ dispatch: dispatch, isAutoOff: true })
      .get(url)
      .then(async (response) => {
        let type = actionTypes.SET_EVENT;
        if (query.page > 1) {
          if (query.user_cd) type = actionTypes.SET_MY_EVENT_MORE;
          else type = actionTypes.SET_EVENT_MORE;
        } else {
          if (query.user_cd) type = actionTypes.SET_MY_EVENT;
          else type = actionTypes.SET_EVENT;
        }
        dispatch({ type: type, event: response.data });
        return response.data;
      });
  };
};

export const fetchEventDetail = (query) => {
  const event_cd = query.event_cd;
  delete query.event_cd;
  const url = queryString.stringifyUrl({
    url: `/event/${event_cd}`,
    query: query,
  });
  return async (dispatch, getState) => {
    return http
      .init({ dispatch: dispatch, isAutoOff: true })
      .get(url)
      .then(async (response) => {
        dispatch({
          type: actionTypes.SET_EVENT_DETAIL,
          eventDetail: response.data.eventInfo,
        });
        return response.data;
      });
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
    url: `/event`,
  });
  return async (dispatch, getState) => {
    return http
      .init({ dispatch: dispatch, isAutoOff: true })
      .post(url, JSON.stringify(query))
      .then(async (response) => {
        return response.data;
      });
  };
};

export const applyStamp = (query) => {
  const url = queryString.stringifyUrl({
    url: `/stamp`,
  });

  return async (dispatch, getState) => {
    return http
      .init({ dispatch: dispatch, isAutoOff: true })
      .post(url, JSON.stringify(query))
      .then(async (response) => {
        return response.data;
      });
  };
};

export const exchangeStamp = (query) => {
  const url = queryString.stringifyUrl({
    url: `/stamp-trade`,
  });
  const data = JSON.stringify(query);

  return async (dispatch, getState) => {
    return http
      .init({ dispatch: dispatch, isAutoOff: true })
      .post(url, data)
      .then(async (response) => {
        return response.data;
      });
  };
};

export const interimExchangeStamp = (query) => {
  const url = queryString.stringifyUrl({
    url: `/stamp-exchange`,
  });
  const data = JSON.stringify(query);

  return async (dispatch, getState) => {
    return http
      .init({ dispatch: dispatch, isAutoOff: true })
      .post(url, data)
      .then(async (response) => {
        return response.data;
      });
  };
};

export const fetchStampHistory = (query) => {
  if (!query.page) query.page = "1";
  const url = queryString.stringifyUrl({
    url: `/stamp-history`,
    query: query,
  });
  return async (dispatch, getState) => {
    return http
      .init({ dispatch: dispatch, isAutoOff: true })
      .get(url)
      .then(async (response) => {
        let type = actionTypes.SET_STAMP_HISTORY;

        dispatch({ type: type, stampHistory: response.data });
        return response.data;
      });
  };
};

export const clearStampHistory = () => {
  return { type: actionTypes.SET_STAMP_HISTORY, stampHistory: null };
};
