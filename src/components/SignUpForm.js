import Form from "./Form";
import Input from "./Input";
import {emailValidator, passwordValidator} from "../helpers/validators";

const SignUpForm = () => {
    const inputs = [
        <Input name="Email" type="field" validate={emailValidator}/>,
        <Input name="Password" type="password" validate={passwordValidator}/>,
        <Input name="Repeat Password" type="password" validate={passwordValidator}/>
    ]
    return (
        <Form name="Sign Up" inputs={inputs}/>
    );
}

export default SignUpForm;