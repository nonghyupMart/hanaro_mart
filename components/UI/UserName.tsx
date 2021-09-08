import React from "react";
import { useAppSelector } from "../../hooks";

const UserName = () => {
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  // Util.log(userInfo);
  return (
    <>
      {userInfo?.user_name ? userInfo.user_name : "고객"}
    </>
  );
};
export default UserName;
