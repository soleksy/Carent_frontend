import Form from "./Form";
import Field from "../input/Field";
import {emailValidator, passwordValidator} from "../../helpers/Validators";

const SignInForm = () => {
    const name = "Sign in";
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
        }
    ];
    return (
        <Form name={name} inputs={inputs}/>
    );
}

export default SignInForm;