import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  createStackNavigator,
  CardStyleInterpolators,
  HeaderStyleInterpolators,
} from "@react-navigation/stack";
import Constants from "expo-constants";

import { CheckBox } from "react-native-elements";

import { setPreview } from "@actions/auth";
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";
import * as Location from "expo-location";
import { getPermissionsAsync } from "expo-notifications";
import * as Animatable from "react-native-animatable";
import colors from "@constants/colors";

import BaseScreen from "@components/BaseScreen";
import {
  BaseButtonContainer,
  ButtonText,
  screenHeight,
  screenWidth,
  BaseText,
} from "@UI/BaseUI";

import {
  setPushToken,
  setAgreedStatus,
  saveAgreedStatusToStorage,
} from "@actions/auth";

import _ from "lodash";
import { setAlert, setIsLoading } from "@actions/common";
import * as Util from "@util";

const AgreementScreen = ({ navigation }) => {
  const [toggleAllheckBox, setToggleAllCheckBox] = useState(false);
  const isLoading = useSelector((state) => state.common.isLoading);
  const [checkBoxes, setCheckBoxes] = useState([
    {
      id: 0,
      isChecked: false,
      isOpen: false,
      isRequired: true,

      title: "농협 하나로마트앱 이용약관",
      content: () => (
        <ExtraBox>
          <SmallTextBold>이용목적</SmallTextBold>
          <SmallText>회원가입의 성립. 하나로마트앱 서비스 이용</SmallText>
          <SmallTextBold>수집항목</SmallTextBold>
          <SmallText>
            휴대폰번호, 본인인증 시 성명, 생년월일, 성별, 내외국인여부, CI
          </SmallText>
          <SmallTextBold>보유 및 이용기간</SmallTextBold>
          <SmallText style={styles.underline}>회원탈퇴 시</SmallText>
          <WarnText>
            ※ 고객님께서는 필수항목 수집·이용에 대한 동의를 거부할 권리가
            있습니다. 단, 필수항목 동의 거부 시에는 회원가입이 불가하며, 상기
            이용목적에 명시된 서비스는 받으실 수 없습니다.
          </WarnText>
        </ExtraBox>
      ),
    },
    {
      id: 1,
      isChecked: false,
      isOpen: false,
      isRequired: true,
      title: "개인정보의 필수적 수집,이용,제공,동의",
      child: [
        { id: 0, isChecked: false },
        { id: 1, isChecked: false },
      ],
      desc: () => (
        <Desc>
          <DescTextLine>
            <CircleCheckButton
              checked={checkBoxes[1].child[0].isChecked}
              onPress={() => setChecked(checkBoxes[1], checkBoxes[1].child[0])}
            />
            <DescText1>개인정보의 필수적 수집·이용 동의</DescText1>
          </DescTextLine>
          <DescTextLine>
            <CircleCheckButton
              checked={checkBoxes[1].child[1].isChecked}
              onPress={() => setChecked(checkBoxes[1], checkBoxes[1].child[1])}
            />
            <DescText1>개인정보의 필수적 제공동의</DescText1>
          </DescTextLine>
        </Desc>
      ),
      content: () => (
        <ExtraBox>
          <SmallTextBold>제공받는자</SmallTextBold>
          <SmallText style={styles.underline}>
            농협유통, 농협대전유통, 농협부산경남유통,
            농협충북유통,농협협동조합법에 의한 중앙회의 회원조합.
          </SmallText>
          <SmallTextBold>제공목적</SmallTextBold>
          <SmallText style={styles.underline}>
            회원가입의 성립.하나로마트앱 서비스 이용. 민원처리,사고조사 등을
            위한 원할한 의사소통 경로 확보.
          </SmallText>
          <SmallTextBold>제공항목</SmallTextBold>
          <SmallText>
            휴대폰번호, 14세 이상여부, 본인인증 시 성명, 생년월일, 성별,
            내외국인여부 , CI
          </SmallText>
          <SmallTextBold>보유 및 이용기간</SmallTextBold>
          <SmallText style={styles.underline}>회원탈퇴 시</SmallText>
          <WarnText>
            ※ 회원조합은 하나로마트앱을 통해 서비스를 제공하는 농협으로 선호매장
            관리에서 확인이 가능합니다.
          </WarnText>
          <WarnText style={{ marginTop: 20 }}>
            ※ 고객님께서는 필수항목 제공에 대한 동의를 거부할 권리가 있습니다.
            단, 필수항목 동의 거부 시에는 회원가입이 불가하며, 상기이용목적에
            명시된 서비스는 받으실 수 없습니다.
          </WarnText>
        </ExtraBox>
      ),
    },
    {
      id: 2,
      isChecked: false,
      isOpen: false,
      isRequired: true,
      isNormalTitle: true,
      title: "본인은 만 14세 이상입니다",
    },
    {
      id: 3,
      isChecked: false,
      isOpen: false,
      isRequired: false,
      title: "행사안내 및 이벤트 수신 동의",
      child: [
        { id: 0, isChecked: false },
        { id: 1, isChecked: false },
      ],
      desc: () => (
        <Desc>
          <DescTextLine>
            <CircleCheckButton
              checked={checkBoxes[3].child[0].isChecked}
              onPress={() => setChecked(checkBoxes[3], checkBoxes[3].child[0])}
            />
            <DescText1>개인정보의 선택적 수집·이용 동의</DescText1>
          </DescTextLine>
          <DescTextLine>
            <CircleCheckButton
              checked={checkBoxes[3].child[1].isChecked}
              onPress={() => setChecked(checkBoxes[3], checkBoxes[3].child[1])}
            />
            <DescText1>개인정보의 선택적 제공동의</DescText1>
          </DescTextLine>
          <GrayDesc>
            이벤트 수신동의를 하시면 할인쿠폰 등에 대한 정보를 받으실 수
            있습니다.
          </GrayDesc>
        </Desc>
      ),
      content: () => (
        <ExtraBox>
          <SmallTextBold>제공받는자</SmallTextBold>
          <SmallText style={styles.justUnderline}>
            농협유통, 농협대전유통, 농협부산경남유통, 농협충북유통,
            농업협동조합법에 의한 중앙회의 회원조합
          </SmallText>
          <SmallTextBold>제공목적</SmallTextBold>
          <SmallText style={styles.justUnderline}>
            상품 및 서비스 안내 또는 홍보(SMS, PUSH)
            회원의 혜택과 서비스개선을 위한 통계분석 및 연구조사
          </SmallText>
          <SmallTextBold>제공항목</SmallTextBold>
          <SmallText>
            휴대폰번호, 성명, 생년월일, 성별, 마케팅수신 동의여부
          </SmallText>
          <SmallTextBold>보유 및 이용기간</SmallTextBold>
          <SmallText style={styles.justUnderline}>
            회원탈퇴 또는 동의철회 시
          </SmallText>
          <WarnText>
            ※
            회원조합은 하나로마트앱을 통해 서비스를 제공하는 농협으로 선호매장관리에서 확인이 가능합니다.
          </WarnText>
          <WarnText>
            ※ 고객님께서는 선택항목에 대한 동의를 거부할 권리가 있습니다.  단,
            선택항목 거부 시에는 상기 이용목적에 명시된 서비스는 받으실 수 없습니다.
          </WarnText>
        </ExtraBox>
      ),
    },
    {
      id: 4,
      isChecked: false,
      isOpen: false,
      isRequired: false,
      isNormalTitle: true,
      title: "위치정보서비스 제공 동의",
      content: () => (
        <ExtraBox>
          <SmallTextBold>이용목적</SmallTextBold>
          <SmallText>가까운 위치에 있는 매장찾기 서비스 제공</SmallText>
          <SmallTextBold>수집항목</SmallTextBold>
          <SmallText>위치정보 (위도, 경도)</SmallText>
          <SmallTextBold>보유 및 이용기간</SmallTextBold>
          <SmallText style={styles.underline}>
            서버에 전송되거나 저장되지 않음
          </SmallText>
        </ExtraBox>
      ),
    },
  ]);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setTimeout(() => {
        dispatch(setIsLoading(false));
      }, 0);
    });
    return () => {
      dispatch(setIsLoading(false));
      unsubscribe;
    };
  }, [navigation]);
  const handleAllChecked = (isCheckAll) => {
    let cks = [...checkBoxes];
    cks.map((el) => {
      isCheckAll ? (el.isChecked = true) : (el.isChecked = false);
      if (el.child) {
        el.child.map((e) => {
          isCheckAll ? (e.isChecked = true) : (e.isChecked = false);
        });
      }
    });
    setCheckBoxes(() => cks);
    setToggleAllCheckBox(isCheckAll);
  };
  const handleChecked = (checkBox) => {
    let cks = [...checkBoxes];
    cks[checkBox.id].isChecked = !cks[checkBox.id].isChecked;
    if (cks[checkBox.id].child) {
      cks[checkBox.id].child.map((el) => {
        cks[checkBox.id].isChecked
          ? (el.isChecked = true)
          : (el.isChecked = false);
      });
    }
    setCheckBoxes(() => cks);
    if (cks[checkBox.id].isChecked == false) {
      setToggleAllCheckBox(false);
    } else {
      let allTrue = cks.every((el) => el.isChecked);
      if (allTrue) setToggleAllCheckBox(true);
    }
  };
  const setChecked = (checkBox, child) => {
    let cks = [...checkBoxes];
    // console.warn(cks[checkBox.id].child[cks[checkBox.id].child[child.id]].isChecked);
    cks[checkBox.id].child[child.id].isChecked = !cks[checkBox.id].child[
      child.id
    ].isChecked;

    if (cks[checkBox.id].child[child.id].isChecked == false) {
      setToggleAllCheckBox(false);
      cks[checkBox.id].isChecked = false;
    } else {
      let allTrue = cks[checkBox.id].child.every((el) => el.isChecked);
      if (allTrue) cks[checkBox.id].isChecked = true;
    }
    setCheckBoxes(() => cks);
  };

  const handleOpen = (checkBox) => {
    let cks = [...checkBoxes];
    cks[checkBox.id].isOpen = !cks[checkBox.id].isOpen;
    setCheckBoxes(() => cks);
  };

  const getPermissions = () => {
    return Permissions.getAsync(
      Permissions.NOTIFICATIONS,
      Permissions.LOCATION,
      Permissions.CAMERA
    )
      .then((statusObj) => {
        if (statusObj.status !== "granted") {
          return Permissions.askAsync(
            Permissions.NOTIFICATIONS,
            Permissions.LOCATION,
            Permissions.CAMERA
          );
        }
        return statusObj;
      })
      .then((statusObj) => {
        if (statusObj.status !== "granted") {
          dispatch(
            setAlert({
              message: "권한이 거부되었습니다.",
              onPressConfirm: () => {
                dispatch(setAlert(null));
              },
            })
          );
          return statusObj;
        }
      })
      .then(() => {
        return Notifications.getExpoPushTokenAsync();
      })
      .then((response) => {
        const token = response.data;
        dispatch(setPushToken(token));
        return token;
      })
      .catch((err) => {
        return err;
      });
  };
  const checkAgreed = () => {
    if (
      checkBoxes[0].isChecked &&
      checkBoxes[1].isChecked &&
      checkBoxes[1].child[0].isChecked &&
      checkBoxes[1].child[1].isChecked &&
      checkBoxes[2].isChecked
    ) {
      let cks = _.cloneDeep(checkBoxes);
      cks.map((el) => {
        delete el.desc;
        delete el.content;
      });
      if (!Constants.isDevice) {
        dispatch(setAgreedStatus(cks));
        saveAgreedStatusToStorage(cks);
        navigation.navigate("JoinStep1");
        return;
      }
      dispatch(setIsLoading(true));
      getPermissions().then((token) => {
        if (token) {
          dispatch(setAgreedStatus(cks));
          saveAgreedStatusToStorage(cks);
          navigation.navigate("JoinStep1");
        }
        dispatch(setIsLoading(false));
      });
    } else {
      dispatch(
        setAlert({
          message: "필수 항목을 동의해 주세요.",
          onPressConfirm: () => {
            dispatch(setAlert(null));
          },
        })
      );
    }
  };
  return (
    <BaseScreen
      headerShown={false}
      // style={{ width: "100%", height: "100%" }}
      // contentStyle={{ width: "100%", height: screenHeight }}
      // scrollListStyle={{ width: "100%", height: screenHeight }}
    >
      <CheckBox
        activeOpacity={0.8}
        onPress={() => handleAllChecked(!toggleAllheckBox)}
        title={
          <BaseText style={{ color: colors.trueWhite, marginLeft: 10 }}>
            전체동의
          </BaseText>
        }
        // title="전체동의"

        textStyle={styles.text}
        containerStyle={[styles.btnBlack, { marginLeft: -1 }]}
        checkedIcon={
          <Image
            source={require("@images/check_circle-24on.png")}
            style={{ marginLeft: -10 }}
          />
        }
        uncheckedIcon={
          <Image
            source={require("@images/check_circle-24off.png")}
            style={{ marginLeft: -10 }}
          />
        }
        checked={toggleAllheckBox}
        style={{
          margin: 0,
          padding: 0,
        }}
      />
      {checkBoxes.map((item, index) => (
        <TextBox key={index}>
          <TitleArea isOpen={item.isOpen} desc={item.desc}>
            <TitleContainer>
              <CheckButton
                value={item}
                onPress={() => handleChecked(item)}
                isRequired={item.isRequired}
              />
              <TextView
                style={{
                  color: item.isRequired ? colors.cerulean : colors.viridian,
                  fontWeight: item.isNormalTitle ? "normal" : "bold",
                }}
              >
                {item.isRequired ? "[필수] " : "[선택] "}
              </TextView>
              <BoldText>{item.title}</BoldText>
            </TitleContainer>
            {item.content && (
              <CheckBox
                containerStyle={[styles.checkbox]}
                checked={item.isOpen}
                onPress={() => handleOpen(item)}
                checkedIcon={<Image source={require("@images/close_m.png")} />}
                uncheckedIcon={
                  <Image source={require("@images/close_p.png")} />
                }
              />
            )}
          </TitleArea>
          {item.desc && <item.desc />}
          {item.isOpen && item.content && <item.content />}
        </TextBox>
      ))}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 30,
        }}
      >
        <GreenButton
          style={{ marginRight: 3 }}
          onPress={() => {
            checkAgreed();
          }}
        >
          <ButtonText>확인</ButtonText>
        </GreenButton>
        <BlueButton
          style={{ marginLeft: 3 }}
          onPress={() => {
            dispatch(setPreview(true));
          }}
        >
          <ButtonText>동의 없이 보기</ButtonText>
        </BlueButton>
      </View>
    </BaseScreen>
  );
};
export const CircleCheckButton = (props) => {
  const checkedIcon = require("@images/checkcircleon.png");
  const uncheckedIcon = require("@images/checkcircleoff.png");

  return (
    <CheckBox
      {...props}
      containerStyle={[styles.checkbox, { marginLeft: 0, marginRight: 0 }]}
      checkedIcon={<Image source={checkedIcon} />}
      uncheckedIcon={<Image source={uncheckedIcon} />}
    />
  );
};
export const CheckButton = (props) => {
  const checkedIcon = props.value.isRequired
    ? require("@images/check_box-2404.png")
    : require("@images/check_box-2402.png");
  const uncheckedIcon = props.value.isRequired
    ? require("@images/check_box-2403.png")
    : require("@images/check_box-2401.png");
  return (
    <CheckBox
      {...props}
      containerStyle={[styles.checkbox]}
      checked={props.value.isChecked}
      checkedIcon={<Image source={checkedIcon} />}
      uncheckedIcon={<Image source={uncheckedIcon} />}
    />
  );
};

export const screenOptions = ({ navigation }) => {
  return {
    title: "",
    headerShown: false,
    cardStyle: {
      paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
    },
    animationEnabled: false,
  };
};
const BulletIcon = styled(Image)({ marginTop: 3 });
BulletIcon.defaultProps = {
  source: require("@images/checkmark2.png"),
};
const WarnText = styled(BaseText)({
  marginTop: 25,
  fontSize: 9,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 14,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.greyishBrown,
});
const GrayDesc = styled(BaseText)({
  fontSize: 12,
  fontWeight: "500",
  fontStyle: "normal",
  lineHeight: 16,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.greyishThree,
  marginTop: 5,
  marginLeft: 16,
  marginRight: 23,
});
const DescText1 = styled(BaseText)({
  marginLeft: 5,
  fontSize: 12,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 16,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.greyishBrown,
});
const Desc = styled.View({ marginLeft: 46, marginBottom: 5 });
const DescTextLine = styled.View({
  flexDirection: "row",
  alignItems: "center",
});
export const TitleContainer = styled.View({
  flexDirection: "row",
  flex: 0.75,
});
const SmallText = styled(BaseText)({
  fontSize: 11,
  color: colors.greyishBrown,
});
const SmallTextBold = styled(BaseText)({
  paddingTop: 14.5,
  fontSize: 11,
  color: colors.greyishBrown,
  fontFamily: "CustomFont-Bold",
});
const TitleArea = styled.View({
  paddingBottom: (props) => (!props.desc && props.isOpen ? 5 : 0),
  flex: 1,
  flexDirection: "row",

  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  // paddingRight: 6,
});
const ExtraBox = styled.View({
  paddingLeft: 37,
  paddingRight: 37,
  paddingBottom: 14.5,
  borderStyle: "solid",
  borderTopWidth: 1,
  borderColor: colors.pinkishGrey,
  flex: 1,
  width: "100%",
});
const NoticeText = styled(BaseText)({
  fontSize: 14,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.black,
  marginRight: 30,
  marginLeft: 30,
  marginTop: 42,
  marginBottom: 48,
});

const GreenButton = styled(BaseButtonContainer)({
  backgroundColor: colors.pine,
});
const BlueButton = styled(BaseButtonContainer)({
  backgroundColor: colors.cerulean,
});
const TextBox = styled.View({
  alignItems: "flex-start",
  backgroundColor: colors.trueWhite,
  justifyContent: "flex-start",
  marginBottom: 11,
  paddingBottom: 5,
  paddingTop: 5,
  // paddingRight: 5,
  width: "100%",
  borderRadius: 6,
  backgroundColor: colors.trueWhite,
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: colors.pinkishGrey,
  flex: 1,
});
export const TextView = styled(BaseText)({
  flexShrink: 1,
  lineHeight: 20,
  fontSize: 12,
  color: colors.greyishBrown,

  flexShrink: 0,
});
const BoldText = styled(BaseText).attrs({})({
  fontFamily: "CustomFont-Bold",
  lineHeight: 20,
});
const styles = StyleSheet.create({
  justUnderline: {
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
  },
  underline: {
    fontSize: 13,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
  },
  checkbox: {
    justifyContent: "flex-start",
    margin: 0,
    alignItems: "flex-start",
    padding: 0,
  },
  text2: {
    margin: 5,
  },
  text: {
    fontSize: 14,

    fontStyle: "normal",
    lineHeight: 18,
    letterSpacing: 0,

    color: colors.trueWhite,
  },
  btnBlack: {
    width: 158,
    height: 36,
    backgroundColor: colors.black,
    borderRadius: 17,
    padding: 0,
    marginBottom: 25,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 8,
  },

  screen: {
    paddingTop: 19,
    paddingLeft: 16,
    paddingRight: 16,
    // paddingTop: Constants.statusBarHeight,
    flex: 1,

    backgroundColor: colors.white,
  },
});

export default AgreementScreen;
