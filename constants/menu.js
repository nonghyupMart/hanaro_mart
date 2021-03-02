import HomeScreen, {
  screenOptions as HomeScreenOptions,
} from "../screens/home/HomeScreen";
import FlyerScreen from "../screens/home/FlyerScreen";
import FlyerDetailScreen, {
  screenOptions as FlyerDetailScreenOptions,
} from "../screens/home/FlyerDetailScreen";
import EventScreen from "../screens/home/EventScreen";
import ExhibitionScreen from "../screens/home/ExhibitionScreen";
import NaroTubeScreen from "../screens/home/NaroTubeScreen";
import CouponScreen, {
  screenOptions as CouponScreenOptions,
} from "../screens/home/CouponScreen";
import EmptyScreen from "../screens/EmptyScreen";

export const TabMenus = [
  {
    components: FlyerScreen,
    subComponents: EmptyScreen,
    name: "Flyer",
    title: "행사전단",
    icon: require("../assets/images/news.png"),
  },
  {
    components: EventScreen,
    subComponents: EmptyScreen,
    name: "Event",
    title: "이벤트",
    icon: require("../assets/images/pig.png"),
  },
  {
    components: CouponScreen,
    subComponents: EmptyScreen,
    name: "Coupon",
    title: "쿠폰",
    icon: require("../assets/images/ticket2.png"),
  },
  {
    components: CouponScreen,
    subComponents: EmptyScreen,
    name: "Coupon",
    title: "나로쿠폰",
    icon: require("../assets/images/ticket2.png"),
  },
  {
    components: ExhibitionScreen,
    subComponents: EmptyScreen,
    name: "Exhibition",
    title: "기획전",
    icon: require("../assets/images/medal2.png"),
  },
  {
    components: NaroTubeScreen,
    subComponents: NaroTubeScreen,
    name: "NaroTube",
    title: "나로튜브",
    icon: require("../assets/images/pictures.png"),
  },
  {
    components: ExhibitionScreen,
    subComponents: EmptyScreen,
    name: "ForStore",
    title: "매장전용",
    icon: require("../assets/images/shop1.png"),
  },
];
