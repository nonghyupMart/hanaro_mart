import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Platform,
  View,
  Text,
  StyleSheet,
  Button,
  Picker,
  TextInput,
  ActionSheetIOS,
} from "react-native";

import Modal from "react-native-modal";

import { setAgreePolicy } from "../../store/actions/auth";
const JoinStep2Screen = ({ navigation }) => {
  const [joinStep, setJoinStep] = useState([false, false]);
  const [selectedValue, setSelectedValue] = useState("010");
  const [isVisible, setIsVisible] = useState(false);

  const dispatch = useDispatch();

  const onPress = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["취소", "010", "011"],
        // destructiveButtonIndex: 2,
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          setSelectedValue("010");
        } else if (buttonIndex === 2) {
          setSelectedValue("011");
        }
      }
    );

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
        {Platform.OS === "android" && (
          <Picker
            selectedValue={selectedValue}
            style={{ height: 30, width: 100 }}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }
          >
            <Picker.Item label="010" value="010" />
            <Picker.Item label="011" value="011" />
          </Picker>
        )}
        {Platform.OS === "ios" && (
          <Button onPress={onPress} title={selectedValue} />
        )}
        <TextInput required keyboardType="numeric" maxLength={4} />
        <Text> - </Text>
        <TextInput required keyboardType="numeric" maxLength={4} />
      </View>
      <Button
        title="인증번호 신청"
        onPress={() => setJoinStep([true, false])}
      />
      {joinStep[0] && (
        <View>
          <Text>전화번호 인증</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextInput required keyboardType="numeric" maxLength={4} />
            <Button
              title="인증번호 확인"
              onPress={() => setJoinStep([true, true])}
            />
          </View>
        </View>
      )}
      {joinStep[1] && (
        <View>
          <Text>인증이 완료되었습니다. 하나로플러스앱에 가입하시겠습니까?</Text>
          <Button
            title="간편가입"
            onPress={() => {
              setIsVisible(() => true);
            }}
          />
        </View>
      )}

      <Modal isVisible={isVisible}>
        <View style={{ backgroundColor: "white" }}>
          <Text>
            전화번호 인증이 완료되었습니다. (010-1111-2222) 개인정보 수집과
            이용약관에 동의하셨습니다. 위치정보 수집에 동의하셨습니다. 광고성
            정보(혜택)에 수신 동의하셨습니다.
          </Text>
          <Button
            title="확인"
            onPress={() => {
              setIsVisible(() => false);
              navigation.replace("StoreSetup");
              // dispatch(setAgreePolicy(true));
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default JoinStep2Screen;
