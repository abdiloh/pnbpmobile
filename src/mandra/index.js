import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import detailMandra from './detailMandra';
import akunMandra from './akunMandra';
import HomeMandra from './homeMandra'

function detailMandraNavigasi({ navigation, route }) {
  return (
    detailMandra({ navigation, route })
  );
}

function akunMandraNavigasi({ navigation }) {
  return (
    akunMandra({ navigation })
  );
}

function HomeMandraNavigasi({ navigation }) {
  return (
    HomeMandra({ navigation })
  );
}

const Stack = createNativeStackNavigator();

export default function Mandra() {
  return (
 
      <Stack.Navigator initialRouteName='HomeMandra'>
        <Stack.Screen name="HomeMandra" component={HomeMandraNavigasi} options={{headerShown:false}}/>
        <Stack.Screen name="DetailMandra" component={detailMandraNavigasi} options={{headerShown:false}}/>
        <Stack.Screen name="AkunMandra" component={akunMandraNavigasi} options={{headerShown:false}}/>
      </Stack.Navigator>
   
  );
}
