import { useDispatch, useSelector } from 'react-redux';
import { playMove, resetBoard, nextRound } from '../../store/actions';
import styles from './Board.module.css';

function Board () {
  const state = useSelector(state => state);
  const board = state?.board || Array(9).fill(null);
  console.log("Board state:", state);
  const winningLine = state.winningLine;
  const message = state.message;
  const matchWinner = state.matchWinner;
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
      
      <div className={styles.buttonContainer}>
        <button 
          onClick={() => dispatch(nextRound())}
          className={styles.nextBtn}
        >
          Next Round
        </button>

        {matchWinner && (
          <button 
            onClick={() => dispatch(resetBoard())}
            className={styles.resetBtn}
          >
            Play Again
          </button>
        )}
      </div>

    </div>
  );
}

export default Board;