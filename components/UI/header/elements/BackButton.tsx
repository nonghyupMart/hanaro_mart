import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
// import { HeaderButton } from "react-navigation-header-buttons";
import { HeaderButton } from "./HeaderButton";
import * as CommonActions from "../../../../store/actions/common";
import colors from "../../../../constants/Colors";
import { Entypo } from "@expo/vector-icons";
import { useNavigationState } from "@react-navigation/native";
import { fetchPushCnt, getWishCnt } from "../../../../store/actions/auth";
import _ from "lodash";

const BackButton = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const navigationState = useNavigationState((state) => state);
  const index = useNavigationState((state) => state.index);
  const userStore = useSelector((state) => state.auth.userStore);
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
            case "Notification":
              if (!_.isEmpty(userInfo)) {
                dispatch(fetchPushCnt({ user_cd: userInfo.user_cd }));
              }
              break;
            case "WishProduct":
              if (!_.isEmpty(userInfo) && !_.isEmpty(userStore)) {
                dispatch(
                  getWishCnt({
                    user_cd: userInfo.user_cd,
                    store_cd: userStore.storeInfo.store_cd,
                  })
                );
              }
              break;
          }
          dispatch(CommonActions.setIsLoading(false));
          if (index > 0) navigation.pop();
          else navigation.navigate("Home");
        }}
      />
    </HeaderButtons>
  );
};
export default BackButton;
