import {
  ParamListBase,
  Route,
  TabNavigationState,
  useTheme,
} from "@react-navigation/native";
import Color from "color";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TabBar, TabBarIndicator } from "react-native-tab-view";

import type { MaterialTopTabBarProps } from "./types";

import ConstantsColors from "../../../constants/Colors";

export default function TabBarTop({
  state,
  navigation,
  descriptors,
  ...rest
}: MaterialTopTabBarProps) {
  const { colors } = useTheme();

  const focusedRoute = state.routes[state.index];
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  const activeColor = focusedOptions.tabBarActiveTintColor ?? colors.text;
  const inactiveColor =
    focusedOptions.tabBarInactiveTintColor ??
    Color(activeColor).alpha(0.5).rgb().string();

  const widthStyle =
    focusedRoute.name === "Home"
      ? { width: 0, paddingLeft: 0, paddingRight: 0 }
      : null;
  return (
    <TabBar
      {...rest}
      navigationState={state}
      scrollEnabled={focusedOptions.tabBarScrollEnabled}
      bounces={focusedOptions.tabBarBounces}
      activeColor={activeColor}
      inactiveColor={inactiveColor}
      pressColor={"transparent"}
      pressOpacity={1}
      tabStyle={focusedOptions.tabBarItemStyle}
      indicatorStyle={[
        {
          backgroundColor:
            focusedRoute.name === "Home"
              ? ConstantsColors.TRUE_WHITE
              : ConstantsColors.EMERALD,
          // backgroundColor: colors.primary,
        },

        focusedOptions.tabBarIndicatorStyle,
        widthStyle,
      ]}
      indicatorContainerStyle={focusedOptions.tabBarIndicatorContainerStyle}
      contentContainerStyle={focusedOptions.tabBarContentContainerStyle}
      style={[{ backgroundColor: colors.card }, focusedOptions.tabBarStyle]}
      getAccessibilityLabel={({ route }) =>
        descriptors[route.key].options.tabBarAccessibilityLabel
      }
      getTestID={({ route }) => descriptors[route.key].options.tabBarTestID}
      onTabPress={({ route, preventDefault }) => {
        const event = navigation.emit({
          type: "tabPress",
          target: route.key,
          canPreventDefault: true,
        });

        if (event.defaultPrevented) {
          preventDefault();
        }
      }}
      onTabLongPress={({ route }) =>
        navigation.emit({
          type: "tabLongPress",
          target: route.key,
        })
      }
      renderIcon={({ route, focused, color }) => {
        const { options } = descriptors[route.key];

        if (options.tabBarShowIcon === false) {
          return null;
        }

        if (options.tabBarIcon !== undefined) {
          const icon = options.tabBarIcon({ focused, color });

          return (
            <View style={[styles.icon, options.tabBarIconStyle]}>{icon}</View>
          );
        }

        return null;
      }}
      renderLabel={({ route, focused, color }) => {
        const { options } = descriptors[route.key];

        if (options.tabBarShowLabel === false) {
          return null;
        }

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : (route as Route<string>).name;

        if (typeof label === "string") {
          return (
            <Text
              style={[styles.label, { color }, options.tabBarLabelStyle]}
              allowFontScaling={options.tabBarAllowFontScaling}
            >
              {label}
            </Text>
          );
        }

        return label({ focused, color });
      }}
      renderBadge={({ route }) => {
        const { tabBarBadge } = descriptors[route.key].options;

        return tabBarBadge?.() ?? null;
      }}
      renderIndicator={({ navigationState: state, ...rest }) => {
        return focusedOptions.tabBarIndicator ? (
          focusedOptions.tabBarIndicator({
            state: state as TabNavigationState<ParamListBase>,
            ...rest,
          })
        ) : (
          <TabBarIndicator navigationState={state} {...rest} />
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  icon: {
    height: 24,
    width: 24,
  },
  label: {
    textAlign: "center",
    textTransform: "uppercase",
    // fontSize: 13,
    // margin: 4,
    backgroundColor: "transparent",
  },
});
