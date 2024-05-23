import React from 'react'
import {View, Text, Image, StyleSheet, Button, SafeAreaView} from 'react-native'
import Colors from '../Assets/images/Colors';
export default function Login() {
  return (
    <SafeAreaView>
      <Image source={require('./../Assets/images/loginscrn.jpg')} style={{width:'auto', height:500, margin:0, padding:0}} />
      <View style={styles.container}>
        <Text style={styles.logintext}>Login to your TeachTap Account</Text>
        <Text style={{margin:20,fontSize:20, textAlign:'center'}}>Login/Signup</Text>
      </View>
      <View>
      
        <Text style={styles.button}>
        <Image source={require('./../Assets/images/download.png')} style={{width:20, height:20, margin:0, marginRight:25}} /> 
            Sign In with Google
        </Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{paddingTop:40,
        marginTop:-40,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        backgroundColor: '#ffffff'
    },
    logintext:{
        fontSize:30,
        textAlign:'center',
        fontWeight:'bold'
    },
    button:{
        backgroundColor:Colors.primary,
        padding:10,
        margin:15,
        alignSelf: 'center',
        display: 'flex',
        flexDirection:'row',
        fontSize:20,
        color: '#ffffff',
        textAlign: 'center',
        width: 300,
        alignContent: 'center',
        padding: 10,
        borderRadius: 10
    }
})