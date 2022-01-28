import React, { useEffect } from 'react'
import { Chart } from '../components/Chart/Chart'
import '../App.css'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchWeatherAsync } from '../features/weather/weatherSlice';
import { Weather } from '../domain/weather';
import { WeatherSerie } from '../components/Chart/chartFunctions';

const prepareWeatherSerie = (weather: Weather[]): WeatherSerie[] =>{
    return weather.map( weather =>{
        let serie: WeatherSerie;
        serie = {
            stationId: weather.stationId,
            date: weather.date,
            value: weather.dailyTemperature
        }
        return serie;
    })
}

export const AverageTemperatureDashboard = () => {
    const weather = useAppSelector(state => state.weather.Weather);
    const dispatch = useAppDispatch();

    const selectedStations = useAppSelector(state => state.filter.selectedStations);
    const selectedYears = useAppSelector(state => state.filter.selectedYears);
    const selectedMonths = useAppSelector(state => state.filter.selectedMonths);
    
    useEffect(() => {
        dispatch(fetchWeatherAsync({stations: selectedStations, years: selectedYears, months: selectedMonths}));
    }, [selectedStations, selectedYears, selectedMonths])
   
    return (
        <div className="chartContainer">
            <h1>Wykres średnich temperatur</h1>
            <Chart 
                weather={prepareWeatherSerie(weather)} 
                selectedStations={selectedStations}
            />
        </div>
    )
}
