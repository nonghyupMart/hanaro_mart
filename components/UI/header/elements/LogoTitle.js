import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Image, Text } from "react-native";
import { useDispatch } from "react-redux";
import * as RootNavigation from "@navigation/RootNavigation";
import { BaseTouchable } from "@UI/BaseUI";
import AsyncStorage from "@react-native-community/async-storage";
const LogoTitle = (props, { navigation }) => {
  // const [userStore, setUserStore] = useState();
  // useEffect(() => {
  //   (async () => {
  //     const userStoreData = await AsyncStorage.getItem("userStoreData");
  //     setUserStore(JSON.parse(userStoreData));
  //   })();
  // });

  return (
    <BaseTouchable onPress={() => RootNavigation.navigate("Home")}>
      <Container>
        <Image source={require("@images/hanalogo_off.png")} />
        {/* {userStore && <BranchName>{userStore.store_nm}</BranchName>} */}
      </Container>
    </BaseTouchable>
  );
};

const Container = styled.View({
  flex: 1,
  alignSelf: "center",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",
});
const BranchName = styled.Text({
  fontSize: 16,
  fontWeight: "500",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.appleGreen,
  marginLeft: 5.5,
  marginTop: 3.5,
});
export default LogoTitle;
