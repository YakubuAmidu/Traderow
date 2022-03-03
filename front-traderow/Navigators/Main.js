import React, { useContext } from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Icon } from "react-native-vector-icons/FontAwesome";
import { View } from "react-native";

// Stacks
import HomeNavigator from "./HomeNavigator";
import CartNavigator from "./CartNavigator";
import UserNavigator from "./UserNavigator";
import AdminNavigator from "./AdminNavigator";

import CartIcon from "../Shared/CartIcon";
import AuthGlobal from "../Context/Store/AuthGlobal";

const Tab = createBottomTabNavigator();

const Main = () => {
  const context = useContext(AuthGlobal);

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

      {context.stateUser.user.isAdmin === true ? (
        <Tab.Screen
          name="Admin"
          component={AdminNavigator}
          options={{
            tabBarOptions: ({ color }) => {
              <Icon name="cog" size={30} color={color} />;
            },
          }}
        />
      ) : null}

      <Tab.Screen
        name="User"
        component={UserNavigator}
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
