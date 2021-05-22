import Submit from "../input/Submit";
import {useRef, useState, createElement, useEffect} from "react";

const Form = (props) => {
    const inputsMap = useRef([]).current;
    const [state, setState] = useState({
        valid: false
    });
    useEffect(() => {
        props.inputs.forEach(input => inputsMap[input.name] = {
            value: input.value || "",
            valid: input.value != null
        });
        validateAllFields();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const validationCallback = (name, value, valid) => {
        inputsMap[name] = {
            value,
            valid
        };
        validateAllFields();
    };

    const validateAllFields = () => {
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
            {props.name && <div className="form-header">{props.name}</div>}
            <form onSubmit={event => props.onSubmit(event, inputsMap)}>
                {props.inputs.map((input, key) => {
                        let additionalProps = {
                            validationCallback,
                            key,
                        };
                        if (input.dependsOn !== undefined) {
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
