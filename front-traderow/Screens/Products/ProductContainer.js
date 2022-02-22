import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Icon } from 'react-native';
import { AntDesign } from '@expo/vector-icons';


import ProductList from './ProductList';
import SearchedProducts from './SearchedProducts';

const data = require('../../assets/data/product.json');

const ProductContainer = () => {
    const [products, setProducts] = useState([]);
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [focus, setFocus] = useState();

    useEffect(() => {
        setProducts(data);
        setProductsFiltered(data);
        setFocus(false);

        return () => {
            setProducts([]);
            setProductsFiltered([]);
            setFocus();
        }
    }, []);

    const searchProduct = (text) => {
        setProductsFiltered(
          products.filter((i) => i.name.toLowerCase()
          .includes(text))
      )
    }

    const openList = () => {
        setFocus(true);
    }

    const onBlur = () => {
        setFocus(false);
    }


    return (
               <View style={styles.container}>
                   <View style={styles.input}>
                   <AntDesign name="search1" size={26} color="black" style={{ paddingLeft: 5 }} />
                   <TextInput 
                   placeholder='Search'
                    style={styles.textInput}
                    onFocus={openList}
                    onChangeText={(text) => searchProduct(text)}
                   />
                   {
                       focus == true ? (
                        <Icon onPress={onBlur} name="ios-close" />
                       ) : null
                   }
                   </View>
                   {
                       focus == true ? (
                           <SearchedProducts 
                           productsFiltered={productsFiltered}
                           />
                       ) : (
                        <View style={styles.listContainer}>
                        <FlatList 
                         data={products}
                         renderItem={({ item }) => <ProductList key={item.brand} item={item}/>}
                         keyExtractor={item => item.brand}
                         numColumns={2}
                         showsVerticalScrollIndicator={false}
                        />
                        </View>
                       )
                   }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexWrap: 'wrap',
        backgroundColor: 'gainsboro',
    },
    input: {
       flexDirection: 'row',
       backgroundColor: 'lightgrey',
       padding: 7,
    },
    textInput: {
     paddingLeft: 8,
     fontSize: 20
    },
    listContainer: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start'
    }
})

export default ProductContainer;