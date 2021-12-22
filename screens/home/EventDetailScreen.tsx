import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import { PinchGestureHandler } from "react-native-gesture-handler";
import ImageViewer from "react-native-image-zoom-viewer";
import Modal from "react-native-modal";
import styled from "styled-components/native";
import BaseScreen from "../../components/BaseScreen";
import {
  BaseText,
  DetailContainer,
  ScaledImage,
  SCREEN_WIDTH,
  BlueButton,
  BlueButtonText,
} from "../../components/UI/BaseUI";
import { BackButton, TextTitle } from "../../components/UI/header";
import { IMAGE_URL } from "../../constants";
import colors from "../../constants/Colors";
import { useAppDispatch, useAppSelector } from "../../hooks";
import * as authActions from "../../store/actions/auth";
import * as CommonActions from "../../store/actions/common";
import { setAlert } from "../../store/actions/common";
import * as eventActions from "../../store/actions/event";
import A from "./EventDetail/A";
import B from "./EventDetail/B";
import C from "./EventDetail/C";

const EventDetailScreen = (props) => {
  const dispatch = useAppDispatch();
  const [scrollRef, setScrollRef] = useState();
  const [isZoom, setIsZoom] = useState(false);
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const userStore = useAppSelector((state) => state.auth.userStore);
  const eventDetail = useAppSelector((state) => state.event.eventDetail);
  const [key, setKey] = useState(Math.random());
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
      dispatch(eventActions.clearEventDetail());
    };
  }, []);

  useEffect(() => {
    requestEvent();
  }, [dispatch]);

  const requestEvent = () => {
    return dispatch(
      eventActions.fetchEventDetail({
        event_cd: params.event_cd,
        user_cd: userInfo?.user_cd,
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
        user_cd: userInfo?.user_cd,
        store_cd: userStore?.storeInfo.store_cd,
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
        user_cd: userInfo?.user_cd,
        store_cd: userStore?.storeInfo.store_cd,
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
      user_cd: userInfo?.user_cd,
      store_cd: userStore?.storeInfo.store_cd,
      rcp_qr: QRCode,
    };

    if (userInfo?.marketing_agree === "N") query.marketing_agree = "Y";
    dispatch(eventActions.applyStamp(query)).then((data) => {
      if (!data.eventInfo) return;
      let userInfoTemp = { ...userInfo };
      userInfoTemp.marketing_agree = "Y";

      dispatch(authActions.setUserInfo(userInfoTemp));
      authActions.saveUserInfoToStorage(userInfoTemp);

      dispatch(eventActions.updateEventDetail(data.eventInfo));
      alertSusscess(data.alert_msg);
    });
  };
  const validateAgree = () => {
    if (userInfo?.marketing_agree === "N") {
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
      user_cd: userInfo?.user_cd,
      store_cd: userStore?.storeInfo.store_cd,
      reg_num,
    };
    if (QRCode) query.rcp_qr = QRCode;
    if (userInfo?.marketing_agree === "N") query.marketing_agree = "Y";
    dispatch(eventActions.applyEvent(query)).then((data) => {
      if (!data.eventInfo) return;
      dispatch(eventActions.updateEventDetail(data.eventInfo));
      alertSusscess();
    });
  };
  const onScaledImageEnd = () => {
    setKey(Math.random());
  };
  if (!eventDetail) return <></>;
  return (
    <BaseScreen
      setScrollRef={setScrollRef}
      style={{ backgroundColor: colors.TRUE_WHITE }}
      isPadding={false}
      contentStyle={{
        paddingTop: 0,
        paddingBottom: 0,
        backgroundColor: colors.TRUE_WHITE,
      }}
    >
      {eventDetail && (
        <DetailContainer
          style={{
            paddingLeft: 0,
            paddingRight: 0,
            marginBottom: 0,
            paddingBottom: 50,
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
                width={SCREEN_WIDTH}
                onLoadEnd={onScaledImageEnd}
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
            isVisible={isZoom}
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
          {eventDetail.entry && eventDetail.gbn === "A" && (
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
              key={key}
            />
          )}
          {eventDetail.entry && eventDetail.gbn === "B" && (
            <B
              {...props}
              scrollRef={scrollRef}
              key={key}
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
          {eventDetail.entry && eventDetail.gbn === "C" && (
            <C
              {...props}
              scrollRef={scrollRef}
              key={key}
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
          {!!eventDetail?.link_url && (
            <BackBtn onPress={() => props.navigation.pop()}>
              <Image source={require("../../assets/images/forward.png")} />
              <BlueButtonText>이동하기</BlueButtonText>
            </BackBtn>
          )}
        </DetailContainer>
      )}
    </BaseScreen>
  );
};

const BackBtn = styled(BlueButton)({
  backgroundColor: colors.EMERALD,
  marginTop: 45,
});
const Text3 = styled(BaseText)({
  fontSize: 20,
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.BLACK,
  marginTop: 20,
});

export const screenOptions = ({ navigation }) => {
  return {
    title: "이벤트",
    contentStyle: {
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
    backgroundColor: colors.TRUE_WHITE,
  },
});

export default EventDetailScreen;
