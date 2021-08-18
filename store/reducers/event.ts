import * as actionTypes from "../actions/actionTypes";

const initialState = {
  event: null,
  eventDetail: null,
  myEvent: null,
  event_cd: null,
  stampHistory: null,
};

export default (state = initialState, action) => {
  let newEvent, updatedEventList;
  switch (action.type) {
    case actionTypes.SET_STAMP_HISTORY:
      return {
        ...state,
        stampHistory: { ...action.stampHistory },
      };

    case actionTypes.SET_EVENT:
      return {
        ...state,
        event: { ...action.event },
      };
    case actionTypes.SET_EVENT_MORE:
      let event = { ...state.event };
      newEvent = { ...action.event };
      updatedEventList = event.eventList.concat(newEvent.eventList);

      event.eventList = updatedEventList;
      return {
        ...state,
        event: event,
      };
    case actionTypes.SET_MY_EVENT:
      return {
        ...state,
        myEvent: { ...action.event },
      };
    case actionTypes.SET_MY_EVENT_MORE:
      let myEvent = { ...state.myEvent };
      newEvent = { ...action.event };
      updatedEventList = myEvent.eventList.concat(newEvent.eventList);

      myEvent.eventList = updatedEventList;
      return {
        ...state,
        myEvent: myEvent,
      };

    case actionTypes.SET_EVENT_DETAIL:
      return {
        ...state,
        eventDetail: { ...action.eventDetail },
      };

    default:
      return state;
  }

  return state;
};
