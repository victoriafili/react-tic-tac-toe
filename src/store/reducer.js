import { playMove, resetBoard } from "./actions";

const initState = {board: Array(9).fill(null), isNext: true, score: {
    X: 0,
    O: 0,
}}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'UPDATE_BOARD':
            return {...state, board: action.payload};
        case 'SET_NEXT_PLAYER':
            return {...state, isNext: action.payload};
        case resetBoard.type:
            return { board: Array(9).fill(null), isNext: true, score: state.score, winningLine: null, winner: null };
        case playMove.type: {
            const newBoard = [...state.board];
            newBoard[action.payload] = state.isNext ? 'X' : 'O';

            const winner = calculateWinner(newBoard);

            if (winner) {
                return {...state, board: newBoard, isNext: !state.isNext, winner: winner.winner, winningLine: winner.line, score: {
                    ...state.score,
                    X: winner.winner === 'X' ? state.score.X + 1 : state.score.X,
                    O: winner.winner === 'O' ? state.score.O + 1 : state.score.O,
                }};
            }

            return {...state, board: newBoard, isNext: !state.isNext};
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