import './App.css';
import React, { useState } from 'react';

function Square({ onClick, value }) {
  return (
    <button className="square" onClick={onClick}>
      &nbsp;{value}&nbsp;
    </button>
  );
}

export default function Board () {
  const [squares, setSquares] = React.useState(Array(9).fill(null))
  const [isX, setIsX] = React.useState(true);

  const handleClick = (i) => {
    if (Winner(squares) || squares[i]) {
      return
    }
    
    squares[i] = isX ? 'X' : 'O'
    setSquares(squares)
    setIsX(!isX)
  }

  const winner = Winner(squares)
  let status
  
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = 'Next player: ' + (isX ? 'X' : 'O');
  }
  
  const handleRestart = () => {
    setIsX(true)
    setSquares(Array(9).fill(null))
  }

  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />
  }
  
  return (
    <div className='board'>
      <div>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <div className='stat'>{status}</div>
      <button className="restart" onClick={handleRestart}>Restart</button>
    </div>
  )
}

function Winner(squares) {
  const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  
  for (let i = 0; i < wins.length; i++) {
    const [a, b, c] = wins[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}