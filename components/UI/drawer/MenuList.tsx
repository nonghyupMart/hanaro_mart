import _ from "lodash";
import React, { useRef, useState } from "react";
import {
  Animated, Image,
  Platform, TouchableOpacity
} from "react-native";
import styled from "styled-components/native";
import colors from "../../../constants/Colors";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  checkAuth, checkSetStore, withdrawalFinish
} from "../../../store/actions/auth";
import * as Util from "../../../utils";
import {
  BaseText, BaseTouchable
} from "../BaseUI";

const MenuList = (props) => {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const userStore = useAppSelector((state) => state.auth.userStore);
  const isJoined = useAppSelector((state) => state.auth.isJoined);
  const [isShow, setIsShow] = useState(false);
  const aniView = useRef(null);
  const [bounceValue, setBounceValue] = useState(new Animated.Value(-30));
  return (
    <MenuContainer>
      <MenuButtonContainer>
        <MenuButton onPress={() => props.navigation.navigate("StoreChange")}>
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
            onPress={async () => {
              if (await checkSetStore(dispatch, userStore)) {
                props.navigation.navigate("Notice");
              }
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
          onPress={async () => {
            if (await checkAuth(dispatch, isJoined)) {
              props.navigation.navigate("Inquiry");
            }
          }}
        >
          <IconImage source={require("../../../assets/images/g11.png")} />

          <MenuText>1:1 문의</MenuText>
        </MenuButton>
      </MenuButtonContainer>
      <MenuButtonContainer style={{ borderBottomWidth: 0 }}>
        <MenuButton
          onPress={async () => {
            if (await checkAuth(dispatch, isJoined)) {
              props.navigation.navigate("MyPage");
            }
          }}
        >
          <IconImage source={require("../../../assets/images/g12.png")} />

          <MenuText>마이페이지</MenuText>
        </MenuButton>
      </MenuButtonContainer>
      <MenuButtonContainer style={{ borderBottomWidth: 0 }}>
        <MenuButton
          onPress={async () => {
            if (await checkAuth(dispatch, isJoined)) {
              props.navigation.navigate("WishProduct");
            }
          }}
        >
          <IconImage
            source={require("../../../assets/images/ic_heart_white.png")}
          />

          <MenuText>찜한 상품 목록</MenuText>
        </MenuButton>
      </MenuButtonContainer>
      <BottomContainer>
        {!_.isEmpty(userInfo) && (
          <LogoutTouchable
            onPress={() => {
              props.navigation.closeDrawer();
              dispatch(withdrawalFinish());
            }}
          >
            <LogoutText>로그아웃하기</LogoutText>
            <Image
              source={require("../../../assets/images/ic_logout.png")}
              resizeMode="contain"
              style={{
                width: Util.normalize(25),
              }}
            />
          </LogoutTouchable>
        )}
        <ShareBtn onPress={Util.sendShareLink.bind(this, userInfo?.recommend)}>
          <Image
            source={require("../../../assets/images/bt_heart.png")}
            resizeMode="contain"
            style={{ width: Util.normalize(169) }}
          />
        </ShareBtn>
      </BottomContainer>
    </MenuContainer>
  );
};
const BottomContainer = styled.View({
  marginTop: Util.normalize(37.5),
  marginBottom: Util.normalize(19.9),
  alignSelf: "center",
});
const LogoutText = styled(BaseText)({
  fontSize: 13,
  color: colors.GREYISH_BROWN_TWO,
  marginRight: 7.5,
});
const LogoutTouchable = styled.TouchableOpacity({
  flexDirection: "row",
  justifyContent: "flex-end",
  alignItems: "center",
  alignSelf: "flex-end",
  marginBottom: 13,
});
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
  color: colors.WARM_GREY,
  marginLeft: 5.5,
});
const OpenButton = styled.View({
  marginRight: 27,
});
const ShareBtn = styled.TouchableOpacity({
  justifyContent: "center",
  alignItems: "center",
});
const MenuContainer = styled.View({
  paddingTop: Util.normalize(28.9),
  backgroundColor: colors.TRUE_WHITE,
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
  color: colors.GREYISH_BROWN_TWO,
  marginLeft: Util.normalize(15),
  flex: 1,
});
const MenuButton = styled(BaseTouchable)({
  flexDirection: "row",
  alignItems: "center",
  marginTop: Util.normalize(9),
  marginBottom: Util.normalize(9),
  flex: 1,
  paddingLeft: 24,
});

const IconImage = styled.Image({
  width: Util.normalize(25),
  resizeMode: Platform.OS === "ios" ? "contain" : "cover",
});

export default MenuList;
