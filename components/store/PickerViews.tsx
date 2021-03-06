import _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { Image, Platform, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import styled from "styled-components/native";
import colors from "../../constants/Colors";
import { useAppDispatch } from "../../hooks";
import * as branchesActions from "../../store/actions/branches";
import { BaseText } from "../UI/BaseUI";

const PickerViews = (props) => {
  const lnamePickerRef = useRef();
  const mnamePickerRef = useRef();
  let lnameItems = [];
  const [displayedLname, setDisplayedLname] = useState("시/도 선택");
  const [mnameItems, setMnameItems] = useState([]);
  const [displayedMname, setDisplayedMname] = useState("선택");
  const dispatch = useAppDispatch();

  const onLnameChange = async (lname) => {
    props.setLname(() => (lname ? lname : null));
    if (Platform.OS === "android") onLnameDonePress();
  };
  const onLnameDonePress = () => {
    props.setMname(() => null);
    setMnameItems([]);
    setDisplayedLname(props.lname ? props.lname : "시/도 선택");
    setDisplayedMname("선택");
    props.pageNum.current = 1;
    props.fetchBranches(props.lname, null, "", 1);
    dispatch(branchesActions.fetchAddress2(props.lname));
  };

  const onMnameChange = (lname, mname) => {
    props.setMname(() => (mname ? mname : null));
    if (Platform.OS === "android") onMnameDonePress();
  };

  const onMnameDonePress = () => {
    setDisplayedMname(props.mname ? props.mname : "선택");
    props.fetchBranches(props.lname, props.mname, "", 1);
  };

  props.address1 &&
    props.address1.lnameList &&
    props.address1.lnameList.map((item, index) => {
      lnameItems.push({
        label: item.lname,
        value: item.lname,
      });
    });
  useEffect(() => {
    if (_.isEmpty(props.address2) || _.isEmpty(props.address2.mnameList))
      return;

    setMnameItems([]);
    let arr = [];
    props.address2.mnameList.map((item, index) => {
      arr.push({
        label: item.mname,
        value: item.mname,
      });
    });
    setMnameItems(arr);

    return () => {};
  }, [props.address2]);

  return (
    <PickerContainer>
      <RNPickerSelect
        useNativeAndroidPickerStyle={false}
        doneText="확인"
        fixAndroidTouchableBug={true}
        InputAccessoryView={null}
        ref={lnamePickerRef}
        placeholder={{ label: "시/도 선택", value: "" }}
        value={props.lname}
        onValueChange={(value) => onLnameChange(value)}
        items={lnameItems}
        onDonePress={onLnameDonePress}
      >
        <PickerContainer>
          <PickerButton onPress={() => lnamePickerRef.togglePicker()}>
            <PickerText>{displayedLname}</PickerText>
            <Image source={require("../../assets/images/bt.png")} />
          </PickerButton>
        </PickerContainer>
      </RNPickerSelect>

      {displayedLname !== "시/도 선택" &&
        props.address2?.mnameList && (
          <RNPickerSelect
            doneText="확인"
            fixAndroidTouchableBug={true}
            InputAccessoryView={null}
            ref={mnamePickerRef}
            placeholder={{ label: "선택", value: "" }}
            value={props.mname}
            onValueChange={(value) => onMnameChange(props.lname, value)}
            onDonePress={onMnameDonePress}
            items={mnameItems}
            key={displayedLname}
          >
            <PickerContainer>
              <PickerButton onPress={() => mnamePickerRef.togglePicker()}>
                <PickerText>{displayedMname}</PickerText>
                <Image source={require("../../assets/images/bt.png")} />
              </PickerButton>
            </PickerContainer>
          </RNPickerSelect>
        )}
    </PickerContainer>
  );
};
const PickerText = styled(BaseText)({
  fontSize: 17,
  color: colors.GREYISH_BROWN,
});
const PickerButton = styled.TouchableOpacity({
  padding: 10,
  paddingTop: 25,
  paddingBottom: 10,
  flexDirection: "row",
  alignItems: "center",
});
const PickerContainer = styled.View({
  flexDirection: "row",
  flex: 1,
  justifyContent: "center",
  paddingTop: Platform.OS === "android" ? 10 : 0,
  paddingBottom: Platform.OS === "android" ? 10 : 0,
  marginLeft: 35.5,
  marginRight: 35.5,
});

const styles = StyleSheet.create({
  pickerItem: {
    fontSize: 14,
  },
  picker: {
    flexGrow: 0.5,
    color: colors.GREYISH_BROWN,
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
    color: colors.PRIMARY,
  },
});
export default PickerViews;
