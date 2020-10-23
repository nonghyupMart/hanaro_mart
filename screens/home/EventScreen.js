import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { View, Text, StyleSheet, FlatList } from "react-native";
import BaseScreen from "@components/BaseScreen";
import ExtendedFlatList from "@UI/ExtendedFlatList";
import { useSelector, useDispatch } from "react-redux";
import * as eventActions from "@actions/event";
import { StyleConstants, screenWidth } from "@UI/BaseUI";
import EventItem from "@components/EventItem";
import { useIsFocused } from "@react-navigation/native";
import { EmptyText, EmptyScreen, EmptyIcon } from "@UI/BaseUI";
import { BackButton, TextTitle } from "@UI/header";
import _ from "lodash";
import { setIsLoading } from "@actions/common";

const EventScreen = (props) => {
  const routeName = props.route.name;
  const navigation = props.navigation;
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.common.isLoading);
  const [page, setPage] = useState(1);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const userStore = useSelector((state) => state.auth.userStore);
  let event;
  if (routeName == "MyEvent") {
    //이벤트응모내역 일 경우..
    event = useSelector((state) => state.event.myEvent);
  } else {
    event = useSelector((state) => state.event.event);
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (userStore) {
        setPage(1);
        fetchEvent();
      }
    });
    return unsubscribe;
  }, [userStore]);

  const fetchEvent = (p = page) => {
    dispatch(setIsLoading(true));
    let query = {
      store_cd: userStore.storeInfo.store_cd,
      page: p,
    };
    if (routeName == "MyEvent") query.user_cd = userInfo.user_cd;
    dispatch(eventActions.fetchEvent(query)).then(() => {
      dispatch(setIsLoading(false));
    });
  };
  const loadMore = () => {
    if (!isLoading && page + 1 <= event.finalPage) {
      fetchEvent(page + 1);
      setPage(page + 1);
    }
  };

  const onPress = (item) => {
    dispatch(setIsLoading(true));
    navigation.navigate("EventDetail", { event_cd: item.event_cd });
  };
  if (!event) return <></>;
  if (routeName == "MyEvent" && _.size(event.eventList) === 0)
    return (
      <EmptyScreen>
        <EmptyIcon source={require("@images/not02.png")} />
        <EmptyText>{`응모한 이벤트가\n없습니다.`}</EmptyText>
      </EmptyScreen>
    );
  if (routeName == "Event" && _.size(event.eventList) === 0)
    return (
      <EmptyScreen>
        <EmptyIcon source={require("@images/not02.png")} />
        <EmptyText>{`현재 진행중인 이벤트가\n없습니다.`}</EmptyText>
      </EmptyScreen>
    );
  return (
    <BaseScreen style={styles.screen} contentStyle={{ paddingTop: 0 }}>
      {event && (
        <ScrollList
          numColumns={1}
          data={event.eventList}
          keyExtractor={(item) => `${item.event_cd}`}
          onEndReached={loadMore}
          renderItem={(itemData) => {
            return (
              <EventItem
                item={itemData.item}
                onPress={() => onPress(itemData.item)}
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

  width: "100%",
  // backgroundColor: colors.black,
});
const styles = StyleSheet.create({
  screen: { backgroundColor: colors.trueWhite },
});

export default EventScreen;
