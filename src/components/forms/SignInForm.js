import * as React from "react";
import Form from "./Form";
import Field from "../input/Field";
import {emailValidator, passwordValidator} from "../../helpers/validators";

class SignUpForm extends Form {
    constructor(props) {
        super(props);
        this.name = "Sign in";
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
                   key={1}/>
        ];
        this.prepareValidationMap();
    }
}

export default SignUpForm;