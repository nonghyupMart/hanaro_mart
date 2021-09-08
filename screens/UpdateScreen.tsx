import * as Linking from "expo-linking";
import _ from "lodash";
import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import {
  BaseImage,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../components/UI/BaseUI";
import { useAppDispatch, useAppSelector } from "../hooks";
import * as CommonActions from "../store/actions/common";

const UpdateScreen = (props) => {
  const dispatch = useAppDispatch();
  const updatePopup = useAppSelector((state) => state.auth.updatePopup);

  useEffect(() => {
    return () => {
      dispatch(CommonActions.setIsLoading(false));
    };
  }, []);

  if (updatePopup?.popupCnt <= 0)
    //매장이 있는 경우만 매장 팝업
    return <></>;
  return (
    <Container>
      {updatePopup.popupList.map((item, index) => {
        return (
          <TouchableOpacity
            activeOpacity={0.8}
            key={item.pop_cd}
            onPress={() => {
              if (item.link_url) Linking.openURL(item.link_url);
            }}
          >
            <Image
              initResizeMode="contain"
              defaultSource={require("../assets/images/p_img503.png")}
              resizeMode="contain"
              source={item.display_img}
              width={SCREEN_WIDTH}
              style={{ height: "100%", backgroundColor: "black" }}
            />
          </TouchableOpacity>
        );
      })}
    </Container>
  );
};

export const screenOptions = ({ navigation }) => {
  return {
    contentStyle: {
      paddingBottom: 0,
      backgroundColor: "transparent",
    },
    animation: "fade",
    headerShown: false,
  };
};
const Image = styled(BaseImage)({
  resizeMode: "cover",
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
});
const Container = styled.View({
  backgroundColor: "transparent",
  width: "100%",
  height: "100%",
});
export default UpdateScreen;
