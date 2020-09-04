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
} from "react-native";
import { BackButton, TextTitle } from "@UI/header";
import {
  BaseButtonContainer,
  BaseTouchable,
  screenWidth,
  StyleConstants,
} from "@UI/BaseUI";
import colors from "@constants/colors";

import StoreItem from "@components/store/StoreItem";
import BaseScreen from "@components/BaseScreen";
import StoreChangeDetail from "@components/store/StoreChangeDetail";

import * as branchesActions from "@actions/branches";

const StoreChangeScreen = (props) => {
  const dispatch = useDispatch();
  const isAgreed = useSelector((state) => state.auth.isAgreed);

  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const [selectedItem, setSelectedItem] = useState(2);

  const [isBranchSelected, setIsBranchSelected] = useState(false);
  const [currentItem, setCurrentItem] = useState({ id: null, title: "" });

  useEffect(() => {
    if (isAgreed)
      props.navigation.setOptions({
        title: "매장변경",
        headerLeft: (props) => <BackButton {...props} />,
      });
  }, [isAgreed]);
  const address1 = useSelector((state) => state.branches.address1);
  useEffect(() => {
    setIsLoading(true);
    dispatch(branchesActions.fetchAddress1()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  const onPickerSelect = (index) => {
    setSelectedItem(() => index);
  };

  const popupHandler = (item) => {
    // setIsBranchSelected((isVisible) => !isVisible);
    setCurrentItem(() => item);
    if (isAgreed) props.navigation.navigate("StoreChangeDetail");
    else props.navigation.navigate("StoreSetupDetail");
  };

  return (
    <BaseScreen
      isLoading={isLoading}
      contentStyle={{ paddingTop: 0, backgroundColor: colors.trueWhite }}
      scrollListStyle={{ paddingRight: 0, paddingLeft: 0 }}
    >
      <StoreBox style={{ height: 130 }}>
        <Plus />
        <BlueText>나의 매장을 설정해 주세요</BlueText>
        <BottomCover />
      </StoreBox>
      <WhiteContainer>
        <View
          style={
            ([styles.row],
            {
              flexDirection: "row",
              flex: 1,
              marginLeft: StyleConstants.defaultPadding,
              marginRight: StyleConstants.defaultPadding,
            })
          }
        >
          <BlueRoundView
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22.5,
              paddingRight: 10,
            }}
          >
            <Image
              source={require("@images/ic_store_mall_directory_24px.png")}
            />
            <Text
              style={{
                marginLeft: 5,
                fontSize: 14,
                fontWeight: "normal",
                fontStyle: "normal",
                lineHeight: 20,
                letterSpacing: 0,
                textAlign: "center",
                color: colors.trueWhite,
              }}
            >
              매장명
            </Text>
          </BlueRoundView>
          <View
            style={{
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
            }}
          >
            <TextInput
              placeholder="매장명을 입력하세요."
              style={{
                marginLeft: 10,
                marginRight: 10,
                flex: 1,
              }}
            />
            <BaseTouchable
              style={{ justifyContent: "center", paddingRight: 10 }}
            >
              <Image source={require("@images/search-24px.png")} />
            </BaseTouchable>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "center",
            paddingTop: Platform.OS === "android" ? 10 : 0,
            paddingBottom: Platform.OS === "android" ? 10 : 0,
            marginLeft: 35.5,
            marginRight: 35.5,
          }}
        >
          <Picker style={styles.picker} itemStyle={styles.pickerItem}>
            {address1.length > 0 &&
              address1.map((item, index) => {
                return (
                  <Picker.Item label={item.lname} value={index} key={index} />
                );
              })}
          </Picker>
          <Picker style={styles.picker} itemStyle={styles.pickerItem}>
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
          <Picker style={styles.picker} itemStyle={styles.pickerItem}>
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
        </View>
        <View style={[styles.row, { marginBottom: 10 }]}>
          <GrayButton>
            <ButtonText>취소</ButtonText>
          </GrayButton>
          <BlueButton style={{ marginLeft: 4 }}>
            <ButtonText style={{ color: colors.trueWhite }}>확인</ButtonText>
          </BlueButton>
        </View>
        <FlatList
          style={{ width: "100%", flexGrow: 1 }}
          data={[
            {
              id: 0,
              title: "하나로마트 양재점",
            },
            {
              id: 1,
              title: "하나로마트 천안점",
            },
            {
              id: 2,
              title: "하나로마트 마포점",
            },
            {
              id: 3,
              title: "하나로마트 이태원점",
            },
            {
              id: 4,
              title: "하나로마트 홍대점",
            },
            {
              id: 5,
              title: "하나로마트 안산점",
            },
            {
              id: 6,
              title: "하나로마트 양재점2",
            },
            {
              id: 7,
              title: "하나로마트 천안점2",
            },
            {
              id: 8,
              title: "하나로마트 마포점2",
            },
            {
              id: 9,
              title: "하나로마트 이태원점2",
            },
            {
              id: 10,
              title: "하나로마트 홍대점2",
            },
            {
              id: 11,
              title: "하나로마트 안산점2",
            },
          ]}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <StoreItem
              onPress={popupHandler.bind(this, itemData.item)}
              title={itemData.item.title}
            />
          )}
        />
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

const ButtonText = styled.Text({
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
});

const WhiteContainer = styled.View({
  paddingTop: 6,
  width: "100%",
  backgroundColor: colors.trueWhite,
  flex: 1,
});
const BottomCover = styled.ImageBackground({
  width: "100%",
  height: 22,
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
});
BottomCover.defaultProps = {
  source: require("@images/num_m.png"),
  resizeMode: "stretch",
};
const BlueText = styled.Text({
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
  source: require("@images/plusblue.png"),
};
const StoreBox = styled.View({
  flex: 1,
  width: "100%",
  height: 130,
  backgroundColor: colors.white,

  alignItems: "center",
});

const styles = StyleSheet.create({
  pickerItem: {
    fontSize: 14,
  },
  picker: {
    flexGrow: 1,

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
