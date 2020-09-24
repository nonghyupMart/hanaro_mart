import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import { Image, View, ActivityIndicator } from "react-native";

import * as authActions from "@actions/auth";
import AsyncStorage from "@react-native-community/async-storage";

const StartupScreen = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const userStoreData = await AsyncStorage.getItem("userStoreData");
      dispatch(authActions.setUserStore(JSON.parse(userStoreData)));

      const userInfoData = await AsyncStorage.getItem("userInfoData");
      const parsedUserData = JSON.parse(userInfoData);
      dispatch(authActions.setUserInfo(parsedUserData));
      if (parsedUserData && parsedUserData.user_id)
        dispatch(authActions.setIsJoin(true));
      else dispatch(authActions.setIsJoin(false));

      const agreedStatusData = await AsyncStorage.getItem("AgreedStatusData");
      dispatch(authActions.setAgreedStatus(JSON.parse(agreedStatusData)));

      dispatch(authActions.setDidTryAL());
    })();
  }, [dispatch]);
  return (
    <Container>
      <BgImage
        source={require("@images/img1242x2436.png")}
        resizeMode="cover"
      />
      <ActivityIndicator
        size="large"
        color={colors.cerulean}
        style={{ position: "absolute", width: "100%", height: "100%" }}
      />
    </Container>
  );
};
const BgImage = styled.Image({ width: "100%", height: "100%" });
const Container = styled.View({
  width: "100%",
  height: "100%",
});
export default StartupScreen;
