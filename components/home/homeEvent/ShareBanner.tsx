import React from "react";
import { Image, Platform, TouchableOpacity } from "react-native";
import colors from "../../../constants/Colors";
import { useAppSelector } from "../../../hooks";
import * as Util from "../../../utils";

const ShareBanner = () => {
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  return (
    <TouchableOpacity
      key="inviteFriends"
      activeOpacity={0.8}
      onPress={Util.sendShareLink.bind(
        this,
        userInfo ? userInfo.recommend : null
      )}
    >
      <Image
        source={require("../../../assets/images/event_banner.png")}
        style={{
          width: "100%",
          height: "100%",
          backgroundColor:
            Platform.OS === "android" ? colors.WHITE : "transparent",
        }}
        defaultSource={require("../../../assets/images/b_img500.png")}
        resizeMode="stretch"
      />
    </TouchableOpacity>
  );
};
export default React.memo(ShareBanner);
