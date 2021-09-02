import React, { Fragment } from "react";
import * as Screens from "../screens";
import { HomeTabNavigator } from "./HomeTabNavigator";
import { PADDING_BOTTOM_MENU } from "../constants";
import BottomButtons from "../components/BottomButtons";
import colors from "../constants/Colors";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

const HomeStackNavigator = createStackNavigator();

export const HomeNavigator = () => {
  return (
    <Fragment>
      <HomeStackNavigator.Navigator
        screenOptions={{
          cardStyle: {
            paddingBottom: PADDING_BOTTOM_MENU,
            backgroundColor: colors.TRUE_WHITE,
          },
          headerBackTitle: " ",
          gestureEnabled: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerTitleAlign: "center",
        }}
        initialRouteName="HomeTab"
      >
        <HomeStackNavigator.Screen
          name="HomeTab"
          component={HomeTabNavigator}
          options={Screens.HomeScreenOptions}
          // initialParams={{
          //   menuList: route.params ? route.params.menuList : [],
          // }}
          // menuList={props.menuList}
        />
        <HomeStackNavigator.Screen
          name="FlyerDetail"
          component={Screens.FlyerDetailScreen}
          options={Screens.FlyerDetailScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="BarCodeScanner"
          component={Screens.BarCodeScannerScreen}
          options={Screens.BarCodeScannerScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="StoreChange"
          component={Screens.StoreChangeScreen}
          options={Screens.StoreChangeScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="StoreChangeDetail"
          component={Screens.StoreChangeDetailScreen}
          options={Screens.StoreChangeDetailScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="MyCoupon"
          component={Screens.CouponScreen}
          options={Screens.CouponScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="CouponDetail"
          component={Screens.CouponDetailScreen}
          options={Screens.CouponDetailScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="Barcode"
          component={Screens.BarcodeScreen}
          options={Screens.BarcodeScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="RingPicker"
          component={Screens.RingPickerScreen}
          options={Screens.RingPickerScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="Notice"
          component={Screens.NoticeScreen}
          options={Screens.NoticeScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="Inquiry"
          component={Screens.InquiryScreen}
          options={Screens.InquiryScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="Privacy"
          component={Screens.PrivacyScreen}
          options={Screens.PrivacyScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="Terms"
          component={Screens.TermsScreen}
          options={Screens.TermsScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="EventDetail"
          component={Screens.EventDetailScreen}
          options={Screens.EventDetailScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="MyPage"
          component={Screens.MyPageScreen}
          options={Screens.MyPageScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="MyReviews"
          component={Screens.MyReviewsScreen}
          options={Screens.MyReviewsScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="Notification"
          component={Screens.NotificationScreen}
          options={Screens.NotificationScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="SearchProduct"
          component={Screens.SearchProductScreen}
          options={Screens.SearchProductScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="WishProduct"
          component={Screens.WishProductScreen}
          options={Screens.WishProductScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="MyInfo"
          component={Screens.MyInfoScreen}
          options={Screens.MyInfoScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="MyADAgreement"
          component={Screens.MyADAgreementScreen}
          options={Screens.MyADAgreementScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="MyEvent"
          component={Screens.EventScreen}
          options={Screens.EventScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="ExhibitionDetail"
          component={Screens.ExhibitionDetailScreen}
          options={Screens.ExhibitionDetailScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="ForStoreDetail"
          component={Screens.ExhibitionDetailScreen}
          options={Screens.ExhibitionDetailScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="StampHistory"
          component={Screens.EventStampHistoryScreen}
          options={Screens.EventStampHistoryScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="EventResult"
          component={Screens.EventResultScreen}
          options={Screens.EventResultScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="CI"
          component={Screens.CIScreen}
          options={Screens.CIScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="FindIDResult"
          component={Screens.FindIDResultScreen}
          options={Screens.FindIDResultScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="NHAHM"
          component={Screens.NHAHMScreen}
          options={Screens.NHAHMScreenOptions}
        />
        <HomeStackNavigator.Screen
          name="Login"
          component={Screens.LoginScreen}
          options={Screens.LoginScreenOptions}
        />
      </HomeStackNavigator.Navigator>
      <BottomButtons />
    </Fragment>
  );
};
