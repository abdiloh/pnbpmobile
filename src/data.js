import React , { useCallback, useState } from 'react';
import {
  StyleSheet,
  Text,
  View, processColor, StatusBar, ScrollView} from 'react-native';
import { theme } from './styles/constants';
import {BarChart, PieChart} from 'react-native-charts-wrapper';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-elements';
import {  TextHeader } from './styles/common'
import {Placeholder,
  PlaceholderLine,
  ShineOverlay
} from "rn-placeholder";
import { useFocusEffect } from '@react-navigation/native';

RenderHeader = (props)=>{ 
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
          <Text style={{fontSize:18, fontFamily:'Poppins-SemiBold', color:theme.colors.white}}>Data PNBP</Text>
          </View>
        <View flex={1}>

        </View>
        </View>
        </LinearGradient>
  )
}

const CustomPlaceholder = ()=>{
  return(
    <Placeholder
    style={styles.chart}
    Animation={ShineOverlay}
  >
    <PlaceholderLine height={(heightPercentageToDP('90')-78)/2} style={{borderRadius:6}} />
    
  </Placeholder>
  )
}

const Targetrealisasi = ()=>{
  const [state, setState] = useState('');

  useFocusEffect(
    useCallback(() => {
    let isActive = true;
    const infoTargetRealisasi = async () => {
     
      try {
      
      
       const response = await fetch('https://621831981a1ba20cba9ab3c0.mockapi.io/pnbpmobile');
       const json = await response.json();
      //  console.log()
        target = json[0].target==null ? 0 : parseInt(json[0].target)
        realisasi = json[0].realisasi==null ? 0 : parseInt(json[0].realisasi)
       const data = {
        legend: {
          enabled: true,
          textSize: 11,
          form: "CIRCLE",
          formSize: 11,
          xEntrySpace: 10,
          yEntrySpace: 5,
          wordWrapEnabled: false,
          drawInside:false
        },
        // grafik tidak berubah hanya angka yang berubah
        data: {
          dataSets: [{
            values: [260, 275, 378, 294, 298, target],
            label: 'Target',
            config: {
              drawValues: true,
              colors: [processColor('#F5B850')],
              valueTextSize:11,
              
            }
          }, {
            values: [311, 409, 407, 341, 453, realisasi],
            label: 'Realisasi',
            config: {
              drawValues: true,
              colors: [processColor('#5BF550')],
              valueTextSize:11,
            }
          }],
          config: {
            barWidth: 0.2,
            group: {
              fromX: 0,
              groupSpace: 0.4,
              barSpace: 0.1,
            },         
            barShadowColor: processColor('lightgrey'),
          }
        },
        xAxis: {
          valueFormatter: ['2017', '2018', '2019', '2020', '2021', '2022'],
          granularityEnabled: true,
          granularity: 1,
          axisMaximum: 6,
          axisMinimum: 0,
          centerAxisLabels: true,
          drawGridLines:false,
          position:'BOTTOM',
        },
        yAxis: {
          left: {
          //   drawLabels: false,
          //   drawAxisLine: false,
          //   drawGridLines: false,
            zeroLine: {
              enabled: false,
              lineWidth: 1.5
            }
          },
          right: {
            enabled: false
          }
      },
        marker: {
          enabled: true,
          markerColor: processColor(theme.colors.secondary),
          textColor: processColor(theme.colors.white),
          markerFontSize: 14,
        },
    
       }
    //   console.log(databaru)
    if(isActive){
      setState(data)
    }
      
     
     } catch (error) {
       alert(error);
     } 
   }
   if(isActive){
    infoTargetRealisasi()
   }
    return () => {

      isActive = false;
    };
  },[])
  )
  return (
      <View style={[styles.container,{padding:8, backgroundColor:theme.colors.white, borderRadius:10, marginHorizontal:6, marginVertical:6}]}>
      <TextHeader style={{ color: theme.colors.black, fontFamily: 'Poppins-SemiBold', fontSize: 12, paddingBottom:6 }}>
      Target dan Realisasi PNBP
      </TextHeader>
      {state.data ? <BarChart
          style={styles.chart}
          xAxis={state.xAxis}
          yAxis={state.yAxis}
          data={state.data}
          legend={state.legend}
          drawValueAboveBar={true}
          visibleRange={{x: { max: 6 }}}
          marker={state.marker}
          chartBackgroundColor={processColor('#eaf8ff')}
          chartDescription={{text: 'Dalam Triliun Rupiah',
          textSize: 8,
          textColor: processColor('black'),
          // positionX:widthPercentageToDP('55%'),
          // positionY:heightPercentageToDP('5%')
          }}
        />    :
          <CustomPlaceholder />
        }
      </View>
  );
}

const Targetlayanan = () =>{
  const [state, setState] = useState({legend: {
    enabled: true,
    textSize: 15,
    form: 'CIRCLE',
    horizontalAlignment: "RIGHT",
    verticalAlignment: "CENTER",
    orientation: "VERTICAL",
    wordWrapEnabled: true
  },
  data: {
    dataSets: [{
      values: [
        {value: 78.79, label: 'BLU'},
        {value: 121.95, label: 'SDA'},
        {value: 37, label: 'KND'},
        {value: 97.8, label: 'PNBP Lainnya'}],
      label: '',
      config: {
        colors: [processColor('#5BF550'), processColor('#FFF78C'), processColor('#F5B850'), processColor('#8CEAFF')],
        valueTextSize: 10,
        valueTextColor: processColor(theme.colors.black),
        sliceSpace: 5,
        selectionShift: 13,
        // xValuePosition: "OUTSIDE_SLICE",
        // yValuePosition: "OUTSIDE_SLICE",
        // valueFormatter: "#.#'%'",
        valueLineColor: processColor('green'),
        valueLinePart1Length: 0.5
      }
    }],
  },
  highlights: [{x:1}],
  description: {
    text: 'Dalam Triliun Rupiah',
    textSize: 11,
    textColor: processColor('black'),
    // positionX: 700,
    // positionY:400
  }
});

  return (
   

      <View style={[styles.container,{padding:8, backgroundColor:theme.colors.white, borderRadius:10, marginHorizontal:6, marginBottom:6}]}>
      <TextHeader style={{ color: theme.colors.black, fontFamily: 'Poppins-SemiBold', fontSize: 12, paddingBottom:6 }}>
          Target per Layanan PNBP Tahun 2022
          </TextHeader>
          <PieChart
            style={{height:250}}
            logEnabled={true}
            chartBackgroundColor={processColor('white')}
            chartDescription={state.description}
            data={state.data}
            legend={state.legend}
            highlights={state.highlights}
            // extraOffsets={{left: 5, top: 5, right: 5, bottom: 5}}
            entryLabelColor={processColor(theme.colors.black)}
            entryLabelTextSize={8}
            // entryLabelFontFamily={'HelveticaNeue-Medium'}
            drawEntryLabels={true}
            rotationEnabled={true}
            rotationAngle={45}
            // usePercentValues={true}
            // styledCenterText={{text:'Pie center text!', color: processColor(), fontFamily: 'HelveticaNeue-Medium', size: 20}}
            centerTextRadiusPercent={100}
            holeRadius={40}
            holeColor={processColor('#f0f0f0')}
            transparentCircleRadius={45}
            transparentCircleColor={processColor('#f0f0f088')}
            maxAngle={360}
            // onSelect={this.handleSelect.bind(this)}
            // onChange={(event) => console.log(event.nativeEvent)}
          />
      
          
      </View>

  
  );
}

export default ChartPNBP =({navigation})=> {
  
  return (
    <View style={{flex:1}}>
      <StatusBar backgroundColor={theme.colors.simandra} />
      <ScrollView style={{ flex: 1}} showsVerticalScrollIndicator={false}>
        <RenderHeader navigation={navigation}/>     
        <Targetrealisasi />
        <Targetlayanan />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  chart: {
    height:(heightPercentageToDP('90')-78)/2,
    // width:widthPercentageToDP('90%'),
    paddingBottom:10
  }
});




