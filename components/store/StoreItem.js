import React from "react";
import styled from "styled-components/native";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";
import { BaseText, BaseTouchable } from "@UI/BaseUI";
import * as RootNavigation from "@navigation/RootNavigation";
import * as branchesActions from "@actions/branches";
import { setIsLoading } from "@actions/common";

const StoreItem = (props) => {
  const dispatch = useDispatch();
  const userStore = useSelector((state) => state.auth.userStore);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const isMark = props.isMark;
  const onPress = () => {
    dispatch(setIsLoading(true));
    RootNavigation.navigate("StoreChangeDetail", { item: props.item });
  };
  const onDelete = () => {
    dispatch(
      branchesActions.deleteMarkedStore({
        user_cd: userInfo.user_cd,
        store_cd: props.item.store_cd,
      })
    ).then((data) => {
      if (data.result == "success") props.fetchMarkedStores(true);
    });
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <Container>
        {isMark && (
          <StarContainer>
            <Image source={require("@images/star2.png")} />
          </StarContainer>
        )}
        <TitleContainer>
          <Title>{props.item.store_nm}</Title>
          <Tel>Tel. {props.item.tel}</Tel>
        </TitleContainer>
        <IconContainer>
          <Image source={require("@images/location-pin.png")} />
          <BlueText>{props.item.dist}km</BlueText>
          {!isMark && <Image source={require("@images/circle-right.png")} />}
          {isMark && (
            <Btn onPress={onDelete}>
              <Image source={require("@images/close_x646.png")} />
            </Btn>
          )}
        </IconContainer>
      </Container>
    </TouchableOpacity>
  );
};

const Btn = styled(BaseTouchable)({
  justifyContent: "center",
  alignItems: "center",
});
const StarContainer = styled.View({
  height: "100%",
  paddingTop: 6,
  paddingRight: 4.4,
});
const Tel = styled(BaseText)({
  fontSize: 14,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.appleGreen,
});
const BlueText = styled(BaseText)({
  fontSize: 14,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "right",
  color: colors.cerulean,
  marginLeft: 8,
  marginRight: 8,
  lineHeight: 17,
});
const IconContainer = styled.View({
  flexDirection: "row",
  justifyContent: "center",
  flexShrink: 0,
});
const Container = styled.View({
  flexDirection: "row",
  justifyContent: "space-between",
  marginLeft: 35.5,
  marginRight: 35.5,
  alignItems: "center",
  borderColor: colors.white,
  borderBottomWidth: 1,
  paddingTop: 10,
  paddingBottom: 10,
  overflow: "hidden",
  flexGrow: 0,
});
const TitleContainer = styled.View({
  flexShrink: 1,
  flexGrow: 1,
});
const Title = styled(BaseText)({
  fontSize: 16,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.greyishBrown,
});
Title.defaultProps = {
  numberOfLines: 1,
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    // backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    fontFamily: "open-sans",
    color: "#888",
    fontSize: 16,
  },
  mainText: {
    color: "black",
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 20,
  },
});

export default StoreItem;
