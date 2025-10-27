import inquirer from "inquirer";
import { askPlayerPokemon } from "./choosePokemon.js";
import { chooseBotPokemon } from "./chooseBotPokemon.js";

export async function startBattle() {
  console.log("le combat Pokémon !");

  const player = await askPlayerPokemon();
  const bot = await chooseBotPokemon();
  player.hp = 300;
  bot.hp = 300;

  console.log(`\n ${player.pokemon.name.toUpperCase()} VS ${bot.pokemon.name.toUpperCase()} 🔥\n`);

  while (player.hp > 0 && bot.hp > 0) {
    const { chosenMove } = await inquirer.prompt([
      {
        type: "list",
        name: "chosenMove",
        message: `Choisis ton attaque (HP restant: ${player.hp}) :`,
        choices: player.selectedMoves.map(
          (m, i) => `${i + 1}. ${m.name} (Power:${m.power}, Acc:${m.accuracy}, PP:${m.pp})`
        ),
      },
    ]);

    const moveName = chosenMove.split(". ")[1].split(" (")[0];
    const playerMove = player.selectedMoves.find(m => m.name === moveName);

    if (playerMove.pp <= 0) {
      console.log(`${playerMove.name} n'a plus de PP ! Tour perdu...`);
    } else {
      playerMove.pp--;
      if (Math.random() * 100 < playerMove.accuracy) {
        bot.hp -= playerMove.power;
        console.log(`${player.pokemon.name} utilise ${playerMove.name}!`);
        console.log(`Dégâts infligés à ${bot.pokemon.name}: ${playerMove.power}`);
      } else {
        console.log(`${player.pokemon.name} rate son attaque ${playerMove.name}!`);
      }
    }

    if (bot.hp <= 0) {
      console.log(` ${bot.pokemon.name.toUpperCase()} est KO ! Tu as gagné !`);
      break;
    }
    const botMove = bot.selectedMoves[Math.floor(Math.random() * bot.selectedMoves.length)];

    if (botMove.pp <= 0) {
      console.log(` ${bot.pokemon.name} n’a plus de PP pour ${botMove.name} !`);
    } else {
      botMove.pp--;
      if (Math.random() * 100 < botMove.accuracy) {
        player.hp -= botMove.power;
        console.log(`${bot.pokemon.name} utilise ${botMove.name}!`);
        console.log(` Dégâts infligés à ${player.pokemon.name}: ${botMove.power}`);
      } else {
        console.log(` ${bot.pokemon.name} rate son attaque ${botMove.name}!`);
      }
    }

    if (player.hp <= 0) {
      console.log(` ${player.pokemon.name.toUpperCase()} est KO ! Le bot gagne !`);
      break;
    }

    console.log(`\n HP du joueur: ${player.hp} | 🤖 HP du bot: ${bot.hp}\n`);
  }

  console.log(" Fin du combat !");
}
startBattle();