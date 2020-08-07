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
import Modal from "react-native-modal";

const StoreListPopup = (props) => {
  const [isVisible, setIsVisible] = useState(props.isVisible);
  return (
    <Modal
      isVisible={isVisible}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
    >
      <View>
        <Text>나의 점포를 설정해주세요.</Text>
        <View style={[styles.row]}>
          <TextInput autoFocus={true} />
          <Button title="검색" />
        </View>
        <Button title="닫기" onPress={() => setIsVisible(() => false)} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: "row", justifyContent: "center", alignItems: "center" },
});
export default StoreListPopup;
