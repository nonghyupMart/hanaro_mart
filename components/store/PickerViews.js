import React, { useEffect, useState, Fragment } from "react";
import styled from "styled-components/native";
import { useSelector, useDispatch } from "react-redux";
import * as branchesActions from "@actions/branches";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Button,
  FlatList,
  Platform,
  Picker,
  Image,
  KeyboardAvoidingView,
  ActionSheetIOS,
} from "react-native";
import { setIsLoading } from "@actions/common";
import _ from "lodash";
import { BaseText } from "@UI/BaseUI";

const PickerViews = (props) => {
  let lnameItems = [];
  const [mnameItems, setMnameItems] = useState([]);
  const dispatch = useDispatch();
  const onLnameChange = async (lname) => {
    props.setLname(() => lname);
    props.setMname(() => null);
    props.setPage(1);
    const fetchBranches = props.fetchBranches(lname, null, "", 1);
    const fetchAddress2 = dispatch(branchesActions.fetchAddress2(lname));

    Promise.all([fetchBranches, fetchAddress2]).then(() => {
      dispatch(setIsLoading(false));
    });
  };
  const onMnameChange = (lname, mname) => {
    props.setMname(() => mname);
    props.fetchBranches(lname, mname, "", 1);
  };

  props.address1 &&
    props.address1.lnameList &&
    props.address1.lnameList.map((item, index) => {
      switch (Platform.OS) {
        case "android":
          lnameItems.push(
            <Picker.Item label={item.lname} value={item.lname} key={index} />
          );
          break;
        case "ios":
          lnameItems.push(item.lname);
          break;

        default:
          break;
      }
    });
  useEffect(() => {
    if (_.isEmpty(props.address2) || _.isEmpty(props.address2.mnameList))
      return;
    setMnameItems([]);
    let arr = [];
    props.address2.mnameList.map((item, index) => {
      switch (Platform.OS) {
        case "android":
          arr.push(
            <Picker.Item label={item.mname} value={item.mname} key={index} />
          );
          break;
        case "ios":
          arr.push(item.mname);
          break;

        default:
          break;
      }
      setMnameItems(arr);
    });

    return () => {};
  }, [props.address2]);

  const onPress = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["취소", ...lnameItems],
        // destructiveButtonIndex: 2,
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        onLnameChange(lnameItems[buttonIndex - 1]);
      }
    );
  const onPressMname = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["취소", ...mnameItems],
        // destructiveButtonIndex: 2,
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        onMnameChange(props.lname, mnameItems[buttonIndex - 1]);
      }
    );
  if (Platform.OS == "ios") {
    return (
      <PickerContainer>
        {/* <Text>{props.lname}</Text> */}
        <PickerButton onPress={onPress}>
          <PickerText>{props.lname ? props.lname : "시/도 선택"}</PickerText>
          <PickerText>{`     ▾`}</PickerText>
        </PickerButton>
        {props.lname != null && props.address2 && props.address2.mnameList && (
          <PickerButton onPress={onPressMname}>
            <PickerText>{props.mname ? props.mname : "선택"}</PickerText>
            <PickerText>{`     ▾`}</PickerText>
          </PickerButton>
        )}
      </PickerContainer>
    );
  }
  return (
    <PickerContainer>
      <Picker
        style={styles.picker}
        itemStyle={styles.pickerItem}
        selectedValue={props.lname}
        onValueChange={(itemValue, itemIndex) => onLnameChange(itemValue)}
      >
        <Picker.Item label="시/도 선택" value={null} key={-1} />
        {lnameItems.map((item, index) => {
          return item;
        })}
      </Picker>

      {props.lname != null && props.address2 && props.address2.mnameList && (
        <Picker
          style={styles.picker}
          itemStyle={styles.pickerItem}
          selectedValue={props.mname}
          onValueChange={(itemValue, itemIndex) =>
            onMnameChange(props.lname, itemValue)
          }
        >
          <Picker.Item label="선택" value="" key={-1} />
          {mnameItems.map((item, index) => {
            return item;
          })}
        </Picker>
      )}
    </PickerContainer>
  );
};
const PickerText = styled(BaseText)({
  fontSize: 17,
  color: colors.greyishBrown,
});
const PickerButton = styled.TouchableOpacity({
  padding: 10,
  paddingTop: 25,
  paddingBottom: 10,
  flexDirection: "row",
});
const PickerContainer = styled.View({
  flexDirection: "row",
  flex: 1,
  justifyContent: "center",
  paddingTop: Platform.OS === "android" ? 10 : 0,
  paddingBottom: Platform.OS === "android" ? 10 : 0,
  marginLeft: 35.5,
  marginRight: 35.5,
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
    fontFamily: "CustomFont-Bold",
    fontSize: 18,
  },
  amount: {
    color: colors.primary,
  },
});
export default PickerViews;
