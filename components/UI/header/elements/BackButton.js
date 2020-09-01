import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { DetailHeaderButton } from "@UI/header";
import { setBottomNavigation } from "@actions/auth";
import colors from "@constants/colors";

const BackButton = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <HeaderButtons HeaderButtonComponent={DetailHeaderButton}>
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
