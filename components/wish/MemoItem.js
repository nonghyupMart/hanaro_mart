import React, { useState, useEffect } from "react";
import { StyleSheet, Image } from "react-native";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import styled from "styled-components/native";
import colors from "../../constants/Colors";
import { BaseTextInput, ImageButton, BaseText } from "../UI/BaseUI";
import { CheckBox } from "react-native-elements";
import * as memosActions from "../../store/actions/memo";

const MemoItem = (props) => {
  const dispatch = useDispatch();

  const onCheckPress = (memo) => {
    dispatch(
      memosActions.checkMemo(memo.id, memo.title, !!!Number(memo.isChecked))
    );
  };

  const onDeletePress = (memoId) => {
    dispatch(memosActions.removeMemo(memoId));
  };

  return (
    <Container>
      <ImageButton
        onPress={onDeletePress.bind(this, props.item.id)}
        source={require("../../assets/images/bt_close.png")}
        style={styles.imageButton}
      />
      <Title style={!!Number(props.item.isChecked) ? styles.checked : null}>
        {props.item.title}
      </Title>
      <CheckButton
        checked={!!Number(props.item.isChecked)}
        onPress={onCheckPress.bind(this, props.item)}
      />
    </Container>
  );
};

const Title = styled(BaseText)({
  flex: 1,
  color: colors.WARM_GREY_TWO,
  flexShrink: 0,
});
const CheckButton = (props) => {
  const checkedIcon = require("../../assets/images/bt_checked.png");
  const uncheckedIcon = require("../../assets/images/bt_unchecked.png");

  return (
    <CheckBox
      {...props}
      containerStyle={[styles.checkbox]}
      checkedIcon={<Image source={checkedIcon} />}
      uncheckedIcon={<Image source={uncheckedIcon} />}
    />
  );
};

const styles = StyleSheet.create({
  imageButton: {
    width: 33,
    justifyContent: "flex-end",
    alignSelf: "stretch",
    paddingTop: 19,
  },
  checked: {
    textDecorationLine: "line-through",
    color: colors.emerald,
  },
  checkbox: {
    justifyContent: "flex-start",
    margin: 0,
    alignItems: "flex-start",
    padding: 0,
    marginLeft: 0,
    marginRight: 0,
    paddingRight: 0,
    paddingLeft: 10,
    marginTop: 0,
    marginBottom: 1,
    paddingTop: 19,
    paddingBottom: 0,
    width: 33,
    justifyContent: "flex-end",
    alignSelf: "stretch",
  },
});
const Container = styled.View({
  borderBottomWidth: 1,
  borderColor: colors.WARM_GREY_TWO,
  flexDirection: "row",
  alignItems: "flex-end",
});
export default React.memo(MemoItem);
