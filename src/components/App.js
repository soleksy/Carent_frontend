import {useReducer, createContext} from "react";
import {Reducer} from "../reducers/Reducer";
import Menu from "./Menu";
import Modal from "./Modal";

const initialState = {
    modalContent: null
};

const App = () => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    return (
        <Context.Provider value={[state, dispatch]}>
            <Menu/>
            <Modal/>
        </Context.Provider>
    );
}

export const Context = createContext(initialState);
export default App;