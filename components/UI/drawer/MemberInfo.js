import React from "react";
import styled from "styled-components/native";
import { View, Image } from "react-native";
import { BaseText, SCREEN_WIDTH } from "../../UI/BaseUI";
import _ from "lodash";
import { LinearGradient } from "expo-linear-gradient";
import UserName from "../../UI/UserName";
import UserPhoneNumber from "../../UI/UserPhoneNumber";
import * as Util from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";

const MemberInfo = (props) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);
  return (
    <MemberInfoContainer>
      <MemberContainer>
        {/* <Text1>회원번호</Text1> */}
        {!_.isEmpty(userInfo) && (
          <MemberID style={{ flexDirection: "row" }}>
            <Image
              source={require("../../../assets/images/ic_user.png")}
              style={{
                width: Util.normalize(33.6),
                resizeMode: "contain",
              }}
            />
            <View style={{ marginLeft: 12.7 }}>
              <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                <Text2>
                  <UserName />
                </Text2>
                <Text3>님</Text3>
              </View>
              <Text4>
                <UserPhoneNumber />
              </Text4>
            </View>
          </MemberID>
        )}
        {_.isEmpty(userInfo) && (
          <TouchableOpacity
            activeOpacity={0.8}
            style={{ flexGrow: 1 }}
            onPress={async () => {
              await props.navigation.closeDrawer();
              await props.navigation.navigate("Login");
            }}
          >
            <MemberID style={{ flexDirection: "row" }}>
              <Image
                source={require("../../../assets/images/ic_user.png")}
                style={{
                  width: Util.normalize(33.6),
                  resizeMode: "contain",
                }}
              />
              <BeforeJoinContainer>
                <View>
                  <Text5>로그인 및 통합회원가입</Text5>
                  <Text6>더 많은 혜택을 받아가세요</Text6>
                </View>
                <Image
                  style={{ flexShrink: 0, width: Util.normalize(11.8) }}
                  resizeMode="contain"
                  source={require("../../../assets/images/chevron-thin.png")}
                />
              </BeforeJoinContainer>
            </MemberID>
          </TouchableOpacity>
        )}
      </MemberContainer>
    </MemberInfoContainer>
  );
};
const BeforeJoinContainer = styled.View({
  flexDirection: "row",
  marginLeft: 12.7,
  alignItems: "center",
  marginRight: 8,
  flexShrink: 0,
  flexGrow: 1,
  justifyContent: "space-between",
});
const Text6 = styled(BaseText)({
  letterSpacing: -0.23,
  fontSize: Util.normalize(9),
});
const Text5 = styled(BaseText)({
  letterSpacing: -0.51,
  fontFamily: "Roboto-Medium",
  fontSize: Util.normalize(14),
  lineHeight: Util.normalize(23),
});
const MemberID = styled.View({
  alignItems: "center",
  marginTop: Util.normalize(46),
});
const Text1 = styled(BaseText)({
  fontSize: 12,
  color: "#b5b5b5",
  lineHeight: 14,
});
const Text2 = styled(BaseText)({
  fontSize: 21,
  color: colors.BLACK,
  marginRight: 5,
  height: 28,
  lineHeight: 28,
  fontFamily: "Roboto-Medium",
});
const Text3 = styled(BaseText)({
  fontSize: 12,
  color: colors.BLACK,
  fontFamily: "Roboto-Bold",
});
const Text4 = styled(BaseText)({
  fontSize: 16,
  color: colors.PINE,
  lineHeight: 18,
});

const MemberInfoContainer = styled.View({
  // marginTop: Constants.statusBarHeight,
  backgroundColor: colors.TRUE_WHITE,
  paddingRight: 16,
  paddingLeft: 21,
  // paddingBottom: 10,
  paddingTop: 0,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
});
const MemberContainer = styled.View({ width: "100%" });
const GradientBar = styled(LinearGradient)({
  height: 6,
});
GradientBar.defaultProps = {
  colors: [colors.PINE, colors.CERULEAN],
  start: { x: -1, y: 0 },
  end: { x: 1, y: 0 },
};

export default MemberInfo;
