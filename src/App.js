import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import { winningCombinations } from './data';
import './App.css';

function Square({ value, onClick, winnerCombination, currentIndex }) {
  let isWinnerSquare = false;
  if (winnerCombination?.length) {
    isWinnerSquare = winnerCombination.includes(currentIndex);
  }
  return (
    <button className={isWinnerSquare ? 'btn btn-light square winner-square-style' : 'btn btn-light square'} onClick={onClick}>{value}</button>
  );
}

export default function App() {
  const emptyArray = Array(9).fill(null);
  const [values, setValue] = useState(emptyArray);
  const [IsXNext, setIsXNext] = useState(true);

  function handleSquareClick(i) {
    if ((values[i]) || calculateWinner(values)) {
      return;
    }
    const newArray = values.slice();
    if (IsXNext) {
      newArray[i] = "X";
    } else {
      newArray[i] = "O";
    }
    setValue(newArray);
    setIsXNext(!IsXNext);
  }

  function calculateWinner(board) {

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return {
          winner: board[a],
          combination: combination
        };
      }
    }
    return null;
  }

  let status;
  const winnerObj = calculateWinner(values);
  if (winnerObj) {
    status = "Winner : " + winnerObj.winner;
  } else {
    status = 'Next turn : ' + (IsXNext ? 'X' : 'O');
  }

  return (
    <div className='App'>
      <h1>Tic Tac Toe</h1>
      <br /> <h4>{status}</h4> <br />
      <div className='board-row'>
        {
          values.map((value, index) =>
            <Square key={index} value={value} currentIndex={index} onClick={() => handleSquareClick(index)} winnerCombination={winnerObj?.combination} />
          )
        }
      </div>
    </div>
  );
}
