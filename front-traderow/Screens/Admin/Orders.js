import React, { useState, useCallback } from "react";
import { FlatList, View, Text } from "react-native";
import baseURL from "../../assets/common/baseUrl";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

import OrderCard from "../../Shared/OrderCard";

const Orders = (props) => {
  const [orderListis, setOrderList] = useState();

  useFocusEffect(
    useCallback(() => {
      getOrders();

      return () => {
        setOrderList();
      };
    }, [])
  );

  const getOrders = () => {
    axios
      .get(`${baseURL}orders`)
      .then((x) => setOrderList(x.data))
      .catch((err) => console.log(err));
  };

  return (
    <View>
      <FlatList
        data={orderListis}
        renderItem={({ item }) => {
          <OrderCard navigation={props.navigation} {...item} />;
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Orders;
