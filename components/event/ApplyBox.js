import React, { useState, useEffect } from "react";
import { View, Image, FlatList } from "react-native";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import * as AgreementScreen from "@screens/join/AgreementScreen";

import AgreementContent3 from "@components/join/AgreementContent3";
import { styles } from "@components/join/styles";
import {
  BlueButton,
  BlueButtonText,
  BaseText,
  BaseTextInput,
} from "@UI/BaseUI";
import { setAlert } from "@actions/common";
import { useSelector, useDispatch } from "react-redux";
import { CheckBox } from "react-native-elements";

const ApplyBox = (props) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const checkItem = props.checkItem;
  const setCheckItem = props.setCheckItem;
  const reg_num = props.reg_num;
  const setReg_num = props.setReg_num;

  const onPress = () => {
    props.onApply();
  };
  const onFocus = () => {
    if (props.scrollRef)
      setTimeout(() => {
        props.scrollRef.scrollToEnd();
      }, 800);
  };
  const handleChecked = (checkBox) => {
    let cks = { ...checkItem };
    cks.isChecked = !cks.isChecked;
    if (cks.child) {
      cks.child.map((el) => {
        cks.isChecked ? (el.isChecked = true) : (el.isChecked = false);
      });
    }
    setCheckItem(() => cks);
  };
  const setChecked = (checkBox, child) => {
    let cks = { ...checkItem };
    cks.child[child.id].isChecked = !cks.child[child.id].isChecked;

    if (cks.child[child.id].isChecked == false) {
      cks.isChecked = false;
    } else {
      let allTrue = cks.child.every((el) => el.isChecked);
      if (allTrue) cks.isChecked = true;
    }
    setCheckItem(() => cks);
  };
  const handleOpen = (checkBox) => {
    let cks = { ...checkItem };
    cks.isOpen = !cks.isOpen;
    setCheckItem(() => cks);
  };

  return (
    <>
      {props.eventDetail.entry.status == "10" &&
        userInfo &&
        userInfo.marketing_agree == "N" && (
          <Container>
            <Title>개인정보 수집동의</Title>
            <AgreementScreen.TitleArea>
              <AgreementScreen.TitleContainer
                style={{ marginTop: 13, marginBottom: 5 }}
              >
                <AgreementScreen.CheckButton
                  value={checkItem}
                  onPress={() => handleChecked(checkItem)}
                  isRequired={true}
                />
                <AgreementScreen.TextView
                  style={{
                    fontWeight: "normal",
                    fontSize: 14,
                    flexGrow: 1,
                    flexShrink: 0,
                    color: props.item.isRequired
                      ? colors.cerulean
                      : colors.viridian,
                    fontFamily: "CustomFont-Bold",
                  }}
                >
                  {props.item.isRequired ? "[필수] " : "[선택] "}
                </AgreementScreen.TextView>
                <AgreementScreen.BoldText
                  style={{ textAlign: "left", width: "100%" }}
                >
                  행사안내 및 이벤트 수신 동의
                </AgreementScreen.BoldText>
              </AgreementScreen.TitleContainer>
              <CheckBox
                containerStyle={[styles.checkbox]}
                checked={checkItem.isOpen}
                onPress={() => handleOpen(checkItem)}
                checkedIcon={<Image source={require("@images/close_m.png")} />}
                uncheckedIcon={
                  <Image source={require("@images/close_p.png")} />
                }
                style={{ opacity: 0 }}
              />
            </AgreementScreen.TitleArea>

            <AgreementScreen.Desc>
              <AgreementScreen.DescTextLine>
                <AgreementScreen.CircleCheckButton
                  checked={checkItem.child[0].isChecked}
                  onPress={() => setChecked(checkItem, checkItem.child[0])}
                />
                <AgreementScreen.DescText1>
                  개인정보의 선택적 수집·이용 동의
                </AgreementScreen.DescText1>
              </AgreementScreen.DescTextLine>
              <AgreementScreen.DescTextLine>
                <AgreementScreen.CircleCheckButton
                  checked={checkItem.child[1].isChecked}
                  onPress={() => setChecked(checkItem, checkItem.child[1])}
                />
                <AgreementScreen.DescText1>
                  개인정보의 선택적 제공동의
                </AgreementScreen.DescText1>
              </AgreementScreen.DescTextLine>
              <AgreementScreen.GrayDesc>
                이벤트 수신동의를 하시면 할인쿠폰 등에 대한 정보를 받으실 수
                있습니다.
              </AgreementScreen.GrayDesc>
            </AgreementScreen.Desc>
            {checkItem.isOpen && (
              <AgreementContent3 style={{ marginTop: 10, marginBottom: 10 }} />
            )}

            {/* {userInfo && !userInfo.user_age && (
              <InputText
                placeholder="생년원일+성별(7자리-8501011)"
                keyboardType="numeric"
                maxLength={7}
                value={reg_num}
                onChangeText={(text) => setReg_num(text)}
                editable={props.eventDetail.entry.status === "10"}
                onFocus={onFocus}
              />
            )} */}
          </Container>
        )}
      {props.isShowApplyButton && props.eventDetail.entry.status === "10" && (
        <BlueButton onPress={onPress} style={{ marginTop: 40 }}>
          <Image source={require("@images/forward.png")} />
          <BlueButtonText>응모하기</BlueButtonText>
        </BlueButton>
      )}
      {props.isShowApplyButton && props.eventDetail.entry.status === "20" && (
        <GrayButton style={{ marginTop: 40 }}>
          <Image source={require("@images/forward.png")} />
          <BlueButtonText>응모완료</BlueButtonText>
        </GrayButton>
      )}
    </>
  );
};
const GrayButton = styled(BlueButton).attrs({ activeOpacity: 0 })({
  backgroundColor: colors.greyishThree,
});
ApplyBox.defaultProps = {
  item: {
    id: 0,
    isRequired: true,
    isChecked: false,
  },
};

const InputText = styled(BaseTextInput)({
  borderRadius: 16,
  backgroundColor: colors.trueWhite,
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: colors.greyishThree,
  marginLeft: 34,
  marginRight: 34,
  minHeight: 34,
  padding: 0,
  height: 35,
  textAlign: "center",
});

const TextView2 = styled(AgreementScreen.TextView)({
  flexGrow: 1,
  marginRight: 22,
  justifyContent: "flex-start",
  fontSize: 14,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.greyishBrown,
});

const Title = styled(BaseText)({
  flex: 1,
  fontSize: 15,
  fontWeight: "300",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.trueWhite,
  backgroundColor: colors.greyishBrown,
  width: "100%",
  padding: 4,
});
const Container = styled.View({
  marginTop: 42,

  width: "100%",
  backgroundColor: colors.trueWhite,
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: colors.greyishThree,
  borderRadius: 12,
  overflow: "hidden",
  paddingBottom: 10,
});

export default ApplyBox;
