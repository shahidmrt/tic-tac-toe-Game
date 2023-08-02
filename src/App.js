import { useState } from 'react';
import './App.css';


function  Square({value, onSqureClick}){
  return(
    <>
    <button onClick={onSqureClick} className='Square'>{value}</button>
    </>
  )
}


function Board({xIsNext, squares, onPlay }) {

  const handleClick =(i)=>{
    if (squares[i] || calculateWinner(squares)){
      return;
    }
    const nextSquares =squares.slice();
    if(xIsNext){
      nextSquares[i] = "X";
    }
    else{
      nextSquares[i] = "O"
    }
    // setSquares(nextSquares);
    // setXIsNext(!xIsNext);
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if(winner) {
    status ="winner : "+ winner;
    alert("the Winner is :" + winner)
  }
  else{
    status ="Next Player: "+ (xIsNext ?"X":"O");
  }
  

  return (
    <>
    <div className="status">{status}</div>
    <div className="Board-row">
      <Square value={squares[0]} onSqureClick={()=> handleClick(0)}/>
      <Square value={squares[1]} onSqureClick={()=> handleClick(1)}/>
      <Square value={squares[2]} onSqureClick={()=> handleClick(2)}/>
    </div>
    <div className="Board-row">
      <Square value={squares[3]} onSqureClick={()=> handleClick(3)}/>
      <Square value={squares[4]} onSqureClick={()=> handleClick(4)}/>
      <Square value={squares[5]} onSqureClick={()=> handleClick(5)}/>
    </div>
    <div className="Board-row">
      <Square value={squares[6]} onSqureClick={()=> handleClick(6)}/>
      <Square value={squares[7]} onSqureClick={()=> handleClick(7)}/>
      <Square value={squares[8]} onSqureClick={()=> handleClick(8)}/>
    </div>
    </>
  );
}

function App(){
  // const [xIsNext, setXIsNext] = useState(true);
const [history, setHistory]= useState([Array(9).fill(null)]);
const [currentMove, setCurrentMove] = useState(0)
const xIsNext = currentMove % 2 === 0;
const currentSquares = history[currentMove];

function handlePlay(nextSquares){
const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
  setHistory(nextHistory);
  setCurrentMove(nextHistory.length -1);
  // setXIsNext(!xIsNext);
}

function jumpTo(nextMove){
     setCurrentMove(nextMove);
    //  setXIsNext(nextMove % 2 === 0);
}

const moves = history.map((squares, move) =>{
  let description;
  console.log(move);
  if(move > 0){
    description ="Go to Move #" + move;
  }
  else{
    description = "Go to game Start";
  }
  return(
    <li key={move}>
      <button onClick={()=> jumpTo(move)}>{description}</button>
    </li>
  )
})

return (
  <div className='game'>
    <div className="game-board">
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
    </div>
    <div  className='game-info'>
        <ol>{moves}</ol>

    </div>
  </div>
);
}
export default App;

function calculateWinner(squares){
  const lines=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];
  for (let i = 0; i < lines.length;i++) {
  const [a,b,c]= lines [i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
    return squares[a];
  } 
}
return null;
}
