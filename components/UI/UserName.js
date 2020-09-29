import React from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
const UserName = (props) => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  return <>{!_.isEmpty(userInfo) && userInfo.name ? userInfo.name : "고객"}</>;
};
export default UserName;