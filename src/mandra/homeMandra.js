import React, { useState, useEffect, useCallback  } from 'react';
import { Text, View, FlatList, StatusBar, ActivityIndicator, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';
import { Icon, Image  } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RFPercentage } from "react-native-responsive-fontsize";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { theme } from '../styles/constants';
import CheckConnection from '../helper/network';
import { ubahFormatTanggal2, dhm, ubahFormatTanggal } from '../helper/utility';

const Tab = createMaterialTopTabNavigator();

const MyTabs = (props) => {
  return ( 
    <Tab.Navigator style={{marginTop:-65, width:wp('96%'), marginHorizontal:wp('2%'), paddingBottom:8 }} initialRouteName='Proses'  screenOptions={{
      tabBarLabelStyle: { fontSize: 12, fontFamily:'Poppins-Medium' },tabBarStyle:{borderRadius:50, paddingVertical:0}, tabBarIndicatorStyle:{width:wp('39%'), marginLeft:wp('4.5%')}
    }}>
      <Tab.Screen name="Proses" children={()=><DaftarMandra navigation={props.navigation} data={props.dataProses} loading={props.loading} signOut={props.signOut}/>} />
      <Tab.Screen name="Selesai"children={()=><DaftarMandra2 navigation={props.navigation} data={props.dataSelesai} loading={props.loading} signOut={props.signOut}/>}/>
    </Tab.Navigator>
  );
}

const renderHeader =({navigation})=>{
    return(
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0.1, 0.9]}
        colors={[theme.colors.simandra  , theme.colors.secondary]} style={{ backgroundColor: theme.colors.primary, height: 100, marginBottom: 40, paddingTop:20, justifyContent:'center', alignItems:'center' }}>
          <View flex={1} style={{ flexDirection:'row', }}>
          <View flex={1}>
            <View style={{ position: 'absolute', left:10}}>
              <Icon name={'arrow-left-circle'} type={'feather'} color={theme.colors.white} onPress={()=>{navigation.navigate('Home')}}/>
            </View>
          </View>

            <View >
            <Text style={{color:'white',fontSize:RFPercentage(3), fontFamily:'Poppins-SemiBold'}}>SiMandra</Text>
            </View>
          <View flex={1}>
            <View style={{ position: 'absolute', right:10}}>
              {/* <Icon  name='user' type='feather' color={theme.colors.white} onPress={()=>{navigation.navigate('Home')}}/> */}

            </View>
          </View>
          </View>
      </LinearGradient>
    )
}

const emptyScreen = ()=>{
  return(
    <View style={{ flex: 1, backgroundColor:theme.colors.white }}>
      <View style={{width: wp('100%'),alignItems: 'center', justifyContent: 'center'}}>

        <Image source={require('../images/empty.png')} containerStyle={{height:hp('50%'),width: wp('100%'), marginVertical:10}} transition={true} laceholderContent={<ActivityIndicator />}/>
        <Text style={{color:'black',fontSize:RFPercentage(3), fontFamily:'Poppins-SemiBold'}}>Data kosong</Text>
        <Text style={{color:theme.colors.gray3,fontSize:RFPercentage(1.8), fontFamily:'Poppins-regular'}}>Tidak ada data yang tersedia</Text>

      </View>
    </View>
  )

}

const DataScreen = (props)=>{
  selisihHari = dhm(Math.abs(new Date(ubahFormatTanggal(props.item.tanggalKegiatan)) - new Date() ))
  return(
    <View key={props.index} style={{width:wp('96%')}}>
     
        <TouchableOpacity onPress={()=>{props.navigation.navigate('DetailMandra',{data:props.item})}} style={{  marginTop:5, flexDirection:'row', borderLeftWidth:4, borderLeftColor:theme.colors.simandra, borderRadius:10, borderWidth:1, borderTopColor:theme.colors.secondary,borderBottomColor:theme.colors.secondary,borderRightColor:theme.colors.secondary }}>
          <View style={{ padding: 10, flex:10 }}>
          <View style={{flexDirection:'row'}}>
          <Icon name={'calendar'} type={'feather'} size={RFPercentage(2)} color={theme.colors.text}/>
          <Text style={{fontSize: RFPercentage(1.4), marginLeft:2, color:theme.colors.black}}>{ubahFormatTanggal2(props.item.tanggalKegiatan)}</Text>
          </View> 

            <Text style={{fontSize:RFPercentage(1.8), color:theme.colors.simandra, fontFamily: "Poppins-Medium",}}>{props.item.uraianProduk}</Text>
            <View style={{flexDirection:'row', width:wp('70%')}}>
              <Text style={{   fontSize:RFPercentage(1.6), color:theme.colors.black, marginRight:2 }}>{props.item.uraianTahapan}</Text>
              {/* <Badge value={props.item.statusTahapan} status={props.item.statusTahapan=='Selesai' ? 'success' : 'warning' } textStyle={{fontSize:RFPercentage(1.4)}}/>   */}
            </View>
          </View>
          {props.item.uraianTahapan == "Upload ke SIMPONI dan atau SSD" && props.item.statusTahapan =="Selesai" ?
            null
           :
           <View style={{ flex:2, borderLeftWidth:1, borderLeftColor: theme.colors.gray2, marginVertical:6, justifyContent:'center', alignItems:'center' }}>
             <Text style={[{fontSize:RFPercentage(1.8), textAlign:'center', fontWeight:'800' },selisihHari > 15 ? {color:theme.colors.accent} : {color:theme.colors.green}]}>{selisihHari}</Text>
              <Text style={{fontSize:RFPercentage(1.5), color:theme.colors.black, textAlign:'center' }}>Hari Lalu</Text>
             
           </View>
           
           }
        </TouchableOpacity>
      </View> 
  )
}

const DaftarMandra = (props) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:theme.colors.white }}>
      {props.loading ? 
    <View style={{ flex: 1, marginTop:hp('2%')}}>
    <FlatList
          ItemSeparatorComponent={
            Platform.OS !== 'android' &&
            (({ highlighted }) => (
              <View
                style={[
                  highlighted && { marginLeft: 0 }
                ]}
              />
            ))
          }
          data={props.data}
          ListEmptyComponent={()=>{
            return(
              emptyScreen()
            )
          }
          }
          renderItem={({ item, index }) => {
            return(
              <DataScreen item={item} index={index} navigation={props.navigation} />
            )
          }}
        />
         {/* <Button title="Log Out" onPress={()=>{auth().signOut().then(()=> props.signOut, props.navigation.navigate("Home"))}} /> */}
      </View>
      :
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator color={theme.colors.simandra} size="large"/>
      </View>
      }
    </View>
    
  );
}

const DaftarMandra2 = (props) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:theme.colors.white }}>
    {props.loading ? 
  <View style={{ flex: 1, marginTop:hp('2%')}}>
  <FlatList
        ItemSeparatorComponent={
          Platform.OS !== 'android' &&
          (({ highlighted }) => (
            <View
              style={[
                highlighted && { marginLeft: 0 }
              ]}
            />
          ))
        }
        data={props.data}
        ListEmptyComponent={()=>{
          return(
            emptyScreen()
          )
        }
        }
        renderItem={({ item, index }) => {
          return(
            <DataScreen item={item} index={index} navigation={props.navigation} />
          )
        }}
      />
      {/* <View style={[{position:'absolute', bottom :0, right:0 }]}>
        <Button title="Log Out" 
        onPress={()=>{ 
          // console.log(token)
          const user = auth().currentUser;
            firestore().collection('user').doc(user.email.replace('@gmail.com','')).collection('token').doc(token).delete().then(()=>{
              props.signOut
              auth().signOut()
            }).then(()=> props.navigation.navigate("Home"));
          }
        } 
              titleStyle={{ fontWeight: '600', fontSize:RFPercentage(2), color:theme.colors.white }}
                buttonStyle={{
                  backgroundColor:theme.colors.secondary,
                  borderColor: theme.colors.secondary,
                  borderWidth: 1,
                  borderRadius:10
                }}
                containerStyle={{ borderRadius:10}}
          />
        </View> */}
    </View>
    :
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <ActivityIndicator color={theme.colors.simandra} size="large"/>
    </View>
    }
  </View>
    
  );
}

// function hapusTokenNotifikasi ({navigation}){
  
// }

const HomeMandra =({navigation})=> {
  let network = CheckConnection()
  // const [currentnetwork, setCurrentnetwork] = useState(network)
  const [loading, setLoading] = useState(false);
  const [dataProses, setDataProses] = useState([]);
  const [dataSelesai, setDataSelesai] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(()=>{
   
    let isActive = true;
    let datasimpanLokalSelesai = []
    let datasimpanLokalProses = []
      function fetchData(){
      const user = auth().currentUser;
     
        if(user){
          // untuk teknis dan perduktek
          firestore().collection('user').doc(user.email.replace('@gmail.com','')).get().then((datauser)=>{
            if(isActive){
            setUser(datauser.data())
            }
            if(datauser.data().role=='inputer'){
            firestore().collection('peraturan').where("seksiKoor","==", datauser.data().nama).orderBy("tanggalKegiatan", "asc").get()
              .then(querySnapshot => {
                querySnapshot.forEach((documentSnapshot) => {
                  if(documentSnapshot.data().uraianTahapan == "Upload ke SIMPONI dan atau SSD" && documentSnapshot.data().statusTahapan =="Selesai"){
                    let data = Object.assign({id: documentSnapshot.id}, documentSnapshot.data())
                    datasimpanLokalSelesai.push(data)
                  }else{
                    let data = Object.assign({id: documentSnapshot.id}, documentSnapshot.data())
                    datasimpanLokalProses.push(data)
                  } 
                })
              }).then(()=>{
                if(isActive){
                setDataProses(datasimpanLokalProses)
                setDataSelesai(datasimpanLokalSelesai)
                setLoading(true)
                }
              })
            }else if(datauser.data().role=='view'){
              // untuk user view
              firestore().collection('peraturan').orderBy("tanggalKegiatan", "asc").get()
              .then(querySnapshot => {
                querySnapshot.forEach((documentSnapshot) => {
                  if(documentSnapshot.data().uraianTahapan == "Upload ke SIMPONI dan atau SSD" && documentSnapshot.data().statusTahapan =="Selesai"){
                    let data = Object.assign({id: documentSnapshot.id}, documentSnapshot.data())
                    datasimpanLokalSelesai.push(data)
                  }else{
                    let data = Object.assign({id: documentSnapshot.id}, documentSnapshot.data())
                    datasimpanLokalProses.push(data)
                  } 
                })
              }).then(()=>{
                if(isActive){
                setDataProses(datasimpanLokalProses)
                setDataSelesai(datasimpanLokalSelesai)
                setLoading(true)
                }
                
              })
            }else{
              firestore().collection('peraturan').where("idkl","==", datauser.data().kl).orderBy("tanggalKegiatan", "asc").get()
              .then(querySnapshot => {
                querySnapshot.forEach((documentSnapshot) => {
                  if(documentSnapshot.data().uraianTahapan == "Upload ke SIMPONI dan atau SSD" && documentSnapshot.data().statusTahapan =="Selesai"){
                    let data = Object.assign({id: documentSnapshot.id}, documentSnapshot.data())
                    datasimpanLokalSelesai.push(data)
                  }else{
                    let data = Object.assign({id: documentSnapshot.id}, documentSnapshot.data())
                    datasimpanLokalProses.push(data)
                  } 
                })
              }).then(()=>{
                if(isActive){
                setDataProses(datasimpanLokalProses)
                setDataSelesai(datasimpanLokalSelesai)
                setLoading(true)
                }
              })
            } 
          })
            
        }
      }
      if(isActive){
        fetchData()
      }
    return () => {
    
      isActive = false;
    };
     },[])
    
  return (
      <View style={{ flex: 1, backgroundColor:theme.colors.white}}>
        <StatusBar backgroundColor={theme.colors.simandra} />
    
      {renderHeader({navigation})}
     
      <MyTabs navigation={navigation} dataProses={dataProses} loading={loading} dataSelesai={dataSelesai} signOut={()=>{setDataProses([]), setDataSelesai([])}}/>
     
    </View>
  );
}

export default HomeMandra;