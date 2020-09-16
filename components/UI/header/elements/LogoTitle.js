import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Image, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as RootNavigation from "@navigation/RootNavigation";
import { BaseTouchable } from "@UI/BaseUI";

const LogoTitle = (props, { navigation }) => {
  const userStore = useSelector((state) => state.auth.userStore);

  return (
    <TouchableOpacity onPress={() => RootNavigation.navigate("Home")}>
      <Container>
        <Image source={require("@images/hanalogo_off.png")} />
        {userStore && <BranchName>{userStore.store_nm}</BranchName>}
      </Container>
    </TouchableOpacity>
  );
};

const Container = styled.View({
  flex: 1,
  alignSelf: "center",
  alignItems: "center",
  justifyContent: "center",
});
const BranchName = styled.Text({
  fontSize: 15,
  fontWeight: "bold",
  fontStyle: "normal",
  letterSpacing: 0,
  textAlign: "left",
  color: colors.appleGreen,
});
BranchName.defaultProps = {
  numberOfLines: 1,
};
export default LogoTitle;
