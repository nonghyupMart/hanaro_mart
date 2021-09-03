import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import colors from "../../../../constants/Colors";

const CustomHeaderButton = (props: any) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={props.IconComponent ? props.IconComponent : Ionicons}
      iconSize={props.iconSize ? props.iconSize : 27}
      color={props.color ? props.color : colors.GREYISH_BROWN}
    />
  );
};

export default CustomHeaderButton;
