import {useState, useEffect} from "react";

const Field = (props) => {
    const [state, setState] = useState({
        value: props.value,
        className: "valid",
        valid: false
    });

    const valueOfBoundField = props.valueOfBoundField;
    useEffect(() => {
        if(valueOfBoundField && state.value) {
            validate(state.value)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valueOfBoundField]);

    const valueChangeHandler = (event) => {
        const inputValue = event.target.value;
        validate(inputValue);
    };

    const validate = (inputValue) => {
        let validationResult;
        if (props.valueOfBoundField) {
            validationResult = props.validate(inputValue, props.valueOfBoundField);
        } else {
            validationResult = props.validate(inputValue);
        }
        setState({
            value: inputValue,
            className: validationResult.valid ? "valid" : "invalid",
            errorMessage: validationResult.errorMessage
        });
        if (props.validationCallback) {
            props.validationCallback(props.name, inputValue, validationResult.valid);
        }
    };

    return (
        <div className={`input ${state.className}`}>
            <label htmlFor={props.name}>{props.name}:</label>
            <br/>
            <input name={props.name}
                   type={props.type}
                   disabled={props.disabled ?? false}
                   onChange={valueChangeHandler}
                   value={state.value}/>
            <br/>
            <span>{state.errorMessage}</span>
        </div>
    );
}

export default Field;