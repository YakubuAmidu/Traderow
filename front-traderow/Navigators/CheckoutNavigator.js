import React from "react";
import { createMaterialTopNavigator } from "react-navigation/material-top-tabs";

import Checkout from "../Screens/Cart/Checkout/Checkout";
import Confirm from "../Screens/Cart/Checkout/Confirm";
import Payment from "../Screen/Cart/Checkout/Payment";

const Tab = createMaterialTopNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="shipping" component={Checkout} />
      <Tab.Screen name="confirm" component={Confirm} />
      <Tab.Screen name="payment" component={Payment} />
    </Tab.Navigator>
  );
}

export default function CheckoutNavigator() {
  return <MyTabs />;
}
