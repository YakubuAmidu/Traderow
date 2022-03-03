import React, { Profiler } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Categories from "../Screens/Admin/Categories";
import Orders from "../Screen/Admin/Orders";
import ProductForm from "../Screen/Admin/ProductForm";
import Products from "../Screen/Admin/Product";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="" component={Orders} />
      <Stack.Screen name="" component={ProductForm} />
      <Stack.Screen
        name="Products"
        component={Products}
        options={{ title: "Products" }}
      />
    </Stack.Navigator>
  );
}

export default function AdminNavigator() {
  return <MyStack />;
}
