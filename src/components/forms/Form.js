import Submit from "../input/Submit";
import {useRef, useState, createElement, useEffect} from "react";

const Form = (props) => {
    const inputsMap = useRef([]).current;
    const [state, setState] = useState({
        valid: false
    });
    useEffect(() => {
        props.inputs.forEach(input => inputsMap[input.name] = {
            value: "",
            valid: false
        });
    }, [props,inputsMap]);

    const validationCallback = (name, value, valid) => {
        inputsMap[name] = {
            value: value,
            valid: valid
        };
        const formValid = !Object.values(inputsMap).some(input => !input.valid);
        setState({
            valid: formValid
        });
    };

    const getValueOfDependentInput = (dependentName) => {
        return inputsMap[dependentName].value;
    };

    return (
        <div className="form-container">
            <div className="form-header">{props.name}</div>
            <form onSubmit={event => props.onSubmit(event, inputsMap)}>
                {props.inputs.map((input, key) => {
                        let additionalProps = {
                            validationCallback: validationCallback,
                            key: key,
                        };
                        if(input.dependsOn !== undefined) {
                            additionalProps["getValueOfDependentInput"] = () => getValueOfDependentInput(input.dependsOn);
                        }
                        return createElement(
                            input.component,
                            {...input, ...additionalProps}
                        )
                    }
                )}
                <Submit valid={state.valid}/>
            </form>
        </div>
    );
}

export default Form;