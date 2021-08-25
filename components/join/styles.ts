import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { StyleSheet } from "react-native";
import { BaseText } from "../UI/BaseUI";
import colors from "../../constants/Colors";

export const WarnText = styled(BaseText)({
  marginTop: 25,
  fontSize: 9,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 14,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.GREYISH_BROWN,
});
export const ExtraBox = styled.View({
  paddingLeft: 37,
  paddingRight: 37,
  paddingBottom: 14.5,
  borderStyle: "solid",
  borderTopWidth: 1,
  borderColor: colors.PINKISH_GREY,
  flex: 1,
  width: "100%",
});
export const SmallTextTitle = styled(BaseText)({
  fontSize: 12,
  color: colors.GREYISH_BROWN,
  marginTop: 14.5,
});
export const SmallText = styled(BaseText)({
  fontSize: 11,
  color: colors.GREYISH_BROWN,
  marginLeft: 13,
});
export const SmallTextBold = styled(BaseText)({
  paddingTop: 14.5,
  fontSize: 11,
  color: colors.GREYISH_BROWN,
  fontFamily: "Roboto-Bold",
  marginLeft: 13,
});

export const styles = StyleSheet.create({
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

    color: colors.TRUE_WHITE,
  },
  btnBlack: {
    width: 158,
    height: 36,
    backgroundColor: colors.BLACK,
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

    backgroundColor: colors.WHITE,
  },
});
