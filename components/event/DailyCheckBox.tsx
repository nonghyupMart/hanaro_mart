import React, { useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import colors from "../../constants/Colors";
import * as Util from "../../utils";
import { BaseText, ScaledImage, SCREEN_WIDTH } from "../UI/BaseUI";

const DailyCheckBox = (props) => {
  const [size, setSize] = useState();
  const daily_cnt = props.eventDetail.entry.daily_cnt;
  const daily_check_cnt = props.eventDetail.entry.daily_check_cnt;

  let stamps = [];

  for (let i = 0; i < daily_check_cnt; i++) {
    stamps.push(
      <StampImage
        source={require("../../assets/images/fbt.png")}
        key={Math.random()}
      />
    );
  }

  for (let i = 0; i < daily_cnt - daily_check_cnt; i++) {
    stamps.push(
      <Circle key={Math.random()}>
        <CircleText>{i + daily_check_cnt + 1}일</CircleText>
      </Circle>
    );
  }

  const onPress = () => {
    props.onApply();
  };

  return (
    <Container>
      <ScaledImage
        onLoadEnd={(state) => {
          setSize(state);
        }}
        source={require("../../assets/images/re1.png")}
        width={SCREEN_WIDTH - 33}
      />
      {size && (
        <StampContainer style={{ width: size?.width }}>
          <StampInnerContainer
            style={{ paddingLeft: Util.normalize(size?.width * 0.045) }}
          >
            {stamps.map((item, index) => {
              return item;
            })}
          </StampInnerContainer>
        </StampContainer>
      )}
      <ScaledImage
        source={require("../../assets/images/re3.png")}
        width={SCREEN_WIDTH - 33}
        style={{
          alignItems: "flex-end",
          paddingRight: Util.normalize(SCREEN_WIDTH * 0.07),
        }}
      >
        {props.eventDetail.entry.status === "10" && (
          <TouchableOpacity onPress={onPress}>
            <Image
              source={require("../../assets/images/ccbt.png")}
              style={{ height: Util.normalize(80) }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </ScaledImage>
    </Container>
  );
};
const Container = styled.View({
  alignSelf: "center",
  // width: "90%",
  marginTop: 30,
});
const CircleText = styled(BaseText)({
  letterSpacing: -0.74,
  fontSize: Util.normalize(18),
  fontFamily: "Roboto-Medium",
  color: colors.LIGHT_ROSE,
});
const Circle = styled.View({
  width: Util.normalize(45),
  height: Util.normalize(45),
  borderWidth: 1,
  borderColor: colors.LIGHT_ROSE,
  justifyContent: "center",
  alignItems: "center",
  margin: 4.25,
  borderRadius: 10000,
});
const StampImage = styled.Image({
  margin: 4.25,
  width: Util.normalize(45),
  height: Util.normalize(45),
});
const StampContainer = styled.View({
  flexDirection: "row",
  flexWrap: "wrap",
  backgroundColor: colors.TRUE_WHITE,
  marginTop: -2,
  justifyContent: "center",
});
const StampInnerContainer = styled.View({
  flexDirection: "row",
  flexWrap: "wrap",
  alignSelf: "center",
});
export default DailyCheckBox;
