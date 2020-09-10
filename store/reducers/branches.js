import {
  SET_ADDRESS1,
  SET_ADDRESS2,
  SET_BRANCHES,
  SET_BRANCH,
} from "@actions/branches";

const initialState = {
  address1: null,
  address2: null,
  branches: null,
  branch: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ADDRESS1:
      return {
        ...state,
        address1: action.address1,
      };
    case SET_ADDRESS2:
      return {
        ...state,
        address2: action.address2,
      };
    case SET_BRANCHES:
      return {
        ...state,
        branches: action.branches,
      };
    case SET_BRANCH:
      return {
        ...state,
        branch: action.branch,
      };
  }

  return state;
};
