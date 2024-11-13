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

// Need to write next back login for isXNext

export default function App() {
  const emptyArray = Array(9).fill(null);
  const [values, setValue] = useState(emptyArray);
  const [IsXNext, setIsXNext] = useState(false);
  const [history, setHistory] = useState([emptyArray]);
  const [currentStep, setCurrentStep] = useState([]);

  function handleSquareClick(i) {
    if ((values[i]) || calculateWinner(values)) {
      return;
    }
    const newArray = values.slice();
    if (IsXNext) {
      newArray[i] = 'X';
    } else {
      newArray[i] = 'O';
    }
    setValue(newArray);
    setHistory([...history, newArray]);
    setCurrentStep(newArray);
    setIsXNext(!IsXNext);
  }

  function goNextBack(direction) {
    const index = history.findIndex(value => value === currentStep);
    const directionIndex = direction === 'next' ? index + 1 : index - 1;
    if (directionIndex >= 0) {
      const filteredStep = history[directionIndex];
      if (filteredStep?.length) {
        setValue(filteredStep);
        setCurrentStep(filteredStep);
      }
    }
  }

  function reset() {
    setValue(emptyArray);
    setHistory([emptyArray]);
    setCurrentStep([]);
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
    status = 'Winner : ' + winnerObj.winner;
  } else if (values.every(value => value !== null)) {
    status = 'Draw!!!!'
  } else {
    status = 'Next turn : ' + (IsXNext ? 'X' : 'O');
  }

  return (
    <div className='App'>
      <h1>Tic Tac Toe</h1>
      <h4>{status}</h4>
      <div className='board-row'>
        {
          values.map((value, index) =>
            <Square key={index} value={value} currentIndex={index} onClick={() => handleSquareClick(index)} winnerCombination={winnerObj?.combination} />
          )
        }
        <div className='controls'>
          <button className='button button-back' onClick={() => goNextBack('back')}>← Back</button>
          <button className='button button-next' onClick={() => goNextBack('next')}>Next →</button>
        </div>
        <button className='button button-reset' onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
