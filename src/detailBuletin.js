import React, {useState} from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import Pdf from 'react-native-pdf';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from './styles/constants';
import { Icon  } from 'react-native-elements';
import { RFPercentage } from "react-native-responsive-fontsize";

const RenderHeader = (props)=>{
    return(
        <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0.1, 0.9]}
        colors={[theme.colors.secondary , theme.colors.simandra]}style={{ backgroundColor: theme.colors.primary, height: 60, justifyContent:'center', alignItems:'center', elevation:20 }}>
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

export default detailBuletin =({ navigation, route })=> {
    const [loading, setLoading] = useState(true);
    const { linkbuletin, judul } = route.params;
    const source = { uri : linkbuletin} 
        return (
            
            <View style={styles.container}>
                <RenderHeader navigation={navigation} judul={judul}/>
               
                <Pdf
                    source={source}
                    onLoadProgress={(persen) => {
                        if(persen>0.65){
                        setLoading(false)
                    }
                    }}
                    cache={true}   
                    expiration={6000}
                    cacheFileName={source}
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
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    }
});