import React from "react";
import styled from "styled-components/native";
import { View, Image } from "react-native";
import { BaseText, SCREEN_WIDTH } from "../../UI/BaseUI";
import _ from "lodash";
import { LinearGradient } from "expo-linear-gradient";
import UserName from "../../UI/UserName";
import UserPhoneNumber from "../../UI/UserPhoneNumber";
import * as Util from "../../../util";

const MemberInfo = (props) => {
  return (
    <MemberInfoContainer>
      <MemberContainer>
        {/* <Text1>회원번호</Text1> */}
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
      </MemberContainer>
    </MemberInfoContainer>
  );
};
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
  color: colors.black,
  marginRight: 5,
  height: 28,
  lineHeight: 28,
  fontFamily: "CustomFont-Bold",
});
const Text3 = styled(BaseText)({
  fontSize: 12,
  color: colors.black,
  fontFamily: "CustomFont-Bold",
});
const Text4 = styled(BaseText)({
  fontSize: 16,
  color: colors.pine,
  lineHeight: 18,
});

const MemberInfoContainer = styled.View({
  // marginTop: Constants.statusBarHeight,
  backgroundColor: colors.trueWhite,
  paddingRight: 16,
  paddingLeft: 21,
  // paddingBottom: 10,
  paddingTop: 0,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
});
const MemberContainer = styled.View({});
const GradientBar = styled(LinearGradient)({
  height: 6,
});
GradientBar.defaultProps = {
  colors: [colors.pine, colors.cerulean],
  start: { x: -1, y: 0 },
  end: { x: 1, y: 0 },
};

export default MemberInfo;
