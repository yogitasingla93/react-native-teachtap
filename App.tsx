import 'react-native-gesture-handler';
import React from 'react';

import{
  View,
  Text,
  SafeAreaView
} from 'react-native';
import Login from './App/Pages/Login';
import Homescreen from './App/Pages/Homescreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ForYouScreen from './App/Pages/ForYouScreen';

const Stack = createStackNavigator();
function App(){
  return(<SafeAreaView>
    <View>
      <Homescreen/>
     <Text>teachtap</Text> 
     <NavigationContainer>
      <Stack.Navigator initialRouteName="ForYou">
        <Stack.Screen name="ForYou" component={ForYouScreen} options={{ title: 'For You' }} />
      </Stack.Navigator>
    </NavigationContainer>
      <Login/>
      
    </View>
  </SafeAreaView>)
}

export default App;