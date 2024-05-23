import React from 'react'
import {View, Text, Image, StyleSheet, Button, SafeAreaView} from 'react-native'
import Colors from '../Assets/images/Colors';

export default function Header() {
  return (
    <View style={{}}>
      <Image source={require('./../Assets/images/Teach.png')} style={styles.logo} alt='TeachTap'/> 
    </View>
  )
}


const styles = StyleSheet.create({
      logo: {
        width:100,
        height:20, 
        display:'flex',
        paddingTop:20
    }
})