import { getPokemonData, getMoveData } from "./pokemonApi.js";

export async function chooseBotPokemon() {
  const randomId = Math.floor(Math.random() * 151) + 1;
  const pokemon = await getPokemonData(randomId);

  const moves = pokemon.moves.slice(0, 20);
  const validMoves = [];

  for (let m of moves) {
    const moveData = await getMoveData(m.move.url);
    if (moveData.power && moveData.accuracy && moveData.pp) {
      validMoves.push(moveData);
    }
  }

  const shuffled = validMoves.sort(() => 0.5 - Math.random());
  const selectedMoves = shuffled.slice(0, 5);

  console.log(` Le bot a choisi ${pokemon.name.toUpperCase()} !`);
  console.log("Ses attaques :");
  selectedMoves.forEach(m =>
    console.log(`- ${m.name} (Power:${m.power}, Acc:${m.accuracy}, PP:${m.pp})`)
  );

  return { pokemon, selectedMoves };
}
