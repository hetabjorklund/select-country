import './App.css';
import React, { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import jsondata from './assets/data.json';

function App() {
  
  // variable for fetched data 
  const [all, setAll] = useState([]);

  // has country been selected and table can be shown
  const [ready, setReady] = useState(false);

  // columns for table
  const columns = [
    { headerName: "Name", field: "name"},
    { headerName: "Capital", field: "capital" },
    { headerName: "Independent", field: "independent" },
    { headerName: "UN member", field: "un" },
    { headerName: "Flag", field: "flag" }
  ];
  
  // array for table
  let rowData = [];
  
  // fetch all data
  const fetchData = () => {
    fetch('https://restcountries.com/#api-endpoints-v3-all')
      .then(response => response.json())
      .then(responsedata => setAll(responsedata))
      .catch(error => console.error(error))
  };

  useEffect(() => fetchData, []);
  useEffect(() => setAll(jsondata), []); // in case fetching from API doesn't work

  // sort countries
  all.sort((a, b) => a.name.common.localeCompare(b.name.common));
  
  // list of country objects
  const countries = all.map((t, i) => {
    return (
      {
        id: i,
        name: t.name.common,
        capital: t.capital,
        independent: (t.independent === true ? "Yes" : "No"),
        un: (t.unMember === true ? "Yes" : "No"),
        flag: t.flag
      }
    )
  });   

  let [selectedCountry, setSelectedCountry] = useState(null);
 
  let handleChange = (e) => {  
    setSelectedCountry(countries[e.target.value]);      
    setReady(true);  
  }  

  rowData.push(selectedCountry);
   
  return (
    <div className="App" style={{ padding: "20px" }}>   
      
    <select onChange={handleChange}> 
      <option value="Select country"> Select country </option>        
        {countries.map((country) => <option value={country.id}> { country.name } </option>) }
      </select>

      <br />
      <br />

      {ready ?   
        
        <div align="center" className="ag-theme-material" style={{ height: '600px', width: '80%', margin: 'auto' }}>
            <AgGridReact
                columnDefs={columns}
                rowData={rowData}>
            </AgGridReact>
        </div>
        
    : null}    

    </div >
      
  );
}

export default App;