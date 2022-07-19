import React, {useState} from 'react';
import {View, ActivityIndicator, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from './styles/constants';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Icon  } from 'react-native-elements';
import { RFPercentage } from "react-native-responsive-fontsize";
import { WebView } from 'react-native-webview';

const RenderHeader = (props)=>{
    return(
        <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0.1, 0.9]}
        colors={[theme.colors.secondary , theme.colors.simandra]}style={{ backgroundColor: theme.colors.primary, height: 60, justifyContent:'center', alignItems:'center',elevation:20}}>
          <View flex={1} style={{ flexDirection:'row', }}>
          <View flex={2} style={{justifyContent:'center'}}>
            <View style={{ position: 'absolute', left:10}}>
  
              <Icon name={'arrow-left-circle'} type={'feather'} color={theme.colors.white} onPress={()=>{props.navigation.goBack()}}/>
            </View>
          </View>
  
            <View style={{flex:10, justifyContent:'center'}}>
            <Text style={{fontSize:RFPercentage(2), fontFamily:'Poppins-SemiBold', color:'white', textAlign:'left'}}>{props.judul}</Text>
            </View>
         
          </View>
          </LinearGradient>
    )
  }

 export default WebViewScreen = ({ navigation, route })=>{
    const [loading, setLoading] = useState(true);
    const { link, judul } = route.params;

    return (
    <View style={{flex:1}}>
        <RenderHeader judul={judul} navigation={navigation}/>
        <WebView 
        onLoad={()=>{setLoading(false)}}
        source={{ uri: link }} 
        
        />
        {loading && ( 
        <ActivityIndicator
          style={{ position: "absolute", top: hp('54.55%'), left: wp('45.3%') }}
          size="large"
          color={theme.colors.simandra}
        />)}
    </View>
    )
}