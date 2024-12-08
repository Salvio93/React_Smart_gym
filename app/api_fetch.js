import axios from 'axios';

export const fetchData = async (dataType, frequence,year=0,month=0,week=0,day=0) => {
  const monthList = ['Janvier', 'Fevier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre']
  const weekList = ['Week 1','Week 2','Week 3','Week 4','Week 5']
  const dayList =  ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche']
  
  try {
    console.log(dataType,frequence,year,month,week,day)
    if (dataType == "air_quality"){
      const response = {
        env_data: {
          temperature: 22,
          humidity: 80,
          particulate: 50
        }
      }/*
        const response = await axios.get('http://10.42.0.1:9000/api/air_quality', { 
          params: {},
        });*/

      return response;
    }

    if (dataType=="num_visits"){
      if (frequence=="yearly"){
        var date = year+"-"+month+"-"+day+"T00:00:00"
        const response = {
          num_visits_year : {
            year : year,
            year_count : 250,
            monthly_count : [year-2000,20,21,22,23,2,24,2,25,2,26,20]
          }
        }/*
        const response = await axios.get('http://10.42.0.1:9000/api/number_of_sessions', { //10.42.0.1 for android
          params: { Frequency : frequence, UserID:0 , Date : date},
        });*/
        return response; 

      }
      if (frequence=="monthly"){
        var search_month = month-1 + 2;
        var date = year+"-"+search_month+"-"+day+"T00:00:00"

        const response = {
          num_visits_month : {
            year : 2024,
            month : 12,
            month_count : 12,
            weekly_count : [search_month,4,2,2,4]
        
          }
        } /*
       const response = await axios.get('http://10.42.0.1:9000/api/number_of_sessions', { 
          params: { frequence, UserID : 0, date },
        });*/
        return response; 

      }
      if (frequence=="weekly"){
        var search_month = monthList.indexOf(month) + 1;
        var search_week = 1 + (week*7);
        var date = year+"-"+search_month+"-"+search_week+"T00:00:00"
        
        const response = {
          num_visits_week : {
            year : 2024,
            month : 12, 
            week : 2,
            week_count : 4,
            daily_count : [search_month,search_week,1,0,2,1,0]
        
          }
        }/*
        const response =  await axios.get('http://10.42.0.1:9000/api/number_of_sessions', {
          params: {  frequence, UserID :0 , date },
        });*/
        return response; 

      }
      if (frequence=="daily"){
        console.log("-------------------------------------------")
        var search_month = monthList.indexOf(month) + 1;
        var search_day =  day-1+2 + (7*(weekList.indexOf(week)));
        var date = year+"-"+search_month+"-"+search_day+"T00:00:00"

        const response = {
          exo_time_day: {
            year: year,
            month: search_month,
            day: search_day,
            day_avg: "15min+20min / 2 sessions",
            sessions: [
              {
                session_duration: "session.endDate - session.beginDate",
                env_data: {
                  temperature: 20,
                  humidity: 10,
                  particulate: 15
                },
                sets: [
                  {
                    weight: 20,
                    rep: 12,
                    set_time: "set.endDate - set.beginDate",
                    distance: [0,3,5,5,6,7,8,6,5,2,0,0,0,0,2,5,5,5],
                    times: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18']
                  },
                  {
                    weight: 25,
                    rep: 10,
                    set_time: "set.endDate - set.beginDate",
                    distance: [0,2,8,8,8,7,6,4,2,0,0,0,0,0,3,8],
                    times: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16']
                  }
                ]
              },
              {
                session_duration: "session.endDate - session.beginDate",
                env_data: {
                  temperature: 21,
                  humidity: 11,
                  particulate: 16
                },
                sets: [
                  {
                    weight: 10,
                    rep: 20,
                    set_time: "set.endDate - set.beginDate",
                    distance: [0,2,2,3,4,5,4,2,2,0,0,0,0,0,2,2],
                    times: ['1','2','3','4','5','6','7','8','9','10','11','12']
                  }
                ]
              }
            ]
          }
        }  
        
        
        
        /*await axios.get('http://192.168.1.31:9000/api/session_data', { //10.0.2.2 for android
          params: {  frequence ,0, date},
        });*/
        return response; 

      }    
    }

    
    if (dataType=="exo_time"){
      if (frequence=="yearly"){
        var date = year+"-"+month+"-"+day+"T00:00:00"
        
        const response = {
          exo_time_year : {
            year : 2024,
            year_moy : "14:23",
            monthly_moy : [year-2000,12,13,14,15,16,17,18,19,20,21,12] //moyenne = end-begin de chaque set
          }
        }/*
        const response = await axios.get('http://10.42.0.1:9000/api/mean_exercise_time', { 
          params: {  Frequency :frequence, UserID:0,Date : date},
        });*/
        return response; 

      }
      if (frequence=="monthly"){
        var search_month = month-1 +2;
        var date = year+"-"+search_month+"-"+day+"T00:00:00"
        const response = {
          exo_time_month : {
            year : 2024,
            month : 10,
            month_moy : "5:30",
            weekly_moy : [search_month,5,6,4,5]
        
          }
        }/*
        const response = await axios.get('http://10.42.0.1:9000/api/mean_exercise_time', { //10.0.2.2 for android
          params: { frequence, UserID : 0 , date },
        });*/
        return response; 

      }
      if (frequence=="weekly"){
        var search_month = monthList.indexOf(month) + 1;
        var search_week = 1 + (week*7);
        var date = year+"-"+search_month+"-"+search_week+"T00:00:00"

        const response = {
          exo_time_week : {
            year : 2024,
            month : 12,
            week : 1,
            week_moy : "6:30",
            daily_moy : [search_month,search_week,8,7,6,5,7]
        
          }
        }
        /* await axios.get('http://10.42.0.1:9000/api/mean_exercise_time', { //10.0.2.2 for android
          params: { frequence,UserID : 0,date },
        });*/
        return response; 

      }
      if (frequence=="daily"){
        var search_month = monthList.indexOf(month) + 1;
        var search_day =  day-1+2 + (7*(weekList.indexOf(week)));
        var date = year+"-"+search_month+"-"+search_day+"T00:00:00"

        const response = {
          exo_time_day: {
            year: year,
            month: search_month,
            day: search_day,
            day_avg: "15min+20min / 2 sessions",
            sessions: [
              {
                session_duration: "session.endDate - session.beginDate",
                env_data: {
                  temperature: 20,
                  humidity: 10,
                  particulate: 15
                },
                sets: [
                  {
                    weight: 20,
                    rep: 12,
                    set_time: "set.endDate - set.beginDate",
                    distance: [0,2,5,5,6,7,8,6,5,2,0,0,0,0,2,5,5,5],
                    times: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18']
                  },
                  {
                    weight: 25,
                    rep: 10,
                    set_time: "set.endDate - set.beginDate",
                    distance: [0,2,8,8,8,7,6,4,2,0,0,0,0,0,3,8],
                    times: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16']
                  }
                ]
              },
              {
                session_duration: "session.endDate - session.beginDate",
                env_data: {
                  temperature: 21,
                  humidity: 11,
                  particulate: 16
                },
                sets: [
                  {
                    weight: 10,
                    rep: 20,
                    set_time: "set.endDate - set.beginDate",
                    distance: [0,search_day,2,3,4,5,4,2,2,0,0,0,0,0,2,2],
                    times: ['1','2','3','4','5','6','7','8','9','10','11','12']
                  }
                ]
              }
            ]
          }
        }  
        /*await axios.get('http://10.42.0.1:9090/api/session_data/detailed', { //10.0.2.2 for android
          params: { UserID : 0, date},
        });*/
        return response; 

      }    
      if (frequence=="last"){
        const response = {
          exo_time_day: {
            year: year,
            month: search_month,
            day: search_day,
            day_avg: "15min+20min / 2 sessions",
            sessions: [
              {
                session_duration: "session.endDate - session.beginDate",
                env_data: {
                  temperature: 20,
                  humidity: 10,
                  particulate: 15
                },
                sets: [
                  {
                    weight: 20,
                    rep: 12,
                    set_time: "set.endDate - set.beginDate",
                    distance: [0,2,5,5,6,7,8,6,5,2,0,0,0,0,2,5,5,5],
                    times: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18']
                  },
                  {
                    weight: 25,
                    rep: 10,
                    set_time: "set.endDate - set.beginDate",
                    distance: [0,2,8,8,8,7,6,4,2,0,0,0,0,0,3,8],
                    times: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16']
                  }
                ]
              },
              {
                session_duration: "session.endDate - session.beginDate",
                env_data: {
                  temperature: 21,
                  humidity: 11,
                  particulate: 16
                },
                sets: [
                  {
                    weight: 10,
                    rep: 20,
                    set_time: "set.endDate - set.beginDate",
                    distance: [0,search_day,2,3,4,5,4,2,2,0,0,0,0,0,2,2],
                    times: ['1','2','3','4','5','6','7','8','9','10','11','12']
                  }
                ]
              }
            ]
          }
        }  
        /*await axios.get('http://10.42.0.1:9000/api/session_data/last', { //10.0.2.2 for android
          params: {},
        });*/
        return response; 

      }  
        
    }
    
    
    return response; 
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

