// Getting HTML Elements

const tiles = document.querySelectorAll(".tile");
const roundNumberElement = document.querySelector(".round");
const player1ScoreElement = document.querySelector(".player1-score");
const player2ScoreElement = document.querySelector(".player2-score");
const reset = document.querySelector(".reset");
const newGame = document.querySelector(".new-game");

// Grapping the Audio Assets

const tileClickSound = new Audio("./assest/audio/tile-click.mp3");
const resetGameSound = new Audio("./assest/audio/reset-game.mp3");
const newGameSound = new Audio("/assest/audio/new-game.mp3");
const winSound = new Audio("/assest/audio/win.mp3");

// Global Variables

let player = "X",
  playerToggler = true,
  roundNumber = 1,
  player1Score = 0,
  player2Score = 0,
  player1Tiles = [],
  player2Tiles = [],
  selectedTiles = [],
  winningTiles = [
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

//   Iterating Tiles To Add Functionality And Check IF Win / Draw Stats Exist

for (let i = 0; i < tiles.length; i++) {
  tiles[i].addEventListener("click", (tile) => {
    //   checknig if tile does not have value
    if (selectedTiles.indexOf(i) == -1) {
      tileClickSound.currentTime = 0;
      tileClickSound.play();
      switchTurns();
      tile.target.innerHTML = `${player}`;
      selectedTiles.push(i);
      if (player == "X") {
        player1Tiles.push(i);
        checkWinning(player1Tiles);
      } else {
        player2Tiles.push(i);
        checkWinning(player2Tiles);
      }
    }
  });
}

// Switch Players Tursn between X and O

function switchTurns() {
  playerToggler ? (player = "X") : (player = "O");
  playerToggler = !playerToggler;
}

// Check If Draw

function checkDraw() {
  if (selectedTiles.length == 9) {
    return true;
  }
  return false;
}

// Check If Winner Exists

function checkWinning(playerTiles) {
  for (const tileSet of winningTiles) {
    if (tileSet.every((tile) => playerTiles.includes(tile))) {
      player == "X" ? (player1Score += 1) : (player2Score += 1);
      endGame();
      winSound.currentTime = 0;
      winSound.play();
      return;
    } else if (selectedTiles.length == 9) {
      endGame();
      return;
    }
  }
}

// New Game

function startNewGame() {
  playerToggler = true;
  roundNumber += 1;
  player1Tiles = [];
  player2Tiles = [];
  selectedTiles = [];
  newGame.classList.add("inactive");
  tiles.forEach((tile) => {
    tile.innerHTML = "";
  });
  roundNumberElement.innerHTML = roundNumber;
  newGameSound.currentTime = 0;
  newGameSound.play();
}

// Adding New Game Button Functionality

newGame.addEventListener("click", startNewGame);

// End Game

function endGame() {
  selectedTiles = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  player1ScoreElement.innerHTML = player1Score;
  player2ScoreElement.innerHTML = player2Score;
  newGame.classList.remove("inactive");
}

// Game Reset

function resetGame() {
  playerToggler = true;
  roundNumber = 1;
  player1Score = 0;
  player2Score = 0;
  player1Tiles = [];
  player2Tiles = [];
  selectedTiles = [];
  roundNumberElement.innerHTML = roundNumber;
  player1ScoreElement.innerHTML = player1Score;
  player2ScoreElement.innerHTML = player2Score;
  tiles.forEach((tile) => {
    tile.innerHTML = "";
  });
  resetGameSound.currentTime = 0;
  resetGameSound.play();
}

// Adding Reset Button Functionality

reset.addEventListener("click", resetGame);
