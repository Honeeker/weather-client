import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchStations, selectAllStations } from '../../features/stations/stationsSlice'
import { fetchYearsAsync, selectYears } from '../../features/weather/weatherSlice';
import { MonthMultiSelectFilter } from './Filters/MonthMultiSelectFilter';
import { StationMultiSelectFilter } from './Filters/StationMultiSelectFilter';
import { YearMultiSelectFilter } from './Filters/YearMultiSelectFilter';
import './FilterBar.css';

export const FilterBar = () => {
    const stations = useAppSelector(selectAllStations);
    const availableYears = useAppSelector(selectYears);
    const dispatch = useAppDispatch();

    useEffect(() => {
            dispatch(fetchStations());
            dispatch(fetchYearsAsync());
    }, [])
  
    return (
        <div className="filterBar">
            <StationMultiSelectFilter items={stations}/>
            <YearMultiSelectFilter items={availableYears}/>
            <MonthMultiSelectFilter/>
        </div>
    )
}
