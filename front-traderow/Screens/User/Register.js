import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import { keyBoardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Error from "../../Shared/Error";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, SetName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [phone, setPhone] = useState("");

  const register = () => {
    if (email === "" || password === "" || name === "" || phone === "") {
      setError("Please fill the form correctly...😔");
    } else {
      console.log("Success...☺️");
    }
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
          <Button title={"Register"} onPress={() => register()} />
        </View>

        <View>
          <Button
            title={"Back to login"}
            onPress={() => props.navigation.navigate("Login")}
          />
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
