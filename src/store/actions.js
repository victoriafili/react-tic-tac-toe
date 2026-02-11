const createAction = (type) => {
    const actionCreator = (payload) => ({ type, payload });
    actionCreator.type = type;
    return actionCreator;
}

export const playMove = createAction('PLAY_MOVE');
export const resetBoard = createAction('RESET_BOARD');