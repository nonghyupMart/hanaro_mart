import Address1 from "@models/address1";
export const ADD_ADDRESS1 = "ADD_ADDRESS1";

export const fetchAddress1 = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch("http://dv-www.hanaromartapp.com/api/lname");

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      const loadedAddress1 = [];

      for (const key in resData.data.lnameList) {
        loadedAddress1.push(new Address1(resData.data.lnameList[key].lname));
      }

      dispatch({ type: ADD_ADDRESS1, address1: loadedAddress1 });
    } catch (err) {
      throw err;
    }
  };
};
