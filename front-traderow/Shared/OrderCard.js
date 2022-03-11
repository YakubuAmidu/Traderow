import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Picker } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import TrafficLight from "../Shared/StyledComponents/TrafficLight";
import EasyButton from "../Shared/StyledComponents/EasyButton";
import Toast from "react-native-toast-message";

import AsynStorage from "@react-native-community/async-storage";
import baseURL from "../assets/common/baseUrl";
import axios from "axios";
import {
  setStatusBarNetworkActivityIndicatorVisible,
  setStatusBarTranslucent,
} from "expo-status-bar";

const OrderCard = (props) => {
  const [orderStatus, setOrderStatus] = useState();
  const [orderStatusText, setOrderStatusText] = useState();
  const [statusChange, setStatusChange] = useState();
  const [token, setToken] = useState();
  const [cardColor, setCardColor] = useState();

  useEffect(() => {
    if (props.status == "3") {
      setOrderStatus(<TrafficLight unavailable></TrafficLight>);
      setOrderStatusText("Pending");
      setCardColor("#E74C3C");
    } else if (props.status == "2") {
      setOrderStatus(<TrafficLight limited></TrafficLight>);
      setOrderStatusText("Shipped");
      setCardColor("#F1C40F");
    } else {
      setOrderStatus(<TrafficLight available></TrafficLight>);
      setOrderStatusText("Delivered");
      setCardColor("#2ECC7");
    }

    return () => {
      setOrderStatus();
      setOrderStatusText();
      setCardColor();
    };
  }, []);

  return (
    <View style={[{ backgroundColor: cardColor }, styles.container]}>
      <View style={styles.container}>
        <Text>Order Number: #{props.id}</Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <Text>
          Status: {statusText} {orderStatus}
        </Text>
        <Text>
          Address: {props.shippingAddress1} {props.shippingAddress2}
        </Text>
        <Text>City: {props.city}</Text>
        <Text>Country: {props.country}</Text>
        <Text>Date ordered: {props.dateOrdered.split("T")[0]}</Text>
        <View style={styles.priceContainer}>
          <Text>Price:</Text>
          <Text style={styles.price}>$ {props.totalPrice}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  title: {
    backgroundColor: "#62b1f6",
    padding: 5,
  },
  priceContainer: {
    marginTop: 10,
    alignSelf: "flex-end",
    flexDirection: "row",
  },
  price: {
    color: "white",
    fontWeight: "bold",
  },
});

export default OrderCard;
