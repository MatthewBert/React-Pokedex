import React, { useState } from "react";
import axios from "axios";
import './App.css';

const App = () => {
  const [pokemon, setPokemon] = useState("pikachu");
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonType, setPokemonType] = useState("");
  const [pokemonType2, setPokemonType2] = useState("");

  const getPokemon = async () => {
    const toArray = [];
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      const res = await axios.get(url);
      toArray.push(res.data);
      console.log(res);
      //set all data back to null
      setPokemonType("")
      setPokemonType2("")
      //fill the data from the api
      setPokemonType(res.data.types[0].type.name)
      //check if the pokemon has two types, if it does then display it
      if((res.data.types).length === 2){
        setPokemonType2(", "+(res.data.types[1].type.name))
      }
      setPokemonData(toArray)
    } catch (e) {
      console.log(e);
    }
  }

  const handleChange = (e) => {
    setPokemon(e.target.value.toLowerCase());
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    getPokemon();
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            onChange={handleChange}
            placeholder="Enter Pokemon Name"
          />
        </label>
      </form>
      {pokemonData.map((data) => {
        return (
          <div className="container">
            <img src={data.sprites["front_default"]}/>
            <img src={data.sprites["back_default"]}/>
            <div className="divTable">
              <div className="divTableBody">
                <div className="divTableRow">
                  <div className="divTableCell">Type</div>
                  <div className="divTableCell">{pokemonType}{pokemonType2}</div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell">Height</div>
                  <div className="divTableCell">{" "}{Math.round(data.height * 10)} Cm</div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell">Weight</div>
                  <div className="divTableCell">{" "}{Math.round(data.weight / 10)} Kg</div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell">ID</div>
                  <div className="divTableCell">#{data.id}</div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default App;