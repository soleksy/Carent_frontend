export const Reducer = (state, newState) => {
    if(newState.modalContent !== undefined && newState.modalContent == null) {
        newState.modalMessage = null;
    }
    return {
        ...state,
        ...newState
    }
};