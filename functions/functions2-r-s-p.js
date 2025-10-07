let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();



document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  });

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  });


  document.addEventListener('keyup', (event) => {
    if (event.key === 'r') {
      console.log("La touche 'r' a ete enfoncee!");
      playGame('rock');
    } 
  });
  
  document.addEventListener('keyup', (event) => {
    if (event.key === 'p') {
      console.log("La touche 'p' a ete enfoncee!");
      playGame('paper');
    } 
  });

  document.addEventListener('keyup', (event) => {
    if (event.key === 's') {
      console.log("La touche 's' a ete enfoncee!");
      playGame('scissors');
    } 
  });
  
  /*
  Add an event listener
  if the user presses the key r => play rock
  if the user presses the key p => play paper
  if the user presses the key s => play scissors
  */

function autoPlay(){
  let playerMove = pickComputerMove();
  playGame(playerMove); 
  setInterval
}


function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = '';
  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }
  }
  else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    }
    else if (computerMove === 'paper') {
      result = 'Tie.';
    }
    else if (computerMove === 'scissors') {
      result = 'You lose.';
    }
  }
  else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    }
    else if (computerMove === 'paper') {
      result = 'You lose.';
    }
    else if (computerMove === 'scissors') {
      result = 'You win.';
    }
  }
  if (result === 'You win.') {
    score.wins += 1;
  }
  else if (result === 'You lose.') {
    score.losses += 1;
  }
  else if (result === 'Tie.') {
    score.ties += 1;
  }
  localStorage.setItem('score', JSON.stringify(score));
  updateScoreElement();
  document.querySelector('.js-result')
    .innerHTML = result;
  document.querySelector('.js-moves')
    .innerHTML = `You
      <img src="images/${playerMove}-emoji.png" class="move-icon">
      <img src="images/${computerMove}-emoji.png" class="move-icon">
      Computer`;

  // calculate result
  // update the score and store it using localStorage.setItem
  // show the new score and the updated images using "document.querySelector"

}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}