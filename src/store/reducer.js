import { playMove, resetBoard } from "./actions";

const initState = {board: Array(9).fill(null), isNext: true, winner: null, score: {
    X: 0,
    O: 0,
}, matchWinner: null, message: "",}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'UPDATE_BOARD':
            return {...state, board: action.payload};
        case 'SET_NEXT_PLAYER':
            return {...state, isNext: action.payload};
        case resetBoard.type: {
            // Check if matchWinner exists
            const isMatchOver = state.matchWinner !== null;

            return { 
                board: Array(9).fill(null), 
                isNext: true, 
                winningLine: null, 
                winner: null, 
                matchWinner: isMatchOver ? null : state.matchWinner,   // keep matchWinner if match not over
                message: isMatchOver ? "" : state.message,            // clear message only if match over
                score: isMatchOver ? { X: 0, O: 0 } : state.score,   // reset score only if match over
            };
        }
        case playMove.type: {
            const newBoard = [...state.board];

            if (newBoard[action.payload] || state.winner) return state;

            newBoard[action.payload] = state.isNext ? 'X' : 'O';

            const winner = calculateWinner(newBoard);

            if (!winner) {
                return {
                    ...state,
                    board: newBoard,
                    isNext: !state.isNext,
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
                    isNext: !state.isNext,
                    winner: winner.winner,
                    winningLine: winner.line,
                    matchWinner: matchWinner,
                    score: updatedScore,
                    message: `Player ${matchWinner} wins the match!`,
                }
            }

            return {...state, board: newBoard, isNext: !state.isNext, winner: winner.winner, winningLine: winner.line, score: updatedScore};
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