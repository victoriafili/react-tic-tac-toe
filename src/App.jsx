import { useState, createContext, useContext } from 'react'

function Board () {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isNext, setIsNext] = useState(true);

  const handleClick = (i) => {
    const newBoard = [...board];

    if (newBoard[i]) return;
    newBoard[i] = isNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsNext(!isNext)
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 120px)'}}>
      {board.map((value, i) => (
        <button 
          key={i} 
          style={{ width: 120, height: 120, fontSize: 48,  display: 'flex', alignItems: 'center', justifyContent: 'center'}}
          onClick={() => handleClick(i)}>
          {value}
        </button>
      ))}
    </div>
  );
}

export default function App() { 
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    minHeight: '100vh', width: '100vw' }}>
      <h1>Tic Tac Toe</h1> 
      <Board />
    </div>
);
}
