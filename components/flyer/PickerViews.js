import React, { useEffect, useState, Fragment, useRef } from "react";
import styled from "styled-components/native";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Image } from "react-native";

import RNPickerSelect from "react-native-picker-select";
import _ from "lodash";
import { BaseText } from "../../components/UI/BaseUI";

const PickerViews = (props) => {
  const pickerRef = useRef();
  const userStore = props.userStore;
  let pickerItems = [];
  const [selectedItem, setSelectedItem] = useState({
    label: props.currentFlyer.title,
    value: props.currentFlyer.leaf_cd,
  });
  const dispatch = useDispatch();
  const carousel = useSelector((state) => state.flyer.carousel);
  const onItemChange = async (value) => {
    if (!value || value == selectedItem.value) return;
    const item = _.filter(pickerItems, (o) => o.value == value);
    setSelectedItem(item[0]);
    const index = _.findIndex(pickerItems, (o) => o.value == value);
    props.setPageForCarousel(index);
    carousel.animateToPage(index);
  };

  useEffect(() => {
    if (!selectedItem) return;

    // dispatch(
    //   flyerActions.fetchProduct({
    //     store_cd: userStore.storeInfo.store_cd,
    //     leaf_cd: selectedItem.value,
    //     page: 1,
    //   })
    // );
  }, [selectedItem]);

  useEffect(() => {
    setSelectedItem({
      label: props.currentFlyer.title,
      value: props.currentFlyer.leaf_cd,
    });
  }, [props.currentFlyer]);

  props.leafletList &&
    props.leafletList.map((item, index) => {
      pickerItems.push({
        label: item.title,
        value: item.leaf_cd,
        key: item.leaf_cd,
      });
    });

  if (!selectedItem) return <></>;
  return (
    <PickerContainer>
      <RNPickerSelect
        fixAndroidTouchableBug={true}
        InputAccessoryView={null}
        ref={pickerRef}
        placeholder={{ label: "행사전단 선택", value: "" }}
        value={selectedItem.value}
        style={pickerSelectStyles}
        onValueChange={(value) => onItemChange(value)}
        items={pickerItems}
      >
        <PickerContainer>
          <PickerButton onPress={() => pickerRef.togglePicker()}>
            <PickerText>{selectedItem.label}</PickerText>
            <Image source={require("../../assets/images/bt.png")} />
          </PickerButton>
        </PickerContainer>
      </RNPickerSelect>
    </PickerContainer>
  );
};

const PickerText = styled(BaseText)({
  fontSize: 15,
  color: colors.CERULEAN_2,
  letterSpacing: -0.3,
  marginRight: 3.5,
});
const PickerButton = styled.TouchableOpacity({
  paddingBottom: 11.5,
  flexDirection: "row",
  alignItems: "center",
});
const PickerContainer = styled.View({
  flexDirection: "row",
  flex: 1,
  justifyContent: "center",
  alignSelf: "center",
  backgroundColor: colors.trueWhite,
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 15,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: colors.CERULEAN_2,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: colors.CERULEAN_2,
    paddingRight: 30, // to ensure the text is never behind the icon
    width: 300,
    height: 19,
  },
});
const styles = StyleSheet.create({
  pickerItem: {
    fontSize: 14,
  },
  picker: {
    flexGrow: 0.5,
    color: colors.greyishBrown,
  },
  row: { flexDirection: "row", justifyContent: "center", alignItems: "center" },
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: "Roboto-Bold",
    fontSize: 18,
  },
  amount: {
    color: colors.primary,
  },
});
export default PickerViews;
