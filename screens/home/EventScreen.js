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
import { EmptyText } from "@UI/BaseUI";
const EventScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [alert, setAlert] = useState();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const userStore = useSelector((state) => state.auth.userStore);
  const event = useSelector((state) => state.event.event);

  useEffect(() => {
    // const unsubscribe = navigation.addListener("focus", () => {
    if (userStore) {
      setIsLoading(true);
      setPage(1);

      const requestEvent = dispatch(
        eventActions.fetchEvent({
          store_cd: userStore.storeInfo.store_cd,
        })
      );

      Promise.all([requestEvent]).then(() => {
        setIsLoading(false);
      });
    }
    // });
  }, [userStore]);

  const loadMore = () => {
    if (!isLoading && page + 1 <= event.finalPage) {
      const requestEvent = dispatch(
        eventActions.fetchEvent({
          store_cd: userStore.storeInfo.store_cd,
          page: page + 1,
        })
      );
      setPage(page + 1);
    }
  };

  const onPress = (item) => {
    navigation.navigate("EventDetail", { event_cd: item.event_cd });
  };
  if (!event) return <></>;
  if (event && event.eventList.length === 0)
    return (
      <BaseScreen isScroll={false} isCenter={true}>
        <EmptyText>{`현재 진행중인 이벤트가\n없습니다.`}</EmptyText>
      </BaseScreen>
    );
  return (
    <BaseScreen
      alert={alert}
      isLoading={isLoading}
      style={styles.screen}
      contentStyle={{ paddingTop: 0 }}
    >
      {event && (
        <ScrollList
          numColumns={1}
          data={event.eventList}
          keyExtractor={(item) => item.event_cd}
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
const ScrollList = styled(ExtendedFlatList)({
  flexGrow: 1,

  width: "100%",
  // backgroundColor: colors.black,
});
const styles = StyleSheet.create({
  screen: { backgroundColor: colors.trueWhite },
});

export default EventScreen;
