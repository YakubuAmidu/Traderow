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
  const [productList, setProductList] = useState();
  const [productFilter, setProductFilter] = useState();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();

  useFocusEffect(() => {
    //Get Token
    AsyncStorage.getItem("jwt")
      .then((res) => setToken(res))
      .catch((err) => console.log(err));

    axios.get(`${baseURL}products`).then((res) => {
      setProductList(res.data);
      setProductFilter(res.data);
      setLoading(false);
    });

    return () => {
      setProductList();
      setProductFilter();
      setLoading(true);
    };
  }, []);

  return (
    <View>
      <Text>Products Screen</Text>
    </View>
  );
};

export default Products;
