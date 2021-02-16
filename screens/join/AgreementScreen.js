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
  ScrollView,
} from "react-native";
import {
  createStackNavigator,
  CardStyleInterpolators,
  HeaderStyleInterpolators,
} from "@react-navigation/stack";
import Constants from "expo-constants";
import { styles } from "../../components/join/styles";
import AgreementContent1 from "../../components/join/AgreementContent1";
import AgreementContent3 from "../../components/join/AgreementContent3";
import AgreementContent4 from "../../components/join/AgreementContent4";

import { CheckBox } from "react-native-elements";

import { setPreview } from "../../store/actions/auth";
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";
import * as Location from "expo-location";
import { getPermissionsAsync } from "expo-notifications";
import * as Animatable from "react-native-animatable";
import colors from "../../constants/Colors";

import BaseScreen from "../../components/BaseScreen";
import {
  BaseButtonContainer,
  ButtonText,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  BaseText,
} from "../../components/UI/BaseUI";

import {
  setPushToken,
  setAgreedStatus,
  saveAgreedStatusToStorage,
} from "../../store/actions/auth";
import { SERVER_URL, API_URL } from "../../constants/settings";
import _ from "lodash";
import { setAlert, setIsLoading } from "../../store/actions/common";
import AutoHeightWebView from "react-native-autoheight-webview";
import { BackButton, TextTitle } from "../../components/UI/header";

const AgreementScreen = (props) => {
  const pushToken = useSelector((state) => state.auth.pushToken);
  const params = props.route.params;
  const navigation = props.navigation;
  const [toggleAllheckBox, setToggleAllCheckBox] = useState(false);
  const isLoading = useSelector((state) => state.common.isLoading);
  const [canScroll, setCanScroll] = useState(true);
  const [checkBoxes, setCheckBoxes] = useState([
    {
      id: 0,
      isChecked: false,
      isOpen: false,
      isRequired: true,

      title: "하나로마트앱 이용약관",
      content: () => (
        <AutoHeightWebView
          // injectedJavaScript="window.onscroll=function(){alert('Not WORK');};true;"
          source={{
            uri: `${SERVER_URL}/web/about/terms.do`,
          }}
          style={{
            width: SCREEN_WIDTH - 18 - 18 - 2,
            flex: 1,
          }}
        />
      ),
    },
    {
      id: 1,
      isChecked: false,
      isOpen: false,
      isRequired: true,
      title: "개인정보의 필수적 수집・이용・제3자 제공 동의",
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
            <DescText1>개인정보의 필수적 제3자 제공동의</DescText1>
          </DescTextLine>
        </Desc>
      ),
      content: () => <AgreementContent1 />,
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
            <DescText1>개인정보의 선택적 제3자 제공동의</DescText1>
          </DescTextLine>
          <GrayDesc>
            이벤트 수신동의를 하시면 할인쿠폰 등에 대한 정보를 받으실 수
            있습니다.
          </GrayDesc>
        </Desc>
      ),
      content: () => <AgreementContent3 />,
    },
    {
      id: 4,
      isChecked: false,
      isOpen: false,
      isRequired: false,
      isNormalTitle: true,
      title: "위치정보서비스 제공 동의",
      content: () => <AgreementContent4 />,
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
    return Permissions.getAsync(Permissions.NOTIFICATIONS, Permissions.CAMERA)
      .then((statusObj) => {
        if (statusObj.status !== "granted") {
          return Permissions.askAsync(
            Permissions.NOTIFICATIONS,
            Permissions.CAMERA
          );
        }
        return statusObj;
      })
      .then(() => {
        return Notifications.getExpoPushTokenAsync();
      })
      .then((response) => {
        const token = response.data;
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
      if (
        checkBoxes[3].child[0].isChecked ||
        checkBoxes[3].child[1].isChecked
      ) {
        if (
          checkBoxes[3].child[0].isChecked != checkBoxes[3].child[1].isChecked
        ) {
          return dispatch(
            setAlert({
              message:
                "선택항목에 동의하셔야\n행사안내 및 이벤트\n수신이 가능합니다.",
              onPressConfirm: () => {
                dispatch(setAlert(null));
              },
            })
          );
        }
      }
      let cks = _.cloneDeep(checkBoxes);
      cks.map((el) => {
        delete el.desc;
        delete el.content;
      });
      if (!Constants.isDevice) {
        dispatch(setAgreedStatus(cks));
        saveAgreedStatusToStorage(cks);
        navigation.navigate("CI");
        return;
      }
      dispatch(setIsLoading(true));
      getPermissions().then(async (token) => {
        await dispatch(setIsLoading(false));
        token = `${token}`.trim();
        if (!token || token == "") {
          return dispatch(
            setAlert({
              message:
                "서버통신지연으로 인하여 잠시 후 다시 실행해주시기 바랍니다.",
              onPressConfirm: () => {
                dispatch(setAlert(null));
              },
            })
          );
        }
        if (token && !isLoading) {
          setTimeout(async () => {
            await dispatch(setPushToken(token));
            await dispatch(setAgreedStatus(cks));
            await saveAgreedStatusToStorage(cks);
            await navigation.navigate("CI");
          }, 0);
        }
      });
    } else {
      dispatch(
        setAlert({
          message: "필수항목에 동의하셔야\n회원가입이 가능합니다.",
          onPressConfirm: () => {
            dispatch(setAlert(null));
          },
        })
      );
    }
  };
  return (
    <BaseScreen
      scrollEnabled={canScroll}
      // style={{ width: "100%", height: "100%" }}
      contentStyle={{ paddingTop: 16 }}
      // scrollListStyle={{ width: "100%", height: SCREEN_HEIGHT }}
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
            source={require("../../assets/images/check_circle-24on.png")}
            style={{ marginLeft: -10 }}
          />
        }
        uncheckedIcon={
          <Image
            source={require("../../assets/images/check_circle-24off.png")}
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
                checkedIcon={
                  <Image source={require("../../assets/images/close_m.png")} />
                }
                uncheckedIcon={
                  <Image source={require("../../assets/images/close_p.png")} />
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
            props.navigation.goBack();
          }}
        >
          <ButtonText>취소</ButtonText>
        </BlueButton>
      </View>
    </BaseScreen>
  );
};
export const CircleCheckButton = (props) => {
  const checkedIcon = require("../../assets/images/checkcircleon.png");
  const uncheckedIcon = require("../../assets/images/checkcircleoff.png");

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
    ? require("../../assets/images/check_box-2404.png")
    : require("../../assets/images/check_box-2402.png");
  const uncheckedIcon = props.value.isRequired
    ? require("../../assets/images/check_box-2403.png")
    : require("../../assets/images/check_box-2401.png");
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

const BulletIcon = styled(Image)({ marginTop: 3 });
BulletIcon.defaultProps = {
  source: require("../../assets/images/checkmark2.png"),
};

export const GrayDesc = styled(BaseText)({
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
export const DescText1 = styled(BaseText)({
  marginLeft: 5,
  fontSize: 12,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 16,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.greyishBrown,
});
export const Desc = styled.View({ marginLeft: 46, marginBottom: 5 });
export const DescTextLine = styled.View({
  flexDirection: "row",
  alignItems: "center",
});
export const TitleContainer = styled.View({
  flexDirection: "row",
  flex: 0.75,
});
// export const MarginContainer = styled.View({ marginLeft: 13 });

export const TitleArea = styled.View({
  paddingBottom: (props) => (!props.desc && props.isOpen ? 5 : 0),
  flex: 1,
  flexDirection: "row",

  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  // paddingRight: 6,
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
  overflow: "hidden",
});
export const TextView = styled(BaseText)({
  flexShrink: 1,
  lineHeight: 20,
  fontSize: 12,
  color: colors.greyishBrown,
  fontFamily: "Roboto-Bold",
  flexShrink: 0,
});
export const BoldText = styled(BaseText).attrs({})({
  fontFamily: "Roboto-Bold",
  lineHeight: 20,
});

export const screenOptions = ({ navigation }) => {
  return {
    title: "약관동의",
    headerLeft: (props) => <BackButton {...props} />,
    headerTitle: (props) => <TextTitle {...props} />,
    headerRight: (props) => <></>,
    animationEnabled: false,
  };
};
export default AgreementScreen;
