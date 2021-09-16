import * as actionTypes from "../actions/actionTypes";

export const initialState = {
  wishItem: null,
};

export default (state = initialState, action) => {
  let wishItem, newWishItem, updatedWishItemList;

  switch (action.type) {
    case actionTypes.SET_WISH_ITEM:
      return {
        ...state,
        wishItem: { ...action.data },
      };

    case actionTypes.SET_WISH_ITEM_MORE:
      wishItem = { ...state.wishItem };
      newWishItem = { ...action.data };
      updatedWishItemList = wishItem.productList.concat(
        newWishItem.productList
      );

      wishItem.productList = updatedWishItemList;
      return {
        ...state,
        wishItem: wishItem,
      };

    default:
      return state;
  }

  return state;
};
