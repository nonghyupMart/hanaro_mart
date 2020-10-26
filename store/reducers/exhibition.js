import {
  SET_EXHIBITION,
  SET_EXHIBITION_MORE,
  SET_EXHIBITION_DETAIL,
} from "@actions/exhibition";

const initialState = {
  exhibition: null,
  exhibitionDetail: null,
};

export default (state = initialState, action) => {
  let newExhibition, updatedPlanList;
  switch (action.type) {
    case SET_EXHIBITION:
      return {
        ...state,
        exhibition: { ...action.exhibition },
      };
    case SET_EXHIBITION_MORE:
      let exhibition = { ...state.exhibition };
      newExhibition = { ...action.exhibition };
      updatedPlanList = exhibition.list.concat(newExhibition.list);

      exhibition.list = updatedPlanList;
      return {
        ...state,
        exhibition: exhibition,
      };

    case SET_EXHIBITION_DETAIL:
      return {
        ...state,
        exhibitionDetail: { ...action.exhibitionDetail },
      };

    default:
      return state;
  }

  return state;
};
