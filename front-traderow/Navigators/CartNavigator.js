import { Stack } from "native-base";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createStackNavigator } from "react-navigation/stack";

import Cart from "../Screens/Cart/Cart";
import CheckoutNavigator from "./CheckoutNavigator";

const Tab = createStackNavigator();

function MyStack() {
  return (
    <Tab.Navigaor>
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Checkout"
        component={CheckoutNavigator}
        options={{
          title: "Checkout",
        }}
      />
    </Tab.Navigaor>
  );
}

export default function CartNavigator(){
    return (
        <MyStack />
    )
}

export default CartNavigator;
