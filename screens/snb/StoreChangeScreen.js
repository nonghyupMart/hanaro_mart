import React, { useEffect, useState, Fragment } from "react";
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
} from "react-native";

import Colors from "../../constants/Colors";
import StoreItem from "../../components/store/StoreItem";

import StoreChangeDetail from "../../components/store/StoreChangeDetail";
import BottomButtons from "../../components/BottomButtons";

const StoreChangeScreen = (props) => {
  const isAgreed = useSelector((state) => state.auth.isAgreed);
  const [selectedItem, setSelectedItem] = useState(2);
  const [itemList, setItemList] = useState([
    "제주도",
    "강원도",
    "서울",
    "경기",
    "경상남도",
    "경상북도",
    "전라남도",
    "전라북도",
  ]);
  const [isVisible, setIsVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState({ id: null, title: "" });

  const onPickerSelect = (index) => {
    setSelectedItem(() => index);
  };

  const popupHandler = (item) => {
    setIsVisible((isVisible) => !isVisible);
    setCurrentItem(() => item);
  };

  return (
    <Fragment>
      <SafeAreaView>
        <View style={[styles.row]}>
          <TextInput placeholder="매장명을 입력하세요." />
          <Button title="검색" />
        </View>
        <View style={[styles.row, {}]}>
          <Picker style={{ width: 100, flex: 1 }}>
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
          <Picker style={{ flex: 1, width: 100 }}>
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
          <Picker style={{ flex: 1, width: 100 }}>
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
        </View>
        <View style={[styles.row]}>
          <Button title="취소" />
          <Button title="확인" />
        </View>
        <FlatList
          style={{ height: "100%" }}
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
          ]}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <StoreItem
              onPress={popupHandler.bind(this, itemData.item)}
              title={itemData.item.title}
            />
          )}
        />
        <StoreChangeDetail
          isVisible={isVisible}
          currentItem={currentItem}
          setIsVisible={setIsVisible}
        />
      </SafeAreaView>
      {isAgreed && <BottomButtons />}
    </Fragment>
  );
};

export const screenOptions = ({ navigation }) => {
  return {
    title: "매장변경",
  };
};
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
    color: Colors.primary,
  },
});
export default StoreChangeScreen;
