import React, { useState }  from 'react'
import { View, StyleSheet, TouchableOpacity, Text,StatusBar, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from './styles/constants';
import { Icon,Image, Input  } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RFPercentage } from "react-native-responsive-fontsize";

function renderHeader({navigation}){
    return(
        <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0.1, 0.9]}
        colors={[theme.colors.secondary , theme.colors.simandra]}style={{ backgroundColor: theme.colors.primary, height: 60, marginBottom: 10, paddingTop:20, justifyContent:'center', alignItems:'center', elevation:20 }}>
          <View flex={1} style={{ flexDirection:'row', }}>
          <View flex={1}>
            <View style={{ position: 'absolute', left:10}}>

              <Icon name={'arrow-left-circle'} type={'feather'} color={theme.colors.white} onPress={()=>{navigation.navigate('Home')}}/>
            </View>
          </View>

            <View >
            <Text style={{fontSize:18, fontFamily:'Poppins-SemiBold', color:'white'}}>Standar Pelayanan PNBP</Text>
            </View>
          <View flex={1}>
  
          </View>
          </View>
          </LinearGradient>
    )
}



function klikDetailPeraturan({navigation}, data){
  navigation.navigate('DetailPeraturan', {linkperaturan : data.link, tentang: data.about, judul:data.title, jenis:data.jenis })
}

const standar = ({navigation,standarpelayanan,cari}) => {
  if(cari!=""){
    standarpelayanan = standarpelayanan.filter(item => item.title.toLowerCase().indexOf(cari.toLowerCase()) >= 0)
  }
  
  if(standarpelayanan.length > 0){
    return standarpelayanan.map((data, index)=>{
      // const cekDirektorat = data.jenis=='pnbpkl'?true:false
      cekDirektorat = true
      return(
        <View key={index}>
      
        {cekDirektorat?
        <View style={styles.container} >
       
          <TouchableOpacity onPress={()=>{klikDetailPeraturan({navigation},data)}} style={{  flexDirection:'row', backgroundColor:'white', elevation:3, borderRadius:10, borderWidth:1, borderColor:theme.colors.gray2 }}>
            <View style={{ padding: 10, flex:10 }}>
            <Text style={{ fontSize: RFPercentage(1.6),  color:theme.colors.text, textAlign:'justify', textAlignVertical:'center' }}>{data.title}</Text>
            {/* <Text style={{fontSize:RFPercentage(1.8), color:theme.colors.secondary, fontFamily: "Poppins-Medium",}}>{data.about}</Text> */}
            </View>
            <View style={{ flex:2, borderLeftWidth:1, borderLeftColor: theme.colors.gray2, marginVertical:6, justifyContent:'center', alignItems:'center' }}>
            <Image style={{width: wp('10%'), height: hp("5%")}} source={require('./images/pdf.png')} />
              
            </View>
          </TouchableOpacity>
        </View> :
        null
        }
        </View>
      )
    })
  }else{
    return(
      <View style={styles.container} >
      <TouchableOpacity style={{  flexDirection:'row', backgroundColor:'white', elevation:3, borderRadius:10, borderWidth:1, borderColor:theme.colors.gray2 }}>

      <View style={{ padding: 10, flex:10, alignItems:'center' }}>
      <Text style={{ fontSize: RFPercentage(1.6),  color:theme.colors.text, textAlign:'justify', textAlignVertical:'center' }}>Maaf, Pencarian Tidak Dapat Ditemukan</Text>

      </View>
      </TouchableOpacity>
      </View>
    )
  }

}

export default Standar =({navigation})=> {
  const [cari, setCari] = useState([]);
  const [standarpelayanan, setstandarpelayanan] =  useState([
    {
      title: 'Standar Pelayanan Penyusunan Konsep RPP/Revisi PP Tentang Jenis Dan Tarif Atas Jenis PNBP Yang Berlaku Pada Kementerian/Lembaga',
      about:'Penyusunan Konsep RPP/Revisi PP Tentang Jenis Dan Tarif Atas Jenis PNBP Yang Berlaku Pada Kementerian/Lembaga',
      jenis:'pnbpkl',
      link: 'https://firebasestorage.googleapis.com/v0/b/abdiamrulloh1995.appspot.com/o/RPP%20REVISI%20PP.pdf?alt=media&token=dacea8ae-08ee-452b-8cd4-e4d37c74f056'
    },
    {
      title: 'Standar Pelayanan Penyusunan Konsep Rancangan Peraturan Menteri Keuangan Tentang Jenis Dan Tarif Atas Jenis PNBP Yang Berlaku Pada Instansi Pengelola PNBP',
      about:'Penyusunan Konsep Rancangan Peraturan Menteri Keuangan Tentang Jenis Dan Tarif Atas Jenis PNBP Yang Berlaku Pada Instansi Pengelola PNBP',
      jenis:'pnbpkl',
      link: 'https://firebasestorage.googleapis.com/v0/b/abdiamrulloh1995.appspot.com/o/RPMK.pdf?alt=media&token=ff569bdf-0deb-4b4a-a8e0-3762f252be5b'
    },
    {
      title: 'Standar Pelayanan Persetujuan Atau Penolakan Penggunaan Dana PNBP',
      about:'Persetujuan Atau Penolakan Penggunaan Dana PNBP',
      jenis:'pnbpkl',
      link: 'https://firebasestorage.googleapis.com/v0/b/abdiamrulloh1995.appspot.com/o/PENGGUNAAN%20DANA%20PNBP.pdf?alt=media&token=4d7fbdaa-9cdc-4758-b7dc-5a50a86f3dc7'
    },
    {
      title: 'Standar Pelayanan Penyusunan Dan Penetapan (Target Dan Pagu Penggunaan PNBP) PNBP K/L Dan BUN',
      about:'Penyusunan Dan Penetapan (Target Dan Pagu Penggunaan PNBP) PNBP K/L Dan BUN',
      jenis:'pnbpkl',
      link: 'https://firebasestorage.googleapis.com/v0/b/abdiamrulloh1995.appspot.com/o/TARGET%20DAN%20PAGU%20PENGGUNAAN%20PNBP.pdf?alt=media&token=2f5838eb-d56a-4ce3-a952-86999a042059'
    },  
    {
      title: 'Standar Pelayanan Bimbingan Teknis Pengelolaan Penerimaan Negara Bukan Pajak (PNBP)',
      about:'Bimbingan Teknis Pengelolaan Penerimaan Negara Bukan Pajak (PNBP)',
      jenis:'pnbpkl',
      link: 'https://firebasestorage.googleapis.com/v0/b/abdiamrulloh1995.appspot.com/o/bimbingan%20teknis.pdf?alt=media&token=7cd81c23-f403-4fcb-b6f2-ed20611d4dcc'
    },
    
    {
      title: 'Standar Pelayanan Pembuatan Billing Pada Aplikasi Sistem Informasi Penerimaan Negara Bukan Pajak Online (Simponi)',
      about:'Pembuatan Billing Pada Aplikasi Sistem Informasi Penerimaan Negara Bukan Pajak Online (Simponi)',
      jenis:'pnbpkl',
      link: 'https://firebasestorage.googleapis.com/v0/b/abdiamrulloh1995.appspot.com/o/SIMPONI.pdf?alt=media&token=b6dd784f-6559-49b5-8421-f24ef59acda4'
    },
    {
      title: 'Standar Pelayanan Digitalisasi Pelaporan PNBP Pada Aplikasi Single Source Database Penerimaan Negara Bukan Pajak (SSD PNBP)',
      about:'Digitalisasi Pelaporan PNBP Pada Aplikasi Single Source Database Penerimaan Negara Bukan Pajak (SSD PNBP)',
      jenis:'pnbpkl',
      link: 'https://firebasestorage.googleapis.com/v0/b/abdiamrulloh1995.appspot.com/o/DIGITALISASI%20PELAPORAN%20SSD%20PNBP.pdf?alt=media&token=80968dab-c328-44b9-8f0d-0f2813a1d7b5'
    },
    {
      title: 'Standar Pelayanan Layanan Data/Informasi, Peraturan Dan Publikasi PNBP Pada Aplikasi Single Source Database Penerimaan Negara Bukan Pajak (SSD PNBP)',
      about:'Layanan Data/Informasi, Peraturan Dan Publikasi PNBP Pada Aplikasi Single Source Database Penerimaan Negara Bukan Pajak (SSD PNBP)',
      jenis:'pnbpkl',
      link: 'https://firebasestorage.googleapis.com/v0/b/abdiamrulloh1995.appspot.com/o/LAYANAN%20DATAINFORMASI%20SSD%20PNBP.pdf?alt=media&token=12a96d98-c182-4819-b238-d9dff7377ab9'
    },
    {
      title:'Standar Pelayanan Persetujuan Pengenaan Tarif PNBP Sampai Dengan Nol Rupiah Atau Nol Persen Pada Rancangan Peraturan Menteri/Pimpinan Lembaga Dengan Pertimbangan Tertentu',
      about:'Persetujuan Pengenaan Tarif PNBP Sampai Dengan Nol Rupiah Atau Nol Persen Pada Rancangan Peraturan Menteri/Pimpinan Lembaga Dengan Pertimbangan Tertentu',
      jenis:'pnbpkl',
      link: 'https://firebasestorage.googleapis.com/v0/b/abdiamrulloh1995.appspot.com/o/TARIF%20RP%200%20S.D%200%25.pdf?alt=media&token=0594dc26-570e-4470-9018-1a12d467e1e7'
    },
    {
      title:'Standar Pelayanan Penyelesaian Kewajiban Pemerintah : Pemindahbukuan Pajak Bumi dan Bangunan (PBB) dari Kegiatan Usaha Panas Bumi',
      about:'Penyelesaian Kewajiban Pemerintah : Pemindahbukuan Pajak Bumi dan Bangunan (PBB) dari Kegiatan Usaha Panas Bumi',
      jenis:'pnbpkl',
      link: 'https://firebasestorage.googleapis.com/v0/b/abdiamrulloh1995.appspot.com/o/Standar%20Pelayanan%20SDA%20KND-1-2.pdf?alt=media&token=b3e9729f-527f-4031-a9af-fecc91d4e4dd'
    },
    {
      title:'Standar Pelayanan Mekanisme Kebijakan Perhitungan PNBP Panas Bumi (Existing) Dan Pencadangan Saldo Kas Pada Rekening Panas Bumi',
      about:'Standar Pelayanan Mekanisme Kebijakan Perhitungan PNBP Panas Bumi (Existing) Dan Pencadangan Saldo Kas Pada Rekening Panas Bumi',
      jenis:'pnbpkl',
      link: 'https://firebasestorage.googleapis.com/v0/b/abdiamrulloh1995.appspot.com/o/Standar%20Pelayanan%20SDA%20KND-3-4.pdf?alt=media&token=94e94017-4371-4d17-bdb1-2a1db1e21eed'
    },
    {
      title:'Standar Pelayanan Monitoring Dan Evaluasi Laporan Pertanggungjawaban Penggunaan Dana Subsidi Listrik',
      about:'Monitoring Dan Evaluasi Laporan Pertanggungjawaban Penggunaan Dana Subsidi Listrik',
      jenis:'pnbpkl',
      link: 'https://firebasestorage.googleapis.com/v0/b/abdiamrulloh1995.appspot.com/o/Standar%20Pelayanan%20SDA%20KND-5-6.pdf?alt=media&token=9d8789a2-31e3-49f2-b8ad-59bdb83ffd69'
    },
    {
      title:'Standar Pelayanan Monitoring Dan Evaluasi Laporan Realisasi Parameter Subsidi Listrik (Laporan Triwulanan)',
      about:'Monitoring Dan Evaluasi Laporan Realisasi Parameter Subsidi Listrik (Laporan Triwulanan)',
      jenis:'pnbpkl',
      link: 'https://firebasestorage.googleapis.com/v0/b/abdiamrulloh1995.appspot.com/o/Standar%20Pelayanan%20SDA%20KND-7-8.pdf?alt=media&token=585dd138-534b-47f3-9817-9203ce6f599f'
    },
    {
      title:'Standar Pelayanan Pembayaran Kembali (Reimbursement) PPN KKKS Dalam Kegiatan Usaha Hulu Minyak dan Gas Bumi',
      about:'Pembayaran Kembali (Reimbursement) PPN KKKS Dalam Kegiatan Usaha Hulu Minyak dan Gas Bumi',
      jenis:'pnbpkl',
      link: 'https://firebasestorage.googleapis.com/v0/b/abdiamrulloh1995.appspot.com/o/Standar%20Pelayanan%20SDA%20KND-9-10.pdf?alt=media&token=edec492e-e13c-4723-a4f1-4de8c4838b20'
    },
    {
      title:'Standar Pelayanan Penagihan Denda Keterlambatan Dan / Atau Kekurangan Penyetoran Bagian Pemerintah Dari Kegiatan Usaha Panas Bumi',
      about:'Penagihan Denda Keterlambatan Dan / Atau Kekurangan Penyetoran Bagian Pemerintah Dari Kegiatan Usaha Panas Bumi',
      jenis:'pnbpkl',
      link: 'https://firebasestorage.googleapis.com/v0/b/abdiamrulloh1995.appspot.com/o/Standar%20Pelayanan%20SDA%20KND-11-12.pdf?alt=media&token=6cc732ef-65ce-4bf5-9cab-8ea70d93d6ea'
    },
    {
      title:'Standar Pelayanan Penyelesaian Kewajiban Pemerintah : Pembayaran Kembali (Reimbursement) Pajak Pertambahan Nilai (PPN) Panas Bumi',
      about:'Penyelesaian Kewajiban Pemerintah : Pembayaran Kembali (Reimbursement) Pajak Pertambahan Nilai (PPN) Panas Bumi',
      jenis:'pnbpkl',
      link: 'https://firebasestorage.googleapis.com/v0/b/abdiamrulloh1995.appspot.com/o/Standar%20Pelayanan%20SDA%20KND-13-14.pdf?alt=media&token=d1c7fb20-3f6f-4548-835d-576202121d20'
    },
    {
      title:'Standar Pelayanan Penyelesaian Kewajiban Pemerintah Pengganti Bonus Produksi Panas Bumi ',
      about:'Penyelesaian Kewajiban Pemerintah Pengganti Bonus Produksi Panas Bumi ',
      jenis:'pnbpkl',
      link: 'https://firebasestorage.googleapis.com/v0/b/abdiamrulloh1995.appspot.com/o/Standar%20Pelayanan%20SDA%20KND-15-16.pdf?alt=media&token=2442f6d6-3357-48a2-8223-2a682bed5373'
    },
    {
      title:'Standar Pelayanan Penyelesaian Permintaan Pembayaran Imbalan (Fee) Penjualan Migas Bagian Negara Kepada Penjual Minyak Dan/Atau Gas Bumi Bagian Negara',
      about:'Penyelesaian Permintaan Pembayaran Imbalan (Fee) Penjualan Migas Bagian Negara Kepada Penjual Minyak Dan/Atau Gas Bumi Bagian Negara',
      jenis:'pnbpkl',
      link: 'https://firebasestorage.googleapis.com/v0/b/abdiamrulloh1995.appspot.com/o/Standar%20Pelayanan%20SDA%20KND-17-18.pdf?alt=media&token=c5797754-1686-4546-995a-e924b6173c38'
    },
    {
      title:'Standar Pelayanan Pembayaran Kembali (Reimbursement) PPN KKKS Dalam Kegiatan Usaha Hulu Minyak Dan Gas Bumi',
      about:'Pembayaran Kembali (Reimbursement) PPN KKKS Dalam Kegiatan Usaha Hulu Minyak Dan Gas Bumi',
      jenis:'pnbpkl',
      link: 'https://firebasestorage.googleapis.com/v0/b/abdiamrulloh1995.appspot.com/o/Standar%20Pelayanan%20SDA%20KND-19-20.pdf?alt=media&token=abe83739-09da-43fc-a3f4-bcf9618dc614'
    },
    {
      title:'Standar Pelayanan Reklasifikasi Akun Pendapatan Minyak Mentah DMO Domestic Market Obligation (DMO)',
      about:'Reklasifikasi Akun Pendapatan Minyak Mentah DMO Domestic Market Obligation (DMO)',
      jenis:'pnbpkl',
      link: 'https://firebasestorage.googleapis.com/v0/b/abdiamrulloh1995.appspot.com/o/Standar%20Pelayanan%20SDA%20KND-21-22.pdf?alt=media&token=4ac54d0d-0669-47ad-b767-b700bb7305b3'
    },
    {
      title:'Standar Pelayanan Penyelesaian Permintaan Pembayaran Domestic Market Obligation DMO Domestic Market Obligation (DMO)',
      about:'Penyelesaian Permintaan Pembayaran Domestic Market Obligation DMO Domestic Market Obligation (DMO)',
      jenis:'pnbpkl',
      link: 'https://firebasestorage.googleapis.com/v0/b/abdiamrulloh1995.appspot.com/o/Standar%20Pelayanan%20SDA%20KND-23-24.pdf?alt=media&token=7294c1b2-ea20-470b-81fd-5109f272f884'
    },
    {
      title:'Standar Pelayanan Penyelesaian Permintaan Pembayaran Imbalan (Fee) Penjualan Migas Bagian Negara Kepada Penjual Minyak Dan/Atau Gas Bumi Bagian Negara',
      about:'Penyelesaian Permintaan Pembayaran Imbalan (Fee) Penjualan Migas Bagian Negara Kepada Penjual Minyak Dan/Atau Gas Bumi Bagian Negara',
      jenis:'pnbpkl',
      link: 'https://firebasestorage.googleapis.com/v0/b/abdiamrulloh1995.appspot.com/o/Standar%20Pelayanan%20SDA%20KND-25-26.pdf?alt=media&token=479974c6-073e-4911-ae3f-c67433850217'
    },
    {
      title:'Standar Pelayanan Tindak Lanjut Laporan Hasil Audit BPKP Atas Pemenuhan Kewajaran Setoran Bagian Pemerintah Di Sektor Panas Bumi',
      about:'Tindak Lanjut Laporan Hasil Audit BPKP Atas Pemenuhan Kewajaran Setoran Bagian Pemerintah Di Sektor Panas Bumi',
      jenis:'pnbpkl',
      link: 'https://firebasestorage.googleapis.com/v0/b/abdiamrulloh1995.appspot.com/o/Standar%20Pelayanan%20SDA%20KND-27-28.pdf?alt=media&token=55738463-896c-46d5-b642-8ea26b6c0a5c'
    },
    {
      title:'Standar Pelayanan Penyusunan Indikasi Kebutuhan Dana Subsidi Listrik',
      about:'Penyusunan Indikasi Kebutuhan Dana Subsidi Listrik',
      jenis:'pnbpkl',
      link: 'https://firebasestorage.googleapis.com/v0/b/abdiamrulloh1995.appspot.com/o/Standar%20Pelayanan%20SDA%20KND-29-30.pdf?alt=media&token=c0d867e7-29d6-413a-9c9c-267edf42fd8f'
    },
    {
      title:'Standar Pelayanan Penyusunan Rencana Dan Realisasi Penerimaan Negara Bukan Pajak Kegiatan Usaha Panas Bumi',
      about:'Penyusunan Rencana Dan Realisasi Penerimaan Negara Bukan Pajak Kegiatan Usaha Panas Bumi',
      jenis:'pnbpkl',
      link: 'https://firebasestorage.googleapis.com/v0/b/abdiamrulloh1995.appspot.com/o/Standar%20Pelayanan%20SDA%20KND-31-32.pdf?alt=media&token=10864c28-cef2-40d7-b5f8-77d572cc4b51'
    },
    {
      title:'Standar Pelayanan Penyusunan Rencana Kerja Anggaran (Rka) Subsidi Listrik Berdasarkan Pagu Anggaran',
      about:'Penyusunan Rencana Kerja Anggaran (Rka) Subsidi Listrik Berdasarkan Pagu Anggaran',
      jenis:'pnbpkl',
      link: 'https://firebasestorage.googleapis.com/v0/b/abdiamrulloh1995.appspot.com/o/Standar%20Pelayanan%20SDA%20KND-33-34.pdf?alt=media&token=275d114b-a1bb-4a89-bb46-df15479de1f6'
    },
    {
      title:'Standar Pelayanan Penyusunan Rencana Kerja Anggaran (RKA) Subsidi Listrik Berdasarkan Pagu Alokasi Anggaran',
      about:'Penyusunan Rencana Kerja Anggaran (RKA) Subsidi Listrik Berdasarkan Pagu Alokasi Anggaran',
      jenis:'pnbpkl',
      link: 'https://firebasestorage.googleapis.com/v0/b/abdiamrulloh1995.appspot.com/o/Standar%20Pelayanan%20SDA%20KND-35-36.pdf?alt=media&token=d3a73eca-01a4-4d81-b1ae-47552b9fcf84'
    },
    {
      title:'Standar Pelayanan Permintaan Pemutakhiran Data Rencana Setoran Bagian Pemerintah, Rencana Pengembalian (Reimbursement) Pajak Pertambahan Nilai (PPN), Rencana Penggantian Bonus Produksi dan Rencana Pembayaran Pajak Bumi Dan Bangunan (PBB) Dari Kegiatan Usaha Panas Bumi ',
      about:'Permintaan Pemutakhiran Data Rencana Setoran Bagian Pemerintah, Rencana Pengembalian (Reimbursement) Pajak Pertambahan Nilai (PPN), Rencana Penggantian Bonus Produksi dan Rencana Pembayaran Pajak Bumi Dan Bangunan (PBB) Dari Kegiatan Usaha Panas Bumi ',
      jenis:'pnbpkl',
      link: 'https://firebasestorage.googleapis.com/v0/b/abdiamrulloh1995.appspot.com/o/Standar%20Pelayanan%20SDA%20KND-37-38.pdf?alt=media&token=8feeae28-25f3-4ed8-a151-27c3f41212dc'
    },
    {
      title:'Standar Pelayanan Permintaan Penyampaian Laporan Perhitungan dan Pelaporan Pelaksanaan Penyetoran Bagian Pemerintah Dari Kegiatan Usaha Panas Bumi',
      about:'Permintaan Penyampaian Laporan Perhitungan dan Pelaporan Pelaksanaan Penyetoran Bagian Pemerintah Dari Kegiatan Usaha Panas Bumi',
      jenis:'pnbpkl',
      link: 'https://firebasestorage.googleapis.com/v0/b/abdiamrulloh1995.appspot.com/o/Standar%20Pelayanan%20SDA%20KND-39-40.pdf?alt=media&token=b2f2aef3-aa19-4d82-bfd7-13a76279c271'
    },
    {
      title:'Standar Pelayanan Reklasifikasi Akun Pendapatan Minyak Mentah DMO Domestic Market Obligation (DMO)',
      about:'Reklasifikasi Akun Pendapatan Minyak Mentah DMO Domestic Market Obligation (DMO)',
      jenis:'pnbpkl',
      link: 'https://firebasestorage.googleapis.com/v0/b/abdiamrulloh1995.appspot.com/o/Standar%20Pelayanan%20SDA%20KND-41-42.pdf?alt=media&token=65bc5d5a-d28a-4158-8dac-08804f6f0aad'
    }
  ]);
    return (
        <View style={{ flex: 1 }}>
        <StatusBar backgroundColor={theme.colors.simandra} />
        <ScrollView style={styles.safe} showsVerticalScrollIndicator={false}>
        {renderHeader({navigation})}
        <Text style={styles.sectionHeader}>Standar Pelayanan PNBP di DJA</Text>
        <View style={{paddingBottom:5}}>
          <Input  
           placeholder='Cari Standar Layanan'
           leftIcon={
          <Icon
            name='search'
            size={18}
            color="black"
            type='material'
            
          />
          }
          containerStyle={{ height:50}}
          inputStyle={{fontSize:14, fontStyle: 'italic', paddingBottom:0}}
          leftIconContainerStyle={{marginBottom:0}}
          inputContainerStyle={{borderBottomColor:theme.colors.simandra}}
          onChangeText={value => setCari(value)}
        />
        {standar({navigation,standarpelayanan, cari})}
        </View>
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