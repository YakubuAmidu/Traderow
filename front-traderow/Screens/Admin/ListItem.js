import React, { useState } from "react";
import {
  Button,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableHightlight,
  Dimensions,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const { width, height } = Dimensions.get("window");

const ListItem = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View>
          <View>
            <TouchableHightlight
              underLayColor="#e8e8e8"
              onPress={() => setModalVisible(false)}
              style={{
                alignSelf: "flex-end",
                position: "absolute",
                top: 5,
                right: 10,
              }}
            >
              <Icon name="close" size={20} />
            </TouchableHightlight>

            <Button
              title="Edit"
              onPress={() => [
                props.navigation.navigate("ProductForm"),
                setModalVisible(false),
              ]}
            />

            <Button
              title="Delete"
              // Some event
            />
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        // onPress
        style={[
          styles.container,
          {
            backgroundColor: props.index % 2 == 0 ? "white" : "gainsboro",
          },
        ]}
      >
        <Image
          source={{
            uri: props.image
              ? props.image
              : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
          }}
          resizeMode="contain"
          style={styles.image}
        />

        <Text style={styles.item}>{props.brand}</Text>
        <Text style={styles.item} numberOfLines={1} ellipsizeMode="tail">
          {props.name}
        </Text>
        <Text style={styles.item} numberOfLines={1} ellipsizeMode="tail">
          {props.category.name}
        </Text>
        <Text style={styles.item}>$ {props.price}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 5,
    width: width,
  },
  image: {
    borderRadius: 50,
    width: width / 6,
    height: 20,
    margin: 20,
  },
  item: {
    flexWrap: "wrap",
    margin: 3,
    width: width / 6,
  },
});

export default ListItem;
