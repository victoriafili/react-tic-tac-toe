import { useDispatch, useSelector } from 'react-redux';
import { playMove, resetBoard } from '../store/actions';
import styles from './Board.module.css';

function Board () {
  const board = useSelector(state => state.board);
  const winningLine = useSelector(state => state.winningLine);
  const message = useSelector(state => state.message);
  const dispatch = useDispatch();

  const handleClick = (i) => {
    if (board[i] || winningLine?.length) return;
    
    dispatch(playMove(i));
    return;
  }

  return (
    <div>
      {/* MESSAGE */}
      {message && (
        <p className={styles.message}>
          {message}
        </p>
      )}

      <div className={styles.boardGrid}>
        {board.map((value, i) => {
          const isWinner = winningLine?.includes(i);
          
          return (
            <button 
              key={i} 
              onClick={() => handleClick(i)}
              className={`${styles.boardCell} ${
                isWinner ? styles.winningSquare : ""
              }`}
            >
              {value }
            </button>
          )
        })}
      </div>

      <button 
        onClick={() => dispatch(resetBoard())}
        className={styles.resetBtn}
      >
        Reset Game
      </button>

    </div>
  );
}

export default Board