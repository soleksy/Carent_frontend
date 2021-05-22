import {useEffect, useState} from "react";

const Loader = (props) => {
    const [state, setState] = useState({
        loadingBar: ".\u00a0\u00a0"
    });

    const updateLoadingBar = () => {
        setState(prevState => {
            let loadingBar = prevState.loadingBar;
            if (loadingBar[2] === ".") {
                loadingBar = "\u00a0\u00a0\u00a0";
            } else if (loadingBar[1] === ".") {
                loadingBar = "...";
            } else if (loadingBar[0] === ".") {
                loadingBar = "..\u00a0";
            } else {
                loadingBar = ".\u00a0\u00a0";
            }
            return {
                loadingBar
            };
        });
    };

    useEffect(() => {
        let intervalId = 0;
        if (props.renderLoader) {
            intervalId = setInterval(updateLoadingBar, 300);
        }
        return () => {
            clearInterval(intervalId);
            setState({
                loadingBar: "."
            });
        };
    }, [props.renderLoader]);

    if (props.renderLoader) {
        return (
            <span className="loading-bar">{state.loadingBar}</span>
        );
    }
    return null;
}

export default Loader;