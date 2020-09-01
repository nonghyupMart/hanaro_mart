import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons, Entypo } from "@expo/vector-icons";
import colors from "@constants/colors";

const CustomHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Entypo}
      iconSize={27}
      color={colors.greyishBrown}
    />
  );
};

export default CustomHeaderButton;
