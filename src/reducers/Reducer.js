export const Reducer = (state, newState) => {
    if(newState.modalContent !== undefined && newState.modalContent == null) {
        newState.modalErrorMessage = null;
    }
    return {
        ...state,
        ...newState
    }
};