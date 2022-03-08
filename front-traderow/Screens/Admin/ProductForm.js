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
import * as ImagePicker from "expo-image-picker";

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

  useEffect(() => {
    // Categories
    axios
      .get(`${baseURL}categories`)
      .then((res) => setCategories(res.data))
      .catch((err) => alert("Error to load categoris...🦠"));

    // Image picker
    ((async) => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();

        if (status !== "granted") {
          alert("Sorry, we need camera roll permission to make this work...😉");
        }
      }
    })();

    return () => {
      setCategories([]);
    };
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setMainImage(result.uri);
      setImage(result.uri);
    }
  };

  return (
    <FormContainer title="Add Product">
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: mainImage }} />
        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
          <Icon style={{ color: "white" }} name="camera" />
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

      <View style={styles.label}>
        <Text style={{ textDecoration: "underline" }}>Description</Text>
      </View>
      <Input
        placeholder="Description"
        name="description"
        id="description"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />

      <Item picker>
        <Picker
          mode="dropdown"
          iosIcon={<Icon color="#007aff" name="arrow-down" />}
          placeholder="Select your category"
          selectValue={pickerValue}
          placeholderStyle={{ color: "#007aff" }}
          placeholderIconColor="#00faff"
          onValueChange={(e) => [setPickerValue(e), setCategory(e)]}
          style={{ width: undefined }}
        >
          {categories.map((c) => {
            return <Picker.Item key={c.id} label={c.name} value={c.id} />;
          })}
        </Picker>
      </Item>
      {err ? <Error message={err} /> : null}
      <View style={style.buttonContainer}>
        <EasyButton large primary>
          <Text style={styles.buttonText}>Confirm</Text>
        </EasyButton>
      </View>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  label: {
    width: "80%",
    marginTop: 10,
  },
  buttonContainer: {
    width: "80%",
    marginBottom: 80,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderStyle: "solid",
    borderWidth: 8,
    padding: 0,
    justifyContent: "center",
    borderRadius: 100,
    borderColor: "#e0e0e0",
    elevation: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  imagePicker: {
    position: "absolute",
    right: 5,
    bottom: 5,
    backgroundColor: "grey",
    padding: 8,
    borderRadius: 100,
    elevation: 20,
  },
});

export default ProductsForm;
