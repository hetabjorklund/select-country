import './App.css';
import React, {useState, useEffect} from "react";
//import { Dropdown, DropdownButton } from 'react-bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';
import jsondata from './assets/data.json';
  
function App() {
  
  // taulukko kaikille haetuille tiedoille
  const [kaikki, setKaikki] = useState([]);

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
  //console.log(kaikki[1]);

  const maat = kaikki.map((t, i) => {
    return (
      {
        id: i,
        nimi: t.name.common,
        itsenainen: (t.independent === true ? "kyllä" : "ei"),
        valuutta: t.currencies,
        lippu: t.flag
      }
      )
  });   

  console.log("maat: " + JSON.stringify(maat));

  //console.log("maat eka: " + JSON.stringify(maat[0]));

  /*let fruits = [
    { label: "Apple", value: "🍎" },
    { label: "Banana", value: "🍌" },
    { label: "Orange", value: "🍊" }
  ]

  let [fruit, setFruit] = useState("")*/

  let [maa, setMaa] = useState(null);
  let [maaId, setMaaid] = useState(-1);
  let palautettavamaa = "";
  

// Using this function to update the state of fruit
// whenever a new option is selected from the dropdown
let handleChange = (e) => {
  //setFruit(e.target.value)
  //setMaaid(e.target.value);
  console.log("target value on " + e.target.value);
  
  palautettavamaa =
    "Nimi: " +
    maat[e.target.value].nimi +
    "Itsenäisyys: " +
    maat[e.target.value].itsenainen;
  
  console.log("haettu maa on " + palautettavamaa)
  
  document.getElementById("tulos").innerHTML = 
  "Nimi: " +
  maat[e.target.value].nimi +
  "Itsenäisyys: " +
  maat[e.target.value].itsenainen;

//  selectCountry(e.target.value);
}
  
  
  
  function selectCountry(haettavaid) {

   // let haettu = maat.find(element => element.id === id);
    let haettu = maat.find(({ id }) => id === haettavaid);
    console.log("haettu on " + JSON.stringify(haettu));
    setMaa(haettu);
  
  };
  
  return (
    <div className="App" style={{padding: "10px"}}>     
      
    <select onChange={handleChange}> 
      <option value="Valitse maa"> Valitse maa </option>
            {/* Mapping through each fruit object in our fruits array
          and returning an option element with the appropriate attributes / values.
         */}
        {/*fruits.map((fruit) => <option value={fruit.value}>{fruit.label}</option>)*/}
        
        {maat.map((maa) => <option value={maa.id}> { maa.nimi } </option>) }

      </select>

      <br />
      <br />
      {/* Displaying the value of fruit */}
      
      <p>{palautettavamaa}</p>

      <div id="tulos"></div>
    

    </div>
  );
}

export default App;
