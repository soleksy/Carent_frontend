import {useState} from "react";

const Field = (props) => {
    const [state, setState] = useState({
        value: props.value,
        className: "valid",
        valid: false
    });

    const valueChangeHandler = (event) => {
        const inputValue = event.target.value;
        let validationResult;
        if (props.getValueOfDependentInput !== undefined) {
            validationResult = props.validate(inputValue, props.getValueOfDependentInput());
        } else {
            validationResult = props.validate(inputValue);
        }
        setState({
            value: inputValue,
            className: validationResult.valid ? "valid" : "invalid",
            errorMessage: validationResult.errorMessage
        });
        if (props.validationCallback !== undefined) {
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