import './App.css';
import React, {useState, useEffect} from "react";
//import { Dropdown, DropdownButton } from 'react-bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';
import jsondata from './assets/data.json';
  
function App() {
  
  // taulukko kaikille haetuille tiedoille
  const [kaikki, setKaikki] = useState([]);

  const [valmis, setValmis] = useState(false);

  // haetaan kaikki tiedot
  const haeData = () => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(responsedata => setKaikki(responsedata)) // aakkosta vielä
      .catch(error => console.error(error))
  };

  //useEffect(() => haeData, []);
  useEffect(() => setKaikki(jsondata), []); // aakkosta vielä

  // katsotaan mitä saatiin
  console.log(JSON.stringify(kaikki));
  console.log(kaikki.length); // 250

  // maaolioiden lista
  const maat = kaikki.map((t, i) => {
    return (
      {
        id: i,
        nimi: t.name.common,
        paakaupunki: t.capital,
        itsenainen: (t.independent === true ? "Kyllä" : "Ei"),
        lippu: t.flag
      }
    )
  });   

  console.log("maat: " + JSON.stringify(maat));

  let [haettumaa, setHaettumaa] = useState(null);
  let [maaId, setMaaid] = useState(-1);
  
 
  let handleChange = (e) => {
  
  //console.log("target value on " + e.target.value);
  setHaettumaa(maat[e.target.value]); 
    
  document.getElementById("tulos").innerHTML = 
  "Nimi: " +
  maat[e.target.value].nimi +
  "Itsenäisyys: " +
    maat[e.target.value].itsenainen;
  
  setValmis(true);

} 
  
  /*function selectCountry(haettavaid) {

    let haettu = maat.find(({ id }) => id === haettavaid);
    console.log("haettu on " + JSON.stringify(haettu));
    setHaettumaa(haettu);
  
  };*/
  
  return (
    <div className="App" style={{ padding: "10px" }}>   
      
    <select onChange={handleChange}> 
      <option value="Valitse maa"> Valitse maa </option>
        
        {maat.map((maa) => <option value={maa.id}> { maa.nimi } </option>) }

      </select>

      <br />
      <br />

      {valmis ? 
        <table align="center">
          <tbody>
            <tr><th>Nimi</th><th>Pääkaupunki</th><th>Itsenäinen</th><th>Lippu</th></tr>           
              <tr >             
                <td>{haettumaa.nimi}</td>
                <td>{haettumaa.paakaupunki}</td> 
                <td>{haettumaa.itsenainen}</td> 
                <td>{haettumaa.lippu}</td>               
              </tr>    
          </tbody>
        </table>
    : null}

    </div>
  );
}

export default App;