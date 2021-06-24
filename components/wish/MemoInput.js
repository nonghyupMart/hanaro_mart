import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import styled from "styled-components/native";
import { StyleSheet } from "react-native";
import { BaseTextInput, ImageButton } from "../UI/BaseUI";
import colors from "../../constants/Colors";
import * as memosActions from "../../store/actions/memo";

const MemoInput = (props) => {
  const [titleValue, setTitleValue] = useState("");
  const dispatch = useDispatch();

  const titleChangeHandler = (text) => {
    setTitleValue(text);
  };

  const saveMemoHandler = () => {
    if (titleValue.trim() == "") return;
    dispatch(memosActions.addMemo(titleValue, false));
    setTitleValue("");
  };

  const onSubmitEditing = (text) => {
    titleChangeHandler(text);
    saveMemoHandler();
  };
  return (
    <Container>
      <TextInput
        placeholder="장볼 것을 이곳에다 메모하세요."
        onChangeText={titleChangeHandler}
        onSubmitEditing={(event) => onSubmitEditing(event.nativeEvent.text)}
        value={titleValue}
        // maxLength={20}
      />
      <ImageButton
        onPress={saveMemoHandler}
        source={require("../../assets/images/ic_pen.png")}
        style={styles.ImageButton}
      />
    </Container>
  );
};

const Container = styled.View({
  flexDirection: "row",
  flex: 1,
  borderBottomWidth: 2,
  borderColor: colors.emerald,
  alignItems: "center",
});

const TextInput = styled(BaseTextInput)({ flex: 1 });

const styles = StyleSheet.create({
  ImageButton: {},
});
export default React.memo(MemoInput);
