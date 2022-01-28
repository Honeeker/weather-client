import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import { Station } from "../../domain/station";
import { Weather } from "../../domain/weather";

export interface WeatherState{
    Weather: Weather[]
    years: number[]
};

const initialState: WeatherState = {
    Weather: [],
    years: []
};

export const fetchWeatherAsync = createAsyncThunk('feature/fetchWeather', async ({stations, years, months}: { stations: Station[], years: number[], months: number[]}) =>{
    let uri = "http://localhost:5000/weather-module/weather";

    const createParamsString = (stations: Station[], years: number[], months: number[]):string =>{
        let params = "?";
        let stationParam = "";
        let yearParam = "";
        let monthParam = "";
        stations.forEach((station, index) => {
          if(index < stations.length-1){
            stationParam += `stationid=${station.key}&`;
          }else{
            stationParam += `stationid=${station.key}`;
          }
        })

        years.forEach((year, index) => {
          if(index < years.length-1){
            yearParam += `year=${year}&`;
          }else{
            yearParam += `year=${year}`;
          }
        })

        months.forEach((month, index) => {
          if(index < months.length-1){
            monthParam += `month=${month}&`;
          }else{
            monthParam += `month=${month}`;
          }
        })

        if(stationParam !== ""){
          params += stationParam + "&";
        }
        if(yearParam !== ""){
          params += yearParam + "&";
        }
        if(monthParam !== ""){
          params += monthParam;
        }else{
          params = params.slice(0, params.length - 1);
        }
        return params;
    }

    if(stations.length > 0){
      uri += createParamsString(stations, years, months);
    }
   
    const response = await axios(uri);
    if(response.status === 204){
      return [];
    }
    return response.data;
});

export const fetchYearsAsync = createAsyncThunk('feature/fetchYears', async () => {
  let uri = "http://localhost:5000/weather-module/weather/years";
  const response = await axios(uri);
  return response.data;
})

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers:{
    
  },
  extraReducers(builder){
    builder
      .addCase(fetchWeatherAsync.fulfilled, (state, action) =>{
          state.Weather = action.payload;
      })
      .addCase(fetchYearsAsync.fulfilled, (state, action) =>{
        state.years = action.payload;
      })
  }
    
});

export const selectYears = (state: RootState) => state.weather.years;

export default weatherSlice.reducer;