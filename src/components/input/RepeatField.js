import Field from "./Field";

class RepeatField extends Field {
    validateInput(inputValue) {
        return this.props.validate(inputValue, this.props.getDependentInputValue());
    };
}

export default RepeatField;