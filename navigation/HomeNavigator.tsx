import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { Fragment } from "react";
import BottomButtons from "../components/BottomButtons";
import { PADDING_BOTTOM_MENU } from "../constants";
import { useAppSelector } from "../hooks";
import * as Screens from "../screens";
import { HomeTabNavigator } from "./HomeTabNavigator";
import _ from "lodash";

const HomeStackNavigator = createNativeStackNavigator();

export const HomeNavigator = () => {
  const userStore = useAppSelector((state) => state.auth.userStore);
  return (
    <Fragment>
      <HomeStackNavigator.Navigator
        screenOptions={{
          contentStyle: {
            paddingBottom: PADDING_BOTTOM_MENU,
          },
          animation: "slide_from_right",
          headerBackTitle: " ",
          gestureEnabled: false,
          headerTitleAlign: "center",
          headerBackVisible: false,
        }}
        initialRouteName="HomeTab"
      >
        {_.isEmpty(userStore) ? (
          <>
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
          </>
        ) : (
          <>
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
            />
            <HomeStackNavigator.Screen
              name="Inquiry"
              component={Screens.InquiryScreen}
            />
            <HomeStackNavigator.Screen
              name="Privacy"
              component={Screens.PrivacyScreen}
            />
            <HomeStackNavigator.Screen
              name="Terms"
              component={Screens.TermsScreen}
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
            />
            <HomeStackNavigator.Screen
              name="Notification"
              component={Screens.NotificationScreen}
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
            <HomeStackNavigator.Screen
              name="Withdrawal"
              component={Screens.WithdrawalMembershipScreen}
              options={Screens.WithdrawalMembershipScreenOptions}
            />
          </>
        )}
      </HomeStackNavigator.Navigator>
      <BottomButtons />
    </Fragment>
  );
};
