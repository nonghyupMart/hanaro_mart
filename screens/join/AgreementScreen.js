import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, StyleSheet, Button } from "react-native";
import { CheckBox } from "react-native-elements";

import { setAgreePolicy } from "../../store/actions/auth";
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";
import * as Location from "expo-location";
import { getPermissionsAsync } from "expo-notifications";

import {
  setPushToken,
  setLocation,
  setErrorMsg,
} from "../../store/actions/auth";

const AgreementScreen = ({ navigation }) => {
  const [toggleAllheckBox, setToggleAllCheckBox] = useState(false);
  const [checkBoxes, setCheckBoxes] = useState([
    { id: 0, isChecked: false },
    { id: 1, isChecked: false },
    { id: 2, isChecked: false },
  ]);

  const dispatch = useDispatch();

  const handleAllChecked = (isCheckAll) => {
    let cks = [...checkBoxes];
    cks.map((el) => {
      isCheckAll ? (el.isChecked = true) : (el.isChecked = false);
    });
    setCheckBoxes(cks);
    setToggleAllCheckBox(isCheckAll);
  };
  const handleChecked = (checkBox) => {
    let cks = [...checkBoxes];
    cks[checkBox.id].isChecked = !cks[checkBox.id].isChecked;
    setCheckBoxes(cks);
    if (cks[checkBox.id].isChecked == false) {
      setToggleAllCheckBox(false);
    } else {
      let allTrue = cks.every((el) => el.isChecked);
      if (allTrue) setToggleAllCheckBox(true);
    }
  };

  const getPermissions = () => {
    Permissions.getAsync(
      Permissions.NOTIFICATIONS,
      Permissions.LOCATION,
      Permissions.CAMERA
    )
      .then((statusObj) => {
        if (statusObj.status !== "granted") {
          return Permissions.askAsync(
            Permissions.NOTIFICATIONS,
            Permissions.LOCATION,
            Permissions.CAMERA
          );
        }
        return statusObj;
      })
      .then((statusObj) => {
        if (statusObj.status !== "granted") {
          alert("Permission to notification was denied");
        }
      })
      .then(() => {
        console.log("getting token");
        return Notifications.getExpoPushTokenAsync();
      })
      .then((response) => {
        const token = response.data;
        console.log("token==>" + token);
        dispatch(setPushToken(token));
      })
      .catch((err) => {
        console.log(err);
        alert(err);
        return false;
      });
  };
  return (
    <View style={styles.screen}>
      <View style={styles.allCheck}>
        <CheckBox
          checked={toggleAllheckBox}
          onPress={() => handleAllChecked(!toggleAllheckBox)}
        />
        <Text>전체동의</Text>
      </View>
      <View style={styles.allCheck}>
        <CheckBox
          checked={checkBoxes[0].isChecked}
          onPress={() => handleChecked(checkBoxes[0])}
        />
        <Text>개인정보 수집 및 이용동의</Text>
      </View>
      <View style={styles.allCheck}>
        <CheckBox
          checked={checkBoxes[1].isChecked}
          onPress={() => handleChecked(checkBoxes[1])}
        />
        <Text>위치정보 수집동의</Text>
      </View>
      <View style={styles.allCheck}>
        <CheckBox
          checked={checkBoxes[2].isChecked}
          onPress={() => handleChecked(checkBoxes[2])}
        />
        <Text>광고성 정보 혜택 수집동의</Text>
      </View>

      <Button
        title="확인"
        onPress={() => {
          if (getPermissions()) navigation.navigate("JoinStep1");
        }}
      />
      <Button
        title="동의하지 않고 둘러보기"
        onPress={() => {
          dispatch(setAgreePolicy(true));
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  allCheck: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AgreementScreen;
