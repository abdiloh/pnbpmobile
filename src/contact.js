import React from 'react'
import { View, Text, StatusBar, ScrollView, TouchableNativeFeedback, Linking } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from './styles/constants';
import { Icon,  ListItem,   } from 'react-native-elements';
import {  TextHeader } from './styles/common'

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
            <Text style={{fontSize:18, fontFamily:'Poppins-SemiBold', color:'white'}}>SAPA Anggaran</Text>
            </View>
          <View flex={1}>
  
          </View>
          </View>
          </LinearGradient>
    )
}

bukaSapa = (url)=>{
  Linking.openURL(url)
  .then((data) => {
    
  })
  .catch(() => {
    alert('Gagal Membuka Link');
  });
}

const ListScreen = () =>{
  return(
  <View style={{paddingBottom:10, alignItems:'center'}}>
    <TextHeader style={{ color: theme.colors.black, fontFamily: 'Poppins-SemiBold', fontSize: 16, padding:16 }}>
    Layanan Contact Center DJA
    </TextHeader>
    <View style={{marginHorizontal:16, backgroundColor:'white', elevation:3, flex:1,  borderRadius:8, width:'90%', marginBottom:10}}>
      <View style={{backgroundColor:'#ebf8ff',borderTopLeftRadius:8,borderTopRightRadius:8, justifyContent:'center'}}>
        <Text style={{paddingHorizontal:16, fontFamily:'Poppins-Medium', color:theme.colors.black, fontSize:14, paddingVertical:6}}>Call Center</Text>
      </View>
      
        <TouchableNativeFeedback onPress={()=>{bukaSapa('tel:14090')}}>
         
        <View style={{flexDirection:'row', paddingHorizontal:16, paddingVertical:8, alignItems:'center', borderBottomLeftRadius:8, borderBottomRightRadius:8}} >
          <Icon name="phone" color={theme.colors.borderFoto}/>
          <View style={{flexDirection:'row', justifyContent:'space-between', flex:10}}>
            <Text style={{marginLeft:10, fontSize:15, color:'black'}}>14090 ext 2</Text>
          
          <ListItem.Chevron />
          </View>
        </View>
       
        </TouchableNativeFeedback>
    </View>

    <View style={{marginHorizontal:16, backgroundColor:'white', elevation:3, flex:1,  borderRadius:8, width:'90%', marginBottom:10}}>
      <View style={{backgroundColor:'#ebf8ff',borderTopLeftRadius:8,borderTopRightRadius:8, justifyContent:'center'}}>
        <Text style={{paddingHorizontal:16, fontFamily:'Poppins-Medium', color:theme.colors.black, fontSize:14, paddingVertical:6}}>Email</Text>
      </View>
      
        <TouchableNativeFeedback onPress={()=>{bukaSapa('mailto:sapa.anggaran@kemenkeu.go.id')}}>
         
        <View style={{flexDirection:'row', paddingHorizontal:16, paddingVertical:8, alignItems:'center', borderBottomLeftRadius:8, borderBottomRightRadius:8}} >
          <Icon name="email" color={theme.colors.borderFoto}/>
          <View style={{flexDirection:'row', justifyContent:'space-between', flex:10}}>
            <Text style={{marginLeft:10, fontSize:15, color:'black'}}>sapa.anggaran@kemenkeu.go.id</Text>
            <ListItem.Chevron />
          </View>
        </View>
       
        </TouchableNativeFeedback>
    </View>

    <View style={{marginHorizontal:16, backgroundColor:'white', elevation:3, flex:1,  borderRadius:8, width:'90%', marginBottom:10}}>
      <View style={{backgroundColor:'#ebf8ff',borderTopLeftRadius:8,borderTopRightRadius:8, justifyContent:'center'}}>
        <Text style={{paddingHorizontal:16, fontFamily:'Poppins-Medium', color:theme.colors.black, fontSize:14, paddingVertical:6}}>Chat WA</Text>
      </View>
      
        <TouchableNativeFeedback onPress={()=>{bukaSapa('whatsapp://send?&phone=628118300931')}}>
         
        <View style={{flexDirection:'row', paddingHorizontal:16, paddingVertical:8, alignItems:'center', borderBottomLeftRadius:8, borderBottomRightRadius:8}} >
        <Icon name='whatsapp' type='font-awesome-5' color={theme.colors.borderFoto}/>
          <View style={{flexDirection:'row', justifyContent:'space-between', flex:10}}>
            <Text style={{marginLeft:10, fontSize:15, color:'black'}}>08118300931</Text>
          
          <ListItem.Chevron />
          </View>
        </View>
       
        </TouchableNativeFeedback>
    </View>

    <View style={{marginHorizontal:16, backgroundColor:'white', elevation:3, flex:1,  borderRadius:8, width:'90%', marginBottom:10}}>
      <View style={{backgroundColor:'#ebf8ff',borderTopLeftRadius:8,borderTopRightRadius:8, justifyContent:'center'}}>
        <Text style={{paddingHorizontal:16, fontFamily:'Poppins-Medium', color:theme.colors.black, fontSize:14, paddingVertical:6}}>Website</Text>
      </View>
      
        <TouchableNativeFeedback onPress={()=>{bukaSapa('https://sapa-anggaran.kemenkeu.go.id')}}>
         
        <View style={{flexDirection:'row', paddingHorizontal:16, paddingVertical:8, alignItems:'center', borderBottomLeftRadius:8, borderBottomRightRadius:8}} >
        <Icon name='globe' type='font-awesome-5' color={theme.colors.borderFoto}/>
          <View style={{flexDirection:'row', justifyContent:'space-between', flex:10}}>
            <Text style={{marginLeft:10, fontSize:15, color:'black'}}>https://sapa-anggaran.kemenkeu.go.id</Text>
          
          <ListItem.Chevron />
          </View>
        </View>
       
        </TouchableNativeFeedback>
    </View>
    
  </View>
  )
}
export default Bantuan =({navigation})=> {
    // console.log(data)
    return (
      <View style={{flex:1, backgroundColor:'white'}}>
        <StatusBar backgroundColor={theme.colors.simandra} />
        <ScrollView style={{ flex: 1, backgroundColor: 'white',}} showsVerticalScrollIndicator={false}>
          <RenderHeader navigation={navigation}/>     
          <ListScreen />
        </ScrollView>
      </View>
    );

    
}