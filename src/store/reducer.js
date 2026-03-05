import { playMove, resetBoard, nextRound } from "./actions";

const initState = {board: Array(9).fill(null), winner: null, score: {
    X: 0,
    O: 0,
}, matchWinner: null, message: "", currentTurn: "X",}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOAD_STATE':
            return action.payload;
        case 'UPDATE_BOARD':
            return {...state, board: action.payload};
        case 'SET_NEXT_PLAYER':
            return {...state, currentTurn: action.payload};
        case nextRound.type:
            if (state.matchWinner) return state; // Prevent starting next round if match is already won

            return {
                ...state,
                board: Array(9).fill(null),
                currentTurn: "X",
                winner: null,
                winningLine: null,
            };
        case resetBoard.type: {
            // Check if matchWinner exists
            const isMatchOver = state.matchWinner !== null;

            // If no match winner yet -> do nothing
            if (!state.matchWinner) return state;

            return { 
                board: Array(9).fill(null), 
                currentTurn: "X", 
                winningLine: null, 
                winner: null, 
                matchWinner: isMatchOver ? null : state.matchWinner,   // keep matchWinner if match not over
                message: isMatchOver ? "" : state.message,            // clear message only if match over
                score: isMatchOver ? { X: 0, O: 0 } : state.score,   // reset score only if match over
            };
        }
        case playMove.type: {           
            const newBoard = [...state.board];

             if (newBoard[action.payload] ||
                state.winner ||
                action.meta?.player !== state.currentTurn
             ){
                return state;
             }

            newBoard[action.payload] = state.currentTurn;

            const winner = calculateWinner(newBoard);

            // Flip turn
            const nextTurn = state.currentTurn === "X" ? "O" : "X";

            if (!winner) {
                return {
                    ...state,
                    board: newBoard,
                    currentTurn: nextTurn,
                };
            }

            const updatedScore = {
                ...state.score,
                X: winner.winner === 'X' ? state.score.X + 1 : state.score.X,
                O: winner.winner === 'O' ? state.score.O + 1 : state.score.O,
            };

            const matchWinner = updatedScore.X === 3 ? 'X' : updatedScore.O === 3 ? 'O' : null;

            if (matchWinner) {
                return {
                    ...state,
                    board: newBoard,
                    currentTurn: nextTurn,
                    winner: winner.winner,
                    winningLine: winner.line,
                    matchWinner: matchWinner,
                    score: updatedScore,
                    message: `Player ${matchWinner} wins the match!`,
                }
            }

            return {...state, board: newBoard, currentTurn: nextTurn, winner: winner.winner, winningLine: winner.line, score: updatedScore};
        }
        default:
            return state;
    }
}

// Function to calculate 
function calculateWinner(board) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return {winner: board[a], line: [a, b, c]}; // Return the winner and the winning line for my strike-through effect
    }
  }
  
  return null;
}

export default reducer;