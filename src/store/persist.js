export const initState = {
    board: Array(9).fill(null),
    isNext: true,
    winningLine: null,
    winner: null,
    matchWinner: null,
    message: "",
    score: { X: 0, O: 0 },
}
export const loadState = () => {
    try {
        const savedState = localStorage.getItem('tic-tac-toe-state');
        if (savedState === null) return undefined;

        const state = JSON.parse(savedState);

        // Merge with initState to ensure all properties exist
        return {
          ...initState,
          ...state,
          score: state.score || { X: 0, O: 0 }, // ensure score exists
          board: state.board || Array(9).fill(null), // ensure board exists
       };
    } catch (err){
        console.log("Failed to load state from localStorage", err);
        return undefined;
    }
}

export const savedState = (state) => {
    try {
        localStorage.setItem('tic-tac-toe-state', JSON.stringify(state));    
    } catch {
        // Ignore write errors
    }
}