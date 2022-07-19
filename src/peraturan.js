import React, { useState, useEffect }  from 'react'
import { View, StyleSheet, TouchableOpacity, Text,StatusBar, ScrollView, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from './styles/constants';
import { ipserver } from './setting';
import { Icon,Image  } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RFPercentage } from "react-native-responsive-fontsize";

function renderHeader({navigation}){
    return(
        <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0.1, 0.9]}
        colors={[theme.colors.secondary , theme.colors.simandra]}style={{ backgroundColor: theme.colors.primary, height: 60, justifyContent:'center', alignItems:'center',elevation:20}}>
          <View flex={1} style={{ flexDirection:'row', }}>
          <View flex={1} style={{justifyContent:'center'}}>
            <View style={{ position: 'absolute', left:10}}>

              <Icon name={'arrow-left-circle'} type={'feather'} color={theme.colors.white} onPress={()=>{navigation.navigate('Home')}}/>
            </View>
          </View>

          <View style={{flex:10, justifyContent:'center', alignItems:'center'}}>
            <Text style={{fontSize:18, fontFamily:'Poppins-SemiBold', color:'white'}}>Peraturan PNBP</Text>
            </View>
          <View flex={1}>
  
          </View>
          </View>
          </LinearGradient>
    )
}

function klikDetailPeraturan({navigation}, data){
  navigation.navigate('DetailPeraturan', {linkperaturan : data.link, tentang: data.tentang, judul:data.hal, jenis: data.jenis })
}

const uuScreen = ({navigation}, peraturan) => {
  return peraturan.map((data, index)=>{
    const cekPeraturan = data.jenis=='uu'?true:false
    return(
      <View key={index}>
    
      {cekPeraturan?
      <View style={styles.container} >
     
        <TouchableOpacity onPress={()=>{klikDetailPeraturan({navigation},data)}} style={{  flexDirection:'row',  backgroundColor:'white', elevation:3, borderRadius:10, borderWidth:1, borderColor:theme.colors.gray2 }}>
          <View style={{ padding: 10, flex:10 }}>
          <Text style={{ fontSize: RFPercentage(1.6),  color:theme.colors.text }}>{data.hal}</Text>
              <Text style={{fontSize:RFPercentage(1.8), color:theme.colors.secondary, fontFamily: "Poppins-Medium",}}>{data.tentang}</Text>
          </View>
          <View style={{ flex:2, borderLeftWidth:1, borderLeftColor: theme.colors.gray2, marginVertical:6, justifyContent:'center', alignItems:'center' }}>
          <Image style={{width: wp('10%'), height: hp("5%")}} source={require('./images/pdf.png')} />
            
          </View>
        </TouchableOpacity>
      </View> :
      null
      }
      </View>
    )
  })
}

const ppScreen = ({navigation}, peraturan) => {
  return peraturan.map((data, index)=>{
    const cekPeraturan = data.jenis=='pp'?true:false
    return(
      <View key={index} >
          
      {cekPeraturan?

      <View style={styles.container} >
    
    <TouchableOpacity onPress={()=>{klikDetailPeraturan({navigation},data)}} style={{  flexDirection:'row',  backgroundColor:'white', elevation:3, borderRadius:10, borderWidth:1, borderColor:theme.colors.gray2}}>
          <View style={{ padding: 10, flex:10 }}>
          <Text style={{ fontSize: RFPercentage(1.6),  color:theme.colors.text }}>{data.hal}</Text>
          <Text style={{fontSize:RFPercentage(1.8), color:theme.colors.secondary, fontFamily: "Poppins-Medium",}}>{data.tentang}</Text>
          </View>
          <View style={{ flex:2, borderLeftWidth:1, borderLeftColor: theme.colors.gray2, marginVertical:6, justifyContent:'center', alignItems:'center' }}>
          <Image style={{width: wp('10%'), height: hp("5%")}} source={require('./images/pdf.png')} />
            
          </View>
        </TouchableOpacity>
      </View> :
      null
      }
      </View>
    )
  })
}

const pmkScreen = ({navigation}, peraturan) => {
  return peraturan.map((data, index)=>{
    const cekPeraturan = data.jenis=='pmk'?true:false
    return(
      <View key={index} >
          
      {cekPeraturan?

      <View style={styles.container} >
    
    <TouchableOpacity onPress={()=>{klikDetailPeraturan({navigation},data)}} style={{  flexDirection:'row', backgroundColor:'white', elevation:3, borderRadius:10, borderWidth:1, borderColor:theme.colors.gray2}}>
          <View style={{ padding: 10, flex:10 }}>
          <Text style={{ fontSize: RFPercentage(1.6),  color:theme.colors.text }}>{data.hal}</Text>
          <Text style={{fontSize:RFPercentage(1.8), color:theme.colors.secondary, fontFamily: "Poppins-Medium",}}>{data.tentang}</Text>
          </View>
          <View style={{ flex:2, borderLeftWidth:1, borderLeftColor: theme.colors.gray2, marginVertical:6, justifyContent:'center', alignItems:'center' }}>
          <Image style={{width: wp('10%'), height: hp("5%")}} source={require('./images/pdf.png')} />
            
          </View>
        </TouchableOpacity>
      </View> :
      null
      }
      </View>
    )
  })
}

export default Peraturan =({navigation})=> {
  const [peraturan, setPeraturan]= useState([])
  const [loading, setLoading] = useState(true);

  const fetchPeraturan = async () => {

    try {
     const response = await fetch(ipserver+'/getmenuPNBP/PnBpKael/pNbPKael.com*5/peraturan');
     const json = await response.json();
      // console.log(json)
      setPeraturan(json.response)
      setLoading(false)
    } catch (error) {
      alert(error);
      setLoading(false)
    } 
 }
  useEffect(() => {
    fetchPeraturan()
  },[])

  
    return (
        <View style={{ flex: 1 }}>
        <StatusBar backgroundColor={theme.colors.simandra} />
        <ScrollView style={styles.safe} showsVerticalScrollIndicator={false}>
        {renderHeader({navigation})}
        {
        loading ?  
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop:8 }}>
        <ActivityIndicator color={theme.colors.simandra} size="large"/>
        </View>
        : 
        <>
        <Text style={[styles.sectionHeader, {marginTop:10}]}>Undang-Undang</Text>
        {uuScreen({navigation},peraturan)}
        <Text style={[styles.sectionHeader,{marginTop:10}]}>Peraturan Pemerintah</Text>
        {ppScreen({navigation},peraturan)}
        <Text style={[styles.sectionHeader,{marginTop:10}]}>Peraturan Menteri Keuangan</Text>
        <View style={{paddingBottom:5}}>
        {pmkScreen({navigation},peraturan)}
        </View>
        </>
        } 
        </ScrollView>
      </View>
    );
  
    
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: 'white',
      },
      container: {
        flex: 1,
        marginHorizontal: 16,
        marginTop:10
       
      },

      title: {
        fontSize: 32,
      },
      headerChart: {
        paddingTop: 20,
        paddingBottom: 20,
        zIndex: 1
      },
      sectionHeader: {
        paddingTop: 4,
        paddingLeft: 16,
        fontSize: 14,
        fontFamily:'Poppins-Medium',
        color:'black',
      
      },
});