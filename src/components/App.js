import {useReducer, createContext} from "react";
import {Reducer} from "../reducers/Reducer";
import Menu from "./Menu";
import Modal from "./Modal";
import Loader from "./Loader";

const initialState = {
    modalContent: null,
    modalErrorMessage: null,
    renderLoader: false
};

const App = () => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    return (
        <Context.Provider value={[state, dispatch]}>
            <Menu/>
            <Modal/>
            <Loader/>
        </Context.Provider>
    );
}

export const Context = createContext(initialState);
export default App;