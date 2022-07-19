import React, { useState,useEffect }  from 'react'
import { View, StyleSheet, TouchableOpacity, Text, ScrollView,Image, TouchableNativeFeedback, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from './styles/constants';
import { Icon, Button  } from 'react-native-elements';
import { ipserver } from './setting';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RFPercentage } from "react-native-responsive-fontsize";
import ReactNativeBlobUtil from 'react-native-blob-util';
import Modal from "react-native-modal";

const RenderHeader = ({navigation})=>{
  
  return(
      <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      locations={[0.1, 0.9]}
      colors={[theme.colors.secondary , theme.colors.simandra]}style={{ backgroundColor: theme.colors.primary, height: 60, justifyContent:'center', alignItems:'center', elevation:20 }}>
      <View flex={1} style={{ flexDirection:'row', }}>
        <View flex={1} style={{justifyContent:'center'}}>
          <View style={{ position: 'absolute', left:10}}>

            <Icon name={'arrow-left-circle'} type={'feather'} color={theme.colors.white} onPress={()=>{navigation.goBack()}}/>
          </View>
        </View>

        <View style={{flex:10, justifyContent:'center', alignItems:'center'}}>
          <Text style={{fontSize:18, fontFamily:'Poppins-SemiBold', color:'white'}}>Buletin Inti</Text>
          </View>
        <View flex={1}>

        </View>
        </View>
        </LinearGradient>
  )
}

async function simpanBuletin({navigation, id, linkbuletin, judul, modalBuka, modalTutup, persen}){
 
  const adaFilenya = await ReactNativeBlobUtil.fs.exists( `file:///data/user/0/com.simandra/files/${id}.pdf`)
  if(adaFilenya){
     navigation.navigate('DetailBuletin', {linkbuletin :`file:///data/user/0/com.simandra/files/${id}.pdf`, judul:judul })
  }else{
    modalBuka()
    let dirs = ReactNativeBlobUtil.fs.dirs
      ReactNativeBlobUtil.config({
        fileCache : true,
        // response data will be saved to this path if it has access right.
        path : dirs.DocumentDir + '/' + id +'.pdf',
        
      }).fetch('GET', linkbuletin)
        .progress({ count : 1 }, (received, total) => {
         
          let percentage = Math.floor((received/total) * 100);
          persen(percentage)
         
      }).then((res) => {
        modalTutup()
        // the path should be dirs.DocumentDir + 'path-to-file.anything'
        navigation.navigate('DetailBuletin', {linkbuletin :`file:///data/user/0/com.simandra/files/${id}.pdf`, judul:judul })
      })
      .catch((err) => {
        alert('err')
      })
  }
}

function hapusBuletin(id, judul){
  ReactNativeBlobUtil.fs.unlink(`/data/user/0/com.simandra/files/${id}.pdf`).then(() => {
    alert('Berhasil Hapus ' + judul)
  }).catch((err)=>{
    alert('File sudah dihapus')
  })
}

const Buletin = (props)=>{
  const [daftarBuletin, setDaftarBuletin] = useState([]);
  const [cek, setCek] = useState(true)
  const [loading, setLoading] = useState(true)

  const fetchBuletin = async () => {
    try {
     const response = await fetch(ipserver+'/getmenuPNBP/PnBpKael/pNbPKael.com*5/buletininti');
     const json = await response.json();
     let newArr = [...json.response];
     json.response.forEach( async (data, index)=>{
   
        const adaFilenya = await ReactNativeBlobUtil.fs.exists( `file:///data/user/0/com.simandra/files/${data.id}.pdf`)
          
        newArr[index] = { ...newArr[index], cekFile:adaFilenya}
        setDaftarBuletin(newArr)
        if(index==newArr.length-1){
          setCek(false)
          setLoading(false)
        }
      })
    } catch (error) {
      alert(error);
      setLoading(false)
    } 
 }

  useEffect(()=>{
    fetchBuletin()
  },[])

    if(loading){
      return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop:8 }}>
        <ActivityIndicator color={theme.colors.simandra} size="large"/>
        </View>
      )
    }else{ 
      let jumlahloop = Math.floor(daftarBuletin.length /2) + (daftarBuletin.length %2 )
      let tampilanbuletin = []
      for(let i = 0; i < jumlahloop; i++){
        tampilanbuletin.push(
          <View style={{flexDirection:'row', justifyContent:'space-around', marginBottom:20}} key = {i}> 
            <View style={{height:350,width:wp("40%"),borderRadius: 10}}>
              <Image source={{uri: (daftarBuletin[2*i].gambar)}} style={{ height:250, borderRadius: 10, width:'100%' }} resizeMode={'cover'}/>
              <View style={{ backgroundColor: theme.colors.black, height: 250, width: '100%', borderRadius: 6, position: 'absolute', opacity: 0.1 }}></View>
              <Text style={{fontSize:RFPercentage(2), fontFamily:'Poppins-SemiBold',  textAlign:'center', color:theme.colors.black,marginTop:7}}>{daftarBuletin[2*i].judul}</Text>
              <View style={[{ width: "100%", justifyContent:"center", flexDirection:'row', marginTop:2,  }]}>
              <Button title={daftarBuletin[2*i].cekFile?'Baca':'Simpan'} onPress={()=>{simpanBuletin({navigation:props.navigation,id:daftarBuletin[2*i].id,linkbuletin:daftarBuletin[2*i].link, judul:daftarBuletin[2*i].judul, modalBuka:props.modalBuka, modalTutup:props.modalTutup, persen:props.persen})}}  raised={true}
                    titleStyle={{ fontWeight: '500', fontSize:RFPercentage(1.6), color:theme.colors.secondary }}
                    buttonStyle={{
                      backgroundColor:'transparent',
                      borderColor: theme.colors.secondary,
                      borderWidth: 1,
                      borderRadius:10
                    }}
                    containerStyle={{ borderRadius:10,marginRight:10}}
                    />
                <Button title="Hapus" onPress={()=>{hapusBuletin(daftarBuletin[2*i].id,daftarBuletin[2*i].judul)}}  raised={true}
                    titleStyle={{ fontWeight: '500', fontSize:RFPercentage(1.6), color:theme.colors.accent }}
                    buttonStyle={{
                      backgroundColor:'transparent',
                      borderColor: theme.colors.accent,
                      borderWidth: 1,
                      borderRadius:10
                    }}
                    containerStyle={{ borderRadius:10}} />

              </View>
          
            </View>

             {(2*i+1)!=daftarBuletin.length &&  
            <View style={{height:350,width:wp("40%"),borderRadius: 10}}>   
              <Image source={{uri: (daftarBuletin[2*i+1].gambar)}} style={{ height:250, borderRadius: 10, width:'100%' }} resizeMode={'cover'}/>
              <View style={{ backgroundColor: theme.colors.black, height: 250, width: '100%', borderRadius: 6, position: 'absolute', opacity: 0.1 }}></View>
              <Text style={{fontSize:RFPercentage(2), fontFamily:'Poppins-SemiBold',  textAlign:'center', color:theme.colors.black,marginTop:7}}>{daftarBuletin[2*i+1].judul}</Text>
              <View style={[{ width: "100%", justifyContent:"center", flexDirection:'row', marginTop:2,  }]}>
              <Button title={daftarBuletin[2*i+1].cekFile?'Baca':'Simpan'} onPress={()=>{simpanBuletin({navigation:props.navigation,id:daftarBuletin[2*i+1].id,linkbuletin:daftarBuletin[2*i+1].link, judul:daftarBuletin[2*i+1].judul, modalBuka:props.modalBuka, modalTutup:props.modalTutup, persen:props.persen})}}  raised={true}
                    titleStyle={{ fontWeight: '500', fontSize:RFPercentage(1.6), color:theme.colors.secondary }}
                    buttonStyle={{
                      backgroundColor:'transparent',
                      borderColor: theme.colors.secondary,
                      borderWidth: 1,
                      borderRadius:10
                    }}
                    containerStyle={{ borderRadius:10,marginRight:10}}
                    />
            <Button title="Hapus" onPress={()=>{hapusBuletin(daftarBuletin[2*i+1].id,daftarBuletin[2*i+1].judul)}}  raised={true}
                    titleStyle={{ fontWeight: '500', fontSize:RFPercentage(1.6), color:theme.colors.accent }}
                    buttonStyle={{
                      backgroundColor:'transparent',
                      borderColor: theme.colors.accent,
                      borderWidth: 1,
                      borderRadius:10
                    }}
                    containerStyle={{ borderRadius:10}} />

              </View>
          
            </View>
            }   
          </View>
        )
      }
      return(
      <View style={{marginHorizontal:8, marginTop:30}}>
       
        {tampilanbuletin}

      </View>
      )
    }
}

export default BuletinScreen = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [persen, setPersen] = useState(0);

    return (
      <>
      {RenderHeader({navigation})}      
      <ScrollView style={{ backgroundColor:theme.colors.white }}>
      <Buletin navigation={navigation} modalBuka={()=>{ setModalVisible(true);}}  modalTutup={()=>{setModalVisible(false)}} persen={(persen)=>{ setPersen(persen);}}/>
      <Modal isVisible={isModalVisible} style={{ flex: 1, justifyContent:'center', alignItems:'center',}} onBackdropPress={()=>{setModalVisible(false)}}>
        <View style={{ backgroundColor:'white', width:wp('60%'), height:140, justifyContent:'center', alignItems:'center', borderRadius:6 }}>
        <Text style={{fontSize:RFPercentage(2.4),paddingBottom:5, fontFamily:'Poppins-Regular', color:theme.colors.simandra}}>Sedang donwload, harap ditunggu...</Text>
          <ActivityIndicator size={30} color={theme.colors.secondary}/>
          <Text style={{fontSize:RFPercentage(2.2),paddingVertical:5, color:theme.colors.black}}>{persen}%</Text>
        </View>
      </Modal>
      </ScrollView>
    </>
    );
  }
