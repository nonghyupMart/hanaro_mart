import { SET_LEAFLET, SET_PRODUCT } from "@actions/flyer";

const initialState = {
  leaflet: null,
  product: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LEAFLET:
      return {
        ...state,
        leaflet: action.leaflet,
      };
    case SET_PRODUCT:
      return {
        ...state,
        product: action.product,
      };
  }

  return state;
};
