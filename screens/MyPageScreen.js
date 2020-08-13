import React from "react";

import { View, Text, StyleSheet, Button } from "react-native";

const MyPageScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>MyPageScreen</Text>
      <Button title="나의 리뷰"/>
      <Button title="이벤트 응모 내역"/>
      <Button title="나의 문의내역"/>
      <Button title="회원탈퇴"/>
    </View>
  );
};

export const screenOptions = ({ navigation }) => {
  return {
    title: "마이페이지",
  };
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MyPageScreen;
