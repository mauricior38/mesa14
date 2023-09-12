import style from "./Pokemon.module.css";
import { Icon } from "../Icons";
import { useEffect, useState } from "react";

const cardColor = [
   {name: "bug", color: "#92bd2d"},
   { name: "grass" , color: "#5FBD58"},
   { name: "dark" , color: "#595761"},
   { name: "dragon" , color: "#0C69C8"},
   { name: "electric"  , color: "#F2D94E"},
   { name: "fairy" , color: "#EE90E6"},
   { name: "fighting" , color: "#D3425F"},
   { name: "fire" , color: "#FBA54C"},
   { name: "flying" , color: "#A1BBEC"},
   { name: "ghost" , color: "#5F6DBC"},
   { name: "ground" , color: "#DA7C4D"},
   { name: "ice" , color: "#75D0C1"},
   { name: "normal" , color: "#A0A29F"},
   { name: "poison" , color: "#B763CF"},
   { name: "psychic" , color: "#FA8581"},
   { name: "rock" , color: "#C9BB8A"},
   { name: "shadow" , color: "#595761"},
   { name: "steel" , color: "#5695A3"},
  { name: "water" , color: "#539DDF"},
];



export function Pokemon({id}) {
  const [pokemon, setPokemon] = useState({});
  const [bgColorState, setBgColorState] = useState('')
  
  useEffect(() => {
      async function loadPokemon() {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
          const pokemons = await response.json();
          
          setPokemon({
            id: pokemons.id,
            img: pokemons.sprites.other.dream_world.front_default ?? pokemons.sprites.other['official-artwork'].front_default,
            name: pokemons.name.toUpperCase(),
            type: pokemons.types[0].type.name,
          })
        }
        
        async function bgColor(){
            const colorRef = await cardColor.filter((color) => color.name === pokemon.type);
       
            colorRef.forEach(color => {
               setBgColorState(color.color)
            })
       
        }

        bgColor();
        loadPokemon();

    }, [id, pokemon.type]);
    
    return (
        <div
        className={style.Card}
        style={{
            background: `${bgColorState}35`,
            border: `solid ${bgColorState} 2px`,
      }}
    >
      <h1>{pokemon.name}</h1>
      <img src={pokemon.img} />
      <div className={style.Type}>
         <Icon IconName={pokemon.type}/>
        <p>{pokemon.type}</p>
      </div>
    </div>
  );
}
