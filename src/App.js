import './App.css';
import React, { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import jsondata from './assets/data.json';

function App() {
  
  // muuttuja kaikille haetuille tiedoille
  const [kaikki, setKaikki] = useState([]);

  // onko maan valinta tehty ja taulukko näytetään
  const [valmis, setValmis] = useState(false);

  // taulukon sarakkeet
  const columns = [
    { headerName: "Nimi", field: "nimi"},
    { headerName: "Pääkaupunki", field: "paakaupunki" },
    { headerName: "Itsenäinen", field: "itsenainen" },
    { headerName: "YK:n jäsen", field: "yk" },
    { headerName: "Lippu", field: "lippu" }
  ];
  
  // array taulukolle
  let rowdata = [];
  
  // haetaan kaikki tiedot
  const haeData = () => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(responsedata => setKaikki(responsedata))
      .catch(error => console.error(error))
  };

  //useEffect(() => haeData, []);
  useEffect(() => setKaikki(jsondata), []); // testausta varten, appi ei aina hakenut endpointista tietoja

  // aakkosta maat
  kaikki.sort((a, b) => a.name.common.localeCompare(b.name.common));
  
  // katsotaan mitä saatiin
  //console.log(JSON.stringify(kaikki));
  //console.log(kaikki.length); // 250

  // maaolioiden lista
  const maat = kaikki.map((t, i) => {
    return (
      {
        id: i,
        nimi: t.name.common,
        paakaupunki: t.capital,
        itsenainen: (t.independent === true ? "Kyllä" : "Ei"),
        yk: (t.unMember === true ? "Kyllä" : "Ei"),
        lippu: t.flag
      }
    )
  });   

  //console.log("maat: " + JSON.stringify(maat));

  let [haettumaa, setHaettumaa] = useState(null);
 
  let handleChange = (e) => {  
    //console.log("e.target.value on " + e.target.value);
    setHaettumaa(maat[e.target.value]);      
    setValmis(true);  
  }  

  rowdata.push(haettumaa);
   
  return (
    <div className="App" style={{ padding: "20px" }}>   
      
    <select onChange={handleChange}> 
      <option value="Valitse maa"> Valitse maa </option>        
        {maat.map((maa) => <option value={maa.id}> { maa.nimi } </option>) }
      </select>

      <br />
      <br />

      {valmis ?   
        
        <div align="center" className="ag-theme-material" style={{ height: '600px', width: '80%', margin: 'auto' }}>
            <AgGridReact
                columnDefs={columns}
                rowData={rowdata}>
            </AgGridReact>
        </div>
        
    : null}    

    </div >
      
  );
}

export default App;