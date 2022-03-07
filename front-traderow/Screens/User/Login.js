import React, { useEffect, useContext, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import FormContainer from "../../Shared/Form/FormContainer";
import Error from "../../Shared/Error";
import Input from "../../Shared/Form/Input";
import EasyButton from "../../Shared/StyledComponents/EasyButton";

// Context
import AuthGlobal from "../../Context/Store/AuthGlobal";
import { loginUser } from "../../Context/Actions/Auth.actions";

const Login = () => {
  const context = useContext(AuthGlobal);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
      props.navigation.navigate("User Profile");
    }
  }, [context.stateUser.isAuthenticated]);

  const handleSubmit = () => {
    let user = {
      email,
      password,
    };

    if (email === "" || password === "") {
      console.log("Please fill in your credentials...😔");
    } else {
      loginUser(user, context.dispatch);
    }
  };

  return (
    <FormContainer title={"Login"}>
      <Input
        placeholder={"Enter email"}
        name={"email"}
        id={"email"}
        value={email}
        onChangeText={(text) => setEmail(text.toLowerCase())}
      />

      <Input
        placeholder={"Enter password"}
        name={"password"}
        id={"password"}
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <View style={styles.buttonGroup}>
        {error ? <Error message={error} /> : null}
        <Button large primary onPress={handleSubmit}>
          <Text style={{ color: "white" }}>Login</Text>
        </Button>
      </View>

      <View style={[{ marginTop: 40 }, styles.buttonGroup]}>
        <Text style={styles.middleText}>Don't have an account yet?</Text>
        <EasyButton
          large
          secondary
          onPress={() => props.navigation.navigate("Register")}
        >
          <Text style={{ color: "white" }}>Register</Text>
        </EasyButton>
      </View>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    width: "80%",
    alignItems: "center",
  },
  middleText: {
    marginBottom: 20,
    alignSelf: "center",
  },
});

export default Login;
