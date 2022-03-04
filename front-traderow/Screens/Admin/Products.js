import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Header, Icon, Input } from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import ListItem from "./ListItem";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

var { height, width } = Dimensions.get("window");

const ListHeader = () => {
  return (
    <View elevation={1} style={styles.listHeader}>
      <View style={styles.headerItem}></View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "600" }}>Brand</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "600" }}>Name</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "600" }}>Category</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "600" }}>Price</Text>
      </View>
    </View>
  );
};

const Products = (props) => {
  const [productList, setProductList] = useState();
  const [productFilter, setProductFilter] = useState();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();

  useFocusEffect(() => {
    //Get Token
    AsyncStorage.getItem("jwt")
      .then((res) => setToken(res))
      .catch((err) => console.log(err));

    axios.get(`${baseURL}products`).then((res) => {
      setProductList(res.data);
      setProductFilter(res.data);
      setLoading(false);
    });

    return () => {
      setProductList();
      setProductFilter();
      setLoading(true);
    };
  }, []);

  const searchProduct = (text) => {
    if (text == "") {
      setProductFilter(productList);
    } else {
      setProductFilter(
        productList.filter((i) => {
          i.name.toLowerCase().includes(text.toLowerCase());
        })
      );
    }
  };

  return (
    <View>
      <View>
        <Header searchBar rounded>
          <Item style={{ padding: 5 }}>
            <Icon name="search" />
            <Input
              placeholder="Search"
              onChangeText={(text) => searchProduct(text)}
            />
          </Item>
        </Header>
      </View>

      {loading ? (
        <View style={styles.spinner}>
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : (
        <FlatList
          data={productFilter}
          ListHeaderComponent={ListHeader}
          renderItem={({ item, index }) => (
            <ListItem {...item} navigation={props.navigation} index={index} />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listHeader: {
    flexDirection: "row",
    padding: 5,
    backgroundColor: "gainsboro",
  },
  headerItem: {
    margin: 3,
    width: width / 6,
  },
  spinner: {
    height: height / 2,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Products;
