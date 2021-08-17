import FlyerScreen from "../screens/home/FlyerScreen";
import EventScreen from "../screens/home/EventScreen";
import ExhibitionScreen from "../screens/home/ExhibitionScreen";
import NaroTubeScreen from "../screens/home/NaroTubeScreen";
import CouponScreen from "../screens/home/CouponScreen";

export const TabMenus = [
  {
    components: FlyerScreen,
    name: "Flyer",
    title: "행사전단",
    icon: require("../assets/images/news.png"),
  },
  {
    components: EventScreen,
    name: "Event",
    title: "이벤트",
    icon: require("../assets/images/pig.png"),
  },
  {
    components: CouponScreen,
    name: "Coupon",
    title: "쿠폰",
    icon: require("../assets/images/ticket2.png"),
  },
  {
    components: ExhibitionScreen,
    name: "Exhibition",
    title: "기획전",
    icon: require("../assets/images/medal2.png"),
  },
  {
    components: NaroTubeScreen,
    name: "NaroTube",
    title: "나로튜브",
    icon: require("../assets/images/pictures.png"),
  },
  {
    components: ExhibitionScreen,
    name: "ForStore",
    title: "매장전용",
    icon: require("../assets/images/shop1.png"),
  },
];
