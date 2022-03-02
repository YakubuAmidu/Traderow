import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  Button,
} from "react-native";
import { Container, H1, Left, Right } from "native-base";

const SingleProduct = (props) => {
  const [item, setItem] = useState(props.route.params.item);
  const [availability, setAvailability] = useState("");

  return (
    <Container style={styles.container}>
      <ScrollView style={{ marginBottom: 80, padding: 5 }}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: item.image
                ? item.image
                : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
            }}
            resizeMode="contain"
            style={styles.image}
          />
        </View>

        <View style={styles.contentContainer}>
          <H1 style={styles.contentHeader}>{item.name}</H1>
          <Text style={styles.contentText}>{item.brand}</Text>
        </View>
        {/* TODO: description richdescription and availability */}
      </ScrollView>

      <View style={styles.bottomContainer}>
        <Left style={styles.price}>$ {item.price}</Left>
        <Right>
          <Button
            title="Add"
            onPress={() => {
              props.addItemToCart(item),
                Toast.show({
                  topOffset: 60,
                  type: "success",
                  text1: `${item.name} added to cart...👍`,
                  text2: "Go to your cart to complete your order...👍",
                });
            }}
          />
        </Right>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%",
  },
  imageContainer: {
    backgroundColor: "white",
    padding: 0,
    margin: 0,
  },
  image: {
    width: "100%",
    height: 250,
  },
  contentContainer: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  contentHeader: {
    fontWeight: "bold",
    marginBottom: 20,
  },
  contentText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  bottomContainer: {
    flexDirection: "row",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#fff",
  },
  price: {
    fontSize: 20,
    margin: 20,
    color: "red",
  },
});

export default SingleProduct;
