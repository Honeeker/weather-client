import ReactECharts from 'echarts-for-react';
import { prepareOptions, WeatherSerie } from './chartFunctions';
import { Station } from '../../domain/station';

export interface ChartProps{
  weather: WeatherSerie[],
  selectedStations: Station[],
}

export const Chart = ({weather, selectedStations}:  ChartProps) => {

  return (
    <>
      <ReactECharts
        option={prepareOptions(weather, selectedStations)}
        notMerge={true}
        style={{height:"75%", width:"100%"}}
      />
    </>
  )
  
}