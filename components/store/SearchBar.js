import React, { useEffect, useState, Fragment } from "react";
import styled from "styled-components/native";
import { useSelector, useDispatch } from "react-redux";
import * as branchesActions from "@actions/branches";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  SafeAreaView,
  TextInput,
  Button,
  FlatList,
  Platform,
  Picker,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import {
  BaseButtonContainer,
  BaseTouchable,
  screenWidth,
  StyleConstants,
} from "@UI/BaseUI";

const SearchBar = (props) => {
  const dispatch = useDispatch();
  const onPressSearch = () => {
    props.setIsLoading(true);
    const query = {
      lname: props.lname,
      mname: props.mname,
      store_nm: props.store_nm,
    };
    dispatch(branchesActions.fetchBranches(query)).then(() => {
      props.setIsLoading(false);
    });
  };
  return (
    <SearchBarContainer>
      <BlueRoundView>
        <Image source={require("@images/ic_store_mall_directory_24px.png")} />
        <StoreName>매장명</StoreName>
      </BlueRoundView>
      <TextInputContainer>
        <SearchTextInput
          placeholder="매장명을 입력하세요."
          onChangeText={(name) => props.setStore_nm(name)}
          value={props.store_nm}
          onSubmitEditing={onPressSearch}
        />
        <BaseTouchable
          onPress={onPressSearch}
          style={{ justifyContent: "center", paddingRight: 10 }}
        >
          <Image source={require("@images/search-24px.png")} />
        </BaseTouchable>
      </TextInputContainer>
    </SearchBarContainer>
  );
};
const SearchTextInput = styled.TextInput({
  marginLeft: 10,
  marginRight: 10,
  flex: 1,
});
const TextInputContainer = styled.View({
  paddingRight: 8,
  paddingLeft: 12,
  flexDirection: "row",
  height: 40,
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: colors.cerulean,
  borderTopRightRadius: 20,
  borderBottomRightRadius: 20,
  flex: 1,
});
const StoreName = styled(Text)({
  marginLeft: 5,
  fontSize: 14,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.trueWhite,
});
const SearchBarContainer = styled.View({
  flexDirection: "row",
  flex: 1,
  marginLeft: StyleConstants.defaultPadding,
  marginRight: StyleConstants.defaultPadding,
});
const ButtonText = styled.Text({
  fontSize: 12,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 17,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.greyishBrown,
});
const BaseSmallButton = styled(BaseButtonContainer)({
  width: 114,
  height: 24,
  borderRadius: 11,
});
const BlueButton = styled(BaseSmallButton)({
  backgroundColor: colors.cerulean,
});
const GrayButton = styled(BaseSmallButton)({
  backgroundColor: colors.pinkishGrey,
});
const BlueRoundView = styled.View({
  //    borderBottomLeftRadius: number
  // - borderBottomRightRadius: number
  // - borderTopLeftRadius: number
  // - borderTopRightRadius: number
  borderTopLeftRadius: 20,
  borderBottomLeftRadius: 20,
  backgroundColor: colors.cerulean,
  height: 40,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  paddingLeft: 22.5,
  paddingRight: 10,
});
export default SearchBar;
