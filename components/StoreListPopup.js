import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  SafeAreaView,
  TextInput,
  Button,
} from "react-native";
import { Overlay } from "react-native-elements";

const StoreListPopup = (props) => {
  return (
    <Overlay isVisible={props.isVisible}>
      <View>
        <Text>나의 점포를 설정해주세요.</Text>
        <View style={[styles.row]}>
          <TextInput autoFocus={true} />
          <Button title="검색" />
        </View>
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: "row", justifyContent: "center", alignItems: "center" },
});
export default StoreListPopup;
