import * as actionTypes from "../actions/actionTypes";

const initialState = {
  leaflet: null,
  leafletDetail: null,
  product: null,
  productDetail: null,
  searchedProduct: null,
  carousel: null,
};

export default (state = initialState, action) => {
  let product, newEvent, updatedProductList, searchedProduct;

  switch (action.type) {
    case actionTypes.SET_CAROUSEL:
      return {
        ...state,
        carousel: action.carousel,
      };
    case actionTypes.SET_LEAFLET:
      return {
        ...state,
        leaflet: { ...action.leaflet },
      };
    case actionTypes.SET_LEAFLET_DETAIL:
      return {
        ...state,
        leafletDetail: { ...action.leafletDetail },
      };
    case actionTypes.SET_PRODUCT:
      return {
        ...state,
        product: { ...action.product },
      };

    case actionTypes.SET_PRODUCT_MORE:
      product = { ...state.product };
      newEvent = { ...action.product };
      updatedProductList = product.productList.concat(newEvent.productList);

      product.productList = updatedProductList;
      return {
        ...state,
        product: product,
      };

    case actionTypes.SET_SEARCHED_PRODUCT:
      return {
        ...state,
        searchedProduct: { ...action.product },
      };
    case actionTypes.SET_SEARCHED_PRODUCT_MORE:
      searchedProduct = { ...state.searchedProduct };
      newEvent = { ...action.product };
      updatedProductList = searchedProduct.productList.concat(
        newEvent.productList
      );

      searchedProduct.productList = updatedProductList;
      return {
        ...state,
        searchedProduct: searchedProduct,
      };

    case actionTypes.SET_PRODUCT_DETAIL:
      return {
        ...state,
        productDetail: { ...action.productDetail },
      };

    default:
      return state;
  }

  return state;
};
