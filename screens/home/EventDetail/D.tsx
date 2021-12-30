import React from "react";
import styled from "styled-components/native";
import ApplyBox from "../../../components/event/ApplyBox";
import DailyCheckBox from "../../../components/event/DailyCheckBox";
import { BaseText } from "../../../components/UI/BaseUI";
import colors from "../../../constants/Colors";

const D = (props: any) => {
  return (
    <>
      <Container>
        <ApplyBox {...props} />
      </Container>
      <Container2>
        <DailyCheckBox {...props} />
      </Container2>
    </>
  );
};
const Container2 = styled.View({
  backgroundColor: colors.WATERMELON,
});
const Container = styled.View({
  paddingRight: 24,
  paddingLeft: 24,
  width: "100%",
});
export default D;
