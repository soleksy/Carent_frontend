import Form from "./Form";
import Input from "./Input";
import {emailValidator, passwordValidator} from "../helpers/validators";

const SignInForm = () => {
    const inputs = [
        <Input name="Email" type="field" validate={emailValidator}/>,
        <Input name="Password" type="password" validate={passwordValidator}/>
    ]
    return (
        <Form name="Sign In" inputs={inputs}/>
    );
}

export default SignInForm;