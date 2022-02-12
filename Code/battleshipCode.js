

const Player1Ships = ["G2", "B9", "B8"];
let currentPlayer = 1;

function guessPrompt() {
  let guess = prompt("Please enter your guess", "ColRow");
  if (guess != null) {
    document.getElementById(guess).innerHTML = hitOrMiss(guess);
  }
}

function hitOrMiss(playerGuess) {
  if(Player1Ships.includes(playerGuess)){
    alert("Hit!");
    return "X";
  }
  else{
    alert("Miss");
    return "O";
  }
}

function setShips(){
  
}

function winGame(){
  
}

function runGame(){
  
}

function main(){
  runGame();
}