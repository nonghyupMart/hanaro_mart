import React, { useState, useEffect } from "react";
import { Button, Text, StyleSheet, View, Image } from "react-native";
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
    <Modal
      isVisible={props.isVisible}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
    >
      {props.item && props.item.title && (
        <View style={{ backgroundColor: "white", flex: 1 }}>
          <Image
            style={{
              width: "100%",
              height: 300,

              resizeMode: "stretch",
            }}
            source={{
              uri: uri,
            }}
          />
          <Text>{props.item.title}</Text>
          <View style={{ flexDirection: "row" }}>
            <Text>상품가 : 10000 원</Text>
            <Text>판매가 : 10000 원</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Button title="장바구니" />
            <Button
              title="닫기"
              onPress={props.setIsVisible.bind(this, !props.isVisible)}
            />
          </View>
        </View>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({});

export default FlyerDetail;
