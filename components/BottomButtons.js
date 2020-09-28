import React from "react";
import styled from "styled-components/native";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  View,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as Linking from "expo-linking";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import _ from "lodash";
import * as RootNavigation from "../navigation/RootNavigation";
import { Icon } from "react-native-elements";

const BottomButtons = (props) => {
  const userStore = useSelector((state) => state.auth.userStore);
  const isBottomNavigation = useSelector(
    (state) => state.common.isBottomNavigation
  );
  if (isBottomNavigation)
    return (
      <Container>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.icons}
          onPress={() => {
            RootNavigation.navigate("Home");
          }}
        >
          <IconContainer>
            <MaterialIcons name="home" size={26} color={colors.greyishTwo} />
            <IconText style={styles.center}>홈</IconText>
          </IconContainer>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.icons}
          onPress={() => {
            if (_.isEmpty(userStore)) return RootNavigation.navigate("Empty");
            RootNavigation.navigate("MyCoupon");
          }}
        >
          <IconContainer>
            <Entypo
              name="ticket"
              size={26}
              color="black"
              color={colors.greyishTwo}
            />
            <IconText style={styles.center}>나의 쿠폰</IconText>
          </IconContainer>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.icons, { marginTop: 0, marginBottom: 5 }]}
          activeOpacity={1}
          onPress={() => {
            RootNavigation.navigate("RingPicker");
          }}
        >
          <Image source={require("@images/hana_logo.png")} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.icons}
          onPress={() => {
            if (_.isEmpty(userStore)) return RootNavigation.navigate("Empty");
            RootNavigation.navigate("MyPage");
          }}
        >
          <IconContainer>
            <MaterialIcons name="person" size={26} color={colors.greyishTwo} />
            <IconText style={styles.center}>마이페이지</IconText>
          </IconContainer>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.icons}
          onPress={() => {
            if (_.isEmpty(userStore)) return RootNavigation.navigate("Empty");
            Linking.openURL("tel:" + userStore.storeInfo.tel);
          }}
        >
          <IconContainer>
            <MaterialIcons name="call" size={26} color={colors.greyishTwo} />
            <IconText style={styles.center}>매장전화</IconText>
          </IconContainer>
        </TouchableOpacity>
      </Container>
    );
  else return <></>;
};

const IconContainer = styled.View({
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
});
const IconText = styled.Text({
  fontSize: 12,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 17,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.greyishBrown,
});
const Container = styled.View({
  flex: 1,
  height: 66,
  backgroundColor: colors.trueWhite,
  shadowColor: colors.black16,
  shadowOffset: {
    width: 3,
    height: 0,
  },
  shadowRadius: 6,
  shadowOpacity: 1,
  flexDirection: "row",
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
  // justifyContent: "center",
  alignItems: "center",
  elevation: 10,
});
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  hide: {
    opacity: 0,
  },
  icons: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 9,
    flexDirection: "column",
  },
  center: {
    flex: 1,
  },

  ringIcons: {
    color: "green",
    backgroundColor: "green",
  },
});

export default BottomButtons;
