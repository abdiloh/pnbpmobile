import React, { useState, useEffect }  from 'react'
import { View, StyleSheet, ActivityIndicator, Text,StatusBar, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '../styles/constants';
import { Icon, Badge  } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RFPercentage } from "react-native-responsive-fontsize";
import { ubahFormatTanggal2, dhm, ubahFormatTanggal } from '../helper/utility';
import CheckConnection from '../helper/network';

const RenderHeader = (props)=>{
  
    return(
        <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0.1, 0.9]}
        colors={[theme.colors.secondary , theme.colors.simandra]}style={{ backgroundColor: theme.colors.primary, height: 60, justifyContent:'center', alignItems:'center',elevation:20  }}>
          <View flex={1} style={{ flexDirection:'row', }}>
          <View flex={1} style={{justifyContent:'center'}}>
            <View style={{ position: 'absolute', left:10}}>

              <Icon name={'arrow-left-circle'} type={'feather'} color={theme.colors.white} onPress={()=>{props.navigation.goBack()}}/>
            </View>
          </View>

          <View style={{flex:10, justifyContent:'center', alignItems:'center'}}>
            <Text style={{fontSize:18, fontFamily:'Poppins-SemiBold', color:'white'}}>Detail</Text>
            </View>
          <View flex={1}>
  
          </View>
          </View>
          </LinearGradient>
    )
}

function seksiKoor (seksiKoor){
  let seksi = seksiKoor.slice(-1)
  switch(seksi){
    case "1":
      seksi = 'A'
    break;
    case "2":
      seksi = 'B'
    break;
    case "3":
      seksi = 'C'
    break;
    case "4":
      seksi = 'D'
    break;
  }
  return seksiKoor.slice(0, -2) + seksi
}


const UtamaScreen = (props)=>{
  

  return (
    <View style={{position:'relative', marginHorizontal:5, marginVertical:5, borderColor:theme.colors.simandra, borderWidth:1, borderRadius:6}}>

      <View style={{padding:10}}>
        <Text style={{fontFamily:'Poppins-Medium', fontSize:RFPercentage(2), color:theme.colors.simandra}}>{props.data.kl}</Text>
        <Text style={{fontFamily:'Poppins-Medium', fontSize:RFPercentage(1.7),color:theme.colors.black}}>{props.data.uraianProduk}</Text>
        <View style={{flexDirection:'row'}}>
          <Icon name={'user-check'} type='feather' size={RFPercentage(1.6)} />
          <Text style={{fontFamily:'Poppins-Regular', fontSize:RFPercentage(1.4),color:theme.colors.black, marginHorizontal:5}}>{props.data.subditKoor}</Text>
          <Icon name={'arrow-right-circle'} type='feather' size={RFPercentage(1.6)} />
          <Text style={{fontFamily:'Poppins-Regular', fontSize:RFPercentage(1.4),color:theme.colors.black, marginHorizontal:5}}>{seksiKoor(props.data.seksiKoor)}</Text>
        </View>
      </View>
    </View>
  )
}

const TahapanScreen = (props) => {
  idPeraturan = props.data.id
  let network = CheckConnection()
  // const [currentnetwork, setCurrentnetwork] = useState(network)
  const [loading, setLoading] = useState(false);
  const [dataTahapan, setdataTahapan] = useState([]);


  useEffect(()=>{
    let datasimpanLokalTahapan = []
    function fetchData(){
     
      firestore().collection('peraturan').doc(idPeraturan).collection('tahapan').orderBy("tanggalKegiatan", "desc").get()
      .then(querySnapshot => {
        querySnapshot.forEach((documentSnapshot) => {
        
            let data = Object.assign({id: documentSnapshot.id}, documentSnapshot.data())
            datasimpanLokalTahapan.push(data)
          
        })
      }).then(()=>{
        setdataTahapan(datasimpanLokalTahapan)
        setLoading(true)
        
      })
    }   
    if(!loading){
      fetchData()
    }  
     },[network])

if(loading==false){
  return(
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <ActivityIndicator color={theme.colors.simandra} size="large"/>
  </View>
  )
}

return dataTahapan.map((data, index)=>{
  //  console.log(data)

  noDokumen = data.noDokumen==undefined?" - ":data.noDokumen==""?" - ":data.noDokumen
  tanggalDokumen = data.tanggalDokumen==undefined?"":data.tanggalDokumen==""?"":ubahFormatTanggal2(data.tanggalDokumen)
  tanggalDokumen2 = data.tanggalDokumen==undefined?"":data.tanggalDokumen==""?"":ubahFormatTanggal(data.tanggalDokumen)
  urlDokumen = data.urlDokumen==undefined?"#":data.urlDokumen==""?"#":data.urlDokumen
  kendala = data.kendala==undefined?"Tidak Ada":data.kendala==""?"Tidak Ada":data.kendala
  link = data.urlDokumen==undefined?"":"_blank"

  return(
      <View key={index}>
      <View style={styles.container} >
        <View style={{ justifyContent:'center', marginLeft:-5, marginRight:5, width: undefined }}>
          <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                locations={[0.1, 0.9]}
                colors={[theme.colors.simandra, theme.colors.secondary ]}
                style={{ paddingHorizontal: 4, paddingVertical: 4, borderRadius: 4, alignSelf: 'stretch' }}
              >
          <Text style={{ fontSize: 9,  color:theme.colors.white, textAlign:'center' }}>{ubahFormatTanggal2(data.tanggalKegiatan)}</Text>
          </LinearGradient>
        </View>
        <View style={{  flexDirection:'row',flex:6, borderRadius:10, borderWidth:0.5, borderColor:theme.colors.gray3}}>
          <View style={{ padding: 10, flex:10 }}>
          <View style={{flexDirection:'row', justifyContent:'space-between', }}>
            <View style={{flex:6}}>
              <Text style={{fontSize:RFPercentage(1.7), color:theme.colors.secondary, fontFamily: "Poppins-Medium",}}>{data.uraianTahapan}</Text>
            </View>
              <Badge value={data.statusTahapan} status={data.statusTahapan=='Selesai' ? 'success' : 'warning' } textStyle={{fontSize:RFPercentage(1.4)}}/>  
            
          </View>
          <View>
           
              <Text style={{ fontSize: 10,  color:'black', marginRight:2, fontWeight:'600' }}>Kegiatan :</Text>
         
          
              <Text style={{ fontSize: 10,  color:theme.colors.black, textAlign:'justify'}}>{data.kegiatan}</Text>
          
          </View>
          <View >
         
              <Text style={{ fontSize: 10,  color:'black', marginRight:2, fontWeight:'600'}}>Kendala  :</Text>
          
         
              <Text style={{ fontSize: 10,  color:theme.colors.black, textAlign:'justify' }}>{kendala}</Text>
           
          </View>
          </View>
        </View>
      </View> 
    </View>
    )
  })
}


const IsiDetail = (props)=>{

  return(

        <ScrollView style={[{borderTopLeftRadius:20, borderTopRightRadius:20, width:wp('100%'), backgroundColor:'white',flex: 1,backgroundColor: 'white', paddingBottom:10}]} showsVerticalScrollIndicator={false}>
          <View style={{flex:1, flexDirection:'column', justifyContent:'flex-start', marginTop:5}}>
          <UtamaScreen data={props.data}/>
          <Text style={{padding:10, fontSize:RFPercentage(2), fontFamily:'Poppins-Medium', color:theme.colors.black}}>
            Detail Tahapan
          </Text>
          <TahapanScreen data={props.data}/>        
        </View>   
      </ScrollView>
  )
}

export default DetailMandra =({navigation, route})=> {
    const { data } = route.params;
    // console.log(data)
    return (
        <View style={{flex:1}}>
        <StatusBar backgroundColor={theme.colors.simandra} />
       
        <RenderHeader navigation={navigation}/> 
     
        <IsiDetail data={data}/>
    
   
      </View>
    );

    
}

const styles = StyleSheet.create({

      container: {
      
        marginHorizontal: 16,
        marginBottom:10,
       flexDirection:'row',
       justifyContent:'space-between'
       
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