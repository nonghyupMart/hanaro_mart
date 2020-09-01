import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import JsBarcode from "jsbarcode";
import { DOMImplementation, XMLSerializer } from "xmldom";

// import Barcode from "react-native-jsbarcode";
import {
  SafeAreaView,
  View,
  Text as TextView,
  StyleSheet,
  FlatList,
  BackHandler,
} from "react-native";

import BaseDetailScreen from "@components/BaseDetailScreen";
import { BackButton } from "@UI/header";
import Barcode from "@components/Barcode";

const CouponDetailScreen = (props) => {
  const [svgBarcode, setSvgBarcode] = useState();
  const xmlSerializer = new XMLSerializer();
  const document = new DOMImplementation().createDocument(
    "http://www.w3.org/1999/xhtml",
    "html",
    null
  );
  const svgNode = document.createElementNS("http://www.w3.org/2000/svg", "svg");

  JsBarcode(svgNode, "2921117012053", {
    xmlDocument: document,
    format: "EAN13",
  });

  const svgText = xmlSerializer.serializeToString(svgNode);
  // console.log(svgText);

  const markerRendering = `<svg xmlns="http://www.w3.org/2000/svg"
     width="275" height="200" viewBox="0 0 100 30">
  <defs>
    <marker id="m1" viewBox="0 0 10 10" refX="5" refY="5"
     markerWidth="8" markerHeight="8">
      <circle cx="5" cy="5" r="5" fill="green"/>
    </marker>
    <marker id="m2" viewBox="0 0 10 10" refX="5" refY="5"
     markerWidth="6.5" markerHeight="6.5">
      <circle cx="5" cy="5" r="5" fill="skyblue" opacity="0.9"/>
    </marker>
    <marker id="m3" viewBox="0 0 10 10" refX="5" refY="5"
     markerWidth="5" markerHeight="5">
      <circle cx="5" cy="5" r="5" fill="maroon" opacity="0.85"/>
    </marker>
  </defs>

  <path d="M10,10 h10 v10 z m20,0 h10 v10 z m20,0 h10 v10 z"
  fill="none" stroke="black"
  marker-start="url(#m1)"
  marker-mid="url(#m2)"
  marker-end="url(#m3)"
  />
</svg>`;
  // setSvgBarcode(() => xmlSerializer.serializeToString(svgNode));

  return (
    <BaseDetailScreen>
      <TextView>쿠폰상세 </TextView>
      {/* <SvgXml xml={svgText} /> */}
      <Barcode
        width={2}
        height={80}
        value="2921117012053"
        format="EAN13"
        flat
        text="2921117012053"
      />
    </BaseDetailScreen>
  );
};

export const screenOptions = ({ navigation }) => {
  return {
    title: "쿠폰 상세",
    cardStyle: {
      marginBottom: 0,
    },
    headerLeft: () => <BackButton />,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CouponDetailScreen;
