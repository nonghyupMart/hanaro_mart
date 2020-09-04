import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { HeaderButton } from "react-navigation-header-buttons";
import { DetailHeaderButton } from "@UI/header/elements/DetailHeaderButton";
import { setBottomNavigation } from "@actions/auth";
import colors from "@constants/colors";

import { Entypo } from "@expo/vector-icons";

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

const BackButton = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title="back"
        iconName="chevron-thin-left"
        onPress={() => {
          dispatch(setBottomNavigation(true));
          navigation.goBack();
        }}
      />
    </HeaderButtons>
  );
};
export default BackButton;
