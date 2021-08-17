import React from "react";
import styled from "styled-components/native";
import { BaseText } from "./BaseUI";
import * as Util from "../../utils";
import CategoryButtonSmall from "./CategoryButtonSmall";
import { View } from "react-native";
import ExtendedFlatList from "../../components/UI/ExtendedFlatList";
import colors from "../../constants/Colors";

const CategoryButtonSmallList = ({ data, value, setValue }) => {
  return (
    <View
      style={{
        height: 35,
        overflow: "hidden",
        marginTop: 30,
        alignSelf: "center",
      }}
    >
      <ExtendedFlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          height: 35,
        }}
        style={{
          alignSelf: "center",
          marginTop: 0,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
        }}
        data={data}
        keyExtractor={(item) => `${item.type_val}`}
        renderItem={(itemData) => (
          <CategoryButtonSmall
            item={itemData.item}
            type_val={value}
            onPress={setValue.bind(this, itemData.item.type_val)}
          />
        )}
      />
    </View>
  );
};
const Button = styled.TouchableOpacity({
  borderWidth: 1,
  borderColor: colors.EMERALD,
  borderRadius: 30,
  paddingLeft: 6,
  paddingRight: 6,
  marginRight: 8,
  justifyContent: "center",
  alignItems: "center",
  height: Util.normalize(25),
  minWidth: Util.normalize(54),
});
const ButtonText = styled(BaseText)({
  fontSize: Util.normalize(13),
  letterSpacing: -0.34,
  textAlign: "center",
  color: colors.EMERALD,
  fontFamily: "Roboto-Bold",
});
const SelectedButton = styled(Button)({
  backgroundColor: colors.EMERALD,
});
const SelectedText = styled(ButtonText)({ color: colors.TRUE_WHITE });

export default CategoryButtonSmallList;
