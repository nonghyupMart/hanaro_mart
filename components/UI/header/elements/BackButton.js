import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
// import { HeaderButton } from "react-navigation-header-buttons";
import { HeaderButton } from "../../../../components/UI/header/elements/HeaderButton";
import * as CommonActions from "../../../../store/actions/common";
import colors from "../../../../constants/Colors";
import { Entypo } from "@expo/vector-icons";
import { useNavigationState } from "@react-navigation/native";
import { setPreview, updateUserInfo } from "../../../../store/actions/auth";

const BackButton = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const navigationState = useNavigationState((state) => state);
  const index = useNavigationState((state) => state.index);
  const pushToken = useSelector((state) => state.auth.pushToken);
  const userInfo = useSelector((state) => state.auth.userInfo);
  return (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        IconComponent={Entypo}
        iconSize={27}
        title="back"
        iconName="chevron-thin-left"
        onPress={() => {
          switch (navigationState.routes[index].name) {
            case "Agreement":
              return dispatch(setPreview(true));
              break;
            case "Notification":
              // TODO: 푸시 카운트만 호출하는 api로 교체 필요
              updateUserInfo(dispatch, userInfo, pushToken);
              break;
          }

          dispatch(CommonActions.setIsLoading(false));
          if (index > 0) navigation.goBack();
          else navigation.navigate("Home");
        }}
      />
    </HeaderButtons>
  );
};
export default BackButton;
