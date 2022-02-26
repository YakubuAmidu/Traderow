import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, ScrollView, Icon, Dimensions } from 'react-native';


import ProductList from './ProductList';
import SearchedProducts from './SearchedProducts';
import Banner from '../../Shared/Banner';
import CategoryFilter from './CategoryFilter';

var { height } = Dimensions.get('window');

const data = require('../../assets/data/product.json');
const productsCategories = require('../../assets/data/categories.json');

const ProductContainer = (props) => {
    const [products, setProducts] = useState([]);
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [focus, setFocus] = useState();
    const [categories, setCategories] = useState([]);
    const [productsCtg, setProductsCtg] = useState([]);
    const [active, setActive] = useState();
    cosnt [initialState, setInitialState] = useState([]);

    useEffect(() => {
        setProducts(data);
        setProductsFiltered(data);
        setFocus(false);
        setCategories(productsCategories);
        setProductsCtg(data);
        setActive(-1);
        setInitialState(data);

        return () => {
            setProducts([]);
            setProductsFiltered([]);
            setFocus();
            setCategories([]);
            setActive();
            setInitialState();
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

    const changeCtg = (ctg) => {
           {
               ctg === 'all' 
               ? [setProductsCtg(initialState), active(true)]
               : [
                   setProductsCtg(
                       products.filter((i) => i.category._id == ctg),
                       setActive(true)
                   )
               ]
           }
    }


    return (
               <View style={styles.searchContainer}>
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
                        {
                            productsCtg.length > 0 ? (
                        <View style={styles.listContainer}>
                        {
                            productsCtg.map((item) => {
                                <ProductList
                                    navigation={props.navigation}
                                   key={item._id}
                                   item={item}
                                />
                            })
                        }
                        </View> 
                            ) : (
                                <View style={[styles.center, { height: height / 2 }]}>
                                       <Text>No products found</Text>
                                    </View>
                            )
                            }
                        </View>
                        </ScrollView>
                       )
                   }
        </View>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
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
        height: height,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default ProductContainer;