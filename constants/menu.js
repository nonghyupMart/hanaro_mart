import HomeScreen, {
  screenOptions as HomeScreenOptions,
} from "@screens/home/HomeScreen";
import FlyerScreen from "@screens/home/FlyerScreen";
import FlyerDetailScreen, {
  screenOptions as FlyerDetailScreenOptions,
} from "@screens/home/FlyerDetailScreen";
import EventScreen from "@screens/home/EventScreen";
import ExhibitionScreen from "@screens/home/ExhibitionScreen";
import NaroTubeScreen from "@screens/home/NaroTubeScreen";
import CouponScreen, {
  screenOptions as CouponScreenOptions,
} from "@screens/home/CouponScreen";

export const TabMenus = [
  {
    components: HomeScreen,
    name: "Home",
    title: "홈",
    icon: null,
  },
  {
    components: FlyerScreen,
    name: "Flyer",
    title: "행사전단",
    icon: require("@images/news.png"),
  },
  {
    components: EventScreen,
    name: "Event",
    title: "이벤트",
    icon: require("@images/pig.png"),
  },
  {
    components: CouponScreen,
    name: "Coupon",
    title: "나로쿠폰",
    icon: require("@images/ticket2.png"),
  },
  {
    components: ExhibitionScreen,
    name: "Exhibition",
    title: "기획전",
    icon: require("@images/medal2.png"),
  },
  {
    components: NaroTubeScreen,
    name: "NaroTube",
    title: "나로튜브",
    icon: require("@images/pictures.png"),
  },
  {
    components: NaroTubeScreen,
    name: "ForStore",
    title: "매장전용",
    icon: require("@images/shop1.png"),
  },
];
