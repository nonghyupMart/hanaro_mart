import React from "react";
import { Platform, TouchableOpacity } from "react-native";
import { CATEGORY } from "../../../constants";
import colors from "../../../constants/Colors";
import { useAppDispatch } from "../../../hooks";
import * as RootNavigation from "../../../navigation/RootNavigation";
import * as CommonActions from "../../../store/actions/common";
import { BaseImage, SCREEN_WIDTH } from "../../UI/BaseUI";

const BannerItem = ({ item }) => {
  const dispatch = useAppDispatch();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      key={item.event_cd}
      onPress={async () => {
        await dispatch(
          CommonActions.setLink({
            category: CATEGORY["E"],
            link_code: item.event_cd,
          })
        );
        await RootNavigation.navigate("Event", {
          event_cd: item.event_cd,
        });
      }}
      style={{
        aspectRatio: 1 / 0.34756097560976,
        width: SCREEN_WIDTH - 48,
      }}
    >
      <BaseImage
        style={{
          aspectRatio: 1 / 0.34756097560976,
          width: SCREEN_WIDTH - 48,
          borderRadius: 10,
          overflow: "hidden",
          backgroundColor:
            Platform.OS === "android" ? colors.WHITE : "transparent",
        }}
        resizeMode="cover"
        source={item.title_img}
        defaultSource={require("../../../assets/images/b_img500.png")}
      />
    </TouchableOpacity>
  );
};

export default BannerItem;