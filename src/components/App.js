import {createContext, useReducer} from "react";
import {Reducer} from "../reducers/Reducer";
import Menu from "./Menu";
import Modal from "./Modal";
import CarsContainer from "./data/CarsContainer";
import GlobalLoader from "./GlobalLoader";
import {BrowserRouter, Route} from "react-router-dom";
import Profile from "./data/Profile";
import CarDetails from "./data/CarDetails";
import Footer from "./Footer";
import Header from "./Header";
import RentalContainer from "./data/RentalContainer";
import {startTokenExpirationTask} from "../helpers/Common";

const initialState = {
    modalContent: null,
    modalMessage: null,
    renderLoader: false
};

const App = () => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    startTokenExpirationTask(dispatch);
    return (
        <Context.Provider value={[state, dispatch]}>
            <Menu/>
            <div className="content-body">
                <BrowserRouter>
                    <Route exact path="/">
                        <Header/>
                        <CarsContainer header="Recent cars" limit="3"/>
                    </Route>
                    <Route exact path="/cars">
                        <CarsContainer header="All cars"/>
                    </Route>
                    <Route exact path="/cars/:id">
                        <CarDetails/>
                    </Route>
                    <Route path="/profile">
                        <Profile/>
                    </Route>
                    <Route path="/orders">
                        <RentalContainer/>
                    </Route>
                </BrowserRouter>
            </div>
            <Modal/>
            <GlobalLoader/>
            <Footer/>
        </Context.Provider>
    );
}

export const Context = createContext(initialState);
export default App;
