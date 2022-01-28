import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import { Station } from "../../domain/station";

export interface StationsState {
    stations: Station[],
};

const initialState: StationsState = {
    stations: []
};

export const fetchStations = createAsyncThunk('stations/fetchStations', async () =>{
    const response = await axios("http://localhost:5000/weather-module/station");
    return response.data;
});

export const stationsSlice = createSlice({
    name: 'stations',
    initialState,
    reducers:{
        
    },
    extraReducers(builder){
        builder
            .addCase(fetchStations.fulfilled, (state, action) =>{
                state.stations = action.payload;
            })
    }
});

export const selectAllStations = (state: RootState) => state.stations.stations;

export default stationsSlice.reducer;