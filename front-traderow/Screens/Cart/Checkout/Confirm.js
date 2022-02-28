import React from "react";
import { Text, View, StyleSheet, Dimension, ScrollView } from "react-native";
import { Text, Left, Right, ListItem, Body, Thumbnail } from "native-base";

import { connect } from "react-redux";
import * as actions from "../../../Redux/Actions/CartActions";

var { height } = Dimension.get("window");

const Confirm = (props) => {
  const confirm = props.route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Confirm order</Text>

        {props.route.params ? (
          <View style={{ borderWidth: 1, borderColor: "orange" }}>
            <Text style={styles.shipping}>Shipping to:</Text>
            <View style={{ padding: 8 }}>
              <Text>Address: {confirm.order.order.shippingaddress1}</Text>
              <Text>Address2: {confirm.order.order.shipppingaddress2}</Text>
              <Text>City: {confirm.order.order.city}</Text>
              <Text>Zip: {confirm.order.order.zip}</Text>
              <Text>Country: {confirm.order.order.country}</Text>
            </View>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height,
    padding: 8,
    alignContent: "center",
    backgroundColor: "white",
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  shipping: {
    alignSelf: "center",
    margin: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Confirm;
