import { useDispatch, useSelector } from 'react-redux';
import { playMove, resetBoard } from '../store/actions';

function Board () {
  const board = useSelector(state => state.board);
  const winningLine = useSelector(state => state.winningLine);
  const dispatch = useDispatch();

  const handleClick = (i) => {
    if (board[i] || winningLine) return;
    
    dispatch(playMove(i));
    return;
  }

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 120px)'}}>
        {board.map((value, i) => {
          const isWinner = winningLine?.includes(i);
          
          return (
            <button 
              key={i} 
              onClick={() => handleClick(i)}
              style={{ width: 120, height: 120, fontSize: 48,  display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: isWinner ? 'red' : 'black'}}>
              {value}
            </button>
          )
        })}
      </div>

      <button 
        onClick={() => dispatch(resetBoard())}
        style={{position: 'absolute', bottom: 20, padding: '10px 20px', fontSize: 16, cursor: "pointer",
        borderRadius: 8,
        border: "2px solid white",
        background: "black"}}
      >
        Reset Game
      </button>
    </div>
  );
}

export default Board