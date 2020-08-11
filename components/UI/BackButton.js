import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "./HeaderButton";
import { setBottomNavigation } from "../../store/actions/auth";

const BackButton = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title="Menu"
        iconName="ios-arrow-back"
        onPress={() => {
          dispatch(setBottomNavigation(true));
          navigation.goBack();
        }}
      />
    </HeaderButtons>
  );
};
export default BackButton;
