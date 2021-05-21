import * as actionTypes from "../actions/actionTypes";

const initialState = {
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
      updatedWishItemList = wishItem.wishList.concat(newWishItem.wishList);

      wishItem.wishList = updatedWishItemList;
      return {
        ...state,
        wishItem: wishItem,
      };

    default:
      return state;
  }

  return state;
};
