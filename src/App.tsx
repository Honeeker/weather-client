import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { FilterBar } from './components/FilterBar/FilterBar';
import { SideMenu } from './components/SideMenu/SideMenu';
import { AverageTemperatureDashboard } from './dashboards/AverageTemperatureDashboard';
import { MaxTemperatureDashboard } from './dashboards/MaxTemperatureDashboard';
import { MinTemperatureDashboard } from './dashboards/MinTemperatureDashboard';

function App() {
  return (
    <div className="App">
      {/* HEADER */}
      <FilterBar />

      {/* BODY */}
      <div className="mainContainer">
        <SideMenu/>
        <Routes>
          <Route path="/average" element={<AverageTemperatureDashboard/>} />
          <Route path="/max" element={<MaxTemperatureDashboard/>} />
          <Route path="/min" element={<MinTemperatureDashboard/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
