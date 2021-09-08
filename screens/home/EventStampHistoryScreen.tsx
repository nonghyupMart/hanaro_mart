import React, { useEffect } from "react";
import { Image, Platform } from "react-native";
import styled from "styled-components/native";
import BaseScreen from "../../components/BaseScreen";
import BoardItem from "../../components/board/BoardItem";
import {
  BaseText,
  BlueButton,
  BlueButtonText
} from "../../components/UI/BaseUI";
import ExtendedFlatList from "../../components/UI/ExtendedFlatList";
import { BackButton, TextTitle } from "../../components/UI/header";
import colors from "../../constants/Colors";
import { useAppDispatch, useAppSelector } from "../../hooks";
import * as eventActions from "../../store/actions/event";
import { styles } from "./FlyerScreen";

const EventStampHistoryScreen = (props) => {
  const params = props.route.params;
  const userStore = useAppSelector((state) => state.auth.userStore);
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const dispatch = useAppDispatch();

  const stampHistory = useAppSelector((state) => state.event.stampHistory);

  useEffect(() => {
    fetchStampHistory();
    return () => {
      dispatch(eventActions.clearStampHistory());
    };
  }, []);

  const fetchStampHistory = () => {
    dispatch(
      eventActions.fetchStampHistory({
        user_cd: userInfo?.user_cd,
        event_cd: params.event_cd,
      })
    );
  };

  if (!stampHistory) return <></>;

  return (
    <BaseScreen
      style={{
        backgroundColor: colors.TRUE_WHITE,
      }}
      contentStyle={{
        backgroundColor: colors.TRUE_WHITE,
        paddingTop: Platform.OS === "ios" ? 19 : 19,
      }}
    >
      {stampHistory?.history?.length <= 0 && (
        <>
          <NoList>내역이 없습니다.</NoList>
          <BlueButton onPress={() => props.navigation.pop()}>
            <Image source={require("../../assets/images/forward.png")} />
            <BlueButtonText>뒤로가기</BlueButtonText>
          </BlueButton>
        </>
      )}
      {stampHistory?.history && (
        <ExtendedFlatList
          style={[styles.flyerListStyle]}
          data={stampHistory?.history}
          keyExtractor={(item) =>
            `${userStore?.storeInfo.store_cd}-${item.reg_date}-${item.trade_nm}`
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
export const screenOptions = () => {
  return {
    contentStyle: { backgroundColor: colors.TRUE_WHITE, paddingBottom: 0 },
    title: "교환내역",
    headerLeft: () => <BackButton />,
    headerTitle: (props) => <TextTitle {...props} />,
    headerRight: () => <></>,
  };
};

export default EventStampHistoryScreen;
