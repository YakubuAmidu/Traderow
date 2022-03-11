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
import { BottomNavigation } from "react-native-paper";

const codes = [
  { name: "Pending", code: "3" },
  { name: "Shipped", code: "2" },
  { name: "Delivered", code: "1" },
];

const OrderCard = (props) => {
  const [orderStatus, setOrderStatus] = useState();
  const [orderStatusText, setOrderStatusText] = useState();
  const [statusChange, setStatusChange] = useState();
  const [token, setToken] = useState();
  const [cardColor, setCardColor] = useState();

  useEffect(() => {
    AsynStorage.getItem("jwt")
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));

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

  const updateOrder = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const order = {
      city: props.city,
      country: props.country,
      dateOrdered: props.dateOrdered,
      id: props.id,
      orderItem: props.orderItem,
      phone: props.phone,
      shippingAddress1: props.shippingAddress1,
      shippingAddress2: props.shippingAddress2,
      status: statusChange,
      totalPrice: props.totalPrice,
      user: props.user,
      zip: props.zip,
    };

    axios
      .put(`${baseURL}orders/${props.id}`, order, config)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show(
            {
              topOffset: 60,
              type: "Success",
              text1: "Order edited",
              text2: "",
            },
            500
          );

          setTimeout(() => {
            props.navigation.navigate("Product");
          });
        }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something went wrong...",
          text2: "Please try again",
        });
      });
  };

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
        <Picker
          mode="dropdown"
          iosIcon={<Icon color={"#00faff"} name="arrow-down" />}
          style={{ width: undefined }}
          selectedValue={statusChange}
          placeholder="Change status"
          placeholderIconColor={{ color: "#007aff" }}
          onValueChange={(x) => setStatusChange(x)}
        >
          {codes.map((c) => {
            return <Picker value={x.code} key={c.name} label={c.name} />;
          })}
        </Picker>

        <EasyButton secondary large onPress={() => updateOrder()}>
          <Text style={{ color: "white" }}>Update</Text>
        </EasyButton>
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
