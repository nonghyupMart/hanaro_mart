import React from "react";
import { Image } from "react-native";
import styled from "styled-components/native";
import colors from "../../constants/Colors";
import { setIsLoading } from "../../store/actions/common";
import {
  BaseButtonContainer, BaseText,
  BaseTextInput, BaseTouchable, StyleConstants
} from "../UI/BaseUI";
import { useAppDispatch } from "../../hooks";

const SearchBar = (props) => {
  const dispatch = useAppDispatch();
  const onPressSearch = () => {
    dispatch(setIsLoading(true));
    const query = {
      lname: props.lname,
      mname: props.mname,
      store_nm: props.store_nm,
    };
    props.pageNum.current = 1;
    props.fetchBranches(props.lname, props.mname, props.store_nm, 1);
  };
  const onFocus = () => {
    // dispatch(setBottomNavigation(false));
  };
  const onBlur = () => {
    // dispatch(setBottomNavigation(true));
  };
  return (
    <SearchBarContainer>
      <BlueRoundView>
        <Image
          source={require("../../assets/images/ic_store_mall_directory_24px.png")}
        />
        <StoreName>매장명검색</StoreName>
      </BlueRoundView>
      <TextInputContainer>
        <SearchTextInput
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder="매장명을 입력하세요."
          onChangeText={(name) => props.setStore_nm(name)}
          value={props.store_nm}
          onSubmitEditing={onPressSearch}
        />
        <BaseTouchable
          onPress={onPressSearch}
          style={{ justifyContent: "center", paddingRight: 10 }}
        >
          <Image source={require("../../assets/images/search-24px.png")} />
        </BaseTouchable>
      </TextInputContainer>
    </SearchBarContainer>
  );
};
const SearchTextInput = styled(BaseTextInput)({
  marginLeft: 0,
  marginRight: 5,
  flex: 1,
});
const TextInputContainer = styled.View({
  paddingRight: 8,
  paddingLeft: 11,
  flexDirection: "row",
  height: 40,
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: colors.CERULEAN,
  borderTopRightRadius: 20,
  borderBottomRightRadius: 20,
  flex: 1,
});
const StoreName = styled(BaseText)({
  marginLeft: 5,
  fontSize: 14,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.TRUE_WHITE,
});
const SearchBarContainer = styled.View({
  flexDirection: "row",
  flex: 1,
  marginLeft: StyleConstants.defaultPadding,
  marginRight: StyleConstants.defaultPadding,
  height: 40,
});
const BaseSmallButton = styled(BaseButtonContainer)({
  width: 114,
  height: 24,
  borderRadius: 11,
});
const BlueRoundView = styled.View({
  //    borderBottomLeftRadius: number
  // - borderBottomRightRadius: number
  // - borderTopLeftRadius: number
  // - borderTopRightRadius: number
  borderTopLeftRadius: 20,
  borderBottomLeftRadius: 20,
  backgroundColor: colors.CERULEAN,
  height: 40,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  paddingLeft: 15.6,
  paddingRight: 10,
});
export default SearchBar;
