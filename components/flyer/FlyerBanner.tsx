import React, { Fragment, useRef, useEffect } from "react";
import styled from "styled-components/native";
import { View, Image } from "react-native";
import Carousel from "../UI/Carousel";
import {
  BaseTouchable,
  BaseImage,
  BaseText,
  SCREEN_WIDTH,
} from "../UI/BaseUI";
import * as Util from "../../utils";
import _ from "lodash";
import * as RootNavigation from "../../navigation/RootNavigation";
import colors from "../../constants/Colors";

let prevPage = 0;

const FlyerBanner = ({
  leafletList,
  carouselKey,
  leaf_cd,
  detail_img_cnt,
  setPageForCarousel,
  carouselRef,
}) => {
  useEffect(() => {
    return () => {
      prevPage = 0;
    };
  }, []);
  return (
    <>
      <View style={{ paddingLeft: 24, paddingRight: 24, width: "100%" }}>
        <Carousel
          ref={carouselRef}
          key={`${carouselKey}`}
          style={{
            height: (SCREEN_WIDTH - 48) * 0.608,
            flex: 1,
            width: "100%",
            marginBottom: 0,
          }}
          autoplay={false}
          pageInfo={false}
          bullets={false}
          arrows={_.size(leafletList) <= 1 ? false : true}
          arrowLeft={
            <Image
              source={require("../../assets/images/left_button.png")}
              style={{ marginLeft: 4 }}
            />
          }
          arrowRight={
            <Image
              source={require("../../assets/images/right_button.png")}
              style={{ marginRight: 4 }}
            />
          }
          pageInfoBackgroundColor={"transparent"}
          pageInfoTextStyle={{ color: colors.TRUE_WHITE, fontSize: 14 }}
          pageInfoTextSeparator="/"
          onAnimateNextPage={(p) => {
            if (prevPage === p) return;
            setPageForCarousel(p);
            prevPage = p;
          }}
          chosenBulletStyle={{
            backgroundColor: colors.YELLOW_ORANGE,
            marginLeft: 3.5,
            marginRight: 3.5,
          }}
          bulletStyle={{
            backgroundColor: colors.WHITE,
            borderWidth: 0,
            marginLeft: 3.5,
            marginRight: 3.5,
          }}
          bulletsContainerStyle={{ bottom: -30 }}
        >
          {leafletList.map((item, index) => {
            return (
              <Fragment key={item.leaf_cd}>
                {item.detail_img_cnt <= 0 && (
                  <BaseImage
                    style={{
                      flex: 1,
                    }}
                    source={item.title_img}
                    defaultSource={require("../../assets/images/m_img499.png")}
                  />
                )}
                {item.detail_img_cnt > 0 && (
                  <BaseTouchable
                    onPress={() =>
                      RootNavigation.navigate("FlyerDetail", {
                        leaf_cd: item.leaf_cd,
                      })
                    }
                    style={{
                      height: SCREEN_WIDTH * 0.608,
                      flex: 1,
                      width: "100%",
                    }}
                  >
                    <BaseImage
                      style={{
                        flex: 1,
                      }}
                      source={item.title_img}
                      defaultSource={require("../../assets/images/m_img499.png")}
                    />
                  </BaseTouchable>
                )}
              </Fragment>
            );
          })}
        </Carousel>
      </View>
      {detail_img_cnt > 0 && (
        <FlyerDetailButton
          onPress={() =>
            RootNavigation.navigate("FlyerDetail", {
              leaf_cd: leaf_cd,
            })
          }
        >
          <DetailText>전단 전체보기</DetailText>
          <Image source={require("../../assets/images/icon.png")} />
        </FlyerDetailButton>
      )}
    </>
  );
};
const FlyerDetailButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})({
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  shadowRadius: 4,
  shadowOpacity: 0.1,
  backgroundColor: colors.TRUE_WHITE,
  elevation: 0,
  paddingTop: 5,
  paddingBottom: 5,
  flexDirection: "row",
});
const DetailText = styled(BaseText)({
  fontSize: Util.normalize(14),
  letterSpacing: -0.32,
  color: colors.EMERALD,
  // fontFamily: "Roboto-Bold",
  marginRight: 2,
});
export default React.memo(FlyerBanner);
