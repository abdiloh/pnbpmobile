import React, { useEffect, useState }  from 'react'
import { ScrollView, View, StyleSheet, Dimensions, TouchableOpacity, Text,StatusBar, TouchableNativeFeedback, Linking, NativeModules, Alert, LayoutAnimation } from 'react-native';
import { BlockHeader, TextHeader } from './styles/common'
import { theme } from './styles/constants';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RFPercentage } from "react-native-responsive-fontsize";
import { Icon, Button, Image  } from 'react-native-elements';
import Modal from "react-native-modal";
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { versionaplikasi, ipserver } from './setting';
import {Placeholder,
  PlaceholderLine,
  ShineOverlay
} from "rn-placeholder";
import auth from '@react-native-firebase/auth';

const { UIManager } = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

function renderHeader({navigation}) {
    return (
      <View style={{elevation:3, backgroundColor:'white'}}>
        <View style={{backgroundColor:'white', justifyContent:'center', }}>
        <BlockHeader flex={false} row style={{  paddingHorizontal:16, paddingVertical:15,  }}>
          <View style={{width:100, justifyContent:'center'}}>
            <Image style={{width: 90 , height: 30  }} source={require('./images/pnbpmobile.png')} resizeMethod={'resize'} transition={true}/>
          </View>
          <BlockHeader right >
            <View style={{ position: 'absolute', right:10}}>
           <Icon name='phone-call' type='feather' color={theme.colors.simandra} onPress={()=>{navigation.navigate('Bantuan')}}/>
           </View>
          </BlockHeader>
        </BlockHeader>
        </View>
      </View>
    );
}

const CarouselCardItem = ({item, index, navigation}) =>{
 return(
<TouchableNativeFeedback onPress={()=>{ Linking.openURL(item.link)
  .then((data) => {
    
  })
  .catch(() => {
    alert('Gagal Membuka Link');
  });}}>
      <View style={{ position: 'relative'}}>
        <Image source={{uri:item.gambar}} style={{ height:'100%' , width: '100%', borderRadius: 6 }} transition={true} placeholderContent={<CustomPlaceholder />}/>
        
        <View style={{ position: 'absolute', bottom: 0, right: 0, width: '100%', paddingTop: 5}}>       
          <View
            style={{  paddingHorizontal: 5, paddingVertical: 20, borderBottomRightRadius: 6,borderBottomLeftRadius: 6, backgroundColor:'black', opacity:0.5 }}
          >
          </View>
          <View style={{ position: 'absolute', bottom: 0, left: 0, width: '100%',  paddingHorizontal: 12, justifyContent:'space-around', height:40 }}>
      
            <Text style={{ fontSize: 14, color:'white', fontFamily:'Poppins-SemiBold', marginBottom:-5  }}>{item.judul}</Text>
            <Text style={{ fontSize: 12, color: 'white', marginBottom:1 }}>{item.subjudul}</Text>
        
          </View>

        </View>
      </View>
  </TouchableNativeFeedback>
  )
}

const CustomPlaceholder = ()=>{
  return(
    <Placeholder
    style={{width:wp('90%')}}
    Animation={ShineOverlay}
  >
    <PlaceholderLine height={180} style={{borderRadius:6}} />
    
  </Placeholder>
  )
}

const CarouselCards = (props) => {
    cekData = props.data.length 
    const [activeSlide, setactiveSlide] = useState(0);
    const isCarousel = React.useRef(null) 
   
    return ( 
      <View style={{height:hp('30%'), alignItems:'center', minHeight:180 }}>
        { cekData > 1 ?
        <>
          <Carousel
            layout={'default'}
            ref={isCarousel}
            data={props.data}
            renderItem={({ item, index }) => {
              return(
                <CarouselCardItem item={item} index={index} navigation={props.navigation} />
              )
            }}
            inactiveSlideOpacity={0.7}
            sliderWidth={wp('90%')}
            itemWidth={wp('90%')}
            inactiveSlideScale={0.6}
            firstItem={0}
            loop={true}
            loopClonesPerSide={cekData}
            autoplay={true}
            useScrollView={true}
            onSnapToItem={(index) => setactiveSlide(index) }
            contentContainerStyle={{marginBottom:-20}}      
          />
          <Pagination
          dotsLength={cekData}
          activeDotIndex={activeSlide}
          containerStyle={{ position:'absolute', bottom: 15 }}
          dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 2,
              backgroundColor: theme.colors.white
          }}
          dotContainerStyle={{margin:0}}
          inactiveDotStyle={{
              // Define styles for inactive dots here
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
        </>
        : CustomPlaceholder()
        }
      </View>
     
    )
}


function RenderContent(props) {
  const { navigation, onPress, penjelasan, validasi } = props
 
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 16, paddingLeft: wp('3%'), paddingRight: wp('3%') }}>

        <View style={{ justifyContent: 'space-around', flexDirection: 'row', width: '100%', marginBottom: 12 }}>
          <View style={{ width: '20%', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => {onPress()}} style={styles.cardContent}>
            <Image style={{width: undefined , height: 50,aspectRatio: 1}} source={require('./images/mandra.png')} resizeMethod={'resize'} transition={true}/>
            </TouchableOpacity>
            <Text style={{ fontSize: RFPercentage(1.4), textAlign: 'center', marginTop: 10, fontFamily: "Poppins-Medium", color:theme.colors.black }}>SiMandra</Text>
          </View>     
          <View style={{ width: '20%', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => {  
              const whatshap = 'whatsapp://send?text=pnbp&phone=6285879792610'
              Linking.openURL(whatshap)
              .then((data) => {
              })
              .catch(() => {
                alert('Pastikan WhatsApp telah terinstall');
              });}} 
              style={styles.cardContent}>
            <Image style={{width: undefined, height: 60,aspectRatio: 1}} source={require('./images/NonaVira.png')} transition={true}/>
            </TouchableOpacity>
            <Text style={{ fontSize: RFPercentage(1.4), textAlign: 'center', marginTop: 10, fontFamily: "Poppins-Medium", color:theme.colors.black }}>Asisten {"\n"} Virtual PNBP</Text>
          </View> 


          <View style={{ width: '20%', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => {navigation.navigate('Buletin') }} style={styles.cardContent}>
            <Image style={{width: undefined, height: 50,aspectRatio: 1}} source={require('./images/buletininti.png')} transition={true}/>
            </TouchableOpacity>
            <Text style={{ fontSize: RFPercentage(1.4), textAlign: 'center', marginTop: 10, fontFamily: "Poppins-Medium", color:theme.colors.black }}>Buletin {"\n"} Inti PNBP</Text>
          </View>
          
          <View style={{ width: '20%', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => {navigation.navigate('Saran')}} 
              style={styles.cardContent}>
            <Icon name='forward-to-inbox' type='material' size={35}  color={theme.colors.borderFoto}/>
            </TouchableOpacity>
            <Text style={{ fontSize: RFPercentage(1.4), textAlign: 'center', marginTop: 10, fontFamily: "Poppins-Medium", color:theme.colors.black }}>Saran Masukan</Text>
          </View>

         
        </View>
        { penjelasan && <View style={{elevation:3, paddingBottom:10, backgroundColor:'white', borderRadius:4, marginBottom:16, borderColor: theme.colors.simandra, borderWidth:0.4}}>
          <View>
            <Text style={{fontFamily: "Poppins-Medium", padding:0, color:theme.colors.black, fontSize: RFPercentage(1.4), paddingTop:2, paddingHorizontal:4}}>Aplikasi SiMandra </Text>
            <Text style={{fontFamily: "Poppins-Medium", color:theme.colors.gray,fontSize: RFPercentage(1.2), textAlign:'justify', paddingHorizontal:4}}>Sistem Informasi Management Draft Regulations merupakan aplikasi terbatas khusus untuk K/L mitra DJA yang berfungsi untuk memonitoring penyelesaian regulasi pnbp, termasuk RPP dan RPMK jenis dan tarif PNBP.</Text>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Button title={"Lanjut"} 
            onPress={()=>{ 
            const user = auth().currentUser;

             if(validasi=='false'){
                // console.log('tanpa harus validasi')
                auth().signInWithEmailAndPassword('publikpnbp@gmail.com', 'publ1kpnbp')
                .then(()=>{navigation.navigate('HomeMandra')}) 
              }

              if(validasi=='true'){
                if(user == null){
                  navigation.navigate('HomeMandra')
                  // console.log(validasi,'harus validasi')
                }else{
                  auth().signOut().then(()=>{navigation.navigate('HomeMandra')}) 
                  // console.log('harus validasi dan sudah pernah login tanpa validasi')
                }
              }  
              
            }} 
             titleStyle={{ fontWeight: '500', fontSize:RFPercentage(1.2), color:theme.colors.simandra, padding:0 }}
             buttonStyle={{
               backgroundColor:'transparent',
               borderColor: theme.colors.simandra,
               borderWidth: 0.4,
               borderRadius:10,
               padding:4
             }}
             containerStyle={{ borderRadius:10,width:wp('20%'), paddingHorizontal:4}}
            />
             <Button title={"Tutup"} onPress={()=>{onPress()}} 
             titleStyle={{ fontWeight: '500', fontSize:RFPercentage(1.2), color:theme.colors.accent, padding:0 }}
             buttonStyle={{
               backgroundColor:'transparent',
               borderColor: theme.colors.accent,
               borderWidth: 0.4,
               borderRadius:10,
               padding:4
             }}
             containerStyle={{ borderRadius:10,width:wp('20%'), paddingHorizontal:4}}
            />
            </View>
          </View>
        </View>}
        <View style={{ justifyContent: 'space-around', flexDirection: 'row', width: '100%', marginBottom: 18 }}>
          
          <View style={{ width: '20%', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => {   navigation.navigate('Data') }} style={styles.cardContent}>
            <Icon  name='bar-chart' type='font-awesome' size={32}  color={theme.colors.orange}/>
            </TouchableOpacity>
            <Text style={{ fontSize: RFPercentage(1.4), textAlign: 'center', marginTop: 10, fontFamily: "Poppins-Medium", color:theme.colors.black }}>Data PNBP</Text>
          </View>
         
          <View style={{ width: '20%', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => { navigation.navigate('Peraturan')}} style={styles.cardContent}>
            <Image style={{width: undefined, height: 40,aspectRatio: 1}} source={require('./images/hukum.png')} transition={true}/>
            </TouchableOpacity>
            <Text style={{ fontSize: RFPercentage(1.4), textAlign: 'center', marginTop: 10, fontFamily: "Poppins-Medium", color:theme.colors.black }}>Peraturan{"\n"}PNBP</Text>
          </View>
          <View style={{ width: '20%', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => { navigation.navigate('Standar')}} style={styles.cardContent}>
            <Image style={{width: undefined, height: 30,aspectRatio: 1}} source={require('./images/evaluation.png')} transition={true}/>
            </TouchableOpacity>
            <Text style={{ fontSize: RFPercentage(1.4), textAlign: 'center', marginTop: 10, fontFamily: "Poppins-Medium", color:theme.colors.black }}>Standar Pelayanan</Text>
          </View>

          <View style={{ width: '20%', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => {navigation.navigate('Faq') }} style={styles.cardContent}>
            <Icon  name='help-center' type='material' size={32}  color={theme.colors.secondary}/>
            </TouchableOpacity>
            <Text style={{ fontSize: RFPercentage(1.4), textAlign: 'center', marginTop: 10, fontFamily: "Poppins-Medium", color:theme.colors.black }}>FAQ</Text>
          </View>
         
        </View>
        
      </View>

      <View style={{ height: 8, backgroundColor: '#F2F2F4' }}></View>
      
    </View>
  )
}

function RenderCariBilling({navigation}){
  return(
    <View style={{marginHorizontal:20, marginTop:10}}>
    <TouchableNativeFeedback onPress={() => {navigation.navigate('Billing') }} >
    <View style={[{flexDirection:'row',flexWrap: 'wrap',borderRadius: 6}, styles.shadow]}>
     
      <View style={{ width:'60%', alignItems: 'center', height: hp("8%"), justifyContent:'center',  }}>
          <Text style={{fontFamily:'Poppins-SemiBold', color:theme.colors.black, fontSize:RFPercentage(2.2), paddingTop:1}}> Cek pembayaran PNBP ?</Text>
      </View>
      <View style={{ width: '40%', alignItems: 'center', justifyContent:'center' }}>
        <View style={{ borderRadius: 6, alignItems: 'center', justifyContent: 'center', backgroundColor:'#ebf8ff',}}>
        <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
          <Icon style={{paddingHorizontal:6, paddingBottom:4,paddingTop:8}} name="qrcode" size={18} color={theme.colors.simandra} type={'font-awesome'}/>
          <Text style={{paddingBottom:7,paddingTop:8,paddingRight:6,paddingLeft:4, fontFamily:'Poppins-Medium', color:theme.colors.simandra, fontSize:RFPercentage(1.8)}}>Cari Status Billing</Text>
        </View>
        </View>
      </View>
    </View>      
    </TouchableNativeFeedback> 
    </View>
  )
}

function renderSubMenu({navigation}){
  return (
    <View style={{padding:16,paddingTop:5}}>
      <TextHeader style={{ color: theme.colors.simandra, fontFamily: 'Poppins-SemiBold', fontSize: 15,  marginBottom:8 }}>
        Menu Lainnya
      </TextHeader>   

      <TouchableNativeFeedback onPress={() => {
        Linking.openURL('https://anggaran.kemenkeu.go.id/in/post/aplikasi-tpnbp')
        }}
      >
        <View style={[{flexDirection:'row',flexWrap: 'wrap',borderRadius: 6,marginBottom:15}, styles.shadow]}>
          <View style={{ width: '13%', alignItems: 'center', marginRight:8 }}>
            <View style={{ width: wp('13%'), height: hp("8%"), borderRadius: 6, alignItems: 'center', justifyContent: 'center', backgroundColor:'#ebf8ff' }}>
            <Image style={{width: undefined , height: 30,aspectRatio: 1}} source={require('./images/tpnbp.png')} resizeMethod={'resize'} transition={true}/>
            </View>
          </View>
          <View style={{ width:'81%', alignItems: 'flex-start', height: hp("8%"), justifyContent:'center',  }}>
              <Text style={{fontFamily:'Poppins-Medium', color:theme.colors.black, fontSize:RFPercentage(1.6)}}> TPNBP</Text>
              <Text style={{fontFamily:'Poppins-Regular', color:theme.colors.gray3, fontSize:RFPercentage(1.4)}}> Aplikasi Target PNBP</Text>

          </View>
        </View>      
      </TouchableNativeFeedback> 

      <TouchableNativeFeedback onPress={() => {
        navigation.navigate('WebView',{
          link:'https://satudja.kemenkeu.go.id/', 
          judul:'SatuDJA'})}
        }>
        <View style={[{flexDirection:'row',flexWrap: 'wrap',borderRadius: 6,marginBottom:15}, styles.shadow]}>
          <View style={{ width: '13%', alignItems: 'center', marginRight:8 }}>
            <View style={{ width:wp('13%'), height: hp("8%"), borderRadius: 6, alignItems: 'center', justifyContent: 'center', backgroundColor:'#ebf8ff' }}>
            <Image style={{width: undefined , height: 30,aspectRatio: 1}} source={require('./images/1dja.png')} resizeMethod={'resize'} transition={true}/>
            </View>
          </View>
          <View style={{ width:'81%', alignItems: 'flex-start', height: hp("8%"), justifyContent:'center',  }}>
              <Text style={{fontFamily:'Poppins-Medium', color:theme.colors.black, fontSize:RFPercentage(1.6)}}>SatuDJA</Text>
              <Text style={{fontFamily:'Poppins-Regular', color:theme.colors.gray3, fontSize:RFPercentage(1.4)}}>Upload Target PNBP</Text>

          </View>
        </View>      
      </TouchableNativeFeedback>

      <TouchableNativeFeedback onPress={() => {
        navigation.navigate('WebView',{
          link:'https://www.simponi.kemenkeu.go.id/', 
          judul:'Simponi'})}
        }>
        <View style={[{flexDirection:'row',flexWrap: 'wrap',borderRadius: 6,marginBottom:15}, styles.shadow]}>
          <View style={{ width: '13%', alignItems: 'center', marginRight:8 }}>
            <View style={{ width:wp('13%'), height: hp("8%"), borderRadius: 6, alignItems: 'center', justifyContent: 'center', backgroundColor:'#ebf8ff' }}>
            <Image style={{width: undefined , height: 55,aspectRatio: 1}} source={require('./images/simponilogo.png')} resizeMethod={'resize'} transition={true}/>
            </View>
          </View>
          <View style={{ width:'81%', alignItems: 'flex-start', height: hp("8%"), justifyContent:'center',  }}>
              <Text style={{fontFamily:'Poppins-Medium', color:theme.colors.black, fontSize:RFPercentage(1.6)}}> Simponi</Text>
              <Text style={{fontFamily:'Poppins-Regular', color:theme.colors.gray3, fontSize:RFPercentage(1.4)}}> Sistem Informasi PNBP Online</Text>

          </View>
        </View>      
      </TouchableNativeFeedback>
      
      <TouchableNativeFeedback onPress={() => {
        navigation.navigate('WebView',{
          link:'https://ssdpnbp.kemenkeu.go.id/', 
          judul:'SSD PNBP'})}
        }>
        <View style={[{flexDirection:'row',flexWrap: 'wrap',borderRadius: 6,marginBottom:15}, styles.shadow]}>
          <View style={{ width: '13%', alignItems: 'center', marginRight:8 }}>
            <View style={{ width: wp('13%'), height: hp("8%"), borderRadius: 6, alignItems: 'center', justifyContent: 'center', backgroundColor:'#ebf8ff' }}>
            <Image style={{width: undefined , height: 50,aspectRatio: 1}} source={require('./images/ssdpnbp.png')} resizeMethod={'resize'} transition={true}/>
            </View>
          </View>
          <View style={{ width:'81%', alignItems: 'flex-start', height: hp("8%"), justifyContent:'center',  }}>
              <Text style={{fontFamily:'Poppins-Medium', color:theme.colors.black, fontSize:RFPercentage(1.6)}}> SSD PNBP</Text>
              <Text style={{fontFamily:'Poppins-Regular', color:theme.colors.gray3, fontSize:RFPercentage(1.4)}}> Single Source Database PNBP</Text>

          </View>
        </View>      
      </TouchableNativeFeedback>

      <TouchableNativeFeedback onPress={() => {
        navigation.navigate('WebView',{
          link:'https://e-mawaspnbp.kemenkeu.go.id/', 
          judul:'E-Mawas PNBP'})}
        }>
        <View style={[{flexDirection:'row',flexWrap: 'wrap',borderRadius: 6,marginBottom:15}, styles.shadow]}>
          <View style={{ width: '13%', alignItems: 'center', marginRight:8 }}>
            <View style={{ width: wp('13%'), height: hp("8%"), borderRadius: 6, alignItems: 'center', justifyContent: 'center', backgroundColor:'#ebf8ff' }}>
            <Image style={{width:undefined , height: 50, aspectRatio: 1}} source={require('./images/emawas.png')}  transition={true}/>
            </View>
          </View>
          <View style={{ width:'81%', alignItems: 'flex-start', height: hp("8%"), justifyContent:'center',  }}>
              <Text style={{fontFamily:'Poppins-Medium', color:theme.colors.black, fontSize:RFPercentage(1.6)}}> E-mawas PNBP</Text>
              <Text style={{fontFamily:'Poppins-Regular', color:theme.colors.gray3, fontSize:RFPercentage(1.4)}}> Manajemen Pengawasan PNBP </Text>

          </View>
        </View>      
      </TouchableNativeFeedback>

      <TouchableNativeFeedback onPress={() => {
        navigation.navigate('WebView',{
          link:'https://www.youtube.com/playlist?list=PLObLZ5gbWFx9TgtE72-n-v1FFQsJuqZAm', 
          judul:'Pembelajaran Youtube DJA'})}
        }>
        <View style={[{flexDirection:'row',flexWrap: 'wrap',borderRadius: 6,marginBottom:15}, styles.shadow]}>
          <View style={{ width: '13%', alignItems: 'center', marginRight:8 }}>
            <View style={{ width: wp('13%'), height: hp("8%"), borderRadius: 6, alignItems: 'center', justifyContent: 'center', backgroundColor:'#ebf8ff' }}>
            <Icon name='youtube' type='feather' color={theme.colors.accent}/>
            </View>
          </View>
          <View style={{ width:'81%', alignItems: 'flex-start', height: hp("8%"), justifyContent:'center',  }}>
              <Text style={{fontFamily:'Poppins-Medium', color:theme.colors.black, fontSize:RFPercentage(1.6)}}> Media Pembelajaran Via YouTube</Text>
          </View>
        </View>      
      </TouchableNativeFeedback>
        
      <TouchableNativeFeedback onPress={() => {
        navigation.navigate('WebView',{
          link:'https://www.instagram.com/stories/highlights/17903257471359162/', 
          judul:'Pembelajaran Instagram DJA'})}
        }>
        <View style={[{flexDirection:'row',flexWrap: 'wrap',borderRadius: 6,marginBottom:15}, styles.shadow]}>
          <View style={{ width: '13%', alignItems: 'center', marginRight:8 }}>
            <View style={{ width: wp('13%'), height: hp("8%"), borderRadius: 6, alignItems: 'center', justifyContent: 'center', backgroundColor:'#ebf8ff' }}>
            <Icon name='instagram' type='feather' color={'#C13584'}/>
            </View>
          </View>
          <View style={{ width:'81%', alignItems: 'flex-start', height: hp("8%"), justifyContent:'center',  }}>
              <Text style={{fontFamily:'Poppins-Medium', color:theme.colors.black, fontSize:RFPercentage(1.6)}}> Media Pembelajaran Via Instagram</Text>
          </View>
        </View>      
      </TouchableNativeFeedback>

      <TouchableNativeFeedback onPress={()=>{ 
       navigation.navigate('DetailPeraturan',{linkperaturan : "https://firebasestorage.googleapis.com/v0/b/abdiamrulloh1995.appspot.com/o/Bunga%20rampai%20diskusi%20regulasi%20PNBP.pdf?alt=media&token=c55d0410-805b-4a1e-a9a8-f34831f7e47f", tentang:'Diskusi Regulasi di Bidang PNBP', judul:'Bunga Rampai Diskusi' })}}>
        <View style={[{flexDirection:'row',flexWrap: 'wrap',borderRadius: 6,marginBottom:15}, styles.shadow]}>
          <View style={{ width: '13%', alignItems: 'center', marginRight:8 }}>
            <View style={{ width: wp('13%'), height: hp("8%"), borderRadius: 6, alignItems: 'center', justifyContent: 'center', backgroundColor:'#ebf8ff' }}>
            <Icon name='comment-dots' type='font-awesome-5' color={theme.colors.secondary}/>
            </View>
          </View>
          <View style={{ width:'81%', alignItems: 'flex-start', height: hp("8%"), justifyContent:'center',  }}>
              <Text style={{fontFamily:'Poppins-Medium', color:theme.colors.black, fontSize:RFPercentage(1.6)}}>Bunga Rampai Diskusi Regulasi PNBP</Text>
          </View>
        </View>      
      </TouchableNativeFeedback>

    </View>
  )
}

export default HomeScreen = ({ navigation }) => {
  const [berita, setBerita] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [validasi, setValidasi] = useState('');
  const [penjelasan, setpenjelasan] = useState(false);
  const versionaplikasi = 22
  const infoPNBPMobile = async () => {
    try {
     const response = await fetch('https://621831981a1ba20cba9ab3c0.mockapi.io/pnbpmobile');
     const json = await response.json();
     setValidasi(json[0].login)
     if(json[0].version > versionaplikasi){
      setModalVisible(true)
     }
     setBerita(json[0].berita)
   } catch (error) {
     Alert(error);
   } 
 }

  useEffect(() => {
      infoPNBPMobile()
  },[])

    return (
      <View style={{ flex: 1 }}>
          <Modal isVisible={isModalVisible} onBackdropPress={()=>{setModalVisible(false)}} style={{justifyContent:'flex-end', margin:0, }}>
          <View style={{ backgroundColor:'white', width:undefined, height:180, justifyContent:'center', alignItems:'center', borderRadius:6 }}>
            <Text style={{fontFamily:'Poppins-Medium', fontSize:15, marginBottom:10}}> Harap aplikasi diupdate ke versi terbaru</Text>
            <Button title={"Update"} onPress={()=>{ 
                const googleplay = 'https://play.google.com/store/apps/details?id=com.simandra'
                Linking.openURL(googleplay)
                .then((data) => {
                  
                })
                .catch(() => {
                  alert('Pastikan WhatsApp telah terinstall');
                });
                }} raised={true}
                titleStyle={{ fontWeight: '500', fontSize:RFPercentage(1.6), color:theme.colors.secondary, fontSize:14 }}
                buttonStyle={{
                  backgroundColor:'transparent',
                  borderColor: theme.colors.secondary,
                  borderWidth: 1,
                  borderRadius:10,
                }}
                containerStyle={{ borderRadius:10,marginRight:10}}
                />
          </View>
          </Modal>
        <StatusBar backgroundColor={theme.colors.simandra} />
        <ScrollView style={styles.safe} showsVerticalScrollIndicator={false}>
        <View
            style={{  marginBottom: 10}}>
            {renderHeader({ navigation })}
        </View>
          <CarouselCards data={berita} navigation={navigation}/>
          {RenderCariBilling({navigation})}
          <RenderContent navigation ={ navigation } onPress={()=>{LayoutAnimation.spring(),setpenjelasan(!penjelasan)}} penjelasan={penjelasan} validasi={validasi}/>
        
          {renderSubMenu({ navigation })}
        </ScrollView>
        
      </View>
    );
}

  const styles = StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: 'white',
      
    },
    headerChart: {
      paddingTop: 30,
      paddingBottom: 30,
      zIndex: 1
    },
    avatar: {
      width: 70,
      height: 70,
      borderRadius: 25 / 2,
    },
    miniCardStyle: {
      //shadowColor: '#000000',
      //shadowOpacity: 0.1,
      shadowRadius: 5,
      backgroundColor: '#ffffff',
      borderRadius: 3,
      elevation: 1,
      width: (Dimensions.get("window").width / 2) - 25
    },
    content: {
      marginTop: -55,
      paddingTop: 55 + 20,
      paddingBottom: 10,
      zIndex: -1
  
    },
    cardContent:{
      width: wp('16%'), height: hp("10%"), borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor:'#fff6eb' 
    },
    shadow: {
      shadowOpacity: 1,
      elevation: 3,
      shadowRadius: 5,
      // background color must be set
      backgroundColor : "white" // invisible color
    }

  });