import { ADD_ADDRESS1 } from "@actions/branches";

const initialState = {
  address1: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ADDRESS1:
      return {
        address1: action.address1,
      };
  }

  return state;
};
