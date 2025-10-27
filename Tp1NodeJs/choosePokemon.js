import inquirer from "inquirer";
import { getPokemonData,getMoveData } from "./pokemonApi.js";


export async function askPlayerPokemon() {
  const { pokemonName } = await inquirer.prompt([
    {
      type: "input",
      name: "pokemonName",
      message: "Choisis ton Pokémon (ex: pikachu):",
    },
  ]);

  const pokemon = await getPokemonData(pokemonName);

  const moves = pokemon.moves.slice(0, 20);
  const validMoves = [];
  for (let m of moves) {
    const moveData = await getMoveData(m.move.url);
    if (moveData.power && moveData.accuracy && moveData.pp) {
      validMoves.push(moveData);
    }
  }

  const { chosenMoves } = await inquirer.prompt([
    {
      type: "checkbox",
      name: "chosenMoves",
      message: "Choisis 5 attaques pour ton Pokémon :",
      choices: validMoves.map(m => `${m.name} (Power:${m.power}, Acc:${m.accuracy}, PP:${m.pp})`),
      validate: (answer) =>
        answer.length === 5 ? true : "Tu dois choisir exactement 5 attaques.",
    },
  ]);
  const selectedMoves = validMoves.filter(m => chosenMoves.some(c => c.includes(m.name)));
  return { pokemon, selectedMoves };

}

