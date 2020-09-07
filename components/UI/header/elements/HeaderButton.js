import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons, Entypo } from "@expo/vector-icons";
import colors from "@constants/colors";

const CustomHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={props.IconComponent ? props.IconComponent : Ionicons}
      iconSize={props.iconSize ? props.iconSize : 27}
      color={props.color ? props.color : colors.greyishBrown}
    />
  );
};

export default CustomHeaderButton;
