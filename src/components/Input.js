import {useState} from "react";

const Input = ({name, type, validate}) => {
    const [state, setState] = useState({
        value: "",
        className: "valid",
        errorMessage: ""
    });

    const valueChangeHandler = (event) => {
        const inputValue = event.target.value;
        const validationResult = validate(inputValue);
        setState({
            value: inputValue,
            className: validationResult.valid ? "valid" : "invalid",
            errorMessage: validationResult.errorMessage
        });
    };

    return (
        <div className={state.className}>
            <label htmlFor={name}>{name}:</label>
            <br/>
            <input name={name} type={type} onChange={valueChangeHandler} value={state.value}/>
            <br/>
            <span>{state.errorMessage}</span>
        </div>
    );
};

export default Input;