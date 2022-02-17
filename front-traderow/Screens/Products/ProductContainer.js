import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { NativeBaseProvider, Text, Input, Icon, Header, Item, Container } from 'native-base';

import ProductList from './ProductList';

const data = require('../../assets/data/product.json');

const ProductContainer = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(data);

        return () => {
            setProducts([]);
        }
    }, []);

    return (
        <NativeBaseProvider>
             <View style={styles.container}>
            <Text>ProductContainer</Text>
            <View style={styles.listContainer}>
            <FlatList 
             data={products}
             renderItem={({ item }) => <ProductList key={item.brand} item={item}/>}
             keyExtractor={item => item.brand}
             numColumns={2}
             showsVerticalScrollIndicator={false}
            />
            </View>
        </View>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flexWrap: 'wrap',
        backgroundColor: 'gainsboro',
    },
    listContainer: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start'
    }
})

export default ProductContainer;