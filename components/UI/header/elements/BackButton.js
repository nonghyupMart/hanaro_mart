import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
// import { HeaderButton } from "react-navigation-header-buttons";
import { HeaderButton } from "@UI/header/elements/HeaderButton";
import * as CommonActions from "@actions/common";
import colors from "@constants/colors";
import { Entypo } from "@expo/vector-icons";
import { useNavigationState } from "@react-navigation/native";

const BackButton = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const index = useNavigationState((state) => state.index);
  return (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        IconComponent={Entypo}
        iconSize={27}
        title="back"
        iconName="chevron-thin-left"
        onPress={() => {
          dispatch(CommonActions.setIsLoading(false));
          if (index > 0) navigation.goBack();
          else navigation.navigate("Home");
        }}
      />
    </HeaderButtons>
  );
};
export default BackButton;
