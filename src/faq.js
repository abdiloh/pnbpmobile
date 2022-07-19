import React, { useState }  from 'react'
import { View, Text, StatusBar, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from './styles/constants';
import { Icon,  ListItem, Input   } from 'react-native-elements';
import { RFPercentage } from "react-native-responsive-fontsize";

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
            <Text style={{fontSize:18, fontFamily:'Poppins-SemiBold', color:'white'}}>FAQ</Text>
            </View>
          <View flex={1}>
  
          </View>
          </View>
          </LinearGradient>
    )
}

bukaFaq = (url)=>{
  Linking.openURL(url)
  .then((data) => {
    
  })
  .catch(() => {
    alert('Gagal Membuka Link');
  });
}

const FaqScreen = (faq, cari) =>{
  
  if(cari!=""){
    faq = faq.filter(item => item.title.toLowerCase().indexOf(cari.toLowerCase()) >= 0)
  }
  if(faq.length > 0){
    return faq.map((data, index)=>{
      // const cekDirektorat = data.jenis=='pnbpkl'?true:false
      cekDirektorat = true
      return(
        <View key={index}>
      
        <TouchableOpacity onPress={()=>data.link ==undefined ? null : bukaFaq(data.link)} style={styles.container} >
        
          <View style={{backgroundColor:'white', elevation:3, flex:1,  borderRadius:8, width:'100%', marginBottom:10}}>
            <View style={{backgroundColor:'#ebf8ff',borderTopLeftRadius:8,borderTopRightRadius:8, justifyContent:'center'}}>
              <Text style={{paddingHorizontal:16, fontFamily:'Poppins-Medium', color:theme.colors.black, fontSize:14, paddingVertical:6}}>{data.title}</Text>
            </View>
              <View style={{flexDirection:'row', paddingHorizontal:8, paddingVertical:8, alignItems:'center', borderBottomLeftRadius:8, borderBottomRightRadius:8}} >
                <View>
                  <Text style={{marginLeft:10, fontSize:15, color:'black', textAlign:'justify'}}>{data.content}</Text>
                
             
                </View>
              </View>
          </View>
         
        </TouchableOpacity> 
        </View>
      )
    })
  }else{
    return(
      <View style={styles.container} >
      <TouchableOpacity onPress={()=> bukaFaq('https://kemenkeupedia.kemenkeu.go.id/')} style={styles.container} >
        
        <View style={{backgroundColor:'white', elevation:3, flex:1,  borderRadius:8, width:'100%', marginBottom:10}}>
          <View style={{flexDirection:'row', backgroundColor:'#ebf8ff',borderTopLeftRadius:8,borderTopRightRadius:8, justifyContent:'center'}}>
            <Text style={{paddingHorizontal:16, fontFamily:'Poppins-Medium', color:theme.colors.black, fontSize:14, paddingVertical:6}}>Klik untuk FAQ selengkapnya</Text>
            <ListItem.Chevron style={{color:'black'}}/>
          </View>
        </View>
       
      </TouchableOpacity> 
      </View>
    )
  }
}
export default Faq =({navigation})=> {
  const [cari, setCari] = useState('');
  const [faq, setFaq] =  useState([
      {
        title: 'Apa itu PNBP Mobile ?',
        content:'PNBP Mobile merupakan aplikasi yang digagas oleh Direktorat Jenderal Anggaran untuk memudahkan informasi mengenai PNBP',
      },
      {
        title: 'Pendaftaran user SIMPONI pembuat billing pada aplikasi SIMPONI ?',
        content:'Pendaftaran user SIMPONI pembuat billing dapat dilakukan secara mandiri melalui laman web https://simponi.kemenkeu.go.id/welcome/login dengan mengikuti langkah sebagai berikut:\n1.klik daftar;\n2.daftar pengguna;\n3.centang Tipe Pengguna Billing yang akan digunakan;\n4.lengkapi data pada kolom yang tersedia; dan\n5.klik daftar.\nPanduan pendaftaran dapat diunduh pada web Simponi di bawah layanan Helpdesk atau tautan  https://e-dropbox.kemenkeu.go.id/index.php/s/BvBTi2RZAAU6PLV.',
        link:'https://simponi.kemenkeu.go.id/welcome/login'
      },
      {
        title: 'Lupa username, password, dan email pada aplikasi SIMPONI ?',
        content:'Jika mengalami lupa username, password, dan email untuk login ke aplikasi SIMPONI, pengguna dapat mengunduh Formulir Permohonan Reset Password User dengan mengakses http://bit.ly/formulirsimponi . Formulir yang telah dilengkapi selanjutnya di-scan dan dikirimkan ke email sapa.anggaran@kemenkeu.go.id. \nCatatan: Konfirmasi persetujuan/penolakan permohonan reset password user SIMPONI akan disampaikan melalui email dalam waktu 5 (lima) hari kerja sejak formulir diterima secara lengkap.',
        link:'http://bit.ly/formulirsimponi'
      },
      {
        title: 'Lupa password pada aplikasi SIMPONI ?',
        content:'Jika mengalami lupa password aplikasi SIMPONI, pengguna dapat menggunakan fasilitas “Lupa kata Sandi”. Berikut langkah-langkah untuk melakukan reset password tersebut. \n1. Klik tombol Lupa Kata Sandi?  \n2. Isi kolom Alamat E-mail Anda dengan alamat email yang digunakan untuk registrasi.  \n3. Klik Kirim Kata Sandi Baru. \n4. Buka kotak masuk pada alamat email terdaftar dan klik email reset password.  \n5. Silakan masukan password baru.  \n6. Login kembali dengan password',
      },
      {
        title: 'Kendala tidak bisa cetak, buat/simpan billing pada aplikasi SIMPONI ?',
        content:'Jika mengalami kendala tidak bisa cetak, buat/simpan billing pada aplikasi SIMPONI, pengguna dapat melakukan hal-hal berikut.\n1. Memastikan koneksi/jaringan internet berfungsi dengan baik.\n2. Menggunakan perangkat/browser lain.\n3. Memastikan nama wajib bayar maksimal 50 karakter.\n4. Memastikan kolom keterangan maksimal 200 karakter.\n5. Memastikan kolom yang diisi tidak mengandung karakter special character, seperti apostrof, tanda penguhubung, garis miring, dan sebagainya.',
      },
      {
        title: 'Koreksi data Penerimaan Negara Bukan Pajak (PNBP) ?',
        content:'Koreksi data Penerimaan Negara Bukan Pajak (PNBP) mengacu pada Pasal 39 Peraturan Direktur Jenderal Anggaran Nomor PER-5/AG/2017 tentang Tata Cara Pembayaran/Penyetoran PNBP dan Penerimaan Negara Lainnya Secara Elektronik. Unit yang berwenang melakukan koreksi data PNBP, yaitu sebagai berikut.\n1. Direktorat Penerimaan Negara Bukan Pajak untuk elemen data transaksi PNBP berupa nama wajib bayar, lokasi Sumber Daya Alam (SDA) dan/atau jenis penerimaan, serta koreksi pada kolom keterangan.\n2. Kantor Pelayanan Perbendaharaan Negara (KPPN) atau Direktorat Pengelolaan Kas Negara untuk elemen data transaksi PNBP dan/atau penerimaan negara lainnya berupa kode K/L, unit, satuan kerja, akun penerimaan, akun belanja, program, kegiatan, lokasi satuan kerja, dan/atau output.',
      },
      {
        title: 'Pengembalian Penerimaan Negara Bukan Pajak (PNBP) akibat salah setor ?',
        content:'Pengembalian Penerimaan Negara Bukan Pajak (PNBP) akibat salah setor dapat dilakukan dengan cara Wajib Bayar/Bank Persepsi/Kantor Pos menyampaikan permintaan pengembalian PNBP kepada Kuasa Pengguna Anggaran (KPA) dengan melampirkan bukti penerimaan negara dan hasil copy bukti kepemilikan rekening tujuan sebagaimana mengacu pada Peraturan Menteri Keuangan Nomor 96/PMK.05/2017 tentang Tata Cara Pembayaran atas Transaksi Pengembalian Penerimaan Negara.',
      },
      {
        title: 'Apa itu menu SiMandra ?',
        content:'Aplikasi yang memuat data dan informasi mengenai rancangan regulasi jenis dan tarif PNBP yang sedang dilayani oleh Direktorat Jenderal Anggaran',
      },
      {
        title: 'Bagaimana mendapatkan user password SiMandra ?',
        content:'Untuk memperoleh user password, dapat ditanyakan kepada mitra Bapak / Ibu di DJA',
      },
      {
        title: 'Apa itu menu NonaVira ?',
        content:'sistem informasi yang berjalan di platform aplikasi whatsapp yang befungsi untuk Chatbot sebagai sarana mendapatkan informasi, pengetahuan dan peraturan mengenai PNBP',
      },
      {
        title: 'Apakah ada faq selengkapnya ?',
        content:'https://kemenkeupedia.kemenkeu.go.id/',
        link:'https://kemenkeupedia.kemenkeu.go.id/'
      },

    ]);
    return (
      <View style={{flex:1, backgroundColor:'white'}}>
        <StatusBar backgroundColor={theme.colors.simandra} />
        <ScrollView style={{ flex: 1, backgroundColor: 'white',}} showsVerticalScrollIndicator={false}>
          <RenderHeader navigation={navigation}/>     
          <Input  
            placeholder='Cari Pertanyaan'
            leftIcon={
            <Icon
            name='search'
            size={18}
            color="black"
            type='material'
            
            />
            }
            containerStyle={{ height:50, marginBottom:5}}
            inputStyle={{fontSize:14, fontStyle: 'italic', paddingBottom:0}}
            leftIconContainerStyle={{marginBottom:0}}
            inputContainerStyle={{borderBottomColor:theme.colors.simandra}}
            onChangeText={value => setCari(value)}
        />
          {FaqScreen(faq, cari)}
        </ScrollView>
      </View>
    );

    
}

const styles = StyleSheet.create({

  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
    borderWidth:1
  },
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginTop:10
   
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },


});