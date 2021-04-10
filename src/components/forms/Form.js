import * as React from "react";
import Submit from "../input/Submit";

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            valid: false
        };
        this.prepareValidationMap = this.prepareValidationMap.bind(this);
        this.validationCallback = this.validationCallback.bind(this);
        this.getDependentInputValue = this.getDependentInputValue.bind(this);
    }

    prepareValidationMap() {
        this.inputsMap = {};
        this.inputs.forEach(input => this.inputsMap[input.props.name] = {
            value: '',
            valid: false
        });
    }

    validationCallback(name, value, valid) {
        this.inputsMap[name] = {
            value: value,
            valid: valid
        };

        const formValid = !Object.values(this.inputsMap).some(input => !input.valid);
        this.setState({
            valid: formValid
        });
    };

    getDependentInputValue(dependentName) {
        return this.inputsMap[dependentName].value;
    }

    render() {
        return (
            <div className="form-container">
                <div className="form-header">{this.name}</div>
                <form>
                    {this.inputs}
                    <Submit valid={this.state.valid}/>
                </form>
            </div>
        );
    }
}

export default Form;