import React from "react";
import { Image, TouchableOpacity } from "react-native";
import * as RootNavigation from "../../../navigation/RootNavigation";
import * as Util from "../../../utils";
import {
  MoreContainer,
  MoreText,
  Title,
  TitleContainer,
} from "../HomeProductsHeader";

const HomeEventHeader = ({ listSize = 0 }) => {
  return (
    <TitleContainer>
      {listSize > 0 && (
        <>
          <Title
            style={{ fontSize: Util.normalize(9), lineHeight: null } as any}
          >
            {" "}
          </Title>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => RootNavigation.navigate("Event")}
          >
            <MoreContainer>
              <MoreText>더보기</MoreText>
              <Image source={require("../../../assets/images/path2.png")} />
            </MoreContainer>
          </TouchableOpacity>
        </>
      )}
    </TitleContainer>
  );
};
export default HomeEventHeader;
