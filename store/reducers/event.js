import { SET_EVENT, SET_MORE_EVENT, SET_EVENT_DETAIL } from "@actions/event";

const initialState = {
  event: null,
  eventDetail: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_EVENT:
      // console.warn(action.event);
      return {
        ...state,
        event: { ...action.event },
      };
    case SET_MORE_EVENT:
      let event = { ...state.event };
      let newEvent = { ...action.event };
      let updatedEventList = event.eventList.concat(newEvent.eventList);
      // console.warn(event);

      event.eventList = updatedEventList;
      console.log("- - ->", event);
      return {
        ...state,
        event: event,
      };

    case SET_EVENT_DETAIL:
      // console.warn(action.eventDetail);
      return {
        ...state,
        eventDetail: { ...action.eventDetail },
      };
  }

  return state;
};
