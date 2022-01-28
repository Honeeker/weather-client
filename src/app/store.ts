import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import stationsReducer from '../features//stations/stationsSlice';
import weatherReducer from '../features//weather/weatherSlice';
import filterSlice from '../features/filter/filterSlice';

export const store = configureStore({
  reducer: {
    stations: stationsReducer,
    weather: weatherReducer,
    filter: filterSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
