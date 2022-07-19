import React, {useState, useEffect} from 'react'
import { View, Text, StatusBar, ScrollView, ActivityIndicator, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from './styles/constants';
import { Icon,  Button,Image    } from 'react-native-elements';
import { RFPercentage } from "react-native-responsive-fontsize";
import {  widthPercentageToDP, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ipsimponi  } from './setting';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RenderHeader = (props)=>{
  
    return(
        <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0.1, 0.9]}
        colors={[theme.colors.secondary , theme.colors.simandra]}style={{ backgroundColor: theme.colors.primary, height: 60, justifyContent:'center', alignItems:'center', elevation:20 }}>
        <View flex={1} style={{ flexDirection:'row', }}>
        <View flex={1} style={{justifyContent:'center'}}>
            <View style={{ position: 'absolute', left:10}}>

              <Icon name={'arrow-left-circle'} type={'feather'} color={theme.colors.white} onPress={()=>{props.navigation.goBack()}}/>
            </View>
          </View>

          <View style={{flex:10, justifyContent:'center', alignItems:'center'}}>
            <Text style={{fontSize:18, fontFamily:'Poppins-SemiBold', color:'white'}}>Detail Billing</Text>
            </View>
          <View flex={1}>
  
          </View>
          </View>
          </LinearGradient>
    )
}

const ContentScreen = (props)=>{
  console.log('cek billing',props.detailbilling)
  if(props.detailbilling.length > 0){
    if(props.statusFetch){
      return (
        <View style={{marginHorizontal:16, backgroundColor:'white', elevation:3, flex:1,  borderRadius:8, width:'90%', marginBottom:10, marginTop:10}}>
          <View style={{justifyContent:'center', alignItems:'center',flex:1, width:'100%'}}>
            <Text style={{fontSize:RFPercentage(2.6), marginTop:14,color:'black', fontWeight:'bold'}}>Kode Billing</Text>
            <Text style={{padding:4, fontFamily:'Poppins-ExtraBold', fontSize:RFPercentage(3), color:theme.colors.simandra }}>{props.kdbilling}</Text>
          </View> 
          {/* <View style={{flexDirection:'row', paddingHorizontal:16, paddingVertical:8, alignItems:'center', marginTop:10}} >
            <View style={{flexDirection:'row', justifyContent:'space-between', flex:10, }}>
            <View style={{flex:1}}>
            <Text style={{marginLeft:10, fontSize:12 }}>Kode Billing</Text>
            </View>
            <View style={{flex:1, alignItems:'flex-end'}}>
            <Text style={{marginRight:10, fontSize:12,color:'black',fontFamily:'Poppins-Medium'}}>8940***500***224</Text>
            </View>
            </View>
          
          </View> */}
          <View style={{borderTopWidth:0.3, borderTopColor:theme.colors.gray, height:10, marginHorizontal:16}}></View>

          <View style={{flexDirection:'row', paddingHorizontal:16, paddingVertical:8, alignItems:'center'}} >
            <View style={{flexDirection:'row', justifyContent:'space-between', flex:10, }}>
            <View style={{flex:1}}>
            <Text style={{marginLeft:10, fontSize:12 }}>Nama Penyetor</Text>
            </View>
            <View style={{flex:1, alignItems:'flex-end'}}>
            <Text style={{marginRight:10, fontSize:12,color:'black',fontFamily:'Poppins-Medium'}}>{props.detailbilling.NAMA_PENYETOR}</Text>
            </View>
            </View>
          
          </View>
          <View style={{borderTopWidth:0.3, borderTopColor:theme.colors.gray, height:10, marginHorizontal:16}}></View>

          <View style={{flexDirection:'row', paddingHorizontal:16, paddingVertical:8, alignItems:'center', }} >
            <View style={{flexDirection:'row', justifyContent:'space-between', flex:10, }}>
            <View style={{flex:1}}>
            <Text style={{marginLeft:10, fontSize:12}}>Tanggal Billing</Text>
            </View>
            <View style={{flex:1, alignItems:'flex-end'}}>
            <Text style={{marginRight:10, fontSize:12,color:'black',fontFamily:'Poppins-Medium' }}>{props.detailbilling[3]}</Text>
            </View>
            </View>
          
          </View>
          <View style={{borderTopWidth:0.3, borderTopColor:theme.colors.gray, height:10, marginHorizontal:16}}></View>

          <View style={{flexDirection:'row', paddingHorizontal:16, paddingVertical:8, alignItems:'center',}} >
            <View style={{flexDirection:'row', justifyContent:'space-between', flex:10, }}>
            <View style={{flex:1}}>
            <Text style={{marginLeft:10, fontSize:12 }}>NTPN</Text>
            </View>
            <View style={{flex:1, alignItems:'flex-end'}}>
            <Text style={{marginRight:10, fontSize:12,color:'black',fontFamily:'Poppins-Medium'}}>{props.detailbilling[6]}</Text>
            </View>
            </View>
          </View>
          <View style={{borderTopWidth:0.3, borderTopColor:theme.colors.gray, height:10, marginHorizontal:16}}></View>

          <View style={{flexDirection:'row', paddingHorizontal:16, paddingVertical:8, alignItems:'center',}} >
            <View style={{flexDirection:'row', justifyContent:'space-between', flex:10, }}>
            <View style={{flex:1}}>
            <Text style={{marginLeft:10, fontSize:12 }}>Tanggal Bayar</Text>
            </View>
            <View style={{flex:1, alignItems:'flex-end'}}>
            <Text style={{marginRight:10, fontSize:12,color:'black',fontFamily:'Poppins-Medium'}}>{props.detailbilling[4]}</Text>
            </View>
            </View>
          </View>
          <View style={{borderTopWidth:0.3, borderTopColor:theme.colors.gray, height:10, marginHorizontal:16}}></View>

          <View style={{flexDirection:'row', paddingHorizontal:16, paddingVertical:8, alignItems:'center',}} >
            <View style={{flexDirection:'row', justifyContent:'space-between', flex:10, }}>
            <View style={{flex:1}}>
            <Text style={{marginLeft:10, fontSize:12 }}>Tanggal Buku</Text>
            </View>
            <View style={{flex:1, alignItems:'flex-end'}}>
            <Text style={{marginRight:10, fontSize:12,color:'black',fontFamily:'Poppins-Medium'}}>{props.detailbilling[7]}</Text>
            </View>
            </View>
          </View>
          <View style={{borderTopWidth:0.3, borderTopColor:theme.colors.gray, height:10, marginHorizontal:16}}></View>

          <View style={{flexDirection:'row', paddingHorizontal:16, paddingVertical:8, alignItems:'center',}} >
            <View style={{flexDirection:'row', justifyContent:'space-between', flex:10, }}>
            <View style={{flex:1}}>
            <Text style={{marginLeft:10, fontSize:12 }}>Nominal</Text>
            </View>
            <View style={{flex:1, alignItems:'flex-end'}}>
            <Text style={{marginRight:10, fontSize:12,color:'black',fontFamily:'Poppins-Medium'}}>{props.detailbilling[9]} {props.detailbilling[10]}</Text>
            </View>
            </View>
          </View>
          <View style={{borderTopWidth:0.3, borderTopColor:theme.colors.gray, height:10, marginHorizontal:16}}></View>

          <View style={{flexDirection:'row', paddingHorizontal:16, paddingVertical:8, alignItems:'center'}} >
            <View style={{flexDirection:'row', justifyContent:'space-between', flex:10, }}>
            <View style={{flex:1}}>
            <Text style={{marginLeft:10, fontSize:12 }}>Status</Text>
            </View>
            <View style={{flex:1, alignItems:'flex-end'}}>
            <Text style={[{marginRight:10, fontSize:12,fontFamily:'Poppins-Bold'}, props.detailbilling[8]=="Sudah Dibayar"?{color:'green'}:{color:'red'}]}>{props.detailbilling[8]}</Text>
            </View>
            </View>
          
          </View>
          <View style={{borderTopWidth:0.4, borderTopColor:theme.colors.gray2, height:10, marginHorizontal:16,marginBottom:10}}></View>
      </View>
      )
    }else{
      return (
        emptyScreen(props.detailbilling)
      )
    }
  }else{
    return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop:8 }}>
      <ActivityIndicator color={theme.colors.simandra} size="large"/>
      </View>
    )
  }
}

const BackButton = (props)=>{
  return(
    <View style={{alignItems:'center', paddingBottom:5}}>
    <Button title={"Kembali"} 
      raised={true}
      size={12}
      onPress={()=>{props.navigation.goBack()}} 
      icon={
        <Icon
        name={'arrow-left-circle'} type={'feather'} color={theme.colors.simandra} 
        />
      }
      iconLeft={true}
        titleStyle={{ fontWeight: '500', fontSize:12, color:theme.colors.simandra, padding:0, paddingLeft:4 }}
        buttonStyle={{
          backgroundColor:'transparent',
          borderColor: theme.colors.simandra,
          borderWidth: 0.5,
          borderRadius:10,
        
        }}
        containerStyle={{ borderRadius:10,width:widthPercentageToDP('25%'),}}
      />
      </View>
  )
}

const emptyScreen = (detailbilling)=>{
  return(
    <View style={{ flex: 1, backgroundColor:theme.colors.white }}>
      <View style={{width: widthPercentageToDP('100%'),alignItems: 'center', justifyContent: 'center'}}>

        <Image source={require('./images/empty.png')} containerStyle={{height:hp('50%'),width: widthPercentageToDP('100%'), marginTop:10, marginBottom:7}} transition={true} laceholderContent={<ActivityIndicator />}/>
        <Text style={{color:'black',fontSize:RFPercentage(3), fontFamily:'Poppins-SemiBold', marginBottom:20}}>Maaf, {detailbilling}</Text>
      </View>
    </View>
  )

}

export default DetailBilling =({navigation,route})=> {
  
  const { kdbilling } = route.params;
  const [detailbilling, setDetailbilling] = useState([]);
  const [statusFetch, setStatusFetch] = useState('');

  const cariBilling = async(kdbilling)=>{
  try {
    const jsonValue = await AsyncStorage.getItem('@storage_Key')
    const objValue =  await JSON.parse(jsonValue)
    url = ipsimponi+'/apipnbpmobile/dat/trxsimponikdbill'
    let details = {
      'param': kdbilling,
    };
    
  let formBody = [];
  for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  
  fetch(url, {
      method: 'POST',
      headers: 
        {
          'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyaWQiOiI4MTM1OTUyIiwidXNlcm5hbWUiOiJwbmJwbW9iaWxlIiwia2RkZXB0IjoiMDE1Iiwia2R1bml0IjoiMDMiLCJrZHNhdGtlciI6IjYzMDkzMSIsInRpbWVzdGFtcCI6MTY1ODIzNzY5M30.tAgLVeQ18g_eS2jP5qLIkhP4viNLATif4xD0_oXWRb8',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      ,
      body: formBody,
      redirect: 'follow'
  }).then((response) => response.json())
      .then((responseData) => {
        setDetailbilling(responseData);
        // console.log(responseData)
        setStatusFetch(true)
      })
    } catch (error) {
      Alert(error);
    } 
  }

  useEffect(() => {
   
      cariBilling(kdbilling)
   
},[])
   
    return (
      <View style={{flex:1, backgroundColor:'white'}}>
        <StatusBar backgroundColor={theme.colors.simandra} />
        <ScrollView style={{ flex: 1, backgroundColor: 'white',}} showsVerticalScrollIndicator={false}>
          <RenderHeader navigation={navigation}/>   
          <ContentScreen detailbilling={detailbilling} kdbilling={kdbilling} statusFetch={statusFetch}/>
          {detailbilling.length>0 && <BackButton navigation={navigation}/>}
        </ScrollView>
      </View>
    );
}
