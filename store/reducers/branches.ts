import * as actionTypes from "../actions/actionTypes";

export const initialState = {
  address1: null,
  address2: null,
  branches: null,
  branch: null,
  storeMark: null,
};

export default (state = initialState, action) => {
  let branches;
  switch (action.type) {
    case actionTypes.SET_ADDRESS1:
      return {
        ...state,
        address1: { ...action.address1 },
      };
    case actionTypes.SET_ADDRESS2:
      return {
        ...state,
        address2: { ...action.address2 },
      };
    case actionTypes.SET_BRANCHES:
      return {
        ...state,
        branches: { ...action.branches },
      };
    case actionTypes.SET_BRANCHES_MORE:
      branches = { ...state.branches };
      let newBranches = { ...action.branches };
      let updatedStoreList = branches.storeList.concat(newBranches.storeList);

      branches.storeList = updatedStoreList;

      return {
        ...state,
        branches: branches,
      };

    case actionTypes.SET_BRANCH:
      return {
        ...state,
        branch: { ...action.branch },
      };
    case actionTypes.SET_STORE_MARK:
      return {
        ...state,
        storeMark: { ...action.storeMark },
      };
    default:
      return state;
  }
  return state;
};
