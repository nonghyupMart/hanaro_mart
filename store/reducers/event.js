import { SET_EVENT, SET_EVENT_MORE, SET_EVENT_DETAIL } from "@actions/event";

const initialState = {
  event: null,
  eventDetail: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_EVENT:
      return {
        ...state,
        event: { ...action.event },
      };
    case SET_EVENT_MORE:
      let event = { ...state.event };
      let newEvent = { ...action.event };
      let updatedEventList = event.eventList.concat(newEvent.eventList);

      event.eventList = updatedEventList;
      return {
        ...state,
        event: event,
      };

    case SET_EVENT_DETAIL:
      return {
        ...state,
        eventDetail: { ...action.eventDetail },
      };

    default:
      return state;
  }

  return state;
};
