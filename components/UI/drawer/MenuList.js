import React, { useState, useRef } from "react";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import {
  Animated,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import {
  BaseTouchable,
  SCREEN_WIDTH,
  BaseButtonContainer,
  SCREEN_HEIGHT,
  BaseText,
} from "../../UI/BaseUI";
import _ from "lodash";
import * as Util from "../../../util";
import * as Linking from "expo-linking";

const MenuList = (props) => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const userStore = useSelector((state) => state.auth.userStore);
  const isJoin = useSelector((state) => state.auth.isJoin);
  const [isShow, setIsShow] = useState(false);
  const aniView = useRef(null);
  const [bounceValue, setBounceValue] = useState(new Animated.Value(-30));
  return (
    <MenuContainer>
      <MenuButtonContainer>
        <MenuButton
          onPress={() => {
            props.navigation.navigate("StoreChange");
          }}
        >
          <IconImage source={require("../../../assets/images/g2.png")} />

          <MenuText>매장설정</MenuText>
        </MenuButton>
      </MenuButtonContainer>
      <MenuButtonContainer>
        <MenuButton
          onPress={() => {
            var toValue = -30;

            if (!isShow) {
              toValue = 0;
            } else {
              toValue = -30;
            }

            Animated.spring(bounceValue, {
              toValue: toValue,
              useNativeDriver: true,
            }).start();
            setIsShow(!isShow);
          }}
          activeOpacity={1}
        >
          <IconImage source={require("../../../assets/images/g4.png")} />

          <MenuText>공지사항</MenuText>
          <OpenButton>
            {!isShow && (
              <IconImage
                source={require("../../../assets/images/ic_next.png")}
              />
            )}
            {isShow && (
              <IconImage
                source={require("../../../assets/images/ic_next2.png")}
              />
            )}
          </OpenButton>
        </MenuButton>
      </MenuButtonContainer>
      {isShow && (
        <Animated.View style={[{ transform: [{ translateY: bounceValue }] }]}>
          <SubMenu
            onPress={() => {
              if (_.isEmpty(userStore) || !userStore.storeInfo)
                return props.navigation.navigate("Empty");
              props.navigation.navigate("Notice", { type: "H" });
            }}
          >
            <AnimatableView ref={aniView}>
              <Image
                source={require("../../../assets/images/line1.png")}
                style={{ width: Util.normalize(7) }}
              />
              <SubMenuText>통합 공지사항</SubMenuText>
            </AnimatableView>
          </SubMenu>
          <SubMenu
            onPress={() => {
              if (_.isEmpty(userStore) || !userStore.storeInfo)
                return props.navigation.navigate("Empty");
              props.navigation.navigate("Notice");
            }}
          >
            <AnimatableView animation="slideInDown">
              <Image
                source={require("../../../assets/images/line1.png")}
                style={{ width: Util.normalize(7) }}
              />
              <SubMenuText>매장 공지사항</SubMenuText>
            </AnimatableView>
          </SubMenu>
        </Animated.View>
      )}
      <MenuButtonContainer>
        <MenuButton
          onPress={() => {
            if (_.isEmpty(userStore) || !userStore.storeInfo || !isJoin)
              return props.navigation.navigate("Empty");
            props.navigation.navigate("Inquiry");
          }}
        >
          <IconImage source={require("../../../assets/images/g11.png")} />

          <MenuText>1:1 문의</MenuText>
        </MenuButton>
      </MenuButtonContainer>
      <MenuButtonContainer style={{ borderBottomWidth: 0 }}>
        <MenuButton
          onPress={() => {
            if (_.isEmpty(userStore) || !userStore.storeInfo || !isJoin)
              return props.navigation.navigate("Empty");
            props.navigation.navigate("MyPage");
          }}
        >
          <IconImage source={require("../../../assets/images/g12.png")} />

          <MenuText>마이페이지</MenuText>
        </MenuButton>
      </MenuButtonContainer>
      <MenuButtonContainer style={{ borderBottomWidth: 0 }}>
        <MenuButton
          onPress={() => {
            if (_.isEmpty(userStore)) return RootNavigation.navigate("Empty");
            Linking.openURL("tel:" + userStore.storeInfo.support_tel);
          }}
        >
          <IconImage
            source={require("../../../assets/images/local_phone_off.png")}
          />

          <MenuText>매장 전화</MenuText>
        </MenuButton>
      </MenuButtonContainer>
      <ShareBtn onPress={() => Util.sendShareLink(userInfo.recommend)}>
        <Image
          source={require("../../../assets/images/bt_heart.png")}
          resizeMode="contain"
          style={{
            width: Util.normalize(190),
          }}
        />
      </ShareBtn>
    </MenuContainer>
  );
};
const AnimatableView = styled(Animated.View)({
  flexDirection: "row",
  alignItems: "center",
});
const SubMenu = styled(TouchableOpacity).attrs({ activeOpacity: 0.8 })({
  flexDirection: "row",
  alignItems: "center",
  marginLeft: Util.normalize(62.5),
  marginBottom: 6.5,
  marginTop: 4.5,
});
const SubMenuText = styled(BaseText)({
  fontSize: Util.normalize(11.5),
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 15.5,
  letterSpacing: -0.7,
  textAlign: "left",
  color: colors.warmGrey,
  marginLeft: 5.5,
});
const OpenButton = styled.View({
  marginRight: 27,
});
const ShareBtn = styled.TouchableOpacity({
  marginTop: Util.normalize(37.5),
  marginBottom: Util.normalize(19.9),
  justifyContent: "center",
  marginLeft: -2,

  alignItems: "center",
});
const MenuContainer = styled.View({
  paddingTop: Util.normalize(28.9),
  backgroundColor: colors.trueWhite,
});
const MenuButtonContainer = styled.View({
  flexDirection: "row",
  alignItems: "center",
});
const MenuText = styled(BaseText)({
  fontSize: Util.normalize(14),
  fontWeight: "normal",
  fontStyle: "normal",
  letterSpacing: 0,
  textAlign: "left",
  color: colors.greyishBrownTwo,
  marginLeft: Util.normalize(15),
  flex: 1,
});
const MenuButton = styled(BaseTouchable)({
  flexDirection: "row",
  alignItems: "center",
  marginTop: Util.normalize(9.0),
  marginBottom: Util.normalize(9.0),
  flex: 1,
  paddingLeft: 24,
});

const IconImage = styled.Image({
  width: Util.normalize(25),
  resizeMode: Platform.OS == "ios" ? "contain" : "cover",
});

export default MenuList;
