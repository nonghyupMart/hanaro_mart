import React, { useEffect, useState, Fragment } from "react";
import styled from "styled-components/native";
import colors from "../../constants/Colors";
import { IMAGE_URL } from "../../constants";
import * as Util from "../../utils";
import {
  Dimensions,
  TouchableOpacity,
  Platform,
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";
import _ from "lodash";
// import ScaledImage from "../../components/UI/ScaledImage";
export { default as ScaledImage } from "./ScaledImage";
export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get(
  "window"
);
export const StyleConstants = {
  defaultPadding: 24,
  //  defaultImageLarge: require("../../assets/images/m_img499.png"),
  //  defaultImage: require("../../assets/images/b_img500.png"),
  //  defaultImage: require("../../assets/images/b_img500.png"),
  //  defaultImage: require("../../assets/images/b_img500.png"),
};
const CustomText = ({ style, children, ...rest }) => {
  let baseStyle = styles.medium;

  // Multiple styles may be provided.
  (Array.isArray(style) ? style : [style]).forEach((style) => {
    if (style?.fontWeight) {
      baseStyle = style.fontWeight === "bold" ? styles.bold : styles.regular;
    }
  });

  // We need to force fontWeight to match the right font family.
  return (
    <Text style={[baseStyle, style, { fontWeight: "normal" }]} {...rest}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  bold: {
    fontFamily: "Roboto-Bold",
  },
  regular: {
    fontFamily: "Roboto-Regular",
  },
});
Text.defaultProps = { allowFontScaling: false };
export const BaseText = styled(Text)({
  fontFamily: (props) => {
    return "Roboto-Regular";
  },
});

BaseText.defaultProps = { allowFontScaling: false };
export const BaseTextBold = styled(BaseText)({
  fontFamily: "Roboto-Bold",
});
TextInput.defaultProps = {
  allowFontScaling: false,
  underlineColorAndroid: "transparent",
};
export const BaseTextInput = styled(TextInput)({
  fontFamily: "Roboto-Regular",
  borderWidth: 0,
});
const ExtendedImage = (props) => {
  const [source, setSource] = useState(props.source);
  const [resizeMode, setResizeMode] = useState(
    props.initResizeMode ? props.initResizeMode : "cover"
  );
  const [color, setColor] = useState(
    Platform.OS === "android" ? colors.WHITE : "transparent"
  );
  const onError = () => {
    setSource(
      props.defaultSource
        ? props.defaultSource
        : require("../../assets/images/m_img499.png")
    );
  };
  const onLoadEnd = () => {
    setResizeMode(props.resizeMode);
    setColor("transparent");
  };
  return (
    <ImageBackground
      {...props}
      onLoadEnd={onLoadEnd}
      onError={onError}
      source={source}
      resizeMode={resizeMode}
      style={[{ backgroundColor: color }, props.style]}
    />
  );
};

BaseTextInput.defaultProps = { allowFontScaling: false };
export const BaseImage = styled(ExtendedImage).attrs((props) => {
  if (!props.source || props.source === " ")
    return {
      source: props.defaultSource
        ? props.defaultSource
        : require("../../assets/images/b_img500.png"),
    };
  let source;
  if (typeof props.source === "string")
    source = {
      uri: IMAGE_URL + props.source,
    };
  else source = props.source;
  return {
    source: source,
    defaultSource: props.defaultSource,
  };
})((props) => {
  return {
    // backgroundColor: colors.WHITE,
  };
});

BaseImage.defaultProps = {
  defaultSource: require("../../assets/images/b_img500.png"),
  resizeMode: "cover",
};
const BaseTouchbaleOpacity = (props) => {
  const opacity = props.disabled === true ? 0.5 : 1;
  return (
    <TouchableOpacity {...props}>
      <View style={{ opacity }}>{props.children}</View>
    </TouchableOpacity>
  );
};
export const BaseTouchable = (props) => {
  const Touchbale = Util.withPreventDoubleClick(TouchableOpacity);
  return <Touchbale {...props}>{props.children}</Touchbale>;
};

export const ImageButton = (props) => {
  return (
    <BaseTouchable style={props.style} onPress={props.onPress}>
      <Image source={props.source} style={props.ImageStyle} />
    </BaseTouchable>
  );
};
export const BaseButtonContainer = styled.TouchableOpacity({
  width: SCREEN_WIDTH * 0.728,
  aspectRatio: 100 / 12.8205,
  borderRadius: 21,
  justifyContent: "center",
  alignItems: "center",
});

export const ButtonText = styled(BaseText)({
  fontSize: 16,
  // flex: 1,
  // flexDirection: "column",
  color: colors.TRUE_WHITE,
});

export const BaseSquareButtonContainer = styled(BaseButtonContainer)({
  borderRadius: 8,
});

const DetailContainerBody = styled.View({
  alignItems: "center",
  width: "100%",
  flex: 1,
  backgroundColor: colors.TRUE_WHITE,
  // marginTop: 7,
  paddingLeft: 24,
  paddingRight: 24,
  // paddingBottom: 65,
});
const DetailContainerMarginTop = styled.View({
  width: "100%",
  height: 7,
  backgroundColor: colors.WHITE,
});
export const DetailContainer = (props) => {
  return (
    <>
      <DetailContainerMarginTop />
      <DetailContainerBody {...props} />
    </>
  );
};

export const BlueButtonText = styled(BaseText)({
  fontSize: 16,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.TRUE_WHITE,
  marginLeft: 3,
});
// TODO : check layouts where BlueButton is used.
export const BlueButton = styled(BaseButtonContainer)({
  marginTop: 5,
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
  backgroundColor: colors.CERULEAN,
  paddingTop: 8,
  paddingBottom: 8,
  alignSelf: "center",
});

export const BaseButton = (props) => {
  return (
    <BlueButton style={props.style} {...props}>
      <BlueButtonText style={props.textStyle}>{props.children}</BlueButtonText>
    </BlueButton>
  );
};
