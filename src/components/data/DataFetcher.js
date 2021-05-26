import {useEffect, useState} from "react";
import Message from "../Message";
import Loader from "../Loader";
import {messages} from "../../helpers/Constats";
import {getUserId} from "../../Storage";

const DataFetcher = (props) => {
    const [state, setState] = useState({
        serverResponse: null
    });
    const fetchingFunc = props.fetchingFunc;
    const rerenderCondition = props.rerenderCondition;
    const userId = getUserId();
    useEffect(() => {
        setState({
            serverResponse: null
        })
        fetchingFunc().then(response => {
            setState({
            serverResponse: {
                data: response.data,
                successful: true
            }
        })}).catch(error => {
            setState({
            serverResponse: {
                data: error.response?.data?.message || error.message || messages.serverError,
                successful: false
            }
        })});
    }, [rerenderCondition, userId, fetchingFunc]);

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
