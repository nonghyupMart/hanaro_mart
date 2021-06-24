import React from "react";
import styled from "styled-components/native";
import MemoInput from "./MemoInput";
import MemoList from "./MemoList";

const Memo = (props) => {
  return (
    <Container>
      <MemoInput />
      <MemoList />
    </Container>
  );
};

const Container = styled.View({
  width: "66.4%",
  alignSelf: "center",
});
export default React.memo(Memo);
