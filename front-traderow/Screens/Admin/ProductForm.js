import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Item, Picker } from "native-base";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import Error from "../../Shared/Error";
import Icon from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";
import AsyncStorage from "react-native-community/async-storage";
import baseURL from "../../assets/common/baseUrl";
import axios from "axios";

const ProductsForm = (props) => {
  const [pickerValue, setPickerValue] = useState();
  const [brand, setBrand] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [mainImage, setMainImage] = useState();
  const [category, setCategory] = useState();
  const [categories, setCategories] = useState([]);
  const [token, setToken] = useState();
  const [error, setError] = useState();
  const [countInStock, SetCountInStock] = useState();
  const [rating, setRating] = useState();
  const [isFeatured, setIsFeatured] = useState(false);

  return (
    <FormContainer title="Add Product">
      <View>
        <Image source={{ uri: mainImage }} />
        <TouchableOpacity>
          <Text>Image</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.label}>
        <Text style={{ textDecoration: "underline" }}>Brand</Text>
      </View>
      <Input
        placeholder="Brand"
        id="brand"
        value={brand}
        name="brand"
        onChangeText={(text) => setBrand(text)}
      />

      <View style={styles.label}>
        <Text style={{ textDecoration: "underline" }}>Name</Text>
      </View>
      <Input
        placeholder="Name"
        id="name"
        name="name"
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <View style={styles.label}>
        <Text style={{ textDecoration: "underline" }}>Price</Text>
      </View>
      <Input
        placeholder="Price"
        name="price"
        id="price"
        keyboardType={"numeric"}
        value={price}
        onChangeText={(text) => setPrice(text)}
      />

      <View style={styles.label}>
        <Text style={{ textDecoration: "underline" }}>Count in stock</Text>
      </View>
      <Input
        placeholder="Stock"
        id="stock"
        name="stock"
        keyboardType={"numeric"}
        value={countInStock}
        onChangeText={(text) => SetCountInStock(text)}
      />
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  label: {
    width: "80%",
    marginTop: 10,
  },
});

export default ProductsForm;
