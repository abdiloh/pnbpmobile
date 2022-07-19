import React, { useState }  from 'react'
import { View, StyleSheet, TouchableOpacity, Text,StatusBar, ScrollView } from 'react-native';
import { BlockHeader } from '../styles/common'
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '../styles/constants';
import { Icon, Input,Image  } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RFPercentage } from "react-native-responsive-fontsize";

function renderHeader({navigation}){
  const [peraturan, setPeraturan] = useState('');
    return(
        <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0.1, 0.9]}
        colors={[theme.colors.secondary , theme.colors.simandra]}style={{ backgroundColor: theme.colors.primary, height: 120, marginBottom: 40, paddingTop:50, justifyContent:'center', alignItems:'center' }}>
          <View flex={1} style={{ flexDirection:'row', }}>
          <View flex={1}>
            <View style={{ position: 'absolute', left:10}}>

              <Icon name='arrow-left' type='feather' color={theme.colors.white} onPress={()=>{navigation.navigate('Home')}}/>
            </View>
          </View>

            <View >
            <Text style={{fontSize:18, fontFamily:'Poppins-ExtraBold', color:'white'}}>PERATURAN PNBP</Text>
            </View>
          <View flex={1}>
  
          </View>
          </View>

            <BlockHeader card shadow color="white" style={[styles.headerChart, { position: 'absolute', top: 100, left: wp('6%'), width: wp('88%'), height:10 ,borderWidth:1, borderColor:theme.colors.borderFoto}]}>

          <Input 
            underlineColorAndroid={'white'}
              placeholder="Cari Peraturan"
              placeholderTextColor="grey"
              inputContainerStyle={{borderBottomWidth:0, fontSize:12}}
              onChangeText={(text)=>{setPeraturan(text)}}
              rightIcon={
                <Icon
                  name='search'
                  size={24}
                  color='black'
                  onPress={()=>{alert(peraturan)}}
                />
              }
              style={{height:10}}
            />          

          </BlockHeader>
          </LinearGradient>
    )
}

const UU = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'UU No. 9 Tahun 2018',
    about:'Penerimaan Negara Bukan Pajak',
    jenis:'uu',
    link: 'https://firebasestorage.googleapis.com/v0/b/abdiamrulloh1995.appspot.com/o/UU%20No.%209%20Tahun%202018%20Tentang%20Penerimaan%20Negara%20Bukan%20Pajak.pdf?alt=media&token=96aa160c-9901-45c3-a3de-ee1118e5600b'
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'PP No. 20 Tahun 2020',
    about:'Penerimaan Negara Bukan Pajak',
    jenis:'pp',
    link: 'https://firebasestorage.googleapis.com/v0/b/abdiamrulloh1995.appspot.com/o/UU%20No.%209%20Tahun%202018%20Tentang%20Penerimaan%20Negara%20Bukan%20Pajak.pdf?alt=media&token=96aa160c-9901-45c3-a3de-ee1118e5600b'
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'PP No. 20 Tahun 2020',
    about:'Penerimaan Negara Bukan Pajak',
    jenis:'pmk',
    link: 'https://firebasestorage.googleapis.com/v0/b/abdiamrulloh1995.appspot.com/o/UU%20No.%209%20Tahun%202018%20Tentang%20Penerimaan%20Negara%20Bukan%20Pajak.pdf?alt=media&token=96aa160c-9901-45c3-a3de-ee1118e5600b'
  }
];

function klikDetailPeraturan({navigation}, linkperaturan){
  navigation.navigate('DetailPeraturan', {linkperaturan : linkperaturan})
}

const uuScreen = ({navigation}) => {
  return UU.map((data, index)=>{
    const cekPeraturan = data.jenis=='uu'?true:false
    return(
      <View key={index}>
    
      {cekPeraturan?
      <View style={styles.container} >
     
        <TouchableOpacity onPress={()=>{klikDetailPeraturan({navigation},data.link)}} style={{  flexDirection:'row', borderLeftWidth:4, borderLeftColor:theme.colors.secondary, borderRadius:10, borderWidth:1, borderTopColor:theme.colors.gray2,borderBottomColor:theme.colors.gray2,borderRightColor:theme.colors.gray2 }}>
          <View style={{ padding: 10, flex:10 }}>
          <Text style={{ fontSize: RFPercentage(1.6),  color:theme.colors.text }}>{data.title}</Text>
              <Text style={{fontSize:RFPercentage(2), color:theme.colors.secondary, fontFamily: "Poppins-Medium",}}>{data.about}</Text>
          </View>
          <View style={{ flex:2, borderLeftWidth:1, borderLeftColor: theme.colors.gray2, marginVertical:6, justifyContent:'center', alignItems:'center' }}>
          <Image style={{width: wp('10%'), height: hp("5%")}} source={require('../images/pdf.png')} />
            
          </View>
        </TouchableOpacity>
      </View> :
      null
      }
      </View>
    )
  })
}

const ppScreen = () => {
  return UU.map((data, index)=>{
    const cekPeraturan = data.jenis=='pp'?true:false
    return(
      <View key={index} >
          
      {cekPeraturan?

      <View style={styles.container} >
    
        <TouchableOpacity onPress={()=>{klikDetailPeraturan({navigation},data.link)}} style={{  flexDirection:'row', borderLeftWidth:4, borderLeftColor:theme.colors.secondary, borderRadius:10, borderWidth:1, borderTopColor:theme.colors.gray2,borderBottomColor:theme.colors.gray2,borderRightColor:theme.colors.gray2 }}>
          <View style={{ padding: 10, flex:10 }}>
          <Text style={{ fontSize: RFPercentage(1.6),  color:theme.colors.text }}>{data.title}</Text>
              <Text style={{fontSize:RFPercentage(2), color:theme.colors.secondary, fontFamily: "Poppins-Medium",}}>{data.about}</Text>
          </View>
          <View style={{ flex:2, borderLeftWidth:1, borderLeftColor: theme.colors.gray2, marginVertical:6, justifyContent:'center', alignItems:'center' }}>
          <Image style={{width: wp('10%'), height: hp("5%")}} source={require('../images/pdf.png')} />
            
          </View>
        </TouchableOpacity>
      </View> :
      null
      }
      </View>
    )
  })
}

const pmkScreen = () => {
  return UU.map((data, index)=>{
    const cekPeraturan = data.jenis=='pmk'?true:false
    return(
      <View key={index} >
          
      {cekPeraturan?

      <View style={styles.container} >
    
        <TouchableOpacity onPress={()=>{klikDetailPeraturan({navigation},data.link)}} style={{  flexDirection:'row', borderLeftWidth:4, borderLeftColor:theme.colors.secondary, borderRadius:10, borderWidth:1, borderTopColor:theme.colors.gray2,borderBottomColor:theme.colors.gray2,borderRightColor:theme.colors.gray2 }}>
          <View style={{ padding: 10, flex:10 }}>
          <Text style={{ fontSize: RFPercentage(1.6),  color:theme.colors.text }}>{data.title}</Text>
              <Text style={{fontSize:RFPercentage(2), color:theme.colors.secondary, fontFamily: "Poppins-Medium",}}>{data.about}</Text>
          </View>
          <View style={{ flex:2, borderLeftWidth:1, borderLeftColor: theme.colors.gray2, marginVertical:6, justifyContent:'center', alignItems:'center' }}>
          <Image style={{width: wp('10%'), height: hp("5%")}} source={require('../images/pdf.png')} />
            
          </View>
        </TouchableOpacity>
      </View> :
      null
      }
      </View>
    )
  })
}

export default AkunMandra =({navigation})=> {
    return (
        <View style={{ flex: 1 }}>
        <StatusBar translucent backgroundColor="transparent" />
        <ScrollView style={styles.safe} showsVerticalScrollIndicator={false}>
        {renderHeader({navigation})}
        <Text style={styles.sectionHeader}>Undang-Undang</Text>
        {uuScreen({navigation})}
        <Text style={[styles.sectionHeader,{marginTop:15}]}>Peraturan Pemerintah</Text>
        {ppScreen({navigation})}
        <Text style={[styles.sectionHeader,{marginTop:15}]}>Peraturan Menteri Keuangan</Text>
        {pmkScreen({navigation})}
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
        fontFamily:'Poppins-Bold',
        color:'black',
      
      },
});