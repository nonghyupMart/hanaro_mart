import React from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
const UserName = (props) => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  // console.warn(userInfo);
  return (
    <>
      {!_.isEmpty(userInfo) && userInfo.user_name ? userInfo.user_name : "고객"}
    </>
  );
};
export default UserName;
