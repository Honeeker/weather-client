import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Chart } from '../components/Chart/Chart'
import { fetchWeatherAsync } from '../features/weather/weatherSlice';
import '../App.css'
import { Weather } from '../domain/weather';
import { WeatherSerie } from '../components/Chart/chartFunctions';

const prepareWeatherSerie = (weather: Weather[]): WeatherSerie[] =>{
    return weather.map( weather =>{
        let serie: WeatherSerie;
        serie = {
            stationId: weather.stationId,
            date: weather.date,
            value: weather.minimumDailyTemperature
        }
        return serie;
    })
}

export const MinTemperatureDashboard = () => {
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
            <h1>Wykres temperatur minimalnych</h1>
            <Chart 
                weather={prepareWeatherSerie(weather)} 
                selectedStations={selectedStations}
            />
        </div>
    )
}
