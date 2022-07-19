import React, {useState} from 'react';
import { StyleSheet, Dimensions, View, ActivityIndicator, Text } from 'react-native';
import Pdf from 'react-native-pdf';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from './styles/constants';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Icon  } from 'react-native-elements';
import { RFPercentage } from "react-native-responsive-fontsize";

const RenderHeader = (props)=>{
  const tentang = props.tentang.length < 40? props.tentang.slice(0,40) : props.tentang.slice(0,40) + '...'
  const judul = props.jenis =='pnbpkl' ? false : true 
    return(
        <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0.1, 0.9]}
        colors={[theme.colors.secondary , theme.colors.simandra]}style={{ backgroundColor: theme.colors.primary, height: 60, justifyContent:'center', alignItems:'center',elevation:20 }}>
          <View flex={1} style={{ flexDirection:'row', }}>
          <View flex={2} style={{justifyContent:'center'}}>
            <View style={{ position: 'absolute', left:10}}>
  
              <Icon name={'arrow-left-circle'} type={'feather'} color={theme.colors.white} onPress={()=>{props.navigation.goBack()}}/>
            </View>
          </View>
  
            <View style={{flex:10, justifyContent:'center'}}>
           { judul ? 
              <>
             <Text style={{fontSize:RFPercentage(2), fontFamily:'Poppins-SemiBold', color:'white', textAlign:'left'}}>{props.judul}</Text>
              <Text style={{fontSize:RFPercentage(1.6), fontFamily:'Poppins-Reguler', color:'white'}}>{tentang}</Text>
              </>
            :
            <Text style={{fontSize:RFPercentage(2), fontFamily:'Poppins-SemiBold', color:'white', textAlign:'left'}}>{tentang}</Text>
            }
            </View>
         
          </View>
          </LinearGradient>
    )
  }

export default detailPeraturan =({ navigation, route })=> {
    const { linkperaturan, judul,tentang, jenis } = route.params;
    const source = { uri : linkperaturan} 
        return (
            
            <View style={styles.container}>
                <RenderHeader navigation={navigation} judul={judul} tentang={tentang} jenis={jenis}/>
                
                <Pdf
                    source={source}
                    renderActivityIndicator={()=>{
                      return(
                        <ActivityIndicator
                        
                          size="large"
                          color={theme.colors.simandra}
                        /> 
                      )
                    }}
                    fitWidth={true}
                    cache={true}   
                    style={styles.pdf}/>
                     
            </View>
        )
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',       
    },
    pdf: {
        flex:1,
        width:wp('100%'),
        height:hp('100%')
    }
});