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
} from "react-native";
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

import * as branchesActions from "@actions/branches";

const StoreChangeScreen = (props) => {
  const dispatch = useDispatch();
  const isJoin = useSelector((state) => state.auth.isJoin);

  const [isLoading, setIsLoading] = useState(false);

  const [lname, setLname] = useState();
  const [mname, setMname] = useState();
  const [store_nm, setStore_nm] = useState("");

  useEffect(() => {
    if (isJoin)
      props.navigation.setOptions({
        title: "매장변경",
        headerLeft: (props) => <BackButton {...props} />,
      });
  }, [isJoin]);

  const address1 = useSelector((state) => state.branches.address1);
  const address2 = useSelector((state) => state.branches.address2);
  const branches = useSelector((state) => state.branches.branches);

  const popupHandler = (item) => {
    props.navigation.navigate("StoreChangeDetail", { item: item });
  };

  const [location, setLocation] = useState(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
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
    setIsLoading(true);
    const fetchAddress1 = dispatch(branchesActions.fetchAddress1());
    fetchBranches();

    Promise.all([fetchAddress1]).then(() => {
      setIsLoading(false);
    });
  }, [location]);

  const fetchBranches = (lname = lname, mname = mname, store_nm = store_nm) => {
    let query = {
      lname,
      mname,
      store_nm,
    };
    if (location) {
      query.lat = location.coords.latitude;
      query.lng = location.coords.longitude;
    }
    return dispatch(branchesActions.fetchBranches(query));
  };

  return (
    <BaseScreen
      style={{
        backgroundColor: colors.trueWhite,
        paddingLeft: 0,
        paddingRight: 0,
      }}
      isLoading={isLoading}
      contentStyle={{ paddingTop: 0, backgroundColor: colors.trueWhite }}
      scrollListStyle={{ paddingRight: 0, paddingLeft: 0 }}
    >
      <InfoBox />
      <HistoryList location={location} {...props} setIsLoading={setIsLoading} />
      <WhiteContainer>
        <SearchBar
          location={location}
          {...props}
          store_nm={store_nm}
          lname={lname}
          mname={mname}
          setStore_nm={setStore_nm}
          setIsLoading={setIsLoading}
          fetchBranches={fetchBranches}
        />

        <PickerViews
          location={location}
          {...props}
          store_nm={store_nm}
          lname={lname}
          mname={mname}
          address1={address1}
          address2={address2}
          setIsLoading={setIsLoading}
          setLname={setLname}
          setMname={setMname}
          fetchBranches={fetchBranches}
        />

        {branches && (
          <FlatList
            style={{ width: "100%", flexGrow: 1 }}
            data={branches.storeList}
            keyExtractor={(item) => item.store_cd}
            renderItem={(itemData) => (
              <StoreItem
                onPress={popupHandler.bind(this, itemData.item)}
                item={itemData.item}
              />
            )}
          />
        )}
      </WhiteContainer>
    </BaseScreen>
  );
};

export const screenOptions = ({ navigation }) => {
  return {
    title: "매장설정",
    headerLeft: () => <></>,
    headerTitle: (props) => <TextTitle {...props} />,
    headerRight: () => <></>,
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
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  amount: {
    color: colors.primary,
  },
});
export default StoreChangeScreen;
