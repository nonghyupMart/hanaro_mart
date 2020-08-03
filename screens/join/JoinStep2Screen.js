import React, { useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Picker,
  TextInput,
} from "react-native";
import { CheckBox } from "react-native-elements";
import ReCaptcha from "react-native-recaptcha-v3";

import { setAgreePolicy } from "../../store/actions/auth";
const JoinStep2Screen = ({ navigation }) => {
  const [selectedValue, setSelectedValue] = useState("010");

  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <Text>전화번호 입력</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Picker
          selectedValue={selectedValue}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="010" value="010" />
          <Picker.Item label="011" value="011" />
        </Picker>
        <TextInput required keyboardType="numeric" maxLength={4} />
        <Text> - </Text>
        <TextInput required keyboardType="numeric" maxLength={4} />
      </View>

      <ReCaptcha />
      <Text>전화번호 인증</Text>
      <Button
        title="간편가입"
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

export default JoinStep2Screen;
