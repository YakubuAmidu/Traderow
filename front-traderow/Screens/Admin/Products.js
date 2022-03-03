import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Header, Icon, Input } from "native-base";
import { useFocusEffect } from "@react-navigation/native";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import AsyncStorage from "@react-native-community/async-storage";

var { height, width } = Dimensions.get("window");

const Products = (propw) => {
  return (
    <View>
      <Text>Products Screen</Text>
    </View>
  );
};

export default Products;
