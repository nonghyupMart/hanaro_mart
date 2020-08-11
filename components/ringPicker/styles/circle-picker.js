import { StyleSheet } from "react-native";

import { SQUARE_DIMENSIONS } from "../util";

export default StyleSheet.create({
  container: {
    flex: 0.1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 500,
    elevation: 500,
  },
  icon: {
    position: "absolute",
    width: SQUARE_DIMENSIONS.WIDTH * 0.15,
    height: SQUARE_DIMENSIONS.WIDTH * 0.15,
    flex: 1,
    // backgroundColor: 'blue',
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    position: "absolute",
    top: -(SQUARE_DIMENSIONS.WIDTH * 0.000001),
    left: 0,
    width: SQUARE_DIMENSIONS.WIDTH * 0.15,
    height: SQUARE_DIMENSIONS.WIDTH * 0.15,
    zIndex: 999,
    elevation: 999,
  },
  iconText: {
    color: "#000",
    fontSize: 12,
    flex: 0,
    width: SQUARE_DIMENSIONS.WIDTH * 0.4,
    left: -(
      SQUARE_DIMENSIONS.WIDTH * 0.2 -
      (SQUARE_DIMENSIONS.WIDTH * 0.15) / 2
    ),
    textAlign: "center",
    textTransform: "capitalize",
  },
  swipeArrowHint: {
    position: "absolute",
    top: SQUARE_DIMENSIONS.WIDTH * 0.08,
    left: SQUARE_DIMENSIONS.WIDTH * 0.21,
    width: SQUARE_DIMENSIONS.WIDTH * 0.38,
    height: SQUARE_DIMENSIONS.WIDTH * 0.3,
  },
  wheel: {
    width: SQUARE_DIMENSIONS.WIDTH * 0.7,
    height: SQUARE_DIMENSIONS.WIDTH * 0.7,
  },
  wheelTouchableCenter: {
    position: "absolute",
    width: SQUARE_DIMENSIONS.WIDTH * 0.4,
    height: SQUARE_DIMENSIONS.WIDTH * 0.4,
    top: SQUARE_DIMENSIONS.WIDTH * 0.2,
    left: SQUARE_DIMENSIONS.WIDTH * 0.2,
  },
});
