import * as actionTypes from "../actions/actionTypes";

const initialState = {
  exhibition: null,
  exhibitionDetail: null,
};

export default (state = initialState, action) => {
  let newExhibition, updatedPlanList;
  switch (action.type) {
    case actionTypes.SET_EXHIBITION:
      return {
        ...state,
        exhibition: { ...action.exhibition },
      };
    case actionTypes.SET_EXHIBITION_MORE:
      let exhibition = { ...state.exhibition };
      newExhibition = { ...action.exhibition };
      updatedPlanList = exhibition.list.concat(newExhibition.list);

      exhibition.list = updatedPlanList;
      return {
        ...state,
        exhibition: exhibition,
      };

    case actionTypes.SET_EXHIBITION_DETAIL:
      return {
        ...state,
        exhibitionDetail: { ...action.exhibitionDetail },
      };

    default:
      return state;
  }

  return state;
};
