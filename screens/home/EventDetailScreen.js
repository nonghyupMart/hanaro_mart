import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { View, Text, StyleSheet, Image } from "react-native";
import BaseScreen from "@components/BaseScreen";
import { useSelector, useDispatch } from "react-redux";
import * as eventActions from "@actions/event";
import { BackButton, TextTitle } from "@UI/header";
import { IMAGE_URL } from "@constants/settings";
import AutoHeightImage from "react-native-auto-height-image";

import {
  DetailContainer,
  BaseImage,
  ScaledImage,
  screenWidth,
  BaseButtonContainer,
} from "@UI/BaseUI";

import A from "@screens/home/EventDetail/A";
import B from "@screens/home/EventDetail/B";
import C from "@screens/home/EventDetail/C";
const EventDetailScreen = (props, { navigation }) => {
  const dispatch = useDispatch();
  const [alert, setAlert] = useState();
  const [scrollRef, setScrollRef] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [imageHeight, setImageHeight] = useState(0);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const userStore = useSelector((state) => state.auth.userStore);
  const eventDetail = useSelector((state) => state.event.eventDetail);
  const params = props.route.params;
  const [rcp_qr, setRcp_qr] = useState();

  useEffect(() => {
    setIsLoading(true);

    const requestEvent = dispatch(
      eventActions.fetchEventDetail({
        event_cd: params.event_cd,
        user_cd: userInfo.user_cd,
      })
    );

    Promise.all([requestEvent]).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);
  const onApply = (reg_num) => {
    dispatch(
      eventActions.applyEvent({
        event_cd: params.event_cd,
        user_cd: userInfo.user_cd,
        store_cd: userStore.storeInfo.store_cd,
        reg_num,
        rcp_qr,
      })
    ).then((data) => {
      if (data.result == "success") {
        eventDetail.entry.entry_status = "20";
        dispatch(eventActions.updateEventDetail(eventDetail));
      }
    });
  };
  return (
    <BaseScreen
      alert={alert}
      setScrollRef={setScrollRef}
      isLoading={isLoading}
      style={styles.screen}
      contentStyle={{
        paddingTop: 0,
        paddingBottom: 0,
      }}
    >
      {eventDetail && (
        <DetailContainer
          style={{
            paddingLeft: 0,
            paddingRight: 0,
            marginBottom: 0,
          }}
        >
          <ScaledImage
            source={eventDetail.detail_img}
            style={{}}
            width={screenWidth}
          />
          {eventDetail.entry &&
            eventDetail.entry_yn == "Y" &&
            eventDetail.gbn == "A" && (
              <A
                {...props}
                onApply={onApply}
                setAlert={setAlert}
                eventDetail={eventDetail}
              />
            )}
          {eventDetail.entry &&
            eventDetail.entry_yn == "Y" &&
            eventDetail.gbn == "B" && (
              <B
                {...props}
                scrollRef={scrollRef}
                key={scrollRef}
                setAlert={setAlert}
                onApply={onApply}
                setRcp_qr={setRcp_qr}
                rcp_qr={rcp_qr}
                eventDetail={eventDetail}
              />
            )}
          {eventDetail.entry &&
            eventDetail.entry_yn == "Y" &&
            eventDetail.gbn == "C" && (
              <C
                {...props}
                scrollRef={scrollRef}
                key={scrollRef}
                setAlert={setAlert}
                onApply={onApply}
                setRcp_qr={setRcp_qr}
                rcp_qr={rcp_qr}
                eventDetail={eventDetail}
              />
            )}
        </DetailContainer>
      )}
    </BaseScreen>
  );
};

export const screenOptions = ({ navigation }) => {
  return {
    title: "이벤트",

    headerLeft: () => <BackButton />,
    headerTitle: (props) => <TextTitle {...props} />,
    headerRight: () => <></>,
  };
};

const styles = StyleSheet.create({
  screen: {
    paddingLeft: 0,
    paddingRight: 0,
  },
});

export default EventDetailScreen;
