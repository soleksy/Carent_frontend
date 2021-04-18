import Form from "./Form";
import Field from "../input/Field";
import {emailValidator, equalityValidator, passwordValidator} from "../../helpers/Validators";

const SignUpForm = () => {
    const name = "Sign up";
    const inputs = [
        {
            component: Field,
            name: "Email",
            type: "field",
            validate: emailValidator
        },
        {
            component: Field,
            name: "Password",
            type: "password",
            validate: passwordValidator
        },
        {
            component: Field,
            name: "Repeat Password",
            type: "password",
            dependsOn: "Password",
            validate: equalityValidator
        }
    ];
    return (
        <Form name={name} inputs={inputs}/>
    );
}

export default SignUpForm;