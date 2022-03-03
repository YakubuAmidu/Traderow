import React, { useState, useEffect, useContext, useCallback } from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { Container } from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import AsynStorage from "@react-native-community/async-storage";

import axios from "axios";
import { baseURL } from "../../assets/common/baseUrl";

import AuthGlobal from "../../Context/Store/AuthGlobal";
import { logoutUser } from "../../Context/Actions/Auth.actions";

const UserProfile = () => {
  const context = useContext(AuthGlobal);
  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    if (
      context.stateUser.isAuthenticated === false ||
      context.stateUser.isAuthenticated === null
    ) {
      props.navigation.navigate("Login");
    }

    AsynStorage.getItem("jwt")
      .then((res) => {
        axios
          .get(`${baseURL}users/${context.stateUser.user.sub}`, {
            headers: { Authorizatin: `Bearer ${res}` },
          })
          .then((user) => setUserProfile(user.data));
      })
      .catch((err) => console.log(err));

    return () => {
      setUserProfile();
    };
  }, [context.stateUser.isAuthenticated]);

  return (
    <Container style={styles.container}>
      <ScrollView contentContainerStyle={styles.subContainer}>
        <Text style={{ fontSize: 30 }}>
          {userProfile ? userProfile.name : ""}
        </Text>
        <View style={{ marginTop: 20 }}>
          <Text style={{ margin: 10 }}>
            Email: {userProfile ? userProfile.email : ""}
          </Text>
          <Text style={{ margin: 10 }}>
            Phone: {userProfile ? userProfile.phone : ""}
          </Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <Button
            title={"Sign out"}
            onPress={() => {
              AsynStorage.removeItem("jwt"), logoutUser(context.dispatch);
            }}
          />
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  subContainer: {
    alignItems: "center",
    marginTop: 60,
  },
});

export default UserProfile;
