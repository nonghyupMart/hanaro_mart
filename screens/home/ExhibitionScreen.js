import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { View, Text, StyleSheet, FlatList } from "react-native";
import BaseScreen from "@components/BaseScreen";
import ExtendedFlatList from "@UI/ExtendedFlatList";
import { useSelector, useDispatch } from "react-redux";
import * as exhibitionActions from "@actions/exhibition";
import * as exclusiveActions from "@actions/exclusive";
import { StyleConstants, screenWidth } from "@UI/BaseUI";
import EventItem from "@components/EventItem";
import { useIsFocused } from "@react-navigation/native";
import { BackButton, TextTitle } from "@UI/header";
import _ from "lodash";
import { setIsLoading } from "@actions/common";
import { TabMenus } from "@constants/menu";
import NoList from "@UI/NoList";

const ExhibitionScreen = (props) => {
  const routeName = props.route.name;
  const navigation = props.navigation;
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.common.isLoading);
  const [page, setPage] = useState(1);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const userStore = useSelector((state) => state.auth.userStore);
  const [tabInfo, setTabInfo] = useState();
  let data;
  if (routeName == "Exhibition") {
    data = useSelector((state) => state.exhibition.exhibition);
  } else {
    data = useSelector((state) => state.exclusive.exclusive);
  }
  useEffect(() => {
    const currentTab = TabMenus.filter((tab) => tab.name == routeName);

    const tab = userStore.menuList.filter(
      (menu) => menu.r_menu_nm == currentTab[0].title
    );

    if (tab[0].menu_nm) {
      setTabInfo(tab[0]);
      props.navigation.setOptions({
        title: tab[0].menu_nm,
      });
    }
    const unsubscribe = navigation.addListener("focus", () => {
      if (userStore) {
        setPage(1);
        fetchExhibition();
      }
    });
    return unsubscribe;
  }, [userStore]);

  const fetchExhibition = (p = page) => {
    dispatch(setIsLoading(true));
    let query = {
      store_cd: userStore.storeInfo.store_cd,
      page: p,
    };
    if (routeName == "Exhibition") {
      dispatch(exhibitionActions.fetchExhibition(query)).then(() => {
        dispatch(setIsLoading(false));
      });
    } else {
      dispatch(exclusiveActions.fetchExclusive(query)).then(() => {
        dispatch(setIsLoading(false));
      });
    }
  };
  const loadMore = () => {
    if (!isLoading && page + 1 <= data.finalPage) {
      fetchExhibition(page + 1);
      setPage(page + 1);
    }
  };

  const onPress = (item) => {
    dispatch(setIsLoading(true));
    if (routeName == "Exhibition") {
      navigation.navigate("ExhibitionDetail", { event_cd: item.plan_cd });
    } else {
      navigation.navigate("ForStoreDetail", { event_cd: item.exclu_cd });
    }
  };
  if (!data) return <></>;
  if (
    (routeName == "Exhibition" && _.size(data.list) === 0) ||
    (routeName == "ForStore" && _.size(data.list) === 0)
  )
    return (
      <NoList
        source={
          routeName == "Exhibition"
            ? require("@images/diamond.png")
            : require("@images/shopwhite.png")
        }
        text={tabInfo && tabInfo.menu_nm}
      />
    );
  return (
    <BaseScreen
      style={styles.screen}
      contentStyle={{ paddingTop: 0, backgroundColor: colors.trueWhite }}
    >
      {data && (
        <ScrollList
          numColumns={1}
          data={data.list}
          keyExtractor={(item, index) => `${index}`}
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
    title: "기획전",
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

export default ExhibitionScreen;
