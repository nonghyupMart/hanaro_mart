import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import BaseScreen from "../../components/BaseScreen";
import { useSelector, useDispatch } from "react-redux";
import * as eventActions from "../../store/actions/event";
import * as authActions from "../../store/actions/auth";
import { BackButton, TextTitle } from "../../components/UI/header";
import { IMAGE_URL } from "../../constants";
import ImageViewer from "react-native-image-zoom-viewer";
import Modal from "react-native-modal";

import {
  DetailContainer,
  BaseImage,
  ScaledImage,
  SCREEN_WIDTH,
  BaseButtonContainer,
  BaseText,
} from "../../components/UI/BaseUI";

import A from "../../screens/home/EventDetail/A";
import B from "../../screens/home/EventDetail/B";
import C from "../../screens/home/EventDetail/C";
import { setAlert, setIsLoading } from "../../store/actions/common";
import * as CommonActions from "../../store/actions/common";
import { PinchGestureHandler } from "react-native-gesture-handler";

const EventDetailScreen = (props) => {
  const dispatch = useDispatch();
  const [scrollRef, setScrollRef] = useState();
  const isLoading = useSelector((state) => state.common.isLoading);
  const [isZoom, setIsZoom] = useState(false);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const userStore = useSelector((state) => state.auth.userStore);
  const eventDetail = useSelector((state) => state.event.eventDetail);
  const params = props.route.params;
  const [rcp_qr, setRcp_qr] = useState();
  const [reg_num, setReg_num] = useState();
  const [checkItem, setCheckItem] = useState({
    isRequired: true,
    isOpen: false,
    isChecked: false,
    child: [
      { id: 0, isChecked: false },
      { id: 1, isChecked: false },
    ],
  });

  useEffect(() => {
    dispatch(CommonActions.setBottomNavigation(false));
    return () => {
      dispatch(CommonActions.setBottomNavigation(true));
    };
  }, []);

  useEffect(() => {
    requestEvent();
  }, [dispatch]);

  const requestEvent = () => {
    return dispatch(
      eventActions.fetchEventDetail({
        event_cd: params.event_cd,
        user_cd: userInfo.user_cd,
      })
    );
  };

  const alertSusscess = (message = "응모 되었습니다.") => {
    dispatch(
      setAlert({
        message: message,
        onPressConfirm: () => {
          dispatch(setAlert(null));
        },
      })
    );
  };
  const onExchangeStamp = (QRCode) => {
    // if (!checkQRLength(QRCode, 12)) return;

    dispatch(
      eventActions.exchangeStamp({
        event_cd: params.event_cd,
        user_cd: userInfo.user_cd,
        store_cd: userStore.storeInfo.store_cd,
        mana_qr: QRCode,
      })
    ).then((data) => {
      if (!data.eventInfo) return;
      dispatch(eventActions.updateEventDetail(data.eventInfo));
      alertSusscess("교환처리 되었습니다.");
    });
  };

  const onInterimExchangeStamp = (QRCode) => {
    dispatch(
      eventActions.interimExchangeStamp({
        event_cd: params.event_cd,
        user_cd: userInfo.user_cd,
        store_cd: userStore.storeInfo.store_cd,
        mana_qr: QRCode,
      })
    ).then((data) => {
      if (!data.eventInfo) return;
      dispatch(eventActions.updateEventDetail(data.eventInfo));
      alertSusscess("교환처리 되었습니다.");
    });
  };
  const onApplyStamp = (QRCode) => {
    // if (!checkQRLength(QRCode, 40)) return;
    // if (!checkRequiredAmount(QRCode)) return;
    let query = {
      event_cd: params.event_cd,
      user_cd: userInfo.user_cd,
      store_cd: userStore.storeInfo.store_cd,
      rcp_qr: QRCode,
    };

    if (userInfo.marketing_agree == "N") query.marketing_agree = "Y";
    dispatch(eventActions.applyStamp(query)).then((data) => {
      if (!data.eventInfo) return;
      userInfo.marketing_agree = "Y";

      dispatch(authActions.setUserInfo(userInfo));
      authActions.saveUserInfoToStorage(userInfo);

      dispatch(eventActions.updateEventDetail(data.eventInfo));
      alertSusscess();
    });
  };
  const validateAgree = () => {
    if (userInfo && userInfo.marketing_agree == "N") {
      if (
        !checkItem.isChecked ||
        !checkItem.child[0].isChecked ||
        !checkItem.child[1].isChecked
      ) {
        dispatch(
          setAlert({
            message: "행사안내 및 이벤트 수신동의에 동의해주세요.",
            onPressConfirm: () => {
              dispatch(setAlert(null));
            },
          })
        );
        return false;
      }
    }

    return true;
  };
  const onApply = (QRCode) => {
    if (!validateAgree()) return;
    if (QRCode) {
      // if (!checkQRLength(QRCode, 40) || !checkRequiredAmount(QRCode)) {
      //   setRcp_qr(null);
      //   return false;
      // }
      setRcp_qr(QRCode);
    }
    let query = {
      event_cd: params.event_cd,
      user_cd: userInfo.user_cd,
      store_cd: userStore.storeInfo.store_cd,
      reg_num,
    };
    if (QRCode) query.rcp_qr = QRCode;
    if (userInfo.marketing_agree == "N") query.marketing_agree = "Y";
    dispatch(eventActions.applyEvent(query)).then((data) => {
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
          <TouchableOpacity
            activeOpacity={1}
            onPress={setIsZoom.bind(this, true)}
            style={{ width: "100%" }}
          >
            <PinchGestureHandler onGestureEvent={setIsZoom.bind(this, true)}>
              <ScaledImage
                key={eventDetail.detail_img}
                source={eventDetail.detail_img}
                style={{}}
                width={SCREEN_WIDTH}
              />
            </PinchGestureHandler>
          </TouchableOpacity>

          <Modal
            style={{
              marginLeft: 0,
              marginRight: 0,
              marginTop: 0,
              marginBottom: 0,
            }}
            visible={isZoom}
            transparent={true}
            useNativeDriver={true}
            hideModalContentWhileAnimating={true}
            onRequestClose={setIsZoom.bind(this, false)}
          >
            <ImageViewer
              onClick={setIsZoom.bind(this, false)}
              renderIndicator={() => null}
              imageUrls={[{ url: IMAGE_URL + eventDetail.detail_img }]}
            />
          </Modal>
          {eventDetail.entry &&
            eventDetail.entry.entry_date_yn == "Y" &&
            eventDetail.gbn == "A" && (
              <A
                {...props}
                onApply={onApply}
                eventDetail={eventDetail}
                scrollRef={scrollRef}
                checkItem={checkItem}
                setCheckItem={setCheckItem}
                validateAgree={validateAgree}
                reg_num={reg_num}
                setReg_num={setReg_num}
              />
            )}
          {eventDetail.entry &&
            eventDetail.entry.entry_date_yn == "Y" &&
            eventDetail.gbn == "B" && (
              <B
                {...props}
                scrollRef={scrollRef}
                key={scrollRef}
                onApply={onApply}
                setRcp_qr={setRcp_qr}
                rcp_qr={rcp_qr}
                eventDetail={eventDetail}
                checkItem={checkItem}
                setCheckItem={setCheckItem}
                validateAgree={validateAgree}
                reg_num={reg_num}
                setReg_num={setReg_num}
              />
            )}
          {eventDetail.entry && eventDetail.gbn == "C" && (
            <C
              {...props}
              scrollRef={scrollRef}
              key={scrollRef}
              onApply={onApplyStamp}
              setRcp_qr={setRcp_qr}
              eventDetail={eventDetail}
              onExchangeStamp={onExchangeStamp}
              onInterimExchangeStamp={onInterimExchangeStamp}
              checkItem={checkItem}
              setCheckItem={setCheckItem}
              validateAgree={validateAgree}
              reg_num={reg_num}
              setReg_num={setReg_num}
            />
          )}
          {!!eventDetail.winner_img && (
            <View style={{ marginTop: 30 }}>
              <ScaledImage
                key={eventDetail.winner_img}
                source={eventDetail.winner_img}
                style={{}}
                width={SCREEN_WIDTH}
              />
            </View>
          )}
          {!!eventDetail.winner_memo && (
            <Text3>{eventDetail.winner_memo}</Text3>
          )}
        </DetailContainer>
      )}
    </BaseScreen>
  );
};

const Text3 = styled(BaseText)({
  fontSize: 20,
  fontWeight: "500",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.black,
  marginTop: 20,
});

export const screenOptions = ({ navigation }) => {
  return {
    title: "이벤트",
    cardStyle: {
      marginBottom: 0,
      paddingBottom: 0,
    },
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
