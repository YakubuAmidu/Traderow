import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { Item, Picker } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import FormContainer from "../../../Shared/Form/FormContainer";
import Input from "../../../Shared/Form/Input";
import { keyBaordAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { add } from "react-native-reanimated";

const Checkout = (props) => {
  const [orderItems, setOrderItems] = useState();
  const [address, setAddress] = useState();
  const [address2, setAddress2] = useState();
  const [city, setCity] = useState();
  const [country, setCountry] = useState();
  const [zip, setZip] = useState();
  const [phone, setPhone] = useState();

  useEffect(() => {
    setOrderItems(props.cartItems);

    return () => {
      setOrderItems();
    };
  }, []);

  return (
    <keyBaordAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer title={"Shipping address"}>
        <Input
          placeholder={"Phone"}
          name={"Phone"}
          value={phone}
          keyboardType={"numeric"}
          onChangeText={(text) => setPhone(text)}
        />

        <Input
          placeholder={"address"}
          name={"address"}
          value={address}
          onChangeText={(text) => setAddress(text)}
        />

        <Input
          placeholder={"address2"}
          name={"address2"}
          value={address2}
          onChangeText={(text) => setAddress2(text)}
        />
      </FormContainer>

      <Input
        placeholder={"city"}
        name={"city"}
        value={city}
        onChangeText={(text) => setCity(text)}
      />

      <Input
        placeholder={"country"}
        name={"country"}
        value={country}
        onChangeText={(text) => setCountry(text)}
      />

      <Input
        placeholder={"zip"}
        name={"zip"}
        value={zip}
        keyboardType={"numeric"}
        onChangeText={(text) => setZip(text)}
      />
    </keyBaordAwareScrollView>
  );
};

export default Checkout;
