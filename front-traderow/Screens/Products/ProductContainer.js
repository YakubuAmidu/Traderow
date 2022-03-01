import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  ScrollView,
  Icon,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useFocusEffect } from "react-navigation/native";
import baseURL from "../../assets/common/baseUrl";
import axios from "axios";

import ProductList from "./ProductList";
import SearchedProducts from "./SearchedProducts";
import Banner from "../../Shared/Banner";
import CategoryFilter from "./CategoryFilter";

var { height } = Dimensions.get("window");

const ProductContainer = (props) => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [categories, setCategories] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [active, setActive] = useState();
  cosnt[(initialState, setInitialState)] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      // Product API
      axios
        .get(`${baseURL}products`)
        .then((res) => {
          setProducts(res.data);
          setProductsFiltered(res.data);
          setProductsCtg(res.data);
          initialState(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log("API Error...😔");
          console.error(err.message);
        });

      // Categories API
      axios
        .get(`${baseURL}categories`)
        .then((res) => {
          setCategories(res.data);
        })
        .catch((err) => {
          console.log("API Error...😔");
          console.error(err.message);
        });
      return () => {
        setProducts([]);
        setProductsFiltered([]);
        setFocus();
        setCategories([]);
        setActive();
        setInitialState();
      };
    }, [])
  );

  const searchProduct = (text) => {
    setProductsFiltered(
      products.filter((i) => i.name.toLowerCase().includes(text))
    );
  };

  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  const changeCtg = (ctg) => {
    {
      ctg === "all"
        ? [setProductsCtg(initialState), active(true)]
        : [
            setProductsCtg(
              products.filter((i) => i.category._id === ctg),
              setActive(true)
            ),
          ];
    }
  };

  return (
    <>
      {loading == false ? (
        <View style={styles.searchContainer}>
          <View style={styles.input}>
            <AntDesign
              name="search1"
              size={26}
              color="black"
              style={{ paddingLeft: 5 }}
            />
            <TextInput
              placeholder="Search"
              style={styles.textInput}
              onFocus={openList}
              onChangeText={(text) => searchProduct(text)}
            />
            {focus == true ? <Icon onPress={onBlur} name="ios-close" /> : null}
          </View>
          {focus == true ? (
            <SearchedProducts
              navigation={props.navigation}
              productsFiltered={productsFiltered}
            />
          ) : (
            <ScrollView>
              <View>
                <View>
                  <Banner />
                </View>
                <View>
                  <CategoryFilter
                    categories={categories}
                    CategoryFilter={changeCtg}
                    productsCtg={productsCtg}
                    active={active}
                    setActive={setActive}
                  />
                </View>
                {productsCtg.length > 0 ? (
                  <View style={styles.listContainer}>
                    {productsCtg.map((item) => {
                      <ProductList
                        navigation={props.navigation}
                        key={item._id}
                        item={item}
                      />;
                    })}
                  </View>
                ) : (
                  <View style={[styles.center, { height: height / 2 }]}>
                    <Text>No products found</Text>
                  </View>
                )}
              </View>
            </ScrollView>
          )}
        </View>
      ) : (
        // Loading
        <View style={[styles.center, { backgroundColor: "f2f2f2" }]}>
          <ActivityIndicator size="large" color="red" />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  input: {
    flexDirection: "row",
    backgroundColor: "lightgrey",
    padding: 7,
  },
  textInput: {
    paddingLeft: 8,
    fontSize: 20,
  },
  listContainer: {
    height: height,
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProductContainer;
