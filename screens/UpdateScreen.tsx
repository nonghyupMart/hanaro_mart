import * as Linking from "expo-linking";
import _ from "lodash";
import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import {
  BaseImage, SCREEN_HEIGHT, SCREEN_WIDTH
} from "../components/UI/BaseUI";
import * as CommonActions from "../store/actions/common";




const UpdateScreen = (props) => {
  const dispatch = useDispatch();
  const updatePopup = useSelector((state) => state.auth.updatePopup);

  useEffect(() => {
    return () => {
      dispatch(CommonActions.setIsLoading(false));
    };
  }, []);

  if (
    _.isEmpty(updatePopup) ||
    _.isEmpty(updatePopup) ||
    updatePopup.popupCnt <= 0
  )
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
const Screen = styled.View({
  backgroundColor: "transparent",
});
const Image = styled(BaseImage)({
  resizeMode: "cover",
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
});

const PopupImage = styled(BaseImage)({
  width: "100%",
  height: "100%",
});
const Container = styled.View({
  backgroundColor: "transparent",
  width: "100%",
  height: "100%",
});
export default UpdateScreen;
