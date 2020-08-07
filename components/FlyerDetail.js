import React, { useState, useEffect } from "react";
import {
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";

const FlyerDetail = (props) => {
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();

  const uri =
    "http://img-m.nonghyupmall.com//prdimg/02/003/005/001/009//4002685492_0_320_20200428155054.jpg";

  //   if (props.isVisible != isVisible) {
  //
  //   }

  return (
    <Modal isVisible={props.isVisible}>
      <Button
        title="닫기"
        onPress={props.setIsVisible.bind(this, !props.isVisible)}
      />
      <Text>{props.title}</Text>
      <Image
        style={{
          width: "100%",
          height: height,
          flex: 1,
          resizeMode: "stretch",
        }}
        source={{
          uri: uri,
        }}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({});

export default FlyerDetail;
