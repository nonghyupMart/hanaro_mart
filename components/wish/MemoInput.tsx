import React, { useState } from "react";
import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import colors from "../../constants/Colors";
import { useAppDispatch } from "../../hooks";
import * as memosActions from "../../store/actions/memo";
import { BaseTextInput, ImageButton } from "../UI/BaseUI";

const MemoInput = (props) => {
  const [titleValue, setTitleValue] = useState("");
  const dispatch = useAppDispatch();

  const titleChangeHandler = (text) => {
    setTitleValue(text);
  };

  const saveMemoHandler = () => {
    if (titleValue.trim() === "") return;
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
  width: "100%",
  borderBottomWidth: 2,
  borderColor: colors.EMERALD,
  alignItems: "center",
});

const TextInput = styled(BaseTextInput)({ flexGrow: 1, width: 0 });

const styles = StyleSheet.create({
  ImageButton: {
    flexShrink: 0,
    flexGrow: 0,
  },
});
export default React.memo(MemoInput);
