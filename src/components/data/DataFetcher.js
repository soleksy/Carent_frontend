import {useEffect, useState} from "react";
import Message from "../Message";
import Loader from "../Loader";

const DataFetcher = (props) => {
    const [state, setState] = useState({
        serverResponse: null
    });
    let fetchConditionCheckerFunc = props.fetchConditionCheckerFunc;
    if(!fetchConditionCheckerFunc) {
        fetchConditionCheckerFunc = () => 0;
    }
    useEffect(() => {
        setState({
            serverResponse: null
        })
        props.fetchingFunc().then(response => setState({
            serverResponse: {
                data: response.data,
                successful: true
            }
        })).catch(error => setState({
            serverResponse: {
                data: error.response ? error.response.data : error.message,
                successful: false
            }
        }));
    }, [props]);

    if(!state.serverResponse) {
        return <Loader renderLoader="true"/>;
    }
    if(!state.serverResponse.successful) {
        return <Message value={state.serverResponse.data} type="error"/>
    }
    const data = state.serverResponse.data;
    const result = props.limit ? data.slice(Math.max(data.length - props.limit)) : data;
    return props.successfulResponseRenderingFunc(result);
};

export default DataFetcher;
