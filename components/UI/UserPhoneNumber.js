import React from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { formatPhoneNumber } from "../../utils";
const UserPhoneNumber = (props) => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  return (
    <>
      {!_.isEmpty(userInfo) && userInfo.user_id
        ? formatPhoneNumber(userInfo.user_id)
        : "000-0000-0000"}
    </>
  );
};
export default UserPhoneNumber;
