import 'react-native-gesture-handler';
import React from 'react';

import{
  View,
  Text,
  SafeAreaView
} from 'react-native';
import Login from './App/Pages/Login';
import Homescreen from './App/Pages/Homescreen';
import quesData from './App/Pages/quizData';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import QuesData from './App/Pages/quizData';

const Stack = createStackNavigator();
function App(){
  return(
  <SafeAreaView>
    <View>
    <QuesData/>
     {/*   <Homescreen/>
     <Text>teachtap</Text> 
     <NavigationContainer>
      <Stack.Navigator initialRouteName="ForYou">
        <Stack.Screen name="ForYou" component={ForYouScreen} options={{ title: 'For You' }} />
      </Stack.Navigator>
    </NavigationContainer>
  <Login/>*/}
      
    </View>
  </SafeAreaView>)
}

export default App;