import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Toast from "react-native-toast-message";
import { keyBoardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import Error from "../../Shared/Error";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, SetName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [phone, setPhone] = useState("");

  const register = () => {
    if (email === "" || password === "" || name === "" || phone === "") {
      setError("Please fill the form correctly...😔");
    }

    let user = {
      name: name,
      email: email,
      password: password,
      phone: phone,
      isAdmin: false,
    };

    axios
      .post(`${baseURL}users/register`, user)
      .then((res) => {
        if (res.status == 200) {
          //Toast
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Registration succeeded",
            text2: "Please login into your account...",
          });
          setTimeout(() => {
            props.navigation.navigate("Login");
          }, 500);
        }
      })
      .catch((err) => {
        //Error
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something went wrong...",
          text2: "Please try again...",
        });
      });
  };

  return (
    <keyBoardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer title={"Register"}>
        <Input
          placeholder={"Email"}
          name={"email"}
          id={"email"}
          value={email}
          onChangeText={(text) => setEmail(text.toLowerCawe())}
        />

        <Input
          placeholder={"Name"}
          name={"name"}
          id={"name"}
          value={name}
          onChangeText={(text) => SetName(text)}
        />

        <Input
          placeholder={"Phone"}
          name={"phone"}
          id={"phone"}
          keyboardType={"numeric"}
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />

        <Input
          placeholder={"password"}
          name={"password"}
          id={"password"}
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <View style={styles.buttonGroup}>
          {error ? <Error message={error} /> : null}
        </View>
        <View>
          <EasyButton large primary onPress={() => register()}>
            <Text style={{ color: "white" }}>Register</Text>
          </EasyButton>
        </View>

        <View>
          <EasyButton
            large
            secondary
            onPress={() => props.navigation.navigate("Login")}
          >
            <Text style={{ color: "white" }}>Back to login</Text>
          </EasyButton>
        </View>
      </FormContainer>
    </keyBoardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    width: "80%",
    margin: 10,
    alignItems: "center",
  },
});

export default Register;
