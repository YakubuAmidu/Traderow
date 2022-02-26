import React, { useContext } from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Icon } from "react-native-vector-icons/FontAwesome";
import { View } from "react-native";

// Stacks
import HomeNavigator from "./HomeNavigator";
import CartNavigator from "./CartNavigator";

import CartIcon from "../Shared/CartIcon";

const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        keyBoardHidesTabBar: true,
        showLabel: false,
        activeTintColor: "#e91e63",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarOptions: ({ color }) => {
            <Icon
              name="home"
              style={{ position: "relative" }}
              size={30}
              color={color}
            />;
          },
        }}
      />

      <Tab.Screen
        name="Cart"
        component={CartNavigator}
        options={{
          tabBarOptions: ({ color }) => {
            <View>
              <Icon name="shopping-cart" size={30} color={color} />
              <CartIcon />
            </View>;
          },
        }}
      />

      <Tab.Screen
        name="Admin"
        component={HomeNavigator}
        options={{
          tabBarOptions: ({ color }) => {
            <Icon name="cog" size={30} color={color} />;
          },
        }}
      />

      <Tab.Screen
        name="User"
        component={HomeNavigator}
        options={{
          tabBarOptions: ({ color }) => {
            <Icon name="user" size={30} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;
