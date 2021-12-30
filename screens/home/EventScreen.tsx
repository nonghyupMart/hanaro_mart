import { useIsFocused } from "@react-navigation/native";
import _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import BaseScreen from "../../components/BaseScreen";
import EventItem from "../../components/event/EventItem";
import CategoryButtonSmallList from "../../components/UI/CategoryButtonSmallList";
import ExtendedFlatList from "../../components/UI/ExtendedFlatList";
import { BackButton, TextTitle } from "../../components/UI/header";
import NoList from "../../components/UI/NoList";
import colors from "../../constants/Colors";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { checkAuth } from "../../store/actions/auth";
import * as CommonActions from "../../store/actions/common";
import * as eventActions from "../../store/actions/event";

// let isMoved = false;

const EventScreen = (props: any) => {
  const eventCategory = [
    { type_nm: "전체", type_val: "" },
    { type_nm: "일반", type_val: "A" },
    { type_nm: "경품", type_val: "B" },
    { type_nm: "스탬프", type_val: "C" },
  ];
  const [gbn, setGbn] = useState("");
  const routeName = props.route.name;
  const navigation = props.navigation;
  const isFocused = useIsFocused();
  const params = props.route.params;

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.common.isLoading);
  const page = useRef(1);
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const userStore = useAppSelector((state) => state.auth.userStore);
  const link = useAppSelector((state) => state.common.link);
  let event;
  if (routeName === "MyEvent") {
    //이벤트응모내역 일 경우..
    event = useAppSelector((state) => state.event.myEvent);
  } else {
    event = useAppSelector((state) => state.event.event);
  }

  useEffect(() => {
    if (link?.category === routeName && link.link_code) {
      setTimeout(async () => {
        await moveToDetail(link.link_code);
        await dispatch(CommonActions.setLink(null));
      }, 500);
    }
  }, [link]);

  useEffect(() => {
    if (!isFocused) {
      return;
    }
    if (!_.isEmpty(userStore)) {
      page.current = 1;
      fetchEvent();
    }
  }, [gbn, isFocused, userStore]);

  const fetchEvent = (p = page.current) => {
    let query = {
      store_cd: userStore?.storeInfo.store_cd,
      page: p,
      gbn: gbn,
    };
    if (routeName === "MyEvent") query.user_cd = userInfo?.user_cd;
    dispatch(eventActions.fetchEvent(query));
  };
  const loadMore = () => {
    if (!isLoading && page.current + 1 <= event.finalPage) {
      page.current++;
      fetchEvent(page.current);
    }
  };

  const moveToDetail = async (event_cd, gbn = "") => {
    if (!userInfo?.ci) {
      checkAuth(dispatch, !!userInfo?.ci);
      return;
    }
    await navigation.navigate("EventDetail", { event_cd: event_cd, gbn: gbn });
  };
  const onPress = (item) => {
    moveToDetail(item.event_cd, item.gbn);
  };
  if (!event) return <></>;
  if (routeName === "MyEvent" && _.size(event.eventList) === 0)
    return (
      <>
        <CategoryButtonSmallList
          data={eventCategory}
          value={gbn}
          setValue={setGbn}
        />
        <NoList
          source={require("../../assets/images/megaphone.png")}
          text={"응모한 이벤트"}
          infoText="응모한 이벤트 내역이 없습니다."
        />
      </>
    );
  if (routeName === "Event" && _.size(event.eventList) === 0)
    return (
      <>
        <CategoryButtonSmallList
          data={eventCategory}
          value={gbn}
          setValue={setGbn}
        />
        <NoList
          source={require("../../assets/images/megaphone.png")}
          text={"이벤트"}
        />
      </>
    );
  return (
    <BaseScreen style={styles.screen} contentStyle={{ paddingTop: 0 }}>
      <CategoryButtonSmallList
        data={eventCategory}
        value={gbn}
        setValue={setGbn}
      />
      {event && (
        <ScrollList
          listKey={`${userStore.storeInfo.store_cd}-${routeName}`}
          numColumns={1}
          data={event.eventList}
          keyExtractor={(item) =>
            `${userStore.storeInfo.store_cd}-${item.event_cd}`
          }
          onEndReached={loadMore}
          renderItem={(itemData) => {
            return (
              <EventItem
                item={itemData.item}
                onPress={onPress.bind(this, itemData.item)}
              />
            );
          }}
        />
      )}
    </BaseScreen>
  );
};
export const screenOptions = ({ navigation }) => {
  return {
    title: "이벤트 응모내역",
    headerLeft: () => <BackButton />,
    headerTitle: (props) => <TextTitle {...props} />,
    headerRight: () => <></>,
  };
};

const ScrollList = styled(ExtendedFlatList)({
  flexGrow: 1,
  marginTop: 30.5,
  width: "100%",
  // backgroundColor: colors.BLACK,
});
const styles = StyleSheet.create({
  screen: { backgroundColor: colors.TRUE_WHITE },
});

export default EventScreen;
