export const loadState = () => {
    try {
        const savedState = localStorage.getItem('tic-tac-toe-state');
        if (savedState === null) return undefined;

        if (savedState) {
            return JSON.parse(savedState);
        }
    } catch {
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