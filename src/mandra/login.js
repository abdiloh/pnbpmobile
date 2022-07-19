import React, { useState, useEffect }  from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Text,
  ActivityIndicator,
} from 'react-native'

import LinearGradient from 'react-native-linear-gradient';
import { theme } from '../styles/constants';
import Button   from '../styles/common/Button';
import { Icon  } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Notifications} from 'react-native-notifications';

export default Signin =({navigation})=> {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [icon, setIcon] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      Notifications.registerRemoteNotifications();
      Notifications.events().registerRemoteNotificationsRegistered((event: Registered) => {
        setToken(event.deviceToken);
      });
    }, []);

    tombolKlik = ()=>{
      if(user=='' || password==''){
        alert("User dan password harap diisi")
      }else{
       
        setLoading(!loading)
        const edituser = user.toLowerCase()
        const username = edituser +'@gmail.com'
        auth().signInWithEmailAndPassword(username, password)
        .then(()=>{      
          firestore().collection('user').doc(edituser).collection('token').doc(token).set({
            token: token,
          }).then(()=>{
            
              navigation.navigate('Mandra')
          });

        }).catch((err)=>{
          alert(err)
          setLoading(loading)
        })
      }
    }    

    return (
      <ImageBackground
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
        }}
        blurRadius={1}
        source={require('../images/sutikno-slamet.jpg')}
      >
        <View style={{ backgroundColor: 'black', width: '100%', height:'100%', position: 'absolute', opacity: 0.5 }}></View>
        <View style={styles.container}>

          <View style={styles.containerInput}>
            <Text style={{color:'white', fontSize:30, fontFamily:'Poppins-SemiBold', }}>Login</Text>
            <Text style={{color:'white',fontSize:28, fontFamily:'Poppins-SemiBold'}}>Aplikasi SiMandra</Text>
          {/* <Image style={{width: wp('70%'), height: hp("20%")}} source={require('./images/mandra.png')} /> */}

            <TextInput style={styles.inputBox}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder="Username"
              placeholderTextColor="#ffffff"
              selectionColor="#fff"
              value={user}
              onChangeText={(text)=>{setUser(text)}}
            />
            <View flex={0}>
            <TextInput style={styles.inputBox}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder="Password"
              secureTextEntry={icon}
              placeholderTextColor="#ffffff"
              value={password}
              onChangeText={(text)=>{setPassword(text)}}
            />
             {/* <Text style={styles.signupText} onPress={this.toggleModal}>Lupa password ? </Text> */}
             {/* {this.modalLupaPassword()} */}
             <Button
                style={styles.toggle}
                onPress={() => {setIcon(!icon)}}
            >
                 <Icon
                     color={theme.colors.gray}
                     size={theme.sizes.font * 1.35}
                     name={icon ? "md-eye" : "md-eye-off"}
                    type="ionicon"
                    // name={ "md-eye"}
                  />
            </Button>
            </View>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              locations={[0.1, 0.9]}
              colors={[theme.colors.primary , theme.colors.simandra]}
              style={styles.button}
            >
              <TouchableOpacity onPress={tombolKlik} >
              
                {loading ?
                  <ActivityIndicator color="white"/> : <Text style={styles.buttonText}>Login</Text>
                }

              </TouchableOpacity>
            </LinearGradient>
          </View>
          <View style={{ backgroundColor: theme.colors.primary, height: 30, width: '100%', position: 'absolute', bottom: 0, opacity: 0.5 }}></View>
          <View
            style={styles.signupTextCont}
          >
            <Text style={styles.signupText} onPress={()=>{navigation.goBack()}}>Kembali</Text>
          </View>
        </View>
      </ImageBackground>
    )
  
}

const styles = StyleSheet.create({
  signupTextCont: {
   
    width: '100%',
    height: 33,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  
    paddingHorizontal: 25,
   
  },
  signupText: {
    color: '#f2f2f2',
    fontSize: 16,
    fontWeight:'bold',
    fontFamily:'Poppins-Regular'
  },
  signupButton: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    textDecorationLine: 'underline'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  containerInput: {
    flex: 100,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  inputBox: {
    width: 300,
    backgroundColor: 'rgba(255, 255,255,0.2)',
    borderColor:'white',
    borderWidth:0.5,
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingTop: 0,
    paddingBottom: 0,
    height: 40,
    fontSize: 16,
    color: '#ffffff',
    marginVertical: 5,
    //borderWidth: 0.5,
    //borderColor: 'grey'
  },

  button: {
    width: 300,
    backgroundColor: '#1c313a',
    borderRadius: 25,
    marginVertical: 5,
    paddingVertical: 13,
    marginTop: 15
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center'
  },
  toggle: {
    position: 'absolute',
    alignItems: 'center',
    width: theme.sizes.base * 2,
    height: theme.sizes.base * 2,
    top: theme.sizes.base / 40,
    right: 10,
    top:0,
    elevation: 1
}
});

