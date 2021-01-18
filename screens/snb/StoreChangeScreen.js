import React, { useEffect, useState, Fragment } from "react";
import styled from "styled-components/native";
import { useSelector, useDispatch } from "react-redux";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Platform,
  Image,
  AppState,
} from "react-native";
import ExtendedFlatList from "@UI/ExtendedFlatList";
import { BackButton, TextTitle } from "@UI/header";
import {
  BaseButtonContainer,
  BaseTouchable,
  screenWidth,
  StyleConstants,
} from "@UI/BaseUI";
import colors from "@constants/colors";
import * as Location from "expo-location";
import StoreItem from "@components/store/StoreItem";
import BaseScreen from "@components/BaseScreen";
import PickerViews from "@components/store/PickerViews";
import SearchBar from "@components/store/SearchBar";
import InfoBox from "@components/store/InfoBox";
import HistoryList from "@components/store/HistoryList";
import _ from "lodash";
import * as branchesActions from "@actions/branches";
import { setIsLoading } from "@actions/common";

const StoreChangeScreen = (props) => {
  const dispatch = useDispatch();
  const userStore = useSelector((state) => state.auth.userStore);
  const isJoin = useSelector((state) => state.auth.isJoin);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const isLoading = useSelector((state) => state.common.isLoading);
  const [lname, setLname] = useState(null);
  const [mname, setMname] = useState(null);
  const [store_nm, setStore_nm] = useState("");
  const [pageNum, setPage] = useState(1);

  const address1 = useSelector((state) => state.branches.address1);
  const address2 = useSelector((state) => state.branches.address2);
  const branches = useSelector((state) => state.branches.branches);
  const storeMark = useSelector((state) => state.branches.storeMark);
  const [location, setLocation] = useState(null);
  useEffect(() => {
    (async () => {
      if (AppState.currentState != "active") return;
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        // setErrorMsg("Permission to access location was denied");
      }

      let provider = await Location.getProviderStatusAsync();
      if (location == null) {
        let location = await Location.getCurrentPositionAsync({
          maximumAge: 60000, // only for Android
          accuracy: Platform.Android
            ? Location.Accuracy.Low
            : Location.Accuracy.Lowest,
        });
        setLocation(location);
      }
    })();
  }, []);
  useEffect(() => {
    dispatch(setIsLoading(true));
    const fetchAddress1 = dispatch(branchesActions.fetchAddress1());
    let query = {
      user_cd: userInfo.user_cd,
    };
    if (location) {
      query.lat = location.coords.latitude;
      query.lng = location.coords.longitude;
    }
    const fetchStoreMark = isJoin
      ? dispatch(branchesActions.fetchStoreMark(query))
      : null;
    fetchBranches();

    Promise.all([fetchAddress1, fetchStoreMark]).then(() => {
      dispatch(setIsLoading(false));
    });
  }, [location]);

  const fetchBranches = (
    lname = lname,
    mname = mname,
    storeName = store_nm,
    page = pageNum
  ) => {
    let query = {
      lname,
      mname,
      store_nm: storeName,
      page: page,
    };
    if (location) {
      query.lat = location.coords.latitude;
      query.lng = location.coords.longitude;
    }
    return dispatch(branchesActions.fetchBranches(query));
  };
  const loadMore = async () => {
    if (!isLoading && pageNum + 1 <= branches.finalPage) {
      dispatch(setIsLoading(true));
      fetchBranches(lname, mname, store_nm, pageNum + 1).then((data) => {
        dispatch(setIsLoading(false));
      });
      setPage(pageNum + 1);
    }
  };
  return (
    <BaseScreen
      style={{
        backgroundColor: colors.trueWhite,
        paddingLeft: 0,
        paddingRight: 0,
      }}
      contentStyle={{ paddingTop: 0, backgroundColor: colors.trueWhite }}
      scrollListStyle={{ paddingRight: 0, paddingLeft: 0 }}
    >
      <InfoBox />
      {isJoin &&
        !_.isEmpty(userStore) &&
        !_.isEmpty(storeMark) &&
        _.size(storeMark.storeList) > 0 && (
          <HistoryList
            location={location}
            {...props}
            fetchBranches={fetchBranches}
          />
        )}
      <WhiteContainer>
        <SearchBar
          location={location}
          {...props}
          store_nm={store_nm}
          lname={lname}
          mname={mname}
          setStore_nm={setStore_nm}
          fetchBranches={fetchBranches}
          setPage={setPage}
        />

        <PickerViews
          location={location}
          {...props}
          store_nm={store_nm}
          lname={lname}
          mname={mname}
          address1={address1}
          address2={address2}
          setLname={setLname}
          setMname={setMname}
          fetchBranches={fetchBranches}
          setPage={setPage}
        />

        {branches && (
          <ExtendedFlatList
            onEndReached={loadMore}
            listKey="stores"
            style={{ width: "100%", flexGrow: 1 }}
            data={branches.storeList}
            keyExtractor={(item) => `stores-${item.store_cd}`}
            renderItem={(itemData) => <StoreItem item={itemData.item} />}
          />
        )}
      </WhiteContainer>
    </BaseScreen>
  );
};

export const screenOptions = ({ navigation }) => {
  return {
    title: "매장설정",
    headerLeft: (props) => <BackButton {...props} />,
    headerTitle: (props) => <TextTitle {...props} />,
    headerRight: () => <></>,
    cardStyle: { backgroundColor: colors.trueWhite, paddingBottom: 65 },
  };
};
// const SearchButton = styled(BaseButtonContainer)({});

export const WhiteContainer = styled.View({
  paddingTop: 6,
  width: "100%",
  backgroundColor: colors.trueWhite,
  flex: 1,
  height: "100%",
});

const styles = StyleSheet.create({
  row: { flexDirection: "row", justifyContent: "center", alignItems: "center" },
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: "CustomFont-Bold",
    fontSize: 18,
  },
  amount: {
    color: colors.primary,
  },
});
export default StoreChangeScreen;
