

const Player1Ships = ["G2", "B9", "B8"];
let currentPlayer = 1;
let startPlayer = 2;
let p1board = document.getElementById("p1");
let p2board = document.getElementById("p2");
//let p1sboard = document.getElementById("p1s");
//let p2sboard = document.getElementById("p2s");

function guessPrompt() {
  let guess = prompt("Please enter your guess", "ColRow");
  if (guess != null) {
	  if(currentPlayer == 2){
		  document.getElementById("p2s" + guess).innerHTML = hitOrMiss(guess);
		  document.getElementById("p1e" + guess).innerHTML = hitOrMiss(guess);
	  }
	  else if(currentPlayer == 1){
		  document.getElementById("p1s" + guess).innerHTML = hitOrMiss(guess);
		  document.getElementById("p2e" + guess).innerHTML = hitOrMiss(guess);
	  }
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

function switchPlayers(current){
	alert("switching players");
	if(current == 1){
		p1board.style.visibility = "hidden";
		p2board.style.visibility = "visible";
		//p1sboard.style.visibility = "hidden";
		//p2sboard.style.visibility = "visible";
		currentPlayer = 2;
		alert("Player 2's turn");
	}
	else if(current == 2){
		p1board.style.visibility = "visible";
		p2board.style.visibility = "hidden";
		//p1sboard.style.visibility = "visible";
		//p2sboard.style.visibility = "hidden";
		currentPlayer = 1;
		alert("Player 1's turn");
	}
	else{
		alert("switch script is broken");
	}
}

function setShips(){
  
}

function winGame(){
  
}

function runGame(){
  alert("Game Start!");
  switchPlayers(startPlayer);
}
