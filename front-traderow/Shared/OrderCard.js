import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Picker } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import TrafficLight from "../Shared/StyledComponents/TrafficLight";
import EasyButton from "../Shared/StyledComponents/EasyButton";
import Toast from "react-native-toast-message";

import AsynStorage from "@react-native-community/async-storage";
import baseURL from "../assets/common/baseUrl";
import axios from "axios";

const OrderCard = (props) => {
  return (
    <View>
      <Text>OrderCard</Text>
    </View>
  );
};

export default OrderCard;
