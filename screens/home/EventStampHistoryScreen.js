import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components/native";
import { View, Platform, Image } from "react-native";
import BaseScreen from "../../components/BaseScreen";
import {
  BaseTouchable,
  BaseImage,
  BaseTextInput,
  BaseText,
  BlueButton,
  BlueButtonText,
} from "../../components/UI/BaseUI";
import ExtendedFlatList from "../../components/UI/ExtendedFlatList";
import { useSelector, useDispatch } from "react-redux";
import * as eventActions from "../../store/actions/event";
import BoardItem from "../../components/board/BoardItem";
import { BackButton, TextTitle } from "../../components/UI/header";
import { SET_STAMP_HISTORY } from "../../store/actions/actionTypes";
import { styles } from "./FlyerScreen";
import _ from "lodash";

const EventStampHistoryScreen = (props) => {
  const params = props.route.params;
  const userStore = useSelector((state) => state.auth.userStore);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();

  const stampHistory = useSelector((state) => state.event.stampHistory);

  useEffect(() => {
    fetchStampHistory();
    return () => {
      dispatch(eventActions.clearStampHistory());
    };
  }, []);

  const fetchStampHistory = () => {
    dispatch(
      eventActions.fetchStampHistory({
        user_cd: userInfo.user_cd,
        event_cd: params.event_cd,
      })
    );
  };

  return (
    <BaseScreen
      style={{
        backgroundColor: colors.trueWhite,
      }}
      contentStyle={{
        backgroundColor: colors.trueWhite,
        paddingTop: Platform.OS == "ios" ? 19 : 19,
      }}
    >
      {stampHistory &&
        stampHistory.history &&
        stampHistory.history.length <= 0 && (
          <>
            <NoList>내역이 없습니다.</NoList>
            <BlueButton onPress={() => props.navigation.pop()}>
              <Image source={require("../../assets/images/forward.png")} />
              <BlueButtonText>뒤로가기</BlueButtonText>
            </BlueButton>
          </>
        )}
      {stampHistory && stampHistory.history && (
        <ExtendedFlatList
          style={[styles.flyerListStyle]}
          data={stampHistory.history}
          keyExtractor={(item) =>
            `${userStore.storeInfo.store_cd}-${item.reg_date}-${item.trade_nm}`
          }
          renderItem={(itemData) => <BoardItem item={itemData.item} />}
        />
      )}
    </BaseScreen>
  );
};

const NoList = styled(BaseText)({
  fontSize: 25,
  fontFamily: "Roboto-Bold",
  textAlign: "center",
  width: "100%",
  marginTop: 50,
  marginBottom: 70,
});
const BackBtn = styled(BlueButton)({});
export const screenOptions = ({ navigation }) => {
  return {
    cardStyle: { backgroundColor: colors.trueWhite, paddingBottom: 0 },
    title: "교환내역",
    headerLeft: () => <BackButton />,
    headerTitle: (props) => <TextTitle {...props} />,
    headerRight: (props) => <></>,
  };
};

export default EventStampHistoryScreen;
