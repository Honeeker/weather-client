import { groupBy } from "../../app/utils";
import { Station } from "../../domain/station";

export interface WeatherSerie{
  stationId: string,
  date: string,
  value: number
}

const DEFAULT_OPTIONS = {
    title: {
      show: true,
      textStyle: {
          color: "grey",
          fontSize: 20
      },
      text: "Brak danych",
      left: "center",
      top: "center"
  }
}

const sortDateAsc = (a:any,b:any) => {
    if(a.date < b.date)
      return -1
    if(a.date > b.date)
      return 1;
    return 0;
}

const getActualStationName = (selectedStations: Station[], actualStationId: number) =>{
    let filteredStation = selectedStations.filter((element) => {
      return element.key == actualStationId;
    });
  
    if(filteredStation.length == 0){
      return;
    }
    return filteredStation[0].name;
}
export const prepareOptions = (weather: WeatherSerie[], selectedStations: Station[]) => {
    if(weather.length === 0 ){
      return DEFAULT_OPTIONS;
    }
  
    let xAxisData: string[] = [];
    let seriesData: any[] = [];
    let legendValues: string[] = [];
  
    const weatherGroupedByStation = groupBy(weather, (w: any) => w.stationId);
  
    weatherGroupedByStation.forEach((stationWeather: WeatherSerie[], stationId: any) =>{
      
      let singleSerie: any[][] = [];
      let stationName = getActualStationName(selectedStations, stationId);
      if(stationName !== undefined){
        legendValues.push(stationName);
      }
  
      stationWeather.sort(sortDateAsc)
        .forEach(weather =>{
          let date = weather.date.split("T")[0];
          if(!xAxisData.includes(date)){
            xAxisData.push(date);
          }
          singleSerie.push([date, weather.value]);
        });
  
      seriesData.push({
        name: stationName,
        data: singleSerie.slice(),
        type: 'line',
        smooth: true,
      });
    })

    xAxisData = xAxisData.sort(sortDateAsc);
    
    return {
      grid: {  
        right: '2%',
        left: '2%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: xAxisData,
      },
      yAxis: {
        type: 'value',
      },
      series: seriesData,
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: legendValues
      }
    };
}  