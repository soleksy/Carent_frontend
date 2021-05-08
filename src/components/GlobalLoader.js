import {useContext} from "react";
import Loader from "./Loader";
import {Context} from "./App";

const GlobalLoader = () => {
    const [globalState,] = useContext(Context);
    if (globalState.renderLoader) {
        return (
            <div className="loading-modal">
                <Loader renderLoader={globalState.renderLoader}/>
            </div>
        );
    }
    return null;
};

export default GlobalLoader;