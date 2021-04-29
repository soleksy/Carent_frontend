import {useState, useEffect, useContext} from "react";
import {Context} from "./App";

const Loader = () => {
    const [globalState,] = useContext(Context);
    const [state, setState] = useState({
        loadingBar: "."
    });

    const updateLoadingBar = () => {
        setState(prevState => {
            return {
                loadingBar: prevState.loadingBar.length > 2 ? "" : prevState.loadingBar + "."
            };
        });
    };

    useEffect(() => {
        let intervalId = 0;
        if (globalState.renderLoader) {
            intervalId = setInterval(updateLoadingBar, 1000);
        }
        return () => {
            clearInterval(intervalId);
            setState({
                loadingBar: "."
            });
        };
    }, [globalState.renderLoader]);

    const renderLoaderIfNeeded = () => {
        if (globalState.renderLoader) {
            return (
                <div className="loading">
                    <span className="loading-content">{state.loadingBar}</span>
                </div>
            );
        }
        return null;
    };

    return renderLoaderIfNeeded();
}

export default Loader;