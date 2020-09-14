import React, { useEffect, useState, Fragment } from "react";
import styled from "styled-components/native";
import { useSelector, useDispatch } from "react-redux";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  SafeAreaView,
  TextInput,
  Button,
  FlatList,
  Platform,
  Picker,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { BackButton, TextTitle } from "@UI/header";
import {
  BaseButtonContainer,
  BaseTouchable,
  screenWidth,
  StyleConstants,
  BaseText,
} from "@UI/BaseUI";
import colors from "@constants/colors";
import * as Location from "expo-location";
import StoreItem from "@components/store/StoreItem";
import BaseScreen from "@components/BaseScreen";

import * as branchesActions from "@actions/branches";
import blueplus from "@images/plusblue.png";

const StoreChangeScreen = (props) => {
  const dispatch = useDispatch();
  const isAgreed = useSelector((state) => state.auth.isAgreed);

  const [isLoading, setIsLoading] = useState(true);

  const [lname, setLname] = useState();
  const [mname, setMname] = useState();
  const [store_nm, setStore_nm] = useState("");

  useEffect(() => {
    if (isAgreed)
      props.navigation.setOptions({
        title: "매장변경",
        headerLeft: (props) => <BackButton {...props} />,
      });
  }, [isAgreed]);
  const address1 = useSelector((state) => state.branches.address1);
  const address2 = useSelector((state) => state.branches.address2);
  const branches = useSelector((state) => state.branches.branches);
  useEffect(() => {
    setIsLoading(true);
    const fetchBranches = dispatch(branchesActions.fetchBranches());
    const fetchAddress1 = dispatch(branchesActions.fetchAddress1());
    Promise.all([fetchBranches, fetchAddress1]).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  const popupHandler = (item) => {
    if (isAgreed)
      props.navigation.navigate("StoreChangeDetail", { item: item });
    else props.navigation.navigate("StoreSetupDetail", { item: item });
  };

  const [location, setLocation] = useState(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }

      let provider = await Location.getProviderStatusAsync();
      // console.log(provider);
      if (location == null) {
        let location = await Location.getCurrentPositionAsync({
          maximumAge: 60000, // only for Android
          accuracy: Platform.Android
            ? Location.Accuracy.Low
            : Location.Accuracy.Lowest,
        });
        setLocation(location);
        // console.log(location);
      }
    })();
  }, [dispatch]);

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
      <WhiteContainer>
        <SearchBar
          {...props}
          store_nm={store_nm}
          lname={lname}
          mname={mname}
          setStore_nm={setStore_nm}
          setIsLoading={setIsLoading}
        />

        <PickerViews
          {...props}
          store_nm={store_nm}
          lname={lname}
          mname={mname}
          address1={address1}
          address2={address2}
          setIsLoading={setIsLoading}
          setLname={setLname}
          setMname={setMname}
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
const PickerViews = (props) => {
  const dispatch = useDispatch();
  const onLnameChange = (lname) => {
    props.setIsLoading(true);
    props.setLname(() => lname);
    const query = { lname, mname: props.mname, store_nm: props.store_nm };
    const fetchBranches = dispatch(branchesActions.fetchBranches(query));
    const fetchAddress2 = dispatch(branchesActions.fetchAddress2(lname));

    Promise.all([fetchBranches, fetchAddress2]).then(() => {
      props.setIsLoading(false);
    });
  };
  const onMnameChange = (mname) => {
    props.setIsLoading(true);
    props.setMname(() => mname);
    const query = { lname: props.lname, mname, store_nm: props.store_nm };
    dispatch(branchesActions.fetchBranches(query)).then(() => {
      props.setIsLoading(false);
    });
  };

  return (
    <PickerContainer>
      <Picker
        style={styles.picker}
        itemStyle={styles.pickerItem}
        selectedValue={props.lname}
        onValueChange={(itemValue, itemIndex) => onLnameChange(itemValue)}
      >
        <Picker.Item label="시/도 선택" value={null} key={-1} />
        {props.address1 &&
          props.address1.lnameList &&
          props.address1.lnameList.map((item, index) => {
            return (
              <Picker.Item label={item.lname} value={item.lname} key={index} />
            );
          })}
      </Picker>

      {props.lname != null && props.address2 && props.address2.mnameList && (
        <Picker
          style={styles.picker}
          itemStyle={styles.pickerItem}
          selectedValue={props.mname}
          onValueChange={(itemValue, itemIndex) => onMnameChange(itemValue)}
        >
          <Picker.Item label="선택" value="" key={-1} />
          {props.address2.mnameList.map((item, index) => {
            return (
              <Picker.Item label={item.mname} value={item.mname} key={index} />
            );
          })}
        </Picker>
      )}
    </PickerContainer>
  );
};
const PickerContainer = styled.View({
  flexDirection: "row",
  flex: 1,
  justifyContent: "center",
  paddingTop: Platform.OS === "android" ? 10 : 0,
  paddingBottom: Platform.OS === "android" ? 10 : 0,
  marginLeft: 35.5,
  marginRight: 35.5,
});

const InfoBox = (props) => {
  return (
    <StoreBox style={{}}>
      <Plus />
      <BlueText>나의 매장을 설정해 주세요</BlueText>
      <BottomCover
        onLoadStart={() => {
          // setIsLoading(true);
        }}
      />
    </StoreBox>
  );
};
const SearchBar = (props) => {
  const dispatch = useDispatch();
  const onPressSearch = () => {
    props.setIsLoading(true);
    const query = {
      lname: props.lname,
      mname: props.mname,
      store_nm: props.store_nm,
    };
    dispatch(branchesActions.fetchBranches(query)).then(() => {
      props.setIsLoading(false);
    });
  };
  return (
    <SearchBarContainer>
      <BlueRoundView>
        <Image source={require("@images/ic_store_mall_directory_24px.png")} />
        <StoreName>매장명</StoreName>
      </BlueRoundView>
      <TextInputContainer>
        <SearchTextInput
          placeholder="매장명을 입력하세요."
          onChangeText={(name) => props.setStore_nm(name)}
          value={props.store_nm}
          onSubmitEditing={onPressSearch}
        />
        <BaseTouchable
          onPress={onPressSearch}
          style={{ justifyContent: "center", paddingRight: 10 }}
        >
          <Image source={require("@images/search-24px.png")} />
        </BaseTouchable>
      </TextInputContainer>
    </SearchBarContainer>
  );
};
const SearchTextInput = styled.TextInput({
  marginLeft: 10,
  marginRight: 10,
  flex: 1,
});
const TextInputContainer = styled.View({
  paddingRight: 8,
  paddingLeft: 12,
  flexDirection: "row",
  height: 40,
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: colors.cerulean,
  borderTopRightRadius: 20,
  borderBottomRightRadius: 20,
  flex: 1,
});
const StoreName = styled(Text)({
  marginLeft: 5,
  fontSize: 14,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.trueWhite,
});
const SearchBarContainer = styled.View({
  flexDirection: "row",
  flex: 1,
  marginLeft: StyleConstants.defaultPadding,
  marginRight: StyleConstants.defaultPadding,
});
export const screenOptions = ({ navigation }) => {
  return {
    title: "매장설정",
    headerLeft: () => <></>,
    headerTitle: (props) => <TextTitle {...props} />,
    headerRight: () => <></>,
  };
};
// const SearchButton = styled(BaseButtonContainer)({});

const ButtonText = styled(BaseText)({
  fontSize: 12,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 17,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.greyishBrown,
});
const BaseSmallButton = styled(BaseButtonContainer)({
  width: 114,
  height: 24,
  borderRadius: 11,
});
const BlueButton = styled(BaseSmallButton)({
  backgroundColor: colors.cerulean,
});
const GrayButton = styled(BaseSmallButton)({
  backgroundColor: colors.pinkishGrey,
});
const BlueRoundView = styled.View({
  //    borderBottomLeftRadius: number
  // - borderBottomRightRadius: number
  // - borderTopLeftRadius: number
  // - borderTopRightRadius: number
  borderTopLeftRadius: 20,
  borderBottomLeftRadius: 20,
  backgroundColor: colors.cerulean,
  height: 40,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  paddingLeft: 22.5,
  paddingRight: 10,
});

const WhiteContainer = styled.View({
  paddingTop: 6,
  width: "100%",
  backgroundColor: colors.trueWhite,
  flex: 1,
  height: "100%",
});
const BottomCover = styled.Image({
  width: "100%",
  height: 22,
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  overflow: "visible",
  backfaceVisibility: "visible",
  flex: 1,
});
BottomCover.defaultProps = {
  source: require("@images/num_m.png"),
  resizeMode: "stretch",
};
const BlueText = styled(BaseText)({
  fontSize: 18,
  fontWeight: "500",
  fontStyle: "normal",
  lineHeight: 26,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.cerulean,
  marginBottom: 50,
});
const Plus = styled.Image({ marginTop: 19, marginBottom: 10 });

Plus.defaultProps = {
  source: blueplus,
  defaultSource: blueplus,
};
const StoreBox = styled.View({
  flex: 1,
  width: "100%",

  backgroundColor: colors.white,

  alignItems: "center",
});

const styles = StyleSheet.create({
  pickerItem: {
    fontSize: 14,
  },
  picker: {
    flexGrow: 0.5,
    color: colors.greyishBrown,
  },
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
