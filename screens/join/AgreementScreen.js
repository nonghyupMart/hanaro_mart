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
} from "@UI/BaseUI";

import {
  setPushToken,
  setAgreedStatus,
  saveAgreedStatusToStorage,
} from "@actions/auth";

const AgreementScreen = ({ navigation }) => {
  const [toggleAllheckBox, setToggleAllCheckBox] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState();
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
      desc: () => (
        <Desc>
          <DescTextLine>
            <BulletIcon />
            <DescText1>개인정보의 필수적 수집·이용 동의</DescText1>
          </DescTextLine>
          <DescTextLine>
            <BulletIcon />
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
            회원가입의 성립.하나로마트앱 서비스 이용. 민원처리,사고조사 등을
            위한 원할한 의사소통 경로 확보.
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
        </ExtraBox>
      ),
    },
    {
      id: 3,
      isChecked: false,
      isOpen: false,
      isRequired: false,
      title: "행사안내 및 이벤트 수신 동의",
      desc: () => (
        <Desc>
          <DescTextLine>
            <BulletIcon />
            <DescText1>개인정보의 필수적 수집·이용 동의</DescText1>
          </DescTextLine>
          <DescTextLine>
            <BulletIcon />
            <DescText1>개인정보의 필수적 제공동의</DescText1>
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
            농협협동조합법에 의한 중앙회의 회원조합
          </SmallText>
          <SmallTextBold>제공목적</SmallTextBold>
          <SmallText style={styles.justUnderline}>
            상품 및 서비스 안내 또는 관련홍보(SMS, PUSH) 회원의 혜택과
            서비스개선을 위한 통계분석 및 연구조사
          </SmallText>
          <SmallTextBold>제공항목</SmallTextBold>
          <SmallText>
            상휴대폰번호, 본인인증 시 성명,생년월일,성별, 내외국인 여부, CI
          </SmallText>
          <SmallTextBold>보유 및 이용기간</SmallTextBold>
          <SmallText style={styles.justUnderline}>회원탈퇴 시</SmallText>
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
  // console.log("====>", checkBoxes);
  const dispatch = useDispatch();

  const handleAllChecked = (isCheckAll) => {
    let cks = [...checkBoxes];
    cks.map((el) => {
      isCheckAll ? (el.isChecked = true) : (el.isChecked = false);
    });
    setCheckBoxes(() => cks);
    setToggleAllCheckBox(isCheckAll);
  };
  const handleChecked = (checkBox) => {
    let cks = [...checkBoxes];
    cks[checkBox.id].isChecked = !cks[checkBox.id].isChecked;
    setCheckBoxes(() => cks);
    if (cks[checkBox.id].isChecked == false) {
      setToggleAllCheckBox(false);
    } else {
      let allTrue = cks.every((el) => el.isChecked);
      if (allTrue) setToggleAllCheckBox(true);
    }
  };

  const handleOpen = (checkBox) => {
    let cks = [...checkBoxes];
    cks[checkBox.id].isOpen = !cks[checkBox.id].isOpen;
    setCheckBoxes(() => cks);
    console.log("cks====>", cks);
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
          setAlert({
            message: "권한이 거부되었습니다.",
            onPressConfirm: () => {
              setAlert(null);
            },
          });
          return statusObj;
        }
      })
      .then(() => {
        console.log("getting token");
        return Notifications.getExpoPushTokenAsync();
      })
      .then((response) => {
        const token = response.data;
        console.warn("token==>" + token);
        dispatch(setPushToken(token));
        return token;
      })
      .catch((err) => {
        console.warn(err);
        return err;
      });
  };
  const checkAgreed = () => {
    if (
      checkBoxes[0].isChecked &&
      checkBoxes[1].isChecked &&
      checkBoxes[2].isChecked
    ) {
      if (!Constants.isDevice) {
        navigation.navigate("JoinStep1");
        return;
      }
      setIsLoading(() => true);
      getPermissions().then((token) => {
        if (token) {
          dispatch(setAgreedStatus(checkBoxes));
          saveAgreedStatusToStorage(checkBoxes);
          navigation.navigate("JoinStep1");
        }
        setIsLoading(() => false);
      });
    } else {
      // setAlertMessage("필수 항목을 동의해 주세요.");
      setAlert({
        message: "필수 항목을 동의해 주세요.",
        onPressConfirm: () => {
          setAlert(null);
        },
      });
    }
  };
  return (
    <BaseScreen
      isLoading={isLoading}
      alert={alert}
      headerShown={false}
      // style={{ width: "100%", height: "100%" }}
      // contentStyle={{ width: "100%", height: screenHeight }}
      // scrollListStyle={{ width: "100%", height: screenHeight }}
    >
      <CheckBox
        activeOpacity={0.8}
        onPress={() => handleAllChecked(!toggleAllheckBox)}
        title="전체동의"
        textStyle={styles.text}
        containerStyle={[styles.btnBlack, { marginLeft: -1 }]}
        checkedIcon={
          <Image source={require("@images/check_circle-24on.png")} />
        }
        uncheckedIcon={
          <Image source={require("@images/check_circle-24off.png")} />
        }
        checked={toggleAllheckBox}
        style={{ margin: 0, padding: 0 }}
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

              <BoldText>
                <TextView
                  style={{
                    color: item.isRequired ? colors.cerulean : colors.viridian,
                    fontWeight: item.isNormalTitle ? "normal" : "bold",
                  }}
                >
                  {item.isRequired ? "[필수] " : "[선택] "}
                </TextView>
                {item.title}
              </BoldText>
            </TitleContainer>

            <CheckBox
              containerStyle={[styles.checkbox]}
              checked={item.isOpen}
              onPress={() => handleOpen(item)}
              checkedIcon={<Image source={require("@images/close_m.png")} />}
              uncheckedIcon={<Image source={require("@images/close_p.png")} />}
            />
          </TitleArea>
          {item.desc && <item.desc />}
          {item.isOpen && <item.content />}
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
  };
};
const BulletIcon = styled(Image)({ marginTop: 3 });
BulletIcon.defaultProps = {
  source: require("@images/checkmark2.png"),
};
const WarnText = styled.Text({
  marginTop: 25,
  fontSize: 9,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 14,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.greyishBrown,
});
const GrayDesc = styled(Text)({
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
const DescText1 = styled(Text)({
  marginLeft: 7.5,
  fontSize: 12,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 16,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.greyishBrown,
});
const Desc = styled.View({ marginLeft: 58, marginBottom: 5 });
const DescTextLine = styled.View({
  flexDirection: "row",
});
export const TitleContainer = styled.View({
  flexDirection: "row",
  flex: 1,
});
const SmallText = styled(Text)({
  fontSize: 11,
  color: colors.greyishBrown,
});
const SmallTextBold = styled(Text)({
  paddingTop: 14.5,
  fontSize: 11,
  color: colors.greyishBrown,
  fontWeight: "bold",
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
const NoticeText = styled(Text)({
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
export const TextView = styled(Text)({
  flexShrink: 1,
  lineHeight: 20,
  fontSize: 12,
  color: colors.greyishBrown,
});
const BoldText = styled(TextView)({
  fontWeight: "bold",
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
    fontWeight: "500",
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
