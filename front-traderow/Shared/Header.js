import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native';

const Header = () => {
    return (
        <SafeAreaView style={styles.header}>
            <Image 
             source={require('../assets/Logo.png')}
             resizeMode="contain"
             style={{ height: 50 }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
 header: {
     width: '100%',
     flexDirection: 'row',
     alignContent: 'center',
     justifyContent: 'center',
     padding: 20,
     marginTop: 10,
     marginBottom: 10
 }
});

export default Header;