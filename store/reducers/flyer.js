import {
  SET_LEAFLET,
  SET_PRODUCT,
  SET_PRODUCT_MORE,
  SET_SEARCHED_PRODUCT,
  SET_SEARCHED_PRODUCT_MORE,
  SET_LEAFLET_DETAIL,
  SET_PRODUCT_DETAIL,
} from "@actions/flyer";

const initialState = {
  leaflet: null,
  leafletDetail: null,
  product: null,
  productDetail: null,
  searchedProduct: null,
};

export default (state = initialState, action) => {
  let product, newEvent, updatedProductList, searchedProduct;

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

    case SET_PRODUCT_MORE:
      product = { ...state.product };
      newEvent = { ...action.product };
      updatedProductList = product.productList.concat(newEvent.productList);

      searchedProduct.productList = updatedProductList;
      return {
        ...state,
        product: product,
      };

    case SET_SEARCHED_PRODUCT:
      return {
        ...state,
        searchedProduct: { ...action.product },
      };
    case SET_SEARCHED_PRODUCT_MORE:
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

    case SET_PRODUCT_DETAIL:
      return {
        ...state,
        productDetail: { ...action.productDetail },
      };

    default:
      return state;
  }

  return state;
};
