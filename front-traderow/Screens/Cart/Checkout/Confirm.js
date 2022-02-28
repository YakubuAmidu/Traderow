import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimension,
  Button,
  ScrollView,
} from "react-native";
import { Text, Left, Right, ListItem, Body, Thumbnail } from "native-base";

import { connect } from "react-redux";
import * as actions from "../../../Redux/Actions/CartActions";

var { height, width } = Dimension.get("window");

const confirmOrder = () => {
  setTimeout(() => {
    props.clearCart();
    props.navigation.navigate("Cart");
  }, 5000);
};

const Confirm = (props) => {
  const confirm = props.route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Confirm order</Text>

        {props.route.params ? (
          <View style={{ borderWidth: 1, borderColor: "orange" }}>
            <Text style={styles.title}>Shipping to:</Text>
            <View style={{ padding: 8 }}>
              <Text>Address: {confirm.order.order.shippingaddress1}</Text>
              <Text>Address2: {confirm.order.order.shipppingaddress2}</Text>
              <Text>City: {confirm.order.order.city}</Text>
              <Text>Zip: {confirm.order.order.zip}</Text>
              <Text>Country: {confirm.order.order.country}</Text>
            </View>
            <Text style={styles.title}>Items:</Text>
            {confirm.order.order.orderItems.map((x) => {
              <ListItem style={styles.listItem} key={x.product.name} avatar>
                <Left>
                  <Thumbnail source={{ uri: x.product.image }} />
                </Left>
                <Body style={styles.body}>
                  <Left>
                    <Text>{x.product.name}</Text>
                  </Left>
                  <Right>
                    <Text>$ {x.product.price}</Text>
                  </Right>
                </Body>
              </ListItem>;
            })}
          </View>
        ) : null}

        <View style={{ alignItems: "center", margin: 20 }}>
          <Button title={"Place order"} onPress={confirmOrder} />
        </View>
      </View>
    </ScrollView>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
  };
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
  title: {
    alignSelf: "center",
    margin: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  listItem: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    width: width / 1.2,
  },
  body: {
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default connect(null, mapDispatchToProps)(Confirm);
