import {resetBoard, nextRound } from '../../store/actions';
import styles from './Board.module.css';

function Board ({dispatch, state}) {
  const board = state?.board || Array(9).fill(null); // Prevents crash if state temporarily undefined / Avoids black screen
  
  const winningLine = state.winningLine;
  const message = state.message;
  const matchWinner = state.matchWinner;
  const currPlayer = state.currentTurn;
  const tabRole = currPlayer; // X, O
  const currentTurn = state.currentTurn;

  const handleClick = (i) => {
    if (
      state.board[i] ||
      state.winner ||
      tabRole !== currentTurn
    ) {
      return;
    }

    dispatch({ type: "PLAY_MOVE", payload: i, meta: { player: tabRole } });
  };

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