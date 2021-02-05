import * as React from "react";
import styled from "styled-components/native";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Platform,
  LayoutChangeEvent,
} from "react-native";
import { TabBar } from "react-native-tab-view";
import {
  Route,
  useTheme,
  NavigationContext,
  NavigationRouteContext,
  CommonActions,
  useLinkBuilder,
} from "@react-navigation/native";
import { useSafeArea } from "react-native-safe-area-context";
import { BaseText } from "../BaseUI";

import useWindowDimensions from "./utils/useWindowDimensions";
import useIsKeyboardShown from "./utils/useIsKeyboardShown";
import Color from "color";
import ConstantsColors from "../../../constants/Colors";

import type { MaterialTopTabBarProps } from "./types";
const useNativeDriver = Platform.OS !== "web";
const DEFAULT_TABBAR_HEIGHT = 34;
const DEFAULT_MAX_TAB_ITEM_WIDTH = 125;

export default function TabBarTop(props: MaterialTopTabBarProps) {
  const { colors } = useTheme();

  const {
    state,
    navigation,
    descriptors,
    activeTintColor = ConstantsColors.black,
    inactiveTintColor = ConstantsColors.black,
    allowFontScaling = false,
    keyboardHidesTabBar = false,
    showIcon = false,
    showLabel = true,
    pressColor = ConstantsColors.black,
    iconStyle,
    labelStyle,
    indicatorStyle,
    safeAreaInsets,
    style,
    ...rest
  } = props;

  const buildLink = useLinkBuilder();

  const focusedRoute = state.routes[state.index];
  const focusedDescriptor = descriptors[focusedRoute.key];
  const focusedOptions = focusedDescriptor.options;

  const dimensions = useWindowDimensions();
  const isKeyboardShown = useIsKeyboardShown();

  // const focusedOptions = descriptors[state.routes[state.index].key].options;
  // if (focusedOptions.tabBarVisible === false) {
  //   return null;
  // }

  const shouldShowTabBar =
    focusedOptions.tabBarVisible !== false &&
    !(keyboardHidesTabBar && isKeyboardShown);

  const visibilityAnimationConfigRef = React.useRef(
    focusedOptions.tabBarVisibilityAnimationConfig
  );

  React.useEffect(() => {
    visibilityAnimationConfigRef.current =
      focusedOptions.tabBarVisibilityAnimationConfig;
  });

  const [isTabBarHidden, setIsTabBarHidden] = React.useState(!shouldShowTabBar);

  const [visible] = React.useState(
    () => new Animated.Value(shouldShowTabBar ? 1 : 0)
  );

  React.useEffect(() => {
    const visibilityAnimationConfig = visibilityAnimationConfigRef.current;

    if (shouldShowTabBar) {
      const animation =
        visibilityAnimationConfig?.show?.animation === "spring"
          ? Animated.spring
          : Animated.timing;

      animation(visible, {
        toValue: 1,
        useNativeDriver,
        duration: 50,
        ...visibilityAnimationConfig?.show?.config,
      }).start(({ finished }) => {
        if (finished) {
          setIsTabBarHidden(false);
        }
      });
    } else {
      setIsTabBarHidden(true);

      const animation =
        visibilityAnimationConfig?.hide?.animation === "spring"
          ? Animated.spring
          : Animated.timing;

      animation(visible, {
        toValue: 0,
        useNativeDriver,
        duration: 200,
        ...visibilityAnimationConfig?.hide?.config,
      }).start();
    }
  }, [visible, shouldShowTabBar]);

  const [layout, setLayout] = React.useState({
    height: 0,
    width: dimensions.width,
  });
  const handleLayout = (e: LayoutChangeEvent) => {
    const { height, width } = e.nativeEvent.layout;

    setLayout((layout) => {
      if (height === layout.height && width === layout.width) {
        return layout;
      } else {
        return {
          height,
          width,
        };
      }
    });
  };
  const defaultInsets = useSafeArea();

  const insets = {
    top: safeAreaInsets?.top ?? defaultInsets.top,
    right: safeAreaInsets?.right ?? defaultInsets.right,
    bottom: safeAreaInsets?.bottom ?? defaultInsets.bottom,
    left: safeAreaInsets?.left ?? defaultInsets.left,
  };

  const { routes } = state;
  const paddingBottom = Math.max(
    insets.bottom - Platform.select({ ios: 4, default: 0 }),
    0
  );
  return (
    <Container>
      <TabBar
        {...rest}
        navigationState={state}
        activeColor={activeTintColor}
        inactiveColor={inactiveTintColor}
        indicatorStyle={[
          {
            backgroundColor:
              focusedRoute.name == "Home"
                ? ConstantsColors.trueWhite
                : ConstantsColors.emerald,
            height: 2,
          },
          indicatorStyle,
        ]}
        style={[{ backgroundColor: colors.card, elevation: 0 }, style]}
        pressColor={ConstantsColors.trueWhite}
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
          if (showIcon === false) {
            return null;
          }

          const { options } = descriptors[route.key];

          if (options.tabBarIcon !== undefined) {
            const icon = options.tabBarIcon({ focused, color });

            return <View style={[styles.icon, iconStyle]}>{icon}</View>;
          }

          return null;
        }}
        renderLabel={({ route, focused, color }) => {
          if (showLabel === false) {
            return null;
          }

          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : (route as Route<string>).name;

          if (typeof label === "string") {
            return (
              <>
                <BarText
                  focused={focused}
                  style={[styles.label, { color }, labelStyle]}
                  allowFontScaling={false}
                >
                  {label}
                </BarText>
                <Border focused={focused} />
              </>
            );
          }

          return label({ focused, color });
        }}
      />
    </Container>
  );
}
const Border = styled.View({
  marginTop: 2,
  backgroundColor: (props) =>
    props.focused ? ConstantsColors.emerald : ConstantsColors.trueWhite,
  height: 2,
});
const BarText = styled(BaseText)({});
const Container = styled.View({
  width: "100%",
  marginLeft: 18,
  paddingRight: 18,
  overflow: "hidden",
});
const styles = StyleSheet.create({
  tabBar: {
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: StyleSheet.hairlineWidth,
    elevation: 0,
  },
  content: {
    flex: 1,
    flexDirection: "row",
  },
  icon: {
    height: 24,
    width: 24,
  },
  label: {
    paddingLeft: 10,
    paddingRight: 10,
    textTransform: "uppercase",

    backgroundColor: "transparent",
    fontSize: 15,
    fontWeight: "500",
    fontStyle: "normal",

    letterSpacing: 0,
    textAlign: "left",
    color: ConstantsColors.emerald,
  },
});
