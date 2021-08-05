import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import {
  View,
  Text,
  StyleSheet,
  BackHandler,
  TouchableOpacity,
} from "react-native";
import { BackButton, TextTitle } from "../components/UI/header";
import { BaseTextInput, BaseButton, BaseText } from "../components/UI/BaseUI";
import { useSelector, useDispatch } from "react-redux";
import BaseScreen from "../components/BaseScreen";
import * as RootNavigation from "../navigation/RootNavigation";
import colors from "../constants/Colors";
import { setAlert, setIsLoading } from "../store/actions/common";
import * as authActions from "../store/actions/auth";
import _ from "lodash";
import * as Util from "../util";

const LoginScreen = (props) => {
  const dispatch = useDispatch();
  const userStore = useSelector((state) => state.auth.userStore);
  const pushToken = useSelector((state) => state.auth.pushToken);
  const [intg_id, setIntg_id] = useState("");
  const [intg_pwd, setIntg_pwd] = useState("");

  // "intg_id":"hanaroapp911","intg_pwd":"doollee1!"
  const login = async () => {
    if (intg_id.length <= 0) {
      return showAlert("아이디를 입력해 주세요.");
    }
    if (intg_pwd.length <= 0) {
      return showAlert("패스워드를 입력해 주세요.");
    }
    await dispatch(
      authActions.loginWithID({
        intg_id,
        intg_pwd: Util.encrypt(intg_pwd),
        store_cd: userStore.storeInfo.store_cd,
        token: pushToken,
      })
    );
  };

  const showAlert = (msg) => {
    return dispatch(
      setAlert({
        message: msg,
        onPressConfirm: async () => {
          await dispatch(setAlert(null));
        },
      })
    );
  };

  return (
    <BaseScreen
      isPadding={false}
      style={{
        backgroundColor: colors.TRUE_WHITE,
      }}
      contentStyle={{
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 0,
        paddingBottom: 0,
        backgroundColor: colors.TRUE_WHITE,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Logo source={require("../assets/images/hanaromart.png")} />
      <TextInput
        placeholder="아이디"
        value={intg_id}
        onChangeText={(text) => setIntg_id(text)}
      />
      <TextInput
        placeholder="비밀번호"
        autoCompleteType="password"
        textContentType="password"
        secureTextEntry={true}
        value={intg_pwd}
        onChangeText={(text) => setIntg_pwd(text)}
      />
      <RoundButton onPress={() => login()}>통합회원 로그인</RoundButton>
      <UtilContainer>
        <SimpleButton
          onPress={() => props.navigation.navigate("CI", { ver: "searchId" })}
        >
          아이디 찾기
        </SimpleButton>
        <SimpleButton
          onPress={() => props.navigation.navigate("NHAHM", { regiDesc: "03" })}
        >
          비밀번호 찾기
        </SimpleButton>
        <SimpleButton
          style={{ borderRightWidth: 0 }}
          onPress={() => props.navigation.navigate("NHAHM", { regiDesc: "01" })}
        >
          회원가입
        </SimpleButton>
      </UtilContainer>
      <RoundButton2 onPress={() => props.navigation.navigate("CI")}>
        휴대폰 로그인
      </RoundButton2>
    </BaseScreen>
  );
};

const SimpleButton = (props) => {
  return (
    <TouchableOpacity
      {...props}
      style={[
        {
          paddingLeft: 14,
          paddingRight: 14,
          borderColor: colors.WARM_GREY_FOUR,
          borderRightWidth: 1,
          height: 16,
          alignItems: "center",
          justifyContent: "center",
        },
        props.style,
      ]}
    >
      <BaseText
        style={{
          fontSize: 14,
          letterSpacing: -0.28,
          color: colors.GREYISH_BROWN,
          fontFamily: "Roboto-Medium",
        }}
      >
        {props.children}
      </BaseText>
    </TouchableOpacity>
  );
};

const UtilContainer = styled.View({
  flexDirection: "row",
  marginTop: 28.5,
  marginBottom: 50.2,
});

const RoundButton2 = styled(BaseButton).attrs((props) => ({
  textStyle: [
    styles.font,
    {
      color: colors.EMERALD,
    },
  ],
}))({
  width: "100%",
  borderColor: colors.EMERALD,
  backgroundColor: "white",
  borderWidth: 1.5,
  aspectRatio: 100 / 14.092,
  borderRadius: 47,
});

const RoundButton = styled(BaseButton).attrs((props) => ({
  textStyle: [styles.font, {}],
}))({
  width: "100%",
  backgroundColor: colors.EMERALD,
  aspectRatio: 100 / 14.092,
  borderRadius: 47,
  marginTop: 30,
});

const TextInput = styled(BaseTextInput)({
  borderColor: colors.GREYISH_THREE,
  borderRadius: 7,
  borderWidth: 1.5,
  width: "100%",
  fontSize: 17.5,
  letterSpacing: -0.35,
  paddingLeft: 23.5,
  paddingTop: 10.5,
  paddingBottom: 10.5,
  marginBottom: 10,
});
const Logo = styled.Image({ marginTop: 109.7, marginBottom: 87.1 });
const Container = styled.View({
  justifyContent: "center",
  alignItems: "center",
  paddingLeft: 20,
  paddingRight: 20,
  width: "100%",
});

export const screenOptions = ({ navigation }) => {
  return {
    title: "",
    headerLeft: (props) => <BackButton {...props} />,
    headerTitle: (props) => <></>,
    headerRight: (props) => <></>,
  };
};
const styles = StyleSheet.create({
  font: {
    fontSize: 17.5,
    fontFamily: "Roboto-Medium",
    letterSpacing: -0.35,
  },
});
export default LoginScreen;
