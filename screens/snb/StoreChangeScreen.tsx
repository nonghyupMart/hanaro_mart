import React, { useEffect, useState, Fragment, useRef } from "react";
import styled from "styled-components/native";
import { StyleSheet, AppState } from "react-native";
import ExtendedFlatList from "../../components/UI/ExtendedFlatList";
import { BackButton, TextTitle } from "../../components/UI/header";
import colors from "../../constants/Colors";
import * as Location from "expo-location";
import StoreItem from "../../components/store/StoreItem";
import BaseScreen from "../../components/BaseScreen";
import PickerViews from "../../components/store/PickerViews";
import SearchBar from "../../components/store/SearchBar";
import InfoBox from "../../components/store/InfoBox";
import HistoryList from "../../components/store/HistoryList";
import _ from "lodash";
import * as branchesActions from "../../store/actions/branches";
import { PADDING_BOTTOM_MENU } from "../../constants";
import * as CommonActions from "../../store/actions/common";
import { useAppDispatch, useAppSelector } from "../../hooks";

const StoreChangeScreen = (props) => {
  const dispatch = useAppDispatch();
  const userStore = useAppSelector((state) => state.auth.userStore);
  const isJoined = useAppSelector((state) => state.auth.isJoined);
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const isLoading = useAppSelector((state) => state.common.isLoading);
  const [lname, setLname] = useState(null);
  const [mname, setMname] = useState(null);
  const [store_nm, setStore_nm] = useState("");
  const pageNum = useRef(1);

  const address1 = useAppSelector((state) => state.branches.address1);
  const address2 = useAppSelector((state) => state.branches.address2);
  const branches = useAppSelector((state) => state.branches.branches);
  const storeMark = useAppSelector((state) => state.branches.storeMark);
  const [location, setLocation] = useState(null);
  useEffect(() => {
    (async () => {
      if (_.isEmpty(userStore)) {
        dispatch(CommonActions.setBottomNavigation(false));
        props.navigation.setOptions({
          headerLeft: (props) => <></>,
          contentStyle: {
            paddingBottom: 0,
          },
        });
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        // setErrorMsg("Permission to access location was denied");
        return setLocation({
          coords: {
            latitude: "",
            longitude: "",
          },
        });
      }

      let location = await Location.getLastKnownPositionAsync();
      if (!location) {
        location = {
          coords: {
            latitude: "",
            longitude: "",
          },
        };
      }
      setLocation(location);
    })();
  }, []);
  useEffect(() => {
    if (!location) return;
    dispatch(branchesActions.fetchAddress1());
    let query = {
      lat: "",
      lng: "",
    };
    if (!_.isEmpty(userInfo)) query.user_cd = userInfo.user_cd;
    if (location) {
      query.lat = location.coords.latitude;
      query.lng = location.coords.longitude;
    }
    if (isJoined) dispatch(branchesActions.fetchStoreMark(query));
    fetchBranches(lname, mname, store_nm, pageNum.current);
  }, [location]);

  const fetchBranches = (
    lname = lname,
    mname = mname,
    storeName = store_nm,
    page = pageNum.current
  ) => {
    let query = {
      lname,
      mname,
      store_nm: storeName,
      page: page,
      lat: "",
      lng: "",
    };
    if (location) {
      query.lat = location.coords.latitude;
      query.lng = location.coords.longitude;
    }
    return dispatch(branchesActions.fetchBranches(query));
  };
  const loadMore = async () => {
    if (!isLoading && pageNum.current + 1 <= branches.finalPage) {
      pageNum.current++;
      fetchBranches(lname, mname, store_nm, pageNum.current);
    }
  };
  return (
    <BaseScreen
      style={{
        backgroundColor: colors.TRUE_WHITE,
        paddingLeft: 0,
        paddingRight: 0,
      }}
      contentStyle={{ paddingTop: 0, backgroundColor: colors.TRUE_WHITE }}
      scrollListStyle={{ paddingRight: 0, paddingLeft: 0 }}
    >
      <InfoBox />
      {isJoined &&
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
          pageNum={pageNum}
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
          pageNum={pageNum}
        />

        {branches && (
          <ExtendedFlatList
            onEndReached={loadMore}
            listKey="stores"
            style={{ width: "100%", flexGrow: 1 }}
            data={branches.storeList}
            keyExtractor={(item, index) => `stores-${item.store_cd}-${index}`}
            renderItem={(itemData) => <StoreItem item={itemData.item} />}
          />
        )}
      </WhiteContainer>
    </BaseScreen>
  );
};

export const screenOptions = ({ navigation }) => {
  return {
    title: "????????????",
    headerLeft: (props) => <BackButton {...props} />,
    headerTitle: (props) => <TextTitle {...props} />,
    headerRight: () => <></>,
  };
};
// const SearchButton = styled(BaseButtonContainer)({});

export const WhiteContainer = styled.View({
  paddingTop: 6,
  width: "100%",
  backgroundColor: colors.TRUE_WHITE,
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
    fontFamily: "Roboto-Bold",
    fontSize: 18,
  },
  amount: {
    color: colors.PRIMARY,
  },
});
export default StoreChangeScreen;
