import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Content, Left, ListItem, Thumbnail, Text, Body } from 'native-base';

const { width } = Dimensions.get('window');

const SearchedProducts = (props) => {
    const { productsFiltered } = props;
    return (
        <Content style={{ width: width }}>
            {
                productsFiltered.length > 0 ? (
                  productsFiltered.map((item) => (
                    <ListItem key={item._id} avatar>
                      <Left>
                          <Thumbnail 
                          sourct={{ uri: item.image ? item.image :  "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png" }}
                          />
                      </Left>
                      <Body>
                        <Text>{item.name}</Text>
                        <Text>{item.description}</Text>
                      </Body>
                    </ListItem>
                  )) 
                ) : (
                    <View style={styles.center}>
                     <Text style={{ alignSelf: 'center' }}> No product match this criteria!😔 </Text>
                    </View>
                ) 
            }
        </Content>
    );
};

const styles = StyleSheet.create({
    center: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default SearchedProducts;