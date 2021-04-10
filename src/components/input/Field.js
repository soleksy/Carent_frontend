import * as React from "react";

class Field extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            className: "valid",
            errorMessage: ""
        };
        this.valueChangeHandler = this.valueChangeHandler.bind(this);
    }

    validateInput(inputValue) {
        return this.props.validate(inputValue);
    }

    valueChangeHandler(event) {
        const inputValue = event.target.value;
        const validationResult = this.validateInput(inputValue);
        this.setState({
            value: inputValue,
            className: validationResult.valid ? "valid" : "invalid",
            errorMessage: validationResult.errorMessage
        });
        if(this.props.validationCallback !== undefined) {
            this.props.validationCallback(this.props.name, inputValue, validationResult.valid);
        }
    };

    render() {
        return (
            <div className={this.state.className}>
                <label htmlFor={this.props.name}>{this.props.name}:</label>
                <br/>
                <input name={this.props.name} type={this.props.type} onChange={this.valueChangeHandler} value={this.state.value}/>
                <br/>
                <span>{this.props.errorMessage || this.state.errorMessage}</span>
            </div>
        );
    }
}

export default Field;