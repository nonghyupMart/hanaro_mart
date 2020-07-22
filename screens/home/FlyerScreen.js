import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableHighlight,
} from "react-native";
import ImageSlider from "react-native-image-slider";
import ViewPager from "@react-native-community/viewpager";
import BottomButtons from "../../components/BottomButtons";

const FlyerScreen = ({ navigation }) => {
  const images = [
    "https://placeimg.com/640/640/nature",
    "https://placeimg.com/640/640/people",
    "https://placeimg.com/640/640/animals",
    "https://placeimg.com/640/640/beer",
  ];

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content1}>
        <Button
          title="전단 상세"
          onPress={() => navigation.navigate("FlyerDetail")}
        />
      </View>
      <ImageSlider
        loopBothSides
        autoPlayWithInterval={3000}
        images={images}
        customSlide={({ index, item, style, width }) => (
          // It's important to put style here because it's got offset inside
          <View key={index} style={[style, styles.customSlide]}>
            <Image source={{ uri: item }} style={styles.customImage} />
          </View>
        )}
        customButtons={(position, move) => (
          <View style={styles.buttons}>
            {images.map((image, index) => {
              return (
                <TouchableHighlight
                  key={index}
                  underlayColor="#ccc"
                  onPress={() => move(index)}
                  style={styles.button}
                >
                  <Text style={position === index && styles.buttonSelected}>
                    {index + 1}
                  </Text>
                </TouchableHighlight>
              );
            })}
          </View>
        )}
      />
      <View style={styles.content2}>
        <Text style={styles.contentText}>Content 2</Text>
      </View>
      <Text>FlyerScreen</Text>
      <BottomButtons />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  viewPager: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
  slider: { backgroundColor: "#000", height: 350 },
  content1: {
    width: "100%",
    height: 50,
    marginBottom: 10,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  content2: {
    width: "100%",
    height: 100,
    marginTop: 10,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  contentText: { color: "#fff" },
  buttons: {
    zIndex: 1,
    height: 15,
    marginTop: -25,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  button: {
    margin: 3,
    width: 15,
    height: 15,
    opacity: 0.9,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonSelected: {
    opacity: 1,
    color: "red",
  },
  customSlide: {
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
  customImage: {
    width: 100,
    height: 100,
  },
});

export default FlyerScreen;
