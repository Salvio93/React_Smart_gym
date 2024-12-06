import React, { useEffect, useState } from 'react';
import { View,  Dimensions,Alert } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { LineChart,BarChart } from 'react-native-chart-kit';
import { fetchData } from './api_fetch'; 
import { Collapsible } from '@/components/Collapsible';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import {customStyle} from './style';
import { useLocalSearchParams } from 'expo-router';


export default function WeeklyScreen() {
  var { label, index, dataType, year, month } = useLocalSearchParams<{ label; index; dataType; year; month}>();
  const router = useRouter();

  const weekList = ['Week 1','Week 2','Week 3','Week 4','Week 5']
  const [chartData, setChartData] = useState({
    num_visits: {  data_page:0 ,labels: [], datasets: [{ data: [] }] },
    session_time: {  data_page:0 ,labels: [], datasets: [{ data: [] }] },
  });
  const [text, setText] = useState(`${weekList[index]} of ${month} - ${year}`); //to update text 


  const handleFetchData = async(direction : string, dataType: string, frequence='weekly') =>{

    
    try {
      if (direction==="current"){
          const current_data = await fetchData(dataType, frequence, year,month,index); 
          

          setChartData((prevData) => ({ 
            ...prevData,
            [dataType]: {
              data_page : index,
              labels: ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'],
              datasets: [{ data: current_data.data }],//fetch
            },
          }));
          setText(`${weekList[index]} - ${month} - ${year}`);


      }else{

        if ((chartData[dataType].data_page != 0 && direction==="previous") || (chartData[dataType].data_page != 4 && direction ==="next")){
          var newPage = direction === 'previous' ? chartData[dataType].data_page - 1 : chartData[dataType].data_page -0 +1; //to declare as int
            const newResp = await fetchData(dataType,frequence, year,month,newPage); 

            setChartData((prevData) => ({
              ...prevData,
              [dataType]: {
                data_page : newPage,
                labels: newResp.labels || prevData[dataType].labels,
                datasets: [{ data: newResp.data }],
              },
            }));
            
            setText(`${weekList[newPage]} - ${month} - ${year}`);

        }
      }
    } catch (error) {
      console.error(`Failed to fetch current data:`, error);
    }
    
  };
  const handleBarPressVisits = (label, index, dataType, year,month,week) => {
    router.push({
      pathname: '/daily_visits',
      params: { label, index, dataType,year,month,week }, //week[index]=lundi-dimanche
    });
  };
  const handleBarPressSession = (label, index, dataType, year,month,week) => {
    router.push({
      pathname: '/daily_session',
      params: { label, index, dataType,year,month,week }, //week[index]=lundi-dimanche
    });
  };


  useEffect(()=> {
    
    handleFetchData("current",dataType)

    const updatedStyles = { ...customStyle };
    updatedStyles.titleContainer = {
    ...updatedStyles.titleContainer,
    display: "flex",
    };
    styles = updatedStyles; // Reassign the updated styles

  },[dataType,index])
    
  


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="person" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title"> {text}</ThemedText>
      </ThemedView>

      <ThemedView style={[styles.titleContainer,{display: dataType=="num_visits" ? 'flex' : 'none'}]}>
        <ThemedText>Nombre de visites </ThemedText> 
        <View style={[styles.chartContainer, {left:-170, bottom:-50}]}>
        <ThemedText>
              <FontAwesome.Button
                name="chevron-left"
                backgroundColor="green"
                size={10}
                onPress={() => handleFetchData('previous', 'num_visits')} 
              ></FontAwesome.Button>
                  {'                                       '}

                  {'                                       '}
              <FontAwesome.Button
                name="chevron-right"
                backgroundColor="green"
                size={10}
                onPress={() => handleFetchData('next', 'num_visits')} 
              ></FontAwesome.Button>
            </ThemedText>
              
            <BarChart
              data={chartData.num_visits}
              width={Dimensions.get('window').width*0.95}
              height={300}
              fromZero
              chartConfig={{
                barPercentage: .68,
                backgroundGradientFrom: '#1E2923',
                backgroundGradientTo: '#08130D',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
            />
            <View style={styles.overlay}>

              {chartData.num_visits?.datasets?.[0]?.data?.length > 0 &&
                chartData.num_visits.labels?.length > 0 &&
              chartData.num_visits.datasets[0].data.map((value, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.barArea,
                    {
                      height:200,
                      top:50,
                      left: (index*0.85 * Dimensions.get('window').width*0.95) / chartData.num_visits.labels.length + 70,
                      width: Dimensions.get('window').width*0.95  / chartData.num_visits.labels.length ,
                    },
                  ]}
                  onPress={() => handleBarPressVisits(chartData.num_visits.labels[index], index,"num_visits",year,month,weekList[chartData.num_visits.data_page])}
                />
              ))}
            </View>
          </View>
      </ThemedView>

      
      

    <ThemedView style={[styles.titleContainer,{display: dataType=="session_time" ? 'flex' : 'none'}]}>
            <ThemedText>Temps de seance en moyenne</ThemedText> 

            <View style={[styles.chartContainer, {left:-230, bottom:-50}]}>
            <ThemedText>
                  <FontAwesome.Button
                    name="chevron-left"
                    backgroundColor="green"
                    size={10}
                    onPress={() => handleFetchData('previous', 'session_time')} 
                  ></FontAwesome.Button>
                  {'                                       '}

                  {'                                       '}
                  <FontAwesome.Button
                    name="chevron-right"
                    backgroundColor="green"
                    size={10}
                    onPress={() => handleFetchData('next', 'session_time')} 
                  ></FontAwesome.Button>
                </ThemedText>
                  
                <BarChart
                  data={chartData.session_time}
                  width={Dimensions.get('window').width*0.95}
                  height={300}
                  fromZero
                  chartConfig={{
                    barPercentage: .68,
                    backgroundGradientFrom: '#1E2923',
                    backgroundGradientTo: '#08130D',
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  }}
                />
                <View style={styles.overlay}>

                  {chartData.session_time?.datasets?.[0]?.data?.length > 0 &&
                    chartData.session_time.labels?.length > 0 &&
                  chartData.session_time.datasets[0].data.map((value, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.barArea,
                        {
                          height:200,
                          top:50,
                          left: (index*0.85 * Dimensions.get('window').width*0.95) / chartData.session_time.labels.length + 70,
                          width: Dimensions.get('window').width*0.95  / chartData.session_time.labels.length ,
                        },
                      ]}
                      onPress={() => handleBarPressSession(chartData.session_time.labels[index], index,"session_time",year,month, weekList[chartData.session_time.data_page])}
                    />
                  ))}
                </View>
              </View>
          </ThemedView>




    </ParallaxScrollView>
  );
}

/*
      <ThemedView style={[styles.titleContainer,{display: dataType=="pause_time" ? 'flex' : 'none'}]}>
        <ThemedText>Temps de pause moyen par seance</ThemedText> 
        <View style={[styles.chartContainer, {left:-290, bottom:-50}]}>
        <ThemedText>
              <FontAwesome.Button
                name="chevron-left"
                backgroundColor="green"
                size={10}
                onPress={() => handleFetchData('previous', 'pause_time')} 
              ></FontAwesome.Button>
              {'               '}
              <View style={styles.legendContainer}><ThemedText> {text} </ThemedText></View>

              {'                  '}
              <FontAwesome.Button
                name="chevron-right"
                backgroundColor="green"
                size={10}
                onPress={() => handleFetchData('next', 'pause_time')} 
              ></FontAwesome.Button>
            </ThemedText>
              
            <BarChart
              data={chartData.pause_time}
              width={Dimensions.get('window').width*0.95}
              height={300}
              fromZero
              chartConfig={{
                barPercentage: .68,
                backgroundGradientFrom: '#1E2923',
                backgroundGradientTo: '#08130D',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
            />
            <View style={styles.overlay}>

              {chartData.pause_time?.datasets?.[0]?.data?.length > 0 &&
                chartData.pause_time.labels?.length > 0 &&
              chartData.pause_time.datasets[0].data.map((value, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.barArea,
                    {
                      height:200,
                      top:50,
                      left: (index*0.85 * Dimensions.get('window').width*0.95) / chartData.pause_time.labels.length + 70,
                      width: Dimensions.get('window').width*0.95  / chartData.pause_time.labels.length ,
                    },
                  ]}
                  onPress={() => handleBarPress(chartData.pause_time.labels[index], index,"pause_time",year,month,weekList[chartData.pause_time.data_page])}
                />
              ))}
            </View>
          </View>
      </ThemedView>
 */
      
      
var styles = customStyle;
