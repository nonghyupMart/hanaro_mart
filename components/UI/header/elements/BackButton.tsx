import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";
import React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { navigationRef } from "../../../../navigation/RootNavigation";
import { fetchPushCnt, getWishCnt } from "../../../../store/actions/auth";
import * as CommonActions from "../../../../store/actions/common";
import HeaderButton from "./HeaderButton";

const BackButton = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const route = navigationRef.getCurrentRoute();
  const userStore = useAppSelector((state) => state.auth.userStore);
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  return (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        style={{ marginLeft: -15 }}
        IconComponent={Entypo}
        iconSize={27}
        title="back"
        iconName="chevron-thin-left"
        onPress={() => {
          switch (route?.name) {
            case "Notification":
              if (!_.isEmpty(userInfo)) {
                dispatch(fetchPushCnt({ user_cd: userInfo!.user_cd }));
              }
              break;
            case "WishProduct":
              if (!_.isEmpty(userInfo) && !_.isEmpty(userStore)) {
                dispatch(
                  getWishCnt({
                    user_cd: userInfo!.user_cd,
                    store_cd: userStore!.storeInfo.store_cd,
                  })
                );
              }
              break;
          }
          dispatch(CommonActions.setIsLoading(false));

          navigation.goBack();
        }}
      />
    </HeaderButtons>
  );
};
export default BackButton;
