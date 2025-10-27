  import fetch from "node-fetch";

  export async function getPokemonData(nameOrId) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId.toString().toLowerCase()}`);
    if (!res.ok) throw new Error("Pokémon introuvable !");
    const data = await res.json();
    return data;
  }
  
  export async function getMoveData(url) {
    const res = await fetch(url);
    const moveData = await res.json();
    return {
      name: moveData.name,
      power: moveData.power,
      accuracy: moveData.accuracy,
      pp: moveData.pp,
    };

  }

 