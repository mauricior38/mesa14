import { useState, useEffect } from "react";
import style from "./Home.module.css";


import { Pokemon } from "../Pokemon";


export function Home() {
  const [pokemonsData, setPokemonData] = useState([]);

  useEffect(() => {
    async function loadPokemon() {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon");
      const pokemons = await response.json();

      setPokemonData(pokemons.results);
    }

    loadPokemon();
  }, []);

  return (
    <div className={style.container}>
      
      {pokemonsData &&
        pokemonsData.map((pokemons, index) => {
          return (
            <div key={index}>
                <Pokemon  id={index + 1} />
            </div>
          );
        })}


    </div>
  );
}
