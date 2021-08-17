import * as actionTypes from "../actions/actionTypes";

const initialState = {
  exclusive: null,
  exclusiveDetail: null,
};

export default (state = initialState, action) => {
  let newExclusive, updatedExcluList;
  switch (action.type) {
    case actionTypes.SET_EXCLUSIVE:
      return {
        ...state,
        exclusive: { ...action.exclusive },
      };
    case actionTypes.SET_EXCLUSIVE_MORE:
      let exclusive = { ...state.exclusive };
      newExclusive = { ...action.exclusive };
      updatedExcluList = exclusive.list.concat(newExclusive.list);

      exclusive.list = updatedExcluList;
      return {
        ...state,
        exclusive: exclusive,
      };

    case actionTypes.SET_EXCLUSIVE_DETAIL:
      return {
        ...state,
        exclusiveDetail: { ...action.exclusiveDetail },
      };

    default:
      return state;
  }

  return state;
};
