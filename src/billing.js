import React, {useState, useRef, useEffect} from 'react'
import { View, Text, StatusBar, ScrollView, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from './styles/constants';
import { Icon,  Button, } from 'react-native-elements';
import { RFPercentage } from "react-native-responsive-fontsize";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import Recaptcha from 'react-native-recaptcha-that-works';
import { ipsimponi  } from './setting';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { cekKadaluarsaToken } from './helper/utility';

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
            <Text style={{fontSize:18, fontFamily:'Poppins-SemiBold', color:'white'}}>Cek Pembayaran</Text>
            </View>
          <View flex={1}>
  
          </View>
          </View>
          </LinearGradient>
    )
}

const QrScreen = (props) =>{
  return (
      <QRCodeScanner
        onRead={(e)=>{props.setinputBilling(e.data), props.navigation.navigate('DetailBilling',{kdbilling:e.data})}}
        flashMode={RNCamera.Constants.FlashMode.torch}
        containerStyle={{ height: heightPercentageToDP('40%'), width: widthPercentageToDP('100%'),marginTop: 30 }}
        cameraStyle={{ height: heightPercentageToDP('40%'), marginTop: 35, width: 300, alignSelf: 'center', justifyContent: 'center', alignItems:'center' }}
        reactivate={true}
      />
    
    );
}

const ContentScreen2 =(props)=>{
  return (
    <View style={{paddingVertical:10, alignItems:'center', backgroundColor: 'white', marginBottom:5}}>

    <View style={{width:'90%',}}>
   
    <View style={{ borderWidth: 0.5,  padding: 0, borderRadius:8, marginBottom:10, borderColor:'black'}} >
      <TextInput
      
      underlineColorAndroid="transparent"
      placeholder="Ketikan Kode Billing / NTPN"
      placeholderTextColor="grey"
  
    value={props.inputBilling}
    onChangeText={value => props.setinputBilling(value)}
      // multiline={true}
      />
    </View>
    </View>
    <Button title={"Cek Status"} 
    raised={true}
    onPress={
      ()=>{
        props.openCaptch()
        // props.navigation.navigate('DetailBilling',{kdbilling:props.inputBilling})
      }
    } 
    icon={
      <Icon
        name="search"
        size={16}
        color={theme.colors.simandra}
        type={'font-awesome'}
      />
    }
    iconRight={true}
      titleStyle={{ fontWeight: '500', fontSize:12, color:theme.colors.simandra, padding:0, paddingRight:10 }}
      buttonStyle={{
        backgroundColor:'transparent',
        borderColor: theme.colors.simandra,
        borderWidth: 0.5,
        borderRadius:10,
      
      }}
      containerStyle={{ borderRadius:10,width:widthPercentageToDP('30%')}}
    />
  <Text style={{fontSize:RFPercentage(1.8), color:theme.colors.black, padding:10}}>===== ATAU =====</Text>
  <Button 
    raised={true}
    title={"Scan QR Billing Simponi"} onPress={()=>{props.onPress()}}
    icon={
      <Icon
        name="qrcode"
        size={18}
        color={theme.colors.simandra}
        type={'font-awesome'}
      />
    }
    iconRight={true}
      titleStyle={{ fontWeight: '500', fontSize:12, color:theme.colors.simandra, padding:0, paddingRight:10 }}
      buttonStyle={{
        backgroundColor:'transparent',
        borderColor: theme.colors.simandra,
        borderWidth: 0.5,
        borderRadius:10,
      
      }}
      containerStyle={{ borderRadius:10,width:widthPercentageToDP('60%'), marginBottom:25}}
    />
    {props.qrscreen && 
    <QrScreen navigation={props.navigation} setinputBilling={value=>props.setinputBilling(value)} style={{paddingBottom:10}}/>
    }
  </View>
  )
}

export default Billing =({navigation})=> {

    const [inputBilling, setinputBilling] = useState('');
    const [qrscreen, setQrscreen] = useState(false);  

    const recaptcha = useRef();

    const openCaptch = () => {
      
        recaptcha.current.open();
    }

    const onVerify = token => {
      navigation.navigate('DetailBilling',{kdbilling:inputBilling})
    }

    const onExpire = () => {
        console.warn('expired!');
    }

    const checkToken = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@storage_Key')
        jsonValue != null ? JSON.parse(jsonValue) : null;
        // console.log(jsonValue)
        if(jsonValue !== null) {
          if(cekKadaluarsaToken(jsonValue.waktu)){
            return true
          }else{
            return false
          }
        }else{
          return false
        }
      } catch(e) {
        alert(e)
      }
    }

    const authtoken = async () => {

      try {
        url = ipsimponi+'/apipnbpmobile/auth/token'
        let details = {
          'userid': 8135952,
          'password':'Pnbpmobile#%3675'
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
          headers: {
              'Authorization': 'Bearer token',
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: formBody
      }).then((response) => response.json())
        .then(async(responseData) => {
          try {
            const jsonValue = JSON.stringify({token:responseData.token, waktu:new Date()})
            await AsyncStorage.setItem('@storage_Key', jsonValue)
            // console.log(jsonValue)
          } catch (e) {
            alert(e);
          }
        
      })
     } catch (error) {
        alert(error);
        
      } 
    }
  
    useEffect(() => {
      // jika token tidak ada dan token expired request token
      if(!checkToken()){
        authtoken()
      }
     
    },[])
    
    return (
      <View style={{flex:1, backgroundColor:'white'}}>
        <StatusBar backgroundColor={theme.colors.simandra} />
        <ScrollView style={{ flex: 1, backgroundColor: 'white',}} showsVerticalScrollIndicator={false}>
          <RenderHeader navigation={navigation}/>  
          <Recaptcha
            ref={recaptcha}
            siteKey="6LdoA44gAAAAAKeUqxDW5ddCeSgruyI3vMX5YhUO"
            baseUrl="https://monitoring-peraturan.web.app"
            onVerify={onVerify}
            onExpire={onExpire}
            size="normal"
        />  
          <ContentScreen2 navigation={navigation} qrscreen={qrscreen} onPress={()=>{setQrscreen(true)}} inputBilling={inputBilling} setinputBilling={(inputBilling)=>{setinputBilling(inputBilling)}} openCaptch={openCaptch}/>
        </ScrollView>
      </View>
    );    
}
