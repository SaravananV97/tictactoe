var board = [];
var human;
var AI;

const winningPositions = 
  [
    [0, 1, 2], [0, 3, 6],
    [0, 4, 8], [3, 4, 5],
    [6, 7, 8], [1, 4, 7],
    [2, 5, 8], [2, 4, 6]
];

function initBoard(){
    let modal = document.getElementById("modal");
    modal.style.display = "none";
    document.getElementById("result").innerText = "";
    document.getElementById("winner").innerText = "";
    board = Array.from(Array(9).keys());  
    let cells = document.querySelectorAll(".cell");
    Array.from(cells).map((cell) => {
      cell.innerText = "";
      cell.style.backgroundColor = "";
      cell.addEventListener("click", move, false);
    });
    assignRandom();
    if(AI === "O")
      makeMove("4", AI);
  }

function announceWinner(info){
  let modal = document.getElementById("modal");
  let span = document.getElementById("winner");
  modal.style.display = "block";
  span.innerText = info.winner;
  let cells = document.querySelectorAll(".cell");
  Array.from(cells).map((cell) => {
    cell.removeEventListener("click", move, false);
  });
  if(info.winner === "tie"){ 
    document.getElementById("result").innerText = "Tied";
    return;
  }
  info.moves.map(pos => document.getElementById(pos).style.backgroundColor = "green");
  if(info.winner === human){
   document.getElementById("result").innerText = "You won";
  }
  else
    document.getElementById("result").innerText = "AI won";
}

function assignRandom(){
  if(Math.floor(Math.random()*2) === 0){
    human = "O"; AI = "X";
  }
  else{
    human = "X"; AI = "O";
  }
  document.getElementById("ai").innerText = AI;
  document.getElementById("human").innerText = human;
}

function move(cell){
  if(!isNaN(document.getElementById(cell.target.id).innerText)){
    makeMove(cell.target.id, human);
    let idx = getEmptySquare();
    console.log("AI's Move is " + idx);
 console.log("Winner: " + document.getElementById("winner").innerText);   if(document.getElementById("winner").innerText === "")
    makeMove(idx + "", AI);
  }
}

function getEmptySquare(){
    for(let i = 0; i < 9; i++)
      if(!isNaN(board[i]))
        return i;
  }

function makeMove(cellId, moveVal){
    if(isTie()) 
      announceWinner({winner:"tie"});
    document.getElementById(cellId).innerText =  moveVal;
      board[cellId] = moveVal;
    let gameStatus = getWinner(moveVal);
  if(gameStatus){
    announceWinner(gameStatus);
    return;
  }
}

function isTie(){
  let f = true;
  for(let i = 0; i < 9; i++)
    if(!isNaN(board[i])) 
      f = false;
  return f;
}

function getWinner(current){
  let winnerInfo = null;
  let moves = board.reduce((acc, e, i) => {
   return e === current ? acc.concat(i):acc
  }, []);
  console.log(moves);
  winningPositions.map(positions => {
    if(positions.every(elem => moves.indexOf(elem) > -1)){
      winnerInfo = {winner: current, moves: positions}
    }
  });
  if(winnerInfo === null && isTie())
    return {winner: "tie"};
  return winnerInfo;
}

initBoard();

