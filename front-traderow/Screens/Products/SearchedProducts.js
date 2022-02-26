
import React from 'react';
import { View, StyleSheet, Dimensions} from 'react-native'
import { Content, Left, Body, ListItem, Thumbnail, Text } from 'native-base';

var { width } = Dimensions.get("window")

const SearchedProduct = (props) => {
    const { productsFiltered } = props;
    return(
        <Content style={{ width: width }}>
            {productsFiltered.length > 0 ? (
                productsFiltered.map((item) => (
                    <ListItem
                        onPress={() => {
                            props.navigation.navigate("Product Detail", {item: item})
                        }}
                        key={item._id.$oid}
                        avatar
                    >
                        <Left>
                            <Thumbnail 
                                source={{uri: item.image ? 
                                    item.image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'
                                        }}
                            />
                        </Left>
                        <Body>
                            <Text>{item.name}</Text>
                            <Text note>{item.description}</Text>
                        </Body>
                    </ListItem>
                ))
            ) : (
                <View style={styles.center}>
                    <Text style={{ alignSelf:  'center' }}>
                        No products match the selected criteria
                    </Text>
                </View>
            )}
        </Content>
    );
};

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100
    }
})

export default SearchedProduct;








// import React from 'react';
// import { View, StyleSheet, Dimensions } from 'react-native';
// import { Content, Left, ListItem, Thumbnail, Text, Body } from 'native-base';

// const { width } = Dimensions.get('window');

// const SearchedProducts = (props) => {
//     const { productsFiltered } = props;
//     return (
//         <Content style={{ width: width }}>
//             {
//                 productsFiltered.length > 0 ? (
//                   productsFiltered.map((item) => (
//                     <ListItem key={item._id} avatar>
//                       <Left>
//                           <Thumbnail 
//                           sourct={{ uri: item.image ? item.image :  "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png" }}
//                           />
//                       </Left>
//                       <Body>
//                         <Text>{item.name}</Text>
//                         <Text>{item.description}</Text>
//                       </Body>
//                     </ListItem>
//                   )) 
//                 ) : (
//                     <View style={styles.center}>
//                      <Text style={{ alignSelf: 'center' }}> No product match this criteria!😔 </Text>
//                     </View>
//                 ) 
//             }
//         </Content>
//     );
// };

// const styles = StyleSheet.create({
//     center: {
//         alignItems: 'center',
//         justifyContent: 'center'
//     }
// })

// export default SearchedProducts;