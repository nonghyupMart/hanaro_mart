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
} from "react-native";
import { setIsLoading } from "@actions/common";

const PickerViews = (props) => {
  const dispatch = useDispatch();
  const onLnameChange = (lname) => {
    props.setLname(() => lname);
    props.setMname(() => null);
    const fetchBranches = props.fetchBranches(lname);
    const fetchAddress2 = dispatch(branchesActions.fetchAddress2(lname));

    Promise.all([fetchBranches, fetchAddress2]).then(() => {
      dispatch(setIsLoading(false));
    });
  };
  const onMnameChange = (lname, mname) => {
    props.setMname(() => mname);
    props.fetchBranches(lname, mname);
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
          onValueChange={(itemValue, itemIndex) =>
            onMnameChange(props.lname, itemValue)
          }
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
export default PickerViews;
