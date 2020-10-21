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
import { setAlert, setIsLoading } from "@actions/common";

const EventDetailScreen = (props, { navigation }) => {
  const dispatch = useDispatch();
  const [scrollRef, setScrollRef] = useState();
  const isLoading = useSelector((state) => state.common.isLoading);

  const [imageHeight, setImageHeight] = useState(0);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const userStore = useSelector((state) => state.auth.userStore);
  const eventDetail = useSelector((state) => state.event.eventDetail);
  const params = props.route.params;
  const [rcp_qr, setRcp_qr] = useState();
  // useEffect(() => {
  //   return () => {
  //     dispatch(eventActions.clearEventDetail());
  //   };
  // }, []);
  useEffect(() => {
    requestEvent();
  }, [dispatch]);

  const requestEvent = () => {
    dispatch(setIsLoading(true));
    dispatch(
      eventActions.fetchEventDetail({
        event_cd: params.event_cd,
        user_cd: userInfo.user_cd,
      })
    ).then(() => {
      dispatch(setIsLoading(false));
    });
  };
  const checkQRLength = (val, length) => {
    if (val.length !== length) {
      dispatch(
        setAlert({
          message: "QR코드가 정확하지 않습니다.",
          onPressConfirm: () => {
            dispatch(setAlert(null));
          },
        })
      );
      return false;
    }
    return true;
  };
  const checkRequiredAmount = (val) => {
    const price = val.substr(val.length - 10);
    if (price < eventDetail.entry.entry_price) {
      dispatch(
        setAlert({
          message: "영수증 금액이 부족합니다.",
          onPressConfirm: () => {
            dispatch(setAlert(null));
          },
        })
      );
      return false;
    }
    return true;
  };
  const alertSusscess = () => {
    dispatch(
      setAlert({
        message: "응모 되었습니다.",
        onPressConfirm: () => {
          dispatch(setAlert(null));
          requestEvent();
        },
      })
    );
  };
  const onExchangeStamp = (QRCode) => {
    if (!checkQRLength(QRCode, 12)) return;

    dispatch(
      eventActions.exchangeStamp({
        event_cd: params.event_cd,
        user_cd: userInfo.user_cd,
        store_cd: userStore.storeInfo.store_cd,
        mana_qr: QRCode,
      })
    ).then((data) => {
      if (data.result == "success") {
        alertSusscess();
      }
    });
  };
  const onApplyStamp = (QRCode) => {
    if (!checkQRLength(QRCode, 40)) return;
    if (!checkRequiredAmount(QRCode)) return;

    dispatch(
      eventActions.applyStamp({
        event_cd: params.event_cd,
        user_cd: userInfo.user_cd,
        store_cd: userStore.storeInfo.store_cd,
        rcp_qr: QRCode,
      })
    ).then((data) => {
      if (data.result == "success") {
        alertSusscess();
      }
    });
  };
  const onApply = (reg_num) => {
    if (rcp_qr) {
      if (!checkQRLength(rcp_qr, 40)) return;
      if (!checkRequiredAmount(rcp_qr)) return;
    }
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
        eventDetail.entry.status = "20";
        dispatch(eventActions.updateEventDetail(eventDetail));
        alertSusscess();
      }
    });
  };
  if (!eventDetail || isLoading) return <></>;
  return (
    <BaseScreen
      setScrollRef={setScrollRef}
      style={{ backgroundColor: colors.trueWhite }}
      isPadding={false}
      contentStyle={{
        paddingTop: 0,
        paddingBottom: 0,
        backgroundColor: colors.trueWhite,
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
            key={eventDetail.detail_img}
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
                eventDetail={eventDetail}
                scrollRef={scrollRef}
              />
            )}
          {eventDetail.entry &&
            eventDetail.entry_yn == "Y" &&
            eventDetail.gbn == "B" && (
              <B
                {...props}
                scrollRef={scrollRef}
                key={scrollRef}
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
                onApply={onApply}
                setRcp_qr={onApplyStamp}
                eventDetail={eventDetail}
                setMana_qr={onExchangeStamp}
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
    backgroundColor: colors.trueWhite,
  },
});

export default EventDetailScreen;
