import HomeScreen from './homescreen';
import Peraturan from './peraturan';
import detailBuletin from './detailBuletin';
import Buletin from './buletin';
import Mandra from './mandra';
import Signin from './mandra/login';
import detailPeraturan from './detailperaturan';
import webViewScreen from './webview';
import contactScreen from './contact';
import Standar from './standar';
import Data from './data';
import Saran from './saran';
import Faq from './faq';
import Billing from './billing';
import DetailBilling from './detailBilling';
import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';

function SigninNavigasi({ navigation }) {
  return (
    Signin({ navigation })
  );
}

function MandraNavigasi({ navigation }) {
  return (
    Mandra({ navigation })
  );
}

const MandraStack = createNativeStackNavigator();

function HomeMandraScreen({ navigation }) {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <MandraStack.Navigator>
    { !user ? (
      // No token found, user isn't signed in
      <MandraStack.Screen
        name="Signin"
        component={SigninNavigasi}
        options={{
          headerShown: false,
        }}
      />
    ) : (
      // User is signed in
      <MandraStack.Screen name="Mandra" component={MandraNavigasi} options={{headerShown:false }}
      />
    )
    
  }
  </MandraStack.Navigator>
  )
}

const HomeScreenStack = createNativeStackNavigator();

function HomeScreenNavigasi({ navigation }) {
  return (
    HomeScreen({ navigation })
  );
}

function PeraturanNavigasi({ navigation }) {
  return (
    Peraturan({ navigation })
  )
}

function DetailPeraturanNavigasi({ navigation, route }) {
  return (
    detailPeraturan({ navigation, route })
  )
}

function BuletinNavigasi({ navigation }) {
  return (
    Buletin({ navigation })
  );
}

function detailBuletinNavigasi({ navigation, route }) {
  return (
    detailBuletin({ navigation, route })
  );
}

function webViewNavigasi({ navigation, route }) {
  return (
    webViewScreen({ navigation, route })
  );
}

function contactNavigasi({ navigation }) {
  return (
    contactScreen({ navigation })
  );
}

function standarNavigasi({ navigation }) {
  return (
    Standar({ navigation })
  );
}

function DataNavigasi({ navigation }) {
  return (
    Data({ navigation })
  );
}

function SaranNavigasi({ navigation }) {
  return (
    Saran({ navigation })
  );
}

function FaqNavigasi({ navigation }) {
  return (
    Faq({ navigation })
  );
}

function BillingNavigasi({ navigation }) {
  return (
    Billing({ navigation })
  );
}

function DetailBillingNavigasi({ navigation, route }) {
  return (
    DetailBilling({ navigation, route })
  );
}

function DashboardScreen() {
  return (
    <HomeScreenStack.Navigator initialRouteName='Home'>
      <HomeScreenStack.Screen name="Home" component={HomeScreenNavigasi} options={{ headerShown: false, animation:'slide_from_right' }}/>
      <HomeScreenStack.Screen name="Peraturan" component={PeraturanNavigasi} options={{headerShown: false,animation:'slide_from_bottom' }}/>
      <HomeScreenStack.Screen name="DetailPeraturan" component={DetailPeraturanNavigasi} options={{headerShown: false,animation:'slide_from_right', title: 'Peraturan' }}/>
      <HomeScreenStack.Screen name="Buletin" component={BuletinNavigasi} options={{headerShown: false,animation:'slide_from_bottom' }}/>
      <HomeScreenStack.Screen name="DetailBuletin" component={detailBuletinNavigasi}  options={{headerShown: false,animation:'slide_from_right' }}/>
      <HomeScreenStack.Screen name="WebView" component={webViewNavigasi}  options={{headerShown: false,animation:'slide_from_bottom' }}/>
      <HomeScreenStack.Screen name="Mandra" component={MandraNavigasi} options={{headerShown: false,animation:'slide_from_right' }}/>
      <HomeScreenStack.Screen name="Bantuan" component={contactNavigasi} options={{headerShown: false,animation:'slide_from_bottom' }}/>
      <HomeScreenStack.Screen name="Standar" component={standarNavigasi} options={{headerShown: false,animation:'slide_from_bottom' }}/>
      <HomeScreenStack.Screen name="Data" component={DataNavigasi} options={{headerShown: false,animation:'slide_from_bottom' }}/>
      <HomeScreenStack.Screen name="Saran" component={SaranNavigasi} options={{headerShown: false,animation:'slide_from_bottom' }}/>
      <HomeScreenStack.Screen name="Faq" component={FaqNavigasi} options={{headerShown: false,animation:'slide_from_bottom' }}/>
      <HomeScreenStack.Screen name="Billing" component={BillingNavigasi} options={{headerShown: false,animation:'slide_from_bottom' }}/>
      <HomeScreenStack.Screen name="DetailBilling" component={DetailBillingNavigasi} options={{headerShown: false }}/>
    </HomeScreenStack.Navigator>
  );
}


const Stack = createNativeStackNavigator();

function Dashboard() {

  return (
    <Stack.Navigator initialRouteName='Dashboard'>
      <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false, animation:'slide_from_right' }}/>
      <Stack.Screen name="HomeMandra" component={HomeMandraScreen} options={{ headerShown: false,animation:'fade' }}/>
    </Stack.Navigator>
  );
}



export default Dashboard;