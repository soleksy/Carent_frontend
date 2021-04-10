import * as React from "react";
import Form from "./Form";
import Field from "../input/Field";
import RepeatField from "../input/RepeatField";
import {emailValidator, equalityValidator, passwordValidator} from "../../helpers/validators";

class SignUpForm extends Form {
    constructor(props) {
        super(props);
        this.name = "Sign up";
        this.inputs = [
            <Field name="Email"
                   type="field"
                   validate={emailValidator}
                   validationCallback={this.validationCallback}
                   key={0}/>,
            <Field name="Password"
                   type="password"
                   validate={passwordValidator}
                   validationCallback={this.validationCallback}
                   key={1}/>,
            <RepeatField name="Repeat password"
                         type="password"
                         validate={equalityValidator}
                         validationCallback={this.validationCallback}
                         getDependentInputValue={() => this.getDependentInputValue("Password")}
                         key={2}/>,
        ];
        this.prepareValidationMap();
    }
}

export default SignUpForm;