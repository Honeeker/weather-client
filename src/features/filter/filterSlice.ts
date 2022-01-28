import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Station } from "../../domain/station";

export interface FilterState{
    selectedStations: Station[]
    selectedYears: number[]
    selectedMonths: number[]
}
const initialState: FilterState = {
    selectedStations: [],
    selectedYears: [],
    selectedMonths: []
}

export const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers:{
        stationChoosed: (state, action: PayloadAction<Station>) =>{
            state.selectedStations.push(action.payload);
        },
        stationRemoved: (state, action: PayloadAction<Station>) =>{
            let { key } = action.payload;
            state.selectedStations = state.selectedStations.filter((item) => item.key !== key);
        },
        stationsCleared: (state) =>{
            state.selectedStations = [];
        },
        yearChoosed: (state, action: PayloadAction<number>) =>{
            state.selectedYears.push(action.payload);
        },
        yearRemoved: (state, action: PayloadAction<number>) =>{
            let seletedYear = action.payload;
            state.selectedYears = state.selectedYears.filter(year => year !== seletedYear);
        },
        yearsCleared: (state) =>{
            state.selectedYears = [];
        },
        monthChoosed: (state, action: PayloadAction<number>) =>{
            state.selectedMonths.push(action.payload);
        },
        monthRemoved: (state, action: PayloadAction<number>) =>{
            let selectedMonth = action.payload;
            state.selectedMonths = state.selectedMonths.filter(month => month !== selectedMonth);
        },
        monthsCleared: (state) => {
            state.selectedMonths = [];
        }
    }
})

export const {stationChoosed, stationRemoved, stationsCleared, yearChoosed, yearRemoved, yearsCleared, monthChoosed, monthRemoved, monthsCleared } = filterSlice.actions;
export const selectSelectedStations = (state: RootState) => state.filter.selectedStations;
export const selectChoosedYears = (state: RootState) => state.filter.selectedYears;
export default filterSlice.reducer;