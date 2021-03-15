import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components/native";
import { View, Text, StyleSheet, FlatList } from "react-native";
import BaseScreen from "../../components/BaseScreen";
import ExtendedFlatList from "../../components/UI/ExtendedFlatList";
import { useSelector, useDispatch } from "react-redux";
import * as exhibitionActions from "../../store/actions/exhibition";
import * as exclusiveActions from "../../store/actions/exclusive";
import { StyleConstants, SCREEN_WIDTH } from "../../components/UI/BaseUI";
import EventItem from "../../components/EventItem";
import { useIsFocused } from "@react-navigation/native";
import { BackButton, TextTitle } from "../../components/UI/header";
import _ from "lodash";
import { setIsLoading } from "../../store/actions/common";
import { TabMenus } from "../../constants/menu";
import NoList from "../../components/UI/NoList";
import * as CommonActions from "../../store/actions/common";

const ExhibitionScreen = (props) => {
  const routeName = props.route.name;
  const navigation = props.navigation;
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.common.isLoading);
  const page = useRef(1);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const userStore = useSelector((state) => state.auth.userStore);
  const [tabInfo, setTabInfo] = useState();
  const link = useSelector((state) => state.common.link);

  let data;
  if (routeName == "Exhibition") {
    data = useSelector((state) => state.exhibition.exhibition);
  } else {
    data = useSelector((state) => state.exclusive.exclusive);
  }

  useEffect(() => {
    if (link && link.category == routeName) {
      setTimeout(async () => {
        await moveToDetail(link.link_code);
        await dispatch(CommonActions.setLink(null));
      }, 0);
    }
  }, [link]);

  const moveToDetail = (event_cd) => {
    dispatch(setIsLoading(true));
    if (routeName == "Exhibition") {
      navigation.navigate("ExhibitionDetail", { event_cd: event_cd });
    } else {
      navigation.navigate("ForStoreDetail", { event_cd: event_cd });
    }
  };

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
        page.current = 1;
        fetchExhibition();
      }
    });
    return unsubscribe;
  }, [userStore]);

  const fetchExhibition = (p = page.current) => {
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
    if (!isLoading && page.current + 1 <= data.finalPage) {
      page.current++;
      fetchExhibition(page.current);
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
            ? require("../../assets/images/diamond.png")
            : require("../../assets/images/shopwhite.png")
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
          keyExtractor={(item, index) =>
            `${userStore.storeInfo.store_cd}-${index}`
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
