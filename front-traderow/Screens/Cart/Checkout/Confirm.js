import React from "react";
import { Text, View, StyleSheet, Dimension, ScrollView } from "react-native";
import { Text, Left, Right, ListItem, Body, Thumbnail } from "native-base";

import { connect } from "react-redux";
import * as actions from "../../../Redux/Actions/CartActions";

var { height } = Dimension.get("window");

const Confirm = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Confirm order</Text>
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
});

export default Confirm;
