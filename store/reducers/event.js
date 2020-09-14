import { SET_EVENT, SET_MORE_EVENT } from "@actions/event";

const initialState = {
  event: null,
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
  }

  return state;
};
