import { SET_LEAFLET, SET_PRODUCT, SET_LEAFLET_DETAIL } from "@actions/flyer";

const initialState = {
  leaflet: null,
  leafletDetail: null,
  product: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LEAFLET:
      return {
        ...state,
        leaflet: { ...action.leaflet },
      };
    case SET_LEAFLET_DETAIL:
      return {
        ...state,
        leafletDetail: { ...action.leafletDetail },
      };
    case SET_PRODUCT:
      return {
        ...state,
        product: { ...action.product },
      };
  }

  return state;
};
