import React, { useState, useEffect }  from 'react'
import { View, Text, StatusBar, ScrollView, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from './styles/constants';
import { Icon,  Button  } from 'react-native-elements';
import Modal from "react-native-modal";
import { ipserver } from './setting';
import {widthPercentageToDP as wp, heightPercentageToDP as hp, widthPercentageToDP} from 'react-native-responsive-screen';
import { RFPercentage } from "react-native-responsive-fontsize";
import { tanggalan2, jam} from './helper/utility';

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
            <Text style={{fontSize:18, fontFamily:'Poppins-SemiBold', color:'white'}}>Saran Masukan</Text>
            </View>
          <View flex={1}>
  
          </View>
          </View>
          </LinearGradient>
    )
}

const SaranScreen = (props) =>{
  const [saran, setSaran] = useState('');

  const tambahsaranPNBP = async () => {
    if(saran != ''){
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ saran: saran, created: tanggalan2(), jam_created: jam() })
    };
     const response = await fetch(ipserver+'/postmenuPNBP/PnBpKael/pNbPKael.com*5/saran', requestOptions);
     const json = await response.json();
      // console.log(json)
      props.onPress()
    
    } catch (error) {
      alert(error);
    } 
    }else{
      alert("Saran tidak boleh kosong !!")
    }
 }
  return(
  <View style={{paddingVertical:10, alignItems:'center', backgroundColor: 'white'}}>

    <View style={{width:'90%',}}>
    <Text style={{fontSize:RFPercentage(2.2), fontFamily:'Poppins-SemiBold', color:theme.colors.black, paddingLeft:10}}>
      Tulis Saran Masukan
    </Text>
    <View style={{ borderWidth: 0.3,  padding: 5, borderRadius:8, marginBottom:10}} >
      <TextInput
      style={{ height:150, textAlignVertical:'top', }}
      underlineColorAndroid="transparent"
      placeholder="Ketikan sesuatu"
      placeholderTextColor="grey"
    //   numberOfLines={1}
    value={saran}
    onChangeText={(val)=>setSaran(val)}
      multiline={true}
      />
    </View>
    </View>
    <Button title={"Kirim"} 
    raised={true}
            onPress={()=>{tambahsaranPNBP() }} 
            icon={
              <Icon
                name="send"
                size={15}
                color={theme.colors.simandra}
              />
            }
            iconRight={true}
             titleStyle={{ fontWeight: '500', fontSize:14, color:theme.colors.simandra, padding:0, paddingRight:10 }}
             buttonStyle={{
               backgroundColor:'transparent',
               borderColor: theme.colors.simandra,
               borderWidth: 0.5,
               borderRadius:10,
              
             }}
             containerStyle={{ borderRadius:10,width:widthPercentageToDP('40%')}}
            />
  </View>
  )
}

const ListSaranScreen = ()=>{
  const [listsaran, setlistSaran] = useState('');
  const [loading, setLoading] = useState(true);
  const [more, setMore]= useState(1)

  const fetchSaran = async () => {

    try {
     const response = await fetch(ipserver+'/getmenuPNBP/PnBpKael/pNbPKael.com*5/saran');
     const json = await response.json();
      // console.log(json)
      setlistSaran(json.response)
      setLoading(false)
    } catch (error) {
      alert(error);
      setLoading(false)
    } 
 }

  useEffect(() => {
    fetchSaran()
  },[])


  if(loading){
    return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop:8 }}>
      <ActivityIndicator color={theme.colors.simandra} size="large"/>
      </View>
    )
  }else{
    if(listsaran.length > 0){
      // cek data dibandingkan dengan loop
      dataditampilkan = (more*5) - 1
    
      return listsaran.map((data, index)=>{
        
        return(
          index <= dataditampilkan ?
          <View key={index}>
            <View style={[styles.container,{paddingTop:4}]} >
          
              <View style={{  flexDirection:'row', borderBottomWidth:1, borderColor:theme.colors.gray2 }}>
                <View style={{ padding: 10, minWidth:'50%'}}>
                <View style={{position:'absolute'}}>
                  <View style={{top:-6, left:3, backgroundColor:theme.colors.simandra, borderRadius:4}}>
                    <Text style={{fontSize:RFPercentage(1), color:'white', padding:3,}}>
                      {data.created.slice(8,10) + "-" +data.created.slice(5,7) + "-" + data.created.slice(0,4)}
                    </Text>
                  </View>
                </View>
                <Text style={{ fontSize: RFPercentage(1.6),  color:theme.colors.black, textAlign:'justify', textAlignVertical:'center', marginTop:3 }}>{data.saran}</Text>
                {/* <Text style={{fontSize:RFPercentage(1.8), color:theme.colors.secondary, fontFamily: "Poppins-Medium",}}>{data.about}</Text> */}
                </View>
              </View>

              {index == dataditampilkan ? 
                <View style={{alignItems:'center', paddingTop:4}}>
                <Button title={"Show More"} 
                titleStyle={{ fontWeight: '500', fontSize:RFPercentage(1.6), color:theme.colors.simandra, }}
                buttonStyle={{
                  backgroundColor:'transparent',
                  borderColor: theme.colors.simandra,
                  borderWidth: 1,
                  borderRadius:10,
                  padding:0
                }}
                containerStyle={{ borderRadius:10, minWidth:50, width:70}} 
                onPress={()=>{setMore(more+1)}}
                />
              
                </View>
                :
                null
              }
            </View> 
          </View>
          :
          null
        )
      })
    }else{
      return(
        <View style={styles.container} >
        <View style={{  flexDirection:'row', backgroundColor:'white', elevation:3, borderRadius:10, borderWidth:1, borderColor:theme.colors.gray1 }}>
  
        <View style={{ padding: 10, flex:10, alignItems:'center' }}>
        <Text style={{ fontSize: RFPercentage(1.6),  color:theme.colors.text, textAlign:'justify', textAlignVertical:'center' }}>Belum Ada Saran </Text>
  
        </View>
        </View>
        </View>
      )
    }
  }
 
}

export default Saran =({navigation})=> {
    const [isModalVisible, setModalVisible] = useState(false);
 
    // console.log(data)
    return (
      <View style={{flex:1, backgroundColor:'white'}}>
        <StatusBar backgroundColor={theme.colors.simandra} />
        <ScrollView style={{ flex: 1, backgroundColor: 'white',}} showsVerticalScrollIndicator={false}>
          <RenderHeader navigation={navigation}/>     
          <SaranScreen onPress={()=>{setModalVisible(true)}}/>
          <View style={{flexDirection:'row', justifyContent:'flex-start', paddingLeft:10, marginTop:20, marginBottom:4}}>
          <Icon name={'info'} type={'feather'} color={theme.colors.simandra} size={RFPercentage(2.4)} />
          <Text style={{fontSize:RFPercentage(2), fontFamily:'Poppins-SemiBold', color:theme.colors.black, paddingLeft:2}}>
            Saran dan Masukan
          </Text>
          </View>
          <View style={{borderWidth:0.5, borderColor:theme.colors.gray2, marginHorizontal:8, marginBottom:6, borderRadius:10}}>
            {/* buat space */}
            
          <ListSaranScreen />
          <View style={{height:8}}></View>
          </View>
          <Modal isVisible={isModalVisible} onBackdropPress={()=>{setModalVisible(false)}} style={{justifyContent:'center', }}>
          <View style={{ backgroundColor:'white', width:undefined, height:180, justifyContent:'center', alignItems:'center', borderRadius:6 }}>
            <Text style={{fontFamily:'Poppins-ExtraBold', fontSize:14,marginBottom:10,color:theme.colors.simandra,}}> Berhasil Terkirim </Text>
            <Text style={{fontFamily:'Poppins-SemiBold', fontSize:12, padding:10, color:theme.colors.black}}> Terimakasih Atas Saran dan Masukannya</Text>
           
            <Button title={"Tutup"} onPress={()=>{setModalVisible(false);  }} 
                raised={true}
                titleStyle={{ fontWeight: '500', fontSize:RFPercentage(1.6), color:theme.colors.accent, fontSize:10 }}
                buttonStyle={{
                  backgroundColor:'transparent',
                  borderColor: theme.colors.accent,
                  borderWidth: 1,
                  borderRadius:10,
                }}
                containerStyle={{ borderRadius:10,marginRight:10}}
                />
          </View>
          </Modal>
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