import React from 'react'
import {View, Text, Image, StyleSheet, Button, SafeAreaView} from 'react-native'
import Colors from '../Assets/images/Colors';
import Header from './Header';
export default function Homescreen() {
  return (
    <SafeAreaView style={styles.container}>
        <Header></Header>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    container: {
     backgroundColor: '#000000',
     flex: 1
    }
})