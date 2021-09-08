import React from "react";
import { useAppSelector } from "../../hooks";
import { formatPhoneNumber } from "../../utils";

const UserPhoneNumber = () => {
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  return (
    <>
      {userInfo?.user_id
        ? formatPhoneNumber(userInfo.user_id)
        : "000-0000-0000"}
    </>
  );
};
export default UserPhoneNumber;
