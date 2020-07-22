import React from "react";
import { View, TouchableWithoutFeedback, StyleSheet, Text } from "react-native";
import Animated from "react-native-reanimated";

const HomeTabBar = ({ state, descriptors, navigation, position }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = Animated.interpolate(position, {
          inputRange,
          outputRange: inputRange.map((i) => (i === index ? 1 : 1)),
        });

        return (
          <TouchableWithoutFeedback
            accessibilityRole="button"
            accessibilityStates={isFocused ? ["selected"] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <Animated.Text style={{ opacity }}>{label}</Animated.Text>
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: 24,
    width: 24,
  },
  label: {
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: 13,
    margin: 4,
    backgroundColor: "transparent",
  },
});
export default HomeTabBar;
