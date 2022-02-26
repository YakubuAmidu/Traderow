import React from "react";
import { Text, View, ScrollView, Dimensions, StyleSheet } from "react-native";

var { width } = Dimension.get("window");

const FormContainer = (props) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      {props.children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 400,
    width: width,
    justifyContent: "center",
    alignContent: "center",
  },
  title: {
    fontSize: 30,
  },
});

export default FormContainer;
