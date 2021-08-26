import React from "react";
import styled from "styled-components/native";
import { Image } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";

const WishButton = ({ wish_yn, addWishItem, deleteWishItem }) => {
  let onPress, source;
  if (wish_yn === "N") {
    onPress = addWishItem;
    source = require("../../assets/images/bt_heart_w.png");
  } else {
    onPress = deleteWishItem;
    source = require("../../assets/images/bt_heart_r.png");
  }
  return (
    <Button onPress={onPress}>
      <Image source={source} />
    </Button>
  );
};
const Button = styled(BorderlessButton).attrs({})({
  position: "absolute",
  right: 2,
  bottom: 1,
});

export default React.memo(WishButton);
